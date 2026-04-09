"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-rojas-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl text-rojas-text font-bold tracking-tight">
              The Rojas Report
            </span>
            <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-rojas-accent font-sans font-medium">
              Healthcare Intelligence
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm tracking-[0.1em] uppercase text-rojas-text-secondary hover:text-rojas-accent transition-colors font-sans"
            >
              Committee
            </Link>
            <a
              href="https://read.rojasreport.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm tracking-[0.1em] uppercase text-rojas-text-secondary hover:text-rojas-accent transition-colors font-sans"
            >
              Substack
            </a>
            <a
              href="https://rojasreport.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm tracking-[0.1em] uppercase text-rojas-text-secondary hover:text-rojas-accent transition-colors font-sans"
            >
              Main Site
            </a>
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-rojas-text-secondary hover:text-rojas-text"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-rojas-border bg-rojas-card">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="block text-sm tracking-[0.1em] uppercase text-rojas-text-secondary hover:text-rojas-accent transition-colors font-sans"
            >
              Committee
            </Link>
            <a
              href="https://read.rojasreport.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm tracking-[0.1em] uppercase text-rojas-text-secondary hover:text-rojas-accent transition-colors font-sans"
            >
              Substack
            </a>
            <a
              href="https://rojasreport.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm tracking-[0.1em] uppercase text-rojas-text-secondary hover:text-rojas-accent transition-colors font-sans"
            >
              Main Site
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
