import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Arsenal Fans Club Nigeria",
  description: "One home for Arsenal fans everywhere. Join ArsenalFansClubNigeria.",
};

export default function HomePage() {
  return (
    <main className="w-full pt-20 bg-surface min-h-[calc(100vh-20rem)]">
      <div className="flex flex-col w-full">
        <section className="w-full py-space-xl lg:py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-margin md:px-margin-desktop">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
              <div className="lg:col-span-6 flex flex-col items-start pr-0 lg:pr-space-lg">
                <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-surface-container-high text-primary font-label-md text-label-md uppercase tracking-wider mb-space-lg">
                  <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
                  {" "}GLOBAL SUPPORTERS HUB
                </div>
                <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight mb-space-md">
                  One Home for Arsenal Fans Everywhere.
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-space-xl leading-relaxed">
                  Join a community that shares your passion. Stay informed, connect with fellow fans, and support causes that matter.
                </p>
                <div className="flex flex-wrap items-center gap-space-lg mb-space-md">
                  <Link className="inline-flex items-center justify-center font-label-md text-label-md uppercase tracking-wider bg-primary-container text-on-primary px-space-xl py-space-md rounded-lg hover:bg-primary transition-all duration-200 shadow-md hover:shadow-lg group" href="/register">
                    Join the Club aS A MEMBER
                    <span className="material-symbols-outlined text-[18px] ml-space-xs transition-transform group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </Link>
                  <a className="font-label-md text-label-md uppercase tracking-wider text-secondary hover:text-on-surface transition-colors flex items-center gap-space-xs" href="#why-we-gather">
                    Learn More{" "}
                    <span className="material-symbols-outlined text-[18px]">
                      south
                    </span>
                  </a>
                </div>
                <p className="font-body-sm text-body-sm text-secondary">
                  Free to join. Independent fan-run community.
                </p>
              </div>
              <div className="lg:col-span-6 relative mt-space-xl lg:mt-0">
                <div className="relative w-full flex flex-col items-center justify-center py-space-md">
                  <div className="relative flex items-center justify-center">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBetIuFnww-VsKwfIJcJTT8JXXU4cMBrrIi1SZmxdeEGFYCtKPJlVzK1y0nXiHZiOv5nxqSHVgRY6AeEBNWVgKdq6dNWdAXix47im7lG7FxKM57gbbaSNXAPb24pTI-KHh3J9r5GISPfS1eyDy4t7BGP66mfzLFDh6Cmup58MnSn93vdSJZZKFtmPc02WbqyM-evLbE5hi4-aDaC048e8nJHwSl11oR_09FGiObQsXrM7pDXn_vOpI-" alt="Arsenal Fans Club Nigeria Crest - One Club One Family" className="w-80 h-80 sm:w-96 sm:h-96 object-contain select-none transition-transform duration-500 hover:scale-105 filter drop-shadow-xl" />
                  </div>
                  <div className="mt-space-md inline-flex items-center gap-space-xs bg-surface-container-high px-space-md py-space-xs rounded-full shadow-sm">
                    <span className="material-symbols-outlined text-primary text-[18px]">
                      verified
                    </span>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-semibold">
                      OFFICIAL SUPPORTERS CLUB • NIGERIA
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-space-xl bg-surface-container-low" id="why-we-gather">
          <div className="max-w-7xl mx-auto px-margin md:px-margin-desktop">
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-space-xl">
              <div className="inline-flex items-center gap-space-xs text-primary font-label-sm text-label-sm uppercase tracking-widest mb-space-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                {" "}WHY JOIN US
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                Everything a Nigerian Gunner Needs
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop">
              <div className="bg-surface-container-lowest p-space-xl rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col items-start">
                <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-primary-container mb-space-lg">
                  <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "\"FILL\" 1" }}>
                    groups
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-space-sm">
                  Community
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Talk football, share opinions, and meet fans from around the world in genuine, non-toxic fan rooms.
                </p>
              </div>
              <div className="bg-surface-container-lowest p-space-xl rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col items-start">
                <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-primary-container mb-space-lg">
                  <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "\"FILL\" 1" }}>
                    newspaper
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-space-sm">
                  News
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Get the latest Arsenal headlines in one clean feed without clickbait or intrusive editorial clutter.
                </p>
              </div>
              <div className="bg-surface-container-lowest p-space-xl rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col items-start">
                <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-primary-container mb-space-lg">
                  <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "\"FILL\" 1" }}>
                    favorite
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-space-sm">
                  Giving Back
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Support fan-led initiatives and see exactly where your donations go with open ledger transparency.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-space-xl bg-surface">
          <div className="max-w-7xl mx-auto px-margin md:px-margin-desktop">
            <div className="flex items-end justify-between mb-space-xl">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary block mb-space-xs">
                  MATCHDAY DISPATCHES
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                  Latest News
                </h2>
              </div>
              <a className="font-label-md text-label-md uppercase tracking-wider text-primary hover:text-primary-container transition-colors flex items-center gap-space-xs group" href="#">
                View all news{" "}
                <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop">
              <article className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col group">
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Arsenal men first team squad undergoing intensive tactical pitch drills during high intensity London Colney training ground session with tactical clipboards in crisp natural daylight." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_iEYMoTzNPMmrYk3Pi56VSstkBtTyqjP5nROx0VL4nytqgLX7NVmy7Ry2VNTpNkWN0Cdpsr0LC4Bbj1nGYv5smbwvX0Biw78rZfylrj7al3cg5ilPnm110ZzlerSkYOmmu16C_BzA5-8mAbyhPqIbkGPvlDA17U8bMnY8mCHf8k6XB5nRGGgkMrAJtt3On07cfXfDQ54loo5AKwgMpfljlPsFely113i-UcLVRVo" />
                  <div className="absolute top-space-md left-space-md bg-inverse-surface text-inverse-on-surface font-label-sm text-label-sm uppercase tracking-wider px-space-md py-1 rounded">
                    TACTICAL PREVIEW
                  </div>
                </div>
                <div className="p-space-lg flex flex-col flex-1">
                  <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-secondary mb-space-xs">
                    <span className="">
                      The Athletic / AFC Clubb
                    </span>
                    <span className="">
                      •
                    </span>
                    <span className="">
                      Today, 2h ago
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors leading-snug line-clamp-2">
                    Arteta's tactical masterclass ahead of North London clash
                  </h3>
                </div>
              </article>
              <article className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col group">
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Dynamic in-game match action shot of central midfielder controlling ball under stadium lights at Emirates Stadium with vibrant green pitch and blurred fans." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOk-CNKL82bglLmrJHsl43vdE0vwwk7SsicxTResvI8rsZHgso4kwmKUGtWWQFBIxA88Awv0LKayNr7COHLgWOE4FnQySBYZkjP_QWlHGN_KyPZLElhbA9lfh8t4UM0i36QOlp0SuNcAI0rz3iubXsXBsbIz8uzBo_3yht4BKQj5CSwvA--QoQiih5UIWUXdonIFo1ch_KxHVfxAtNW9qB6bPQ7YCg8NIOyBveY_U" />
                  <div className="absolute top-space-md left-space-md bg-inverse-surface text-inverse-on-surface font-label-sm text-label-sm uppercase tracking-wider px-space-md py-1 rounded">
                    TRANSFERS
                  </div>
                </div>
                <div className="p-space-lg flex flex-col flex-1">
                  <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-secondary mb-space-xs">
                    <span className="">
                      Clubb Newsroom
                    </span>
                    <span className="">
                      •
                    </span>
                    <span className="">
                      Yesterday
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors leading-snug line-clamp-2">
                    Midfield reinforcements: Scouting report on top summer targets
                  </h3>
                </div>
              </article>
              <article className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col group">
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Arsenal Hale End youth academy players celebrating a decisive goal wearing iconic red and white shirts together in joyous camaraderie on pitch." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCD0IjsFfgrkTsCZgEvCYqfhgZs0dmUwYUvGw5s6vuiv0JdPB6Y3TdFs9bhMcXtWcdNZsvXPg-4RR2TGEfeRkIxtGBcWD6DxGPp9wGjPLYRspgKqOrl2tLTI7beVzFLU8aO3B1fsCi3lS3EFZqwJIRVK8u5iZ_rMf8TdQnLYl5eCcjcehGvJypDZE-f9EfilrZNzpm-qN44Q6LovAH32G1UBkJL78ZZidb9TgsI3xo" />
                  <div className="absolute top-space-md left-space-md bg-inverse-surface text-inverse-on-surface font-label-sm text-label-sm uppercase tracking-wider px-space-md py-1 rounded">
                    ACADEMY
                  </div>
                </div>
                <div className="p-space-lg flex flex-col flex-1">
                  <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-secondary mb-space-xs">
                    <span className="">
                      Youth Focus
                    </span>
                    <span className="">
                      •
                    </span>
                    <span className="">
                      2 days ago
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors leading-snug line-clamp-2">
                    Next-gen talent shining in Hale End: Key starlets to watch
                  </h3>
                </div>
              </article>
            </div>
          </div>
        </section>
        <section className="w-full py-space-xl bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-margin md:px-margin-desktop">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
              <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-space-md">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold mb-space-xs">
                  FAN FORUMS
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-space-md">
                  Join the Conversation
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-space-xl leading-relaxed">
                  Match threads, transfer talk, and fan groups. Your voice belongs here. Connect with millions of Gooners across 140 countries.
                </p>
                <a className="inline-flex items-center justify-center font-label-md text-label-md uppercase tracking-wider bg-inverse-surface text-inverse-on-surface px-space-xl py-space-md rounded-lg hover:bg-primary-container transition-colors shadow-sm" href="#">
                  Visit the Community
                </a>
              </div>
              <div className="lg:col-span-7 flex flex-col gap-space-md">
                <a className="p-space-lg bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-space-md group" href="#">
                  <div className="flex flex-col gap-space-xs max-w-xl">
                    <div className="flex items-center gap-space-sm">
                      <span className="bg-primary-fixed text-primary font-label-sm text-label-sm uppercase px-space-sm py-0.5 rounded">
                        MATCH THREAD
                      </span>
                      <span className="font-body-sm text-body-sm text-secondary">
                        Active now
                      </span>
                    </div>
                    <h4 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">
                      Post-Match Thread: Arsenal vs Manchester City (Tactical analysis)
                    </h4>
                  </div>
                  {" "}
                  <div className="flex items-center gap-space-xs font-label-md text-label-md text-secondary shrink-0">
                    <span className="material-symbols-outlined text-[18px]">
                      chat_bubble
                    </span>
                    <span className="">
                      342 replies
                    </span>
                  </div>
                </a>
                <a className="p-space-lg bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-space-md group" href="#">
                  <div className="flex flex-col gap-space-xs max-w-xl">
                    <div className="flex items-center gap-space-sm">
                      <span className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase px-space-sm py-0.5 rounded">
                        TRANSFERS
                      </span>
                      <span className="font-body-sm text-body-sm text-secondary">
                        Pinned discussion
                      </span>
                    </div>
                    <h4 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">
                      Summer 2025 Transfer Window Wishlist & Rumour Mill
                    </h4>
                  </div>
                  {" "}
                  <div className="flex items-center gap-space-xs font-label-md text-label-md text-secondary shrink-0">
                    <span className="material-symbols-outlined text-[18px]">
                      chat_bubble
                    </span>
                    <span className="">
                      1,289 replies
                    </span>
                  </div>
                </a>
                <a className="p-space-lg bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-space-md group" href="#">
                  <div className="flex flex-col gap-space-xs max-w-xl">
                    <div className="flex items-center gap-space-sm">
                      <span className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase px-space-sm py-0.5 rounded">
                        AWAY DAYS
                      </span>
                      <span className="font-body-sm text-body-sm text-secondary">
                        UCL Travel
                      </span>
                    </div>
                    <h4 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">
                      Away Day Guide: Traveling to Allianz Arena for UCL Quarter-Final
                    </h4>
                  </div>
                  {" "}
                  <div className="flex items-center gap-space-xs font-label-md text-label-md text-secondary shrink-0">
                    <span className="material-symbols-outlined text-[18px]">
                      chat_bubble
                    </span>
                    <span className="">
                      88 replies
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-20 bg-surface-container-low">
          <div className="max-w-4xl mx-auto px-margin md:px-margin-desktop text-center">
            <div className="inline-flex items-center gap-space-xs text-primary font-label-sm text-label-sm uppercase tracking-widest mb-space-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
              {" "}COMMUNITY IMPACT
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-space-xs">
              Make a Difference
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto mb-space-xl">
              Every contribution supports fan-led projects. We publish how every donation is used with full financial auditing.
            </p>
            <div className="bg-surface-container-lowest p-space-xl rounded-xl shadow-md text-left flex flex-col">
              <div className="flex items-center justify-between mb-space-md">
                <span className="inline-flex items-center gap-space-xs text-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                  <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                  {" "}ACTIVE CAMPAIGN
                </span>
                <span className="font-label-sm text-label-sm text-secondary">
                  Islington Community Trust
                </span>
              </div>
              <h3 className="font-headline-lg text-headline-lg text-on-surface mb-space-sm">
                North London Community Foodbank & Youth Coaching Fund
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-space-lg leading-relaxed">
                Funding matchday food collection points and community sports sessions for local youth around Islington and Camden neighborhoods.
              </p>
              <div className="flex items-center justify-between font-label-md text-label-md mb-space-xs">
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  £8,450 raised
                </span>
                <span className="text-secondary">
                  of £10,000 goal (84.5% Funded)
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-surface-container overflow-hidden mb-space-xl">
                <div className="h-full bg-primary-container rounded-full transition-all duration-1000" style={{ width: "84.5%" }}></div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-space-xs">
                <a className="w-full sm:w-auto inline-flex items-center justify-center font-label-md text-label-md uppercase tracking-wider bg-primary-container text-on-primary px-space-xl py-space-md rounded-lg hover:bg-primary transition-all shadow-sm" href="#">
                  Donate Now
                </a>
                <a className="font-body-sm text-body-sm text-secondary hover:text-on-surface transition-colors flex items-center gap-space-xs" href="#">
                  See how funds are used{" "}
                  <span className="material-symbols-outlined text-[16px]">
                    open_in_new
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-space-xl bg-surface">
          <div className="max-w-7xl mx-auto px-margin md:px-margin-desktop">
            <div className="w-full bg-inverse-surface text-inverse-on-surface rounded-full py-16 px-space-xl text-center flex flex-col items-center justify-center relative overflow-hidden shadow-xl">
              <div className="w-14 h-14 rounded-full bg-primary-container text-on-primary flex items-center justify-center mb-space-lg shadow-sm">
                <span className="material-symbols-outlined text-[32px]">
                  shield
                </span>
              </div>
              <h2 className="font-headline-xl text-headline-xl text-surface-lowest tracking-tight max-w-2xl mb-space-md">
                Ready to Join the Club?
              </h2>
              <p className="font-body-md text-body-md text-secondary-fixed max-w-lg mb-space-xl">
                Be part of the most vibrant supporter collective in world football. Match threads, grassroots impact, and verified updates.
              </p>
              <Link className="inline-flex items-center justify-center font-label-md text-label-md uppercase tracking-wider bg-surface-lowest text-inverse-surface px-space-xl py-space-md rounded-lg hover:bg-primary-container hover:text-on-primary transition-all duration-200 shadow-md" href="/register">
                Create Your Free Account
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
