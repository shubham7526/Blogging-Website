import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Api from '../../api/helper';
import 'bootstrap/dist/css/bootstrap.min.css';
import './registration.css';

const Registration = ()=>{
    const { register, handleSubmit } = useForm();
    const [message, setMessage] = useState("")
    let history = useHistory();


    const onSubmit = async(data, evt) => {     

      const {headers:{message}} = await Api.post({url: "/registration", data});
      setMessage(message);
      evt.target.reset();
      const location = {
        pathname: '/login',
      };
      setInterval(()=>{
        history.push(location)
      }, 10000);



      // history.push(location);
    }

    return(
      <div className="body d-flex flex-column justify-content-center align-items-center">
        <form onSubmit={handleSubmit(onSubmit)} method="post" className="registration-form d-flex flex-column justify-content-around p-5">
            <div className="text-center">
              <h1>Registration</h1>
            </div>
            <div className="d-grid">
              <label for="name"><b>Name</b></label>
              <input className="registration-input" type="text" placeholder="Enter Your Name" {...register("name")} required/>
            </div>
            <div className="d-grid">
              <label for="email"><b>Email Id</b></label>
              <input className="registration-input" type="email" placeholder="Enter Email Id" {...register("email")} required/>
            </div>
            <div className="d-grid">
              <label for="mobileNumber"><b>Mobile Number</b></label>
              <input className="registration-input" type="number" placeholder="Enter mobile Number" {...register("mobileNumber")} required/>
            </div>
            <div className="d-grid">
              <label for="password"><b>Password</b></label>
              <input className="registration-input" type="password" placeholder="Enter Password" {...register("password")} required/>
            </div>
            <div className="d-grid">
              <label for="confirmPassword"><b>Confirm Password</b></label>
              <input className="registration-input" type="password" placeholder="Enter Confirm Password" {...register("confirmPassword")} required/>
            </div>
            <input className="registration-button" type="submit"/>
        </form>
        {message ? <div>You are {message}</div> : <div>You are not registerd yet</div>}
      </div>
    );
};

export default Registration;