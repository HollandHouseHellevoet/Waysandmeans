import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <span className="font-serif text-6xl text-rojas-accent font-bold">
        404
      </span>
      <h1 className="mt-4 font-serif text-2xl text-rojas-text">
        Page Not Found
      </h1>
      <p className="mt-2 text-rojas-text-secondary text-center">
        The member or page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-rojas-accent text-white text-sm tracking-[0.1em] uppercase font-sans font-medium hover:bg-rojas-accent-hover transition-colors"
      >
        Back to Committee
      </Link>
    </div>
  );
}
