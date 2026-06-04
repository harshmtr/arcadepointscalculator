import { badges } from "./badges";

export const mockUser = {
  id: "u1",
  name: "Alex Patel",
  email: "alex@arcadementor.dev",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  points: 39,
  rank: 24,
  streak: 12,
  targetPoints: 45,
  completedBadges: badges.filter((b) => b.status === "Completed").length,
  missingBadges: badges.filter((b) => b.status === "Missing").length,
  joinedDate: "Mar 2026",
};

const seedNames = [
  "Priya Singh","Marcus Lee","Sara Khan","Diego Romero","Yuki Tanaka","Lena Müller","Omar Hassan","Chloe Dubois","Rahul Mehta","Anya Volkov",
  "Tomás Silva","Noor Abadi","Hiro Sato","Mei Lin","Ivan Petrov","Fatima Ali","Kai Nakamura","Sofia Costa","Andre Costa","Maya Iyer",
  "Liam O'Connor","Zara Ahmed","Felix Brown","Aria Park","Ravi Kumar","Mira Joshi","Eva Novak","Jon Larsen","Pia Holm","Sven Berg",
  "Tara Reed","Will Carter","Nia Adams","Theo King","Iris Wang","Kenji Mori","Lara Voss","Naomi West","Otto Stein","Quinn Fox",
  "Rosa Vega","Sam Cole","Tess Ray","Uma Das","Vik Roy","Wren Hill","Xiu Yen","Yara Sun","Zane Moss","Alex Patel"
];

export interface LeaderboardEntry { rank: number; name: string; avatar: string; points: number; labs: number; you?: boolean }

export const leaderboard: LeaderboardEntry[] = seedNames
  .map((name, i) => ({
    rank: i + 1,
    name,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
    points: Math.max(8, 120 - i * 2 - (i % 5)),
    labs: Math.max(4, 60 - i),
    you: name === "Alex Patel",
  }));

export interface Thread {
  id: string; title: string; author: string; avatar: string; tags: string[]; upvotes: number; replies: number; preview: string; createdAt: string;
}
export const threads: Thread[] = [
  { id: "t1", title: "Tips for finishing Gemini for Developers in under an hour", author: "Priya Singh", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya", tags: ["Gemini","AI","Tips"], upvotes: 124, replies: 18, preview: "I just wrapped the lab — sharing the exact prompt patterns I used…", createdAt: "2h ago" },
  { id: "t2", title: "Cloud Run cold starts: what actually works in 2026", author: "Marcus Lee", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus", tags: ["Cloud Run","Performance"], upvotes: 98, replies: 24, preview: "Min instances vs CPU boost vs warmup pings — here's the data…", createdAt: "5h ago" },
  { id: "t3", title: "BigQuery cost guardrails I wish I knew on day one", author: "Sara Khan", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara", tags: ["BigQuery","Cost"], upvotes: 76, replies: 12, preview: "Reservation slots, partitioning, and query labels…", createdAt: "1d ago" },
  { id: "t4", title: "Best YouTube channels for GCP learners?", author: "Diego Romero", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diego", tags: ["Resources","Discussion"], upvotes: 54, replies: 31, preview: "Drop your favorites — I'll compile a list for the community.", createdAt: "1d ago" },
  { id: "t5", title: "Stuck on Vertex AI Search — anyone got a hint?", author: "Yuki Tanaka", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki", tags: ["Vertex AI","Help"], upvotes: 21, replies: 7, preview: "The indexing step keeps timing out…", createdAt: "3d ago" },
];

export interface Group { id: string; name: string; members: number; goal: string; activity: "Low"|"Medium"|"High"|"Very High"; tags: string[] }
export const groups: Group[] = [
  { id: "g1", name: "Arcade Sprint", members: 248, goal: "Complete 10 badges in 30 days", activity: "Very High", tags: ["Sprint","All Levels"] },
  { id: "g2", name: "Gemini Challenge", members: 132, goal: "Master the Gemini API track", activity: "High", tags: ["AI","Gemini"] },
  { id: "g3", name: "Cloud Run Learners", members: 89, goal: "Deploy production services on Cloud Run", activity: "Medium", tags: ["Serverless"] },
  { id: "g4", name: "AI Builders Circle", members: 176, goal: "Ship 1 AI side project per month", activity: "High", tags: ["AI","Projects"] },
  { id: "g5", name: "Data Warriors", members: 64, goal: "Conquer BigQuery, Dataflow, Looker", activity: "Medium", tags: ["Data"] },
  { id: "g6", name: "Beginner Buddies", members: 312, goal: "Friendly support for first-time learners", activity: "Very High", tags: ["Beginner"] },
];

export interface Achievement { id: string; name: string; description: string; unlocked: boolean; icon: string; tier: "Bronze"|"Silver"|"Gold"|"Platinum" }
export const achievements: Achievement[] = [
  { id: "a1", name: "First Badge", description: "Earn your very first Arcade badge.", unlocked: true, icon: "Award", tier: "Bronze" },
  { id: "a2", name: "10 Badges Completed", description: "Reach the double-digit milestone.", unlocked: true, icon: "Medal", tier: "Silver" },
  { id: "a3", name: "25 Points Earned", description: "Accumulate 25 Arcade points.", unlocked: true, icon: "Sparkles", tier: "Silver" },
  { id: "a4", name: "Community Contributor", description: "Post 5 helpful answers.", unlocked: true, icon: "MessagesSquare", tier: "Bronze" },
  { id: "a5", name: "Study Group Leader", description: "Lead a study group with 20+ active members.", unlocked: false, icon: "Users", tier: "Gold" },
  { id: "a6", name: "Top 100 Rank", description: "Crack the global top 100.", unlocked: true, icon: "Trophy", tier: "Gold" },
  { id: "a7", name: "Streak Master", description: "Maintain a 30-day learning streak.", unlocked: false, icon: "Flame", tier: "Gold" },
  { id: "a8", name: "Arcade Champion", description: "Earn all available badges in a season.", unlocked: false, icon: "Crown", tier: "Platinum" },
];

export const pointsGrowth = Array.from({ length: 12 }, (_, i) => ({
  week: `W${i + 1}`,
  points: Math.round(2 + i * 3.2 + Math.sin(i) * 2),
  badges: Math.round(1 + i * 1.4),
}));

export const activityByDay = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d, i) => ({
  day: d,
  minutes: [45, 60, 30, 90, 75, 120, 50][i],
}));

export const categoryBreakdown = [
  { name: "AI / ML", value: 5 },
  { name: "Data", value: 6 },
  { name: "Serverless", value: 3 },
  { name: "Security", value: 3 },
  { name: "Networking", value: 2 },
  { name: "Other", value: 5 },
];

export const recentActivity = [
  { id: 1, type: "badge", text: "Completed Cloud SQL for PostgreSQL", time: "2h ago" },
  { id: 2, type: "group", text: "Joined Arcade Sprint study group", time: "1d ago" },
  { id: 3, type: "post", text: "Replied to Cloud Run cold starts thread", time: "2d ago" },
  { id: 4, type: "achievement", text: "Unlocked Top 100 Rank achievement", time: "4d ago" },
];