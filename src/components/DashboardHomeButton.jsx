// DashboardHomeButton.jsx
import React, { useContext } from "react";
import styled from "styled-components";
import { FaHome, FaCalendarAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Context } from "./Context";
import { useLocation } from "react-router-dom";

const ButtonWrapper = styled.div`
  position: fixed;
  top: 20px;
  right: 5px;
  z-index: 200;
  display: flex;
  flex-direction:column;
  align-items: center;
  text-align:center;
  gap: 8px;
  background: #006400;
  color: white;
  border-radius: 20px;
  padding: 6px 10px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(0, 100, 0, 0.25);
  transition: all 0.3s ease;
width:100px;
  &:hover {
    background: #004d00;
    transform: translateY(-2px);
    box-shadow: 0 5px 14px rgba(0, 100, 0, 0.35);
  }

  @media(max-width: 768px) {
    top: 50px;
    right: 5px;
    padding: 5px 10px;
    font-size: 0.8rem;
  }
`;

const HomeSection = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const SemesterBadge = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.3px;
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const DashboardHomeButton = ({ onGoHome }) => {
  const studentInfo = useSelector((state) => state.studentInfo);
  const semesterId = studentInfo?.selected_semester || 1;
  const location = useLocation();
  
  // Pulling semesters list from your Context provider
  const { semesters } = useContext(Context);

  // Find the matching semester abb from the context list, fallback to ID if not found
  const currentSemester = semesters?.find(
    (sem) => sem.id == semesterId || sem.semester_id == semesterId
  );
  
  const semesterName = currentSemester?.abb

  return (
    <ButtonWrapper onClick={onGoHome}>
      <HomeSection >
        {/* <FaHome />  */}
        Dash Home
      </HomeSection>
    {window.location.pathname!=="/admin"&&  <SemesterBadge>

        {semesterName}
      </SemesterBadge>}
    </ButtonWrapper>
  );
};

export default DashboardHomeButton;