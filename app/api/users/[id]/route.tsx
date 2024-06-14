import { NextRequest, NextResponse } from 'next/server';
interface User {
  id:number,
  name:string,
  email:string,
}
interface Props {
  params: { id: string };
}
export async function GET(request: NextRequest, { params: { id } }: Props) {
  // console.log(id)
  const data = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if(!data.ok) return NextResponse.json({error:"user not found"},{"status":404})
  const res: User[] = await data.json();
  // console.log(res);
  return NextResponse.json(res);
  
}








