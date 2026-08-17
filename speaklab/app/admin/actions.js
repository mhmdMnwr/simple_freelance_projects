"use server";

import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

// Helper to get authenticated Supabase client using Service Role
const getSupabaseAdmin = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase Service Role Key or URL");
  }

  return createClient(supabaseUrl, supabaseServiceKey);
};

// Check if admin cookie exists
export async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get("speaklab_admin_session")?.value === "authenticated";
}

// Verify login and set secure cookie
export async function verifyLogin(username, password) {
  const adminUser = process.env.ADMIN_USER || "admin";
  const adminPass = process.env.ADMIN_PASS || "speaklab2024";

  if (username === adminUser && password === adminPass) {
    const cookieStore = await cookies();
    cookieStore.set("speaklab_admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });
    return { success: true };
  } else {
    return { success: false };
  }
}

// Clear cookie
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("speaklab_admin_session");
  return { success: true };
}

// Fetch all registrations (Requires auth)
export async function fetchRegistrations() {
  if (!(await isAuthenticated())) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Delete registration (Requires auth)
export async function deleteRegistration(id) {
  if (!(await isAuthenticated())) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from("registrations")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
