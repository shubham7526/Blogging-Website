import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {isEmpty} from "lodash";
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css';
import { Global } from '../../context/global';

const Header =()=>{

    const {user: {saveUser, user}} = useContext(Global);
    const history = useHistory();
    
    useEffect(() => {
        const data = localStorage.getItem("user");
        if(data) {
            const userData = JSON.parse(data);
            saveUser(userData);
        }
    },[]);

    const logout = ()=>{
        localStorage.removeItem("authorization");
        localStorage.removeItem("user");
        saveUser({});

        const location = {
            pathname: '/login',
        }
        history.push(location);

    }

    return (
        <div className="header-body d-flex justify-content-between align-items-center position-fixed">
            <div className="logo">Science World</div>
            <div className="center_nav_bar">
                <ul className="d-flex list-unstyled m-auto">
                    <Link to="/">
                        <li >Home</li>
                    </Link>
                    <Link to="/about">
                        <li>About</li>
                    </Link>
                    <Link to="/contact">
                        <li>Contact Us</li>
                    </Link>
                </ul>
            </div>

            <div className="right-side-nav d-flex justify-content-evenly ">
            {
                !isEmpty(user) ? 
                <div className="d-flex align-items-center">
                    <Link to="/myposts" className="my_account">
                        <div className="my_posts"><h5>My Posts</h5></div>
                    </Link>
                    {/* <span>Welcome</span> */}
                    <h5 className="ps-2 user_name">{ user.name }</h5>
                    <button className="logout" onClick={logout}>Logout</button>
                </div>
                : 
                <div className="d-flex right-side-nav justify-content-evenly">
                <Link to="/login" className="login">
                    <div >Login</div>
                </Link>
                <Link to="/registration" className="sign-up">
                    <div>Sign Up</div>
                </Link>
                </div>
            }

            </div>
        </div>
        
    );
};

export default Header;
