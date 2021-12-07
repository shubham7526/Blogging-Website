import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Api from '../../api/helper';
import { useHistory } from "react-router-dom"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import 'bootstrap/dist/css/bootstrap.min.css';
import './create-post.css';


const CreatePost = ()=> {
    const { register, handleSubmit } = useForm();
    const [message, setMessage] = useState("")
    const [content, setContent] = useState("");
    let history = useHistory();

    const onSubmit = async(data, evt) => { 

      data.content = content;   
      const { headers:{message} } = await Api.post({url:"/post", data, 
        headers:{
          "Authorization": "Bearer "+ localStorage.getItem("authorization")
        }
      });


      setMessage(message);
      evt.target.reset();
      const location = {
        pathname: '/myposts',
      };

      setTimeout(()=>{
        history.push(location)
      }, 2000);
    }

    

  return (
    <div className="body d-flex flex-column justify-content-center align-items-center">
        <form onSubmit={handleSubmit(onSubmit)} method="post" className="create-post-form d-flex flex-column justify-content-around p-5">
            <div className="text-center"><h1>Create Your Post</h1></div>
            <input className="send" type="submit"/>
            <div className="d-grid">
                <label for="title"><b>Title</b></label>
                <input className="create-post-input" type="text" placeholder="Write title here.." {...register("title")} required/>
            </div>
            <div className="d-grid">
                <label for="imageUrl"><b>Image Url</b></label>
                <input className="create-post-input" type="text" placeholder="Enter Image Url" {...register("imageUrl")} required/>
            </div>
            <div>
            <CKEditor
                    editor={ ClassicEditor }
                    data=""
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        // console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        // console.log( { event, editor, data } );
                        setContent(data);

                    } }
                    onBlur={ ( event, editor ) => {
                        // console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        // console.log( 'Focus.', editor );
                    } }
                />
            </div>
            {/* <input className="Send" type="submit"/> */}
        </form>
        {message ? <div>{message}</div> : <div></div>}
    </div>
  );
}

export default CreatePost;
