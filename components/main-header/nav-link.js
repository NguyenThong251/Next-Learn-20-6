"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navlink({ href, children }) {
  const path = usePathname();
  return (
    <li>
      <Link
        href={href}
        className={
          path.startsWith(href)
            ? "hover:text-[#fc6120] text-[#fc6120] block font-semibold text-[15px]"
            : "hover:text-[#fc6120] block font-semibold text-[15px]"
        }
      >
        {children}
      </Link>
    </li>
  );
}
