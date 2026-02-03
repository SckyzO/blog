---
title: "Guide Astro et Sécurité"
description: "Comment sécuriser son blog statique tout en gardant une excellente performance."
pubDate: 2024-02-04
updatedDate: 2024-02-05
tags: ["sécurité", "astro", "tutoriel"]
heroImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80"
---

## Pourquoi la sécurité est importante même en statique ?

Même si un site statique n'a pas de base de données SQL injectable, il reste vulnérable aux :
- **XSS** (via des scripts tiers).
- **Clickjacking**.
- **Injections de contenu**.

### Solutions implémentées ici

1. **CSP** via Meta tags.
2. **SAST** avec ESLint Security.
3. **Validation Zod** pour empêcher les injections dans le frontmatter.
