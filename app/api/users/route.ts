import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    const users = await db.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.log("[USERS_GET]:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request, res: Response) {
  try {
    const { values } = await req.json();
    const { name, email, gender, status } = values;

    if (!name || !email || !gender || !status) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const newUser = await db.user.create({
      data: values,
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.log("[USERS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
