import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export const POST = async (request: NextRequest) => {
  try {
    const { username, password, name, email } = await request.json();

    if (username === "" || password === "") {
      return NextResponse.json("Email and password are required");
    }

    const user = await db.user.findUnique({
      where: {
        username: username.toUpperCase(),
      },
    });

    const emailUser = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user || emailUser) {
      return NextResponse.json(
        {
          error: "User already exists",
        },
        { status: 401 }
      );
    }

    const hash = await bcryptjs.hash(password as string, 10);

    const newUser = await db.user.create({
      data: {
        username: username.toUpperCase(),
        password: hash,
        name: name,
        email: email,
      },
    });

    return NextResponse.json(newUser);
  } catch (e) {
    return NextResponse.json(undefined,{ status: 500 });
  }
};
