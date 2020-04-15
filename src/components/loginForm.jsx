import React, {Component} from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import auth from '../services/authService';
import * as userService from "../services/userService";

class LoginForm extends Form {

    state = {
        data: {username: "", password: ""},
        errors: {}, loading: false
    };

    schema = {
        username: Joi.string()
            .required()
            .label("Username"),
        password: Joi.string()
            .required()
            .label("Password")
    };

    doSubmit = async () => {
        try {
            this.setState({loading: true})
            const {data} = this.state;
            await auth.login(data.username, data.password);
            const {state} = this.props.location;
            this.setState({loading: false})
            window.location = state ? state.from.pathname : '/';
        } catch (ex) {
            this.setState({loading: false})
            if (ex.response && ex.response.status === 400) {
                const errors = {...this.state.errors};
                errors.username = ex.response.data;
                this.setState({errors});
            }
        }
    }


    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('username', 'Username')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderButton('Login')}
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

export default LoginForm;