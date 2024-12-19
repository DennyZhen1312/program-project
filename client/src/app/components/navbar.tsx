import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import Logo from "./marugame-udon-logo"; // Import the SVG component
import { Notification } from "./notification";

const LINKS = [
  { href: "/schedules", text: "SCHEDULES" },
  { href: "/stations", text: "STATIONS" },
  { href: "/employees", text: "EMPLOYEES" },
  { href: "/shifts", text: "SHIFTS" }
];

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-black text-white">
      <div>
        <Logo />
      </div>
      <div className="flex gap-6 items-center">
        <ul className="flex gap-6 text-sm">
          {LINKS.map(({ href, text }, index) => (
            <li key={`${href}-${index}`}>
              <Link
                href={href}
                className="hover:text-red-500 transition-colors"
              >
                {text}
              </Link>
            </li>
          ))}
        </ul>

        <Notification />

        <SignOutButton>
          <button className="px-4 py-2 flex justify-center rounded-full  border-2 hover:bg-stone-800/90 text-white font-semibold">
            Sign Out
          </button>
        </SignOutButton>
      </div>
    </nav>
  );
}
