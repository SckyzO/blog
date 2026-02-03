# GEMINI.md - Project Context & Guidelines

Ce fichier définit les règles, l'architecture et les standards de développement pour le projet **Blog Tomzone**.
Tout agent travaillant sur ce projet DOIT respecter ces directives.

## 1. Stack Technique

- **Framework Core :** Astro v5
- **Langage :** TypeScript (Strict Mode)
- **Styling :** TailwindCSS v4 + DaisyUI v5
- **Validation :** Zod (via Astro Content Collections)
- **Linting/Formatting :** ESLint, Stylelint, Prettier
- **Testing :** Vitest (Unit), Playwright (E2E), Docker (Environment)

## 2. Architecture & Structure

```
.
├── src/
│   ├── components/    # Composants UI réutilisables (Header, Footer, Card...)
│   ├── content/       # Collections de contenu (Markdown/MDX) & Config Zod
│   ├── layouts/       # Layouts globaux (Base, Post)
│   ├── pages/         # Routes (Fichiers .astro)
│   └── styles/        # CSS global
├── public/            # Assets statiques
├── .github/           # Workflows CI/CD
└── ...configs         # Fichiers de configuration (astro, tailwind, eslint...)
```

## 3. Standards de Qualité & Sécurité

### A. Validation des Données (3 Phases)

Toute manipulation de donnée (particulièrement le contenu et les entrées utilisateur) doit passer par ces 3 phases :

1.  **Schéma (Structurel) :** Validation des types et formats (String, Date, URL) via **Zod**.
2.  **Sémantique (Cohérence) :** Validation des règles logiques (ex: `updatedDate` >= `pubDate`).
3.  **Métier (Règles Business) :** Validation des contraintes du domaine (ex: "Pas de publication sans image de couverture", "Tags uniques").

### B. Analyse de Sécurité

- **SAST (Static Application Security Testing) :**
    - Utilisation stricte de `eslint-plugin-security`.
    - Pas d'injection de HTML brut sans sanitization (`set:html` interdit sauf exception justifiée).
    - `npm audit` obligatoire en CI.
- **DAST (Dynamic Application Security Testing) :**
    - Tests E2E vérifiant les en-têtes de sécurité (CSP, X-Frame-Options).
- **Revue de Code :**
    - Vérification manuelle des dépendances tierces avant ajout.

### C. Linting & Formatting

Chaque composant doit respecter les règles définies :
- **JS/TS/Astro :** `npm run lint` (ESLint + plugin Astro).
- **CSS :** `npm run lint:css` (Stylelint standard).
- **Formatage :** `npm run format` (Prettier avec plugins Astro/Tailwind).

## 4. Stratégie de Test (Containerized)

Tous les tests doivent être exécutables dans un environnement isolé (Docker).

- **Unitaires :** Vitest.
- **E2E :** Playwright.
- **Infrastructure :**
    - `Dockerfile.test` pour l'environnement de test.
    - `docker-compose.test.yml` pour l'orchestration locale.

## 5. Workflow CI/CD

Le pipeline `.github/workflows/ci.yml` est la source de vérité pour la validation.
Il doit exécuter séquentiellement :
1.  Installation propre (`npm ci`).
2.  Audit de sécurité (`npm audit`).
3.  Linting (Code & Style).
4.  Type Checking (`astro check`).
5.  Build de production.
6.  Tests (Unitaires & E2E).

---
**Note pour l'Agent :** Avant toute modification de code, vérifier si les fichiers de configuration (Zod, ESLint) couvrent les nouveaux cas d'usage.
