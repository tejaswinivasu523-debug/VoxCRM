-- VoxCRM seed data (realistic demo)
USE voxcrm;

INSERT INTO contacts (id, name, email, phone, company, industry, location, status, source) VALUES
(1, 'Rahul Sharma', 'rahul.sharma@abcpltd.com', '+91 98765 43210', 'ABC Pvt Ltd', 'Manufacturing', 'Bangalore, India', 'PROSPECT', 'Website'),
(2, 'Priya Shah', 'priya@technova.in', '+91 87654 32109', 'TechNova', 'Software', 'Mumbai, India', 'PROSPECT', 'Referral'),
(3, 'Amit Patel', 'amit.patel@greenfield.com', '+91 76543 21098', 'GreenField Foods', 'Food & Beverage', 'Ahmedabad, India', 'LEAD', 'Cold Call'),
(4, 'Sneha Iyer', 'sneha@orbitlogistics.com', '+91 65432 10987', 'Orbit Logistics', 'Logistics', 'Chennai, India', 'PROSPECT', 'LinkedIn'),
(5, 'Vikram Rao', 'vikram.rao@summitcapital.in', '+91 54321 09876', 'Summit Capital', 'Finance', 'Hyderabad, India', 'CUSTOMER', 'Referral'),
(6, 'Neha Mehta', 'neha@brightapps.io', '+91 43210 98765', 'BrightApps', 'SaaS', 'Pune, India', 'PROSPECT', 'Website'),
(7, 'Rohit Kumar', 'rohit@metalworks.co', '+91 32109 87654', 'MetalWorks Co', 'Manufacturing', 'Delhi, India', 'PROSPECT', 'Trade Show'),
(8, 'Ananya Das', 'ananya@healthplus.org', '+91 21098 76543', 'HealthPlus', 'Healthcare', 'Kolkata, India', 'LEAD', 'Website');

INSERT INTO leads (id, contact_id, title, source, status, score, estimated_value) VALUES
(1, 3, 'GreenField ERP rollout', 'Cold Call', 'QUALIFIED', 72, 250000.00),
(2, 8, 'HealthPlus clinic software', 'Website', 'NEW', 55, 120000.00),
(3, 5, 'Summit Capital CRM expansion', 'Referral', 'NEGOTIATION', 88, 450000.00);

INSERT INTO deals (id, lead_id, contact_id, title, value, stage, expected_close_date) VALUES
(1, 3, 5, 'Summit Capital Annual License', 450000.00, 'NEGOTIATION', '2026-10-15'),
(2, 1, 3, 'GreenField Implementation', 250000.00, 'PROPOSAL', '2026-11-01'),
(3, NULL, 5, 'Summit Support Retainer', 80000.00, 'CLOSED_WON', '2026-08-01');

INSERT INTO calls (id, contact_id, phone, direction, status, outcome, attempt_number, duration_seconds, started_at) VALUES
(1, 1, '+91 98765 43210', 'OUTBOUND', 'COMPLETED', 'INTERESTED', 1, 185, '2026-09-18 10:42:00'),
(2, 2, '+91 87654 32109', 'OUTBOUND', 'COMPLETED', 'FOLLOW_UP', 1, 142, '2026-09-19 14:15:00'),
(3, 3, '+91 76543 21098', 'OUTBOUND', 'COMPLETED', 'INTERESTED', 2, 210, '2026-09-20 11:30:00'),
(4, 4, '+91 65432 10987', 'OUTBOUND', 'COMPLETED', 'NOT_INTERESTED', 1, 95, '2026-09-20 16:00:00'),
(5, 6, '+91 43210 98765', 'OUTBOUND', 'COMPLETED', 'FOLLOW_UP', 1, 128, '2026-09-21 09:45:00');

INSERT INTO call_transcripts (call_id, full_text, language) VALUES
(1, 'Sales: Hello, this is from Vox Solutions. Am I speaking with Rahul Sharma?\nCustomer: Yes, speaking.\nSales: We offer business loan solutions tailored for manufacturing firms. Would you be interested in learning more?\nCustomer: Yes, we have been looking at expansion financing. Can you share interest rates and tenure options?\nSales: Certainly. Our rates start from 9.5% with flexible tenure up to 7 years. I can schedule a detailed discussion.\nCustomer: That sounds good. Please send the brochure and we can talk next week.', 'en'),
(2, 'Sales: Hi Priya, following up on your website inquiry about our CRM package.\nCustomer: Hi. We are evaluating a few options. Pricing is a concern for a 20-person team.\nSales: Understood. We have a startup tier that might fit. Shall I email a quote?\nCustomer: Yes, please. Also include onboarding timeline.', 'en'),
(3, 'Sales: Good morning Amit. Calling about the ERP demo we discussed.\nCustomer: Yes, the team liked the inventory module. We need a formal proposal by month end.\nSales: Great. I will prepare commercial terms and implementation plan.\nCustomer: Looking forward to it.', 'en');

INSERT INTO call_ai_analysis (call_id, summary, interest_level, intent_score, sentiment, sentiment_score, next_action, estimated_deal, objections, follow_up_required) VALUES
(1, 'Customer is interested in business loan for manufacturing expansion. Asked about rates and tenure.', 'INTERESTED', 85, 'POSITIVE', 90, 'Send brochure and schedule follow-up next week', 0, 'NONE', TRUE),
(2, 'Customer evaluating CRM options; pricing is main concern for 20-person team.', 'FOLLOW_UP', 65, 'NEUTRAL', 60, 'Email startup-tier quote and onboarding timeline', 0, 'Pricing concern', TRUE),
(3, 'Team liked inventory module; formal proposal requested by month end.', 'INTERESTED', 80, 'POSITIVE', 85, 'Prepare commercial proposal and implementation plan', 250000, 'NONE', TRUE);

INSERT INTO tasks (contact_id, lead_id, call_id, title, description, status, due_at) VALUES
(1, NULL, 1, 'Send loan brochure to Rahul Sharma', 'Follow up from interested call', 'PENDING', '2026-09-25 10:00:00'),
(2, NULL, 2, 'Email CRM startup quote to Priya Shah', 'Include onboarding timeline', 'PENDING', '2026-09-24 14:00:00'),
(3, 1, 3, 'Prepare GreenField commercial proposal', 'ERP implementation proposal by month end', 'PENDING', '2026-09-30 17:00:00'),
(5, 3, NULL, 'Negotiate Summit Capital contract terms', 'Annual license negotiation', 'PENDING', '2026-10-10 11:00:00');
