import React, { useContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { studentLogin } from '../Features/Slice';
import { Context } from './Context';

/* ================= PAGE STYLES ================= */

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
`;

const Card = styled.div`
  background: white;
  padding: 25px;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px;
`;

/* ================= FORM STYLES ================= */

const Form = styled.form``;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: green;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: darkorange;
  }
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: green;
`;

const Title = styled.h2`
  text-align: center;
  color: green;
  margin-bottom: 20px;
`;

/* ================= COMPONENT ================= */

const StudentResultPortalLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setActiveMenu } = useContext(Context);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Missing fields',
        text: 'Email and password are required.',
      });
      return;
    }

    Swal.fire({
      title: 'Logging in...',
      text: 'Please wait...',
      didOpen: () => Swal.showLoading(),
    });

    try {
      const res = await axios.post(
        'https://www.cwmsrfupre.com.ng/api/student_login.php',
        { email, password }
      );

      if (res.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: res.data.message,
        });

        dispatch(
          studentLogin({
            studentInfo: res.data.student,
            studentToken: res.data.token,
          })
        );

        // optional: control dashboard menu after login
        // setActiveMenu('exams');

        navigate('/studentdashboard');
        setActiveMenu('myresults')
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: res.data.error,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Could not connect to server.',
      });
    }
  };

  return (
    <PageContainer>
      <Card>
        <Form onSubmit={handleLogin}>
          <Title>Student Login</Title>

          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />

          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <Button type="submit">Login</Button>

          <p
            style={{
              color: 'green',
              cursor: 'pointer',
              marginTop: '12px',
              textAlign: 'center',
            }}
            onClick={() => navigate('/studentforgotpassword')}
          >
            Forgot Password?
          </p>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default StudentResultPortalLogin;
