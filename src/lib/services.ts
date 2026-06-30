import strokeImg from "@/assets/services/stroke.jpg";
import cervicalImg from "@/assets/services/cervical.jpg";
import homeImg from "@/assets/services/home-visit.jpg";
import orthoImg from "@/assets/services/orthopedic.jpg";
import sportsImg from "@/assets/services/sports.jpg";
import pediatricImg from "@/assets/services/pediatric.jpg";
import geriatricImg from "@/assets/services/geriatric.jpg";

export type Exercise = {
  name: string;
  what: string;
  how: string;
  benefits: string;
};

export type Service = {
  slug: string;
  title: string;
  tagline: string;
  image: string;
  overview: string;
  whoFor: string[];
  exercises: Exercise[];
};

export const SERVICES: Service[] = [
  {
    slug: "stroke-rehabilitation",
    title: "Stroke & Brain Injury Rehabilitation",
    tagline: "Regain strength, movement and independence after a stroke.",
    image: strokeImg,
    overview:
      "Our certified physiotherapists design progressive recovery programs for post-stroke and brain injury patients — combining neuro-motor retraining, balance work and functional task practice to restore daily independence.",
    whoFor: [
      "Ischemic or hemorrhagic stroke survivors",
      "Traumatic brain injury (TBI) patients",
      "Patients with hemiplegia or hemiparesis",
      "Individuals with post-stroke speech, gait or balance issues",
    ],
    exercises: [
      {
        name: "Passive Range of Motion (PROM)",
        what: "Therapist-assisted movement of the affected arm or leg through its full natural range.",
        how: "Performed 2–3 times daily, each joint moved slowly through 8–10 repetitions while the patient is supported and relaxed.",
        benefits: "Prevents joint stiffness and contractures, maintains circulation, and prepares muscles for active recovery.",
      },
      {
        name: "Sit-to-Stand Training",
        what: "Practicing the transition from sitting to standing with support.",
        how: "Patient sits at the edge of a sturdy chair, feet flat, leans forward and stands using a walker or therapist's hand. 5–10 reps, 2 sets.",
        benefits: "Rebuilds quad and gluteal strength, improves balance and helps regain transfer independence.",
      },
      {
        name: "Mirror Therapy",
        what: "Using a mirror to reflect the unaffected limb, tricking the brain into 'seeing' the weak limb move.",
        how: "15–20 minute sessions performing simple finger/hand movements with the strong side while watching the reflection.",
        benefits: "Stimulates neuroplasticity and helps restore motor function in the affected upper limb.",
      },
      {
        name: "Gait Training with Parallel Bars",
        what: "Supervised walking practice between parallel bars or with a walking aid.",
        how: "10–15 minute sessions focusing on heel strike, weight transfer and step length, progressing to overground walking.",
        benefits: "Restores walking pattern, improves endurance and reduces fall risk.",
      },
    ],
  },
  {
    slug: "cervical-spine-care",
    title: "Cervical & Spine Pain Management",
    tagline: "Relieve neck, back and posture-related pain with targeted therapy.",
    image: cervicalImg,
    overview:
      "From desk-job neck pain to cervical spondylosis and disc issues, our team uses manual therapy, postural correction, traction and structured exercises to restore pain-free movement.",
    whoFor: [
      "Cervical spondylosis and stiffness",
      "Cervical or lumbar disc bulge / herniation",
      "Sciatica and radiating arm/leg pain",
      "Postural pain from desk work or driving",
    ],
    exercises: [
      {
        name: "Chin Tucks",
        what: "A gentle retraction of the head to align the cervical spine.",
        how: "Sit tall, draw the chin straight back (creating a 'double chin'), hold 5 seconds, release. 10 reps, 3 sets daily.",
        benefits: "Strengthens deep neck flexors, corrects forward head posture and reduces cervical strain.",
      },
      {
        name: "Cervical Isometrics",
        what: "Static neck strengthening without movement.",
        how: "Place palm on forehead, push head into hand without movement for 5 seconds. Repeat to sides and back. 10 reps each direction.",
        benefits: "Builds neck stability, reduces pain and protects against re-injury.",
      },
      {
        name: "Cat-Cow Stretch",
        what: "A gentle spinal mobilization on hands and knees.",
        how: "Alternate arching the back upward (cat) and dipping it downward (cow). 10 slow reps, twice daily.",
        benefits: "Improves spinal flexibility, eases stiffness and decompresses lumbar discs.",
      },
      {
        name: "McKenzie Press-Ups",
        what: "A prone extension exercise for lower back disc issues.",
        how: "Lie face-down, place hands under shoulders, push chest up while keeping hips on the floor. Hold 2 seconds. 10 reps.",
        benefits: "Helps centralize disc-related pain and improves lumbar extension mobility.",
      },
    ],
  },
  {
    slug: "home-visit-physiotherapy",
    title: "Home Visit Physiotherapy",
    tagline: "Expert physiotherapy delivered to your doorstep.",
    image: homeImg,
    overview:
      "We bring our therapists and portable equipment to your home — ideal for post-surgery, bedridden, elderly or mobility-limited patients who need consistent care without the stress of travel.",
    whoFor: [
      "Post-operative patients (knee/hip replacement, spine surgery)",
      "Bedridden or mobility-restricted individuals",
      "Elderly patients requiring regular care",
      "Patients in recovery from stroke or major illness",
    ],
    exercises: [
      {
        name: "Bed Mobility Training",
        what: "Practice rolling, sitting up and shifting weight safely in bed.",
        how: "Therapist guides controlled rolling using leg drive and arm reach. 5–8 reps each side, twice daily.",
        benefits: "Prevents bedsores, maintains muscle activation and supports independence in self-care.",
      },
      {
        name: "Ankle Pumps & Quad Sets",
        what: "Simple isometric exercises done in bed or while seated.",
        how: "Point and flex feet 20 times every hour; tighten thigh muscles for 5 seconds, 10 reps.",
        benefits: "Improves circulation, prevents DVT (deep vein thrombosis) and maintains lower limb strength.",
      },
      {
        name: "Assisted Standing & Walking",
        what: "Supervised standing with walker/quad-cane progression.",
        how: "Stand for 1–2 minutes initially, progressing to short walks indoors with therapist support.",
        benefits: "Rebuilds confidence, restores weight-bearing tolerance and prepares for community mobility.",
      },
      {
        name: "Chest Physiotherapy",
        what: "Breathing and percussion techniques for bedridden patients.",
        how: "Deep breathing exercises, segmental breathing and gentle percussion over the chest wall, 10 minutes per session.",
        benefits: "Clears lung secretions, prevents pneumonia and improves oxygenation.",
      },
    ],
  },
  {
    slug: "orthopedic-rehabilitation",
    title: "Orthopedic & Post-Surgery Rehab",
    tagline: "Structured recovery after joint replacement, fracture or ligament surgery.",
    image: orthoImg,
    overview:
      "Whether you're recovering from a knee replacement, ACL reconstruction, rotator cuff repair or fracture fixation — we design phase-wise protocols aligned with your surgeon's timeline.",
    whoFor: [
      "Total knee / hip replacement patients",
      "ACL, PCL or meniscus repair recovery",
      "Rotator cuff and shoulder surgery",
      "Post-fracture mobilization",
    ],
    exercises: [
      {
        name: "Quadriceps Strengthening",
        what: "Isolated activation and strengthening of the thigh muscles.",
        how: "Straight leg raises and short-arc quads, 3 sets of 10–15 reps, twice daily with ankle weights as tolerated.",
        benefits: "Restores knee stability and is critical for stairs, standing and walking after knee surgery.",
      },
      {
        name: "Heel Slides",
        what: "Bending and straightening the knee while lying down.",
        how: "Slide heel toward buttocks, hold 5 seconds, slide back. 10 reps, 3 sets.",
        benefits: "Restores knee flexion range after surgery or stiffness, prevents adhesions.",
      },
      {
        name: "Pendulum Exercises",
        what: "Gentle passive shoulder swings using gravity.",
        how: "Lean forward, let the arm hang and swing in small circles for 1–2 minutes in each direction.",
        benefits: "Maintains shoulder mobility safely after rotator cuff or capsular surgery.",
      },
      {
        name: "Stationary Cycling",
        what: "Low-impact cardiovascular and joint mobility work.",
        how: "Start with 5–10 minutes at low resistance, progress to 20 minutes daily.",
        benefits: "Improves knee/hip range, builds endurance and aids return to activity without joint stress.",
      },
    ],
  },
  {
    slug: "sports-injury-recovery",
    title: "Sports Injury Recovery",
    tagline: "Get back to your sport stronger and safer.",
    image: sportsImg,
    overview:
      "We combine soft-tissue therapy, sport-specific strengthening and return-to-play testing to help athletes recover fully and prevent re-injury.",
    whoFor: [
      "Runners and cyclists with overuse injuries",
      "Cricket / football / badminton players",
      "Gym injuries — strains and sprains",
      "Tennis / golfer's elbow",
    ],
    exercises: [
      {
        name: "Eccentric Heel Drops",
        what: "Controlled lowering of the heel for calf and Achilles strength.",
        how: "Stand on a step on the ball of feet, lower the heel below step level slowly over 3 seconds. 3 sets of 15.",
        benefits: "Rehabilitates Achilles tendinopathy and prevents recurring calf strains.",
      },
      {
        name: "Single Leg Balance",
        what: "Proprioceptive training on one leg.",
        how: "Stand on one leg for 30 seconds, progress to eyes closed or on a soft surface. 3 sets per leg.",
        benefits: "Reduces risk of ankle sprains and knee injuries by improving joint awareness.",
      },
      {
        name: "Resistance Band Rows",
        what: "Upper back and scapular strengthening.",
        how: "Anchor band, pull elbows back squeezing shoulder blades. 3 sets of 12.",
        benefits: "Strengthens posture muscles to prevent shoulder impingement in throwing/racquet sports.",
      },
      {
        name: "Plyometric Box Jumps",
        what: "Explosive jumping for return-to-sport conditioning.",
        how: "Jump onto a 12–18 inch box, step down. 3 sets of 8 once cleared for impact.",
        benefits: "Restores power, reactive strength and confidence before returning to play.",
      },
    ],
  },
  {
    slug: "pediatric-physiotherapy",
    title: "Pediatric Physiotherapy",
    tagline: "Gentle, play-based therapy for children's development.",
    image: pediatricImg,
    overview:
      "Specialized care for children with developmental delays, cerebral palsy, torticollis and post-injury recovery — delivered through engaging, play-based sessions.",
    whoFor: [
      "Cerebral palsy and developmental delay",
      "Torticollis and flat-head syndrome",
      "Gross motor delays in infants",
      "Pediatric orthopedic injuries",
    ],
    exercises: [
      {
        name: "Tummy Time Play",
        what: "Supervised prone positioning with toys to engage the child.",
        how: "3–5 minute sessions multiple times a day, progressing duration as tolerated.",
        benefits: "Strengthens neck, shoulders and core; prevents flat-head and supports milestone progression.",
      },
      {
        name: "Neuro-Developmental Treatment (NDT)",
        what: "Hands-on facilitation of normal movement patterns.",
        how: "Therapist guides the child through reaching, rolling and crawling sequences during play.",
        benefits: "Improves motor control and quality of movement in children with neurological conditions.",
      },
      {
        name: "Balance Beam Walking",
        what: "Walking heel-to-toe on a low beam or taped line.",
        how: "5 passes back and forth with hand support as needed, progressing to no support.",
        benefits: "Builds coordination, balance and confidence in school-age children.",
      },
    ],
  },
  {
    slug: "geriatric-physiotherapy",
    title: "Geriatric Physiotherapy",
    tagline: "Helping seniors stay mobile, independent and fall-free.",
    image: geriatricImg,
    overview:
      "Tailored programs for older adults focused on balance, strength and joint care — reducing fall risk and supporting independent living.",
    whoFor: [
      "Seniors with arthritis or joint stiffness",
      "Patients with osteoporosis",
      "Post-fall recovery and confidence rebuilding",
      "Parkinson's and balance disorders",
    ],
    exercises: [
      {
        name: "Sit-to-Stand Repetitions",
        what: "Repeated standing from a chair without using arms (when safe).",
        how: "3 sets of 10 with a sturdy chair, arms crossed if able. Daily.",
        benefits: "Strengthens legs, improves functional independence and reduces fall risk.",
      },
      {
        name: "Heel-to-Toe Walking",
        what: "Walking in a straight line placing one foot directly in front of the other.",
        how: "10 steps forward, turn, repeat. Use a wall for safety. 3 sets.",
        benefits: "Improves dynamic balance and gait stability.",
      },
      {
        name: "Resistance Band Leg Press",
        what: "Seated leg strengthening using a resistance band.",
        how: "Loop band around feet, push outward slowly. 3 sets of 12.",
        benefits: "Builds leg strength without joint stress, supports walking and stair climbing.",
      },
      {
        name: "Tai Chi Inspired Flow",
        what: "Slow, controlled weight-shifting movements.",
        how: "10–15 minute sessions of guided slow movements with breathing.",
        benefits: "Improves balance, flexibility and reduces falls (proven in research for older adults).",
      },
    ],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
