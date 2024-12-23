"use client";
import { signOut } from "next-auth/react";
import { FaSignOutAlt } from "react-icons/fa"; // Importing a logout icon from react-icons

export default function Logout() {

  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="mt-4 px-4 py-2 bg-orange-400 text-white rounded-md shadow-md flex items-center"
    >
      <FaSignOutAlt />
    </button>
  );
}