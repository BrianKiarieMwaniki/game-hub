import {
  Button,
  Heading,
  HStack,
  Image,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import { useGenres } from "../hooks";
import useGameQuery from "../store/store";
import getCroppedImageUrl from "./../services/image-url";

const GenreList = () => {
  const { data: genres, isLoading, error } = useGenres();
  const selectedGenreId = useGameQuery(s => s.gameQuery.genreId);
  const setSelectedGenreId = useGameQuery(s => s.setGenreId);

  if (error) null;

  if (isLoading) return <Spinner />;

  return (
    <>
      <Heading fontSize="2xl" marginBottom={3}>
        Genres
      </Heading>
      <List data-testid="genre-list">
        {genres?.map((genre) => (
          <ListItem
            key={genre.id}
            paddingY="5px"
            data-testid={`genre-item-${genre.id}`}
          >
            <HStack>
              <Image
                boxSize="34px"
                objectFit="cover"
                borderRadius={8}
                src={getCroppedImageUrl(genre.image_background)}
              />
              <Button
                whiteSpace="normal"
                textAlign="left"
                fontWeight={genre.id === selectedGenreId ? "bold" : "normal"}
                fontSize="lg"
                variant="link"
                onClick={() => setSelectedGenreId(genre.id)}
              >
                {genre.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenreList;
