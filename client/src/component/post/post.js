import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment'
import { Markup } from 'interweave';
import { useHistory } from "react-router-dom";
import Api from '../../api/helper';
import 'bootstrap/dist/css/bootstrap.min.css';
import './post.css';
import { isEmpty } from 'lodash';

const Post =({post})=>{

  const {title, content, imageUrl, createdAt, publicId, user:{name, publicId:userId}} = post;
  const [message, setMessage] = useState("");
  const [user, saveUser] = useState({});
  const history = useHistory();

  const deletePost = async()=>{
    const data = {publicId, userId};
    const {headers:{message}} = await Api.remove({url: `/post/${publicId}`, data});
    setMessage(message);

    const location = {
      pathname: '/myposts',
    };

    setTimeout(()=>{
      history.push(location)
    }, 2000);

  };

  const editPostById = async(publicId)=>{

  };
  
  useEffect(() => {
    const data = localStorage.getItem("user");
      if(data) {
          const userData = JSON.parse(data);
          saveUser(userData);
        }
    },[]);

  return (
    <div className="blog d-flex flex-column justify-content-end">
        <div className="text-center fs-3 fw-bold">{title}</div>
        <div className="blog-content d-flex justify-content-between">
            <p className="me-5">{<Markup content={content} />}</p>
            <img src={imageUrl} alt="CM Pic"/>
        </div>
        <div className="blog-footer d-flex justify-content-between">
            <div>Posted by {name}</div>
            <div className="d-flex">
            {
              !isEmpty(user) ? 
              <div>
                  <button onClick={ deletePost }>Delete</button>
                  <button onClick={ editPostById }>Edit</button>
              </div> :
              <div></div>
            }
              <div className="ms-3">{moment(createdAt).format("DD MMM YYYY hh:mm:ss")}</div>
            </div>
        </div>
        {message ? <div className="text-center"> {message}</div> : <div></div>}
    </div>
    
  );
};

export default Post;
