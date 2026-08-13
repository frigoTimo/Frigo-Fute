# Frigo Futé

Une application qui propose des recettes selon les ingrédients que vous avez déjà — avec filtres (régime, allergies, temps, difficulté), cuisines du monde, liste de courses, favoris, et un scan de ticket de caisse par photo.

## Structure du projet

```
frigo-fute/
├── api/
│   └── analyser-ticket.js   ← fonction serveur (Vercel) qui appelle Claude pour lire vos photos de ticket
├── src/
│   ├── data/
│   │   ├── ingredients.js   ← catégories d'ingrédients, listes allergènes
│   │   └── recipes.js       ← les 59 recettes
│   ├── utils.js
│   ├── App.jsx              ← l'application
│   └── main.jsx             ← point d'entrée React
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
└── .env.example
```

## Ce qui a changé par rapport à l'artifact

- **Stockage** : remplacé par `localStorage` du navigateur (fonctionne sur n'importe quel site, propre à chaque visiteur).
- **Scan de ticket** : la clé API Anthropic ne peut jamais être exposée dans le navigateur. La photo est donc envoyée à `api/analyser-ticket.js`, une petite fonction qui tourne sur les serveurs de Vercel, qui elle seule connaît la clé API et interroge Claude. Le navigateur ne reçoit que le résultat.

---

## Étape 1 — Exporter les fichiers depuis l'iPad

Vous avez déjà les fichiers dans la conversation Claude. Sur iPad, le plus simple est de :

1. **Télécharger chaque fichier** depuis le chat (appui long sur le lien du fichier → "Enregistrer sur Fichiers" / "Save to Files"), dans un nouveau dossier `frigo-fute` que vous créez dans l'app **Fichiers**.
2. Recréez bien l'arborescence ci-dessus dans l'app Fichiers : un sous-dossier `src`, un sous-dossier `src/data`, et un sous-dossier `api`.

*Astuce : si le chat ne vous propose qu'un téléchargement fichier par fichier, faites-le pour chacun des 10 fichiers listés plus haut — ce n'est pas très long.*

## Étape 2 — Mettre le projet sur GitHub (depuis Safari, sans ordinateur)

Vercel déploie à partir d'un dépôt GitHub, donc on y met le code d'abord.

1. Allez sur **github.com** dans Safari, connectez-vous (ou créez un compte gratuit).
2. Appuyez sur **+** en haut à droite → **New repository**. Nommez-le `frigo-fute`, laissez-le public ou privé, ne cochez aucune case d'initialisation, puis **Create repository**.
3. Sur la page du dépôt vide, GitHub propose un lien **"uploading an existing file"** — appuyez dessus.
4. Depuis cet écran, appuyez sur **"choose your files"**, puis dans le sélecteur, allez dans l'app Fichiers → dossier `frigo-fute`, et **sélectionnez tous les fichiers et dossiers** de premier niveau (`index.html`, `package.json`, `vite.config.js`, `.gitignore`, `.env.example`, le dossier `src`, le dossier `api`). iOS permet de sélectionner plusieurs éléments en appuyant sur "Sélectionner" puis en cochant chaque élément.
5. En bas de la page, ajoutez un message ("premier commit") et appuyez sur **Commit changes**.
6. Vérifiez ensuite dans GitHub que l'arborescence `src/data/`, `api/` etc. est bien respectée (l'upload web de GitHub respecte normalement la structure des dossiers glissés).

*Si l'upload web perd la structure des sous-dossiers (ça arrive parfois avec Safari), l'alternative la plus fiable sur iPad est l'app gratuite **Working Copy** (client Git) : elle permet de créer le dépôt, d'y glisser les fichiers depuis Fichiers en conservant les dossiers, puis de "push" vers GitHub en quelques appuis.*

## Étape 3 — Déployer sur Vercel

1. Allez sur **vercel.com** dans Safari, connectez-vous avec votre compte GitHub (bouton "Continue with GitHub").
2. Appuyez sur **Add New… → Project**.
3. Sélectionnez le dépôt `frigo-fute` que vous venez de créer → **Import**.
4. Vercel détecte automatiquement qu'il s'agit d'un projet Vite : laissez les réglages par défaut (Build command `vite build`, Output directory `dist`).
5. **Avant de cliquer sur Deploy**, dépliez **Environment Variables** et ajoutez :
   - Name : `ANTHROPIC_API_KEY`
   - Value : votre clé API Anthropic (récupérée sur console.anthropic.com → API Keys)
6. Appuyez sur **Deploy**. Après une à deux minutes, Vercel vous donne une URL du type `frigo-fute.vercel.app` — c'est votre application, en ligne, utilisable par tout le monde.

## Étape 4 — Mises à jour ultérieures

Toute modification poussée sur la branche principale de votre dépôt GitHub (via un nouvel upload de fichier sur github.com, ou via Working Copy) redéploie automatiquement le site sur Vercel — aucune action supplémentaire n'est nécessaire.

## Notes

- **Coût** : chaque scan de ticket appelle l'API Claude et consomme donc du crédit sur votre compte Anthropic. Le reste de l'application (recettes, filtres, favoris) ne fait aucun appel API et est gratuit à faire tourner.
- **Images des recettes** : elles proviennent d'un service externe (loremflickr.com) à titre illustratif ; elles peuvent occasionnellement ne pas correspondre exactement au plat.
- **Vie privée** : les données du frigo, favoris et liste de courses sont stockées uniquement dans le navigateur de chaque visiteur (`localStorage`), pas sur un serveur commun — chaque personne a donc son propre frigo.
