"use client";
import { signOut } from "next-auth/react";
import { FaSignOutAlt } from "react-icons/fa"; // Importing a logout icon from react-icons

export function Logout() {

  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="mt-4 px-4 py-2 shadow-md flex items-center dark:bg-[#fb923c] dark:hover:bg-[#f59f0b] bg-[#6C63FF] text-white rounded-lg hover:bg-[#5953e1] transition-colors"
    >
      <FaSignOutAlt />
    </button>
  );
}