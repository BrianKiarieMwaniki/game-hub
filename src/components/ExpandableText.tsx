import { Button, Text } from "@chakra-ui/react";
import { useState } from "react";

const ExpandableText = ({ text }: { text: string }) => {
  const limit = 300;
  const [isExpanded, setExpanded] = useState(false);
  if (text?.length <= limit) return <Text>{text}</Text>;

  const showText = isExpanded ? text : text.substring(0, limit) + "...";

  return (
    <>
      <Text>
        {showText}
        <Button
          size="xs"
          marginLeft={1}
          colorScheme="yellow"
          fontWeight="bold"
          onClick={() => setExpanded(!isExpanded)}
        >
          {isExpanded ? "Show Less" : "Show More"}
        </Button>
      </Text>
    </>
  );
};

export default ExpandableText;
