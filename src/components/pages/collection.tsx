"use client";

import { Box } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

import { AlbumOverview } from "@vinyl-collection/components/album-overview/album-overview";
import { Layout } from "@vinyl-collection/components/layout/layout";

import { FC } from "react";
import { CfAlbumType } from "@vinyl-collection/types/album.types";

type CollectionPageProps = {
  collection: CfAlbumType[];
};

export const CollectionPage: FC<CollectionPageProps> = ({ collection }) => {
  const t = useTranslations();

  return (
    <Layout showBackButton>
      <Box as="section">
        <AlbumOverview
          heading={t("collection.title")}
          albums={collection}
          showFooter={false}
          showCount
        />
      </Box>
    </Layout>
  );
};
