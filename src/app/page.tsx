import { getCollection } from "@vinyl-collection/util/get-collection";
import { getWishlist } from "@vinyl-collection/util/get-wishlist";

import { HomePage } from "@vinyl-collection/components/pages/home";

export default async function Home() {
  const collection = await getCollection({ per_page: 6 });
  const wishlist = await getWishlist({ per_page: 6 });

  return <HomePage collection={collection} wishlist={wishlist} />;
}
