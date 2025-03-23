import { getClient } from "../contentful-client";
import { TypeAlbumSkeleton } from "@vinyl-collection/types/album.types";

export const getWishlist = async () => {
  const client = getClient();

  const wishlist = await client.getEntries<TypeAlbumSkeleton>({
    content_type: "album",
    "fields.location": "Wishlist",
  });

  return wishlist.items;
};
