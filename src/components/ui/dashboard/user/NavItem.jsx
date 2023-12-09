import Link from "next/link";

export default function NavItem({ children, href }) {
  return (
    <Link
      className="flex justify-center items-center px-[20px] h-[40px] glass"
      href={href}>
      {children}
    </Link>
  );
}
