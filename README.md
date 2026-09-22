# VoxCRM — Frontend

Next.js (App Router) + TypeScript + Tailwind CSS implementation of the VoxCRM dashboard shown in the reference design: dashboard, contacts, leads, deals pipeline, AI voice agent (live call + call history), and analytics.

## Getting started

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

```
frontend/
 ├── app/
 │   ├── layout.tsx          # root layout, wraps every page in DashboardShell
 │   ├── page.tsx            # Dashboard (/)
 │   ├── globals.css
 │   ├── contacts/page.tsx
 │   ├── leads/page.tsx
 │   ├── deals/page.tsx           # Sales pipeline (kanban)
 │   ├── voice-agent/page.tsx     # Live AI call screen
 │   ├── call-history/page.tsx
 │   ├── analytics/page.tsx
 │   └── tasks/page.tsx
 ├── components/
 │   ├── layout/     # Sidebar, MobileSidebar, Navbar, DashboardShell
 │   ├── ui/         # Card, Badge, StatCard (shared primitives)
 │   ├── dashboard/  # chart, pipeline bars, activity list, AI assistant card
 │   ├── contacts/   # ContactsTable
 │   ├── leads/      # LeadsList
 │   ├── deals/      # DealsBoard (kanban)
 │   ├── voice-agent/# CallPanel, LiveTranscript, CallInfoPanel, CallHistoryTable
 │   └── analytics/  # RevenueOverviewChart, LeadSourcesDonut, TopRepsList
 └── lib/
     ├── types.ts    # shared TS interfaces
     └── data.ts     # mock data — replace with API calls once the backend is ready
```

## Design tokens (tailwind.config.ts)

- `sidebar` — dark navy sidebar background (`#0F1120`)
- `brand` — purple/indigo accent (`#7C6CF0`, hover `#6A57E8`)
- `surface` — light app background + white cards
- `good` / `warn` / `bad` / `info` — status colors (customer/lead/prospect badges, call outcomes)

## Wiring up the real API

The app is already live-data-ready. Every screen fetches through `lib/api.ts`, which:

1. Tries a real REST call to `NEXT_PUBLIC_API_URL` first.
2. If that fails (backend not running yet, wrong URL, CORS, etc.) it silently falls back to the mock data in `lib/data.ts`.

That means **today**, with no backend running, the app fully works on mock data with proper loading skeletons. The moment the backend team stands up matching endpoints and you set `NEXT_PUBLIC_API_URL` in `.env.local` (copy `.env.local.example`), real data flows in — no frontend code changes needed.

**Screens wired to REST already:**
- Dashboard (`/`) → `GET /dashboard/summary`
- Contacts (`/contacts`) → `GET /contacts`, `POST /contacts`
- Leads (`/leads`) → `GET /leads`, `GET /leads/stats`
- Deals (`/deals`) → `GET /deals`, `POST /deals`
- Call History (`/call-history`) → `GET /calls` (not yet loading-state upgraded — ask if you want that too)
- Analytics (`/analytics`) → `GET /analytics/dashboard` (still reads mock data directly — out of today's scope, easy to wire the same way)

See the comment block above each function in `lib/api.ts` for the exact expected request/response shape.

### Live AI Voice Agent transcript (WebSocket)

`lib/useCallTranscript.ts` is a hook that opens a WebSocket at `${NEXT_PUBLIC_WS_URL}/calls/:callId/transcript` and appends each incoming JSON message `{ speaker, text, time }` to the transcript in real time. If `NEXT_PUBLIC_WS_URL` isn't set, or the socket fails to connect within 2.5s, it transparently falls back to a simulated live-typing stream — so the Voice Agent screen always feels live, in dev or in prod. The transcript UI shows a small status pill: **Live** (real socket), **Live (demo feed)** (simulated), or **Connecting...**

The **AI Summary** panel next to the call also updates reactively as the transcript grows (intent/sentiment/next-action are derived from what the customer has said so far) — once the backend sends real AI-generated summaries over the same channel or a REST poll, swap `deriveSummary()` in `components/voice-agent/CallInfoPanel.tsx` for the real value.

## Notes

- Charts use `recharts`; icons use `lucide-react`.
- Fully responsive: sidebar collapses into a slide-over `MobileSidebar` below the `lg` breakpoint.
- No component uses browser storage — all state is in-memory (React state), so it's safe to drop into any hosting environment as-is.
