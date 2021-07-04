import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Rules from "./components/Rules";
import Practice from "./components/Practice";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/rules">
            <Rules />
          </Route>
          <Route path="/practice">
            <Practice />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
