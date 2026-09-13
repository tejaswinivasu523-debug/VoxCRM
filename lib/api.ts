/**
 * Central place for every network call the frontend makes.
 *
 * WHY THIS FILE EXISTS:
 * Right now there is no backend running, so every function here tries a real
 * fetch first and, if that fails (backend not up yet, wrong URL, CORS, etc.),
 * silently falls back to the mock data in lib/data.ts. That means:
 *   - Today: the app works and looks "live" using mock data.
 *   - Once the backend team stands up matching REST endpoints: the real
 *     requests succeed and mock data is never touched again. No frontend
 *     code changes needed — just set NEXT_PUBLIC_API_URL and implement the
 *     endpoints below with the same request/response shape.
 *
 * Set the backend URL in a `.env.local` file at the project root:
 *   NEXT_PUBLIC_API_URL=http://localhost:8080/api
 */

import {
  contacts as mockContacts,
  dealColumns as mockDealColumns,
  callHistory as mockCallHistory,
  pipeline as mockPipeline,
  revenueByMonth as mockRevenueByMonth,
  leadSources as mockLeadSources,
  topReps as mockTopReps,
  dashboardStats as mockDashboardStats,
  leadsStats as mockLeadsStats,
  leads as mockLeads,
  recentActivities as mockRecentActivities,
  upcomingFollowUps as mockUpcomingFollowUps,
} from "./data";
import { Contact, DealColumn, Deal, CallRecord, DashboardSummary, Lead, LeadsStats } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status} on ${path}`);
  }
  return res.json() as Promise<T>;
}

/* ---------------------------- Contacts ---------------------------- */
// Expected backend endpoints:
//   GET    /api/contacts            -> Contact[]
//   POST   /api/contacts            -> Contact (created)
//   DELETE /api/contacts/:id        -> 204

export async function getContacts(): Promise<Contact[]> {
  try {
    return await request<Contact[]>("/contacts");
  } catch {
    return mockContacts;
  }
}

export async function createContact(
  data: Omit<Contact, "id" | "lastContact" | "avatarColor">
): Promise<Contact> {
  try {
    return await request<Contact>("/contacts", {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch {
    // Backend not available yet — return a locally-shaped object so the UI
    // can still show it optimistically.
    return {
      ...data,
      id: crypto.randomUUID(),
      lastContact: "Just now",
      avatarColor: "#7C6CF0",
    };
  }
}

/* ---------------------------- Dashboard ---------------------------- */
// Expected backend endpoint:
//   GET /api/dashboard/summary -> DashboardSummary
//   { stats, revenueByMonth, pipeline, recentActivities, upcomingFollowUps }

export async function getDashboardSummary(): Promise<DashboardSummary> {
  try {
    return await request<DashboardSummary>("/dashboard/summary");
  } catch {
    return {
      stats: mockDashboardStats,
      revenueByMonth: mockRevenueByMonth,
      pipeline: mockPipeline,
      recentActivities: mockRecentActivities,
      upcomingFollowUps: mockUpcomingFollowUps,
    };
  }
}

/* ------------------------------ Leads ------------------------------ */
// Expected backend endpoints:
//   GET /api/leads          -> Lead[]
//   GET /api/leads/stats    -> LeadsStats

export async function getLeads(): Promise<Lead[]> {
  try {
    return await request<Lead[]>("/leads");
  } catch {
    return mockLeads;
  }
}

export async function getLeadsStats(): Promise<LeadsStats> {
  try {
    return await request<LeadsStats>("/leads/stats");
  } catch {
    return mockLeadsStats;
  }
}

export async function getLeadPipeline() {
  try {
    return await request("/leads/pipeline");
  } catch {
    return mockPipeline;
  }
}

/* ------------------------------ Deals ------------------------------ */
// Expected backend endpoints:
//   GET  /api/deals             -> DealColumn[]  (grouped by stage)
//   POST /api/deals             -> Deal (created), body includes stageId

export async function getDeals(): Promise<DealColumn[]> {
  try {
    return await request<DealColumn[]>("/deals");
  } catch {
    return mockDealColumns;
  }
}

export async function createDeal(
  stageId: string,
  data: Omit<Deal, "id" | "date">
): Promise<Deal> {
  try {
    return await request<Deal>("/deals", {
      method: "POST",
      body: JSON.stringify({ stageId, ...data }),
    });
  } catch {
    return {
      ...data,
      id: crypto.randomUUID(),
      date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
    };
  }
}

/* --------------------------- Call History --------------------------- */
// Expected backend endpoint:
//   GET /api/calls -> CallRecord[]

export async function getCallHistory(): Promise<CallRecord[]> {
  try {
    return await request<CallRecord[]>("/calls");
  } catch {
    return mockCallHistory;
  }
}

/* ----------------------------- Analytics ----------------------------- */
// Expected backend endpoint:
//   GET /api/analytics/dashboard -> { revenueByMonth, leadSources, topReps }

export async function getAnalytics() {
  try {
    return await request<{
      revenueByMonth: typeof mockRevenueByMonth;
      leadSources: typeof mockLeadSources;
      topReps: typeof mockTopReps;
    }>("/analytics/dashboard");
  } catch {
    return {
      revenueByMonth: mockRevenueByMonth,
      leadSources: mockLeadSources,
      topReps: mockTopReps,
    };
  }
}
