import { getCollection } from "@vinyl-collection/util/get-collection";

import { CollectionPage } from "@vinyl-collection/components/pages/collection";

export default async function Collection() {
  const collection = await getCollection();
  return <CollectionPage collection={collection} />;
}
