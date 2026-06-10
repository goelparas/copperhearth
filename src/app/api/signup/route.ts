import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { supabase } from "@/utils/supabase";

export async function POST(request: Request) {
  try {
    const { phone = "", email = "", source = "prelaunch_signup" } = await request.json();

    const hasContactDetails = (phone && phone.trim() !== "") || (email && email.trim() !== "");
    let emailSent = false;

    if (hasContactDetails) {
      const emailSubject = `New Prelaunch Signup`;
      const emailBody = `
        You have a new prelaunch signup!

        Phone: ${phone}
        Email: ${email}
        Source: ${source}
        Date: ${new Date().toLocaleString()}
      `;

      // Retrieve environment variables
      const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

      if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
        try {
          const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: parseInt(SMTP_PORT || "587"),
            secure: parseInt(SMTP_PORT || "587") === 465,
            auth: {
              user: SMTP_USER,
              pass: SMTP_PASS,
            },
          });

          await transporter.sendMail({
            from: `"Copper Hearth Prelaunch" <${SMTP_USER}>`,
            to: "hearthcopper@gmail.com",
            subject: emailSubject,
            text: emailBody,
          });

          emailSent = true;
        } catch (mailError) {
          console.error("Failed to send email via SMTP:", mailError);
        }
      } else {
        console.warn(
          "SMTP credentials (SMTP_HOST, SMTP_USER, SMTP_PASS) not configured in .env. Falling back to local file saving."
        );
      }
    }

    let savedToSupabase = false;
    if (supabase) {
      try {
        const { error: dbError } = await supabase
          .from("signups")
          .insert([
            {
              email: email || "",
              phone: phone || "",
              source: source,
            },
          ]);
        if (!dbError) {
          savedToSupabase = true;
        } else {
          console.error("Supabase error saving signup:", dbError.message);
        }
      } catch (dbErr) {
        console.error("Supabase signup operation failed:", dbErr);
      }
    }

    // Always append/save to a local JSON file so no signups are ever lost!
    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const filePath = path.join(dataDir, "signups.json");

      let existingSignups = [];
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf8");
        try {
          existingSignups = JSON.parse(fileContent);
        } catch (e) {
          existingSignups = [];
        }
      }

      existingSignups.push({
        phone: phone || "",
        email: email || "",
        source,
        timestamp: new Date().toISOString(),
        emailSent,
        savedToSupabase,
      });

      fs.writeFileSync(filePath, JSON.stringify(existingSignups, null, 2), "utf8");
    } catch (fsError) {
      console.error("Failed to save signup to local file:", fsError);
    }

    return NextResponse.json({
      success: true,
      message: savedToSupabase
        ? "Signup successful! Saved to database."
        : emailSent
        ? "Signup successful! Email sent to hearthcopper@gmail.com."
        : "Signup saved locally. Configure SMTP/Supabase credentials to enable automated services.",
      emailSent,
      savedToSupabase,
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
