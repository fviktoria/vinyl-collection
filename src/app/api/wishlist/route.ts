import { getWishlistWithReserved } from "@vinyl-collection/util/get-wishlist-with-reserved";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const wishlist = await getWishlistWithReserved();
    return NextResponse.json(wishlist);
  } catch {
    return NextResponse.json({ message: "api.error" }, { status: 500 });
  }
}
