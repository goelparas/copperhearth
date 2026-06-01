import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import fs from "fs";
import path from "path";
import { z } from "zod";

// Input validation schema using Zod
const voteRequestSchema = z.object({
  finishId: z.string().min(1, "Finish ID is required"),
  finishName: z.string().min(1, "Finish Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validation = voteRequestSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { finishId, finishName, email, phone } = validation.data;
    let savedToSupabase = false;
    let savedToSupabaseLead = false;
    let supabaseErrorMsg = "";

    // 1. Try to save to Supabase
    if (supabase) {
      try {
        // Insert vote
        const { error: voteError } = await supabase
          .from("votes")
          .insert([
            {
              finish_id: finishId,
              finish_name: finishName,
              email: email,
              phone: phone,
            },
          ]);

        if (voteError) {
          console.error("Supabase error saving vote:", voteError.message);
          supabaseErrorMsg = voteError.message;
        } else {
          savedToSupabase = true;
        }

        // Insert overall lead signup
        const { error: leadError } = await supabase
          .from("signups")
          .insert([
            {
              email: email,
              phone: phone,
              source: `vote_${finishId}`,
            },
          ]);

        if (!leadError) {
          savedToSupabaseLead = true;
        }
      } catch (dbErr: any) {
        console.error("Supabase operation failed:", dbErr);
        supabaseErrorMsg = dbErr.message || "Unknown db error";
      }
    }

    // 2. Always backup to local JSON file for absolute reliability
    let localSaved = false;
    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      
      const filePath = path.join(dataDir, "votes.json");
      let existingVotes = [];
      
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf8");
        try {
          existingVotes = JSON.parse(fileContent);
        } catch (e) {
          existingVotes = [];
        }
      }

      existingVotes.push({
        finishId,
        finishName,
        email,
        phone,
        timestamp: new Date().toISOString(),
        savedToSupabase,
      });

      fs.writeFileSync(
        filePath,
        JSON.stringify(existingVotes, null, 2),
        "utf8"
      );
      localSaved = true;
    } catch (fsError) {
      console.error("Failed to save vote to local backup file:", fsError);
    }

    return NextResponse.json({
      success: true,
      message: savedToSupabase
        ? "Vote registered successfully in database."
        : "Vote saved in local backup. Configure Supabase credentials to enable direct cloud database writes.",
      savedToSupabase,
      localSaved,
      supabaseError: supabaseErrorMsg || undefined,
    });
  } catch (error: any) {
    console.error("Vote registration API error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
