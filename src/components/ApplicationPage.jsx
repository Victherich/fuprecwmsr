




// // second sign up with email generation


// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2'; // Assuming you have Swal installed
// import styled from 'styled-components'
// import bg from '../Images/applynow.jpg'
// import { Context } from './Context';
// import RequiredDocuments from './RequiredDocuments';
// import ApprovedFeeSchedule from './ApprovedFeeSchedule';

// import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUniversity, FaFileAlt, FaFileUpload } from 'react-icons/fa'; // Assuming react-icons
// import EmailVerificationModal from './EmailVerificationModal';

// // Assuming RequiredDocuments is a component you already have



// const ApplicationPage = () => {
//   const navigate = useNavigate();
//   const { programs } = useContext(Context);
//   const [emailVerificationModalOpen, setEmailVerificationModalOpen]=useState(false);
//   const {api_url}=useContext(Context);

//   const [formData, setFormData] = useState({
//     fullName: '',
//     email2: '',
//     // confirmEmail: '',
//     password: '',
//     confirmPassword: '',
//     phone: '',
//     confirmPhone: '',
//     address: '',
//     program: '',
//     qualification: '',
//     experience: '',
//     statement: '',
//     file: null, // For the PDF application file
//     proofOfPayment: null, // NEW: For the proof of payment image
//     profileImage: null,
//     amountPaid:null
//   });

//   console.log(formData);

// const handleChange = (e) => {
//     if (e.target.name === 'file') {
//       setFormData({ ...formData, file: e.target.files[0] });
//     } else if (e.target.name === 'proofOfPayment') { 
//       setFormData({ ...formData, proofOfPayment: e.target.files[0] });
//     } else if (e.target.name === 'profileImage') { // NEW: Handle profile image file
//       setFormData({ ...formData, profileImage: e.target.files[0] });
//     } else {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     }
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Password and Email confirmation validation
//     // if (formData.email !== formData.confirmEmail) {
//     //   Swal.fire({
//     //     icon: 'error',
//     //     title: 'Email Mismatch',
//     //     text: 'Your email and confirmation email do not match.',
//     //   });
//     //   return;
//     // }

//     if (formData.password !== formData.confirmPassword) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Password Mismatch',
//         text: 'Your password and confirmation password do not match.',
//       });
//       return;
//     }

//     if (formData.phone !== formData.confirmPhone) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Phone Mismatch',
//         text: 'Your phone number and confirmation phone number do not match.',
//       });
//       return;
//     }

//     // File validation (size and type) for Application PDF
//     if (!formData.file || formData.file.type !== 'application/pdf') {
//       Swal.fire({
//         icon: 'error',
//         title: 'Invalid Application File',
//         text: 'Please upload a valid PDF file for your application documents.',
//       });
//       return;
//     }

//     // Optional: Add file size validation for Application PDF
//     const maxFileSize = 5 * 1024 * 1024; // 5MB
//     if (formData.file.size > maxFileSize) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Application File Too Large',
//         text: 'The application file size exceeds the 5MB limit.',
//       });
//       return;
//     }

//     // NEW: File validation for Proof of Payment image
//     if (!formData.proofOfPayment) {
//         Swal.fire({
//             icon: 'error',
//             title: 'Proof of Payment Required',
//             text: 'Please upload your proof of payment.',
//         });
//         return;
//     }

//     const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
//     if (!allowedImageTypes.includes(formData.proofOfPayment.type)) {
//         Swal.fire({
//             icon: 'error',
//             title: 'Invalid Image Type',
//             text: 'Proof of payment must be a JPG, PNG, or GIF image.',
//         });
//         return;
//     }

//     const maxImageSize = 5 * 1024 * 1024; // 2MB for image
//     if (formData.proofOfPayment.size > maxImageSize) {
//         Swal.fire({
//             icon: 'error',
//             title: 'Image Too Large',
//             text: 'The proof of payment image size exceeds the 2MB limit.',
//         });
//         return;
//     }



//    // NEW: File validation for Profile Image
//     if (!formData.profileImage) {
//         Swal.fire({
//             icon: 'error',
//             title: 'Profile Image Required',
//             text: 'Please upload a profile passport image.',
//         });
//         return;
//     }

