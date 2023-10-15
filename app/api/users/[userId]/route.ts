import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const { values } = await req.json();

    if (!params.userId) {
      return new NextResponse("User id missing", { status: 400 });
    }

    const updatedUser = await db.user.update({
      where: {
        id: params.userId,
      },
      data: values,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log("[USER_ID_UPDATE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } },
) {
  try {
    if (!params.userId) {
      return new NextResponse("User id missing", { status: 400 });
    }

    const deletedUser = await db.user.delete({
      where: {
        id: params.userId,
      },
    });

    return NextResponse.json(deletedUser);
  } catch (error) {
    console.log("[USER_ID_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
