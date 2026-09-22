import {
  Contact,
  PipelineStage,
  DealColumn,
  CallRecord,
  Activity,
} from "./types";

export const contacts: Contact[] = [
  { id: "1", name: "Rahul Sharma", company: "ABC Pvt Ltd", phone: "+91 98765 43210", status: "Customer", lastContact: "2h ago", avatarColor: "#7C6CF0" },
  { id: "2", name: "Priya Shah", company: "XYZ Solutions", phone: "+91 87654 32109", status: "Lead", lastContact: "Yesterday", avatarColor: "#3E8BFF" },
  { id: "3", name: "Arjun Kumar", company: "TechCorp", phone: "+91 76543 21098", status: "Prospect", lastContact: "2 days ago", avatarColor: "#F2A93B" },
  { id: "4", name: "Sneha Iyer", company: "Global Tech", phone: "+91 65432 10987", status: "Customer", lastContact: "3 days ago", avatarColor: "#1FAE73" },
  { id: "5", name: "Vikram Rao", company: "Innovate Ltd", phone: "+91 54321 09876", status: "Lead", lastContact: "4 days ago", avatarColor: "#EF5B5B" },
];

export const pipeline: PipelineStage[] = [
  { id: "new", label: "New", count: 42, percent: 22.6, color: "#3E8BFF" },
  { id: "contacted", label: "Contacted", count: 31, percent: 16.7, color: "#7C6CF0" },
  { id: "qualified", label: "Qualified", count: 18, percent: 9.7, color: "#1FAE73" },
  { id: "proposal", label: "Proposal", count: 14, percent: 7.5, color: "#F2A93B" },
  { id: "negotiation", label: "Negotiation", count: 9, percent: 4.8, color: "#EF5B5B" },
  { id: "won", label: "Won", count: 12, percent: 6.5, color: "#1FAE73" },
];

export const revenueByMonth = [
  { month: "Jan", revenue: 0.9 },
  { month: "Feb", revenue: 1.1 },
  { month: "Mar", revenue: 1.5 },
  { month: "Apr", revenue: 1.2 },
  { month: "May", revenue: 1.4 },
  { month: "Jun", revenue: 1.8 },
];

export const dealColumns: DealColumn[] = [
  {
    id: "new",
    label: "New",
    color: "#3E8BFF",
    deals: [
      { id: "d1", company: "ABC Pvt Ltd", value: "₹80,000", date: "12 Jun", owner: "Rahul Sharma" },
      { id: "d2", company: "GreenLeaf Solutions", value: "₹65,000", date: "14 Jun", owner: "Priya Shah" },
      { id: "d3", company: "TechWorld", value: "₹1,20,000", date: "16 Jun", owner: "Arjun Kumar" },
    ],
  },
  {
    id: "contacted",
    label: "Contacted",
    color: "#F2A93B",
    deals: [
      { id: "d4", company: "Blue Horizon", value: "₹45,000", date: "10 Jun", owner: "Sneha Iyer" },
      { id: "d5", company: "Quick Commerce", value: "₹90,000", date: "11 Jun", owner: "Vikram Rao" },
      { id: "d6", company: "Skyline Infra", value: "₹1,50,000", date: "13 Jun", owner: "Neha Gupta" },
    ],
  },
  {
    id: "proposal",
    label: "Proposal",
    color: "#7C6CF0",
    deals: [
      { id: "d7", company: "Future Tech", value: "₹2,40,000", date: "12 Jun", owner: "Rohit Mehta" },
      { id: "d8", company: "Digital Minds", value: "₹1,80,000", date: "15 Jun", owner: "Aisha Khan" },
    ],
  },
];

export const callHistory: CallRecord[] = [
  { id: "c1", name: "Rahul Sharma", phone: "+91 98765 43210", duration: "02:47", timestamp: "Today, 10:42 AM", outcome: "Interested" },
  { id: "c2", name: "Priya Enterprises", phone: "+91 87654 32109", duration: "04:12", timestamp: "Today, 09:18 AM", outcome: "Follow-up" },
  { id: "c3", name: "Arjun Kumar", phone: "+91 76543 21098", duration: "01:36", timestamp: "Yesterday, 04:32 PM", outcome: "Not Interested" },
  { id: "c4", name: "Sneha Iyer", phone: "+91 65432 10987", duration: "03:15", timestamp: "Yesterday, 11:20 AM", outcome: "Interested" },
  { id: "c5", name: "Vikram Rao", phone: "+91 54321 09876", duration: "02:08", timestamp: "10 Jun, 03:10 PM", outcome: "Follow-up" },
];

export const recentActivities: Activity[] = [
  { id: "a1", title: "Rahul Sharma - Follow-up completed", subtitle: "Call outcome logged", time: "2h ago" },
  { id: "a2", title: "Priya Enterprises - New lead assigned", subtitle: "Assigned to Arjun Kumar", time: "4h ago" },
  { id: "a3", title: "Deal closed - TechCorp Pvt Ltd", subtitle: "₹1,20,000 revenue", time: "6h ago" },
];

export const upcomingFollowUps: Activity[] = [
  { id: "u1", title: "Demo call - ABC Pvt Ltd", subtitle: "Today, 3:00 PM", time: "" },
  { id: "u2", title: "Proposal discussion - XYZ Solutions", subtitle: "Tomorrow, 11:00 AM", time: "" },
  { id: "u3", title: "Follow-up - Global Tech", subtitle: "12 Jun, 4:00 PM", time: "" },
];

export const leadSources = [
  { name: "Website", value: 38, color: "#7C6CF0" },
  { name: "Referral", value: 27, color: "#3E8BFF" },
  { name: "Social Media", value: 20, color: "#F2A93B" },
  { name: "Other", value: 15, color: "#1FAE73" },
];

export const topReps = [
  { name: "Arjun Mehta", deals: 28 },
  { name: "Sneha Iyer", deals: 24 },
  { name: "Vikram Rao", deals: 19 },
  { name: "Priya Shah", deals: 16 },
  { name: "Rohit Kumar", deals: 12 },
];

export const dashboardStats = {
  totalContacts: "1,284",
  newLeads: "186",
  revenue: "₹12.4L",
  conversionRate: "8.7%",
  contactsDelta: "↑ 12%",
  leadsDelta: "↑ 18%",
  revenueDelta: "↑ 24%",
  conversionDelta: "↑ 2.1%",
};

export const leadsStats = {
  totalLeads: "186",
  qualified: "18",
  avgResponseTime: "12 min",
  aiQualified: "63",
  totalLeadsDelta: "↑ 18%",
  qualifiedDelta: "↑ 9%",
  avgResponseTimeDelta: "↓ 4%",
  aiQualifiedDelta: "↑ 22%",
};

export const leads = [
  { id: "l1", name: "Priya Enterprises", company: "Priya Enterprises", source: "Website", score: 82, status: "New" as const, owner: "Arjun Kumar" },
  { id: "l2", name: "Blue Horizon", company: "Blue Horizon Pvt Ltd", source: "Referral", score: 74, status: "Contacted" as const, owner: "Sneha Iyer" },
  { id: "l3", name: "GreenLeaf Solutions", company: "GreenLeaf Solutions", source: "Social Media", score: 61, status: "Qualified" as const, owner: "Rahul Sharma" },
  { id: "l4", name: "Quick Commerce", company: "Quick Commerce Ltd", source: "Website", score: 55, status: "New" as const, owner: "Priya Shah" },
  { id: "l5", name: "Skyline Infra", company: "Skyline Infra", source: "Cold Call", score: 48, status: "Contacted" as const, owner: "Vikram Rao" },
];

