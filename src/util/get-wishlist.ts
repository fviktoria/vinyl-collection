import { discogsClient } from "./discogs-client";

import type { DiscogsWantsResponseInterface } from "@vinyl-collection/types/discogs.types";
import type { DiscogsClientPaginationInterface } from "@vinyl-collection/types/discogs-client.types";

const url = `/users/${process.env.DISCOGS_USER_NAME}/wants`;

export const getWishlist = (params: DiscogsClientPaginationInterface = {}) => {
  return discogsClient.get<DiscogsWantsResponseInterface>(url, {
    params,
    next: { tags: ["wishlist"] },
  });
};
