import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const GameCardContainer = ({ children }: Props) => {
  return (
    <Box
      borderRadius={10}
      overflow="hidden"
      width="100%"
      style={{cursor:"pointer"}}
      _hover={{ transform: "scale(1.03)",transition:'transform .15s ease-in' }}
    >
      {children}
    </Box>
  );
};

export default GameCardContainer;
