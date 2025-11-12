

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import Swal from 'sweetalert2';
import { lecturerLogout } from '../Features/Slice';
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
import LecturerDetailsPage from './LecturerProfile';
import EnrollLecturerPage from './LecturerCourseEnrollmentPage';
import AllLecturerStudents from './AllLecturerStudents';
import axios from 'axios';
import EmailPage from './EmailPage.jsx';
import ForumPage from './ForumPage.jsx';
import DashboardHomeButton from './DashboardHomeButton.jsx';
import SubmissionsToLecturer from './SubmissionsToLecturer.jsx';
import ActiveAttendancePage from './ActiveAttendancePage.jsx';
import PostVideoLesson from './PostVideoLesson.jsx';
import GeneralAssets from './GeneralAssets.jsx';
import AssessmentAndFeedbacks from './AssessmentAndFeedbacks.jsx';


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
  widthh:100%;

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
const LecturerDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('profile');
  const lecturerInfo = useSelector(state=>state.lecturerInfo);
  const [admin, setAdmin] = useState({});
  
  console.log(admin)

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
        dispatch(lecturerLogout());
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



const getLecturerById = ()=>{
      if (!lecturerInfo) return;
  
      axios.get(`https://www.cwmsrfupre.com.ng/api/get_lecturer_by_id.php?id=${lecturerInfo.id}`)
        .then(res => {
          if (res.data.success) {
            setAdmin(res.data.user);
          } else {
            // setError(res.data.error);
          }
        })
        .catch(() => {
          // setError('Failed to fetch admin details.');
        });
      }



       useEffect(() => {
getLecturerById();
    }, [lecturerInfo.id]);

    useEffect(()=>{
      const id = setInterval(()=>{
        getLecturerById();
      }, 3*60*1000)

      return ()=>clearInterval(id)
    },[])



 
  



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
        return <LecturerDetailsPage 
        lecturerId={lecturerInfo?.id}
         onNavigate={handleMenuClick}
      onLogout={handleLogout}
        />;
        case 'alladmin':
        return <AllAdmin />;

          case 'enrollment':
        return <EnrollLecturerPage lecturerId={lecturerInfo?.id}/>;
        case 'allstudents':
        return <AllLecturerStudents lecturerId={lecturerInfo?.id}/>;
        case 'scoring':
        return <LecturerScoring />;
        case 'announcements':
        return <Announcements />;
        case 'LiveLecture':
          return <LecturerOnlineClass lecturerId={lecturerInfo.id}/>
        // return <LiveLecture roomName={adminInfo.name} userName={adminInfo.name} />;
        case 'assignments':
        return <PostAssignment/>;
        case 'lecturenotes':
        return <PostLectureNotes />;
      case 'meetinglinkupload':
        return <MeetingLinkUploader lecturerId={lecturerInfo.id}/>;
        case 'adminsignup':
        return <AdminSignup/>;
          case 'email':
        return <EmailPage userEmail={lecturerInfo.email} user={lecturerInfo}/>;

             case 'forum':
        return <ForumPage userEmail={lecturerInfo.email} user={lecturerInfo}/>;

              case 'submissions':
        return <SubmissionsToLecturer lecturerId={lecturerInfo.id}/>;

         case 'clockin':
                return <ActiveAttendancePage userId={lecturerInfo.id} userType={"lecturer"} />;

        case 'managevideolessons':
                return <PostVideoLesson/>;

                  case 'generalassets':
                        return <GeneralAssets/>;

                         case 'feedback':
                        return <AssessmentAndFeedbacks/>;
      
      default:
        return <h1 style={{color:"green",textAlign:"center",width:"100%"}}>Welcome to your Dashboard</h1>;
    }
  };



     if (admin.suspension==='suspended'){

      return (<div style={{display:"flex", flexDirection:"column", width:"100%",height:"500px", gap:"30px", justifyContent:"center", alignItems:"center"}}>
        <h3 style={{color:"#333"}}>Your account has been suspended , Please contact the management</h3>
        <button style={{color:"white", backgroundColor:"green", cursor:"pointer", border:"none", padding:"15px"}} onClick={()=>dispatch(lecturerLogout())}>Logout</button>
      </div>)
    }

  return (
    <DashboardContainer>
      <Hamburger onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </Hamburger>
      <Overlay isOpen={menuOpen} onClick={closeMenuOnOutsideClick} />
      <Sidebar isOpen={menuOpen}>
        <SidebarHeader>Lecturer Dashboard</SidebarHeader>
        <SidebarMenu>
       
          <SidebarMenuItem
            active={activeMenu === 'profile'}
            onClick={() => handleMenuClick('profile')}
          >
            Hi, {lecturerInfo.name}
          </SidebarMenuItem>

         {/* <SidebarMenuItem
            active={activeMenu === 'alladmin'}
            onClick={() => handleMenuClick('alladmin')}
          >
            Lecturers / Admins
          </SidebarMenuItem> */}

          <SidebarMenuItem
            active={activeMenu === 'enrollment'}
            onClick={() => handleMenuClick('enrollment')}
          >
            Enrollment
          </SidebarMenuItem>

          <SidebarMenuItem
            active={activeMenu === 'allstudents'}
            onClick={() => handleMenuClick('allstudents')}
          >
            Students
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
 
          <SidebarMenuItem
            active={activeMenu === 'LiveLecture'}
            onClick={() => handleMenuClick('LiveLecture')}
          >

            LiveLecture
          </SidebarMenuItem>

          {/* <SidebarMenuItem
            active={activeMenu === 'assignments'}
            onClick={() => handleMenuClick('assignments')}
          >

            Assignments
          </SidebarMenuItem> */}

          <SidebarMenuItem
            active={activeMenu === 'lecturenotes'}
            onClick={() => handleMenuClick('lecturenotes')}
          >
            Lecture Notes
          </SidebarMenuItem>

         {lecturerInfo?.name?.trim()==="Esther Nnenna Esom" &&<SidebarMenuItem
            active={activeMenu === 'meetinglinkupload'}
            onClick={() => handleMenuClick('meetinglinkupload')}
          >
            Upload Meeting Link
          </SidebarMenuItem>}

          
   <SidebarMenuItem
            active={activeMenu === 'email'}
            onClick={() => handleMenuClick('email')}
          >
            Emails
          </SidebarMenuItem>

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

export default LecturerDashboard;