//     const allowedImageTypes2 = ['image/jpeg', 'image/png', 'image/gif'];
//     if (!allowedImageTypes2.includes(formData.profileImage.type)) {
//         Swal.fire({
//             icon: 'error',
//             title: 'Invalid Image Type',
//             text: 'Profile image must be a JPG, PNG, or GIF file.',
//         });
//         return;
//     }

//     const maxImageSize2 = 2 * 1024 * 1024; // 2MB limit for profile image
//     if (formData.profileImage.size > maxImageSize2) {
//         Swal.fire({
//             icon: 'error',
//             title: 'Image Too Large',
//             text: 'The profile image size exceeds the 2MB limit.',
//         });
//         return;
//     }


//     // Create a FormData object to send the data
//     const formDataToSend = new FormData();
//     formDataToSend.append('fullName', formData.fullName);
//     formDataToSend.append('email2', formData.email2);
//     formDataToSend.append('password', formData.password);
//     formDataToSend.append('phone', formData.phone);
//     formDataToSend.append('address', formData.address);
//     formDataToSend.append('program', formData.program);
//     formDataToSend.append('qualification', formData.qualification);
//     formDataToSend.append('experience', formData.experience);
//     formDataToSend.append('statement', formData.statement);
//     formDataToSend.append('file', formData.file); // The PDF application file
//     formDataToSend.append('proofOfPayment', formData.proofOfPayment); // NEW: The proof of payment image
//     formDataToSend.append('transactionReference', ''); // Placeholder for transaction reference
//     formDataToSend.append('amountPaid', ''); // Placeholder for amount paid
//     formDataToSend.append('profileImage', formData.profileImage);

//     // Show loading
//     Swal.fire({
//       title: 'Submitting Application...',
//       text: 'Please wait while we process your application.',
//       allowOutsideClick: false,
//       showConfirmButton: false,
//       willOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     handleFinalSubmit(formDataToSend);
//   };

//   const handleFinalSubmit = async (formDataToSend) => {
//     console.log(formDataToSend);
//     Swal.fire({ text: 'Submitting...' });
//     Swal.showLoading();
//     try {
//       const response = await fetch(`${api_url}/submit_admission_form.php`, {
//         method: 'POST',
//         body: formDataToSend, // Sending FormData directly
//       });

//       const result = await response.json();

//       if (result.success) {
//         notifyAdminsOfApplication();
//         Swal.fire({
//           icon: 'success',
//           text: 'Application submitted successfully! And we shall get back to you. Thanks',
//           allowOutsideClick: false,
//         });
//       } else {
//         Swal.fire({
//           icon: 'error',
//           text: result.error || 'Something went wrong, please try again.',
//         });
//       }
//     } catch (error) {
//       console.error(error);
//       Swal.fire({
//         icon: 'error',
//         text: 'Something went wrong. Please try again.',
//       });
//     }
//   };




//   const notifyAdminsOfApplication = async () => {
 

//     try {
//       const response = await fetch(`${api_url}/notify_admins_on_application.php`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       const result = await response.json();

//       if (result.success) {
//         // Swal.fire({
//         //   icon: 'success',
//         //   title: 'Notified!',
//         //   text: result.message || 'Admins have been notified successfully.',
//         //   allowOutsideClick: false,
//         // }).then((result) => {
//         //   if (result.isConfirmed) {
//         //     window.location.reload();
//         //   }
//         // });
//           // reload after 3 seconds
//   setTimeout(() => {
//     window.location.reload();
//   }, 2000);
//         console.log("notification sent to admin")
//       } else {
//         // Swal.fire({
//         //   icon: 'error',
//         //   title: 'Oops!',
//         //   text: result.error || 'Something went wrong while notifying admins.',
//         // });
//         console.log(result.error)
//       }
//     } catch (error) {
//       // Swal.fire({
//       //   icon: 'error',
//       //   title: 'Network Error',
//       //   text: 'Could not send the notification. Please try again later.',
//       // });
//       console.error(error)
//     }
//   };

// const handleVerifyEmail = () => {
//   if (!formData.email2 || formData.email2.trim() === "") {

//  setEmailVerificationModalOpen(true);
//   }

 
// };




//   return (
//     <ApplicationContainer>
//       {emailVerificationModalOpen&&<EmailVerificationModal 
//       onClose={()=>setEmailVerificationModalOpen(false)}
//         onVerified={(verifiedEmail) =>
//           setFormData((prev) => ({ ...prev, email2: verifiedEmail }))
//         }
//       />}
//       {/* Hero Section */}
//       <HeroSection>
//         {/* ... existing hero content ... */}
//       </HeroSection>

