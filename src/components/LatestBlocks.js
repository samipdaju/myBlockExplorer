import { Box, Text, HStack, VStack, Link, Divider } from "@chakra-ui/react";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";

import { Icon } from "@chakra-ui/react";
import { FaLink } from "react-icons/fa";
import React from "react";
import { useState, useEffect, useContext } from "react";
import { Web3Context } from "./Web3Context";
import { useQuery } from "react-query";

export default function LatestBlocks() {
  const { web3, handleNavigate } = useContext(Web3Context);

  const {
    status,
    data = [],
    error,
    isFetching,
  } = useQuery("posts", async () => {
    const blockNumber = await await web3.eth.getBlockNumber();
    const blocks = [];
    for (let i = blockNumber; i > 0; i--) {
      const block = await web3.eth.getBlock(i);
      blocks.push(block);
    }
    return blocks;
  });

  if (isFetching) {
    return <Box w="100%" h="100px"></Box>;
  }

  return (
    <Box w="50%" mb={10}>
      <Box w="100%" borderColor={"gray.300"} borderRadius={25} boxShadow="md">
        <Box bg="#21325B" borderTopRadius={25} align="center">
          <Text fontSize="20px" fontWeight={500} color="white" p={5}>
            Latest Blocks
          </Text>
        </Box>

        {data.slice(0, 5).map((item, index) => (
          <Box border="1px" borderColor="gray.200" py={2} px={2}>
            <HStack
              key={index}
              w={"100%"}
              spacing={15}
              justifyContent="space-between"
            >
              <HStack>
                <Box
                  bgColor="gray"
                  borderRadius={10}
                  py={4}
                  px={5}
                  opacity="30%"
                >
                  <Icon color="white" as={FaLink} />
                </Box>

                <VStack>
                  <Link
                    onClick={() => handleNavigate("Block Number", item.number)}
                    textDecoration="no-underline"
                    _hover={{
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    color="blue"
                  >
                    {"  "}
                    {item.number}
                  </Link>

                  <Text color="gray">
                    {new Date(item.timestamp * 1000).toTimeString().slice(0, 8)}
                  </Text>
                </VStack>
              </HStack>
              {/* This link will navigate to the latest transaction of the block */}
              <Link
                color="blue"
                onClick={() =>
                  handleNavigate(
                    "Transaction Hash",
                    item.transactions[item.transactions.length - 1]
                  )
                }
              >
                {" "}
                {item.transactions.length} Txns{" "}
              </Link>
              {/* <Box
                borderRadius={5}
                px={5}
                fontWeight="bold"
                border="1px solid"
                borderColor="gray.300"
                fontSize="12px"
              >
                {" "}
                ETH{" "}
              </Box> */}
            </HStack>
          </Box>
        ))}

        <VStack p={5}>
          {/* <Link
            onClick={() => handleNavigate("Block Details")}
            fontSize="20px"
            textDecoration="underline"
          >
            {" "}
            See all Blocks{" "}
          </Link> */}
        </VStack>
      </Box>
    </Box>
  );
}
