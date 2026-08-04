# Déployer SolveFlow sur GitHub Pages

## 1. Mettre le fichier dans votre repo

- Le fichier `index.html` va à la racine de votre repo `Probl-me-Solver`.
- Committez, poussez. Dans **Settings → Pages**, vérifiez que la source pointe vers la
  branche/dossier utilisé.
- Le site est servi sur `https://twagirumukiza.github.io/Probl-me-Solver/`.

## 2. Choisir un fournisseur IA

GitHub Pages ne sert que du statique : il n'y a pas de serveur pour cacher une clé API, donc
chaque appel IA part directement du navigateur vers le fournisseur choisi. Ouvrez le bouton
**⚙ Fournisseur IA** dans la barre latérale pour configurer.

### Mode Démo (sans IA)
Aucune clé nécessaire. Les 3 étapes IA (analyse, diagnostic, backlog) utilisent des exemples
préconstruits. Utile pour montrer l'application sans dépendre d'un compte externe.

### Google Gemini — fournisseur par défaut
1. Créez une clé gratuite sur https://aistudio.google.com/apikey (compte Google suffit,
   aucune carte bancaire requise pour le palier gratuit).
2. Collez-la dans le champ "Clé API" avec Gemini sélectionné.
3. Modèle par défaut : `gemini-2.5-flash`. Les quotas gratuits sont limités en requêtes/minute —
   en cas d'erreur 429, patientez quelques secondes avant de relancer.

### Autres fournisseurs déjà câblés
Le même écran de réglages gère aussi :
- **OpenAI** — clé sur https://platform.openai.com/api-keys (payant, pas de palier gratuit).
- **DeepSeek** — clé sur https://platform.deepseek.com/api_keys (tarifs bas, pas de palier gratuit).
- **Groq** — clé sur https://console.groq.com/keys (palier gratuit généreux, modèles open-source
  type Llama, réponses très rapides).
- **Ollama (local)** — aucune clé, fait tourner un modèle en local sur votre machine
  (`ollama serve`). Lancez-le avec `OLLAMA_ORIGINS` incluant l'origine du site GitHub Pages
  pour que le navigateur soit autorisé à l'appeler (CORS). Adapté à un usage strictement
  personnel, sur la machine qui fait tourner Ollama.
- **Anthropic (Claude)** — clé sur https://console.anthropic.com, avec option de proxy
  (voir `worker.js` ci-dessous).

### Ajouter un futur fournisseur
Le code est organisé pour ça : un objet `PROVIDERS` (dans `index.html`) définit chaque
fournisseur en quelques lignes, et la fonction `callAI()` route vers une des trois formes
d'API déjà supportées (`gemini`, `openai-compat` — qui couvre aussi tout futur fournisseur
compatible OpenAI, comme Mistral ou xAI —, ou `anthropic`). Ajouter un fournisseur qui suit un
de ces trois formats ne demande qu'une entrée dans `PROVIDERS`, sans toucher au reste de
l'application (diagnostic, backlog, kanban, etc.).

## 3. Option proxy sécurisé (pour Anthropic ou tout fournisseur OpenAI-compatible)

Si vous préférez ne jamais exposer de clé dans le navigateur (par exemple si l'app est
partagée avec des élèves), déployez `worker.js` sur Cloudflare :

1. https://dash.cloudflare.com → Workers & Pages → Create Worker.
2. Collez le contenu de `worker.js`, déployez.
3. **Settings → Variables and Secrets** → ajoutez `ANTHROPIC_API_KEY`.
4. Copiez l'URL du Worker (`https://xxxx.workers.dev`) dans le champ "URL du proxy" du
   fournisseur Anthropic.

Plan gratuit Cloudflare largement suffisant pour un usage individuel ou une classe
(100 000 requêtes/jour).

## 4. Notes

- Les données du dossier (problème, backlog, sprints) et les identifiants de chaque
  fournisseur sont stockés dans le `localStorage` du navigateur — propres à chaque
  appareil/navigateur, non synchronisés entre eux.
- Changer de fournisseur dans les réglages ne supprime pas les identifiants déjà saisis
  pour les autres — chacun est conservé sous sa propre clé de stockage.
