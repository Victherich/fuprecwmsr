

// import React, { useContext, useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { FaBars, FaTimes } from 'react-icons/fa';
// import { useDispatch, useSelector } from 'react-redux';
// // import ManagementUserDetails from './ManagementUserDetails';
// import Swal from 'sweetalert2';
// import { studentLogout } from '../Features/Slice';
// import AdminDetailsPage from './AdminProfile';
// import AllAdmin from './AllAdmin';
// import AllStudents from './AllStudents';
// import StudentProfile from './StudentProfile';
// import StudentProfile2 from './StudentProfile2';
// import EnrollPage from './EnrollmentPage';
// import StudentResult2 from './StudentResult2';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import Announcements from './Announcements';
// import StudentAssignments from './StudentAssignments';
// import StudentLectureNotes from './StudentLectureNotes';
// import StudentOnlineClass from './StudentOnlineClass';
// import EmailPage from './EmailPage';
// import ForumPage from './ForumPage';
// import DashboardHomeButton from './DashboardHomeButton';
// import StudentSubmissions from './StudentSubmissions';
// import StudentClockIn from './StudentClockIn';
// import ActiveAttendancePage from './ActiveAttendancePage';
// import StudentVideoLessons from './StudentVideoLessons';
// import GeneralAssets from './GeneralAssets';
// import AssessmentAndFeedbacks from './AssessmentAndFeedbacks';
// import StudentExams from './StudentExams';
// import { Context } from './Context';


// // Styled Components
// const DashboardContainer = styled.div`
//   display: flex;
//   min-height: 100vh;
//   // background: #f8f9fa;
//   overflow: hidden;
// `;

// const Sidebar = styled.div`
//   // background: #4caf50;
//   // background:rgba(128,0,128,0.3);
//   // background:rgba(255,0,43,0.2);
//   background:#F4F4F4;
//   color: white;
//   width: ${(props) => (props.isOpen ? '250px' : '0')};
//   overflow: hidden;
//   transition: width 0.3s ease-in-out;
//   display: flex;
//   flex-direction: column;
//   position: fixed;
//   height: 100%;
//   min-height:100vh;
//   z-index: 100;
//   box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
//   // width:300px;

//   @media (min-width: 768px) {
//     width: 250px;
//     position: static;
//     transition: none;
//   }
// `;

// const SidebarHeader = styled.div`
//   padding: 20px;
//   font-size: 1.5rem;
//   text-align: center;
//   font-weight: bold;
//   color:green;
//   // background: #3b8d41;
// `;

// const SidebarMenu = styled.ul`
//   list-style: none;
//   padding: 0;
//   margin: 0;
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
// `;

// const SidebarMenuItem = styled.li`
//   padding: 15px 20px;
//   cursor: pointer;
//   background: ${(props) => (props.active ? 'lightgreen;' : 'transparent')};
//   color: ${(props)=>(props.active ? 'white':"green")};
//   // color:white;

//   font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
//   transition: all 0.3s ease-in-out;

//   &:hover {
//     // background: #3b8d41;
//     background:lightgreen;
//   }
// `;

// const ContentArea = styled.div`
//   flex-grow: 1;
//   margin-left: ${(props) => (props.isOpen ? '250px' : '0')};
//   transition: margin-left 0.3s ease-in-out;
//   // padding: 20px;
//   width:100%;

//   @media (min-width: 768px) {
//     // margin-left: 250px;
//   }
// `;

// const Hamburger = styled.div`
//   position: fixed;
//   top: 70px;
//   left: 20px;
//   // background: #4caf50;
//   background:green;
//   color: white;
//   padding: 10px;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   z-index: 300;

//   @media (min-width: 768px) {
//     display: none;
//   }
// `;

// const Overlay = styled.div`
//   display: ${(props) => (props.isOpen ? 'block' : 'none')};
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.5);
//   z-index: 50;
// `;

// // Content Components
// const HomeContent = () => <h1 style={{color:"purple"}}>Home Content</h1>;
// const ProfileContent = () => <h1>Profile Content</h1>;
// const SettingsContent = () => <h1>Settings Content</h1>;
// const HelpContent = () => <h1>Help Content</h1>;

// // Main Component
// const StudentDashboard = () => {

//   const studentInfo = useSelector(state=>state.studentInfo)
//   const location = useLocation();
//   const [student, setStudent]=useState({});
//   const studentId = studentInfo.id;
//   const [error, setError]=useState('');

  

