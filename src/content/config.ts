import { z, defineCollection } from "astro:content";
const tutorialsCollection = defineCollection({
  type: "content", // v2.5.0 and later
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()),
  }),
});

const howToGuidesCollection = defineCollection({
  type: "content", // v2.5.0 and later
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()),
  }),
});

export const collections = {
  tutorials: tutorialsCollection,
  guides: howToGuidesCollection,
};
