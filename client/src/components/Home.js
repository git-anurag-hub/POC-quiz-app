import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className="ui container" style={{ paddingTop: "20px" }}>
          <div class="ui placeholder segment">
            <h2 class="ui floated center aligned header">
              <i class="tasks icon"></i>
              <div class="content">Welcome to Quiz App</div>
            </h2>
            <div class="ui clearing divider"></div>
            <Link to="/quiz" class="ui animated teal fade button fluid" tabindex="0">
              <div class="visible content">Start Quiz</div>
              <div class="hidden content">Start Quiz</div>
            </Link>
            <br></br>
            <Link to="/leaderboard" class="ui animated teal fade button fluid" tabindex="0">
              <div class="visible content">See Leaderboards</div>
              <div class="hidden content">See Leaderboards</div>
            </Link>
            <br></br>
            <Link to="/add" class="ui animated teal fade button fluid" tabindex="0">
              <div class="visible content">Add Questions</div>
              <div class="hidden content">Add Questions</div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
