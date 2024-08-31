import { Heading } from "@chakra-ui/react";
import { GameQuery } from "../common.types";
import useGenres from "../hooks/useGenres";
import usePlatforms from "../hooks/usePlatforms";

interface Props {
  gameQuery: GameQuery;
}

const GameHeading = ({ gameQuery }: Props) => {
  const { platformId, genreId } = gameQuery;

  const {data: genres} =useGenres();
  const {data:platforms} = usePlatforms();

  const genreName = genres?.find(genre => genre.id === genreId)?.name;
  const platformName = platforms?.find(platform => platform.id === platformId)?.name;

  const heading = `${platformName || ''} ${genreName || ''} Games`;
  return <Heading as="h1" marginBottom={5} fontSize='5xl' data-testid='game-heading'>{heading}</Heading>;
};

export default GameHeading;
