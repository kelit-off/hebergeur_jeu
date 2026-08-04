# Hebergeur Jeu

Monorepo Turborepo pour la plateforme d'hébergement de serveurs de jeux.

## Apps

- `apps/web`: frontend [Next.js](https://nextjs.org/)
- `apps/api`: backend [NestJS](https://nestjs.com/) (Prisma + Stripe)

## Développement

Installer les dépendances depuis la racine (workspaces npm) :

```sh
npm install
```

Lancer toutes les apps en mode dev :

```sh
npm run dev
```

Lancer une app spécifique :

```sh
npx turbo run dev --filter=web
npx turbo run dev --filter=api
```

## Build

```sh
npm run build
```

## Autres commandes

```sh
npm run lint
npm run check-types
npm run format
```
