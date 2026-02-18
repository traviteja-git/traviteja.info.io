import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    date:        z.string(),
    tags:        z.array(z.string()).optional().default([]),
    image:       z.string().optional(),
    draft:       z.boolean().optional().default(false),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    tech:        z.array(z.string()),
    github:      z.string().url().optional(),
    liveUrl:     z.string().url().optional(),
    featured:    z.boolean().optional().default(false),
  }),
});

export const collections = { blog, projects };
