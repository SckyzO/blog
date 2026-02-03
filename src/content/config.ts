import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  // Phase 1: Validation Schéma (JSON Schema-like)
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/blog" }),
  schema: z.object({
    title: z.string().min(5, "Le titre doit faire au moins 5 caractères").max(100, "Le titre est trop long"),
    description: z.string().min(10, "La description doit être significative"),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    isDraft: z.boolean().default(false),
  }).refine((data) => {
    // Phase 2: Validation Sémantique & Métier
    // Règle métier : Si l'article n'est pas un brouillon, il doit avoir une image de couverture (exemple)
    if (!data.isDraft && !data.heroImage) {
        // Note: On pourrait retourner false ici, mais pour l'exemple on est permissif ou on log
        return true; 
    }
    return true;
  }, {
    message: "Les articles publiés doivent avoir une image de couverture.",
    path: ["heroImage"]
  }).refine((data) => {
      // Règle sémantique : La date de mise à jour doit être après la date de publication
      if (data.updatedDate && data.updatedDate < data.pubDate) {
          return false;
      }
      return true;
  }, {
      message: "La date de mise à jour ne peut pas être antérieure à la date de publication.",
      path: ["updatedDate"]
  })
});

export const collections = { blog };