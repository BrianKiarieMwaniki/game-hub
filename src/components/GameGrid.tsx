import { SimpleGrid, Text } from "@chakra-ui/react";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";

const GameGrid = () => {
  const { games, error } = useGames();

  if(error) return <Text>{error}</Text>

  if(games.length === 0) return <Text>No games found.</Text>
  
  return (
    <>      
      <SimpleGrid columns={{sm:1, md:2, lg:3, xl:4}} spacing={10} padding='10px'>
        {games.map((game) => (
          <GameCard key={game.id} game={game}/>
        ))}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
