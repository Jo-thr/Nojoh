# Nojoh (Monorepo)

Boilerplate pour démarrer un roadmap de tâches moderne avec séparation **front** / **back** dans un seul repo.

---

## 📦 Stack

- **Frontend**: Next.js (App Router), TailwindCSS, ShadCn, TanStack Query, Drag & Drop
- **Backend**: Hono + Zod + Prisma
- **Base de données**: PostgreSQL (via Docker)
- **Authentification**: Better Auth avec Google OAuth
- **DevOps**: Docker, Docker Compose, Makefile

---

## 🔐 Authentification

Ce projet utilise **Google OAuth** pour l'authentification. Les utilisateurs peuvent se connecter et créer un compte uniquement via Google.

### Configuration requise

1. Créer un projet Google Cloud et configurer OAuth 2.0
2. Configurer les variables d'environnement `GOOGLE_CLIENT_ID` et `GOOGLE_CLIENT_SECRET`
3. Voir le fichier `GOOGLE_OAUTH_SETUP.md` pour les instructions détaillées

---

## 🗂 Structure du projet

```
nojoh/
├── app/                  # Pages App Router
├── components/           # Composants UI
├── styles/               # Styles globaux
├── public/               # Assets statiques
├── prisma/               # Prisma schema + migrations
├── Dockerfile            # Image frontend
├── package.json
└── tsconfig.json
├── docker-compose.yml       # Stack Docker (frontend + backend + DB)
├── Makefile                 # Commandes projet
├── .env                     # Variables d'environnement
└── README.md                # Ce fichier
```

---

## 🛠️ Commandes Makefile

Le projet est automatisé via un `Makefile` situé à la racine du repo. Voici les principales commandes disponibles :

### 🧰 Setup

- `make init` : Installe tout (dépendances + Prisma)
- `make check-env` : Vérifie la présence du fichier `.env`
- `make create-env` : Crée un `.env` à partir de `.env.example`

### 🧩 Installations

- `make install` : Installe les dépendances

### 🚀 Project Control

- `make up` : Lance tout le projet avec Docker
- `make down` : Arrête les services
- `make restart` : Redémarre les services

### 🧬 Prisma

- `make db-migrate` : Applique les migrations
- `make db-reset` : Réinitialise complètement la DB
- `make db-pull` : Sync depuis la DB
- `make db-generate` : Génère Prisma Client
- `make db-seed` : Insère des données de démo
- `make reset-db` : Reset + seed
- `make db-studio` : Explorer la base visuellement

### 🧪 Logs & Debug

- `make logs` : Affiche les logs en live

### 🧹 Nettoyage

- `make clean` : Supprime containers et volumes
- `make clean-next` : Supprime le cache Next.js

---

## ✅ Lancer le projet

```bash
make up
```

Puis accéder au front : [http://localhost:3000](http://localhost:3000)

---

## 📌 À suivre

- Exemple Drag & Drop + persistance
- Auth
- Seed de données
- Tests + déploiement
- Migration vers Hono terminée ✅

---

## 🤝 Contribuer

Fork + branche `feature/xxx` + PR 🧡
