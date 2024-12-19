import Logo from "@/components/Logo";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-[#1A1A1A] p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <h1 className="text-xl font-medium">撲克筆記本</h1>
        </Link>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-emerald-400 transition-colors">
            會員
          </Link>
        </div>
      </div>
    </nav>
  );
} 