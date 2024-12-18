import Link from "next/link";
import Logo from "./marugame-udon-logo"; // Import the SVG component
import { SignOutButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-black text-white">
      <div>
        <Logo />
      </div>
      <ul className="flex gap-6 text-sm">
        <li></li>
        <li>
          <Link
            href="/schedules"
            className="hover:text-red-500 transition-colors"
          >
            SCHEDULES
          </Link>
        </li>
        <li>
          <Link
            href="/stations"
            className="hover:text-red-500 transition-colors"
          >
            STATIONS
          </Link>
        </li>
        <li>
          <Link
            href="/employees"
            className="hover:text-red-500 transition-colors"
          >
            EMPLOYEES
          </Link>
        </li>
        <li>
          <Link href="/shifts" className="hover:text-red-500 transition-colors">
            SHIFTS
          </Link>
        </li>
        <li>
          <SignOutButton>
            <button className="px-4 py-2 flex justify-center rounded-full  border-2 hover:bg-stone-800/90 text-white font-semibold">
              Sign Out
            </button>
          </SignOutButton>
        </li>
      </ul>
    </nav>
  );
}
