import { useState, useEffect, useContext } from "react";
import { Web3Context } from "./Web3Context";
import { Box, Text, HStack, VStack, Link, Divider } from "@chakra-ui/react";
import Web3 from "web3";
import { Avatar } from "@chakra-ui/react";
import { useQuery } from "react-query";

import { useNavigate, useLocation } from "react-router-dom";
import NoResultFound from "./NoResultFound";

export default function AddressDetails() {
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const address = location.state.someData;

  function showAll() {
    setShow(!show);
  }

  const { web3, handleNavigate } = useContext(Web3Context);

  const {
    status,
    data = [],

    error,
    isFetching,
  } = useQuery("address", async () => {
    const blockNumber = await await web3.eth.getBlockNumber();
    const transactionss = [];
    for (let i = blockNumber; i >= 0; i--) {
      const block = await web3.eth.getBlock(i);
      if (i != 0) {
        const transaction = await web3.eth.getTransaction(
          block.transactions[0]
        );
        if (transaction.to === address || transaction.from === address) {
          transactionss.push(transaction);
        }
      }
    }
    return transactionss;
  });

  const requiredTransactions = !show ? data.slice(0, 5) : data;

  if (isFetching) {
    return <Box></Box>;
  }
  if (data.length === 0) {
    return <NoResultFound />;
  }

  return (
    <Box w="100%" p={10}>
      <HStack>
        <Avatar
          height={"35px"}
          width="35px"
          src="https://mintspace.io/wp-content/uploads/2021/10/183.png"
        />
        <Box fontSize="20px" fontWeight="bold">
          Address: {address}
        </Box>
      </HStack>

      <Box borderRadius={5} bg="blue.600" px={5} py={3} width="10%" mt={10}>
        <Text fontSize="18px" textColor="white" fontWeight={500}>
          Transactions
        </Text>
      </Box>

      <Box
        w="100%"
        borderRadius={25}
        mt={10}
        boxShadow="md"
        border="1px"
        borderColor="gray.200"
      >
        <HStack
          p={5}
          color="white"
          borderTopRadius={25}
          bg="#21325B"
          display="flex"
          w={"100%"}
          spacing={20}
          justifyContent="space-between"
          fontWeight="bold"
        >
          <Text flex="1">Transaction Hash</Text>
          <Text flex="1"> Method </Text>
          <Text flex="1"> Block </Text>
          <Text flex="1"> From </Text>
          <Text flex="1"> To </Text>
          <Text flex="1"> Gas </Text>
          <Text flex="1"> Value </Text>
        </HStack>
        {requiredTransactions.map((item, index) => (
          <Box
            key={index}
            border="1px"
            borderColor="gray.200"
            borderBottomRadius={
              index === requiredTransactions.length - 1 ? 25 : 0
            }
            py={2}
            px={5}
            bg={index % 2 === 0 ? "transparent" : "gray.200"}
          >
            <HStack
              display="flex"
              w={"100%"}
              spacing={20}
              justifyContent="space-evenly"
            >
              <Link
                flex="1"
                onClick={() => handleNavigate("Transaction Hash", item.hash)}
                textDecoration="no-underline"
                _hover={{
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                color="blue"
              >
                {"  "}
                {item.hash.slice(0, 8)}...
              </Link>
              <Box
                flex="1"
                borderRadius={5}
                px={5}
                fontWeight="bold"
                border="1px solid"
                borderColor="gray.300"
                fontSize="12px"
              >
                {" "}
                Transfer{" "}
              </Box>
              <Link
                flex="1"
                color="blue"
                overflowX={"auto"}
                onClick={() => handleNavigate("Block Number", item.blockNumber)}
              >
                {" "}
                {item.blockNumber}
              </Link>
              <Link flex="1" color="blue">
                {" "}
                {item.from.slice(0, 8)}...{" "}
              </Link>
              <Box flex="1">
                {item.to != null ? (
                  <Link flex="1" color="blue">
                    {item.to.slice(0, 8)}....
                  </Link>
                ) : (
                  <Text align="center"> - </Text>
                )}
              </Box>
              <Link flex="1" color="blue">
                {" "}
                {item.gas}
              </Link>
              <Box
                flex="1"
                borderRadius={5}
                px={5}
                fontWeight="bold"
                border="1px solid"
                borderColor="gray.300"
                fontSize="12px"
              >
                {" "}
                {item.value}
              </Box>
            </HStack>
          </Box>
        ))}
        {data.length > 5 && (
          <VStack p={2}>
            {" "}
            <Link onClick={showAll} decoration="underline">
              {" "}
              {show ? "See less tansactions" : "See all Transactions"}
            </Link>
          </VStack>
        )}
      </Box>
    </Box>
  );
}
