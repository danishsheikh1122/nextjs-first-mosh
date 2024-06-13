import React from "react";
import Link from "next/link.js";

const NavBar = () => {
  return (
    <div className="h-[5rem] bg-slate-300 text-left text-lg gap-4">
      <Link className="px-[1rem]" href="/">Home</Link>
      <Link className="px-[1rem]" href="/products">Products</Link>
      <Link className="px-[1rem]" href="/users">Users</Link>
      <Link className="px-[1rem]" href="/admin">Admin</Link>
    </div>
  );
};

export default NavBar;