//   const {menuOpen, setMenuOpen, activeMenu,setActiveMenu,handleMenuClick,dhb, api_url}=useContext(Context)


  
  
//   // console.log(managementInfo)

//   const dispatch = useDispatch();


  
//   const handleLogout = () => {
//     Swal.fire({
//       title: "Are you sure you want to log out?",
//       text: "You will need to log in again to access your account.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, log me out",
//       cancelButtonText: "Cancel",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // Perform the logout actions
//         dispatch(studentLogout());
//         Swal.fire({
//           title: "Logged Out",
//           text: "You have been logged out successfully.",
//           icon: "success",
//           timer: 2000,
//           showConfirmButton: false,
//         });
  
      
//       }
//     });
//   };
  



//   // const handleMenuClick = (menu) => {
//   //   window.scroll(0,0);
//   //   setActiveMenu(menu);
//   //   setMenuOpen(false); // Close menu on mobile when a menu item is clicked
//   // };

//   const toggleMenu = () => setMenuOpen((prev) => !prev);

//   const closeMenuOnOutsideClick = () => setMenuOpen(false);

//   // Map menu options to content
//   const renderContent = () => {
//     switch (activeMenu) {
//       case 'profile':
//         return <StudentProfile2 
//         studentId={studentInfo.id}
//         semesterId={studentInfo.selected_semester}
//             onNavigate={handleMenuClick}
//     onLogout={handleLogout}

//         />;
//         case 'alladmin':
//         return <AllAdmin />;
//         case 'enrollment':
//         return <EnrollPage studentId={studentInfo.id}/>;
//         case 'myresults':
//         return <StudentResult2 studentId={studentInfo.id} />;
//         case 'announcements':
//         return <Announcements />;
//         case 'assignments':
//         return <StudentAssignments studentId={studentInfo.id}/>;
//         case 'lecturenotes':
//         return <StudentLectureNotes studentId={studentId}/>;
//         case 'onlineclass':
//         return <StudentOnlineClass/>;
//             case 'email':
//         return <EmailPage userEmail={studentInfo.email} user={studentInfo}/>;

        
//                  case 'forum':
//         return <ForumPage userEmail={student.email} user={student}/>;

//              case 'submissions':
//         return <StudentSubmissions/>;

//            case 'clockin':
//         return <ActiveAttendancePage userId={studentInfo.id} userType={"student"} />;

//           case 'videolessons':
//         return <StudentVideoLessons studentId={studentInfo.id}/>;


//           case 'generalassets':
//                 return <GeneralAssets/>;

//          case 'feedback':
//                 return <AssessmentAndFeedbacks/>;

//                    case 'exams':
//                 return <StudentExams studentId={studentInfo.id}/>;

//       default:
//         return <h1 style={{color:"green",textAlign:"center",width:"100%"}}>Welcome to your Dashboard</h1>;
//     }
//   };

// // get studen info
// useEffect(() => {
//     if (!studentId) return;

//     axios.get(`${api_url}/get_student_by_id.php?id=${studentId}`)
//       .then(res => {
//         if (res.data.success) {
//           setStudent(res.data.student);
//         //   console.log(res.data.student)
        
//         } else {
//           setError(res.data.error);
//         }
//       })
//       .catch(() => {
//         setError('Failed to fetch admin details.');
//       });
//   }, [studentId]);


// // run suspended ui
//   useEffect(()=>{
//     if(location.pathname==='/studentdashboard'&&student.suspension==="suspended"){
//         Swal.fire({
//             icon:"warning",
//             title:"Suspended",
//             text:"You have been suspended, kindly contact the management.",
//             allowOutsideClick:false,
//             confirmButtonText:"Logout",
//         }).then((result)=>{if(result.isConfirmed){
//             dispatch(studentLogout());
//         }})
//     } else if(location.pathname==='/studentdashboard'&&student.status==="applied"){
//  Swal.fire({
//             icon:"warning",
//             // title:"Suspended",
//             text:"You are no longer admitted, kindly contact the management.",
//             allowOutsideClick:false,
//             confirmButtonText:"Logout",
//         }).then((result)=>{if(result.isConfirmed){
//             dispatch(studentLogout());
//         }})
//     } else if(location.pathname==='/studentdashboard'&&student.status==="graduated"){
//  Swal.fire({
//             icon:"warning",
//             // title:"Suspended",
//             text:"You have already graduated, kindly contact the management.",
//             allowOutsideClick:false,
//             confirmButtonText:"Logout",
//         }).then((result)=>{if(result.isConfirmed){
//             dispatch(studentLogout());
//         }})
//     }
//   },[student])

