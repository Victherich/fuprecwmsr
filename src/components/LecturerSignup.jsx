
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
    // email: '',
    // confirmEmail: '',
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

  if (form.password !== form.confirmPassword) {
    return Swal.fire('Error ❌', 'Passwords do not match', 'error');
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
    Swal.close();

    if (data.success) {
      Swal.fire({
        icon: 'success',
        title: 'Account Created 🎉',
        html: `
          <p>Your lecturer account has been created successfully.</p>
          <p><strong>Your login email:</strong></p>
          <p style="color:#2B32B2; font-size:1.2rem;"><b id="generatedEmail">${data.email}</b></p>
          <p>Please use this email with your provided password to login to your lecturer portal.</p>
        `,
        confirmButtonText: 'Copy Email & Go to Portal',
        confirmButtonColor: '#2B32B2',
        allowOutsideClick: false,
      }).then((swalResult) => {
        if (swalResult.isConfirmed) {
          const emailText = document.getElementById("generatedEmail").innerText;

          // Copy email to clipboard
          navigator.clipboard.writeText(emailText).then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Email Copied!',
              text: `Your email (${emailText}) has been copied. You can now login.`,
              confirmButtonText: 'Go to Login',
              confirmButtonColor: '#2B32B2',
              allowOutsideClick: false,
            }).then(() => {
              window.location.href = "https://www.cwmsrfupre.com.ng/lecturerlogin";
            });
          });
        }
      });

      // Reset form after success
      setForm({
        name: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: '',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Signup Failed ❌',
        text: data.error || 'Something went wrong.',
        confirmButtonColor: '#d33',
      });
    }
  } catch (err) {
    Swal.close();
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

          {/* <Label>Email</Label>
          <Input name="email" type="email" value={form.email} onChange={handleChange} required />

          <Label>Confirm Email</Label>
          <Input name="confirmEmail" type="email" value={form.confirmEmail} onChange={handleChange} required /> */}

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