//       {/* Application Form */}
//       <FormSection>
//         <HeroOverlay>
//           <h1>📄 Apply for Your Dream Program</h1>
//           <p>Take the next step in your career with CWMSR.</p>
//         </HeroOverlay>

//         <ApprovedFeeSchedule/>

//         <h2 style={{ marginTop: '20px' }}>📝 Application Form</h2>
//         <p style={{ marginBottom: '20px', fontWeight: 'bold' }}>
//           Fill all the information and submit all the required documents according to our Academics page and our Admissions page including PROOF OF ADMISSION FEE PAYMENT.
//         </p>
//         <FormContainer onSubmit={handleSubmit} onClick={handleVerifyEmail}>
//           {/* ... existing form fields (full_name, email, password, phone, address, program, qualification, experience, statement) ... */}

//           <FormGroup>
//             <Label>
//               <FaUser /> Full Name:
//             </Label>
//             <Input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
//           </FormGroup>

//           <FormGroup>
//             <Label>
//               <FaEnvelope /> Email:
//             </Label>
//             <Input type="email" name="email2" value={formData.email2} onChange={handleChange} required disabled/>
//           </FormGroup>

//           {/* <FormGroup>
//             <Label>
//               <FaEnvelope /> Confirm Email:
//             </Label>
//             <Input type="email" name="confirmEmail" value={formData.confirmEmail} onChange={handleChange} required />
//           </FormGroup> */}

//           <FormGroup>
//             <Label>🔑 Password:</Label>
//             <p>Keep your password safe as you will be needing it to login to our portal if granted the admission. Otherwise , you can follow the forgot password link on the login page.</p>
//             <Input type="password" name="password" value={formData.password} onChange={handleChange} required />
//           <p style={{fontSize:"small", fontWeight:"bold"}}>Show Password</p>
//           <p style={{fosize:"small", fontWeight:"bold"}}>Hide Password</p>
//           </FormGroup>

//           <FormGroup>
//             <Label>🔑 Confirm Password:</Label>
//             <Input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
//           </FormGroup>

//           <FormGroup>
//             <Label>
//               <FaPhone /> Phone Number:
//             </Label>
//             <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
//           </FormGroup>

//           <FormGroup>
//             <Label>
//               <FaPhone />Confirm Phone Number:
//             </Label>
//             <Input type="tel" name="confirmPhone" value={formData.confirmPhone} onChange={handleChange} required />
//           </FormGroup>

//           <FormGroup>
//             <Label>
//               <FaMapMarkerAlt /> Address:
//             </Label>
//             <Input type="text" name="address" value={formData.address} onChange={handleChange} required />
//           </FormGroup>

//           {/* NEW: Profile Image Upload Field */}
//           <FormGroup>
//             <Label>
//               <FaFileUpload /> Upload Profile Passport Photograph (2MB MAX):
//             </Label>
//             <p>Please upload a clear passport photograph of yourself. (JPG, PNG, or GIF only)</p>
//             <Input type="file" name="profileImage" accept="image/jpeg,image/png,image/gif" onChange={handleChange} required />
//           </FormGroup>

//           <FormGroup>
//             <Label>
//               <FaUniversity /> Select Program:
//             </Label>
//             <Select name="program" value={formData.program} onChange={handleChange} required>
//               <option value="">-- Select a Program --</option>
//               {programs.map((program) => (
//                 <option key={program.id} value={program.id}>
//                   {program.name}
//                 </option>
//               ))}
//             </Select>
//           </FormGroup>

//           <FormGroup>
//             <Label>
//               <FaFileAlt /> Highest Qualification:
//             </Label>
//             <Input type="text" name="qualification" value={formData.qualification} onChange={handleChange} required />
//           </FormGroup>

//           <FormGroup>
//             <Label>
//               <FaFileAlt /> Work Experience:
//             </Label>
//             <Textarea name="experience" value={formData.experience} onChange={handleChange} required />
//           </FormGroup>

//           <FormGroup>
//             <Label>
//               <FaFileAlt /> Personal Statement:
//             </Label>
//             <Textarea name="statement" value={formData.statement} onChange={handleChange} required />
//           </FormGroup>

