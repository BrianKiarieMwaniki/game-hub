import { Heading, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useGame } from "../hooks";
import ExpandableText from "../components/ExpandableText";
import DefinitionItem from "../components/DefinitionItem";
import { CriticScore } from "../components";
import GameAttributes from "../components/GameAttributes";

const GameDetailPage = () => {
  const { slug } = useParams();
  const gameSlug = slug ?? undefined;
  const { data: game, isLoading, error } = useGame(gameSlug);

  if (isLoading) return <Spinner />;

  if (error || !game) throw error;

  return (
    <>
      <Heading>{game.name}</Heading>
      <ExpandableText text={game.description_raw} />
      <GameAttributes game={game} />
    </>
  );
};

export default GameDetailPage;
