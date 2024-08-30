import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (username === "" || password === "") {
      return NextResponse.json("Email and password are required");
    }

    return NextResponse.json({ username, password });
  } catch (e) {
    return NextResponse.json(e);
  }
}