//   return (
//     <DashboardContainer>
//       <Hamburger onClick={toggleMenu}>
//         {menuOpen ? <FaTimes /> : <FaBars />}
//       </Hamburger>
//       <Overlay isOpen={menuOpen} onClick={closeMenuOnOutsideClick} />
//       <Sidebar isOpen={menuOpen}>
//         <SidebarHeader>Student Dashboard</SidebarHeader>
//         <SidebarMenu>
       
//           <SidebarMenuItem
//             active={activeMenu === 'profile'}
//             onClick={() => handleMenuClick('profile')}
//           >
//             Hi, {studentInfo.name}
//           </SidebarMenuItem>


//           <SidebarMenuItem
//             active={activeMenu === 'enrollment'}
//             onClick={() => handleMenuClick('enrollment')}
//           >
//             Enrollments
//           </SidebarMenuItem>

        
   

//           <SidebarMenuItem
//             active={activeMenu === 'announcements'}
//             onClick={() => handleMenuClick('announcements')}
//           >
//             Announcements
//           </SidebarMenuItem>
  

//           <SidebarMenuItem
//             active={activeMenu === 'email'}
//             onClick={() => handleMenuClick('email')}
//           >
//             Emails
//           </SidebarMenuItem>


//            <SidebarMenuItem
//             active={activeMenu === 'forum'}
//             onClick={() => handleMenuClick('forum')}
//           >
//             Forum
//           </SidebarMenuItem>

          
//           <SidebarMenuItem
//             onClick={handleLogout}
//           >
//             Logout
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </Sidebar>
//       <DashboardHomeButton onGoHome={() => setActiveMenu('profile')} />
//       <ContentArea isOpen={menuOpen}>{renderContent()}</ContentArea>
//     </DashboardContainer>
//   );
// };

// export default StudentDashboard;




import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { studentLogout } from '../Features/Slice';
import AllAdmin from './AllAdmin';
import StudentProfile2 from './StudentProfile2';
import EnrollPage from './EnrollmentPage';
import StudentResult from './StudentResult';
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
import ActiveAttendancePage from './ActiveAttendancePage';
import StudentVideoLessons from './StudentVideoLessons';
import GeneralAssets from './GeneralAssets';
import AssessmentAndFeedbacks from './AssessmentAndFeedbacks';
import StudentExams from './StudentExams';
import { Context } from './Context';

// Styled Components with max 10px padding, margin, and gaps
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
`;

const Sidebar = styled.div`
  background: #f8fafc;
  color: #333;
  width: ${(props) => (props.isOpen ? '240px' : '0')};
  overflow: hidden;
  transition: width 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  min-height: 100vh;
  z-index: 100;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
  border-right: 1px solid #e2e8f0;

  @media (min-width: 768px) {
    width: 240px;
    position: static;
    transition: none;
  }
`;

const SidebarHeader = styled.div`
  padding: 10px;
  font-size: 1.1rem;
  text-align: center;
  font-weight: bold;
  color: #006400;
  border-bottom: 1px solid #e2e8f0;
  margin: 0;
`;

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 10px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const SidebarMenuItem = styled.li`
  padding: 8px 10px;
  cursor: pointer;
  border-radius: 6px;
  background: ${(props) => (props.active ? '#006400' : 'transparent')};
  color: ${(props) => (props.active ? 'white' : '#006400')};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  font-size: 0.9rem;
  transition: all 0.2s ease-in-out;
  margin: 0;

  &:hover {
    background: ${(props) => (props.active ? '#006400' : '#e8f5e9')};
  }
`;

const ContentArea = styled.div`
  flex-grow: 1;
  width: 100%;
  padding: 0;
  margin: 0;
  overflow-y: auto;
`;

const Hamburger = styled.div`
  position: fixed;
  top: 50px;
  left: 10px;
  background: #006400;
  color: white;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 300;
  box-shadow: 0 2px 6px rgba(0, 100, 0, 0.2);

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
  background: rgba(0, 0, 0, 0.4);
  z-index: 50;
