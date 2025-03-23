import { HomePage } from "@vinyl-collection/components/pages/home";
import { getCollection } from "@vinyl-collection/util/contentful/get-collection";
import { getWishlist } from "@vinyl-collection/util/contentful/get-wishlist";

export default async function Home() {
  const collection = await getCollection();
  const wishlist = await getWishlist();

  return <HomePage collection={collection} wishlist={wishlist} />;
}
