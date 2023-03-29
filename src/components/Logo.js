import { Box, VStack, Image, Circle, HStack, Text } from "@chakra-ui/react";

import React from "react";

import { useNavigate } from "react-router-dom";

export default function Logo() {
  const navigate = useNavigate();
  function handleNavigate() {
    navigate("/");
  }
  return (
    <Box>
      <HStack cursor={"pointer"} onClick={handleNavigate}>
        <Circle
          size={"40px"}
          bg="btn"
          // bgGradient=" linear-gradient(to left, #F77221, #A94B0C)"
        ></Circle>
        <Text color={"white"} fontWeight="bold" fontSize="24px">
          {" "}
          BlockExplorer
        </Text>
      </HStack>
    </Box>
  );
}
