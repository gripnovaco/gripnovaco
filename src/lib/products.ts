export type Product = {
  id: string;
  slug: string;
  name: string;
  sku: string;
  category: string; // category slug
  price: number;
  mrp: number;
  shortDescription: string;
  description: string;
  benefits: string[];
  specifications: { label: string; value: string }[];
  usage: string;
  faqs: { q: string; a: string }[];
  images: string[]; // URLs (can be empty -> uses gradient placeholder)
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
  rating: number;
  reviewCount: number;
  inStock: boolean;
};

export type Category = {
  slug: string;
  name: string;
  description: string;
  group: string;
  icon?: string;
};

export const CATEGORIES: Category[] = [
  // Exercise & Strengthening
  { slug: "resistance-bands", name: "Resistance Bands", group: "Exercise & Strengthening", description: "Progressive resistance for strength training and rehab." },
  { slug: "loop-bands", name: "Loop Bands", group: "Exercise & Strengthening", description: "Mini loop bands for glutes, hips and lower-body activation." },
  { slug: "therapy-putty", name: "Therapy Putty", group: "Exercise & Strengthening", description: "Hand and finger therapy putty for grip recovery." },
  { slug: "hand-grip-strengtheners", name: "Hand Grip Strengtheners", group: "Exercise & Strengthening", description: "Adjustable grippers to build forearm and hand strength." },
  { slug: "finger-exercisers", name: "Finger Exercisers", group: "Exercise & Strengthening", description: "Individual finger trainers for dexterity and rehab." },
  { slug: "exercise-tubes", name: "Exercise Tubes", group: "Exercise & Strengthening", description: "Latex resistance tubes with handles for full-body workouts." },
  // Pain Relief
  { slug: "tens-machines", name: "Digital TENS Machines", group: "Pain Relief", description: "Drug-free electrical nerve stimulation for pain relief." },
  { slug: "ems-stimulators", name: "EMS Muscle Stimulators", group: "Pain Relief", description: "Electrical muscle stimulation for recovery and toning." },
  { slug: "hot-packs", name: "Hot Packs", group: "Pain Relief", description: "Reusable heat therapy packs for sore muscles." },
  { slug: "cold-packs", name: "Cold Packs", group: "Pain Relief", description: "Cold therapy packs for swelling and acute injury." },
  { slug: "gel-packs", name: "Gel Packs", group: "Pain Relief", description: "Dual hot & cold gel packs for versatile therapy." },
  // Rehabilitation
  { slug: "shoulder-pulleys", name: "Shoulder Pulley Kits", group: "Rehabilitation", description: "Over-door pulleys for frozen shoulder and rotator cuff rehab." },
  { slug: "knee-rehab", name: "Knee Rehabilitation Kits", group: "Rehabilitation", description: "Complete knee rehab bundles for post-op recovery." },
  { slug: "ankle-rehab", name: "Ankle Rehabilitation Kits", group: "Rehabilitation", description: "Ankle strengthening and proprioception kits." },
  { slug: "wrist-exercisers", name: "Wrist Exercisers", group: "Rehabilitation", description: "Gyroscopic and resistance wrist trainers." },
  { slug: "balance-boards", name: "Balance Boards", group: "Rehabilitation", description: "Balance & proprioception trainers for stability." },
  // Orthopedic Supports
  { slug: "knee-braces", name: "Knee Braces", group: "Orthopedic Supports", description: "Compression and hinged knee braces." },
  { slug: "lumbar-supports", name: "Lumbar Back Supports", group: "Orthopedic Supports", description: "Lumbar belts for lower back pain and posture." },
  { slug: "cervical-collars", name: "Cervical Collars", group: "Orthopedic Supports", description: "Soft and rigid neck collars for cervical support." },
  { slug: "wrist-supports", name: "Wrist Supports", group: "Orthopedic Supports", description: "Wrist splints and supports for carpal tunnel & sprains." },
  { slug: "elbow-supports", name: "Elbow Supports", group: "Orthopedic Supports", description: "Tennis & golfer's elbow compression supports." },
  { slug: "ankle-supports", name: "Ankle Supports", group: "Orthopedic Supports", description: "Compression and lace-up ankle supports." },
  // Mobility Aids
  { slug: "walking-sticks", name: "Walking Sticks", group: "Mobility Aids", description: "Lightweight adjustable walking sticks." },
  { slug: "crutches", name: "Aluminium Crutches", group: "Mobility Aids", description: "Adjustable underarm aluminium crutches." },
  { slug: "walkers", name: "Walkers", group: "Mobility Aids", description: "Sturdy walking frames for adults & seniors." },
  { slug: "foldable-walkers", name: "Foldable Walkers", group: "Mobility Aids", description: "Compact, foldable walkers for travel and home." },
  // Fitness & Recovery
  { slug: "foam-rollers", name: "Foam Rollers", group: "Fitness & Recovery", description: "Self-myofascial release rollers for recovery." },
  { slug: "massage-balls", name: "Massage Balls", group: "Fitness & Recovery", description: "Trigger point massage balls for deep tissue work." },
  { slug: "exercise-balls", name: "Exercise Balls", group: "Fitness & Recovery", description: "Anti-burst stability balls for core and posture." },
  { slug: "yoga-mats", name: "Yoga Mats", group: "Fitness & Recovery", description: "Premium non-slip yoga and pilates mats." },
  { slug: "stretching-straps", name: "Stretching Straps", group: "Fitness & Recovery", description: "Multi-loop straps for guided stretching." },
];

