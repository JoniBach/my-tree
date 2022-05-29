import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    //persian blue with tetradic pairings
    blue: "#3333DC",
    yellow: "#DCDC33",
    magenta: "#DC3388",
    green: "#33DC88",
    red: "#DC3333",
    white: "#EEEEEE",
    black: "#333333",
  },
  spacing: {
    s: "5px",
    m: "10px",
    l: "20px",
  },
  shadow: {
    none:
      "rgba(50, 50, 93, 0) 0px 2px 5px -1px, rgba(0, 0, 0, 0.0) 0px 1px 3px -1px;",
    close:
      "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;",
    medium:
      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;",
    far:
      "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;",
  },
  fonts: ["sans-serif", "Roboto"],
  fontSizes: {
    small: "1em",
    medium: "2em",
    large: "3em",
  },
};

type ThemeProps = {
  children: any;
};

const Theme = ({ children }: ThemeProps) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
