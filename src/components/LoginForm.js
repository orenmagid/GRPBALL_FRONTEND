import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";

const baseUrl = "http://localhost:3000/api/v1";

class LoginForm extends React.Component {
  state = {
    username: "",
    password: "",
    error: ""
  };

  login = e => {
    e.preventDefault();

    let params = {
      username: this.state.username,
      password: this.state.password
    };

    this.setState({ username: "", password: "", error: "" });

    fetch(baseUrl + "/login", {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.success) {
          localStorage.setItem("token", data.token);
          this.setState({ error: "" });
        } else {
          this.setState({ error: "Invalid username or password" });
        }
      });
  };

  render() {
    return (
      <Segment inverted>
        <Form inverted onSubmit={this.login}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Username"
              placeholder="Username"
              name="username"
              value={this.state.username}
              onChange={e => this.setState({ username: e.target.value })}
            />
            <Form.Input
              fluid
              label="Password"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </Form.Group>

          <Button type="submit">Login</Button>
        </Form>
      </Segment>
    );
  }
}

export default LoginForm;

{
  /* <div>
  <form>
    <input
      name="username"
      value={this.state.username}
      onChange={e => this.setState({ username: e.target.value })}
      placeholder="username"
    />
    <input
      name="password"
      value={this.state.password}
      onChange={e => this.setState({ password: e.target.value })}
      placeholder="password"
    />
    <button onClick={this.login}>Login</button>
  </form>
  <span style={{ color: "red" }}>{this.state.error}</span>
</div> */
}
