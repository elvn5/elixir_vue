import { createClient } from "@supabase/supabase-js";
import { EnvTypes, getEnvVar } from "@/utils/env-util";


export const supabaseApp = createClient(
  getEnvVar(EnvTypes.SUPABASE_URL),
  getEnvVar(EnvTypes.SUPABASE_ANON_KEY)
  );
