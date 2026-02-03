import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
	type: 'content',
	// Schema validation for blog posts
	schema: z.object({
		title: z.string().min(1, "Title is required"),
		description: z.string().max(160, "Description allows SEO optimization and should be short"),
		pubDate: z.date(),
		updatedDate: z.date().optional(),
		heroImage: z.string().optional(),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
	}),
});

export const collections = {
	blog: blogCollection,
};
