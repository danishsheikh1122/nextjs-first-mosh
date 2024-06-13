import Link from "next/link";
import ProductCard from "./components/ProductCard";
import React from "react";

const page = async () => {
  return (
    <>
      <main>
        <h1 className="p-[1rem]">this is danish</h1>
        {/* this is called client side navigation */}
        <Link href="/users">go to users page</Link>
        <ProductCard></ProductCard>
      </main>
    </>
  );
};

export default page;
