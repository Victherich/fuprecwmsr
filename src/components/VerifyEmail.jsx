import React, { useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const VerifyEmail = () => {
  const location = useLocation();
  const { token } = useParams(); // Token from URL parameters
  const navigate = useNavigate();

  useEffect(() => {
    const handleVerify = async () => {
      try {
        Swal.fire({
          title: 'Verifying...',
          text: 'Please wait while we verify your email.',
          allowOutsideClick: false,
          onOpen: () => {
            Swal.showLoading();
          }
        });

        const response = await axios.post('https://vinrichards.com/api2/verify_email.php', { token });

        Swal.close();
        Swal.fire({icon:"success",timer:2000})
        navigate("/adminlogin")
        // console.log("Verification Response:", response.data);

        // if (response.data.success) {
        //   Swal.fire({
        //     icon: 'success',
        //     title: 'Verification Successful',
        //     text: response.data.message,
        //     showConfirmButton: false,
        //     timer: 3000
        //   }).then(() => {
        //     navigate("/adminlogin");
        //   });
        // } else {
        //   Swal.fire({
        //     icon: 'error',
        //     title: 'Verification Failed',
        //     text: response.data.error,
        //     showConfirmButton: true,
        //     confirmButtonText: 'Ok'
        //   });
        // }

      } catch (error) {
        Swal.close();
        
        // Log detailed error information for debugging
        console.error("Verification Error:", error);

        const errorMessage = error.response?.data?.error || 'An error occurred. Please try again.';
        Swal.fire({
          icon: 'error',
          title: 'Verification Failed',
          text: errorMessage,
          showConfirmButton: true,
          confirmButtonText: 'Ok'
        });
      }
    };

    handleVerify();
  }, [token, navigate]);

  return (
    <div className='ContactFormWrap' key={location.pathname}>
      <div className="contact-form-container">
        <h2>Email Verification</h2>
      </div>
    </div>
  );
};

export default VerifyEmail;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import Swal from 'sweetalert2';

// const VerifyEmail = () => {
//   const location = useLocation();
//   const { token } = useParams(); // Token from URL parameters
//   const navigate = useNavigate();
//   const [isVerified, setIsVerified] = useState(false); // Track verification state

//   useEffect(() => {
//     let isMounted = true; // To ensure component is still mounted
//     const handleVerify = async () => {
//       try {
//         Swal.fire({
//           title: 'Verifying...',
//           text: 'Please wait while we verify your email.',
//           allowOutsideClick: false,
//           didOpen: () => {
//             Swal.showLoading();
//           }
//         });

//         const response = await axios.post('https://elexdondigitalacademy.com/api2/verify_email.php', { token });

//         // Ensure component is still mounted and no duplicate responses
//         if (isMounted) {
//           console.log("Verification Response:", response.data);
          
//           if (response.data.success) {
//             setIsVerified(true); // Mark as verified to avoid further handling
//             Swal.fire({
//               icon: 'success',
//               title: 'Verification Successful',
//               text: response.data.message,
//               showConfirmButton: false,
//               timer: 3000
//             }).then(() => {
//               navigate("/adminlogin");
//             });
//           } else {
//             // Only handle errors if it's not verified yet
//             if (!isVerified) {
//               Swal.fire({
//                 icon: 'error',
//                 title: 'Verification Failed',
//                 text: response.data.error || 'Verification failed.',
//                 showConfirmButton: true,
//                 confirmButtonText: 'Ok'
//               });
//             }
//           }
//         }
//       } catch (error) {
//         // Handle request errors and ensure it's mounted
//         if (isMounted && !isVerified) {
//           console.error("Verification Error:", error);
//           const errorMessage = error.response?.data?.error || 'An error occurred. Please try again.';
//           Swal.fire({
//             icon: 'error',
//             title: 'Verification Failed',
//             text: errorMessage,
//             showConfirmButton: true,
//             confirmButtonText: 'Ok'
//           });
//         }
//       } finally {
//         Swal.close(); // Ensure loading is closed even after error
//       }
//     };

//     handleVerify();

//     // Cleanup to avoid memory leaks or duplicate API requests
//     return () => {
//       isMounted = false;
//     };
//   }, [token, navigate, isVerified]);

//   return (
//     <div className='ContactFormWrap' key={location.pathname}>
//       <div className="contact-form-container">
//         <h2>Email Verification</h2>
//       </div>
//     </div>
//   );
// };

// export default VerifyEmail;
