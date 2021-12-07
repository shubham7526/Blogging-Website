import React, { useEffect, useState } from 'react';
import Post from '../post/post';
import Api from '../../api/helper';
import 'bootstrap/dist/css/bootstrap.min.css';
import './posts.css';

const Posts =()=>{

  const [posts, setPosts] = useState([]);
  const fetchData = async () => {
    const {data} = await Api.get({url: "/posts"});
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
    </div>
    
  );
};

export default Posts;