const baseFaqs = [
  { q: "Is this product suitable for daily use?", a: "Yes, it's designed for safe daily use as part of your therapy or fitness routine. Follow the included guidance for best results." },
  { q: "Do you provide a warranty?", a: "All GripNova products carry a manufacturer warranty against defects. Contact us on WhatsApp for warranty claims." },
  { q: "How do I place an order?", a: "Tap any Buy Now / Order Now button to chat with us on WhatsApp. We confirm pricing, payment and delivery in minutes." },
];

const baseUsage = "Read the included instruction guide before first use. Start with light intensity and gradually progress as your comfort improves. Consult your physiotherapist if you have a pre-existing condition.";

function p(
  id: number,
  name: string,
  category: string,
  price: number,
  mrp: number,
  shortDescription: string,
  description: string,
  benefits: string[],
  specs: [string, string][],
  flags: Partial<Pick<Product, "featured" | "bestSeller" | "newArrival">> = {},
): Product {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const sku = "GN" + String(id).padStart(4, "0");
  return {
    id: String(id),
    slug,
    name,
    sku,
    category,
    price,
    mrp,
    shortDescription,
    description,
    benefits,
    specifications: specs.map(([label, value]) => ({ label, value })),
    usage: baseUsage,
    faqs: baseFaqs,
    images: [],
    rating: 4.3 + ((id % 7) / 10),
    reviewCount: 24 + (id * 7) % 280,
    inStock: true,
    ...flags,
  };
}

