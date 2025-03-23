import {
  Badge,
  Box,
  Card,
  CardBody,
  Flex,
  Grid,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

import { AlbumCardActions } from "../album-card-actions/album-card-actions";

import type { AlbumGridCard } from "../album-grid-card/album-grid-card";
import type { ComponentProps, FC } from "react";

export const AlbumListCard: FC<ComponentProps<typeof AlbumGridCard>> = ({
  album,
  isReserved,
  artistNames,
  showFooter,
  link,
}) => {
  const { discogsRelease: albumDetails } = album.fields;
  return (
    <Card opacity={isReserved ? 0.4 : 1}>
      <CardBody>
        <Flex
          gap={{ base: 0, md: 3 }}
          flexDirection={{ base: "column", md: "row" }}
          justifyContent={{ md: "space-between" }}
          alignItems={{ md: "center" }}
        >
          <Grid gap={3} gridTemplateColumns="5rem auto">
            <Box>
              <Image
                src={albumDetails?.images[0]?.uri}
                aspectRatio={1}
                objectFit="cover"
                width="100%"
                alt={`${albumDetails?.title} Cover`}
              />
            </Box>
            <Stack>
              <Box>
                <Heading as="h3" size="sm">
                  {albumDetails?.title}
                </Heading>
                <Text fontSize="md">{artistNames}</Text>
              </Box>

              {albumDetails?.genres && albumDetails?.genres.length > 0 && (
                <Flex gap={1} wrap="wrap">
                  {albumDetails.genres.map((genre) => (
                    <Badge key={`${albumDetails.id}-${genre}`}>{genre}</Badge>
                  ))}
                </Flex>
              )}
            </Stack>
          </Grid>
          <Box
            width={{
              base: "100%",
              md: "auto",
            }}
          >
            {showFooter && (
              <AlbumCardActions
                album={album}
                link={link}
                isReserved={isReserved}
              />
            )}
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
};
