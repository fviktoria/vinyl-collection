import { getWishlistWithReserved } from "@vinyl-collection/util/get-wishlist-with-reserved";

import { WishlistPage } from "@vinyl-collection/components/pages/wishlist";

export default async function Wishlist({}) {
  const wishlist = await getWishlistWithReserved();

  if (!wishlist) return null;

  return <WishlistPage wishlist={wishlist} />;
}
