// import React, { useContext, useState } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import styled from 'styled-components';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { studentLogin } from '../Features/Slice'; // Update path if needed
// import { Context } from './Context';

// // Styled Components
// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   background-color: white;
//   color: green;
// `;

// const Form = styled.form`
//   background-color: white;
//   padding: 20px;
//   border-radius: 10px;
//   width: 100%;
//   max-width: 400px;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 12px;
//   margin: 10px 0;
//   border-radius: 5px;
//   border: 1px solid #ddd;
//   font-size: 16px;
// `;

// const Button = styled.button`
//   width: 100%;
//   padding: 12px;
//   background-color: green;
//   color: white;
//   border-radius: 5px;
//   font-size: 16px;
//   cursor: pointer;
//   border: none;
//   &:hover {
//     background-color: darkorange;
//   }
// `;

// const Label = styled.label`
//   font-size: 18px;
//   font-weight: bold;
//   margin-bottom: 5px;
// `;

// const Title = styled.h2`
//   text-align: center;
// `;

// const StudentLogin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { possible_levels_for_studnet_login} = useContext(Context)

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Missing fields',
//         text: 'Email and password are required.',
//       });
//       return;
//     }

//     Swal.fire({
//       title: 'Logging in...',
//       text: 'Please wait...',
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     try {
//       const res = await axios.post('https://www.cwmsrfupre.com.ng/api/student_login.php', {
//         email: email,
//         password: password,
//       });

//       if (res.data.success) {
//         Swal.fire({
//           icon: 'success',
//           title: 'Login Successful',
//           text: res.data.message,
//         });

//         const studentInfo = res.data.student;
//         const studentToken = res.data.token;

//         dispatch(studentLogin({ studentInfo, studentToken }));
//         navigate('/studentdashboard');
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Login Failed',
//           text: res.data.error,
//         });
//       }
//     } catch (error) {
//       console.error(error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Could not connect to server.',
//       });
//     }
//   };

//   return (
//     <Container>
//       <Form onSubmit={handleLogin}>
//         <Title>Student Login</Title>
//         <div>
//           <Label>Email</Label>
//           <Input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             required
//           />
//         </div>
//         <div>
//           <Label>Password</Label>
//           <Input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter your password"
//             required
//           />
//         </div>
//         <Button type="submit">Login</Button>
//         <p style={{ color: 'green', cursor: 'pointer' }} onClick={() => navigate('/studentforgotpassword')}>
//           Forgot Password?
//         </p>
//       </Form>
//     </Container>
//   );
// };

// export default StudentLogin;



import React, { useContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { studentLogin } from '../Features/Slice';
import { Context } from './Context';

// Styled Components remain the same...

const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('current'); // default
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { possible_levels_for_studnet_login } = useContext(Context);

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
        {
          email,
          password,
          archive_status: selectedLevel, // 🔹 pass selected level-semester
        }
      );

      if (res.data.success) {
        Swal.close();

        const studentInfo = res.data.student;
        const studentToken = res.data.token;

        dispatch(studentLogin({ studentInfo, studentToken }));
        navigate('/studentdashboard');
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
      console.error(error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleLogin}>
        <h2>Student Login</h2>

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

        <Label>Select Semester/Level</Label>
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px',
            border: '1px solid #ddd',
            fontSize: '16px',
          }}
        >
          {possible_levels_for_studnet_login.map((lvl) => (
            <option key={lvl.code} value={lvl.code}>
              {lvl.name}
            </option>
          ))}
        </select>

        <Button type="submit">Login</Button>

        <p
          style={{ color: 'green', cursor: 'pointer' }}
          onClick={() => navigate('/studentforgotpassword')}
        >
          Forgot Password?
        </p>
      </Form>
    </Container>
  );
};

export default StudentLogin;




// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;
  color: green;
`;

const Form = styled.form`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
`;

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
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Title = styled.h2`
  text-align: center;
`;
