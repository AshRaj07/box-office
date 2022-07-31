import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Show from "./pages/Show";
import Starred from "./pages/Starred";
import {ThemeProvider} from 'styled-components'

const theme = {
  mainColors:{
    blue:'#2400ff',
    gray:'#c6c6c6',
    dark:'#353535'
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact={true} path={"/"}>
          <Home />
        </Route>
        <Route exact={true} path={"/starred"}>
          <Starred />
        </Route>
        <Route exact path={"/show/:id"}>
          <Show />
        </Route>
        <Route>This is 404 page !</Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
