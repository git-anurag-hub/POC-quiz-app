import React, { Component } from "react";
import axios from "axios";
import history from "../history";
import BackTo from "./BackTo";

export default class Quiz extends Component {
  state = {
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if ((this.state.question.length > 1) & (this.state.answer !== "")) {
      var options = [];
      if (this.state.option1) {
        options = [...options, this.state.option1];
      }
      if (this.state.option2) {
        options = [...options, this.state.option2];
      }
      if (this.state.option3) {
        options = [...options, this.state.option3];
      }
      if (this.state.option4) {
        options = [...options, this.state.option4];
      }
      const body = {
        question: this.state.question,
        answer: this.state.answer,
        options,
      };
      await axios.post("/api/quiz", body);
      history.push("/");
    }
  };

  render() {
    return (
      <>
        <BackTo toRoute="" to="Home"></BackTo>
        <form
          className="ui form"
          style={{ paddingTop: "60px", paddingLeft: "10%", paddingRight: "10%" }}
        >
          <div class="ui placeholder segment">
            <h2 class="ui center aligned floated header">
              <i class="add icon"></i>
              <div class="content">Add question</div>
            </h2>
            <div class="ui clearing divider"></div>
            <div
              class="field"
              style={{ maxWidth: "100%", marginLeft: "inherit", marginRight: "inherit" }}
            >
              <label>Question</label>
              <input
                type="text"
                placeholder="Question"
                required
                value={this.state.question}
                onChange={(e) => this.setState({ question: e.target.value })}
              />
            </div>
            <div
              class="field"
              style={{ maxWidth: "100%", marginLeft: "inherit", marginRight: "inherit" }}
            >
              <label>Options</label>
              <input
                type="text"
                placeholder="Option 1"
                required
                value={this.state.option1}
                onChange={(e) => this.setState({ option1: e.target.value })}
              />
            </div>
            <div
              class={`field ${this.state.option1.length > 0 ? "" : "disabled"}`}
              style={{ maxWidth: "100%", marginLeft: "inherit", marginRight: "inherit" }}
            >
              <input
                type="text"
                placeholder="Option 2"
                value={this.state.option2}
                onChange={(e) => this.setState({ option2: e.target.value })}
              />
            </div>
            <div
              class={`field ${this.state.option2.length > 0 ? "" : "disabled"}`}
              style={{ maxWidth: "100%", marginLeft: "inherit", marginRight: "inherit" }}
            >
              <input
                type="text"
                placeholder="Option 3"
                value={this.state.option3}
                onChange={(e) => this.setState({ option3: e.target.value })}
              />
            </div>
            <div
              class={`field ${this.state.option3.length > 0 ? "" : "disabled"}`}
              style={{ maxWidth: "100%", marginLeft: "inherit", marginRight: "inherit" }}
            >
              <input
                type="text"
                placeholder="Option 4"
                value={this.state.option4}
                onChange={(e) => this.setState({ option4: e.target.value })}
              />
            </div>
            <div
              class="field"
              style={{ maxWidth: "100%", marginLeft: "inherit", marginRight: "inherit" }}
            >
              <label>Answer</label>
              <input
                type="number"
                placeholder="Answer (Enter the option number)"
                required
                max={4}
                min={1}
                value={this.state.answer}
                onChange={(e) => this.setState({ answer: e.target.value })}
              />
            </div>
            <button
              class="ui animated teal fade button fluid"
              style={{ maxWidth: "100%", marginLeft: "inherit", marginRight: "inherit" }}
              onClick={(e) => this.handleSubmit(e)}
            >
              Submit
            </button>
          </div>
        </form>
      </>
    );
  }
}
