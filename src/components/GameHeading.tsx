import { Heading } from "@chakra-ui/react";
import { GameQuery } from "../common.types";

interface Props {
  gameQuery: GameQuery;
}

const GameHeading = ({ gameQuery }: Props) => {
  const { platform, genre } = gameQuery;

  const heading = `${platform?.name || ''} ${genre?.name || ''} Games`;
  return <Heading as="h1" marginBottom={5} fontSize='5xl' data-testid='game-heading'>{heading}</Heading>;
};

export default GameHeading;
