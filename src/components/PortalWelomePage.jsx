import React from "react";
import styled, { keyframes } from "styled-components";
import logo from "../Images/logo.png"; // Replace with your actual logo path
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// Background Animation
const moveUpDown = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(15px);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const WelcomeContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  color: white;
  position: relative;
  overflow: hidden;
`;

// Floating Background Elements
const FloatingCircle = styled.div`
  position: absolute;
  width: ${(props) => props.size || "100px"};
  height: ${(props) => props.size || "100px"};
  background: ${(props) => props.color || "rgba(255, 255, 255, 0.1)"};
  border-radius: 50%;
  animation: ${moveUpDown} ${(props) => props.speed || "5s"} infinite alternate ease-in-out;
  top: ${(props) => props.top || "10%"};
  left: ${(props) => props.left || "20%"};
`;

const WelcomeContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 20px;
  animation: ${fadeIn} 1.5s ease-out;


  width:100%; 
`;

const Logo = styled.img`
  width: 150px;
  height: auto;
  margin-bottom: 20px;
  animation: ${moveUpDown} 3s infinite alternate ease-in-out;
  border-radius:50%;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  text-shadow: 4px 4px 10px rgba(255, 255, 255, 0.3);
  margin-bottom: 20px;
  animation: ${fadeIn} 2s ease-in-out;


  @media(max-width:768px){
  font-size:2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  margin-bottom: 30px;
  animation: ${fadeIn} 2.5s ease-in-out;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;


  @media(max-width:768px){
    flex-direction:column;
  }
`;

const Button = styled.a`
  padding: 15px 30px;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  border: 2px solid white;
  border-radius: 5px;
  transition: 0.3s;
  cursor: pointer;
  animation: ${pulse} 2.5s infinite ease-in-out;

  &:hover {
    background: white;
    color: #333;
    transform: scale(1.1);
  }
`;

const StudentButton = styled(Button)`
  background: #007bff;
  border-color: #007bff;

  &:hover {
    background: white;
    color: #007bff;
  }
`;

const LecturerButton = styled(Button)`
  background: #28a745;
  border-color: #28a745;

  &:hover {
    background: white;
    color: #28a745;
  }
`;

const PortalWelcomePage = () => {

  const navigate = useNavigate();


const handleAlert = ()=>{

  Swal.fire({
    title:"Coming soon...",
    icon:"success"
  })
}

  return (
    <WelcomeContainer>
      {/* Floating Background Elements */}
      <FloatingCircle size="120px" color="rgba(255, 255, 255, 0.15)" speed="6s" top="5%" left="80%" />
      <FloatingCircle size="80px" color="rgba(255, 255, 255, 0.1)" speed="4s" top="70%" left="10%" />
      <FloatingCircle size="150px" color="rgba(255, 255, 255, 0.12)" speed="8s" top="50%" left="50%" />

      <WelcomeContent>
        <Logo src={logo} alt="University Logo" />
        <Title>Welcome to the CWMSR Portal</Title>
        <Subtitle>Access your academic resources, courses, and more.</Subtitle>
        <ButtonContainer>
          <StudentButton onClick={()=>navigate ('/studentdashboard')}>Student Portal</StudentButton>
          <LecturerButton onClick={()=>navigate('/admin')}>Admin / Lecturer Portal</LecturerButton>
        </ButtonContainer>
      </WelcomeContent>
    </WelcomeContainer>
  );
};

export default PortalWelcomePage;
