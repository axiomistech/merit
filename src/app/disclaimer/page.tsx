import React from 'react';

export const metadata = {
  title: 'Non-Affiliation Disclaimer — FORT Learning',
  description: 'Statutory disclaimer regarding examination authorities and score guarantees.',
};

export default function DisclaimerPage() {
  return (
    <div className="bg-[#F7F5EF] text-[#2E332D] min-h-screen py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#E6E5DE] bg-white p-8 sm:p-12 shadow-card">
          <h1 className="text-3xl font-extrabold sm:text-4xl text-[#263126]">Non-Affiliation Disclaimer</h1>
          <p className="mt-2 text-xs text-[#92958D]">Last Updated: November 2026</p>

          <div className="mt-8 space-y-6 text-xs sm:text-sm leading-relaxed text-[#73786E]">
            <section>
              <h2 className="text-base font-bold text-[#263126]">1. Independent Academic Platform</h2>
              <p className="mt-2">
                FORT Learning (FORTLEARNING.COM) is an independent private educational technology and
                examination practice platform. FORT Learning is not affiliated with, endorsed by,
                sponsored by, or connected to:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>The National Testing Agency (NTA)</li>
                <li>The Union Public Service Commission (UPSC)</li>
                <li>The Joint Admission Board (JAB) or Indian Institutes of Technology (IITs)</li>
                <li>The National Medical Commission (NMC)</li>
                <li>Any state or central university examination board</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#263126]">2. Trademarks & Nomenclature</h2>
              <p className="mt-2">
                All acronyms and names such as "NEET", "JEE Main", "JEE Advanced", and "UPSC CSE" are
                used strictly for descriptive, identification, and curriculum alignment purposes under
                nominative fair use. All trademarks belong to their respective statutory owners.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#263126]">3. No Guaranteed Ranks or Admissions</h2>
              <p className="mt-2">
                FORT Learning does not guarantee selection, admission, scores, or ranks in any
                competitive examination. Scores earned on FORT simulations reflect practice performance
                under simulation conditions and do not predict official examination outcomes.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
