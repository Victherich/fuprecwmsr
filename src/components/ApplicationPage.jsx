// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { FaUser, FaEnvelope, FaPhone, FaUniversity, FaFileAlt, FaFileUpload, FaMapMarkerAlt } from 'react-icons/fa';
// import Swal from 'sweetalert2';
// import applynow from '../Images/applynow.jpg'
// import { useNavigate } from 'react-router-dom';

// // Styled Components
// const ApplicationContainer = styled.div`
//   font-family: 'Arial', sans-serif;
//   color: #333;
// `;

// // Hero Section
// const HeroSection = styled.section`
//   background: url(${applynow}) center/cover no-repeat;
//   height: 80vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   text-align: center;
//   position: relative;
//   background-position:top;
// `;

// const HeroOverlay = styled.div`
//   background: rgba(0, 0, 0, 0.6);
//   padding: 20px;
//   color: white;
//   border-radius: 10px;
//   width: 80%;
//   margin:0 auto;

// `;

// const FormSection = styled.section`
//   padding: 40px 20px;
//   text-align: center;

//   h2{
//   margin:50px;
//   color:green;
//   }
// `;

// const FormContainer = styled.form`
//   max-width: 600px;
//   margin: auto;
//   padding: 20px;
//   background: #f8f9fa;
//   border-radius: 10px;
//   box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
// `;

// const FormGroup = styled.div`
//   margin-bottom: 15px;
//   text-align: left;
// `;

// const Label = styled.label`
//   font-weight: bold;
//   display: flex;
//   align-items: center;
//   gap: 8px;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   margin-top: 5px;
// `;

// const Select = styled.select`
//   width: 100%;
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   margin-top: 5px;
// `;

// const Textarea = styled.textarea`
//   width: 100%;
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   margin-top: 5px;
//   height: 100px;
// `;

// const SubmitButton = styled.button`
//   background: #28a745;
//   color: white;
//   padding: 10px 20px;
//   border-radius: 5px;
//   border: none;
//   cursor: pointer;
//   width: 100%;
//   font-size: 1rem;
//   margin-top: 10px;

//   &:hover {
//     background: #218838;
//   }
// `;

// const ApplicationPage = () => {

//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     address: '',
//     program: '',
//     qualification: '',
//     experience: '',
//     statement: '',
//     file: null
//   });

//   const handleChange = (e) => {
//     if (e.target.name === 'file') {
//       setFormData({ ...formData, file: e.target.files[0] });
//     } else {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // File validation
//     if (!formData.file || formData.file.type !== 'application/pdf') {
//       Swal.fire({
//         icon: 'error',
//         title: 'Invalid File',
//         text: 'Please upload a valid PDF file.',
//       });
//       return;
//     }

//     // Show loading
//     Swal.fire({
//       title: 'Submitting Application...',
//       text: 'Please wait while we process your application.',
//       allowOutsideClick: false,
//       showConfirmButton: false,
//       willOpen: () => {
//         Swal.showLoading();
//       }
//     });

//     try {
//       // Mock API request
//       setTimeout(() => {
//         Swal.fire({
//           icon: 'success',
//           title: 'Application Submitted',
//           text: 'Your application has been submitted successfully!',
//         });

//         // Reset form
//         setFormData({
//           fullName: '',
//           email: '',
//           phone: '',
//           address: '',
//           program: '',
//           qualification: '',
//           experience: '',
//           statement: '',
//           file: null
//         });
//       }, 2000);
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Submission Failed',
//         text: 'Something went wrong. Please try again.',
//       });
//     }
//   };

//   return (
//     <ApplicationContainer>

//       {/* Hero Section */}
//       <HeroSection>
      
//       </HeroSection>

//       {/* Application Form */}
//       <FormSection>
//       <HeroOverlay>
//           <h1>📄 Apply for Your Dream Program</h1>
//           <p>Take the next step in your career with CWMSR.</p>
//         </HeroOverlay>  
//         <h2>📝 Application Form</h2>

