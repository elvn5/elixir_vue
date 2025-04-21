import { createClient } from "@supabase/supabase-js";


export const supabaseApp = createClient(
  "https://pqvkrlkdhczvmzqxryhs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxdmtybGtkaGN6dm16cXhyeWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4NzU1NjYsImV4cCI6MjA2MDQ1MTU2Nn0.1BYhAGJ22LdKVq0fs-_J0EAwXZqGczET3-plJpHi2E8"
  );
