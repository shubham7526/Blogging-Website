import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Api from '../../api/helper';

import 'bootstrap/dist/css/bootstrap.min.css';
import './contact-us.css';

const ContactUs = ()=> {
    const { register, handleSubmit } = useForm();
    const [message, setMessage] = useState("");

    const onSubmit = async(data, evt) => {     

      const {headers:{message}} = await Api.post({url:"/contact", data});

      setMessage(message);
      evt.target.reset();
    }


  return (
    <div className="body d-flex flex-column justify-content-center align-items-center">
      <form onSubmit={handleSubmit(onSubmit)} method="post" className="contact-form d-flex flex-column justify-content-around p-5">
          <div className="text-center"><h1>Contact Us</h1></div>
          <div className="d-grid">
            <label for="name"><b>Name</b></label>
            <input className="contact-input" type="text" placeholder="Enter your name" {...register("name")} required/>
          </div>
          <div className="d-grid">
            <label for="email"><b>Email</b></label>
            <input className="contact-input" type="email" placeholder="Enter your email" {...register("email")} required/>
          </div>
          <div className="d-grid">
            <label for="mobileNumber"><b>Mobile Number</b></label>
            <input className="contact-input" type="number" placeholder="Enter your mobile number" {...register("mobileNumber")} required/>
          </div>
          <div>
            <textarea className="contact-input contact-message" type="text" placeholder="Write your message ....." {...register("message")} required/>
          </div>
          <input className="contact-button " type="submit"/>
      </form>
      {message ? <div>You have {message}</div> : <div></div>}
    </div>
  );
}

export default ContactUs;
