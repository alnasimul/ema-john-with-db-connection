import React, { useContext } from 'react';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'
import './Header.css'
import { handleSignOut } from '../Login/loginManager';

const Header = () => {
   const [loggedInUser,setLoggedInUser] = useContext(UserContext);
   
    return (
        <div className="header">
            <img src={logo} alt="" />
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/manage">Manage Inventory</Link>
                {loggedInUser.email ? <Link to="/login" onClick={() => setLoggedInUser({})}>Sign Out</Link> : <Link to="/login">Sign In</Link>} 
                 
             </nav>
        </div>
    );
};

export default Header;