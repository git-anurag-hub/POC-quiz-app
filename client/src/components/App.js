import React, { Component } from "react";
import Home from "./Home";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import Leaderboard from "./Leaderboard";
import Quiz from "./Quiz";

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/quiz" component={Quiz}></Route>
          <Route exact path="/leaderboard" component={Leaderboard}></Route>
          <Route path="/" component={Home}></Route>
        </Switch>
      </Router>
    );
  }
}
