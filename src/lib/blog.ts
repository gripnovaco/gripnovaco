export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMinutes: number;
  publishedAt: string;
  content: string; // markdown-ish plain paragraphs
};

const lorem = (topic: string) => `Physiotherapy plays a central role in modern, drug-free recovery. In this guide we explore how a structured ${topic.toLowerCase()} routine, performed consistently, can dramatically improve outcomes for patients of all ages.

We begin with the science: how the body adapts to controlled mechanical loading, how circulation and lymphatic drainage accelerate tissue repair, and why progressive overload — applied gently — is the foundation of every successful rehabilitation programme.

Next, we walk through a practical week-by-week plan you can do at home using simple GripNova equipment such as resistance bands, foam rollers and therapy putty. Each phase builds on the previous one, with clear milestones so you always know whether you are progressing safely.

We close with red-flag symptoms that should prompt you to consult your physiotherapist, plus answers to the most common questions our customers ask us about ${topic.toLowerCase()}.

Remember: consistency beats intensity. Ten focused minutes a day, every day, will outperform a single long session per week — and your body will thank you for it.`;

export const SEED_POSTS: BlogPost[] = [
  ["The Surprising Benefits of Daily Physiotherapy", "Recovery", "Physiotherapy"],
  ["A Complete Guide to Frozen Shoulder Recovery", "Rehabilitation", "Frozen shoulder rehab"],
  ["Knee Pain Management Without Surgery", "Pain Management", "Knee pain management"],
  ["10 Lower Back Pain Exercises You Can Do at Home", "Exercises", "Lower back exercises"],
  ["Sports Injury Recovery: Phase by Phase", "Sports", "Sports injury recovery"],
  ["The Home Rehabilitation Starter Guide", "Guides", "Home rehabilitation"],
  ["Balance Training for Seniors — A Safe Routine", "Seniors", "Balance training"],
  ["Stretching Routines That Actually Work", "Exercises", "Stretching"],
  ["How to Prevent Neck Pain at the Desk", "Posture", "Neck pain prevention"],
  ["Post-Surgery Recovery: What to Expect Week by Week", "Rehabilitation", "Post-surgery recovery"],
  ["Choosing the Right Resistance Band for You", "Equipment", "Resistance bands"],
  ["TENS vs EMS: Which One Do You Need?", "Pain Management", "TENS and EMS"],
  ["Carpal Tunnel: Conservative Treatment Options", "Pain Management", "Carpal tunnel"],
  ["Hot vs Cold Therapy — The Definitive Answer", "Pain Management", "Hot and cold therapy"],
  ["Plantar Fasciitis: Home Treatment Plan", "Pain Management", "Plantar fasciitis"],
  ["Tennis Elbow Recovery in 6 Weeks", "Sports", "Tennis elbow"],
  ["Foam Rolling: A Beginner's Guide", "Recovery", "Foam rolling"],
  ["Posture Correction Exercises for Office Workers", "Posture", "Posture correction"],
  ["Hand Therapy Putty Exercises for Arthritis", "Rehabilitation", "Therapy putty exercises"],
  ["Core Stability for Lower Back Health", "Exercises", "Core stability"],
].map(([title, category, topic], i) => {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const date = new Date(2026, 0, 5 + i * 6);
  return {
    slug,
    title,
    category,
    excerpt: `Practical, physiotherapist-backed guidance on ${topic.toLowerCase()} — what works, what doesn't, and how to build a safe routine you'll actually follow.`,
    readMinutes: 4 + (i % 5),
    publishedAt: date.toISOString().slice(0, 10),
    content: lorem(topic),
  } as BlogPost;
});
