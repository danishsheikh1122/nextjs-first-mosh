import React from "react";
import UserTable from "./userTable";
import Link from 'next/link.js'
import { Suspense } from "react";
interface Props{
  searchParams: { sortOrder: string };
} 
const UserPage = ({searchParams: { sortOrder }}:Props) => {
  // console.log(sortOrder);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 px-[1rem]">User Page</h1>
      <Link href="users/newchildroute">
      <button className="btn btn-primary">Go To Create User </button>
      </Link>
    <Suspense fallback={
      <h1>  Loading ....</h1>

    }>
      <UserTable sortOrder={sortOrder}/>
    </Suspense>
    </div>
  );
};

export default UserPage;
