import { useState, useEffect, useContext } from "react";
import { Web3Context } from "./Web3Context";
import {
  Box,
  Text,
  HStack,
  VStack,
  Link,
  Divider,
  Image,
} from "@chakra-ui/react";
import Web3 from "web3";
import { useLocation, useNavigate } from "react-router-dom";
import NoResultFound from "./NoResultFound";
import Logo from "./Logo";
import { useQuery } from "react-query";

export default function SingleBlock() {
  const location = useLocation();
  const blockNumber = location.state?.blockNumber;
  const { web3, handleNavigate } = useContext(Web3Context);

  const {
    status,
    data = [],
    error,
    isFetching,
  } = useQuery("singleBlock", async () => {
    const block = await web3.eth.getBlock(blockNumber);
    return block;
  });

  if (isFetching) {
    return <Box></Box>;
  }
  if (error || !data) {
    return <NoResultFound />;
  }

  return (
    <Box p={10} w="100%">
      <Logo />

      <Box my={10} borderRadius={20} boxShadow="lg">
        <Box bg="#21325B" borderTopRadius={20} align="start">
          <Text fontSize="20px" fontWeight={500} color="white" px={10} py={5}>
            BLOCK #{data.number}
          </Text>
        </Box>
        <HStack p={10} fontSize="20px" color="gray.500">
          <VStack w="20%" alignItems={"start"} spacing={10}>
            <Text fontSize="20px" color="gray.500">
              {" "}
              Number:
            </Text>

            <Text> Hash:</Text>

            <Text> TimeStamp:</Text>

            <Text> Size:</Text>
            <Text> Gas Limit:</Text>
            <Text> Transaction:</Text>
          </VStack>

          <VStack alignItems={"start"} spacing={10}>
            <Link color="blue" fontSize="20px">
              {" "}
              {data.number}{" "}
            </Link>

            <Link color="blue" fontSize="20px">
              {" "}
              {data.hash}{" "}
            </Link>

            <Text color="gray" fontSize="20px">
              {" "}
              {new Date(data.timestamp * 1000).toString()}{" "}
            </Text>

            <Text color="blue.400" fontSize="20px">
              {" "}
              {data.size}{" "}
            </Text>
            <Text color="blue.400" fontSize="20px">
              {" "}
              {data.gasUsed}{" "}
            </Text>
            <Link
              color="blue.400"
              fontSize="20px"
              onClick={() =>
                handleNavigate(
                  "Transaction Hash",
                  data.transactions[data.transactions.length - 1]
                )
              }
            >
              {" "}
              {data.transactions[data.transactions.length - 1]}{" "}
            </Link>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
}
