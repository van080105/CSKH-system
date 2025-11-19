import { localEmbed } from "../rag/localEmbedder.js";

const INTENTS = [
  {
    name: "product_info",
    examples: [
      "iPhone có màu gì",
      "iPhone 14 thông số thế nào",
      "so sánh iPhone 15 và 14"
    ]
  },
  {
    name: "price",
    examples: [
      "giá bao nhiêu",
      "khuyến mãi không",
      "giảm giá không",
      "bao nhiêu tiền"
    ]
  },
  {
    name: "payment",
    examples: [
      "có trả góp không",
      "thanh toán như thế nào",
      "có hỗ trợ visa không",
      "momo có được không"
    ]
  },
  {
    name: "warranty",
    examples: [
      "bảo hành như thế nào",
      "bị lỗi màn hình",
      "máy sọc, máy vỡ",
      "đổi trả được không"
    ]
  },
  {
    name: "shipping",
    examples: [
      "đơn hàng đang ở đâu",
      "giao hàng bao lâu",
      "ship về khi nào",
      "kiểm tra đơn hàng"
    ]
  },
  {
    name: "other",
    examples: ["tư vấn", "hỗ trợ", "liên hệ nhân viên"]
  }
];

function cosine(a, b) {
  let dot = 0,
    na = 0,
    nb = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

export async function classifyIntent(message) {
  const msgEmb = await localEmbed(message);

  let bestScore = -1;
  let bestIntent = "other";

  for (const intent of INTENTS) {
    for (const example of intent.examples) {
      const emb = await localEmbed(example);
      const score = cosine(msgEmb, emb);

      if (score > bestScore) {
        bestScore = score;
        bestIntent = intent.name;
      }
    }
  }

  return { intent: bestIntent, confidence: bestScore };
}
