import { NodeNextResponse } from "next/dist/server/base-http/node";
import { NextRequest, NextResponse } from "next/server";

const data = [
  { h1: "All Users" },
  {
    name: "Juan",
    age: 25,
    country: "Colombia",
  },
  {
    name: "dian",
    age: 25,
    country: "Colombia",
  },
];
export function GET(request: NextRequest) {
  return NextResponse.json(data, { status: 200 });
}
interface Props {
  params: { id: number };
}
interface PostData {
  name: string;
  age: number;
  country: string;
}
export async function POST(request: NextRequest) {
  const body: PostData = await request.json();
  if (!body.name)
    return NextResponse.json({ error: "invalid name" }, { status: 404 });
  data.push(body);
  return NextResponse.json(data, { status: 201 });
}