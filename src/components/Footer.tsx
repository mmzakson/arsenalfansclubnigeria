import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low mt-auto">
      <div className="max-w-[1200px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-xl flex flex-col gap-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
          <div className="flex flex-col gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <span className="font-headline-sm text-headline-sm uppercase tracking-tight text-on-surface font-bold">
                ArsenalFansClubNigeria
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs">
              The independent home for arsenal fans in Nigeria and beyond.
            </p>
          </div>
          <div className="flex flex-col gap-space-sm">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold">
              Explore
            </span>
            <div className="flex flex-col gap-space-xs">
              <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">
                News
              </a>
              <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">
                Community
              </a>
              <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">
                Donate
              </a>
              <Link className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="/about">
                About
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-space-sm">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold">
              Legal & Info
            </span>
            <div className="flex flex-col gap-space-xs">
              <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">
                Privacy Policy
              </a>
              <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">
                Terms of Use
              </a>
              <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">
                Code of Conduct
              </a>
              <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">
                Contact
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-space-sm">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold">
              Follow & Engage
            </span>
            <div className="flex items-center gap-space-sm">
              <a className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" href="https://www.instagram.com/arsenalfansclubnigeria?utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="1.75" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" href="https://tiktok.com/@arsenal.fans.clubnigeria" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V8.92a6.34 6.34 0 0 0-.79-.05A6.34 6.34 0 0 0 3 15.21a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.06a8.16 8.16 0 0 0 4.91 1.63v-3.5a4.77 4.77 0 0 1-1-.5z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="pt-space-md border-t border-surface-variant/40 flex flex-col md:flex-row items-center justify-between gap-space-sm">
          <p className="font-body-sm text-body-sm text-on-surface-variant text-center md:text-left">
            © 2026 ArsenalFansClubNigeria. An independent fan community.
          </p>
        </div>
      </div>
    </footer>
  );
}
