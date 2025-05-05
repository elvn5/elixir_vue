export enum EnvTypes {
  "SUPABASE_URL" = "VITE_SUPABASE_URL",
  "SUPABASE_ANON_KEY" = "VITE_SUPABASE_ANON_KEY",
}
export const getEnvVar = (env: EnvTypes): string => {
  console.log(import.meta.env.VITE_SUPABASE_URL)
  switch (env) {
    case EnvTypes.SUPABASE_URL:
      return import.meta.env.VITE_SUPABASE_URL || "";
    case EnvTypes.SUPABASE_ANON_KEY:
      return import.meta.env.VITE_SUPABASE_ANON_KEY || "";
    default:
      throw Error(`Unsupported env: ${env}`);
  }
}
