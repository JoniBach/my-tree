import React from "react";
import Theme from "./Theme";
import Button from "./components/button/Button";
import Surface from "./components/surface/Surface";
import Tree from "./components/tree/Tree";

const App = () => {
  return (
    <Theme>
      {/* <Surface> */}
      {/* <Button onClick={() => alert("hi")}>this is a button</Button> */}
      <Tree />
      {/* </Surface> */}
    </Theme>
  );
};
export default App;
