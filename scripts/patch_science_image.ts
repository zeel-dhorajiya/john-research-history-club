import { createClient } from 'next-sanity';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.production' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03',
});

// Path to the newly generated image
const NEW_IMAGE_PATH = 'C:/Users/jashd/.gemini/antigravity/brain/fc96f81e-2032-42ee-b68b-0bc42a287447/modern_indian_science_v2_1776270570664.png';
const ARTICLE_SLUG = 'science-indian-history-legacy-scientists';

async function patchScienceImage() {
  console.log('🚀 Patching 5th image for "Science in Indian History"...');

  // 1. Upload the new asset
  const fileContent = fs.readFileSync(NEW_IMAGE_PATH);
  const asset = await client.assets.upload('image', fileContent, {
    filename: 'modern_science_v2.png',
  });
  console.log(`✅ New asset uploaded: ${asset._id}`);

  // 2. Fetch the article
  const article = await client.fetch(`*[_type == "article" && slug.current == $slug][0]`, { slug: ARTICLE_SLUG });
  if (!article) {
    console.error('❌ Article not found!');
    return;
  }

  // 3. Find the 4th image block (it's the 5th image overall, counting hero)
  // Hero is images[0].
  // Body has:
  // - Block
  // - Image (img2) -> Index 1
  // - H2
  // - Block
  // - Image (img3) -> Index 4
  // - H2
  // - Block
  // - Image (img4) -> Index 7
  // - H2
  // - Block
  // - Image (img5) -> Index 10
  
  // Let's actually look for the image block that has img5's previous ID or use position.
  // In the previous upload, img5 was the 4th image block in the body array.
  
  const body = [...article.body];
  let imageCount = 0;
  for (let i = 0; i < body.length; i++) {
    if (body[i]._type === 'image') {
      imageCount++;
      if (imageCount === 4) { // This is the 4th image in the body (the 5th overall)
        console.log(`✨ Replacing image block at index ${i}`);
        body[i].asset = { _type: 'reference', _ref: asset._id };
        break;
      }
    }
  }

  // 4. Update the article
  await client.patch(article._id)
    .set({ body })
    .commit();

  console.log('✅ Article patched successfully with the new image!');
}

patchScienceImage().catch(console.error);
