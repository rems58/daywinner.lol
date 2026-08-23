import { createClient } from "@supabase/supabase-js";

/**
 * Client privilegie (cle service role, contourne RLS) : reserve au webhook
 * Stripe et au cron de cloture. Ne jamais exposer cette cle au client.
 */
export function creerClientService() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}

/**
 * Client public server-side (cle anon, RLS active) : lectures dans les
 * Server Components (pas d'ecriture, pas de session utilisateur).
 */
export function creerClientPublic() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );
}
