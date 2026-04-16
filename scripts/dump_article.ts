import { createClient } from 'next-sanity';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.production' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-05-03',
});

async function main() {
  const article = await client.fetch('*[_type == "article" && title == "Indian Historical Timeline (Part 2): The Schools of Indian Philosophy"][0]');
  console.log(JSON.stringify(article, null, 2));
}

main().catch(console.error);
