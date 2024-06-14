import Link from "next/link.js";
import React from "react";
import {sort} from 'fast-sort' 
interface User {
  id: number;
  name: string;
  email: string;
}
interface Props{
  sortOrder:string;
}
const UserTable = async ({sortOrder}:Props) => {
  const data = await fetch("https://jsonplaceholder.typicode.com/users");
  const res: User[] = await data.json();

  const  sortedUsers=sort(res).asc(sortOrder==='email'?user=>user.email:user=>user.name);

  return ( 
    <div className="p-4">
      <table className="table w-full">
        <thead className="text-left">
          <tr>
            <th>
              <Link href="/users?sortOrder=name">Name</Link>
            </th>
            <th> 
              <Link href="/users?sortOrder=email">Email</Link>
            </th>
          </tr>
        </thead>
        <tbody className="w-full px-[5rem]">
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