//           <RequiredDocuments />
//           {/* Existing Application File Upload */}
//           <FormGroup>
//             <Label>
//               <FaFileUpload /> Upload Application Documents (PDF) 5MB MAX:
//             </Label>
//             <p>Scan all the required documents as written above into a PDF file and upload here. (Please submit .pdf file only)</p>
//             <Input type="file" name="file" accept="application/pdf" onChange={handleChange} required />
//           </FormGroup>

//            <FormGroup>
//             <Label>
//               Enter the exact amount you paid:
//             </Label>
//             {/* <p>Please upload a picture of your proof of payment. (JPG, PNG, or GIF only)</p> */}
//             <Input type="number" name="amountPaid" value={formData.amountPaid} onChange={handleChange} required />
//           </FormGroup>

//           {/* NEW: Proof of Payment Upload */}
//           <FormGroup>
//             <Label>
//               <FaFileUpload /> Upload Proof of Payment (Image) 5MB MAX:
//             </Label>
//             <p>Please upload a picture of your proof of payment. (JPG, PNG, or GIF only)</p>
//             <Input type="file" name="proofOfPayment" accept="image/jpeg,image/png,image/gif" onChange={handleChange} required />
//           </FormGroup>

//           {/* Submit Button */}
//           <SubmitButton type="submit">Submit Application</SubmitButton>
//         </FormContainer>
//       </FormSection>
//     </ApplicationContainer>
//   );
// };

// export default ApplicationPage;




// second sign up with email generation

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Assuming you have Swal installed
import styled from 'styled-components';
import bg from '../Images/applynow.jpg';
import { Context } from './Context';
import RequiredDocuments from './RequiredDocuments';
import ApprovedFeeSchedule from './ApprovedFeeSchedule';


import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUniversity, FaFileAlt, FaFileUpload } from 'react-icons/fa';
import EmailVerificationModal from './EmailVerificationModal';

