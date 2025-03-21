import { Box } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { getCollection } from "@vinyl-collection/util/get-collection";
import { AlbumOverview } from "@vinyl-collection/components/album-overview/album-overview";
import { Layout } from "@vinyl-collection/components/layout/layout";

import type {
  AlbumType,
  DiscogsReleasesResponseInterface,
} from "@vinyl-collection/types/discogs.types";
import type { InferGetStaticPropsType, GetStaticProps } from "next";

export default function Collection({
  collection,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();

  return (
    <Layout showBackButton>
      <Box as="section">
        <AlbumOverview
          heading={t("collection.title")}
          albums={collection?.releases as AlbumType[]}
          showFooter={false}
          showCount
        />
      </Box>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<{
  collection: DiscogsReleasesResponseInterface;
}> = async ({ locale = "en" }) => {
  const collection = await getCollection();

  return {
    props: {
      collection,

      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
