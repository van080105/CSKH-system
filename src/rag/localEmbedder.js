
import { pipeline } from "@xenova/transformers";

let embedder = null;

export async function localEmbed(text) {
  if (!embedder) {
    console.log("Loading embedding model (all-MiniLM-L6-v2)...");
    embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
    console.log("Embedding model loaded.");
  }

  const out = await embedder(text);
  return Array.from(out.data[0]);
}

