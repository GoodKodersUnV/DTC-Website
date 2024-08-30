import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (username === "" || password === "") {
      return NextResponse.json("Email and password are required");
    }

    const user = await db.user.findUnique({
      where: {
        username: username.toUpperCase(),
      },
    });

    if(!user || !user.password) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        { status: 401 }
      );
    }

    const valid = await bcryptjs.compare(password as string, user.password);


    if(!valid) {
      return NextResponse.json(
        {
          error: "Invalid username or password",
        },
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      {
        error: "User not found",
      },
      { status: 401 }
    );
  }
}
