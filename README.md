# Verdanta — maqueta de plataforma inmobiliaria premium (Costa Rica)

Prototype frontend interactif (phase 1). **Nom de marque provisoire** : « Verdanta » (disponibilité du nom et du domaine **non vérifiée**).
Toutes les annonces, prix et demandes sont **fictifs**. Aucun backend, aucune base de données, aucune authentification réelle.

## Lancer en local

```bash
npm install        # versions figées (save-exact dans .npmrc)
npm run dev        # http://localhost:3000
npm run build      # build de production
npm run start      # sert le build
npm run lint       # vérification TypeScript (tsc --noEmit)
```

Node 20+ recommandé (22 utilisé pour les tests).

## Pages

| URL | Contenu |
|---|---|
| `/` | Accueil : hero, moteur de recherche, sélection, destinations, régions, expérience, avantages, CTA |
| `/propiedades` | Catalogue : recherche, filtres (province, ville, type, chambres, budget), tri, compteur, état vide ; filtres dans l'URL |
| `/propiedades/CR-001` … | Fiche : galerie + lightbox, caractéristiques, équipements, localisation, formulaire, WhatsApp, similaires |
| `/destinos` | 14 destinations par province, compteurs calculés depuis les données |
| `/nosotros`, `/contacto` | À propos, contact |
| `/admin` | **Maquette** du back-office (voir limites ci-dessous) |

## Où modifier quoi

- Données : `data/properties.ts` (16 annonces), `data/destinations.ts`, `data/inquiries.ts`
- Textes ES/EN : `lib/i18n/es.ts`, `lib/i18n/en.ts` (ajouter une langue = un nouveau fichier + type `Lang`), équipements : `lib/i18n/amenities.ts`
- Coordonnées, nom de marque, taux CRC, WhatsApp : `lib/config.ts` (modifiables aussi dans Admin → Ajustes)
- Vraies photos : ajouter `src: "https://…"` à un élément de `photos` ; l'illustration SVG sert de secours si l'image échoue
- Palette/typo : `tailwind.config.ts` (forest, cream, sand, gold ; Cormorant Garamond + Manrope via Google Fonts dans `app/layout.tsx`)

## Déploiement Netlify (préparation)

Netlify détecte Next.js automatiquement (doc : https://docs.netlify.com/frameworks/next-js/overview/). `netlify.toml` fournit commande de build et version de Node.

1. Pousser le dossier sur GitHub.
2. Netlify → *Add new site* → *Import from Git* → choisir le dépôt.
3. Build command `npm run build` (déjà dans `netlify.toml`) ; ne pas définir de dossier de publication manuel si Netlify en propose un.
4. Définir `NEXT_PUBLIC_SITE_URL` (voir `.env.example`) avec l'URL finale (sitemap/OpenGraph).
5. Vérifier après déploiement : actualisation de `/propiedades/CR-001`, `/admin`, `/robots.txt`.

Le projet n'utilise ni route API ni serveur persistant. `npm run build` a été exécuté avec succès en local ; **aucun déploiement Netlify n'a été effectué ni testé**.

## Fonctionnalités simulées

- Formulaires (contact et fiche) : validation réelle, confirmation **simulée** ; rien n'est envoyé. Les messages apparaissent dans Admin → Consultas pour la session.
- Back-office : créer / modifier / dupliquer / supprimer / publier, photos (téléversement local, réordonner, principale), consultas, ajustes — **en mémoire uniquement**, perdus au rechargement.
- Conversion USD → CRC : taux de référence **éditable**, pas de source temps réel.
- Carte : encart de démonstration + lien OpenStreetMap vers la zone (ville), pas l'adresse du bien.
- Images : 19 photos fournies par le client dans `public/photos/` (`CR-001-1.jpg`…), associées dans `data/properties.ts` (`REAL_PHOTOS`). Les propriétés sans photo gardent des illustrations SVG. Basse résolution (~612 px) : prévoir des fichiers plus grands pour la version finale ; droits d'utilisation à vérifier.
- Bouton WhatsApp : désactivé tant qu'aucun numéro n'est saisi.

## Reste à développer (phase 2, après validation du client)

PostgreSQL + Prisma, authentification et autorisation côté serveur pour `/admin` (aujourd'hui **aucune protection** : `noindex` et `robots.txt` ne sont pas de la sécurité), stockage externe des photos, envoi réel des formulaires + notifications, vraies photos (droits vérifiés), vraie carte, contenus réels de « À propos », pagination/recherche serveur, tests automatisés.

## Direction artistique & UX

Luxe discret tropical : vert forêt profond, blanc cassé, sable, touches dorées ; titres en Cormorant Garamond (éditorial), texte et prix en Manrope (lisibilité). Grandes images, beaucoup d'espace, cartes sobres. Animations : CSS pour les survols, Motion for React pour l'entrée du hero, les révélations au scroll, le menu mobile, la galerie et les listes ; `prefers-reduced-motion` respecté ; transform/opacity uniquement ; GSAP et Three.js non utilisés. Mobile-first, cibles ≥ 44 px, focus visible, labels explicites, erreurs près des champs.
