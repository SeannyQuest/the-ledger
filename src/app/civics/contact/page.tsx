import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ContactReps } from "@/components/civics/ContactReps";

export const metadata = {
  title: "Contact Your Representatives | Daonra",
  description:
    "Find your senators and representatives by ZIP code. Phone scripts, email templates, and tips that actually work.",
};

export default function ContactPage() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Civic How-To
        </div>
        <h1 className="mt-4 max-w-3xl font-headline text-5xl font-black tracking-tight text-ink lg:text-6xl">
          Contact Your Representatives
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink/70">
          Your elected officials work for you. Find them, call them, and tell
          them what you need. It takes 30 seconds and it matters more than you
          think.
        </p>

        <ContactReps />

        <div className="mt-16 text-center">
          <Link
            href="/civics"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent hover:text-ink"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to Civic Playbook
          </Link>
        </div>
      </div>
    </section>
  );
}
