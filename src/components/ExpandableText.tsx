import React, { useState } from "react";
import { Button, Text } from "@chakra-ui/react";

interface Props {
  children: string;
  limit?: number;
}

const ExpandableText = ({ children, limit = 500 }: Props) => {
  const [expanded, setExpanded] = useState(false);

  if (!children) return null;

  if (children.length <= limit) return <Text>{children}</Text>;

  const summary = expanded
    ? children
    : children.substring(0, limit - 3) + "...";

  return (
    <Text>
      {summary}
      <Button
        size="xs"
        marginLeft={2}
        colorScheme="gray"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Show Less" : "Read More"}
      </Button>
    </Text>
  );
};

export default ExpandableText;
