"use client";
import React from "react";

/**
 * Layout notes:
 * - Original used a 2-col CSS grid on sequential prose. Grid fills row-major
 *   (left, right, left, right...), which breaks narrative reading order.
 *   Fixed by running the whole story as a single centered column.
 * - Signature motif: thin "blueprint" rules + corner ticks, drawn from the
 *   story's own line "the blueprint of a dream." Uses the existing `primary`
 *   token (already blue) rather than introducing a new accent.
 */

const ChapterLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-4 mt-16 mb-6">
    <span className="h-px flex-1 bg-default-200" />
    <h3 className="font-serif italic text-xl md:text-2xl text-default-900 tracking-wide whitespace-nowrap">
      {children}
    </h3>
    <span className="h-px flex-1 bg-default-200" />
  </div>
);

const BlueprintQuote = ({ children }: { children: React.ReactNode }) => (
  <blockquote className="relative my-6 py-3 pl-6 pr-2">
    <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-primary/50" />
    <span className="absolute left-0 bottom-0 h-3 w-3 border-l-2 border-b-2 border-primary/50" />
    <p className="font-serif italic text-lg md:text-xl text-default-800 leading-snug">
      {children}
    </p>
  </blockquote>
);

const BrandHistory = () => {
  return (
    <section className="bg-background">
      {/* Google Fonts: a characterful serif for display/quotes, clean sans for body */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,500&family=Inter:wght@400;500&display=swap');
        .font-serif { font-family: 'Fraunces', ui-serif, Georgia, serif; }
        .font-sans-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <header className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-primary font-medium mb-4">
            DMCI Homes &middot; Brand Story
          </p>
          <h1 className="font-serif font-semibold text-4xl md:text-5xl text-default-900 leading-tight">
            The Heroes of the Underserved
          </h1>
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className="h-px w-8 bg-primary/40" />
            <p className="font-serif italic text-default-500 text-base">
              Inspired by Alfonso
            </p>
            <span className="h-px w-8 bg-primary/40" />
          </div>
        </header>

        {/* Story */}
        <article className="font-sans-body text-default-700 leading-[1.85] text-[1.05rem] space-y-5 text-center md:text-left">
          <p>
            <span className="float-left font-serif text-6xl leading-[0.8] pr-2 pt-1 text-primary">
              W
            </span>
            ith a wife and a baby on the way, the cost of living in the city
            became prohibitive for Alfonso. Far beyond the city boundaries,
            other builders began to develop sprawling neighborhoods of
            cookie-cutter houses on doily-sized lots. They&apos;re pretty but
            too cramped (for a growing family) and too far out of the city
            center.
          </p>

          <p>
            The middle-class man became a stressed out man-in-the-middle, faced
            with no choice but to take the long daily commute&mdash;or pay big
            city prices. There was no middle ground.
          </p>

          <BlueprintQuote>
            &ldquo;Pagod ka na papunta sa trabaho, pagod ka pa
            pag-uwi&hellip;&rdquo;
          </BlueprintQuote>

          <BlueprintQuote>
            &ldquo;Alfonso deserves better,&rdquo; the Builder remarked.
            &ldquo;He deserves a real home, accessible to his work&hellip; a
            cocoon of good living.&rdquo;
          </BlueprintQuote>

          <p>
            The Builder saw land on the edge of the city&mdash;and bought it.
            SOMEDAY, he knew, this fringe would be part of the metropolis. This,
            he dedicated to Alfonso, the underserved middle manager&mdash;his
            needs, his family&apos;s needs, his realities, and his dreams.
          </p>

          <p>
            The Builder had friends who shared his passion for building and who
            possessed the expertise to make things happen. With knowledge gained
            from building skyscrapers, the Builder and friends built mid-rise
            havens that Alfonso could call home.
          </p>

          <p>
            He used the best materials and fine finishing, and sold these at
            Alfonso-friendly prices.
          </p>

          <ChapterLabel>Expanding the Vision</ChapterLabel>

          <p>
            More Alfonsos came to stay. And the Builder and friends visited them
            every week, asking how they could make &ldquo;home&rdquo; more
            comfortable. See, the Builder was an experimental sort&mdash;and
            would innovate and iterate according to the wishes of Alfonso and
            his people. It sometimes drove his partners crazy, and these
            ever-changing plans often forced them to work late into the night.
            But when they built it and saw the vision come to life, they were
            thankful for the challenge that made them all better builders!
          </p>

          <BlueprintQuote>
            &ldquo;Not one of us is better than all of us!&rdquo;
          </BlueprintQuote>

          <p>
            Other people&mdash;architects, builders, engineers, salesmen,
            contractors&mdash;happily joined the Builder! The team came to be
            known as The Heroes of the Underserved.
          </p>

          <p>
            Alfonso and his people were a neighborly group. They thrived on
            social encounters and they valued friendships highly. So the
            intrepid team built neighborhoods with clubhouses where people would
            converge to party or to simply lounge around. They put up
            playgrounds and dug swimming pools; they incorporated parks and
            greenery. They built a world close to, or within, the city where
            children played and families found respite from the urban jungle.
          </p>

          <p className="font-serif italic text-default-900 text-lg">
            Because no one should feel that he has compromised on his home. No,
            not even Alfonso.
          </p>

          <ChapterLabel>The Daily Challenge</ChapterLabel>

          <p>
            More Alfonsos came, inquiring about possible homes. So the Builder
            and his team built faster&hellip; and faster&hellip; barely aware
            that an enemy was rising within: the twin destroyers known as
            Complacency and Carelessness.
          </p>

          <p>
            They are formidable enemies, said the Builder. They can make
            themselves invisible. They hide inside people who seem to be
            working, but whose hearts are not for Alfonso and the people they
            serve. They are enemies whose loyalties are not to the team.
          </p>

          <p>
            The enemy can take shortcuts and call it expediency. It can lead the
            team into the rut of mindless repetition of projects. The enemy
            ignores Alfonso and his needs.
          </p>

          <p className="font-serif italic text-default-900 text-lg">
            The enemy is the spirit of underservice. This, our heroes must fight
            everyday.
          </p>

          <ChapterLabel>Moving Closer to the City of Tomorrow</ChapterLabel>

          <p>
            As long as there are people like Alfonso, as long as people must go
            to the cities for their livelihood, Heroes of the Underserved
            continue to build cocoons of affordable comfort and serve Alfonso in
            the most personable, remarkable ways.
          </p>

          <p>
            In some secret cavern, our heroes keep the blueprint of a dream: a
            city of tomorrow&mdash;a place where a more prosperous Alfonso shall
            live and work. Our heroes dream of a 50-storey tower with a view of
            the bay and mountains beyond. They dream of the easy flow of traffic
            and a causeway that gets Alfonso to the old city in a matter of
            minutes. The finest of leisure, entertainment, working spaces, and
            family havens are in one accessible site.
          </p>
        </article>

        {/* Closing line, set apart as the payoff */}
        <div className="relative mt-14 pt-10 text-center">
          <span className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-16 bg-primary/40" />
          <p className="font-serif text-2xl md:text-3xl text-default-900 leading-snug">
            For Alfonso, the city of tomorrow is a place{" "}
            <span className="italic text-primary">never</span> out of reach.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrandHistory;
