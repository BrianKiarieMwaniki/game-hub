import { Card, CardBody, Heading, HStack, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Game } from "../entities/Game";
import getCroppedImageUrl from "./../services/image-url";
import CriticScore from "./CriticScore";
import Emoji from "./Emoji";
import PlatformIconList from "./PlatformIconList";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/games/${game.slug}`)}
      data-testid="game-card"
    >
      <Image src={getCroppedImageUrl(game.background_image)} />
      <CardBody>
        <HStack justifyContent="space-between" marginBottom={3}>
          <PlatformIconList
            platforms={game.parent_platforms.map((p) => p.platform)}
          />
          <CriticScore score={game.metacritic} />
        </HStack>
        <Heading fontSize="2xl">
          {game.name}
          <Emoji rating={game.rating_top} />
        </Heading>
      </CardBody>
    </Card>
  );
};

export default GameCard;
