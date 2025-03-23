import { useEffect, useMemo, useState } from "react";

import { usePageContext } from "@vinyl-collection/context/page-context";
import { isLink } from "@vinyl-collection/util/is-link";
import { isAlbumTypeWithReserved } from "@vinyl-collection/types/guards/wishlist.guards";

import { AlbumGridCard } from "./album-grid-card/album-grid-card";
import { AlbumListCard } from "./album-list-card/album-list-card";

import type { ComponentProps, FC } from "react";
import type { AlbumOverview } from "../album-overview/album-overview";
import { CfAlbumType } from "@vinyl-collection/types/album.types";

type AlbumCardProps = {
  album: CfAlbumType;
  showFooter?: boolean;
} & Pick<ComponentProps<typeof AlbumOverview>, "variant">;

export const AlbumCard: FC<AlbumCardProps> = ({
  album,
  showFooter = true,
  variant = "grid",
}) => {
  const { discogsRelease } = album.fields;
  const artistNames = useMemo(
    () => discogsRelease?.artists.map((artist) => artist.name).join(", "),
    [discogsRelease?.artists]
  );

  const { labelReserved } = usePageContext();

  const link = useMemo(() => {
    if (album.fields.shopUrl) {
      return isLink(album.fields.shopUrl) ? album.fields.shopUrl : undefined;
    }
  }, [album]);

  const [isReserved, setIsReserved] = useState<boolean>();

  useEffect(() => {
    if (isAlbumTypeWithReserved(album) && labelReserved) {
      setIsReserved(album.fields.reserved);
    } else {
      setIsReserved(false);
    }
  }, [album, labelReserved]);

  return variant === "grid" ? (
    <AlbumGridCard
      album={album}
      artistNames={artistNames ?? ""}
      isReserved={isReserved}
      link={link}
      showFooter={showFooter}
    />
  ) : (
    <AlbumListCard
      album={album}
      artistNames={artistNames}
      isReserved={isReserved}
      link={link}
      showFooter={showFooter}
    />
  );
};
