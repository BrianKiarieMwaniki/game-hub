import { Heading } from "@chakra-ui/react";
import { GameQuery, Genre, Platform } from "../common.types";
import { useGenres, useLookup, usePlatforms } from "../hooks";

interface Props {
  gameQuery: GameQuery;
}

const GameHeading = ({ gameQuery }: Props) => {
  const { platformId, genreId } = gameQuery;

  const { data: genres } = useGenres();
  const { data: platforms } = usePlatforms();

  const { name: genreName } = useLookup<Genre>(genres, genreId);
  const { name: platformName } = useLookup<Platform>(platforms, platformId);

  const heading = `${platformName || ""} ${genreName || ""} Games`;
  return (
    <Heading as="h1" marginBottom={5} fontSize="5xl" data-testid="game-heading">
      {heading}
    </Heading>
  );
};

export default GameHeading;
