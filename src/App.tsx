import React from "react";
import Theme from "./Theme";
import Button from "./components/button/Button";
import Surface from "./components/surface/Surface";
import Tree from "./components/tree/Tree";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { data } from "./mock/tree";
import Ring from "./components/ring/Ring";
import { mockCircle } from "./mock/circle";

const App = () => {
  return (
    <Theme>
      {/* <Surface> */}
      {/* <Button onClick={() => alert("hi")}>this is a button</Button> */}

      <Router>
        <Routes>
          <Route path="/tree" element={<Tree data={data} />}></Route>
          <Route path="/ring" element={<Ring data={mockCircle} />}></Route>
        </Routes>
      </Router>
      {/* </Surface> */}
    </Theme>
  );
};
export default App;
