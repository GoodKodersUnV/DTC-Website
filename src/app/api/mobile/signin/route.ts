import { signin } from "@/actions/signin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (username === "" || password === "") {
      return NextResponse.json("Email and password are required");
    }

    const user = await signin(username, password);

    return NextResponse.json(user);
    
  } catch (e) {
    return NextResponse.json(e);
  }
}
