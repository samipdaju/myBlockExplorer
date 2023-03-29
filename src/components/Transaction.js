import { Box, HStack, VStack, Text, Link } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Web3Context } from "./Web3Context";

import Web3 from "web3";
import NoResultFound from "./NoResultFound";
import Logo from "./Logo";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export default function Transaction() {
  const { transactionHash } = useParams();

  console.log(`Transaction: ${transactionHash}`);
  const { web3, handleNavigate } = useContext(Web3Context);

  const { status, data, error, isFetching } = useQuery(
    "singleTransaction",
    async () => {
      const transaction = await web3.eth.getTransaction(transactionHash);
      return transaction;
    }
  );

  if (!data) {
    return <NoResultFound />;
  }

  return (
    <Box p={10} bg="default" h="120vh">
      <Logo></Logo>

      <Box
        my={10}
        borderColor="border"
        border="2px solid"
        borderRadius={20}
        boxShadow="lg"
      >
        <Box
          borderTopRadius={20}
          align="start"
          borderBottom="2px solid"
          borderColor="border"
        >
          <HStack px={10} py={5}>
            <Text fontSize="20px" fontWeight={500} color="white">
              Transaction
            </Text>
            <Text fontSize="20px" color="white" fontWeight={250}>
              #{data.hash}
            </Text>
          </HStack>
        </Box>
        <HStack p={10} spacing={0}>
          <VStack w="20%" alignItems={"start"} spacing={10}>
            <Text fontSize="20px" color="gray.500">
              {" "}
              Transaction:
            </Text>

            <Text fontSize="20px" color="gray.500">
              {" "}
              block:
            </Text>

            <Box height="2px" bg="border" width="100%">
              {" "}
            </Box>

            <Text fontSize="20px" color="gray.500">
              {" "}
              from:
            </Text>

            <Text fontSize="20px" color="gray.500">
              {" "}
              to:
            </Text>

            <Box height="2px" bg="border" width="100%">
              {" "}
            </Box>
            <Text fontSize="20px" color="gray.500">
              {" "}
              gas:
            </Text>
            <Text fontSize="20px" color="gray.500">
              {" "}
              Value:
            </Text>
          </VStack>

          <VStack alignItems={"start"} spacing={10}>
            <Link color="white" fontSize="20px">
              {" "}
              {data.hash}{" "}
            </Link>

            <Link
              fontSize="20px"
              color="white"
              onClick={() => handleNavigate("Block Number", data.blockNumber)}
            >
              {" "}
              {data.blockNumber}{" "}
            </Link>
            <Box height="2px" bg="border" width="100%">
              {" "}
            </Box>

            <Link
              color="blue.400"
              fontSize="20px"
              onClick={() => handleNavigate("Address", data.from)}
            >
              {" "}
              {data.from}{" "}
            </Link>

            {data.to != null ? (
              <Link
                color="blue.400"
                fontSize="20px"
                onClick={() => handleNavigate("Address", data.to)}
              >
                {" "}
                {data.to}
              </Link>
            ) : (
              <Text fontSize="20px"> {"-"}</Text>
            )}

            <Box height="2px" bg="border" width="100%">
              {" "}
            </Box>
            <Link color="white" fontSize="20px">
              {" "}
              {data.gas}{" "}
            </Link>
            <Link color="white" fontSize="20px">
              {" "}
              {data.value}{" "}
            </Link>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
}
