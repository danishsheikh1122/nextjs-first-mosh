import { NextRequest, NextResponse } from "next/server";
import schema from "./schema"; // Make sure your schema is correctly imported
import { resourceUsage } from "process";

const Data = [
  {
    id: 0,
    name: "Mango",
    price: 29.99,
  },
  {
    id: 1,
    name: "Apple",
    price: 49.99,
  },
  {
    id: 2,
    name: "Orange",
    price: 19.99,
  },
  {
    id: 3,
    name: "Pineapple",
    price: 99.99,
  },
  {
    id: 4,
    name: "Grapes",
    price: 5.99,
  },
];

interface Props {
  params: { id: number };
}

export function GET(request: NextRequest) {
  let isValid = true;

  Data.forEach((product) => {
    try {
      schema.parse(product);
    } catch (error) {
      isValid = false;
      return;
    }
  });

  if (!isValid) {
    return NextResponse.json(
      {
        error: "Validation failed for one or more products.",
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json(
    {
      message: "All products are valid.",
      data: Data,
    },
    {
      status: 200,
    }
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validate = schema.safeParse(body);

    if (!validate.success) {
      return NextResponse.json(
        { error: validate.error.errors },
        { status: 400 }
      );
    }

    Data.push(body);

    return NextResponse.json(
      {
        message: "Product added successfully",
        data: Data,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function PUT(request: NextRequest, { params: { id } }: Props) {
  try {
    const body = await request.json();
    const validate = schema.safeParse(body);
    if (!validate.success)
      return NextResponse.json(
        { error: validate.error.errors },
        { status: 400 }
      );
    const index = Data.filter((item) => item.id == id);
    Data[id].name = body.name;
    Data[id].price = body.price;
    console.log(index);
    return NextResponse.json(
      { message: "updated user", data: Data },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  try {
    const index = Data.findIndex((item) => item.id == id);
    if (index > Data.length)
      return NextResponse.json({ error: "Product not found" }, { status: 400 });

    Data.splice(index, 1);
    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
