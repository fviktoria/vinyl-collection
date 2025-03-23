import { createClient } from "contentful";

import type { ContentfulClientApi } from "contentful";

export type MODIFIER = "WITHOUT_UNRESOLVABLE_LINKS";

let client: ContentfulClientApi<MODIFIER>;
let previewClient: ContentfulClientApi<MODIFIER>;

export const getClient = (preview?: boolean): ContentfulClientApi<MODIFIER> => {
  if (preview) {
    if (!previewClient) {
      previewClient = createClient({
        accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN as string,
        space: process.env.CONTENTFUL_SPACE_ID as string,
        host: "preview.contentful.com",
      }).withoutUnresolvableLinks;
    }

    return previewClient;
  }
  if (!client) {
    client = createClient({
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
      space: process.env.CONTENTFUL_SPACE_ID as string,
    }).withoutUnresolvableLinks;
  }
  return client;
};
