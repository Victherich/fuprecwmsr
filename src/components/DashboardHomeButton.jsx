
// DashboardHomeButton.jsx
import React from "react";
import styled from "styled-components";
import { FaHome } from "react-icons/fa";

const ButtonWrapper = styled.div`
  position: fixed;
  top: 80px;
  right: 5px;
  z-index: 200;
  display: flex;
  align-items: center;
  background: #006400;
  color: white;
  border-radius: 30px;
  padding: 8px 14px;
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  transition: all 0.3s ease;

  &:hover {
    background: #004d00;
    transform: translateY(-2px);
  }

  @media(max-width:768px){
    top: 70px;
    right: 15px;
    padding: 6px 12px;
    font-size: 0.8rem;
  }
`;

const Icon = styled(FaHome)`
  margin-right: 6px;
`;

const DashboardHomeButton = ({ onGoHome }) => {
  return (
    <ButtonWrapper onClick={onGoHome}>
      <Icon /> Dashboard Home
    </ButtonWrapper>
  );
};

export default DashboardHomeButton;
