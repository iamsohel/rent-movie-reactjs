import React, {Component} from 'react';
import {ToastContainer} from "react-toastify";
import {Route, Redirect, Switch} from 'react-router-dom';
import Customers from './components/customers';
import Rentals from './components/rentals';
import MovieForm from './components/movieForm';
import Profile from './components/profile';
import CustomerForm from './components/customerForm';
import NotFound from './components/notFound';
import Movies from './components/movies';
import NavBar from './components/navBar';
import LoginForm from './components/loginForm';
import Logout from './components/logout';
import ProtectedRoute from "./components/common/protectedRoute";
import RegisterForm from './components/registerForm';
import MovieDetail from './components/MovieDetail';
import auth from './services/authService'
import './App.css';
import "react-toastify/dist/ReactToastify.css";



class App extends Component {
    state = {};

    componentDidMount(){
        const user = auth.getCurrentUser();
        console.log(user);
        this.setState({user})
    }
    render() {
        const {user} = this.state;
        return (
            <React.Fragment>
                <ToastContainer/>
                 <NavBar user={user}/>
                <main className="container">
                    <Switch>
                        <Route path="/register" component={RegisterForm}/>
                        <Route path="/movie-detail/:id" component={MovieDetail}/>
                        <Route path="/login" component={LoginForm}/>
                        <Route path="/logout" component={Logout}/>
                        <ProtectedRoute
                            path="/movies/:id" component={MovieForm}
                        />
                        <ProtectedRoute
                            path="/customers/:id" component={CustomerForm}
                        />
                        <Route
                            path="/movies"
                            render={props => <Movies {...props} user={this.state.user}/>}
                        />
                       <Route
                            path="/customers"
                            render={props => <Customers {...props} user={this.state.user}/>}
                        />
                        <Route
                            path="/profile"
                            render={props => <Profile {...props} user={this.state.user}/>}
                        />
                        <Route path="/rentals" component={Rentals}/>
                        <Route path="/not-found" component={NotFound}/>
                        <Redirect from="/" exact to="/movies"/>
                        <Redirect to="/not-found"/>
                    </Switch>
                </main>
            </React.Fragment>
        );
    }
}

export default App;
