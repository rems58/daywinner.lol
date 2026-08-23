import { createClient } from "@supabase/supabase-js";

/**
 * Client public (cle anon, RLS active) : lecture + abonnement Realtime
 * depuis le navigateur. Aucune ecriture ne passe par ce client.
 */
export function creerClientNavigateur() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
