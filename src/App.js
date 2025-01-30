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
import wp from "./Images/whatsapplogo.png"
import AdminSignup from './components/AdminSignUp';
import VerifyEmail from './components/VerifyEmail';
import ChristmasOverlay from './components/ChristmassWelcomeMessage';
import FooterBanner from './components/FooterBanner';
import ChristmassImg from './Images/ChristmassImg.png'


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
      <ScrollToTop />
      {/* {showOverlay&& <ChristmasOverlay/>} */}
      <Header />

      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/trackshipment" element={<TrackShipment />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        {/* <Route path="/adminsignup" element={<AdminSignup/>}/> */}
        <Route path="/adminforgotpassword" element={<AdminForgotPassword />} />
        <Route path="/reset-password/:token" element={<AdminResetPassword />} />
        <Route path="/admin" element={<PrivateAdminDashboard />}>
          <Route path="" element={<AdminDashborad />} />
        </Route>
        <Route path="/verify/:token" element={<VerifyEmail/>}/>
      
      </Routes>
      <Footer />
      {/* <img src={ChristmassImg} alt="Logo2" className='SideLogo2' /> */}
      <a><img src={wp} alt="logo" className="WhatsAppIcon" onClick={() => window.open("https://wa.me/2348033062743", "_blank")} /></a> 
      {/* <FooterBanner/> */}

      
    </BrowserRouter>
  );
}

export default App;


//User “elexdond_vca” was added to the database “elexdond_vca”.
//database password
//vca123vca123vca123vca