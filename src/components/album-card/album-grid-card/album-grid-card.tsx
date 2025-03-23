import {
  Badge,
  Box,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

import { AlbumCardActions } from "../album-card-actions/album-card-actions";

import type { ComponentProps, FC } from "react";
import type { AlbumCard } from "../album-card";

type AlbumGridCardProps = Pick<
  ComponentProps<typeof AlbumCard>,
  "album" | "showFooter"
> & {
  isReserved?: boolean;
  artistNames?: string;
  link?: string;
};

export const AlbumGridCard: FC<AlbumGridCardProps> = ({
  album,
  isReserved,
  artistNames,
  showFooter,
  link,
}) => {
  const { discogsRelease: albumDetails } = album.fields;
  return (
    <Card opacity={isReserved ? 0.4 : 1} overflow="hidden">
      <Image
        src={albumDetails?.images[0]?.uri}
        aspectRatio={1}
        objectFit="cover"
        width="100%"
        alt={`${albumDetails?.title} Cover`}
      />
      <CardBody>
        <Stack spacing={3}>
          <Box>
            <Heading as="h3" size="sm">
              {albumDetails?.title}
            </Heading>
            <Text fontSize="md">{artistNames}</Text>
          </Box>
          {albumDetails?.genres && albumDetails?.genres.length > 0 && (
            <Box display="flex" gap={1}>
              {albumDetails?.genres.map((genre) => (
                <Badge key={`${albumDetails?.id}-${genre}`}>{genre}</Badge>
              ))}
            </Box>
          )}
        </Stack>
      </CardBody>
      {showFooter && (
        <CardFooter>
          <AlbumCardActions album={album} link={link} isReserved={isReserved} />
        </CardFooter>
      )}
    </Card>
  );
};
