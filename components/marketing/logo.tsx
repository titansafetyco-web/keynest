import Link from "next/link";

export default function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="mktLogo">
      <img src="/logo/drklogols.webp" alt="KeyNest" />
    </Link>
  );
}
