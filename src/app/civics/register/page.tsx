import type { Metadata } from "next";
import VoterRegistration from "@/components/civics/VoterRegistration";

export const metadata: Metadata = {
  title: "Register to Vote | Daonra",
  description:
    "Check your voter registration status, find your polling place, and register to vote in all 50 states.",
};
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function RegisterToVotePage() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-4xl px-4 py-24 lg:px-8">
        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Civic How-To
        </div>
        <h1 className="mt-4 max-w-3xl font-headline text-5xl font-black tracking-tight text-ink lg:text-6xl">
          Register to Vote
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink/70">
          State-by-state voter registration guide. Select your state to see
          deadlines, ID requirements, online registration links, and everything
          else you need to get on the rolls.
        </p>

        <VoterRegistration />

        {/* Bottom CTAs */}
        <div className="mt-16 flex flex-wrap items-center gap-6 border-t border-border pt-8">
          <Link
            href="/civics"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent hover:text-ink"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to Civics Hub
          </Link>
        </div>
      </div>
    </section>
  );
}
