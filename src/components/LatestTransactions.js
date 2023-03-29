import { useState, useEffect, useContext } from "react";
import { Web3Context } from "./Web3Context";
import {
  Box,
  Text,
  HStack,
  VStack,
  Link,
  Flex,
  Divider,
} from "@chakra-ui/react";
import Web3 from "web3";
import { Icon } from "@chakra-ui/react";
import { FaBook } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

export default function LatestTransactions() {
  const { web3, handleNavigate } = useContext(Web3Context);

  const navigate = useNavigate();

  const {
    status,
    data = [],
    error,
    isFetching,
  } = useQuery("post", async () => {
    const blockNumber = await await web3.eth.getBlockNumber();
    const transactionss = [];
    for (let i = blockNumber; i > 0; i--) {
      const block = await web3.eth.getBlock(i);
      if (i != 0) {
        const transaction = await web3.eth.getTransaction(
          block.transactions[0]
        );
        transactionss.push(transaction);
      }
    }
    return transactionss;
  });

  if (isFetching) {
    return <Box bg="default"></Box>;
  }

  return (
    <Box w="50%">
      <Box w="100%" borderRadius={25} borderColor={"border"} border="1px solid">
        <Box bg="btn" borderTopRadius={25} align="center">
          <Text fontSize="20px" fontWeight={500} color="white" p={5}>
            Latest Transactions
          </Text>
        </Box>

        {data.slice(0, 5).map((item, index) => (
          <Box key={index} border="1px" borderColor="border" py={2} px={2}>
            <Flex w={"100%"} spacing={15} justifyContent="space-between">
              <HStack>
                <Box bgColor="gray.500" borderRadius={10} px={5} py={4}>
                  <Icon color="white" as={FaBook} />
                </Box>

                <VStack>
                  <Link
                    onClick={() =>
                      handleNavigate("Transaction Hash", item.hash)
                    }
                    textDecoration="no-underline"
                    _hover={{
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    color="white"
                  >
                    {"  "}
                    {item.hash.slice(0, 5)}...{item.hash.slice(-5)}
                  </Link>

                  <Text color="gray">time</Text>
                </VStack>
              </HStack>
              <VStack>
                <HStack>
                  <Text color="gray"> From: </Text>
                  <Link
                    onClick={() => handleNavigate("Address", item.from)}
                    color="white"
                  >
                    {" "}
                    {item.from.slice(0, 5)}...{item.from.slice(-5)}
                  </Link>
                </HStack>

                {item.to != null && (
                  <HStack>
                    <Text color="gray"> To: </Text>

                    <Link
                      color="white"
                      onClick={() => handleNavigate("Address", item.to)}
                    >
                      {" "}
                      {item.to.slice(0, 5)}...{item.to.slice(-5)}
                    </Link>
                  </HStack>
                )}
              </VStack>

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
            </Flex>
          </Box>
        ))}
        <VStack p={5}>
          {/* <Link fontSize="20px" textDecoration="underline">
            {" "}
            See all Transactions{" "}
          </Link> */}
        </VStack>
      </Box>
    </Box>
  );
}
