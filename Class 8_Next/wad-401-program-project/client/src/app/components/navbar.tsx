import Link from "next/link";
import Logo from "./marugame-udon-logo"; // Import the SVG component

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-black text-white">
      <div>
        <Logo />
      </div>
      <ul className="flex gap-6 text-sm">
        <li></li>
        <li>
          <Link href="/" className="hover:text-red-500 transition-colors">
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
      </ul>
    </nav>
  );
}
