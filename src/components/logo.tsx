import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`inline-flex shrink-0 ${className}`}>
      <img
        src="/logo.png"
        alt="The Polished Piggy"
        className="h-12 w-12 rounded-full object-cover sm:h-14 sm:w-14"
      />
    </Link>
  );
}
