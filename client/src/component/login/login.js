import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Api from '../../api/helper';
import { Global } from '../../context/global';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';

const Login =()=>{

  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState("");
  const {user: {saveUser}} = useContext(Global);
  const history = useHistory();

  const onSubmit = async(data, evt) => {  

    const {headers:{token}, data:{data:user}} = await Api.post({url: '/login', data});
    
    if(token){
      localStorage.setItem("authorization", token); 
      localStorage.setItem("user", JSON.stringify(user));  
      saveUser(user);
      evt.target.reset();

      const location = {
        pathname: '/',
      }
      history.push(location);
    } 
    setMessage("Invalid email or password");

  }


  return (
    <div className="body d-flex flex-column justify-content-center align-items-center">
      <form onSubmit={handleSubmit(onSubmit)} method="post" className="login-form d-flex flex-column justify-content-around p-5">
          <div className="text-center"><h1>Login</h1></div>
          <div className="d-grid">
            <label for="email"><b>Email</b></label>
            <input className="login-input" type="email" placeholder="Enter Email Id" {...register("email")} required/>
          </div>
          <div className="d-grid">
            <label for="password"><b>Password</b></label>
            <input className="login-input" type="password" placeholder="Enter Password" {...register("password")} required/>
          </div>
          <button className="login-button" type="submit">Login</button>

          <div className="d-flex justify-content-between">
            <label>
              <input type="checkbox" checked="checked" {...register("remember")}/> <span>Remember me</span>
            </label>
            {/* <div> Forgot <a href="">password?</a> </div> */}
          </div>
          {/* <div>If not registerd, please <a href="#"> click here </a> </div> */}
      </form>
      {message ? <div className="login-failed">{message}</div> : <div>You have not login yet</div>}
    </div>
    
  );
};

export default Login;
