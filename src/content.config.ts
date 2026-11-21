import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const events = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
	schema: z.object({
		/** Neutral, factual headline of what happened. */
		title: z.string(),
		/** Day it happened (or was announced), as YYYY-MM-DD. */
		date: z.coerce.date(),
		/** The sarcastic one-liner. Starts with "Thank you for ...". */
		thanks: z.string(),
		/** Who did it: Trump himself and/or members of his circle. */
		actors: z.array(z.string()).min(1),
		/** Who bore the damage. */
		scope: z.enum(['america', 'world', 'both']),
		category: z.enum([
			'democracy',
			'civil-rights',
			'climate',
			'health',
			'economy',
			'foreign-policy',
			'immigration',
			'justice',
		]),
		/** Every entry must be backed by at least one source. */
		sources: z
			.array(z.object({ title: z.string(), url: z.url() }))
			.min(1),
		/** Drafts are left out of the built site. */
		draft: z.boolean().default(false),
	}),
});

export const collections = { events };
