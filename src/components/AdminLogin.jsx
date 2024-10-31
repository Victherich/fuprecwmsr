import React, { useState } from 'react';
import '../CSS/AdminLogin.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import ClipLoader from 'react-spinners/ClipLoader';
import Logo from '../Images/logo.jpeg';
import { adminLogin } from '../Features/Slice';
import { useDispatch, useSelector } from 'react-redux';

const AdminLogin = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  
  const adminToken = useSelector(state => state.adminToken); // Adjust this to match your root reducer key
  console.log(adminToken);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'email' ? value.toLowerCase() : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post('https://vinrichards.com/api2/admin_login.php', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("Login Response:", response.data);

      if (response.data.success) {
        if (response.data.message === 'Please verify your email address.') {
          Swal.fire({
            icon: 'info',
            title: 'Email Not Verified',
            text: response.data.error,
            showConfirmButton: true,
            confirmButtonText: 'Ok'
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: response.data.message,
            showConfirmButton: false,
            timer: 2000
          });

          const adminInfo = response.data.user;
          const adminToken = response.data.token;

          // Dispatch login action with a single object containing both adminInfo and adminToken
          dispatch(adminLogin({ adminInfo, adminToken }));

          navigate('/admin');
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: response.data.error,
        });
      }
    } catch (error) {
      console.error("Login Error:", error);

      let errorMessage = 'An error occurred. Please try again.';
      if (error.response) {
        if (error.response.data && error.response.data.error) {
          errorMessage = error.response.data.error;
        } else if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else {
          errorMessage = 'Unexpected error from server.';
        }
      } else if (error.request) {
        errorMessage = 'No response from server. Please check your internet connection.';
      } else {
        errorMessage = error.message;
      }

      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='ContactFormWrap' key={location.pathname}>
      <div className='contact-form-container'>
        <h2>Admin Login</h2>
        <img src={Logo} alt='Logo' style={{ position: 'relative', width: '70px' }} />
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: '10px', top: '65%', cursor: 'pointer', transform: 'translateY(-50%)' }}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
          <button type='submit' disabled={isSubmitting}>
            {isSubmitting ? (
              <ClipLoader color={'#ffffff'} loading={isSubmitting} size={15} />
            ) : (
              'Login'
            )}
          </button>
        </form>
        <p style={{ marginTop: '10px', position: 'relative', cursor: 'pointer', color: 'orange' }} onClick={() => navigate('/adminforgotpassword')}>
          Forgot Password
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
