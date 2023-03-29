const pageRoutes = {
  dashboard: "/",
  blockDetails: "/block-details",
  transactionDetails: "/transaction/:transactionHash",
  singleBlock: "/block/:blockNumber",
  addressDetails: "/address/:address",
};

const formatAsChildRoute = (url, parentUrl) => {
  return url.replace(parentUrl, "").substring(1);
};

export { pageRoutes, formatAsChildRoute };
