
import dotenv from "dotenv";
dotenv.config();

import fs from "fs/promises";
import path from "path";
import { getPool } from "../config/db.js";
import { embed } from "./ragCore.js";

const VECTOR_STORE_PATH = path.join(process.cwd(), "src", "rag", "vectorstore.json");

async function buildVectorStore() {
  const conn = await getPool();

  // Load FAQ
  const faq = await conn.request().query(`
    SELECT ID, Category, Question, Answer 
    FROM FAQ
  `);

  // Load Form
  const forms = await conn.request().query(`
    SELECT FormID, Title, Content, Typ 
    FROM Form
  `);

  const docs = [];
  console.log(`\n[RAG] Embedding FAQ: ${faq.recordset.length} rows`);

  for (const row of faq.recordset) {
    const text = `Danh mục: ${row.Category}
Câu hỏi: ${row.Question}
Trả lời: ${row.Answer}`;

    try {
      const embedding = await embed(text);

      docs.push({
        id: `FAQ_${row.ID}`,
        type: "FAQ",
        source: `FAQ (${row.Category})`,
        text,
        embedding,
        updatedAt: new Date().toISOString()
      });
    } catch (err) {
      console.error(`Embedding lỗi FAQ ID=${row.ID}`, err);
    }
  }

  console.log(`\n[RAG] Embedding Form: ${forms.recordset.length} rows`);

  for (const row of forms.recordset) {
    const text = `Loại form: ${row.Typ}
Tiêu đề: ${row.Title}
Nội dung: ${row.Content}`;

    try {
      const embedding = await embed(text);

      docs.push({
        id: `FORM_${row.FormID}`,
        type: "Form",
        source: `Form (${row.Typ})`,
        text,
        embedding,
        updatedAt: new Date().toISOString()
      });
    } catch (err) {
      console.error(`Embedding lỗi FORM ID=${row.FormID}`, err);
    }
  }

  await fs.writeFile(VECTOR_STORE_PATH, JSON.stringify(docs, null, 2), "utf8");

  console.log(`\n[RAG] DONE — vectorstore = ${docs.length} docs`);
  console.log(`[RAG] Saved at: ${VECTOR_STORE_PATH}`);
}

buildVectorStore()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("\n[RAG] Build error:", err);
    process.exit(1);
  });
