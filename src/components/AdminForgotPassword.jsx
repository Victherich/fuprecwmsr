// src/ForgotPassword.js
import React, { useContext, useState } from 'react';
import '../CSS/AdminLogin.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';
import axios from 'axios';
import Swal from 'sweetalert2';


const AdminForgotPassword = () => {
  const location = useLocation()
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const [resendLink, setResendLink] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const response = await axios.post("https://vinrichards.com/api2/admin_forgot_password.php", { email });
      setMessage(response.data.message);
      setResendLink(true);
      Swal.fire({
        // icon: 'success',
        text: response.data.message?`${response.data.message} Please check your inbox or spam for reset link`:"Invalid email",
        confirmButtonText: 'Ok'
      });
    } catch (error) {
      console.error('Error during forgot password request:', error);
      let errorMessage = 'An error occurred while processing your request. Please try again.';
  
      if (error.response) {
        const { status, data } = error.response;
        if (status === 404) {
          errorMessage = data.error || 'User not found. Please check your email and try again.';
        } else if (status === 500) {
          errorMessage = 'Server error. Please try again later.';
        }
      }
  
      Swal.fire({
        icon: 'error',
        title: 'Request Failed',
        text: errorMessage,
        confirmButtonText: 'OK'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div className='ContactFormWrap'key={location.pathname} >
      <div className="contact-form-container">
        <h2>Admin Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">
            {isSubmitting ? (
              <ClipLoader color={"#ffffff"} loading={isSubmitting} css={override} size={15} />
            ) : (
              <p>{resendLink ? "Resend link" : "Get link"}</p>
            )}
          </button>
          <p onClick={()=>navigate("/adminlogin")} style={{position:"relative",color:"orange",cursor:"pointer",textDecoration:"underline"}}>Login</p>
        </form>
      </div>
    </div>
  );
};

export default AdminForgotPassword;
