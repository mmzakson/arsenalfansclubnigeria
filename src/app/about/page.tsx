import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Arsenal Fans Club Nigeria",
  description: "About ArsenalFansClubNigeria, our mission and our Board of Trustees.",
};

export default function AboutPage() {
  return (
    <main className="w-full pt-20 bg-surface min-h-[calc(100vh-20rem)]">
      <div className="flex flex-col w-full">
        <section className="w-full py-space-xl md:py-24 relative overflow-hidden bg-surface">
          <div className="absolute inset-0 bg-[radial-gradient(#db0007_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none"></div>
          <div className="max-w-4xl mx-auto px-margin md:px-margin-desktop text-center relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant mb-space-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary-container inline-block animate-pulse"></span>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
                About Us
              </span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight mb-space-md max-w-3xl">
              A Community Built on Passion for Arsenal.
            </h1>
            <p className="font-body-lg text-body-lg text-secondary max-w-2xl mx-auto leading-relaxed">
              ArsenalFansClubNigeria is an independent, fan-run community that brings Arsenal supporters together to connect, stay informed, and give back.
            </p>
          </div>
        </section>
        <section className="w-full py-space-xl bg-surface-container-lowest">
          <div className="max-w-7xl mx-auto px-margin md:px-margin-desktop">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-md aspect-square rounded-full bg-surface-container p-space-xl flex items-center justify-center shadow-sm">
                  <div className="absolute inset-4 rounded-full bg-surface-bright shadow-inner flex items-center justify-center p-6">
                    <img alt="Arsenal Fans Club Nigeria Official Crest" className="w-full h-full object-contain filter drop-shadow-md" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcBgA6_XeI9zu22sg6xSpR4s2vsPg6NjRI5_5_W0KBSx_p1wotGEkRDFsm6DIhKJQC2aHvMXmRs-igtuZOOb6JtienSalfRMQhRPCxI2XTO02BLKEa6Ca9pQDSK6bxUvrzQLjk8865FpQsMyHdoAbuSOE1Oy7FdVKU5PlLXgSpQzh_HKrRe3dZGXgVhffca7q4AP7QQZ5Zoy5s6ny9UGRXY3mqg0LSaDMuedjGery9ctXM1Y3z5gec" />
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="flex items-center gap-space-xs mb-space-sm">
                  <span className="w-6 h-0.5 bg-primary-container inline-block"></span>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
                    Our Story
                  </span>
                </div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-space-md tracking-tight">
                  From Abuja Gatherings to a Global Brotherhood
                </h2>
                <div className="space-y-space-md text-secondary font-body-md text-body-md leading-relaxed">
                  <p className="">
                    ArsenalFansClubNigeria was established to give Gunners a true home that transcends ninety minutes on the pitch. What began as informal match-viewing gatherings in Abuja and across Nigeria has grown into a structured, passionate global brotherhood united under the red and white banner.
                  </p>
                  <p className="">
                    Today, the club connects supporters through structured matchday forums, community initiatives, and transparent grassroots giving. We believe football is more than results—it is about shared identity, mutual support, and uplifting our local communities.
                  </p>
                </div>
                <div className="mt-space-lg pt-space-md flex items-center gap-space-sm bg-surface-container-low px-space-md py-space-sm rounded-lg">
                  <span className="material-symbols-outlined text-primary-container text-[20px]">
                    military_tech
                  </span>
                  <span className="font-headline-sm text-headline-sm text-primary-container italic font-semibold tracking-wide">
                    "One Club, One Family."
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-space-xl bg-surface">
          <div className="max-w-7xl mx-auto px-margin md:px-margin-desktop">
            <div className="text-center max-w-xl mx-auto mb-space-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-surface-container text-on-surface-variant mb-space-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container inline-block"></span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                  Core Principles
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                What We Stand For
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop">
              <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col items-start transition-transform hover:-translate-y-1 duration-200">
                <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary-container mb-space-md">
                  <span className="material-symbols-outlined text-[26px]">
                    groups
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-space-xs">
                  Unity
                </h3>
                <p className="font-body-md text-body-md text-secondary leading-relaxed">
                  We bring fans together, wherever they are, across cities and continents.
                </p>
              </div>
              <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col items-start transition-transform hover:-translate-y-1 duration-200">
                <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary-container mb-space-md">
                  <span className="material-symbols-outlined text-[26px]">
                    handshake
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-space-xs">
                  Respect
                </h3>
                <p className="font-body-md text-body-md text-secondary leading-relaxed">
                  Passionate debate, always conducted with dignity and mutual respect.
                </p>
              </div>
              <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col items-start transition-transform hover:-translate-y-1 duration-200">
                <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary-container mb-space-md">
                  <span className="material-symbols-outlined text-[26px]">
                    volunteer_activism
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-space-xs">
                  Giving Back
                </h3>
                <p className="font-body-md text-body-md text-secondary leading-relaxed">
                  We support fan-led causes and report openly on every donation with full transparency.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-space-xl bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-margin md:px-margin-desktop">
            <div className="text-center max-w-2xl mx-auto mb-space-xl">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold mb-space-xs block">
                Leadership & Governance
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-space-xs">
                Our Board of Trustees
              </h2>
              <p className="font-body-md text-body-md text-secondary">
                The people who guide the club, safeguard its values, and ensure every contribution is used responsibly.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-desktop mb-space-xl">
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col transition-all duration-300 hover:shadow-md group">
                <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-surface-container mb-space-md">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Dignified Nigerian elder statesman wearing a traditional patterned tunic and fedora hat with Jerusalem ribbon, joyful radiant smile, soft warm ambient studio lighting, high resolution portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3r5-u4yRNwL0s2st17iDYlWtczFbc7Jc5NQefn14DgR7GZbOuy8uI_2VB8OCSW4b8vBHShGLlkdvUeeyaJojSZZ8voWsAx_GSEaV5aiIWkfzSJ2HcQJX00IFObt0ukRXXHjokjenZ5GVL-A2W1-r8T3io4byadhyccz80dWDHks1YtbOlAIbngcv5HC9nZrHf7h7rMQeeATM6_UldrVvgPnMvwzspMDwrzy2jab-Btr47ZgN4Rwwp" />
                  <div className="absolute bottom-3 left-3 bg-surface-container-lowest/90 backdrop-blur-sm px-2.5 py-1 rounded text-primary-container font-label-sm text-label-sm font-bold uppercase tracking-wider shadow-sm">
                    Chairman
                  </div>
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-1">
                    Ambassador Adamu Emozozo
                  </h3>
                  <span className="font-label-md text-label-md text-primary font-semibold mb-space-xs">
                    Chairman
                  </span>
                  <p className="font-body-sm text-body-sm text-secondary leading-relaxed mt-auto">
                    Former diplomat providing strategic oversight and international institutional guidance.
                  </p>
                </div>
              </div>
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col transition-all duration-300 hover:shadow-md group">
                <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-surface-container mb-space-md">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Distinguished Nigerian senior administrator wearing deep blue attire and traditional kufi cap, poised and contemplative executive portrait, clear focused gaze, premium photography" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1me7r0ImjEtNjXb05ec2fQfMRMVDF8d2QYK9lrbi4s1AiPmnYkSXpXkIz4jRUUn22EDxy6JWsWvPO9cl7khQoo_5g311D4RKbdrzY87u_VMkklfmL1z4UIGx5vFO5PE1Od7FXRNr2tTezvo96tnHfp1-H4O3ndowa49aiVQi_GPtnsUe9t0XL5VoaJD3Uv9w0r__uDOGzm5dJCzZMM2n2fEQFzaYWVPbuDUdxDxwgho61rj9LGVfd" />
                  <div className="absolute bottom-3 left-3 bg-surface-container-lowest/90 backdrop-blur-sm px-2.5 py-1 rounded text-on-surface font-label-sm text-label-sm font-bold uppercase tracking-wider shadow-sm">
                    Secretary
                  </div>
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-1">
                    Charles Ojugbana
                  </h3>
                  <span className="font-label-md text-label-md text-primary font-semibold mb-space-xs">
                    Secretary
                  </span>
                  <p className="font-body-sm text-body-sm text-secondary leading-relaxed mt-auto">
                    Veteran sports administrator managing governance, documentation, and official club operations.
                  </p>
                </div>
              </div>
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col transition-all duration-300 hover:shadow-md group">
                <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-surface-container mb-space-md">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Distinguished Nigerian male corporate executive in black formal bow-tie suit and spectacles, poised confident financial leader, clean studio backdrop" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiJnstsSJ7yMI63ObW9fVxxE9GZn-EoLpA6r4Uthedo7FPtzUmS0M78kl48PEroYwLFryPqC4R0oyryLSSQuUshs1fk9sAOnmaR5xvZTaIahbJhVhD7Kcf0y3ceQAwm3vP_8XQsfDSmoBq71xIBdDhH8QAi3tOQlkbDVFC9khtjDbW-BKitcMrCD-ouYcBr65rXrTMa6BV_n8B-NqRR8TY3EOi8_QpmdTQXz3Nn4e1Qz30b2agySDJ" />
                  <div className="absolute bottom-3 left-3 bg-surface-container-lowest/90 backdrop-blur-sm px-2.5 py-1 rounded text-on-surface font-label-sm text-label-sm font-bold uppercase tracking-wider shadow-sm">
                    Trustee
                  </div>
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-1">
                    MSHC Kennedy Izuagbe
                  </h3>
                  <span className="font-label-md text-label-md text-secondary font-semibold mb-space-xs">
                    Trustee
                  </span>
                  <p className="font-body-sm text-body-sm text-secondary leading-relaxed mt-auto">
                    Financial consultant stewarding club fiscal compliance, transparency, and strategic growth.
                  </p>
                </div>
              </div>
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col transition-all duration-300 hover:shadow-md group">
                <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-surface-container mb-space-md">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Nigerian media executive wearing traditional blue attire and embroidered cap, eyeglasses, warm approachable smile, professional broadcast leadership portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCribryXN5E-ktmBYeb5iuwJ4QKii8rjGtnQCy0jRt5g9B3-A-FThCLvy5qiNrc6CWeR9BQfQlttpxHocYXqNdVJd3mD75FaLuTKSdmEH5NRyqxX3niJ5WwkRPbBo4k4H0m0NLKBzi_tSvuWU6-YhVF6rF464rKkoN2GQxeiAQpSmYSQace9R_0Jd9mHQKcVfqMZx4E7S1k_9HwCxs9ZVw6DGLsJ6oSNuQV7HiphZShn-gG7v4CNzGO" />
                  <div className="absolute bottom-3 left-3 bg-surface-container-lowest/90 backdrop-blur-sm px-2.5 py-1 rounded text-on-surface font-label-sm text-label-sm font-bold uppercase tracking-wider shadow-sm">
                    Trustee
                  </div>
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-1">
                    SHC Tony Akiotu
                  </h3>
                  <span className="font-label-md text-label-md text-secondary font-semibold mb-space-xs">
                    Trustee
                  </span>
                  <p className="font-body-sm text-body-sm text-secondary leading-relaxed mt-auto">
                    Media executive steering broadcast partnerships, public communications, and external relations.
                  </p>
                </div>
              </div>
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col transition-all duration-300 hover:shadow-md group">
                <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-surface-container mb-space-md">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Respected northern Nigerian gentleman in light blue and white traditional native attire with embroidered matching cap, authoritative calm gaze, warm indoor interior" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsrRAIkRXOHyfVAO4tcA3nYD7iumEhRZVJW5UltZM4y62CMvJqhIIIKbzcL7PdAsikZYvRScDjuT5dFTbWPEeWkLF5n5E24kGXNp4qsqdTKp4La_sSUtBE4WR2Nz4tjbKOeDRUNulA4h0fUzk4qmITHTdwh1wXiE7m5eZHNgUlKVfmIkoTOTLgU9aNiYbrIqiK6yFVGwDi6Sbk0ZUTFPu_k0AFv6Kai2P_OowDlcHJzpKiPcol5NCk" />
                  <div className="absolute bottom-3 left-3 bg-surface-container-lowest/90 backdrop-blur-sm px-2.5 py-1 rounded text-on-surface font-label-sm text-label-sm font-bold uppercase tracking-wider shadow-sm">
                    Trustee
                  </div>
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-1">
                    Mallam Saidu Abdullahi
                  </h3>
                  <span className="font-label-md text-label-md text-secondary font-semibold mb-space-xs">
                    Trustee
                  </span>
                  <p className="font-body-sm text-body-sm text-secondary leading-relaxed mt-auto">
                    Community advocate championing youth development programs and nationwide chapter integration.
                  </p>
                </div>
              </div>
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col transition-all duration-300 hover:shadow-md group">
                <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-surface-container mb-space-md">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Sophisticated Nigerian female television presenter and broadcast journalist, high ponytail hairstyle, elegant monochrome collared top, gold jewelry, graceful confident pose" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAV1tvZw5OPACv15Wmq-GlFFd3j89N0Zc7OwUTv3afIgFirnK4sAdxlAGBA5MRG60IUAAlSwmlSiplfJ-QXtQkojC9XX9pUtNX06iy_pWcp8B8-uq1Ke42wAO0ExKWwVTtNXutXJEbT-QVCLu9xcCkdYWQiNvK_g1pU-gY37o3jVurDA05GQSHZ8oq465eaI6y8HTnU02ugpPZmJidoodqzbJSVM0-cxBd_EGjvFwrUUKZ3zSSTFK-Q" />
                  <div className="absolute bottom-3 left-3 bg-surface-container-lowest/90 backdrop-blur-sm px-2.5 py-1 rounded text-on-surface font-label-sm text-label-sm font-bold uppercase tracking-wider shadow-sm">
                    Trustee
                  </div>
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-1">
                    Mrs Ayo Mario-Ese
                  </h3>
                  <span className="font-label-md text-label-md text-secondary font-semibold mb-space-xs">
                    Trustee
                  </span>
                  <p className="font-body-sm text-body-sm text-secondary leading-relaxed mt-auto">
                    Renowned media personality and broadcast journalist advocating member welfare and public engagement.
                  </p>
                </div>
              </div>
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col transition-all duration-300 hover:shadow-md group">
                <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-surface-container mb-space-md">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Handsome Nigerian man with trimmed grey beard, sunglasses, patterned traditional cap and white native kaftan, relaxed charismatic smile, daylight lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp_-cN_G40kJ8Cf1Ws4-K7JVrZH0HY8uDgVxCEJQL00GhhTQNoZG06F0X11VMUQYLYUh_UUD7WG511VeHPRWpCFCy_hCQOR1TDUzU9qRkmSB3BgF9epM-_DOVSkWkdQrPfbS2jYFU_UWk2JEwWdFJKJ1Hq_D0gQLo6HFQ0PGTm7HSSuG7U-oAtCLLjBnaXOTo6ACxi1p2NOYQaE563NnhJk-ipRwU862pQ02Gs79B9BWgOhrhZB_-L" />
                  <div className="absolute bottom-3 left-3 bg-surface-container-lowest/90 backdrop-blur-sm px-2.5 py-1 rounded text-on-surface font-label-sm text-label-sm font-bold uppercase tracking-wider shadow-sm">
                    Trustee
                  </div>
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-1">
                    Mohammed Bello
                  </h3>
                  <span className="font-label-md text-label-md text-secondary font-semibold mb-space-xs">
                    Trustee
                  </span>
                  <p className="font-body-sm text-body-sm text-secondary leading-relaxed mt-auto">
                    Operations lead focusing on matchday coordination, logistics, and supporter events.
                  </p>
                </div>
              </div>
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col transition-all duration-300 hover:shadow-md group">
                <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-surface-container mb-space-md">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Distinguished Nigerian senior chief wearing vibrant yellow tunic and red Igbo chief cap, warm paternal smile, veteran football administrator portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAT3tk15Nu0yoBV8QlPsfVtBbS55OSjAA3koarisTHGVZuQQGwYs70mAKcnH3sT8VygjcheLpHIigMMruGIapX-fO-lWR342Cyg77I2kE3z9_P_dw0YjbtBlAPceUfTdEMjBsIlpzhkR9ysGio_4a1LIHL1ocCB0lhxeMg0ysZChATbBMz1UXX6LXVgrPBK3uSCHvXH0daHJuJOL85rOhJ94O-Tv81tqwmZhk_xu_Ie1PX9KCHiEchD" />
                  <div className="absolute bottom-3 left-3 bg-surface-container-lowest/90 backdrop-blur-sm px-2.5 py-1 rounded text-on-surface font-label-sm text-label-sm font-bold uppercase tracking-wider shadow-sm">
                    Trustee
                  </div>
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-1">
                    Chief Fan Ndubuoke
                  </h3>
                  <span className="font-label-md text-label-md text-secondary font-semibold mb-space-xs">
                    Trustee
                  </span>
                  <p className="font-body-sm text-body-sm text-secondary leading-relaxed mt-auto">
                    Senior football administrator lending decades of sports governance and sports policy wisdom.
                  </p>
                </div>
              </div>
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col transition-all duration-300 hover:shadow-md group">
                <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-surface-container mb-space-md">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Nigerian male sports journalist in checked blue button-down shirt, shaved head, intelligent warm expression, modern digital media lead studio lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSokXGWRZxMl7iMeWTPmDYOVRX-ePRytyiJoBxmkGUEQmX-JfIWsso4cj6vNHf6qnCtGrs8xh1G0-L7aZ7ko3mTOic-ly0VGpZCft5X8RcOo-y3rYHKcRa9gBzbL27BD-5x8dn_GecW8cEew2f5fF-TdJ9A3WZXZCT5EO3RpL_tVx-6cMR0osf621CqlfLUKCiaEmgIGh6386s2dXzheKoctm2foS5r-FCJ8k8aQ9l3P9-cCYp8m2E" />
                  <div className="absolute bottom-3 left-3 bg-surface-container-lowest/90 backdrop-blur-sm px-2.5 py-1 rounded text-on-surface font-label-sm text-label-sm font-bold uppercase tracking-wider shadow-sm">
                    Trustee
                  </div>
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-1">
                    Toyin Ibitoye
                  </h3>
                  <span className="font-label-md text-label-md text-secondary font-semibold mb-space-xs">
                    Trustee
                  </span>
                  <p className="font-body-sm text-body-sm text-secondary leading-relaxed mt-auto">
                    Seasoned sports journalist and media strategist leading digital outreach and member affairs.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-space-md">
                <div className="flex items-center gap-space-sm text-on-surface">
                  <span className="material-symbols-outlined text-primary-container text-[24px]">
                    public
                  </span>
                  <div>
                    <span className="font-headline-sm text-headline-sm block">
                      Global Diaspora Representatives
                    </span>
                    <span className="font-body-sm text-body-sm text-secondary">
                      Connecting Gunners across continents
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-center lg:justify-end gap-space-sm">
                  <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container-high text-on-surface">
                    <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                    <span className="font-label-sm text-label-sm font-semibold">
                      Barr. Charles Ete
                    </span>
                    <span className="text-secondary font-body-sm text-body-sm">
                      · London
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container-high text-on-surface">
                    <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                    <span className="font-label-sm text-label-sm font-semibold">
                      Marian C. Nwachukwu
                    </span>
                    <span className="text-secondary font-body-sm text-body-sm">
                      · Dubai
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container-high text-on-surface">
                    <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                    <span className="font-label-sm text-label-sm font-semibold">
                      Gilbert Odior
                    </span>
                    <span className="text-secondary font-body-sm text-body-sm">
                      · Houston
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-space-xl md:py-24 bg-inverse-surface text-inverse-on-surface relative overflow-hidden">
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-primary-container/10 filter blur-3xl pointer-events-none"></div>
          <div className="absolute -left-24 -bottom-24 w-96 h-96 rounded-full bg-primary-container/10 filter blur-3xl pointer-events-none"></div>
          <div className="max-w-4xl mx-auto px-margin md:px-margin-desktop text-center relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-primary-container/20 text-on-primary flex items-center justify-center mb-space-md">
              <span className="material-symbols-outlined text-[24px]">
                shield
              </span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-surface-lowest tracking-tight mb-space-sm max-w-2xl">
              Be Part of the Family.
            </h2>
            <p className="font-body-lg text-body-lg text-secondary-fixed max-w-xl mx-auto mb-space-xl leading-relaxed">
              Join thousands of Gunners united worldwide in fellowship, matchday passion, and community impact.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-space-md w-full justify-center">
              <Link className="w-full sm:w-auto inline-flex items-center justify-center font-label-md text-label-md uppercase tracking-wider bg-primary-container text-on-primary px-8 py-3.5 rounded-lg shadow-md hover:bg-primary transition-colors" href="/register">
                Join the Club
              </Link>
              <a className="w-full sm:w-auto inline-flex items-center justify-center font-label-md text-label-md uppercase tracking-wider bg-transparent text-surface-lowest border-2 border-surface-lowest/80 px-8 py-3.5 rounded-lg hover:bg-surface-lowest/10 transition-colors" href="#">
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
