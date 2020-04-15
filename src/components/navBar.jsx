import React from 'react';
import {NavLink, Link} from 'react-router-dom';

const NavBar = ({user}) => {
    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">RentMovie</Link>
            
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/movies">Movies</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/rentals">Rentals</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/customers">Customers</NavLink>
                    </li>
                    
                </ul>
                <form class="form-inline my-2 my-lg-0">
                    { !user &&(
                            <React.Fragment>
                                <NavLink className="btn btn-outline-primary mx-2 my-sm-0" to="/login">Login</NavLink>
                                <NavLink className="btn btn-outline-primary mx-2 my-sm-0" to="/register">Register</NavLink>
                            </React.Fragment>
                            )
                        }
                        { user &&(
                            <React.Fragment>
                                    <NavLink className="nav-link" to="/profile">{user.name}</NavLink>
                                    <NavLink className="btn btn-outline-danger mx-2 my-sm-0" to="/logout">Logout</NavLink>
                            </React.Fragment>
                        )
                        }
                </form>
            </div>
        </nav>
     );
}
 
export default NavBar;