import React from "react";
import Theme from "./Theme";
import Button from "./components/button/Button";
import Surface from "./components/surface/Surface";
import Tree from "./components/tree/Tree";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { data } from "./mock/tree";

const App = () => {
  return (
    <Theme>
      {/* <Surface> */}
      {/* <Button onClick={() => alert("hi")}>this is a button</Button> */}

      <Router>
        <Routes>
          <Route path="/" element={<Tree data={data} />}></Route>
        </Routes>
      </Router>
      {/* </Surface> */}
    </Theme>
  );
};
export default App;
