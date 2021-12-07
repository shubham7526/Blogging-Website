import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Registration from "./component/registration/registration";
import Login from "./component/login/login";
import Header from "./component/header/header";
import AboutUs from "./component/about-us/about-us";
import ContactUs from "./component/contact-us/contact-us";
import CreatePost from "./component/create-post/create-post";
import MyPosts from "./component/my-posts/my-posts";
import Posts from "./component/posts/posts";
import './Router.css';


const PageRouter = ()=>{

    return (
            <Router>
                <Header/>
                    <Switch>
                        <Route path="/about">
                            <AboutUs/>
                        </Route>
                        <Route path="/contact">
                            <ContactUs/>
                        </Route>
                        <Route path="/registration">
                            <Registration/>
                        </Route>
                        <Route path="/login">
                            <Login/>
                        </Route>
                        <Route path="/create-post">
                            <CreatePost/>
                        </Route>
                        <Route path="/myposts">
                            <MyPosts/>
                        </Route>
                        <Route path="/">
                            <Posts/>
                        </Route>

                    </Switch>
            </Router>
    )
};

export default PageRouter;

