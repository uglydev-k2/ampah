import { siteConfig, productCategories } from "@/config/site";
import { faqItems } from "@/data/sample-data";
import { FREE_SHIPPING_THRESHOLD_GHS, SHIPPING_FEE_GHS } from "@/data/ghana-prices";

export type ChatMessage = { role: "user" | "assistant"; content: string };

export function buildSystemPrompt(): string {
  const categories = productCategories.map((c) => c.name).join(", ");
  const faq = faqItems.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n");

  return `You are Ampah Assistant, the friendly AI helper for ${siteConfig.name}, an online pharmacy in Ghana.

Your role:
- Help customers with orders, delivery, prescriptions, product categories, store hours, and general pharmacy services.
- Be warm, concise, and professional. Use Ghana Cedi (GH₵) for prices.
- Free shipping on orders over GH₵${FREE_SHIPPING_THRESHOLD_GHS}. Standard shipping fee is GH₵${SHIPPING_FEE_GHS}.
- Product categories: ${categories}.

Contact:
- Phone: ${siteConfig.contact.phone}
- Email: ${siteConfig.contact.email}
- Address: ${siteConfig.contact.address}
- Hours: ${siteConfig.hours.weekdays}; ${siteConfig.hours.weekend}

Important rules:
- Do NOT diagnose conditions, prescribe medication, or give specific medical advice.
- For symptoms or drug interactions, recommend speaking to a licensed pharmacist or doctor.
- For emergencies, tell them to call emergency services or visit the nearest hospital immediately.
- Prescription uploads: direct them to /prescription on the website.
- Shopping: direct them to /shop.

FAQ knowledge:
${faq}`;
}

export function findFaqAnswer(question: string): string | null {
  const q = question.toLowerCase();
  let best: { score: number; answer: string } | null = null;

  for (const item of faqItems) {
    const words = item.question.toLowerCase().split(/\W+/).filter((w) => w.length > 3);
    const score = words.reduce((acc, word) => (q.includes(word) ? acc + 1 : acc), 0);
    if (score > 0 && (!best || score > best.score)) {
      best = { score, answer: item.answer };
    }
  }

  return best && best.score >= 1 ? best.answer : null;
}

export function fallbackReply(question: string): string {
  const faq = findFaqAnswer(question);
  if (faq) return faq;

  const q = question.toLowerCase();

  if (/(hello|hi|hey|good morning|good afternoon)/.test(q)) {
    return `Hello! I'm Ampah Assistant. I can help with delivery, prescriptions, products, and store info. What would you like to know?`;
  }

  if (/(price|cost|how much|gh₵|cedi)/.test(q)) {
    return `Prices vary by product. Browse our shop at /shop — most items are priced in GH₵. Free delivery on orders over GH₵${FREE_SHIPPING_THRESHOLD_GHS}. Need a specific product? Tell me the name.`;
  }

  if (/(delivery|ship|accra|kumasi|deliver)/.test(q)) {
    return `We offer standard (3–5 days), express (1–2 days), and same-day delivery in Accra and Kumasi. Free shipping on orders over GH₵${FREE_SHIPPING_THRESHOLD_GHS}.`;
  }

  if (/(prescription|rx|upload)/.test(q)) {
    return `Upload your prescription at /prescription — add your details and attach a photo or PDF. Our pharmacists review it within 24 hours.`;
  }

  if (/(hour|open|close|time)/.test(q)) {
    return `We're open ${siteConfig.hours.weekdays} and ${siteConfig.hours.weekend}. Call ${siteConfig.contact.phone} for urgent help.`;
  }

  if (/(contact|phone|email|call|reach)/.test(q)) {
    return `Reach us at ${siteConfig.contact.phone} or ${siteConfig.contact.email}. We're at ${siteConfig.contact.address}.`;
  }

  if (/(pain|headache|fever|sick|symptom|medicine for)/.test(q)) {
    return `I can't give medical advice, but our licensed pharmacists can help. For product browsing, visit /shop or call ${siteConfig.contact.phone}. If this is urgent, please see a doctor or visit the nearest hospital.`;
  }

  return `I'm here to help with Ampah Pharmacy questions — delivery, prescriptions, products, and orders. Try asking about delivery options, uploading a prescription, or our store hours. You can also call ${siteConfig.contact.phone}.`;
}
