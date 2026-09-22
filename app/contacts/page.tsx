import { ContactsTable } from "@/components/contacts/ContactsTable";

export default function ContactsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-ink">Contacts</h1>
        <p className="text-sm text-ink-faint mt-1">
          Manage every customer, lead and prospect in one place.
        </p>
      </div>
      <ContactsTable />
    </div>
  );
}
