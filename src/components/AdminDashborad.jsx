



import React, { useState } from 'react';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import Swal from 'sweetalert2';
import { adminLogout } from '../Features/Slice';
import AdminDetailsPage from './AdminProfile';
import AllAdmin from './AllAdmin';
import AllStudents from './AllStudents';
import LecturerScoring from './LecturerScoring';
import Announcements from './Announcements';
import LiveLecture from './LiveLecture';
import PostAssignment from './Assignments.jsx';
import PostLectureNotes from './PostLectureNotes.jsx';
import LecturerOnlineClass from './LecturerOnlineClass.jsx';
import MeetingLinkUploader from './MeetingLinkUploader.jsx';
import AdminSignup from './AdminSignUp.jsx';
import AccessCodeManager from './AccessCodeManager';
import AllLecturers from './AllLecturers';
import EmailPage from './EmailPage.jsx';
import ForumPage from './ForumPage.jsx';
import DashboardHomeButton from './DashboardHomeButton.jsx';


// Styled Components
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  // background: #f8f9fa;
  overflow: hidden;
`;

const Sidebar = styled.div`
  // background: #4caf50;
  // background:rgba(128,0,128,0.3);
  // background:rgba(255,0,43,0.2);
  background:#F4F4F4;
  color: white;
  width: ${(props) => (props.isOpen ? '250px' : '0')};
  overflow: hidden;
  transition: width 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  min-height:100vh;
  z-index: 100;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  // width:300px;

  @media (min-width: 768px) {
    width: 250px;
    position: static;
    transition: none;
  }
`;

const SidebarHeader = styled.div`
  padding: 20px;
  font-size: 1.5rem;
  text-align: center;
  font-weight: bold;
  color:green;
  // background: #3b8d41;
`;

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SidebarMenuItem = styled.li`
  padding: 15px 20px;
  cursor: pointer;
  background: ${(props) => (props.active ? 'lightgreen;' : 'transparent')};
  color: ${(props)=>(props.active ? 'white':"green")};
  // color:white;

  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  transition: all 0.3s ease-in-out;

  &:hover {
    // background: #3b8d41;
    background:lightgreen;
  }
`;

const ContentArea = styled.div`
  flex-grow: 1;
  margin-left: ${(props) => (props.isOpen ? '250px' : '0')};
  transition: margin-left 0.3s ease-in-out;
  // padding: 20px;
  width:100%;

  @media (min-width: 768px) {
    // margin-left: 250px;
  }
`;

const Hamburger = styled.div`
  position: fixed;
  top: 70px;
  left: 20px;
  // background: #4caf50;
  background:green;
  color: white;
  padding: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 300;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Overlay = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 50;
