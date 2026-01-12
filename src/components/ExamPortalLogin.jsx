import React, { useState, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { studentLogin, lecturerLogin } from '../Features/Slice';
import { Context } from './Context';

/* ================= STYLES ================= */

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
  max-width: 420px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px;
`;

const Title = styled.h2`
  text-align: center;
  color: green;
  margin-bottom: 20px;
`;

const RoleBox = styled.div`
  display: flex;
  gap: 15px;
`;

const RoleButton = styled.button`
  flex: 1;
  padding: 14px;
  border-radius: 8px;
  border: 2px solid green;
  background: ${({ active }) => (active ? 'green' : 'white')};
  color: ${({ active }) => (active ? 'white' : 'green')};
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background: green;
    color: white;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: green;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: darkorange;
  }
`;

const BackBtn = styled.p`
  text-align: center;
  color: green;
  cursor: pointer;
  margin-top: 12px;
`;

/* ================= COMPONENT ================= */

const ExamPortalLogin = () => {
  const [role, setRole] = useState(null); // "student" | "lecturer"
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setActiveMenu } = useContext(Context);

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
      didOpen: () => Swal.showLoading(),
    });

    try {
      /* ================= STUDENT ================= */
      if (role === 'student') {
        const res = await axios.post(
          'https://www.cwmsrfupre.com.ng/api/student_login.php',
          { email, password }
        );

        if (!res.data.success) throw new Error(res.data.error);

        dispatch(
          studentLogin({
            studentInfo: res.data.student,
            studentToken: res.data.token,
          })
        );

        Swal.fire('Success', res.data.message, 'success');
        navigate('/studentdashboard');
        setActiveMenu('exams');
      }

      /* ================= LECTURER ================= */
      if (role === 'lecturer') {
        const res = await axios.post(
          'https://www.cwmsrfupre.com.ng/api/lecturer_login.php',
          { email, password }
        );

        if (!res.data.success) throw new Error(res.data.error);

        dispatch(
          lecturerLogin({
            lecturerInfo: res.data.user,
            lecturerToken: res.data.token,
          })
        );

        Swal.fire('Success', res.data.message, 'success');
        navigate('/lecturer');
        setActiveMenu('exams')
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message || 'Server error',
      });
    }
  };

  return (
    <PageContainer>
      <Card>
        {/* ================= ROLE SELECT ================= */}
        {!role && (
          <>
            <Title>Login As</Title>
            <RoleBox>
              <RoleButton onClick={() => setRole('student')}>
                Student
              </RoleButton>
              <RoleButton onClick={() => setRole('lecturer')}>
                Lecturer
              </RoleButton>
            </RoleBox>
          </>
        )}

        {/* ================= LOGIN FORM ================= */}
        {role && (
          <>
            <Title>{role === 'student' ? 'Student Login' : 'Lecturer Login'}</Title>

            <form onSubmit={handleLogin}>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button type="submit">Login</Button>
            </form>

            <BackBtn onClick={() => setRole(null)}>
              ← Change login type
            </BackBtn>

            {/* <BackBtn
              onClick={() =>
                navigate(
                  role === 'student'
                    ? '/studentforgotpassword'
                    : '/lecturerforgotpassword'
                )
              }
            >
              Forgot Password?
            </BackBtn> */}
          </>
        )}
      </Card>
    </PageContainer>
  );
};

export default ExamPortalLogin;
