import { useEffect, useMemo, useState } from "react";

import { usePageContext } from "@vinyl-collection/context/page-context";
import { isDiscogsWantsInterface } from "@vinyl-collection/types/guards/discogs.guards";
import { isLink } from "@vinyl-collection/util/is-link";
import { isAlbumTypeWithReserved } from "@vinyl-collection/types/guards/wishlist.guards";

import { AlbumGridCard } from "./album-grid-card/album-grid-card";
import { AlbumListCard } from "./album-list-card/album-list-card";

import type { AlbumType } from "@vinyl-collection/types/discogs.types";
import type { ComponentProps, FC } from "react";
import type { AlbumOverview } from "../album-overview/album-overview";

type AlbumCardProps = {
  album: AlbumType;
  showFooter?: boolean;
} & Pick<ComponentProps<typeof AlbumOverview>, "variant">;

export const AlbumCard: FC<AlbumCardProps> = ({
  album,
  showFooter = true,
  variant = "grid",
}) => {
  const artistNames = useMemo(
    () =>
      album.basic_information.artists.map((artist) => artist.name).join(", "),
    [album.basic_information.artists]
  );

  const { labelReserved } = usePageContext();

  const link = useMemo(() => {
    if (isDiscogsWantsInterface(album)) {
      return isLink(album.notes) ? album.notes : undefined;
    }
  }, [album]);

  const [isReserved, setIsReserved] = useState<boolean>();

  useEffect(() => {
    if (isAlbumTypeWithReserved(album) && labelReserved) {
      setIsReserved(album.reserved);
    } else {
      setIsReserved(false);
    }
  }, [album, labelReserved]);

  return variant === "grid" ? (
    <AlbumGridCard
      album={album}
      artistNames={artistNames}
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
