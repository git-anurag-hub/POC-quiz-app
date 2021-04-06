import React, { Component } from "react";
import axios from "axios";
import Loader from "./Loader";
import history from "../history";
import BackTo from "./BackTo";

export default class Quiz extends Component {
  state = {
    questions: null,
    answers: [],
    email: "",
    name: "",
    sure: false,
  };

  async componentDidMount() {
    const res = await axios.get("/api/quiz");
    const questions = res.data;
    this.setState({ questions });
  }

  handleAns = async (e) => {
    var temp = this.state.answers.filter((ans) => {
      return ans.question !== e.currentTarget.name;
    });
    this.setState({
      answers: [
        ...temp,
        { answer: parseInt(e.currentTarget.value) + 1, question: e.currentTarget.name },
      ],
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.state.sure) {
      const res = await axios.post("/api/grades", {
        email: this.state.email,
        name: this.state.name,
        answers: this.state.answers,
      });
      console.log(res);
      if (res.status === 201) {
        history.push("/leaderboard");
      }
    }
  };

  renderList = () => {
    return this.state.questions.map((question, qindex) => {
      return (
        <>
          <div class="item">
            <div class="content">
              <div class="header">
                {qindex + 1}.{"  "}
                {question.question}
              </div>
              <div class="description">
                <div class="grouped fields">
                  {question.options.map((option, oindex) => {
                    return (
                      <div class="field">
                        <div class="ui radio checkbox">
                          <input
                            type="radio"
                            name={question._id}
                            onChange={(e) => {
                              this.handleAns(e);
                            }}
                            value={oindex}
                          />
                          <label>{option}</label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <br></br>
        </>
      );
    });
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
              <i class="pen square icon"></i>
              <div class="content">Quiz</div>
            </h2>
            <div class="ui clearing divider"></div>
            <div class="two fields">
              <div class="field">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                />
              </div>
              <div class="field">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="Email"
                  required
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </div>
            </div>
            {this.state.questions ? (
              <div class="ui divided list">{this.renderList()}</div>
            ) : (
              <Loader></Loader>
            )}
          </div>
          <div class="field">
            <div class="ui toggle checkbox">
              <input
                type="checkbox"
                name="sure"
                required
                onChange={(e) => this.setState({ sure: !this.state.sure })}
                value={this.state.sure}
              />
              <label>Are you sure you want to submit?</label>
            </div>
          </div>
          <button class="ui animated teal fade button fluid" onClick={(e) => this.handleSubmit(e)}>
            Submit
          </button>
          <br></br>
          <br></br>
          <br></br>
        </form>
      </>
    );
  }
}
