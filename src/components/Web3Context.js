import React, { createContext } from "react";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
const web3 = new Web3(provider);

// Creating context web3Context for web3 instance
const Web3Context = createContext();

// Provider for wrapping web3 instance
function Web3Provider(props) {
  const navigate = useNavigate();

  const handleNavigate = (selectedOption, inputValue) => {
    if (selectedOption === "Transaction Hash") {
      navigate(`/transaction/${inputValue}`, {
        state: { transactionNumber: inputValue },
      });
    } else if (selectedOption === "Address") {
      navigate(`/address/${inputValue}`, {
        state: { addressNumber: inputValue },
      });
    } else if (selectedOption === "Block Number") {
      navigate(`/block/${inputValue}`, { state: { blockNumber: inputValue } });
    }
  };
  const values = { web3, handleNavigate };
  return <Web3Context.Provider value={values} {...props} />;
}

export { Web3Context, Web3Provider };
