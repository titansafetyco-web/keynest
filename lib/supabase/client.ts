import { createBrowserClient } from "@supabase/ssr";
import { lockedSupabaseUrl } from "@/lib/deploy-lock";

export function createClient() {
  return createBrowserClient(
    lockedSupabaseUrl(),
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
