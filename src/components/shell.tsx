"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import type { SocialProfile } from "@/db/schema";

type Props = {
  siteName: string;
  introHtml: string;
  social: SocialProfile[];
  children: ReactNode;
};

/** Sidebar on wide screens, slide-in menu on phones. */
export default function Shell({ siteName, introHtml, social, children }: Props) {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  return (
    <div className={`container ${open ? "is-open" : ""}`}>
      <div className="container__sidebar">
        <div className="sidebar">
          <h6 className="sidebar__title">
            <Link href="/">{siteName}</Link>
          </h6>
          <div className="sidebar__intro" dangerouslySetInnerHTML={{ __html: introHtml }} />
          <ul className="sidebar__menu">
            <li className={path === "/" || path.startsWith("/works") ? "is-active" : ""}>
              <Link href="/" onClick={() => setOpen(false)}>Home</Link>
            </li>
            <li className={path.startsWith("/about") ? "is-active" : ""}>
              <Link href="/about" onClick={() => setOpen(false)}>About</Link>
            </li>
          </ul>
          {social.length > 0 && (
            <p className="sidebar__social">
              {social.map((s) => (
                <a
                  key={s.type + s.url}
                  href={s.url}
                  target={s.type === "email" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.type}
                  className={`social social--${s.type}`}
                />
              ))}
            </p>
          )}
          <div className="sidebar__copyright">{`© ${new Date().getFullYear()}`}</div>
        </div>
      </div>
      <div className="container__body">
        <div className="container__mobile-header">
          <div className="mobile-header">
            <div className="mobile-header__menu">
              <button type="button" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((o) => !o)} />
            </div>
            <div className="mobile-header__logo">
              <Link href="/">{siteName}</Link>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
