import React, { useState, createContext } from 'react';

export const Global = createContext();

export const Context = (props)=>{

    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);

   
    const saveUser = (userData)=>{
        setUser(userData);
        const data = localStorage.getItem("user");
        if(data) {
            const userData = JSON.parse(data);
            setUser(userData);
        };
    };
    

    const createPosts = (posts)=>{
        setPosts(posts);
    }

    const obj = {
        user: {saveUser,user},
        createPosts:createPosts,
        posts,
        
    }

    return(
        <Global.Provider value={obj}>{props.children}</Global.Provider>
    )
}
