import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import BackTo from "./BackTo";
import Loader from "./Loader";

export default class Leaderboard extends Component {
  state = {
    users: null,
  };
  async componentDidMount() {
    const res = await axios.get(`/api/grades`);
    const users = res.data;
    this.setState({ users });
  }
  renderList = () => {
    return this.state.users.map((user, index) => {
      return (
        <>
          <div class="item">
            <div class="right floated content">
              <div>{user.grades}</div>
            </div>

            <i class={`large ${index} middle aligned icon`}>{index + 1}</i>
            <div class="content">
              <div class="header">
                {user.name} - {user.email}
              </div>
              <div class="description">{moment(user.createdAt).startOf("min").fromNow()}</div>
            </div>
          </div>
        </>
      );
    });
  };
  render() {
    return (
      <>
        <BackTo toRoute="" to="Home"></BackTo>

        <div
          className="ui form"
          style={{ paddingTop: "60px", paddingLeft: "10%", paddingRight: "10%" }}
        >
          <div class="ui placeholder segment">
            <h2 class="ui center aligned floated header">
              <i class="trophy icon"></i>
              <div class="content">Leaderboards</div>
            </h2>
            <div class="ui clearing divider"></div>
            {this.state.users ? (
              this.state.users.length === 0 ? (
                <div>Nothing To show</div>
              ) : (
                <div class="ui middle aligned divided list">{this.renderList()}</div>
              )
            ) : (
              <Loader></Loader>
            )}
          </div>
        </div>
      </>
    );
  }
}
