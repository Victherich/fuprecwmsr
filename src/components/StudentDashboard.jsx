

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
// import ManagementUserDetails from './ManagementUserDetails';
import Swal from 'sweetalert2';
import { studentLogout } from '../Features/Slice';
import AdminDetailsPage from './AdminProfile';
import AllAdmin from './AllAdmin';
import AllStudents from './AllStudents';
import StudentProfile from './StudentProfile';
import StudentProfile2 from './StudentProfile2';
import EnrollPage from './EnrollmentPage';
import StudentResult2 from './StudentResult2';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Announcements from './Announcements';
import StudentAssignments from './StudentAssignments';
import StudentLectureNotes from './StudentLectureNotes';
import StudentOnlineClass from './StudentOnlineClass';
import EmailPage from './EmailPage';
import ForumPage from './ForumPage';
import DashboardHomeButton from './DashboardHomeButton';
import StudentSubmissions from './StudentSubmissions';
import StudentClockIn from './StudentClockIn';
import ActiveAttendancePage from './ActiveAttendancePage';
import StudentVideoLessons from './StudentVideoLessons';
import GeneralAssets from './GeneralAssets';
import AssessmentAndFeedbacks from './AssessmentAndFeedbacks';
import StudentExams from './StudentExams';
// import Departments from './Departments';
// import Classes from './Classes';
// import Subjects from './Subjects';
// import Students from './Students';
// import Semesters from './SemesterOrTerms';
// import SearchStudent from './SearchStudent';
// import SchoolFees from './SchoolFees';
// import CurrentSemesterOrTerm from './CurrentSemesterOrTerm';
// import StudentsByClass from './StudentsByClass';
// import ManagementAnnouncements from './ManagementAnnouncements';
// import ManageFeesPayments from './ManageFeesPayments';
// import StudentSignup from './StudentSignup';
// import SchoolWeekManager from './SchoolTermCalender';
// import SchoolManagementSignup from './SchoolManagementSignup';
// import TeacherSignup from './TeacherSignup';
// import TeacherList from './AllTeachers';
// import StudentFeedbacks from './StudentFeedbacks';
// import TeacherFeedbacks from './TeacherFeedbacks';

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
const StudentDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('profile');
  const studentInfo = useSelector(state=>state.studentInfo)
  const location = useLocation();
  const [student, setStudent]=useState({});
  const studentId = studentInfo.id;
  const [error, setError]=useState('');

  console.log(student)
  
  
  // console.log(managementInfo)

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
        dispatch(studentLogout());
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
        return <StudentProfile2 
        studentId={studentInfo.id}
            onNavigate={handleMenuClick}
    onLogout={handleLogout}
        />;
        case 'alladmin':
        return <AllAdmin />;
        case 'enrollment':
        return <EnrollPage studentId={studentInfo.id}/>;
        case 'myresults':
        return <StudentResult2 studentId={studentInfo.id} />;
        case 'announcements':
        return <Announcements />;
        case 'assignments':
        return <StudentAssignments studentId={studentInfo.id}/>;
        case 'lecturenotes':
        return <StudentLectureNotes studentId={studentId}/>;
        case 'onlineclass':
        return <StudentOnlineClass/>;
            case 'email':
        return <EmailPage userEmail={studentInfo.email} user={studentInfo}/>;

        
                 case 'forum':
        return <ForumPage userEmail={student.email} user={student}/>;

             case 'submissions':
        return <StudentSubmissions/>;

           case 'clockin':
        return <ActiveAttendancePage userId={studentInfo.id} userType={"student"} />;

          case 'videolessons':
        return <StudentVideoLessons studentId={studentInfo.id}/>;


          case 'generalassets':
                return <GeneralAssets/>;

         case 'feedback':
                return <AssessmentAndFeedbacks/>;

                   case 'exams':
                return <StudentExams studentId={studentInfo.id}/>;

      default:
        return <h1 style={{color:"green",textAlign:"center",width:"100%"}}>Welcome to your Dashboard</h1>;
    }
  };

// get studen info
useEffect(() => {
    if (!studentId) return;

    axios.get(`https://www.cwmsrfupre.com.ng/api/get_student_by_id.php?id=${studentId}`)
      .then(res => {
        if (res.data.success) {
          setStudent(res.data.student);
        //   console.log(res.data.student)
        
        } else {
          setError(res.data.error);
        }
      })
      .catch(() => {
        setError('Failed to fetch admin details.');
      });
  }, [studentId]);


// run suspended ui
  useEffect(()=>{
    if(location.pathname==='/studentdashboard'&&student.suspension==="suspended"){
        Swal.fire({
            icon:"warning",
            title:"Suspended",
            text:"You have been suspended, kindly contact the management.",
            allowOutsideClick:false,
            confirmButtonText:"Logout",
        }).then((result)=>{if(result.isConfirmed){
            dispatch(studentLogout());
        }})
    } else if(location.pathname==='/studentdashboard'&&student.status==="applied"){
 Swal.fire({
            icon:"warning",
            // title:"Suspended",
            text:"You are no longer admitted, kindly contact the management.",
            allowOutsideClick:false,
            confirmButtonText:"Logout",
        }).then((result)=>{if(result.isConfirmed){
            dispatch(studentLogout());
        }})
    } else if(location.pathname==='/studentdashboard'&&student.status==="graduated"){
 Swal.fire({
            icon:"warning",
            // title:"Suspended",
            text:"You have already graduated, kindly contact the management.",
            allowOutsideClick:false,
            confirmButtonText:"Logout",
        }).then((result)=>{if(result.isConfirmed){
            dispatch(studentLogout());
        }})
    }
  },[student])

  return (
    <DashboardContainer>
      <Hamburger onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </Hamburger>
      <Overlay isOpen={menuOpen} onClick={closeMenuOnOutsideClick} />
      <Sidebar isOpen={menuOpen}>
        <SidebarHeader>Student Dashboard</SidebarHeader>
        <SidebarMenu>
       
          <SidebarMenuItem
            active={activeMenu === 'profile'}
            onClick={() => handleMenuClick('profile')}
          >
            Hi, {studentInfo.name}
          </SidebarMenuItem>

         {/* <SidebarMenuItem
            active={activeMenu === 'alladmin'}
            onClick={() => handleMenuClick('alladmin')}
          >
            Admins
          </SidebarMenuItem> */}

          <SidebarMenuItem
            active={activeMenu === 'enrollment'}
            onClick={() => handleMenuClick('enrollment')}
          >
            Enrollments
          </SidebarMenuItem>

          {/* <SidebarMenuItem
            active={activeMenu === 'myresults'}
            onClick={() => handleMenuClick('myresults')}
          >
            My Results
          </SidebarMenuItem> */}
   

          <SidebarMenuItem
            active={activeMenu === 'announcements'}
            onClick={() => handleMenuClick('announcements')}
          >
            Announcements
          </SidebarMenuItem>
  
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

          <SidebarMenuItem
            active={activeMenu === 'onlineclass'}
            onClick={() => handleMenuClick('onlineclass')}
          >
            Student Online Class
          </SidebarMenuItem>

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
{/*
          <SidebarMenuItem
            active={activeMenu === 'studentsByClass'}
            onClick={() => handleMenuClick('studentsByClass')}
          >
            Students by Class
          </SidebarMenuItem>

          <SidebarMenuItem
            active={activeMenu === 'registerStudent'}
            onClick={() => handleMenuClick('registerStudent')}
          >
            Register Student
          </SidebarMenuItem>

          <SidebarMenuItem
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

export default StudentDashboard;

