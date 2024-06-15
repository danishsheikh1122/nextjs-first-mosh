import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import schema from "../schema";

interface Props {
  params: { id: string };
}

// interface PutData {
//   id: string;
//   name: string;
//   age: number;
//   country: string;
// }
// interface PostData {
//   id: string;
//   name: string;
//   age: number;
//   country: string;
// }

// const PutandPostData = z.object({
//   id: z.string().min(1, "Enter a valid ID"),
//   name: z.string().min(1, "Invalid name"),
//   age: z.number().min(0, "Enter a non-negative number"),
//   country: z.string().min(3, "Invalid country"),
// });
const data = [
  {
    id: "1",
    name: "Juan",
    age: 25,
    country: "Colombia",
  },
  {
    id: "2",
    name: "dian",
    age: 25,
    country: "Colombia",
  },
  {
    id: "2",
    name: "dian",
    age: 25,
    country: "Colombia",
  },
];

const fetchData = async (id: number) => {
  const data = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!data.ok)
    return NextResponse.json({ error: "user not found" }, { status: 404 });
  const res = await data.json();
  console.log(res);
  return res;
};

export async function GET(request: NextRequest, { params }: Props) {
  const id = parseInt(params.id, 10);
  const user = await prisma.users.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "user not found" }, { status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
}
export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validate the request body against the schema
  const validate = schema.safeParse(body);
  if (!validate.success) {
    return NextResponse.json(validate.error.errors, { status: 404 });
  }
  // Add validated body to data array
  data.push(body);
  return NextResponse.json(data, { status: 201 });
}
export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const id = parseInt(params.id, 10);
    const body = await request.json();
    const validate = schema.safeParse(body);
    if (!validate.success) {
      return NextResponse.json(validate.error.errors, { status: 404 });
    }
    // if (!body.name) return NextResponse.json({ error: "Invalid name" });
    // if (!body.age) return NextResponse.json({ error: "Invalid age" });
    // if (!body.country) return NextResponse.json({ error: "Invalid country" });
    console.log(body);
    const res = await prisma.users.update({
      where: {
        id: id,
      },
      data: {
        email: body.email,
        name: body.name,
        followers: body.followers,
      },
    });
    // const newBody = {
    //   ...res,
    //   name: body.name,
    //   age: body.age,
    //   address: {
    //     city: body.country,
    //   },
    // };
    return NextResponse.json(res, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "user not found" }, { status: 404 });
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  //   const res = await fetchData(id);

  // const toStore = data.filter((data) => {
  //   // const id = parseInt(id, 10);
  //   if (data.id == id) {
  //     return data;
  //   }
  // });
  // const newData = [...toStore];
  // console.log(newData);

  // return NextResponse.json(, { status: 200 });
  const id = parseInt(params.id, 10);
  const res = await prisma.users.delete({
    where: { id: id },
  });
  if (!res)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json(
    { message: "deleted user", data: res },
    { status: 200 }
  );
}
