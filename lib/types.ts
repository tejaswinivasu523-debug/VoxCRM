export type Status = "Customer" | "Lead" | "Prospect";

export interface Contact {
  id: string;
  name: string;
  company: string;
  phone: string;
  status: Status;
  lastContact: string;
  avatarColor: string;
}

export interface PipelineStage {
  id: string;
  label: string;
  count: number;
  percent: number;
  color: string;
}

export interface Deal {
  id: string;
  company: string;
  value: string;
  date: string;
  owner: string;
}

export interface DealColumn {
  id: string;
  label: string;
  color: string;
  deals: Deal[];
}

export interface CallRecord {
  id: string;
  name: string;
  phone: string;
  duration: string;
  timestamp: string;
  outcome: "Interested" | "Follow-up" | "Not Interested";
}

export interface Activity {
  id: string;
  title: string;
  subtitle: string;
  time: string;
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  source: string;
  score: number;
  status: "New" | "Contacted" | "Qualified";
  owner: string;
}

export interface LeadsStats {
  totalLeads: string;
  qualified: string;
  avgResponseTime: string;
  aiQualified: string;
  totalLeadsDelta: string;
  qualifiedDelta: string;
  avgResponseTimeDelta: string;
  aiQualifiedDelta: string;
}

export interface RevenuePoint {
  month: string;
  revenue: number;
}

export interface DashboardStats {
  totalContacts: string;
  newLeads: string;
  revenue: string;
  conversionRate: string;
  contactsDelta: string;
  leadsDelta: string;
  revenueDelta: string;
  conversionDelta: string;
}

export interface DashboardSummary {
  stats: DashboardStats;
  revenueByMonth: RevenuePoint[];
  pipeline: PipelineStage[];
  recentActivities: Activity[];
  upcomingFollowUps: Activity[];
}

export interface TranscriptLine {
  speaker: "AI" | "Customer";
  text: string;
  time: string;
}

export interface CallSummary {
  intent: string;
  sentiment: "Interested" | "Neutral" | "Not Interested";
  nextAction: string;
  summary: string;
}

