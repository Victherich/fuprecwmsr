// import './App.css';
// import Footer from './components/Footer';
// import Header from './components/Header';
// import Landingpage from './components/Landingpage';
// import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import TrackShipment from './components/TrackShipment';
// import Pricing from './components/Pricing';
// import Contact from './components/ContactUs';
// import AboutUs from './components/About';
// import ScrollToTop from './components/ScrollToTop';
// import Services from './components/Services';
// import AdminDashborad from './components/AdminDashborad';
// import PrivateAdminDashboard from './components/PrivateAdminDashboard';
// import AdminLogin from './components/AdminLogin';
// import AdminForgotPassword from './components/AdminForgotPassword';
// import AdminResetPassword from './components/AdminResetPassword';


// function App() {




//   return (
//     <BrowserRouter>
//     <ScrollToTop/>
//       <Header />

//       <Routes>
//         <Route path="/" element={<Landingpage />} />
//         <Route path="/trackshipment" element={<TrackShipment/>}/>
//         <Route path="/pricing" element={<Pricing/>}/>
//         <Route path="/contactus" element={<Contact/>}/>
//         <Route path="/aboutus" element={<AboutUs/>}/>
//         <Route path="/services" element={<Services/>}/>
//         <Route path="/adminlogin" element={<AdminLogin/>}/>
//         <Route path="/adminforgotpassword" element={<AdminForgotPassword/>}/>
//         <Route path="/adminresetpassword" element={<AdminResetPassword/>}/>
//         {/* <Route path="/admin" element={<AdminDashborad/>}/> */}
//         <Route path="/admin" element={<PrivateAdminDashboard/>}>
//             <Route path="" element={<AdminDashborad/>}/>
//         </Route>
//       </Routes>
//       <Footer/>
//     </BrowserRouter>
//   );
// }

// export default App;




// src/App.js
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Landingpage from './components/Landingpage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import TrackShipment from './components/TrackShipment';
import Pricing from './components/Pricing';
import Contact from './components/ContactUs';
import AboutUs from './components/About';
import ScrollToTop from './components/ScrollToTop';
import Services from './components/Services';
import AdminDashborad from './components/AdminDashborad';
import PrivateAdminDashboard from './components/PrivateAdminDashboard';
import AdminLogin from './components/AdminLogin';
import AdminForgotPassword from './components/AdminForgotPassword';
import AdminResetPassword from './components/AdminResetPassword';
import Popup from './components/Popup'; // Import the Popup component
import { useState, useEffect } from 'react';
import wp1 from "./Images/logo.png"
import wp2 from './Images/logo3.png'
import wp3 from './Images/Iwere.jpeg'
import AdminSignup from './components/AdminSignUp';
import VerifyEmail from './components/VerifyEmail';
import ChristmasOverlay from './components/ChristmassWelcomeMessage';
import FooterBanner from './components/FooterBanner';
import ChristmassImg from './Images/ChristmassImg.png'
import Partners from './components/Partners';
import GalleryPage from './components/GalleryPage';
import PortalWelcomePage from './components/PortalWelomePage';
import AcademicsPages from './components/AcademicsPages';
import Admissions from './components/Admissions';
import ApplicationPage from './components/ApplicationPage';
import StudentProfile from './components/StudentProfile';
import StudentLogin from './components/StudentLogin';
import PrivateStudentDashboard from './components/PrivateStudentDashboard';
import StudentDashboard from './components/StudentDashboard';
import DirectorMessage from './components/DirectorMessage';
import StaffTeam from './components/StaffTeam';
import ShortCourses from './components/ShortCourses';
import ShortCoursesPage from './components/ShortCourcesPage';
import StudentForgotPassword from './components/StudentForgotPassword';
import StudentResetPassword from './components/StudentResetPassword';
import Events from './components/Events';
import AppUpdate from './components/AppUpdate';
import ResearchPage from './components/ResearchPage';
import LecturerLogin from './components/LecturerLogin';
import PrivateLecturerDashboard from './components/PrivateLecturerDashboard';
import LecturerDashboard from './components/LecturerDashboard';
import LecturerSignup from './components/LecturerSignup';
import AnnouncementTicker from './components/AnnouncementTicker';
import AnnouncementsPage from './components/AnnouncementsPage';
import StudentResultByAdmNo from './components/StudentResultByAdmNo';
import ZeroWastePage from './components/ZeroWastePage';
import ExamPortalLogin from './components/ExamPortalLogin';
import StudentResultPortalLogin from './components/StudentResultPortalLogin';