`;

// Main Component
const StudentDashboard = () => {
  const studentInfo = useSelector((state) => state.studentInfo);
  const location = useLocation();
  const [student, setStudent] = useState({});
  const studentId = studentInfo.id;
  const [error, setError] = useState('');

  const { menuOpen, setMenuOpen, activeMenu, setActiveMenu, handleMenuClick, api_url } = useContext(Context);
  const dispatch = useDispatch();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      text: "You will need to log in again to access your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#006400",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
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

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenuOnOutsideClick = () => setMenuOpen(false);

  // Map menu options to content
  const renderContent = () => {
    switch (activeMenu) {
      case 'profile':
        return (
          <StudentProfile2
            studentId={studentInfo.id}
            semesterId={studentInfo.selected_semester}
            onNavigate={handleMenuClick}
            onLogout={handleLogout}
          />
        );
      case 'alladmin':
        return <AllAdmin />;
      case 'enrollment':
        return <EnrollPage studentId={studentInfo.id} semesterId={studentInfo.selected_semester}/>;
      case 'myresults':
        return <StudentResult studentId={studentInfo.id} semesterId={studentInfo.selected_semester}/>;
      case 'announcements':
        return <Announcements />;
      case 'assignments':
        return <StudentAssignments studentId={studentInfo.id} semesterId={studentInfo.selected_semester}/>;
      case 'lecturenotes':
        return <StudentLectureNotes studentId={studentId} semesterId={studentInfo.selected_semester}/>;
      case 'onlineclass':
        return <StudentOnlineClass />;
      case 'email':
        return <EmailPage userEmail={studentInfo.email} user={studentInfo} />;
      case 'forum':
        return <ForumPage userEmail={student.email} user={student} />;
      case 'submissions':
        return <StudentSubmissions semesterId={studentInfo.selected_semester} />;
      case 'clockin':
        return <ActiveAttendancePage userId={studentInfo.id} userType={"student"} semesterId={studentInfo.selected_semester}/>;
      case 'videolessons':
        return <StudentVideoLessons studentId={studentInfo.id} semesterId={studentInfo.selected_semester}/>;
      case 'generalassets':
        return <GeneralAssets />;
      case 'feedback':
        return <AssessmentAndFeedbacks />;
      case 'exams':
        return <StudentExams studentId={studentInfo.id} semesterId={studentInfo.selected_semester}/>;
      default:
        return <h1 style={{ color: "#006400", textAlign: "center", width: "100%", margin: "10px", fontSize: "1.2rem" }}>Welcome to your Dashboard</h1>;
    }
  };

  // Get student info
  useEffect(() => {
    if (!studentId) return;

    axios.get(`${api_url}/get_student_by_id.php?id=${studentId}`)
      .then(res => {
        if (res.data.success) {
          setStudent(res.data.student);
        } else {
          setError(res.data.error);
        }
      })
      .catch(() => {
        setError('Failed to fetch student details.');
      });
  }, [studentId, api_url]);

  // Run suspended/status UI checks
  useEffect(() => {
    if (location.pathname === '/studentdashboard' && student.suspension === "suspended") {
      Swal.fire({
        icon: "warning",
        title: "Suspended",
        text: "You have been suspended, kindly contact the management.",
        allowOutsideClick: false,
        confirmButtonText: "Logout",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(studentLogout());
        }
      });
    } else if (location.pathname === '/studentdashboard' && student.status === "applied") {
      Swal.fire({
        icon: "warning",
        text: "You are no longer admitted, kindly contact the management.",
        allowOutsideClick: false,
        confirmButtonText: "Logout",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(studentLogout());
        }
      });
    } else if (location.pathname === '/studentdashboard' && student.status === "graduated") {
      Swal.fire({
        icon: "warning",
        text: "You have already graduated, kindly contact the management.",
        allowOutsideClick: false,
        confirmButtonText: "Logout",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(studentLogout());
        }
      });
    }
  }, [student, location.pathname, dispatch]);

  return (
    <DashboardContainer>
      <Hamburger onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </Hamburger>
      <Overlay isOpen={menuOpen} onClick={closeMenuOnOutsideClick} />
      <Sidebar isOpen={menuOpen}>
        <SidebarHeader>Student Portal</SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem
            active={activeMenu === 'profile'}
            onClick={() => handleMenuClick('profile')}
          >
            Hi, {studentInfo.name || student.full_name || 'Student'}
          </SidebarMenuItem>

          <SidebarMenuItem
            active={activeMenu === 'enrollment'}
            onClick={() => handleMenuClick('enrollment')}
          >
            Enrollments
          </SidebarMenuItem>

          <SidebarMenuItem
            active={activeMenu === 'announcements'}
            onClick={() => handleMenuClick('announcements')}
          >
            Announcements
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

          <SidebarMenuItem onClick={handleLogout}>
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