import { Box, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const SideScrollingGrid = ({ children }: Props) => {
  return (
    <Box overflowX="auto" w="full" px={4}>
      <Flex gap={4}>{children}</Flex>
    </Box>
  );
};

export default SideScrollingGrid;
