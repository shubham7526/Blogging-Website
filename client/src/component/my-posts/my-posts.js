import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Post from '../post/post';
import Api from '../../api/helper';
import 'bootstrap/dist/css/bootstrap.min.css';
import './my-posts.css';


const MyPosts =()=>{

const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    const {data} = await Api.get({url: "/myposts", headers:{
       "Authorization": "Bearer "+ localStorage.getItem("authorization")
    }});

    setPosts(data);
  }

  useEffect(() => {
    fetchData();
  },[]);

  return (
    <div className="d-flex">
      <div className="blog-list-body">
        {
          posts.map((post, idx) => <Post key={idx} post={post}/>)
        }

      </div>
      <div className="create-post">
        <Link to='/create-post'>
          <div>Create my Post</div>
        </Link>
      </div>
    </div>
    
  );
};

export default MyPosts;
