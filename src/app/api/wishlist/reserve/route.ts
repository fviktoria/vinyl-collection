import { NextRequest, NextResponse } from "next/server";
import {
  setItemAsReserved,
  undoSetItemAsReserved,
} from "@vinyl-collection/util/wishlist";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    await setItemAsReserved({ id: body.id.toString(), email: body.email });
    return NextResponse.json(
      { message: "api.reserve.success" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ message: "api.reserve.error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  try {
    await undoSetItemAsReserved({
      id: body.id.toString(),
      email: body.email,
    });
    return NextResponse.json(
      { message: "api.reserve.undo-success" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "api.reserve.undo-error" },
      { status: 500 }
    );
  }
}
