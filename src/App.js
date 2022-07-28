import React from "react";
import {Route,Switch} from "react-router-dom"

function App() {
  return (
    <Switch>
      <Route exact={true} path={"/"}>
        This is home page
      </Route>
      <Route exact={true} path={"/starred"}>
        This is starred
      </Route>
      <Route>
        This is 404 page !
      </Route>      
    </Switch>
  );
}

export default App;
