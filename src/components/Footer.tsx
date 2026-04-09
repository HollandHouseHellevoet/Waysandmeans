import Link from "next/link";

const subdomains = [
  { name: "FAH", url: "https://fah.rojasreport.com" },
  { name: "AHA", url: "https://aha.rojasreport.com" },
  { name: "Academic", url: "https://academic.rojasreport.com" },
  { name: "HAC", url: "https://hac.rojasreport.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-rojas-border bg-rojas-bg-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex flex-col">
              <span className="font-serif text-lg text-rojas-text font-bold">
                The Rojas Report
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-rojas-accent font-sans">
                Healthcare Intelligence
              </span>
            </Link>
            <p className="mt-4 text-sm text-rojas-text-muted leading-relaxed">
              Data-driven investigations into the policies, monopolies, and
              market structures that shape 20% of U.S. GDP.
            </p>
          </div>

          <div>
            <h3 className="text-xs tracking-[0.15em] uppercase text-rojas-accent font-sans font-medium mb-4">
              Intelligence Dossiers
            </h3>
            <ul className="space-y-2">
              {subdomains.map((sub) => (
                <li key={sub.name}>
                  <a
                    href={sub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-rojas-text-secondary hover:text-rojas-accent transition-colors"
                  >
                    {sub.name} Reports
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs tracking-[0.15em] uppercase text-rojas-accent font-sans font-medium mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://read.rojasreport.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-rojas-text-secondary hover:text-rojas-accent transition-colors"
                >
                  Substack Newsletter
                </a>
              </li>
              <li>
                <a
                  href="https://rojasreport.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-rojas-text-secondary hover:text-rojas-accent transition-colors"
                >
                  Main Site
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-rojas-border space-y-3">
          <p className="text-[11px] text-rojas-text-muted text-center leading-relaxed max-w-2xl mx-auto">
            Voting data sourced from{" "}
            <a href="https://www.congress.gov" target="_blank" rel="noopener noreferrer" className="text-rojas-text-secondary hover:text-rojas-accent transition-colors">Congress.gov</a>.
            Campaign finance data based on FEC filings via{" "}
            <a href="https://www.opensecrets.org" target="_blank" rel="noopener noreferrer" className="text-rojas-text-secondary hover:text-rojas-accent transition-colors">OpenSecrets</a>.
            Member photos from the{" "}
            <a href="https://bioguide.congress.gov" target="_blank" rel="noopener noreferrer" className="text-rojas-text-secondary hover:text-rojas-accent transition-colors">Congressional Biographical Directory</a>.
          </p>
          <p className="text-xs text-rojas-text-muted text-center">
            &copy; {new Date().getFullYear()} The Rojas Report. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
