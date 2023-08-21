"use client";

import { ConnectKitButton } from "connectkit";
export default function Navbar() {
  return (
    <nav className="flex justify-between items-center w-full pt-8 px-16 pb-3">
      <p>Week 4 — Weekend Project</p>
      <ConnectKitButton />
    </nav>
  );
}
