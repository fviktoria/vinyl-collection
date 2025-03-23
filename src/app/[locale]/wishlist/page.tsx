import { WishlistPage } from "@vinyl-collection/components/pages/wishlist";
import { getWishlist } from "@vinyl-collection/util/contentful/get-wishlist";

export default async function Wishlist({}) {
  const wishlist = await getWishlist();

  if (!wishlist) return null;

  return <WishlistPage wishlist={wishlist} />;
}
