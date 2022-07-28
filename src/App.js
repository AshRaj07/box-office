import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Starred from "./pages/Starred";

function App() {
  return (
    <>
      <Switch>
        <Route exact={true} path={"/"}>
          <Home />
        </Route>
        <Route exact={true} path={"/starred"}>
          <Starred />
        </Route>
        <Route>This is 404 page !</Route>
      </Switch>
    </>
  );
}

export default App;
