"use client";

import { Box } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

import { AlbumOverview } from "@vinyl-collection/components/album-overview/album-overview";
import { Layout } from "@vinyl-collection/components/layout/layout";

import type {
  AlbumType,
  DiscogsReleasesResponseInterface,
} from "@vinyl-collection/types/discogs.types";
import { FC } from "react";

type CollectionPageProps = {
  collection: DiscogsReleasesResponseInterface;
};

export const CollectionPage: FC<CollectionPageProps> = ({ collection }) => {
  const t = useTranslations();

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
};
