## Arcade Mentor — Frontend Build Plan

**Tagline:** Learn. Build. Earn.

### Stack note
This Lovable project runs on **TanStack Start (React 19 + Vite + TypeScript)**, not Next.js. The architecture, file-based routing, and SSR story are equivalent for your needs (Vercel-deployable, Firebase-ready), so I'll build on the project's native stack rather than swap frameworks. Everything else from your brief — Tailwind, TypeScript, responsive, light/dark mode, modern SaaS UI, clean components, future Firebase integration — is honored.

### Design system
- **Palette:** Deep slate base (`#0B0F1A`) / off-white light mode, Google-Cloud-inspired primary blue (`#4285F4`), secondary teal, warm amber for rewards/streaks, success green, danger red. All tokens in `oklch()` in `src/styles.css` under `@theme inline`.
- **Type:** Space Grotesk display + Inter body.
- **Light/Dark:** class-based `dark` variant with theme toggle persisted in `localStorage`.
- **Motion:** framer-motion for hero, card hovers, page transitions.
- **Charts:** recharts.
- **Icons:** lucide-react.

### Routes (file-based under `src/routes/`)
```
/                         Landing page (public)
/login                    Auth screen (mock)
/_app/dashboard           Dashboard overview
/_app/calculator          Point Calculator
/_app/resources           Resource Hub
/_app/recommendations     Smart Recommendations
/_app/leaderboard         Leaderboard (weekly/monthly/all-time tabs)
/_app/community           Community forum
/_app/community/$threadId Thread detail
/_app/groups              Study Groups
/_app/groups/$groupId     Group detail
/_app/achievements        Achievements
/_app/profile             Profile
/_app/settings            Settings
/_app/admin               Hidden admin dashboard
```
`_app` is a pathless layout providing the sidebar + top navbar shell. URLs stay clean (`/dashboard`, `/admin`, etc.).

### Mock data layer
All data in `src/data/`:
- `badges.ts` — ~30 Google Cloud Arcade badges with name, category, points, difficulty, duration, description, YouTube videoId, official lab URL, thumbnail prompt.
- `user.ts` — current mock user (39 pts, rank #24, 18/24 badges, 12-day streak).
- `leaderboard.ts` — 50 users with avatars, points, completed labs.
- `community.ts` — threads with replies, tags, upvotes.
- `groups.ts` — Arcade Sprint, Gemini Challenge, Cloud Run Learners, AI Builders Circle, +more.
- `achievements.ts` — definitions + unlocked state.
- `analytics.ts` — time-series points growth, badge completion, activity heatmap.

State in `src/hooks/` (`useTheme`, `useLocalStorageState`, `useMockAuth`). TanStack Query wraps mock fetchers so a Firebase swap later is a one-file change.

### Component architecture (`src/components/`)
```
layout/        AppShell, Sidebar, TopNavbar, Footer, MobileNav
landing/       Hero, FeatureGrid, FeatureCard, CTASection
dashboard/     StatCard, ProgressToReward, MilestoneBar, ActivityFeed
calculator/    ProfileUrlForm, AnalysisResult, BadgeTable
resources/     ResourceCard, ResourceFilters, ResourceGrid
recommendations/ RecommendationCard
leaderboard/   Podium, LeaderboardTable, RankingTabs
community/     ThreadCard, ThreadView, CreatePostModal, TagChip
groups/        GroupCard, GroupDetail, ActivityMeter
achievements/  AchievementCard, AchievementGrid
profile/       ProfileHeader, ActivityHistory, SavedResources
settings/      ThemeToggle, NotificationsPanel, PrivacyPanel
admin/         UserAnalytics, ResourceManager, ModerationQueue, ReportsPanel
shared/        EmptyState, LoadingSkeleton, Toast (sonner), Modal, SearchBar, Pagination, StatusBadge
```

### Page-by-page coverage (all from your brief)
1. **Landing** — hero with headline/sub/CTAs (Get Started → /login, View Leaderboard → /leaderboard), generated dashboard-illustration hero image (charts + badges + ranks), 7 feature cards, social proof strip, footer.
2. **Login** — centered card, "Continue with Google" (mock) + "Continue as Guest", Cloud-inspired gradient backdrop. Sets mock user in localStorage and routes to dashboard.
3. **Dashboard Overview** — 6 stat cards (Points 39, Rank #24, Completed 18, Missing 6, Streak 12d, Progress 39/45), progress bar with milestone dots, recent activity feed, mini chart.
4. **Point Calculator** — URL input → "Analyze Profile" button → animated mock result panel with points, rank, completed/missing counts, progress %, reward eligibility chip, donut + bar charts, full **Badge Analysis Table** (sortable/filterable columns: Badge, Status, Points, Difficulty, Duration, Resource link).
5. **Recommendations** — "Recommended Next Badges" grid; cards with badge name, points, duration, difficulty, "Why recommended" rationale, Start Learning button. Includes Gemini for Developers, Cloud Run Fundamentals, Vertex AI Search, BigQuery Analytics.
6. **Resource Hub** — card grid with thumbnail, name, difficulty, duration, description, 4 action buttons (Watch Tutorial / Official Lab / Read Notes / Save). Search + category + difficulty filters.
7. **Leaderboard** — Gold/Silver/Bronze podium cards on top, table below, tabs for Weekly / Monthly / All-Time.
8. **Community** — forum layout: Create Post button (modal), Trending Topics sidebar, Recent Discussions list, search. Post cards with avatar, username, title, tags, upvotes, replies. Thread detail route with nested replies.
9. **Study Groups** — group cards (name, members, goal, activity level meter, Join button) for the 4 named groups + extras.
10. **Achievements** — gamified grid showing locked/unlocked tiles for First Badge, 10 Badges, 25 Points, Community Contributor, Study Group Leader, Top 100 — with unlock animations.
11. **Profile** — avatar, name, rank, points, achievement count; tabbed sections for Activity History, Earned Badges, Saved Resources, Joined Groups.
12. **Settings** — dark mode toggle, notification preferences (toggles), privacy controls, account preferences.
13. **Admin** (hidden `/admin`) — user analytics charts, resource management table with CRUD UI (mock), community moderation queue, leaderboard management, reports dashboard.
14. **Analytics widgets** — Points Growth (line), Badge Completion (stacked bar), Learning Activity (heatmap), Community Engagement (area) — reused on dashboard, profile, and admin.
15. **Empty states** — illustrated empty states for No Resources / No Discussions / No Groups / No Badges.

### Firebase-ready structure
- All data access goes through `src/lib/api/*.ts` mock adapters returning Promises. Swapping to Firebase = replacing these files.
- Auth abstracted behind `useMockAuth()` with the same shape as a future `useFirebaseAuth()`.
- Env vars stubbed in `.env.example` for future `VITE_FIREBASE_*` keys.

### Build order
1. Design tokens (`src/styles.css`), theme provider, AppShell (sidebar + topbar + mobile nav).
2. Landing page + hero illustration (generated).
3. Login.
4. Dashboard overview + stat cards + reusable charts.
5. Point Calculator + Badge Analysis Table.
6. Resource Hub + Recommendations.
7. Leaderboard (podium + tabs).
8. Community + thread detail + Create Post modal.
9. Study Groups + group detail.
10. Achievements + Profile + Settings.
11. Admin dashboard.
12. Empty states, loading skeletons, toasts, mobile polish, SEO meta on every route.

### Out of scope
- Real authentication, real scraping of Google Skills profiles, real-time chat, payments, backend persistence.