import { getClient } from "../contentful-client";
import { TypeAlbumSkeleton } from "@vinyl-collection/types/album.types";

export const getCollection = async () => {
  const client = getClient();

  const collection = await client.getEntries<TypeAlbumSkeleton>({
    content_type: "album",
    "fields.location": "Collection",
  });

  return collection.items;
};