export const SEED_PRODUCTS: Product[] = [
  p(1, "Premium Resistance Band Set", "resistance-bands", 1299, 1999,
    "5-piece colour-coded resistance band set with carry pouch.",
    "A complete resistance training kit with five progressive bands (extra-light to extra-heavy) for strength training, rehabilitation and physiotherapy. Includes door anchor, handles, ankle straps and travel pouch.",
    ["Five resistance levels: 10–50 lbs", "Premium latex, non-snap construction", "Includes door anchor, handles and ankle straps", "Compact pouch — train anywhere"],
    [["Material", "Natural latex"], ["Resistance", "10–50 lbs"], ["Pieces", "5 bands + accessories"], ["Warranty", "6 months"]],
    { featured: true, bestSeller: true }),
  p(2, "Loop Resistance Bands (Set of 5)", "loop-bands", 599, 999,
    "5 fabric loop bands for glutes, hips and lower body.",
    "Premium non-slip fabric loop bands designed for glute activation, hip mobility and lower-body strength training. Ideal for home physio routines and pilates.",
    ["Non-slip woven fabric", "Five resistance levels", "Stays in place during squats & lunges", "Includes travel bag"],
    [["Material", "Cotton + latex blend"], ["Levels", "X-Light to X-Heavy"], ["Length", "33 cm"]],
    { newArrival: true }),
  p(3, "Therapy Putty (4 Levels)", "therapy-putty", 749, 1099,
    "Hand therapy putty for grip strengthening & rehab.",
    "Colour-coded therapy putty in four progressive resistances, designed by physiotherapists for hand, finger and grip rehabilitation. Latex-free and non-toxic.",
    ["Four colour-coded resistance levels", "Latex-free, non-toxic", "Great for arthritis & post-injury rehab", "85 g containers"],
    [["Weight", "4 × 85 g"], ["Resistance", "Soft → Firm"], ["Material", "Silicone putty"]],
    { featured: true }),
  p(4, "Adjustable Hand Grip Strengthener", "hand-grip-strengtheners", 449, 799,
    "Adjustable 5–60 kg grip strengthener.",
    "Premium adjustable hand grip with smooth resistance from 5 to 60 kg. Ergonomic non-slip handle for forearm, hand and finger conditioning.",
    ["Adjustable 5–60 kg", "Non-slip ergonomic grip", "Built-in counter", "Compact & portable"],
    [["Resistance", "5–60 kg"], ["Material", "Steel + TPR"], ["Weight", "260 g"]],
    { bestSeller: true }),
  p(5, "Finger Exerciser Trainer", "finger-exercisers", 349, 599,
    "Individual finger resistance trainer.",
    "Per-finger resistance trainer for guitarists, climbers and rehab patients. Develops independent finger strength and dexterity.",
    ["Independent finger resistance", "Three tension levels", "Ergonomic palm support", "Lightweight ABS body"],
    [["Levels", "Soft / Medium / Firm"], ["Material", "ABS + silicone"]]),
  p(6, "Pro Exercise Tubes with Handles", "exercise-tubes", 899, 1399,
    "Latex resistance tubes with foam handles.",
    "Heavy-duty latex exercise tubes with comfortable foam handles, door anchor and ankle strap. Ideal for resistance training and physiotherapy.",
    ["Heavy-duty latex tubing", "Comfort foam handles", "Door anchor included", "Three resistance options"],
    [["Length", "1.2 m"], ["Resistance", "Up to 35 lbs"]]),
  p(7, "Digital TENS Machine — Dual Channel", "tens-machines", 2499, 3999,
    "Dual-channel digital TENS unit with 16 modes.",
    "Clinical-grade dual-channel TENS machine with 16 therapy modes for drug-free pain relief. Rechargeable lithium battery, LCD display and timer.",
    ["16 pre-set therapy modes", "Dual-channel, 4 pads", "Rechargeable Li-ion battery", "LCD display & adjustable intensity"],
    [["Channels", "2"], ["Modes", "16"], ["Battery", "Rechargeable Li-ion"], ["Warranty", "1 year"]],
    { featured: true, bestSeller: true }),
  p(8, "EMS Muscle Stimulator", "ems-stimulators", 2199, 3499,
    "EMS device for muscle recovery & toning.",
    "EMS unit that delivers safe, low-frequency impulses to stimulate muscle contraction — great for recovery, conditioning and post-injury rehab.",
    ["Targets specific muscle groups", "Multiple intensity levels", "Rechargeable", "Comes with 4 reusable electrodes"],
    [["Modes", "10"], ["Battery", "USB rechargeable"]]),
  p(9, "Reusable Hot Gel Pack", "hot-packs", 499, 799,
    "Microwaveable reusable hot therapy pack.",
    "Reusable hot gel pack for muscle pain, cramps and stiffness. Heats in the microwave; soft cover for skin comfort.",
    ["Microwave & boil safe", "Soft fabric cover", "Long-lasting heat", "Targets neck, back & joints"],
    [["Size", "28 × 12 cm"], ["Material", "Medical-grade gel"]]),
  p(10, "Reusable Cold Gel Pack", "cold-packs", 449, 749,
    "Freezer-ready cold therapy pack.",
    "Reusable cold pack for swelling, sprains and acute injury. Stays flexible when frozen for full-contact icing.",
    ["Flexible when frozen", "Reduces swelling & pain", "Reusable", "Includes fabric sleeve"],
    [["Size", "28 × 12 cm"], ["Material", "Medical-grade gel"]]),
  p(11, "Shoulder Pulley Kit (Over-Door)", "shoulder-pulleys", 599, 999,
    "Over-door pulley for shoulder rehabilitation.",
    "Therapist-recommended over-door shoulder pulley for frozen shoulder, rotator cuff and post-surgery rehab. Foam handles & adjustable rope.",
    ["Frozen shoulder & rotator cuff rehab", "Foam handles for grip comfort", "Adjustable rope length", "Easy door installation"],
    [["Rope", "2.5 m nylon"], ["Door bracket", "Included"]]),
  p(12, "Knee Rehabilitation Kit", "knee-rehab", 1899, 2799,
    "Complete knee rehab bundle for post-op recovery.",
    "All-in-one knee rehab kit: compression sleeve, resistance bands, mini exercise ball, foam roller and printed exercise guide.",
    ["Compression sleeve included", "Bands + ball + roller", "Printed exercise guide", "Designed by physiotherapists"],
    [["Includes", "5 items"], ["Use", "Post-op & sports rehab"]],
    { featured: true }),
  p(13, "Ankle Rehabilitation Kit", "ankle-rehab", 1499, 2299,
    "Complete ankle rehab & strengthening kit.",
    "Ankle rehab bundle with compression sleeve, resistance band, balance pad and rehab guide for sprains and post-op recovery.",
    ["Compression sleeve", "Balance pad for proprioception", "Resistance band", "Rehab exercise guide"],
    [["Includes", "4 items"]]),
  p(14, "Pro Balance Board", "balance-boards", 1199, 1799,
    "Wooden wobble board for balance training.",
    "Premium hardwood wobble board for balance, proprioception and core stability. Non-slip surface; supports up to 120 kg.",
    ["Supports up to 120 kg", "Non-slip TPR surface", "Premium hardwood base", "16° tilt range"],
    [["Diameter", "40 cm"], ["Material", "Hardwood + TPR"]],
    { newArrival: true }),
  p(15, "Hinged Knee Support Brace", "knee-braces", 999, 1599,
    "Open-patella hinged knee brace.",
    "Hinged knee brace with open patella design for ligament support, post-op recovery and active sports use. Breathable neoprene.",
    ["Dual aluminium hinges", "Open patella design", "Breathable neoprene", "Adjustable straps"],
    [["Sizes", "S–XXL"], ["Material", "Neoprene + aluminium"]],
    { bestSeller: true }),
  p(16, "Lumbar Back Support Belt", "lumbar-supports", 899, 1499,
    "Lower back support with dual compression.",
    "Lumbar support belt with dual compression straps and posterior splints for lower back pain, posture and lifting support.",
    ["Dual compression straps", "Posterior support splints", "Breathable mesh", "Unisex sizing"],
    [["Sizes", "M–XXL"], ["Material", "Mesh + EVA"]]),
  p(17, "Soft Cervical Collar", "cervical-collars", 549, 899,
    "Soft foam cervical collar for neck support.",
    "Lightweight foam cervical collar for neck pain, whiplash and cervical spondylosis. Soft cover and adjustable closure.",
    ["Soft medical-grade foam", "Velcro closure", "Breathable cover", "Three sizes"],
    [["Sizes", "S / M / L"]]),
  p(18, "Wrist Support Brace", "wrist-supports", 449, 799,
    "Adjustable wrist splint for carpal tunnel.",
    "Wrist support brace with metal splint for carpal tunnel, sprains and post-injury rehab. Available in left/right.",
    ["Removable metal splint", "Adjustable straps", "Breathable neoprene", "Left / Right options"],
    [["Sizes", "S–XL"]]),
  p(19, "Premium Adjustable Walking Stick", "walking-sticks", 799, 1299,
    "Lightweight aluminium walking stick.",
    "Adjustable aluminium walking stick with anti-slip rubber base, foam grip and ergonomic handle. Supports up to 110 kg.",
    ["Adjustable height", "Anti-slip rubber base", "Ergonomic foam grip", "Lightweight aluminium"],
    [["Height", "78–98 cm"], ["Capacity", "110 kg"]]),
  p(20, "Aluminium Underarm Crutches (Pair)", "crutches", 1499, 2299,
    "Adjustable underarm crutches — pair.",
    "Premium aluminium underarm crutches with padded armrest, ergonomic hand grip and adjustable height.",
    ["Padded armrest & grip", "Adjustable height", "Lightweight aluminium", "Anti-slip tips"],
    [["Height", "120–155 cm"], ["Capacity", "120 kg"]]),
  p(21, "Foldable Walker with Wheels", "foldable-walkers", 2799, 3999,
    "Foldable walker with front wheels.",
    "Premium foldable walker with front wheels and rear rubber tips, designed for seniors and post-op recovery. Folds flat for storage.",
    ["Front wheels + rear tips", "Folds flat for storage", "Adjustable height", "Supports up to 110 kg"],
    [["Height", "78–94 cm"], ["Capacity", "110 kg"]],
    { featured: true }),
  p(22, "High-Density Foam Roller", "foam-rollers", 899, 1399,
    "33 cm high-density EVA foam roller.",
    "High-density EVA foam roller for self-myofascial release, muscle recovery and posture training.",
    ["High-density EVA", "Textured grid surface", "Lightweight & portable", "Targets back, legs & glutes"],
    [["Length", "33 cm"], ["Diameter", "14 cm"]],
    { bestSeller: true }),
  p(23, "Trigger Point Massage Ball", "massage-balls", 299, 499,
    "Lacrosse-style trigger point massage ball.",
    "Solid rubber massage ball for deep tissue and trigger point release. Targets feet, glutes, shoulders and back.",
    ["Solid rubber construction", "Targeted deep-tissue release", "Compact & portable", "Use against wall or floor"],
    [["Diameter", "6.3 cm"], ["Material", "Solid rubber"]]),
  p(24, "Anti-Burst Exercise Ball (65 cm)", "exercise-balls", 999, 1599,
    "65 cm anti-burst stability ball with pump.",
    "Anti-burst PVC stability ball for core training, posture and physiotherapy. Includes hand pump.",
    ["Anti-burst PVC, 500 kg capacity", "Non-slip texture", "Includes pump", "Sizes 55 / 65 / 75 cm"],
    [["Diameter", "65 cm"], ["Capacity", "500 kg"]]),
  p(25, "Professional Yoga Mat — 6 mm", "yoga-mats", 1099, 1699,
    "Non-slip 6 mm TPE yoga & pilates mat.",
    "Premium 6 mm TPE yoga mat with double-sided non-slip texture. Eco-friendly, lightweight, includes carry strap.",
    ["Eco-friendly TPE material", "Double-sided non-slip", "6 mm cushioned thickness", "Carry strap included"],
    [["Thickness", "6 mm"], ["Size", "183 × 61 cm"]],
    { newArrival: true }),
  p(26, "Multi-Loop Stretching Strap", "stretching-straps", 449, 749,
    "10-loop stretching strap with guide.",
    "Premium 10-loop stretching strap for guided flexibility, yoga and physical therapy. Includes printed pose guide.",
    ["10 numbered loops", "Strong woven nylon", "Pose guide included", "Use for yoga, dance & rehab"],
    [["Length", "1.8 m"], ["Material", "Woven nylon"]]),
];
