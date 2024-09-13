import { Heading } from "@chakra-ui/react";
import { Genre } from "../Genre";
import { Platform } from "../Platform";
import { useGenres, useLookup, usePlatforms } from "../hooks";
import useGameQuery from "../store/store";

const GameHeading = () => {
  const { data: genres } = useGenres();
  const { data: platforms } = usePlatforms();

  const selectedGenreId = useGameQuery((s) => s.gameQuery.genreId);
  const selectedPlatformId = useGameQuery((s) => s.gameQuery.platformId);

  const { name: genreName } = useLookup<Genre>(genres, selectedGenreId);
  const { name: platformName } = useLookup<Platform>(
    platforms,
    selectedPlatformId
  );

  const heading = `${platformName || ""} ${genreName || ""} Games`;
  return (
    <Heading as="h1" marginBottom={5} fontSize="5xl" data-testid="game-heading">
      {heading}
    </Heading>
  );
};

export default GameHeading;
