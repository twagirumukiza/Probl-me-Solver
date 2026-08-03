/**
 * Proxy Cloudflare Worker pour SolveFlow.
 * Garde la clé Anthropic côté serveur (jamais exposée au navigateur).
 *
 * Déploiement :
 * 1. dash.cloudflare.com -> Workers & Pages -> Create Worker
 * 2. Collez ce code, déployez
 * 3. Settings -> Variables -> ajoutez un secret nommé ANTHROPIC_API_KEY
 * 4. Copiez l'URL du Worker (https://xxx.workers.dev) dans les réglages de SolveFlow
 *    à la place de l'appel direct (voir index.html, fonction callClaude)
 */
export default {
  async fetch(request, env) {
    const CORS_HEADERS = {
      'Access-Control-Allow-Origin': '*', // remplacez '*' par votre domaine GitHub Pages pour restreindre
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }
    if (request.method !== 'POST') {
      return new Response('Méthode non autorisée', { status: 405, headers: CORS_HEADERS });
    }

    const body = await request.text();

    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body,
    });

    const respBody = await upstream.text();
    return new Response(respBody, {
      status: upstream.status,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    });
  },
};
