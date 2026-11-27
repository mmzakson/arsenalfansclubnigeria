"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LOGO =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBO6n1hRrU5T-q3pGzGxI0tI8-oRBqAcD2WSokLceTxMqWrg2UyT_C0J2Gl3ayWPwdIt_vNp6-kPHhS7XrljbJw9I2V2k2isgZIB5QTwAnhUv1tXS17djXrwnd3bbuljE6v9cgk346hC5YJu_xvUzYzVSit6a7ljwQzigOJp69x-XjEUx7r05AvLb6ddnGzLXELfU2mrp8oS_YV6owWzgPDjpHqXzJmJf8C8UF-r0fbcpeEBsBExFBM";

// News / Community / Donate pages are not built yet, so they stay placeholders ("#").
const NAV = [
  { label: "News", href: "#" },
  { label: "Community", href: "#" },
  { label: "Donate", href: "#" },
  { label: "About", href: "/about" },
];

const base =
  "font-label-md text-label-md uppercase tracking-wider transition-colors";
const idle = "text-on-surface-variant hover:text-on-surface";
const active =
  "bg-surface-container-high text-on-surface font-semibold rounded-lg px-space-md py-space-xs";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-7xl mx-auto px-margin md:px-margin-desktop flex items-center justify-between">
        <Link href="/" className="flex items-center gap-space-sm group">
          <img
            src={LOGO}
            alt="Arsenal Fans Club Nigeria Logo"
            className="w-20 h-20 rounded-full object-contain shrink-0 bg-transparent"
          />
          <div className="flex flex-col justify-center">
            <span className="font-headline-md text-headline-md tracking-tight text-on-surface group-hover:text-primary transition-colors leading-tight">
              ArsenalFansClubNigeria
            </span>
            <span className="text-[11px] font-label-sm uppercase tracking-wider text-on-surface-variant font-medium">
              Motto : One Club, One Family
            </span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-space-lg">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`${base} ${pathname === item.href ? active : idle}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-space-md">
          <a
            href="#"
            className="font-label-md text-label-md px-space-md py-space-sm text-secondary hover:text-on-surface transition-colors"
          >
            Log in
          </a>
          <Link
            href="/register"
            className="inline-flex items-center justify-center font-label-md text-label-md uppercase tracking-wider bg-primary-container text-on-primary px-space-lg py-space-sm rounded-lg hover:bg-primary transition-colors shadow-sm"
          >
            Join Now
          </Link>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ml-space-xs">
            <span className="material-symbols-outlined text-on-primary text-[18px]">
              person
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
