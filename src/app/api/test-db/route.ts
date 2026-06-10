import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

type TableDiagnostic =
  | {
      healthy: false;
      error: string;
      hint: string;
    }
  | {
      healthy: true;
      message: string;
    };

type Diagnostics = {
  clientInitialized: boolean;
  supabaseUrl: string;
  hasAnonKey: boolean;
  hasServiceKey: boolean;
  tablesChecked: Partial<Record<"votes" | "signups", TableDiagnostic>>;
};

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabase) {
    return NextResponse.json(
      {
        success: false,
        status: "Missing Configuration",
        error: "Supabase client could not be initialized.",
        variablesDetected: {
          NEXT_PUBLIC_SUPABASE_URL: !!supabaseUrl,
          NEXT_PUBLIC_SUPABASE_ANON_KEY: !!supabaseAnonKey,
          SUPABASE_SERVICE_ROLE_KEY: hasServiceKey,
        },
        advice: "Please create a '.env' or '.env.local' file in your project root using '.env.example' as a template, and fill in your Supabase project keys.",
      },
      { status: 500 }
    );
  }

  const diagnostics: Diagnostics = {
    clientInitialized: true,
    supabaseUrl: supabaseUrl,
    hasAnonKey: !!supabaseAnonKey,
    hasServiceKey: hasServiceKey,
    tablesChecked: {},
  };

  try {
    // 1. Check 'votes' table connection
    const { error: votesError } = await supabase
      .from("votes")
      .select("*")
      .limit(1);

    if (votesError) {
      diagnostics.tablesChecked.votes = {
        healthy: false,
        error: votesError.message,
        hint: votesError.hint || "Make sure the table exists and Row Level Security (RLS) allows reads.",
      };
    } else {
      diagnostics.tablesChecked.votes = {
        healthy: true,
        message: "Successfully connected and queried 'votes' table.",
      };
    }

    // 2. Check 'signups' table connection
    const { error: signupsError } = await supabase
      .from("signups")
      .select("*")
      .limit(1);

    if (signupsError) {
      diagnostics.tablesChecked.signups = {
        healthy: false,
        error: signupsError.message,
        hint: signupsError.hint || "Make sure the table exists and RLS allows reads.",
      };
    } else {
      diagnostics.tablesChecked.signups = {
        healthy: true,
        message: "Successfully connected and queried 'signups' table.",
      };
    }

    const overallHealthy =
      diagnostics.tablesChecked.votes?.healthy === true &&
      diagnostics.tablesChecked.signups?.healthy === true;

    return NextResponse.json({
      success: overallHealthy,
      status: overallHealthy ? "Healthy" : "Degraded",
      message: overallHealthy 
        ? "Successfully connected to all database tables!"
        : "Connected to Supabase, but some tables are missing or inaccessible.",
      diagnostics,
    });

  } catch (error: unknown) {
    console.error("Database connection diagnostics crash:", error);
    const message = error instanceof Error ? error.message : "Unknown error during database connection test";
    return NextResponse.json(
      {
        success: false,
        status: "Error",
        error: message,
        diagnostics,
      },
      { status: 500 }
    );
  }
}
