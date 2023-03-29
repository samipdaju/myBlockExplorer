import logo from "./logo.svg";
import "./App.css";
import { Web3Provider } from "./components/Web3Context";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import React from "react";

import AppRoutes from "./components/AppRoutes";

import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

export default function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Web3Provider>
            <AppRoutes />
          </Web3Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}
