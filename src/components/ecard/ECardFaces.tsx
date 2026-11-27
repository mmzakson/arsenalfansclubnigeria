import { QRCodeSVG } from "qrcode.react";
import { CREST_URL, club } from "@/lib/config";
import type { CardData } from "@/lib/cardTypes";

const faceBase = "absolute inset-0 w-full h-full rounded-[22px] overflow-hidden flex flex-col justify-between p-5 sm:p-7 select-none";

export function CardFront({ card, className = "" }: { card: CardData; className?: string }) {
  return (
    <div
      className={`${faceBase} bg-security-pattern border border-amber-300/70 shadow-card-luxe shadow-card-glow ${className}`}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.045] overflow-hidden">
        <img alt="" className="w-[480px] h-[480px] object-contain scale-125" src={CREST_URL} crossOrigin="anonymous" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-arsenal-red via-arsenal-gold to-naija-green"></div>

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-center space-x-3.5">
          <div className="p-1 rounded-full bg-white/90 shadow-sm border border-amber-200">
            <img alt="Official Crest" className="w-12 h-12 sm:w-14 sm:h-14 object-contain" src={CREST_URL} crossOrigin="anonymous" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-extrabold tracking-tight text-slate-900 font-display leading-tight uppercase">
              {club.longName}
            </h3>
            <p className="text-[10px] sm:text-[11px] tracking-[0.18em] font-semibold text-arsenal-red uppercase">Official Membership Card</p>
            <p className="text-[9px] text-slate-400 font-medium tracking-wider">ONE CLUB • ONE FAMILY</p>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-1.5">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-6 rounded-md hologram-chip border border-amber-500/50 flex flex-col justify-around p-0.5 shadow-sm">
              <div className="w-full h-px bg-amber-900/30"></div>
              <div className="w-3/4 h-px bg-amber-900/30 mx-auto"></div>
              <div className="w-full h-px bg-amber-900/30"></div>
            </div>
            <span className="px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-bold tracking-wider uppercase bg-gradient-to-r from-amber-100 to-amber-200/90 text-amber-900 border border-amber-300 shadow-sm">
              {card.tier}
            </span>
          </div>
          <span className="text-[9px] font-mono font-semibold text-slate-500 tracking-wider">SEASON {card.season}</span>
        </div>
      </div>

      <div className="relative z-10 w-full my-1 sm:my-2">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
        <div className="h-0.5 w-24 bg-gradient-to-r from-arsenal-red to-arsenal-gold mx-auto -mt-[1px]"></div>
      </div>

      {/* Member details */}
      <div className="relative z-10 grid grid-cols-12 gap-4 items-center my-auto">
        <div className="col-span-4 sm:col-span-3 flex justify-start">
          <div className="relative">
            <div className="w-24 h-[7.5rem] sm:w-28 sm:h-36 rounded-xl overflow-hidden p-1 bg-gradient-to-b from-amber-300 via-white to-arsenal-red shadow-md">
              {card.photoUrl ? (
                <img alt={`${card.fullName} - official member photo`} className="w-full h-full object-cover rounded-lg" src={card.photoUrl} />
              ) : (
                <div className="w-full h-full rounded-lg bg-arsenal-navy flex items-center justify-center text-white font-display font-bold text-3xl tracking-wider">
                  {card.initials}
                </div>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white p-1 rounded-full border-2 border-white shadow-md flex items-center justify-center" title="Officially Verified Gunner Member">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="col-span-8 sm:col-span-9 pl-1 sm:pl-3 space-y-2 min-w-0">
          <div>
            <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-slate-400 uppercase">MEMBER NAME</span>
            <h4 className="text-base sm:text-xl font-extrabold text-[#0B131F] font-display tracking-tight leading-tight mt-0.5 uppercase break-words">
              {card.fullName}
            </h4>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <div>
              <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-slate-400 uppercase">MEMBERSHIP ID</span>
              <p className="font-mono text-xs sm:text-sm font-bold text-arsenal-red tracking-wider mt-0.5">{card.membershipNumber}</p>
            </div>
            <div>
              <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-slate-400 uppercase">CATEGORY</span>
              <p className="text-xs sm:text-sm font-bold text-slate-800 font-display mt-0.5">{card.category}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-0.5">
            <div>
              <span className="text-[8px] sm:text-[9px] font-bold tracking-widest text-slate-400 uppercase">ISSUE DATE</span>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-700">{card.issueDate}</p>
            </div>
            <div>
              <span className="text-[8px] sm:text-[9px] font-bold tracking-widest text-slate-400 uppercase">VALID THRU</span>
              <p className="text-[11px] sm:text-xs font-bold text-emerald-700">{card.validThru}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 pt-2 border-t border-slate-200/90 flex items-end justify-between">
        <div className="min-w-0">
          <div className="flex items-center space-x-1.5">
            <span className="inline-block w-2.5 h-1 bg-naija-green rounded-sm"></span>
            <span className="inline-block w-2.5 h-1 bg-white border border-slate-300 rounded-sm"></span>
            <span className="inline-block w-2.5 h-1 bg-naija-green rounded-sm"></span>
            <span className="text-[9px] font-bold tracking-wider text-slate-500 uppercase ml-1 truncate">{card.chapter}</span>
          </div>
          <p className="text-xs sm:text-sm font-extrabold tracking-wider text-arsenal-red font-display mt-0.5">
            GUNNERS FOR LIFE <span className="text-slate-400 font-normal">|</span> VICTORIA CONCORDIA CRESCIT
          </p>
        </div>
        <div className="text-right flex flex-col items-end shrink-0 ml-2">
          <div className="flex items-center gap-0.5 mb-1" title="Digital verification barcode">
            {[1, 0.5, 1.5, 0.5, 1, 2, 0.5, 1, 1.5, 0.5].map((w, i) => (
              <span key={i} className="barcode-line" style={{ width: `${w * 4}px` }}></span>
            ))}
          </div>
          <span className="text-[8px] font-mono text-slate-400 tracking-wider">SCAN FOR VALIDATION</span>
        </div>
      </div>
    </div>
  );
}

export function CardBack({ card, className = "" }: { card: CardData; className?: string }) {
  const short = `${card.stamp.slice(0, 4)}...${card.stamp.slice(-4)}`;
  return (
    <div className={`${faceBase} bg-slate-900 border border-slate-700 text-white shadow-card-luxe ${className}`}>
      <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
        <img alt="" className="w-[380px] h-[380px] object-contain invert" src={CREST_URL} crossOrigin="anonymous" />
      </div>
      <div className="relative z-10 flex items-center justify-between border-b border-slate-700/80 pb-3">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-red-600"></span>
          <span className="text-xs font-mono font-bold tracking-wider text-slate-300">SECURITY ACCESS ENCRYPTED</span>
        </div>
        <span className="text-[10px] font-mono text-amber-400 font-medium">HMAC-256: {short}</span>
      </div>
      <div className="relative z-10 my-2">
        <div className="w-full h-9 bg-slate-800 rounded flex items-center px-4 justify-between border border-slate-700">
          <span className="text-[9px] font-mono text-slate-400">AUTHORIZED SIGNATURE / NOT TRANSFERABLE</span>
          <span className="font-display italic text-amber-200 text-sm tracking-widest font-bold truncate ml-2">{card.fullName}</span>
        </div>
      </div>
      <div className="relative z-10 grid grid-cols-12 gap-3 text-[9px] sm:text-[10px] text-slate-300 leading-relaxed">
        <div className="col-span-8 space-y-1.5">
          <p className="font-medium text-slate-300">
            This digital credentials pass is issued by <strong className="text-white font-semibold">{club.longName}</strong>. It remains the
            property of the official supporters club and certifies active membership for match screenings and club events.
          </p>
          <p className="text-slate-400 text-[8px] sm:text-[9px]">
            Membership desk: {club.email} | WhatsApp {club.whatsappDisplay}
          </p>
        </div>
        <div className="col-span-4 flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-white p-1 rounded-lg shadow-sm flex items-center justify-center">
            <QRCodeSVG value={card.verifyUrl} size={72} level="M" />
          </div>
          <span className="text-[8px] font-mono text-slate-400 mt-1">VERIFY ONLINE</span>
        </div>
      </div>
      <div className="relative z-10 pt-2 border-t border-slate-800 flex justify-between items-center text-[9px] text-slate-400 font-mono">
        <span>{card.membershipNumber}</span>
        <span className="text-arsenal-gold font-bold">NORTH LONDON IS RED</span>
      </div>
    </div>
  );
}
