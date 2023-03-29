import { extendTheme } from "@chakra-ui/react";
import { Button } from "./button";
const chakraTheme = extendTheme({
  colors: {
    default: "#000C2C",
    modalDefault: "#01000C",
    btn: "#F77221",
    text: "#FFF",
    subText: "#7A7A7A",
    secondaryText: "#5C5B61",
    border: "#2B293B",
    secondaryBorder: "#0D1937",
    secondaryInputBorder: "#22212B",
    inputBorder: "#1E1C31",
    btnBorder: "#17152A",
    Gunmetal: "#292B38",
    ChineseBlack: "rgba(13, 17, 27, 0.6)",
    JungleGreen: "rgba(26, 28, 37, 0.3)",
    commonBaseToken:
      "linear-gradient(91.15deg, rgba(13, 17, 27, 0.6) 0%, rgba(26, 28, 37, 0.3) 100%)",
  },
  bg: {
    default: "#04091F",
    btn: "#F77221",
    Gunmetal: "#292B38",
    ChineseBlack: "rgba(13, 17, 27, 0.6)",
    JungleGreen: "rgba(26, 28, 37, 0.3)",
  },
  fonts: {
    // body: `"Poppins","sans-serif"`,
    // heading: `"Poppins","sans-serif"`
  },
  components: {
    Button,
  },
});

export default chakraTheme;
