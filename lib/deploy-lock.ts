export const LOCKED_GITHUB_REMOTE = "https://github.com/titansafetyco-web/keynest.git";
export const LOCKED_VERCEL_URL = "https://keynest-dynodos7a-titan-energy.vercel.app";
export const LOCKED_SUPABASE_URL = "https://ovjmmpcqtsxlpdkcyute.supabase.co";
export const LOCKED_GOOGLE_CLOUD_EMAIL = "titansafetyco@gmail.com";
export const LOCKED_GOOGLE_CLOUD_BILLING_ACCOUNT = "015F35-A9F296-BA7E5B";

export function lockedSupabaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "") ?? "";
  if (url !== LOCKED_SUPABASE_URL) {
    throw new Error(
      `KeyNest is locked to ${LOCKED_SUPABASE_URL}. Got ${url || "(empty NEXT_PUBLIC_SUPABASE_URL)"}.`
    );
  }
  return url;
}