//         <p style={{marginBottom:"20px"}}>
//         Please fill the required information and upload all the required documents as stated in the <strong
//         style={{
//           color:"green", textDecoration:"underline", cursor:"pointer"
//         }}
//         onClick={()=>navigate('/admissions')}>Admissions</strong> and <strong
//         style={{
//           color:"green", textDecoration:"underline", cursor:"pointer"
//         }}
//         onClick={()=>navigate('/academics')}>Academics</strong> page of this site.
//         </p>
//         <FormContainer onSubmit={handleSubmit}>
          
//           {/* Full Name */}
//           <FormGroup>
//             <Label><FaUser /> Full Name:</Label>
//             <Input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
//           </FormGroup>

//           {/* Email */}
//           <FormGroup>
//             <Label><FaEnvelope /> Email:</Label>
//             <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
//           </FormGroup>

//           {/* Phone Number */}
//           <FormGroup>
//             <Label><FaPhone /> Phone Number:</Label>
//             <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
//           </FormGroup>

//           {/* Address */}
//           <FormGroup>
//             <Label><FaMapMarkerAlt /> Address:</Label>
//             <Input type="text" name="address" value={formData.address} onChange={handleChange} required />
//           </FormGroup>

//           {/* Program Selection */}
//           <FormGroup>
//             <Label><FaUniversity /> Select Program:</Label>
//             <Select name="program" value={formData.program} onChange={handleChange} required>
//               <option value="">-- Select a Program --</option>
//               <option value="Professional Diploma in Waste Management">Professional Diploma in Waste Management</option>
//               <option value="Master’s in Environmental Health Management">Master’s in Environmental Health Management</option>
//               <option value="PhD in Petroleum Waste Management">PhD in Petroleum Waste Management</option>
//               <option value="Master’s in Waste Management">Master’s in Waste Management</option>
//             </Select>
//           </FormGroup>

//           {/* Qualification */}
//           <FormGroup>
//             <Label><FaFileAlt /> Highest Qualification:</Label>
//             <Input type="text" name="qualification" value={formData.qualification} onChange={handleChange} required />
//           </FormGroup>

//           {/* Work Experience */}
//           <FormGroup>
//             <Label><FaFileAlt /> Work Experience:</Label>
//             <Textarea name="experience" value={formData.experience} onChange={handleChange} required />
//           </FormGroup>

//           {/* Personal Statement */}
//           <FormGroup>
//             <Label><FaFileAlt /> Personal Statement:</Label>
//             <Textarea name="statement" value={formData.statement} onChange={handleChange} required />
//           </FormGroup>

//           {/* File Upload */}
//           <FormGroup>
//             <Label><FaFileUpload /> Upload PDF:</Label>
//             <Input type="file" name="file" accept="application/pdf" onChange={handleChange} required />
//           </FormGroup>

//           {/* Submit Button */}
//           <SubmitButton type="submit">Submit Application</SubmitButton>
//         </FormContainer>
//       </FormSection>

//     </ApplicationContainer>
//   );
// };

// export default ApplicationPage;






import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUniversity, FaFileAlt, FaFileUpload } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import PaystackPop from "@paystack/inline-js";
import bg from '../Images/applynow.jpg'
import { Context } from './Context';

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