`;

// Content Components
const HomeContent = () => <h1 style={{color:"purple"}}>Home Content</h1>;
const ProfileContent = () => <h1>Profile Content</h1>;
const SettingsContent = () => <h1>Settings Content</h1>;
const HelpContent = () => <h1>Help Content</h1>;

// Main Component
const SchoolManagementDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('profile');
  const adminInfo = useSelector(state=>state.adminInfo)
  
  console.log(adminInfo)

  const dispatch = useDispatch();


  
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      text: "You will need to log in again to access your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform the logout actions
        dispatch(adminLogout());
        Swal.fire({
          title: "Logged Out",
          text: "You have been logged out successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
  
      
      }
    });
  };
  



  const handleMenuClick = (menu) => {
    window.scroll(0,0);
    setActiveMenu(menu);
    setMenuOpen(false); // Close menu on mobile when a menu item is clicked
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const closeMenuOnOutsideClick = () => setMenuOpen(false);

  // Map menu options to content
  const renderContent = () => {
    switch (activeMenu) {
      case 'profile':
        return <AdminDetailsPage 
   
          adminId={adminInfo.id} 
  onNavigate={handleMenuClick}
  onLogout={handleLogout}
        />;

        case 'alladmin':
        return <AllAdmin />;

        case 'alllecturers':
        return <AllLecturers />;
        case 'allstudents':
        return <AllStudents />;
        case 'scoring':
        return <LecturerScoring />;
        case 'announcements':
        return <Announcements />;
        case 'LiveLecture':
          return <LecturerOnlineClass lecturerId={adminInfo.id}/>
        // return <LiveLecture roomName={adminInfo.name} userName={adminInfo.name} />;
        case 'assignments':
        return <PostAssignment/>;
        case 'lecturenotes':
        return <PostLectureNotes />;
      case 'meetinglinkupload':
        return <MeetingLinkUploader lecturerId={adminInfo.id}/>;

         case 'manageaccesscode':
        return <AccessCodeManager/>;

        case 'adminsignup':
        return <AdminSignup/>;

         case 'email':
        return <EmailPage userEmail={adminInfo.email} user={adminInfo}/>;

           case 'forum':
        return <ForumPage userEmail={adminInfo.email} user={adminInfo}/>;
      
      default:
        return <h1 style={{color:"green",textAlign:"center",width:"100%"}}>Welcome to your Dashboard</h1>;
    }
  };

  return (
    <DashboardContainer>
      <Hamburger onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </Hamburger>
      <Overlay isOpen={menuOpen} onClick={closeMenuOnOutsideClick} />
      <Sidebar isOpen={menuOpen}>
        <SidebarHeader>Admin Dashboard</SidebarHeader>
        <SidebarMenu>
       
          <SidebarMenuItem
            active={activeMenu === 'profile'}
            onClick={() => handleMenuClick('profile')}
          >
            Hi, {adminInfo.name}
          </SidebarMenuItem>

         <SidebarMenuItem
            active={activeMenu === 'alladmin'}
            onClick={() => handleMenuClick('alladmin')}
          >
            Admins
          </SidebarMenuItem>

          <SidebarMenuItem
            active={activeMenu === 'alllecturers'}
            onClick={() => handleMenuClick('alllecturers')}
          >
            Lecturers
          </SidebarMenuItem>

          <SidebarMenuItem
            active={activeMenu === 'allstudents'}
            onClick={() => handleMenuClick('allstudents')}
          >
            All Students
          </SidebarMenuItem>
 
          {/* <SidebarMenuItem
            active={activeMenu === 'scoring'}
            onClick={() => handleMenuClick('scoring')}
          >
            Scoring
          </SidebarMenuItem> */}
   

          <SidebarMenuItem
            active={activeMenu === 'announcements'}
            onClick={() => handleMenuClick('announcements')}
          >
            Announcements
          </SidebarMenuItem>
 
          {/* <SidebarMenuItem
            active={activeMenu === 'LiveLecture'}
            onClick={() => handleMenuClick('LiveLecture')}
          >

            LiveLecture
          </SidebarMenuItem> */}

          {/* <SidebarMenuItem
            active={activeMenu === 'assignments'}
            onClick={() => handleMenuClick('assignments')}
          >

            Assignments
          </SidebarMenuItem> */}

          {/* <SidebarMenuItem
            active={activeMenu === 'lecturenotes'}
            onClick={() => handleMenuClick('lecturenotes')}
          >
            Lecture Notes
          </SidebarMenuItem> */}

         {/* {adminInfo?.name?.trim()==="Esther Nnenna Esom" &&<SidebarMenuItem
            active={activeMenu === 'meetinglinkupload'}
            onClick={() => handleMenuClick('meetinglinkupload')}
          >
            Upload Meeting Link
          </SidebarMenuItem>} */}

           <SidebarMenuItem
            active={activeMenu === 'manageaccesscode'}
            onClick={() => handleMenuClick('manageaccesscode')}
          >
            Manage Access Codes
          </SidebarMenuItem>

          <SidebarMenuItem
            active={activeMenu === 'email'}
            onClick={() => handleMenuClick('email')}
          >
            Emails
          </SidebarMenuItem>

          {/* <SidebarMenuItem
            active={activeMenu === 'adminsignup'}
            onClick={() => handleMenuClick('adminsignup')}
          >
            Register Admin
          </SidebarMenuItem> */}

  {/*        <SidebarMenuItem
            active={activeMenu === 'registerTeacher'}
            onClick={() => handleMenuClick('registerTeacher')}
          >
            Register Teacher
          </SidebarMenuItem>

          <SidebarMenuItem
            active={activeMenu === 'registerAdmin'}
            onClick={() => handleMenuClick('registerAdmin')}
          >
            Register Admin / Management staff
          </SidebarMenuItem>

          <SidebarMenuItem
            active={activeMenu === 'schoolCalender'}
            onClick={() => handleMenuClick('schoolCalender')}
          >
           School week Manager / Calender
          </SidebarMenuItem>

          <SidebarMenuItem
            active={activeMenu === 'studentsFeedbacks'}
            onClick={() => handleMenuClick('studentsFeedbacks')}
          >
           Students Feedbacks
          </SidebarMenuItem>

          <SidebarMenuItem
            active={activeMenu === 'teachersFeedbacks'}
            onClick={() => handleMenuClick('teachersFeedbacks')}
          >
           Teachers Feedbacks
          </SidebarMenuItem> */}

           <SidebarMenuItem
            active={activeMenu === 'forum'}
            onClick={() => handleMenuClick('forum')}
          >
            Forum
          </SidebarMenuItem>
          
          <SidebarMenuItem
            onClick={handleLogout}
          >
            Logout
          </SidebarMenuItem>
        </SidebarMenu>
      </Sidebar>
      <DashboardHomeButton onGoHome={() => setActiveMenu('profile')} />

      <ContentArea isOpen={menuOpen}>{renderContent()}</ContentArea>
    </DashboardContainer>
  );
};

export default SchoolManagementDashboard;