const ApplicationPage = () => {
  const navigate = useNavigate();
  const { programs, api_url } = useContext(Context);
  const [emailVerificationModalOpen, setEmailVerificationModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email2: '',
    password: '',
    confirmPassword: '',
    phone: '',
    confirmPhone: '',
    address: '',
    program: '',
    qualification: '',
    experience: '',
    statement: '',
    file: null, // PDF application file
    proofOfPayment: null, // Proof of payment image
    profileImage: null,
    amountPaid: ''
  });

  const handleChange = (e) => {
    if (e.target.name === 'file') {
      setFormData({ ...formData, file: e.target.files[0] });
    } else if (e.target.name === 'proofOfPayment') { 
      setFormData({ ...formData, proofOfPayment: e.target.files[0] });
    } else if (e.target.name === 'profileImage') { 
      setFormData({ ...formData, profileImage: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'Your password and confirmation password do not match.',
      });
      return;
    }

    if (formData.phone !== formData.confirmPhone) {
      Swal.fire({
        icon: 'error',
        title: 'Phone Mismatch',
        text: 'Your phone number and confirmation phone number do not match.',
      });
      return;
    }

    // Email verification check
    if (!formData.email2) {
      Swal.fire({
        icon: 'error',
        title: 'Email Required',
        text: 'Please verify your email address before submitting.',
      });
      return;
    }

    // File validation (Application PDF)
    if (!formData.file || formData.file.type !== 'application/pdf') {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Application File',
        text: 'Please upload a valid PDF file for your application documents.',
      });
      return;
    }

    const maxFileSize = 5 * 1024 * 1024; // 5MB
    if (formData.file.size > maxFileSize) {
      Swal.fire({
        icon: 'error',
        title: 'Application File Too Large',
        text: 'The application file size exceeds the 5MB limit.',
      });
      return;
    }

    // Proof of Payment validation
    if (!formData.proofOfPayment) {
        Swal.fire({
            icon: 'error',
            title: 'Proof of Payment Required',
            text: 'Please upload your proof of payment.',
        });
        return;
    }

    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedImageTypes.includes(formData.proofOfPayment.type)) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Image Type',
            text: 'Proof of payment must be a JPG, PNG, or GIF image.',
        });
        return;
    }

    const maxImageSize = 5 * 1024 * 1024; // 5MB
    if (formData.proofOfPayment.size > maxImageSize) {
        Swal.fire({
            icon: 'error',
            title: 'Image Too Large',
            text: 'The proof of payment image size exceeds the 5MB limit.',
        });
        return;
    }

    // Profile Image validation
    if (!formData.profileImage) {
        Swal.fire({
            icon: 'error',
            title: 'Profile Image Required',
            text: 'Please upload a profile passport image.',
        });
        return;
    }

    if (!allowedImageTypes.includes(formData.profileImage.type)) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Image Type',
            text: 'Profile image must be a JPG, PNG, or GIF file.',
        });
        return;
    }

    const maxProfileImageSize = 2 * 1024 * 1024; // 2MB limit for profile image
    if (formData.profileImage.size > maxProfileImageSize) {
        Swal.fire({
            icon: 'error',
            title: 'Image Too Large',
            text: 'The profile image size exceeds the 2MB limit.',
        });
        return;
    }

    // Create a FormData object to send the data
    const formDataToSend = new FormData();
    formDataToSend.append('fullName', formData.fullName);
    formDataToSend.append('email2', formData.email2);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('program', formData.program);
    formDataToSend.append('qualification', formData.qualification);
    formDataToSend.append('experience', formData.experience);
    formDataToSend.append('statement', formData.statement);
    formDataToSend.append('file', formData.file); 
    formDataToSend.append('proofOfPayment', formData.proofOfPayment); 
    formDataToSend.append('transactionReference', ''); 
    formDataToSend.append('amountPaid', formData.amountPaid); // FIXED: Passing actual state value
    formDataToSend.append('profileImage', formData.profileImage);

    // Show loading
    Swal.fire({
      title: 'Submitting Application...',
      text: 'Please wait while we process your application.',
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    handleFinalSubmit(formDataToSend);
  };

  const handleFinalSubmit = async (formDataToSend) => {
    try {
      const response = await fetch(`${api_url}/submit_admission_form.php`, {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.success) {
        notifyAdminsOfApplication();
        Swal.fire({
          icon: 'success',
          text: 'Application submitted successfully! And we shall get back to you. Thanks',
          allowOutsideClick: false,
        });
      } else {
        Swal.fire({
          icon: 'error',
          text: result.error || 'Something went wrong, please try again.',
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        text: 'Something went wrong. Please try again.',
      });
    }
  };

  const notifyAdminsOfApplication = async () => {
    try {
      const response = await fetch(`${api_url}/notify_admins_on_application.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result.success) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ApplicationContainer>
      {emailVerificationModalOpen && (
        <EmailVerificationModal 
          onClose={() => setEmailVerificationModalOpen(false)}
          onVerified={(verifiedEmail) =>
            setFormData((prev) => ({ ...prev, email2: verifiedEmail }))
          }
        />
      )}

      <HeroSection>
        {/* ... existing hero content ... */}
      </HeroSection>

      <FormSection>
        <HeroOverlay>
          <h1>📄 Apply for Your Dream Program</h1>
          <p>Take the next step in your career with CWMSR.</p>
        </HeroOverlay>

        <ApprovedFeeSchedule />

        <h2 style={{ marginTop: '20px' }}>📝 Application Form</h2>
        <p style={{ marginBottom: '20px', fontWeight: 'bold' }}>
          Fill all the information and submit all the required documents according to our Academics page and our Admissions page including PROOF OF ADMISSION FEE PAYMENT.
        </p>

        {/* FIXED: Removed rogue onClick handler from FormContainer */}
        <FormContainer onSubmit={handleSubmit}>
          

          <FormGroup>
            <Label>
              <FaEnvelope /> Email:
            </Label>
            <div style={{ display: 'flex', flexDirection:"column", gap: '10px' }}>
             {formData.email2? <Input type="email" name="email2" value={formData.email2} onChange={handleChange} required disabled />:""
             } <VerifyButton type="button" onClick={() => setEmailVerificationModalOpen(true)}>
                {formData.email2 ? 'Change / Verified' : 'Click here to Verify your Email'}
              </VerifyButton>
            </div>
          </FormGroup>


          <FormGroup>
            <Label>
              <FaUser /> Full Name:
            </Label>
            <Input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
          </FormGroup>

          <FormGroup>
            <Label>🔑 Password:</Label>
            <p>Keep your password safe as you will be needing it to login to our portal if granted the admission. Otherwise, you can follow the forgot password link on the login page.</p>
            <Input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required />
            <span 
              onClick={() => setShowPassword(!showPassword)} 
              style={{ fontSize: "small", fontWeight: "bold", cursor: "pointer", color: "blue", marginTop: "5px", display: "inline-block" }}
            >
              {showPassword ? 'Hide Password' : 'Show Password'}
            </span>
          </FormGroup>

          <FormGroup>
            <Label>🔑 Confirm Password:</Label>
            <Input type={showPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </FormGroup>

          <FormGroup>
            <Label>
              <FaPhone /> Phone Number:
            </Label>
            <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </FormGroup>

          <FormGroup>
            <Label>
              <FaPhone /> Confirm Phone Number:
            </Label>
            <Input type="tel" name="confirmPhone" value={formData.confirmPhone} onChange={handleChange} required />
          </FormGroup>

          <FormGroup>
            <Label>
              <FaMapMarkerAlt /> Address:
            </Label>
            <Input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </FormGroup>

          <FormGroup>
            <Label>
              <FaFileUpload /> Upload Profile Passport Photograph (2MB MAX):
            </Label>
            <p>Please upload a clear passport photograph of yourself. (JPG, PNG, or GIF only)</p>
            <Input type="file" name="profileImage" accept="image/jpeg,image/png,image/gif" onChange={handleChange} required />
          </FormGroup>

          <FormGroup>
            <Label>
              <FaUniversity /> Select Program:
            </Label>
            <Select name="program" value={formData.program} onChange={handleChange} required>
              <option value="">-- Select a Program --</option>
              {programs?.map((program) => (
                <option key={program.id} value={program.id}>
                  {program.name}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>
              <FaFileAlt /> Highest Qualification:
            </Label>
            <Input type="text" name="qualification" value={formData.qualification} onChange={handleChange} required />
          </FormGroup>

          <FormGroup>
            <Label>
              <FaFileAlt /> Work Experience:
            </Label>
            <Textarea name="experience" value={formData.experience} onChange={handleChange} required />
          </FormGroup>

          <FormGroup>
            <Label>
              <FaFileAlt /> Personal Statement:
            </Label>
            <Textarea name="statement" value={formData.statement} onChange={handleChange} required />
          </FormGroup>

          <RequiredDocuments />

          <FormGroup>
            <Label>
              <FaFileUpload /> Upload Application Documents (PDF) 5MB MAX:
            </Label>
            <p>Scan all the required documents as written above into a PDF file and upload here. (Please submit .pdf file only)</p>
            <Input type="file" name="file" accept="application/pdf" onChange={handleChange} required />
          </FormGroup>

          <FormGroup>
            <Label>
              Enter the exact amount you paid:
            </Label>
            <Input type="number" name="amountPaid" value={formData.amountPaid} onChange={handleChange} required />
          </FormGroup>

          <FormGroup>
            <Label>
              <FaFileUpload /> Upload Proof of Payment (Image) 5MB MAX:
            </Label>
            <p>Please upload a picture of your proof of payment. (JPG, PNG, or GIF only)</p>
            <Input type="file" name="proofOfPayment" accept="image/jpeg,image/png,image/gif" onChange={handleChange} required />
          </FormGroup>

          <SubmitButton type="submit">Submit Application</SubmitButton>
        </FormContainer>
      </FormSection>
    </ApplicationContainer>
  );
};

export default ApplicationPage;





const ApplicationContainer = styled.div`
  // font-family: 'Arial', sans-serif;
  color: #333;
`;

const HeroSection = styled.section`
  background: url(${bg});
  background-size:cover;
  background-position:top;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
`;

const HeroOverlay = styled.div`
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  color: white;
  border-radius: 10px;
  width: 80%;
  margin: 0 auto;
`;

const FormSection = styled.section`
  padding: 40px 20px;
  text-align: center;
`;

const FormContainer = styled.form`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  text-align: left;
`;

const Label = styled.label`
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
  height: 100px;
`;



// Add this styled component to your file
const VerifyButton = styled.button`
  background-color: ${props => props.$isVerified ? '#10b981' : '#3b82f6'}; /* Green if verified, Blue if not */
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${props => props.$isVerified ? '#059669' : '#2563eb'};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const SubmitButton = styled.button`
  background: #28a745;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  width: 100%;
  font-size: 1rem;
  margin-top: 10px;

  &:hover {
    background: #218838;
  }
`;

