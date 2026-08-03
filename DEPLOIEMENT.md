# Déployer SolveFlow sur GitHub Pages

## 1. Mettre le fichier dans votre repo

- Renommez `index.html` (déjà fait) et placez-le à la racine de votre repo `Probl-me-Solver`
  (ou dans `/docs` si vous servez Pages depuis ce dossier).
- Committez et poussez.
- Dans **Settings → Pages**, vérifiez que la source pointe bien vers la branche/dossier utilisé.
- Le site sera servi sur `https://twagirumukiza.github.io/Probl-me-Solver/`.

## 2. Configurer l'accès à l'API Claude

GitHub Pages ne sert que du statique : il n'y a pas de serveur pour cacher une clé API.
L'app propose donc deux modes, à choisir via le bouton **⚙ Clé API** dans la barre latérale.

### Option A — Clé API directe (rapide, usage personnel)
1. Créez une clé sur [console.anthropic.com](https://console.anthropic.com) → API Keys.
2. Collez-la dans le champ "Clé API" de SolveFlow.
3. Elle est stockée uniquement dans le `localStorage` de votre navigateur et envoyée
   uniquement à `api.anthropic.com` (appel direct, header `anthropic-dangerous-direct-browser-access`).

**Limite de sécurité** : n'importe qui ouvrant les outils de développement de VOTRE navigateur
sur CETTE machine, à ce moment-là, pourrait lire cette clé. N'utilisez cette option que sur un
poste personnel, et ne la configurez jamais sur un poste partagé ou public. Cette option ne
convient pas si vous comptez partager le lien du site avec des tiers en attendant qu'ils
utilisent votre clé.

### Option B — Proxy Cloudflare Worker (recommandé si plusieurs personnes utilisent l'app)
La clé ne touche jamais le navigateur ; elle reste sur le serveur du Worker.

1. Allez sur [dash.cloudflare.com](https://dash.cloudflare.com) → Workers & Pages → Create Worker.
2. Collez le contenu de `worker.js` (fourni à côté de ce fichier).
3. Déployez, puis dans **Settings → Variables and Secrets**, ajoutez un secret
   `ANTHROPIC_API_KEY` avec votre clé.
4. Copiez l'URL du Worker (`https://xxxx.workers.dev`).
5. Dans SolveFlow, ouvrez **⚙ Clé API** et collez cette URL dans le champ "URL du proxy".
   Le champ clé API peut rester vide.

Le Worker Cloudflare a un plan gratuit largement suffisant pour un usage individuel ou pour
une classe (100 000 requêtes/jour).

## 3. Notes

- Les données du dossier (problème, backlog, sprints) sont sauvegardées dans le
  `localStorage` du navigateur — propre à chaque appareil/navigateur, pas synchronisé entre eux.
- Le modèle utilisé est `claude-sonnet-5`. Vous pouvez le changer dans `index.html`
  (fonction `callClaude`, propriété `model`) si vous préférez un autre modèle disponible sur
  votre compte API.
