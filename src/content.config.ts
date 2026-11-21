import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const events = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
	schema: ({ image }) =>
		z.object({
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
			/**
			 * One striking number, shown large. Use sparingly: only when the number is
			 * telling and is not already in the title or the "thank you" line. It must
			 * be backed by the body.
			 */
			figure: z
				.object({
					/** Keep it short: "14M", "$48B+", "−12%". */
					value: z.string().max(10),
					/** What the number counts, in a few words. */
					label: z.string(),
				})
				.optional(),
			/** A photo. Only public-domain or freely licensed images, always credited. */
			image: z
				.object({
					/** Path to the file, relative to the entry, e.g. ../../assets/events/x.jpg */
					src: image(),
					alt: z.string(),
					/** Author and license, e.g. "Tyler Merbler, CC BY 2.0". */
					credit: z.string(),
					/** Page the image was taken from. */
					creditUrl: z.url(),
					/** CSS object-position, for steering the 16:9 crop. */
					position: z.string().optional(),
				})
				.optional(),
			/** Every entry must be backed by at least one source. */
			sources: z
				.array(z.object({ title: z.string(), url: z.url() }))
				.min(1),
			/** Drafts are left out of the built site. */
			draft: z.boolean().default(false),
		}),
});

export const collections = { events };
