import { NextRequest, NextResponse } from "next/server";

//TODO: implement reservation feature with contentful
export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    console.log(body);
    // await setItemAsReserved({ id: body.id.toString(), email: body.email });
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
    console.log(body);
    // await undoSetItemAsReserved({
    //   id: body.id.toString(),
    //   email: body.email,
    // });
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
