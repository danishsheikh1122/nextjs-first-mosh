import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
interface Props {
  params: { id: number };
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
    id: 1,
    name: "Juan",
    age: 25,
    country: "Colombia",
  },
  {
    id: 2,
    name: "dian",
    age: 25,
    country: "Colombia",
  },
  {
    id: 2,
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

export async function GET(request: NextRequest, { params: { id } }: Props) {
  const res = await fetchData(id);
  return NextResponse.json(res, { status: 200 });
}
export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validate the request body against the schema
  const validate = schema.safeParse(body);
  if(!validate.success){
    return NextResponse.json(validate.error.errors,{status: 404});
  }
  // Add validated body to data array
  data.push(body);
  return NextResponse.json(data, { status: 201 });
}
export async function PUT(request: NextRequest, { params: { id } }: Props) {
  const body = await request.json();
  const validate = schema.safeParse(body);
  if(!validate.success){
    return NextResponse.json(validate.error.errors,{status: 404});
  }
  // if (!body.name) return NextResponse.json({ error: "Invalid name" });
  // if (!body.age) return NextResponse.json({ error: "Invalid age" });
  // if (!body.country) return NextResponse.json({ error: "Invalid country" });
  console.log(body);
  const res = await fetchData(id);
  const newBody = {
    ...res,
    name: body.name,
    age: body.age,
    address: {
      city: body.country,
    },
  };
  return NextResponse.json(newBody, { status: 200 });
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  //   const res = await fetchData(id);

  const toStore = data.filter((data) => {
    if (data.id !== id) {
      return data;
    }
  });
  const newData = [...toStore];
  console.log(newData);

  return NextResponse.json(newData, { status: 200 });
}
