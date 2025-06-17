
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import VerifyAccessCodeForLecturerSignUp from './VerifyAccessCodeForLecturerSignUp'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: white;
`;

const FormWrapper = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  // box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: green;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #eee;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 1rem;

  &:focus {
    border-color: orange;
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #eee;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 1rem;

  &:focus {
    border-color: green;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  background: green;
  color: white;
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: orange;
  }
`;

const LecturerSignup = () => {
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    confirmEmail: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Validation
    if (form.email !== form.confirmEmail) {
      return Swal.fire('Error', 'Emails do not match', 'error');
    }

    if (form.password !== form.confirmPassword) {
      return Swal.fire('Error', 'Passwords do not match', 'error');
    }

    Swal.fire({
      title: 'Please wait...',
      text: 'Creating account...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch('https://www.cwmsrfupre.com.ng/api/lecturer_signup.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire('Success 🎉', data.message, 'success');
        navigate('/lecturerlogin')
        setForm({
          name: '',
          email: '',
          confirmEmail: '',
          phone: '',
          password: '',
          confirmPassword: '',
          role: '',
        });
      } else {
        Swal.fire('Error ❌', data.error || 'Something went wrong.', 'error');
      }
    } catch (err) {
      Swal.fire('Error ❌', 'Could not connect to the server.', 'error');
    }
  };

  if(status!=="existing"){
    return <VerifyAccessCodeForLecturerSignUp status={status} setStatus={setStatus}/>
  }

  return (
    
    <Container>
      <FormWrapper>
        <Title>Lecturer Register</Title>
        <form onSubmit={handleSubmit}>
          <Label>Full Name</Label>
          <Input name="name" value={form.name} onChange={handleChange} required />

          <Label>Email</Label>
          <Input name="email" type="email" value={form.email} onChange={handleChange} required />

          <Label>Confirm Email</Label>
          <Input name="confirmEmail" type="email" value={form.confirmEmail} onChange={handleChange} required />

          <Label>Phone Number</Label>
          <Input name="phone" value={form.phone} onChange={handleChange} required />

          <Label>Password</Label>
          <Input name="password" type="password" value={form.password} onChange={handleChange} required />

          <Label>Confirm Password</Label>
          <Input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} required />

          <Label>Role</Label>
<Select name="role" value={form.role} onChange={handleChange} required>
  <option value="" disabled>--Select Role--</option> {/* Default empty option */}
  {/* <option value="Admin">Admin</option> */}
  <option value="Lecturer">Lecturer</option>
</Select>


          <Button type="submit">Create Account</Button>
          <p 
        style={{marginTop:"10px", cursor:"pointer"}}
        onClick={()=>navigate('/lecturerlogin')}>Already have an account? Login</p>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default LecturerSignup;
