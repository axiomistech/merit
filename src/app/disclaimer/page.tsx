import React from 'react';

export const metadata = {
  title: 'Non-Affiliation Disclaimer — MERITWISE',
  description: 'Statutory disclaimer regarding examination authorities and score guarantees.',
};

export default function DisclaimerPage() {
  return (
    <div className="bg-[#FBFBFA] text-[#121316] min-h-screen py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="merit-card p-8 sm:p-12 shadow-xs">
          <h1 className="text-3xl font-extrabold sm:text-4xl text-[#121316]">Non-Affiliation Disclaimer</h1>
          <p className="mt-2 text-xs text-[#71717A]">Last Updated: November 2026</p>

          <div className="mt-8 space-y-6 text-xs sm:text-sm leading-relaxed text-[#52525B]">
            <section>
              <h2 className="text-base font-bold text-[#121316]">1. Independent Academic Platform</h2>
              <p className="mt-2">
                MERITWISE (MERITWISE.COM) is an independent private competitive examination practice
                and assessment platform. MERITWISE is not affiliated with, endorsed by, sponsored by, or
                connected to:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>The National Testing Agency (NTA)</li>
                <li>The Union Public Service Commission (UPSC)</li>
                <li>The Joint Admission Board (JAB) or Indian Institutes of Technology (IITs)</li>
                <li>The National Medical Commission (NMC)</li>
                <li>Any state, central, or university examination authority</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#121316]">2. Trademarks & Nomenclature</h2>
              <p className="mt-2">
                All acronyms and names such as "NEET", "JEE Main", "JEE Advanced", "UPSC CSE", and "GATE" are
                used strictly for descriptive, identification, and curriculum alignment purposes under
                nominative fair use. All trademarks belong to their respective statutory owners.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#121316]">3. No Guaranteed Ranks or Admissions</h2>
              <p className="mt-2">
                MERITWISE does not guarantee selection, admission, scores, or ranks in any
                competitive examination. Scores earned on MERITWISE simulations reflect practice performance
                under simulated test conditions and do not predict official examination outcomes.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
