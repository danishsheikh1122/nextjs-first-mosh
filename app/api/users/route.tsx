import { NextRequest, NextResponse } from 'next/server';
import sechma from './schema';
import prisma from '@/prisma/client'; // Adjust the import path to match your project structure
import schema from './schema';

export async function GET(request: NextRequest) {
  try {
    const users = await prisma.users.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: 'An error occurred while fetching users' }, { status: 500 });
  }
}

// interface PostData {
//   name: string;
//   age: number;
//   country: string;
// }

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const isValid=schema.safeParse(body);
    if (!isValid.success) {
      return NextResponse.json({ error:isValid.error.errors}, { status: 400 });
    }

    const newUser = await prisma.users.create({
      data: {
        name: body.name,
        email: `${body.name.toLowerCase()}@example.com`, // Example email creation logic
        followers: body.followers,
        isActive: true,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: 'An error occurred while creating user' }, { status: 500 });
  }
}