function App() {

  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    // Set a timer to hide the overlay after 2 seconds
    const timer = setTimeout(() => {
      setShowOverlay(false);
    }, 4000);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);
  
  // // States for different pop-ups
  // const [showLeadPopup, setShowLeadPopup] = useState(false);
  // const [showExitIntentPopup, setShowExitIntentPopup] = useState(false);
  // const [showPromoPopup, setShowPromoPopup] = useState(false);
  // const [countdown, setCountdown] = useState(60); // 1 minute countdown for promo

  // // Show lead capture popup after 10 seconds
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowLeadPopup(true);
  //   }, 10000); // Show after 10 seconds
  //   return () => clearTimeout(timer);
  // }, []);

  // // Show exit intent popup
  // useEffect(() => {
  //   const handleExitIntent = (e) => {
  //     if (e.clientY < 10) {
  //       setShowExitIntentPopup(true);
  //     }
  //   };
  //   document.addEventListener('mouseout', handleExitIntent);
  //   return () => document.removeEventListener('mouseout', handleExitIntent);
  // }, []);

  // // Show promo popup after 5 seconds on the pricing page
  // useEffect(() => {
  //   const promoTimer = setTimeout(() => {
  //     setShowPromoPopup(true);
  //   }, 5000);
  //   return () => clearTimeout(promoTimer);
  // }, []);

  // // Countdown logic for promo popup
  // useEffect(() => {
  //   if (countdown > 0 && showPromoPopup) {
  //     const timer = setInterval(() => {
  //       setCountdown((prevCount) => prevCount - 1);
  //     }, 1000);
  //     return () => clearInterval(timer);
  //   }
  // }, [countdown, showPromoPopup]);

  return (
    <BrowserRouter>
    <AppUpdate/>
      <ScrollToTop />
      {/* {showOverlay&& <ChristmasOverlay/>} */}
      <Header />

      <Routes>
        <Route path='/portal' element={<PortalWelcomePage/>}/>
        <Route path='/gallery' element={<GalleryPage/>}/>
        <Route path="/" element={<Landingpage />} />
        <Route path="/trackshipment" element={<TrackShipment />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path='/academics' element={<AcademicsPages/>}/>
        <Route path='/admissions' element={<Admissions/>}/>
        <Route path='/application' element={<ApplicationPage/>}/>
        <Route path='/directormessage' element={<DirectorMessage/>}/>
        <Route path='/staffteam' element={<StaffTeam/>}/>
        <Route path='/shortcourses' element={<ShortCoursesPage/>}/>
        <Route path='/events' element={<Events/>}/>
        <Route path='/studentforgotpassword' element={<StudentForgotPassword/>}/>
        <Route path='/studentresetpassword/:token' element={<StudentResetPassword/>}/>
        <Route path='/research' element={<ResearchPage/>}/>
        <Route path='/announcements' element={<AnnouncementsPage/>}/>
        <Route path='/resultverification' element={<StudentResultByAdmNo/>}/>
        <Route path='/zerowasteclub' element={<ZeroWastePage/>}/>
        <Route path='/examsportalaccess' element={<ExamPortalLogin/>}/>
        <Route path='/studentresultportallogin' element={<StudentResultPortalLogin/>}/>
        

        <Route path='/studentlogin' element={<StudentLogin/>}/>

        <Route path='/studentdashboard' element={<PrivateStudentDashboard/>}>
          <Route path='' element={<StudentDashboard/>}/>
        </Route>




        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminsignup" element={<AdminSignup/>}/>
        <Route path="/adminforgotpassword" element={<AdminForgotPassword />} />
        <Route path="/adminresetpassword/:token" element={<AdminResetPassword />} />
        <Route path="/admin" element={<PrivateAdminDashboard />}>
          <Route path="" element={<AdminDashborad />} />
        </Route>
        <Route path="/verify/:token" element={<VerifyEmail/>}/>




        {/* leccturer routes */}
        <Route path='/lecturersignup' element={<LecturerSignup/>}/>
        <Route path='/lecturerlogin' element={<LecturerLogin/>}/>
        <Route path="/lecturer" element={<PrivateLecturerDashboard />}>
          <Route path="" element={<LecturerDashboard />} />
        </Route>
      
      </Routes>
      <AnnouncementTicker/>
      <Partners/>
      <Footer />
      {/* <img src={ChristmassImg} alt="Logo2" className='SideLogo2' /> */}
      <a><img src={wp1} alt="logo" className="WhatsAppIcon" /></a> 
    
      <a><img src={wp2} alt="logo" className="WhatsAppIcon2" /></a> 
      {/* <a><img src={wp3} alt="logo" className="WhatsAppIcon3" /></a>  */}
      {/* <a><div className='WhatsAppIcon4'>ROYAL IWERE FOUNDATION</div></a>  */}
      {/* <FooterBanner/> */}

      
    </BrowserRouter>
  );
}

export default App;


//User “elexdond_vca” was added to the database “elexdond_vca”.
//database password
//vca123vca123vca123vca