
import Groq from "groq-sdk";
import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";
import { localEmbed } from "./localEmbedder.js";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Model ổn định, không bị decommission
const GROQ_MODEL = "llama-3.3-70b-versatile";

const VECTOR_PATH = path.join(process.cwd(), "src", "rag", "vectorstore.json");
let vectorStore = [];

// Load vectorstore.json vào RAM
export async function loadVectorStore() {
  try {
    const raw = await fs.readFile(VECTOR_PATH, "utf8");
    vectorStore = JSON.parse(raw);
    console.log(`[RAG] Loaded vectorstore: ${vectorStore.length} docs`);
  } catch (e) {
    console.log("[RAG] vectorstore.json not found. Run buildVectorStore.js first.");
  }
}

export async function embed(text) {
  return await localEmbed(text);
}

function cosineSim(a, b) {
  let dot = 0, na = 0, nb = 0;
  const len = Math.min(a.length, b.length);

  for (let i = 0; i < len; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

export function searchVector(qEmb, topK = 5) {
  const scored = vectorStore.map(d => ({
    ...d,
    score: cosineSim(qEmb, d.embedding)
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK);
}

export async function llm(prompt) {
  const r = await groq.chat.completions.create({
    model: GROQ_MODEL,
    messages: [
      {
        role: "system",
        content:
          "Bạn là nhân viên CSKH của cửa hàng iPhone. Trả lời chính xác, ngắn gọn, không được đề nghị gặp nhân viên."
      },
      { role: "user", content: prompt }
    ]
  });

  return r.choices[0].message.content;
}

export async function ragAnswer(question) {
  const emb = await embed(question);
  const docs = searchVector(emb, 5);

  const context = docs.length
    ? docs.map(d => `- (${d.source}) ${d.text}`).join("\n")
    : "Không có dữ liệu.";

  const prompt = `
Dữ liệu nội bộ:

${context}

Khách hỏi: "${question}"

Hãy trả lời dựa vào tài liệu hoặc kiến thức CSKH về iPhone.
Không được nói: "tôi chưa chắc", "gặp nhân viên", "chuyển nhân viên".
`;

  return await llm(prompt);
}
