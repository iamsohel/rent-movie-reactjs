import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";
import { toast } from "react-toastify";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "", isAdmin: false },
    users: [],
    errors: {}, loading: false
  };

  doSubmit = async () => {
    try {
      this.setState({loading: true});
      console.log(this.state.data);
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      this.props.history.push("/login");
      toast.success('Registration Successful. You can log in now.', {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: 'foo-bar'
      });
    } catch (ex) {
      this.setState({loading: false})
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors, loading: false });
      }
    }
  };

  user_role = [ { _id: false, name: "User" }];

  schema = {
    username: Joi.string()
      .required()
      .email()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name"),
    isAdmin: Joi.boolean().label("Admin")
  };

  componentDidMount() {
    const users = this.user_role;
    this.setState({ users });
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
        {this.state.loading && (
              <div class="spinner-grow text-dark" role="status">
                  <span class="sr-only">Loading...</span>
              </div>
          )}
      </div>
    );
  }
}

export default RegisterForm;