const ApplicationPage = () => {
  const navigate = useNavigate();
  const {programs} = useContext(Context)
  const [applicationFee, setApplicationFee]=useState(2000)
  // Form state to handle inputs
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    phone: '',
    confirmPhone:'',
    address: '',
    program: '',
    qualification: '',
    experience: '',
    statement: '',
    file: null
  });

  console.log(formData)

  const handleChange = (e) => {
    if (e.target.name === 'file') {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };






  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Password and Email confirmation validation
    if (formData.email !== formData.confirmEmail) {
      Swal.fire({
        icon: 'error',
        title: 'Email Mismatch',
        text: 'Your email and confirmation email do not match.',
      });
      return;
    }
  
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
  
    // File validation (size and type)
    if (!formData.file || formData.file.type !== 'application/pdf') {
      Swal.fire({
        icon: 'error',
        title: 'Invalid File',
        text: 'Please upload a valid PDF file.',
      });
      return;
    }
    
    // Optional: Add file size validation
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    if (formData.file.size > maxFileSize) {
      Swal.fire({
        icon: 'error',
        title: 'File Too Large',
        text: 'The file size exceeds the 5MB limit.',
      });
      return;
    }
  
    // Create a FormData object to send the data
    const formDataToSend = new FormData();
    formDataToSend.append('fullName', formData.fullName);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('program', formData.program);
    formDataToSend.append('qualification', formData.qualification);
    formDataToSend.append('experience', formData.experience);
    formDataToSend.append('statement', formData.statement);
    formDataToSend.append('file', formData.file);  // Ensure you're sending the file itself
    formDataToSend.append('transactionReference', '');  // Placeholder for transaction reference
    formDataToSend.append('amountPaid', ''); // Placeholder for amount paid
  
    // Show loading
    Swal.fire({
      title: 'Submitting Application...',
      text: 'Please wait while we process your application.',
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      }
    });
  
    // Call Paystack for payment
    payWithPaystack(formDataToSend); // Pass the formDataToSend so we can add transaction details after payment
  };
  
  const payWithPaystack = (formDataToSend) => {
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: 'pk_test_60e1f53bba7c80b60029bf611a26a66a9a22d4e4', // Use your Paystack public key
      amount: applicationFee * 100, // Sample amount in kobo
      email: formDataToSend.get('email'),
      firstname: formDataToSend.get('fullName'),
      onSuccess: (transaction) => {
        console.log("Payment successful:", transaction);
        Swal.fire({ icon: "success", text: "Payment successful!" });
  
        // Add the transaction reference and amount to formDataToSend
        formDataToSend.set('transactionReference', transaction.reference);
        formDataToSend.set('amountPaid', applicationFee); // Convert kobo to naira (or appropriate currency)
  
        // Submit the form data with the transaction reference and amount paid to the backend
        handleFinalSubmit(formDataToSend);
      },
      onCancel: () => {
        Swal.fire({ text: "Payment cancelled." });
      },
      onError: (error) => {
        Swal.fire({ text: `Payment failed: ${error.message}` });
      },
    });
  };
  
  const handleFinalSubmit = async (formDataToSend) => {
    console.log(formDataToSend);
    Swal.fire({text:"Submitting..."})
    Swal.showLoading();
    try {
      const response = await fetch("https://www.cwmsrfupre.com.ng/api/submit_admission_form.php", {
        method: "POST",
        body: formDataToSend,  // Sending FormData directly
      });
  
      const result = await response.json();
  
      if (result.success) {
        notifyAdminsOfApplication();
        Swal.fire({
          icon: 'success',
          text: "Application submitted successfully!",
          allowOutsideClick:false,
        })
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
    // Show loading alert
    Swal.fire({
      title: 'Submitting...',
      text: 'Please wait while we notify the administrators.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  
    try {
      const response = await fetch('https://www.cwmsrfupre.com.ng/api/notify_admins_on_application.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const result = await response.json();
  
      if (result.success) {
        Swal.fire({
          icon: 'success',
          title: 'Notified!',
          text: result.message || 'Admins have been notified successfully.',
          allowOutsideClick:false,
        }).then((result)=>{if(result.isConfirmed){window.location.reload()}});
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: result.error || 'Something went wrong while notifying admins.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'Could not send the notification. Please try again later.',
      });
    }
  };
  


  

  return (
    <ApplicationContainer>
      {/* Hero Section */}
      <HeroSection>
        
      </HeroSection>

      {/* Application Form */}
      <FormSection>
      <HeroOverlay>
      
          <h1>📄 Apply for Your Dream Program</h1>
          <p>Take the next step in your career with CWMSR.</p>
        </HeroOverlay>
        {/* <button onClick={notifyAdminsOfApplication}>test</button> */}
        <h2 style={{marginTop:"20px"}}>📝 Application Form</h2>
        <p style={{marginBottom:"20px"}}>
          Fill all the information and submit all the required documents according to our Academics page and our Admissions page.
        </p>
        <FormContainer onSubmit={handleSubmit}>
          {/* Full Name */}
          <FormGroup>
            <Label><FaUser /> Full Name:</Label>
            <Input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
          </FormGroup>

          {/* Email */}
          <FormGroup>
            <Label><FaEnvelope /> Email:</Label>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </FormGroup>

          {/* Confirm Email */}
          <FormGroup>
            <Label><FaEnvelope /> Confirm Email:</Label>
            <Input type="email" name="confirmEmail" value={formData.confirmEmail} onChange={handleChange} required />
          </FormGroup>

          {/* Password */}
          <FormGroup>
            <Label>🔑 Password:</Label>
            <p>Keep your password safe as you will be needing it to login to our portal if granted the admission. Otherwise , you can follow the forgot password link on the login page.</p>
            <Input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </FormGroup>

          {/* Confirm Password */}
          <FormGroup>
            <Label>🔑 Confirm Password:</Label>
            <Input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </FormGroup>

          {/* Phone Number */}
          <FormGroup>
            <Label><FaPhone /> Phone Number:</Label>
            <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </FormGroup>

          <FormGroup>
            <Label><FaPhone />Confirm Phone Number:</Label>
            <Input type="tel" name="confirmPhone" value={formData.confirmPhone} onChange={handleChange} required />
          </FormGroup>

          {/* Address */}
          <FormGroup>
            <Label><FaMapMarkerAlt /> Address:</Label>
            <Input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </FormGroup>

          {/* Program Selection */}
          <FormGroup>
            <Label><FaUniversity /> Select Program:</Label>
            <Select name="program" value={formData.program} onChange={handleChange} required>
              <option value="">-- Select a Program --</option>
              {
                programs.map((program)=>(
                  <option value={program.id}> 
                      {program.name}
                  </option>
                ))
              }
              {/* <option value="Professional Diploma in Waste Management">Professional Diploma in Waste Management</option>
              <option value="Master’s in Environmental Health Management">Master’s in Environmental Health Management</option>
              <option value="PhD in Petroleum Waste Management">PhD in Petroleum Waste Management</option>
              <option value="Master’s in Waste Management">Master’s in Waste Management</option> */}
            </Select>
          </FormGroup>

          {/* Qualification */}
          <FormGroup>
            <Label><FaFileAlt /> Highest Qualification:</Label>
            <Input type="text" name="qualification" value={formData.qualification} onChange={handleChange} required />
          </FormGroup>

          {/* Work Experience */}
          <FormGroup>
            <Label><FaFileAlt /> Work Experience:</Label>
            <Textarea name="experience" value={formData.experience} onChange={handleChange} required />
          </FormGroup>

          {/* Personal Statement */}
          <FormGroup>
            <Label><FaFileAlt /> Personal Statement:</Label>
            <Textarea name="statement" value={formData.statement} onChange={handleChange} required />
          </FormGroup>

          {/* File Upload */}
          <FormGroup>
            <Label><FaFileUpload /> Upload PDF:</Label>
            <p>Scan all the required documents as written in our admission page and application page in a pdf file and upload here.</p>
            <Input type="file" name="file" accept="application/pdf" onChange={handleChange} required />
          </FormGroup>

          {/* Submit Button */}
          <SubmitButton type="submit">Submit Application</SubmitButton>
        </FormContainer>
      </FormSection>
    </ApplicationContainer>
  );  
};

export default ApplicationPage;

