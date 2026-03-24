import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

export default function TownHallsPage() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-4xl px-4 py-24 lg:px-8">
        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Civic How-To
        </div>
        <h1 className="mt-4 max-w-3xl font-headline text-5xl font-black tracking-tight text-ink lg:text-6xl">
          Attend a Town Hall
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink/70">
          Town halls are one of the few places where regular people can ask
          their elected officials questions directly. Here is how to find them,
          what to bring, and how to make your presence count.
        </p>

        {/* Section 1 — How to Find Town Halls */}
        <div className="mt-16">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-ink">
            How to Find Town Halls
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="font-headline text-lg font-bold text-ink">
                Your rep&apos;s official website
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                Most members post upcoming events under &ldquo;Events&rdquo; or
                &ldquo;In the District.&rdquo; Check their official page first.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="https://www.house.gov/representatives"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent hover:text-ink"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  House.gov
                </a>
                <a
                  href="https://www.senate.gov/senators/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent hover:text-ink"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Senate.gov
                </a>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="font-headline text-lg font-bold text-ink">
                Town Hall Project
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                Tracks town halls nationally and flags when reps are avoiding
                them. The best single source for upcoming events.
              </p>
              <a
                href="https://townhallproject.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent hover:text-ink"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                townhallproject.com
              </a>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="font-headline text-lg font-bold text-ink">
                Local party offices
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                Both parties hold constituent meetings. Search &ldquo;[your
                city] Democratic party&rdquo; or &ldquo;[your city] Republican
                party&rdquo; to find local office contacts and event calendars.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="font-headline text-lg font-bold text-ink">
                Call the district office
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                The most reliable method. Call your rep&apos;s district office
                (not DC) and ask when their next public meeting is. District
                office staff are usually more responsive than DC staff.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2 — What to Expect */}
        <div className="mt-16">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-ink">
            What to Expect
          </h2>
          <ul className="mt-6 space-y-4 text-sm leading-relaxed text-ink/80">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 font-bold text-accent">&bull;</span>
              <span>
                <strong className="text-ink">Format varies.</strong> Some are
                open Q&amp;A, some use pre-submitted questions, some are
                teleconferences.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 font-bold text-accent">&bull;</span>
              <span>
                <strong className="text-ink">Bring ID.</strong> Some events
                require it. None require party registration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 font-bold text-accent">&bull;</span>
              <span>
                <strong className="text-ink">Arrive early.</strong> Seating is
                often first-come, first-served.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 font-bold text-accent">&bull;</span>
              <span>
                Events can be crowded or nearly empty depending on the rep and
                the political moment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 font-bold text-accent">&bull;</span>
              <span>
                They can get heated. That is normal and legal.
              </span>
            </li>
          </ul>
        </div>

        {/* Section 3 — How to Ask a Good Question */}
        <div className="mt-16">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-ink">
            How to Ask a Good Question
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/70">
            This is the part that matters most. A focused question gets a real
            answer. A rambling one gets a rehearsed dodge.
          </p>
          <ul className="mt-6 space-y-4 text-sm leading-relaxed text-ink/80">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 font-bold text-accent">&bull;</span>
              <span>
                <strong className="text-ink">One issue per question.</strong>{" "}
                Do not combine three things into one ask.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 font-bold text-accent">&bull;</span>
              <span>
                <strong className="text-ink">
                  Lead with a fact or personal story,
                </strong>{" "}
                not an accusation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 font-bold text-accent">&bull;</span>
              <span>
                <strong className="text-ink">State the specific ask.</strong>{" "}
                &ldquo;Will you co-sponsor X bill?&rdquo; or &ldquo;Why did you
                vote against Y?&rdquo; Not &ldquo;Why do you hate poor
                people?&rdquo;
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 font-bold text-accent">&bull;</span>
              <span>
                <strong className="text-ink">Write it down beforehand.</strong>{" "}
                30 seconds max when spoken aloud.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 font-bold text-accent">&bull;</span>
              <span>
                <strong className="text-ink">If they dodge,</strong> you can
                politely follow up once: &ldquo;I just want to make sure I
                understand your position. Are you a yes or a no on
                this?&rdquo;
              </span>
            </li>
          </ul>

          <div className="mt-8 rounded-xl border-2 border-accent/20 bg-accent/5 p-6">
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Example Question Structure
            </h3>
            <p className="mt-4 font-mono text-sm leading-relaxed text-ink/80">
              &ldquo;[Fact or personal story]. My question is: [specific yes/no
              or position ask].&rdquo;
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink/60">
              Example: &ldquo;My daughter&apos;s school lost two teaching
              positions this year due to budget cuts. Will you vote to restore
              federal education funding in the upcoming appropriations
              bill?&rdquo;
            </p>
          </div>
        </div>

        {/* Section 4 — What If They Refuse to Hold Town Halls? */}
        <div className="mt-16">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-ink">
            What If They Refuse to Hold Town Halls?
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/70">
            This happens a lot. You still have options.
          </p>
          <ul className="mt-6 space-y-4 text-sm leading-relaxed text-ink/80">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 font-bold text-accent">&bull;</span>
              <span>
                <strong className="text-ink">
                  Attend a telephone town hall
                </strong>{" "}
                if they offer one. Less personal but still counts as a
                constituent touchpoint.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 font-bold text-accent">&bull;</span>
              <span>
                <strong className="text-ink">
                  Show up at the district office in person.
                </strong>{" "}
                Staff will take notes and pass them along.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 font-bold text-accent">&bull;</span>
              <span>
                <strong className="text-ink">Coordinate with neighbors.</strong>{" "}
                A group of 10 showing up to a district office makes more impact
                than one person alone.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 font-bold text-accent">&bull;</span>
              <span>
                <strong className="text-ink">Document the absence.</strong>{" "}
                Town Hall Project tracks this. Media outlets cover patterns of
                avoidance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 font-bold text-accent">&bull;</span>
              <span>
                <strong className="text-ink">
                  Write a letter to the editor
                </strong>{" "}
                of your local paper naming the avoidance. Local press still
                matters.
              </span>
            </li>
          </ul>
        </div>

        {/* Section 5 — Find Your Rep's District Office */}
        <div className="mt-16 rounded-xl border-2 border-accent/30 bg-surface p-6">
          <h2 className="font-headline text-xl font-bold text-ink">
            Find Your Rep&apos;s District Office
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink/70">
            Use our contact lookup to find your representatives and their
            district office phone numbers.
          </p>
          <Link
            href="/civics/contact"
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent hover:text-ink"
          >
            Look Up Your Reps <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Section 6 — Town Hall Etiquette */}
        <div className="mt-16">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-ink">
            Town Hall Etiquette
          </h2>
          <ul className="mt-6 space-y-4 text-sm leading-relaxed text-ink/80">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 font-bold text-accent">&bull;</span>
              <span>
                <strong className="text-ink">You have a right to be there.</strong>{" "}
                These are public events paid for with public money.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 font-bold text-accent">&bull;</span>
              <span>
                <strong className="text-ink">Stay on topic.</strong> The more
                focused your participation, the harder it is to dismiss.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 font-bold text-accent">&bull;</span>
              <span>
                <strong className="text-ink">Let others ask questions too.</strong>{" "}
                You are not the only constituent in the room.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 font-bold text-accent">&bull;</span>
              <span>
                <strong className="text-ink">Recording is generally legal</strong>{" "}
                in public meetings. Know your state&apos;s rules on recording
                consent.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 font-bold text-accent">&bull;</span>
              <span>
                <strong className="text-ink">Disruption backfires.</strong> It
                can get you removed and undermines your message.
              </span>
            </li>
          </ul>
        </div>

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
