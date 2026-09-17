// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { FaUserGraduate, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFileAlt, FaCheckCircle } from 'react-icons/fa';
// import { MdWork, MdSchool } from 'react-icons/md';
// import Swal from 'sweetalert2';
// import { use } from 'react';
// import { useContext } from 'react';
// import { Context } from './Context';
// import UpdateLevelSemesterModal from "./UpdateLevelSemesterModal";
// import AdmissionSessionsModal from './AdmissionSessionModal';



// // ---------- Styled Components ----------
// const Container = styled.div`
//   background-color: #f9fff9;
//   padding: 100px 20px;
//   min-height: 100vh;
//   font-family: 'Segoe UI', sans-serif;
//   display: flex;
//   // flex-direction:column;
//   justify-content: center;
//   align-items: flex-start;
//   position:fixed;
//   left:0;
//   top:0;
//   z-index:999;
//   width:100%;
//   height:100%;
//   overflow-y:scroll;
// `;

// const Card = styled.div`
//   background-color: white;
//   border-radius: 16px;
//   padding: 10px;
//   width: 100%;
//   max-width: 800px;
//   // box-shadow: 0 4px 12px rgba(0, 100, 0, 0.1);
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
// `;

// const Title = styled.h2`
//   color: #006400;
//   font-size: 2rem;
//   text-align: center;
//   margin-bottom: 1rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 0.6rem;
// `;

// const Field = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.8rem;
//   font-size: 1.1rem;
//   flex-wrap: wrap;
//   color: #333;
// `;

// const Label = styled.span`
//   font-weight: 600;
//   color: #006400;
// `;

// const Error = styled.div`
//   color: red;
//   text-align: center;
//   margin-top: 2rem;
// `;

// const Loading = styled.div`
//   text-align: center;
//   color: #666;
//   margin-top: 2rem;
//   font-style: italic;
// `;

// const ButtonWrap = styled.div`
// display:flex;
// justify-content:center;
// align-items:center;
// gap:10px;
// flex-wrap:wrap;
// width:100%;
// `


// const Button = styled.button`
// padding:10px;
// color:green;
// background-color:white;

// cursor:pointer;
// border:1px solid green;
// border-radius :10px;

// &:hover{
// background-color:green;
// color:white;
// }
// `



// // ---------- Main Component ----------
// const StudentProfile = ({id, setStudentProfileId, handleGetAllstudents}) => {
//   // const { id } = useParams(); // Get ID from route param
//   const [student, setStudent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const {programs, api_url}=useContext(Context);
//   const [showModal, setShowModal] = useState(false);
// const [open, setOpen] = useState(false);



// // console.log(student)
//   // fetching a student by id
 

//     const handleGetStudentById = ()=>{
//     axios.get(`${api_url}/get_student_by_id.php?id=${id}`)
//       .then(res => {
//         if (res.data.success) {
//           setStudent(res.data.student);
//           console.log(res.data.student)
//         } else {
//           setError(res.data.error || 'Student not found.');
//         }
//         setLoading(false);
//       })
//       .catch(err => {
//         setError('Error fetching student data.');
//         setLoading(false);
//       });

//     };

//     useEffect(() => {
//       handleGetStudentById()
//   }, [id]);




// // ddeleting as student
// const deleteStudent = async (studentId) => {
//   // Confirm before deleting
//   const result = await Swal.fire({
//     title: 'Are you sure?',
//     text: 'This will permanently delete the student record.',
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#d33',
//     cancelButtonColor: '#3085d6',
//     confirmButtonText: 'Yes, delete it!',
//   });

//   if (result.isConfirmed) {
//     // Show loading
//     Swal.fire({
//       title: 'Deleting...',
//       didOpen: () => {
//         Swal.showLoading();
//       },
//       allowOutsideClick: false,
//       allowEscapeKey: false,
//     });

//     try {
//       const res = await axios.post(`${api_url}/delete_student.php`, { id: studentId });
      
//       if (res.data.success) {
//         Swal.fire('Deleted!', 'Student has been deleted.', 'success');
//        setStudentProfileId(false);
//        handleGetAllstudents();

//       } else {
//         Swal.fire('Error', res.data.error || 'Something went wrong.', 'error');
//       }
//     } catch (err) {
//       console.error(err);
//       Swal.fire('Error', 'Failed to delete student. Please try again.', 'error');
//     }
//   }
// };





// const handleAdmitStudent = (studentId,selectedSession)=>{
//   if(student.program>16&&student.program<21){
//     admitProfessionalPGDStudent(studentId,selectedSession)
//   }else if(student.program>20 && student.program<25){
//     admitProfessionalMastersStudent(studentId, selectedSession)
//   }else if(student.program>24&&student.program<29){
// admitProfessionalDoctorateStudent(studentId, selectedSession)
//   }
  
//   else{
//     admitStudent(studentId, selectedSession)
//   }
// } 





// // admitting a student
// const admitStudent = async (studentId, selectedSession) => {


//   if(student.status==="admitted"){
//     Swal.fire({text:"student is already admitted"})
//     return;
//   }
//   // Confirm with the user
//   const confirmation = await Swal.fire({
//     title: 'Are you sure?',
//     text: "This will mark the student as 'Admitted'.",
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#aaa',
//     confirmButtonText: 'Yes, admit student'
//   });

//   if (confirmation.isConfirmed) {
//     // Show loading
//     Swal.fire({
//       title: 'Updating...',
//       text: 'Please wait while we update the student status.',
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       }
//     });

//     try {
//       const response = await axios.post(`${api_url}/admit_student.php`, {
//         id: studentId, admission_session: selectedSession
//       });

//       if (response.data.success) {
//         Swal.fire({
//           title: 'Success ✅',
//           text: response.data.message || 'Student status updated to admitted.',
//           icon: 'success'
//         });
//         handleGetStudentById();
//         setOpen(false);
//       } else {
//         throw new Error(response.data.error || 'Unknown error occurred.');
//       }
//     } catch (error) {
//       Swal.fire({
//         title: 'Error ❌',
//         text: error.message || 'Failed to update student status.',
//         icon: 'error'
//       });
//     }
//   }
// };






// // admitting a student
// const admitProfessionalPGDStudent = async (studentId, selectedSession) => {


//   if(student.status==="admitted"){
//     Swal.fire({text:"student is already admitted.."})
//     return;
//   }
//   // Confirm with the user
//   const confirmation = await Swal.fire({
//     title: 'Are you sure?',
//     text: "This will mark the student as 'Admitted'.",
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#aaa',
//     confirmButtonText: 'Yes, admit student'
//   });

//   if (confirmation.isConfirmed) {
//     // Show loading
//     Swal.fire({
//       title: 'Updating..._',
//       text: 'Please wait while we update the student status.',
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       }
//     });

//     try {
//       const response = await axios.post(`${api_url}/admit_professionalPGD_student.php`, {
//         id: studentId, admission_session: selectedSession
//       });

//       if (response.data.success) {
//         Swal.fire({
//           title: 'Success ✅',
//           text: response.data.message || 'Student status updated to admitted.',
//           icon: 'success'
//         });
//         handleGetStudentById();
//         setOpen(false);
//       } else {
//         throw new Error(response.data.error || 'Unknown error occurred.');
//       }
//     } catch (error) {
//       Swal.fire({
//         title: 'Error ❌',
//         text: error.message || 'Failed to update student status.',
//         icon: 'error'
//       });
//     }
//   }
// };

// // admitting a student
// const admitProfessionalMastersStudent = async (studentId, selectedSession) => {


//   if(student.status==="admitted"){
//     Swal.fire({text:"student is already admitted..."})
//     return;
//   }
//   // Confirm with the user
//   const confirmation = await Swal.fire({
//     title: 'Are you sure?',
//     text: "This will mark the student as 'Admitted'.",
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#aaa',
//     confirmButtonText: 'Yes, admit student'
//   });

//   if (confirmation.isConfirmed) {
//     // Show loading
//     Swal.fire({
//       title: 'Updating...',
//       text: 'Please wait while we update the student status.',
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       }
//     });

//     try {
//       const response = await axios.post(`${api_url}/admit_professionalMasters_student.php`, {
//         id: studentId, admission_session: selectedSession
//       });

//       if (response.data.success) {
//         Swal.fire({
//           title: 'Success ✅',
//           text: response.data.message || 'Student status updated to admitted.',
//           icon: 'success'
//         });
//         handleGetStudentById();
//         setOpen(false);
//       } else {
//         throw new Error(response.data.error || 'Unknown error occurred.');
//       }
//     } catch (error) {
//       Swal.fire({
//         title: 'Error ❌',
//         text: error.message || 'Failed to update student status.',
//         icon: 'error'
//       });
//     }
//   }
// };

// // admitting a student
// const admitProfessionalDoctorateStudent = async (studentId, selectedSession) => {


//   if(student.status==="admitted"){
//     Swal.fire({text:"student is already admitted...."})
//     return;
//   }
//   // Confirm with the user
//   const confirmation = await Swal.fire({
//     title: 'Are you sure?',
//     text: "This will mark the student as 'Admitted'.",
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#aaa',
//     confirmButtonText: 'Yes, admit student'
//   });

//   if (confirmation.isConfirmed) {
//     // Show loading
//     Swal.fire({
//       title: 'Updating...',
//       text: 'Please wait while we update the student status.',
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       }
//     });

//     try {
//       const response = await axios.post(`${api_url}/admit_professionalDoctorate_student.php`, {
//         id: studentId, admission_session: selectedSession
//       });

//       if (response.data.success) {
//         Swal.fire({
//           title: 'Success ✅',
//           text: response.data.message || 'Student status updated to admitted.',
//           icon: 'success'
//         });
//         handleGetStudentById();
//         setOpen(false);
//       } else {
//         throw new Error(response.data.error || 'Unknown error occurred.');
//       }
//     } catch (error) {
//       Swal.fire({
//         title: 'Error ❌',
//         text: error.message || 'Failed to update student status.',
//         icon: 'error'
//       });
//     }
//   }
// };











// const cancelStudentAdmission = async (studentId) => {

//   if(student.status==="applied"){
//     Swal.fire({text:"student is not admitted"})
//     return;
//   }


//   const confirm = await Swal.fire({
//     title: 'Reset Status to Applied?',
//     text: 'This will reset the student’s status back to "applied".',
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonText: 'Yes, update it!',
//     cancelButtonText: 'Cancel',
//   });

//   if (confirm.isConfirmed) {
//     try {
//       Swal.fire({
//         title: 'Updating...',
//         text: 'Please wait while we update the student status.',
//         allowOutsideClick: false,
//         didOpen: () => {
//           Swal.showLoading();
//         },
//       });

//       const response = await axios.post(`${api_url}/cancel_student_admission.php`, {
//         id: studentId,
//       });

//       Swal.close();

//       if (response.data.success) {
//         Swal.fire({
//           title: '✅ Updated!',
//           text: response.data.message || 'Student status has been reset to applied.',
//           icon: 'success',
//         });
//         handleGetStudentById();
//       } else {

//         Swal.fire({
//           title: '❌ Failed!',
//           text: response.data.error || 'Could not update the student status.',
//           icon: 'error',
//         });
//         console.log(response.data)
//       }
//     } catch (error) {
//       Swal.close();
//       Swal.fire({
//         title: '🚫 Error!',
//         text: 'Something went wrong. Please try again.',
//         icon: 'error',
//       });
//       console.error('Update error:', error);
//     }
//   }
// };




// // suspend a student

// const suspendStudent = async (studentId) => {
//   const confirmation = await Swal.fire({
//     title: 'Are you sure?',
//     text: 'Do you want to suspend this student?',
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#d33',
//     cancelButtonColor: '#3085d6',
//     confirmButtonText: 'Yes, suspend!',
//     cancelButtonText: 'Cancel'
//   });

//   if (confirmation.isConfirmed) {
//     try {
//       Swal.fire({
//         title: 'Suspending...',
//         text: 'Please wait while the student is being suspended.',
//         allowOutsideClick: false,
//         didOpen: () => {
//           Swal.showLoading();
//         }
//       });

//       const response = await axios.post(`${api_url}/suspend_student.php`, {
//         id: studentId
//       });

//       if (response.data.success) {
//         Swal.fire({
//           icon: 'success',
//           title: 'Suspended!',
//           text: response.data.message || 'Student has been suspended successfully.',
//         });
//         handleGetStudentById();
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Error!',
//           text: response.data.error || 'Failed to suspend student.',
//         });
//       }

//     } catch (error) {
//       console.error(error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Something went wrong while suspending the student.',
//       });
//     }
//   }
// };




// // unsuspend student
// const unsuspendStudent = (studentId) => {
//   // Show confirmation before unsuspending the student
//   Swal.fire({
//     title: 'Are you sure?',
//     text: 'This will unsuspend the student and change their status to "Not Suspended".',
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonText: 'Yes, Unsuspend!',
//     cancelButtonText: 'Cancel',
//   }).then((result) => {
//     if (result.isConfirmed) {
//       // Show loading state while the action is being processed
//       setLoading(true);
//       Swal.showLoading();

//       // Make the base call to unsuspend the student
//       axios
//         .post(`${api_url}/unsuspend_student.php`, { id: studentId })
//         .then((response) => {
//           setLoading(false);
//           if (response.data.success) {
//             Swal.fire({
//               title: 'Success!',
//               text: response.data.message,
//               icon: 'success',
//             });
//             handleGetStudentById();

//           } else {
//             Swal.fire({
//               title: 'Error!',
//               text: response.data.error || 'Failed to unsuspend student.',
//               icon: 'error',
//             });
//           }
//         })
//         .catch((error) => {
//           setLoading(false);
//           Swal.fire({
//             title: 'Error!',
//             text: 'There was an error processing the request.',
//             icon: 'error',
//           });
//           console.error(error);
//         });
//     }
//   });
// };





// // admitting a student
// const graduateStudent = async (studentId) => {


//   if(student.status==="applied"){
//     Swal.fire({text:"student is not admitted"})
//     return;
//   }

//   if(student.status==="graduated"){
//     Swal.fire({text:"student is already graduated"})
//     return;
//   }

//   if(student.suspension==="suspended"){
//     Swal.fire({text:"student is suspended"})
//     return;
//   }
//   // Confirm with the user
//   const confirmation = await Swal.fire({
//     title: 'Are you sure?',
//     text: "This will mark the student as 'Graduated'.",
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#aaa',
//     confirmButtonText: 'Yes, graduate student'
//   });

//   if (confirmation.isConfirmed) {
//     // Show loading
//     Swal.fire({
//       title: 'Updating...',
//       text: 'Please wait while we update the student status.',
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       }
//     });

//     try {
//       const response = await axios.post(`${api_url}/graduate_student.php`, {
//         id: studentId
//       });

//       if (response.data.success) {
//         Swal.fire({
//           title: 'Success ✅',
//           text: response.data.message || 'Student status updated to Graduated.',
//           icon: 'success'
//         });
//         handleGetStudentById();
//       } else {
//         throw new Error(response.data.error || 'Unknown error occurred.');
//       }
//     } catch (error) {
//       Swal.fire({
//         title: 'Error ❌',
//         text: error.message || 'Failed to update student status.',
//         icon: 'error'
//       });
//     }
//   }
// };



// // jsx
//   return (
//     <Container>
//       {loading && <Loading>⏳ Loading student profile...</Loading>}
//       {error && <Error>❌ {error}</Error>}

//       {student && (
//         <Card>
//           <Title><FaUserGraduate /> {student.full_name}</Title>
// <Field><FaEnvelope /> <Label>Institution Email:</Label> {student.email}</Field>
//           <Field><FaEnvelope /> <Label>Personal Email:</Label> {student.email2}</Field>
//           <Field><FaPhone /> <Label>Phone:</Label> {student.phone}</Field>
//           <Field><FaMapMarkerAlt /> <Label>Address:</Label> {student.address}</Field>
//           <Field><MdSchool /> <Label>Program:</Label>  {
//       programs.find(p => p.id == student.program)?.name || 'N/A'
//     }</Field>
//           <Field><MdWork /> <Label>Qualification:</Label> {student.qualification}</Field>

//           {student.experience && (
//             <Field><FaFileAlt /> <Label>Experience:</Label> {student.experience}</Field>
//           )}

//           {student.statement && (
//             <Field><FaFileAlt /> <Label>Statement:</Label> {student.statement}</Field>
//           )}
//           <Field><FaEnvelope /> <Label>Admission number:</Label> {student.admission_number?student.admission_number:"Not yet Admitted"}</Field>
//           <Field>
//   <FaEnvelope /> 
//   <Label>Level:</Label> 
//   {student.admission_number
//     ? JSON.parse(student.level_semester).level_id
//     : "Not yet Admitted"}
// </Field>

//   <Field>
//   <FaEnvelope /> 
//   <Label>Semester:</Label> 
//   {student.admission_number
//     ? JSON.parse(student.level_semester).semester_id
//     : "Not yet Admitted"}
// </Field>
// <Field ><FaCheckCircle /> <Label>Status:</Label><p style={{backgroundColor:"green", padding:"5px", color:"white", borderRadius:"5px"}}>{student.status.toUpperCase()}</p>  </Field>
// {student.admission_session && <Field ><FaCheckCircle /> <Label>Admission Session:</Label><p >{student?.admission_session}</p>  </Field>}
//           <Field ><FaCheckCircle /> <Label>Suspension:</Label><p style={{backgroundColor:student.suspension==="suspended"?"red":"rgba(0,0,255,0.5)", padding:"5px", color:"white", borderRadius:"5px"}}>{student.suspension.toUpperCase()}</p>  </Field>
    
    
//     <ButtonWrap>
//     <Button onClick={() => window.open(`${api_url}/${student.file_path}`, '_blank')}>
//   View Application Documents
// </Button>
// <Button onClick={() => window.open(`${api_url}/${student.proof_of_payment_path}`, '_blank')}>
//   View Proof of Application payment
// </Button>

//     {student.status!=='graduated'&&<Button onClick={() => setOpen(true)}>
//         Grant Admission
//       </Button>}
//       {student.status!=='graduated'&&<Button onClick={()=>cancelStudentAdmission(student.id)}>
//         Cancel Admission
//       </Button>}
//       {student.status!=='graduated'&&<Button onClick={()=>graduateStudent(student.id)}>
//         Graduate Student
//       </Button>}
//       {student.status!=='graduated'&&<Button onClick={()=>suspendStudent(student.id)}>
//         Suspend
//       </Button>}
//       {student.status!=='graduated'&&<Button onClick={()=>unsuspendStudent(student.id)}>
//         Unsuspend
//       </Button>}
//       <Button onClick={()=>deleteStudent(student.id)}>
//         Delete
//       </Button>
  
//       <Button onClick={() => setShowModal(true)}>
//   Update Level / Semester
// </Button>
//   <Button onClick={()=>{setStudentProfileId(false);handleGetAllstudents()}}>
//         Back
//       </Button>

//     </ButtonWrap>
          
//         </Card>
//       )}

//     <UpdateLevelSemesterModal
//   show={showModal}
//   onClose={() => setShowModal(false)}
//   student={student}
//   refreshStudent={handleGetStudentById}
// />

//  <AdmissionSessionsModal
//          isOpen={open}
//          onClose={() => setOpen(false)}
//        student={student}
//        handleAdmitStudent={handleAdmitStudent}
//       />
//     </Container>
//   );
// };

// export default StudentProfile;


import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaUserGraduate, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFileAlt, FaCheckCircle, FaUserCircle, FaTimes } from 'react-icons/fa';
import { MdWork, MdSchool } from 'react-icons/md';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { Context } from './Context';
import UpdateLevelSemesterModal from "./UpdateLevelSemesterModal";
import AdmissionSessionsModal from './AdmissionSessionModal';
import StudentEnrollmentsForAdmin from './StudentEnrollmentsForAdmin';
import StudentResult from './StudentResult';
import StudentPaymentProofs from './StudentPaymentProofs';

// ---------- Styled Components ----------
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 500;
  padding: 5px;
  overflow-y: auto;
`;

const Container = styled.div`
  background-color: #f0fff5;
  padding: 5px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 6px;
  border: 1px solid green;
  box-shadow: 0 4px 12px rgba(0, 128, 0, 0.2);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-family: 'Segoe UI', sans-serif;
`;

const CloseIconButton = styled.button`
  position: sticky;
  top: 0;
  align-self: flex-end;
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  font-size: 0.85rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: -24px; // Pulls it up nicely into the corner

  &:hover {
    opacity: 0.85;
  }
`;

const Section = styled.div`
  border: 1px solid green;
  border-radius: 4px;
  padding: 5px;
  background-color: #f9fff9;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const SectionTitle = styled.h3`
  color: green;
  font-size: 0.95rem;
  font-weight: 700;
  margin: 0;
  border-bottom: 1px solid green;
  padding-bottom: 2px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ProfileHeaderLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;

  @media(min-width: 600px) {
    flex-direction: row;
  }
`;

const ProfileAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid green;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0fff5;
  color: green;
  font-size: 2rem;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Title = styled.h2`
  color: green;
  font-size: 1.15rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Field = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.85rem;
  flex-wrap: wrap;
  color: #333;
`;

const Label = styled.span`
  font-weight: 600;
  color: green;
`;

const Badge = styled.span`
  background-color: green;
  padding: 2px 5px;
  color: white;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const Error = styled.div`
  color: red;
  text-align: center;
  margin-top: 5px;
  font-size: 0.85rem;
`;

const Loading = styled.div`
  text-align: center;
  color: gray;
  margin-top: 5px;
  font-style: italic;
  font-size: 0.85rem;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
  width: 100%;
`;

const Button = styled.button`
  padding: 4px 8px;
  color: green;
  background-color: white;
  cursor: pointer;
  border: 1px solid green;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  margin: 0;

  &:hover {
    background-color: green;
    color: white;
  }
`;

// ---------- Main Component ----------
const StudentProfile = ({ id, setStudentProfileId, handleGetAllstudents }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { programs, api_url, semesters } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [highestSemester, setHighestSemester]=useState('')

  console.log(student)

  const handleGetStudentById = () => {
    axios.get(`${api_url}/get_student_by_id.php?id=${id}`)
      .then(res => {
        if (res.data.success) {
          setStudent(res.data.student);
        } else {
          setError(res.data.error || 'Student not found.');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching student data.');
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetStudentById();
  }, [id]);

  const closeModal = () => {
    setStudentProfileId(false);
    handleGetAllstudents();
  };

  const deleteStudent = async (studentId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the student record.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      Swal.fire({
        title: 'Deleting...',
        didOpen: () => { Swal.showLoading(); },
        allowOutsideClick: false,
      });

      try {
        const res = await axios.post(`${api_url}/delete_student.php`, { id: studentId });
        if (res.data.success) {
          Swal.fire('Deleted!', 'Student has been deleted.', 'success');
          closeModal();
        } else {
          Swal.fire('Error', res.data.error || 'Something went wrong.', 'error');
        }
      } catch (err) {
        Swal.fire('Error', 'Failed to delete student. Please try again.', 'error');
      }
    }
  };

  // const handleAdmitStudent = (studentId, selectedSession) => {
  //   if (student.program > 16 && student.program < 21) {
  //     admitProfessionalPGDStudent(studentId, selectedSession);
  //   } else if (student.program > 20 && student.program < 25) {
  //     admitProfessionalMastersStudent(studentId, selectedSession);
  //   } else if (student.program > 24 && student.program < 29) {
  //     admitProfessionalDoctorateStudent(studentId, selectedSession);
  //   } else {
  //     admitStudent(studentId, selectedSession);
  //   }
  // };


  

  // const admitStudent = async (studentId, selectedSession) => {


  //   if (student.status === "admitted") {
  //     Swal.fire({ text: "Student is already admitted" });
  //     return;
  //   }
  //   const confirmation = await Swal.fire({
  //     title: 'Are you sure?',
  //     text: "This will mark the student as 'Admitted'.",
  //     icon: 'warning',
  //     showCancelButton: true,
  //   });

  //   if (confirmation.isConfirmed) {
  //     Swal.fire({ title: 'Updating...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
  //     try {
  //       const response = await axios.post(`${api_url}/admit_student.php`, { id: studentId, admission_session: selectedSession });
  //       if (response.data.success) {
  //         Swal.fire({ title: 'Success ✅', icon: 'success' });
  //         handleGetStudentById();
  //         setOpen(false);
  //       } else {
  //         throw new Error(response.data.error || 'Unknown error occurred.');
  //       }
  //     } catch (error) {
  //       Swal.fire({ title: 'Error ❌', text: error.message, icon: 'error' });
  //     }
  //   }
  // };



  const admitStudent = async (studentId, selectedSession) => {
    
    if (student.status === "admitted") {
      Swal.fire({ text: "Student is already admitted" });
      return;
    }

    const confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: "This will mark the student as 'Admitted'.",
      icon: 'warning',
      showCancelButton: true,
    });

    if (confirmation.isConfirmed) {
      Swal.fire({ title: 'Updating...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
      
      try {
        // Find the program code using student.program (matching the program id)
        const matchedProgram = programs.find(p => p.id === Number(student.program));
        const programCode = matchedProgram ? matchedProgram.code : '';

        const response = await axios.post(`${api_url}/admit_student.php`, { 
          id: studentId, 
          admission_session: selectedSession,
          program_code: programCode // <--- Added program code here
        });

        if (response.data.success) {
          Swal.fire({ title: 'Success ✅', icon: 'success' });
          handleGetStudentById();
          setOpen(false);
        } else {
          throw new Error(response.data.error || 'Unknown error occurred.');
        }
      } catch (error) {
        Swal.fire({ title: 'Error ❌', text: error.message, icon: 'error' });
      }
    }
  };



  // const admitProfessionalPGDStudent = async (studentId, selectedSession) => {
  //   if (student.status === "admitted") { Swal.fire({ text: "Student is already admitted.." }); return; }
  //   const confirmation = await Swal.fire({ title: 'Are you sure?', icon: 'warning', showCancelButton: true });
  //   if (confirmation.isConfirmed) {
  //     Swal.fire({ title: 'Updating...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
  //     try {
  //       const response = await axios.post(`${api_url}/admit_professionalPGD_student.php`, { id: studentId, admission_session: selectedSession });
  //       if (response.data.success) { Swal.fire({ title: 'Success ✅', icon: 'success' }); handleGetStudentById(); setOpen(false); }
  //     } catch (error) { Swal.fire({ title: 'Error ❌', text: error.message, icon: 'error' }); }
  //   }
  // };

  // const admitProfessionalMastersStudent = async (studentId, selectedSession) => {
  //   if (student.status === "admitted") { Swal.fire({ text: "Student is already admitted..." }); return; }
  //   const confirmation = await Swal.fire({ title: 'Are you sure?', icon: 'warning', showCancelButton: true });
  //   if (confirmation.isConfirmed) {
  //     Swal.fire({ title: 'Updating...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
  //     try {
  //       const response = await axios.post(`${api_url}/admit_professionalMasters_student.php`, { id: studentId, admission_session: selectedSession });
  //       if (response.data.success) { Swal.fire({ title: 'Success ✅', icon: 'success' }); handleGetStudentById(); setOpen(false); }
  //     } catch (error) { Swal.fire({ title: 'Error ❌', text: error.message, icon: 'error' }); }
  //   }
  // };

  // const admitProfessionalDoctorateStudent = async (studentId, selectedSession) => {
  //   if (student.status === "admitted") { Swal.fire({ text: "Student is already admitted...." }); return; }
  //   const confirmation = await Swal.fire({ title: 'Are you sure?', icon: 'warning', showCancelButton: true });
  //   if (confirmation.isConfirmed) {
  //     Swal.fire({ title: 'Updating...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
  //     try {
  //       const response = await axios.post(`${api_url}/admit_professionalDoctorate_student.php`, { id: studentId, admission_session: selectedSession });
  //       if (response.data.success) { Swal.fire({ title: 'Success ✅', icon: 'success' }); handleGetStudentById(); setOpen(false); }
  //     } catch (error) { Swal.fire({ title: 'Error ❌', text: error.message, icon: 'error' }); }
  //   }
  // };

  const cancelStudentAdmission = async (studentId) => {
    if (student.status === "applied") { Swal.fire({ text: "Student is not admitted" }); return; }
    const confirm = await Swal.fire({ title: 'Cancel student Admission?', icon: 'warning', showCancelButton: true });
    if (confirm.isConfirmed) {
      try {
        Swal.fire({ title: 'Updating...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
        const response = await axios.post(`${api_url}/cancel_student_admission.php`, { id: studentId });
        Swal.close();
        if (response.data.success) {
          Swal.fire({ title: '✅ Updated!', icon: 'success' });
          handleGetStudentById();
        }
      } catch (error) {
        console.error(error)
        Swal.close(); }
    }
  };

  const suspendStudent = async (studentId) => {
    const confirmation = await Swal.fire({ title: 'Are you sure?', icon: 'warning', showCancelButton: true });
    if (confirmation.isConfirmed) {
      try {
        Swal.fire({ title: 'Suspending...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
        const response = await axios.post(`${api_url}/suspend_student.php`, { id: studentId });
        if (response.data.success) { Swal.fire({ icon: 'success', title: 'Suspended!' }); handleGetStudentById(); }
      } catch (error) { console.error(error); }
    }
  };

  const unsuspendStudent = (studentId) => {
    Swal.fire({ title: 'Are you sure?', icon: 'warning', showCancelButton: true }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        axios.post(`${api_url}/unsuspend_student.php`, { id: studentId })
          .then((response) => {
            setLoading(false);
            if (response.data.success) { Swal.fire({ title: 'Success!', icon: 'success' }); handleGetStudentById(); }
          });
      }
    });
  };

  const graduateStudent = async (studentId) => {
    if (student.status === "applied") { Swal.fire({ text: "Student is not admitted" }); return; }
    if (student.status === "graduated") { Swal.fire({ text: "Student is already graduated" }); return; }
    if (student.suspension === "suspended") { Swal.fire({ text: "Student is suspended" }); return; }
    
    const confirmation = await Swal.fire({ title: 'Are you sure?', icon: 'warning', showCancelButton: true });
    if (confirmation.isConfirmed) {
      Swal.fire({ title: 'Updating...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
      try {
        const response = await axios.post(`${api_url}/graduate_student.php`, { id: studentId });
        if (response.data.success) { Swal.fire({ title: 'Success ✅', icon: 'success' }); handleGetStudentById(); }
      } catch (error) { Swal.fire({ title: 'Error ❌', icon: 'error' }); }
    }
  };

// useEffect(() => {
//     const fetchCurrentSemester = async () => {
//       try {
//         const timestamp = new Date().getTime();
//         const response = await fetch(`${api_url}/get_highest_semester.php?_t=${timestamp}`, {
//           method: 'POST',
//           headers: { 
//             'Content-Type': 'application/json',
//             'Cache-Control': 'no-cache, no-store, must-revalidate',
//             'Pragma': 'no-cache',
//             'Expires': '0'
//           },
//           body: JSON.stringify({ student_id: id })
//         });
        
//         const result = await response.json();
//         if (result.success) {
//           console.log("Current Academic Status (Semester ID):", result.current_semester_id);
//           // Set your state here, e.g., setCurrentSemester(result.current_semester_id);
//         } else {
//           console.log(result.error);
//         }
//       } catch (error) {
//         console.error("Error fetching semester:", error);
//       }
//     };

//     if (id) {
//       fetchCurrentSemester();
//     }
//   }, [id]);

 useEffect(() => {
        async function fetchHighestSemester() {
            try {
                const apiBaseUrl = `${api_url}/current_semester_check.php`;
                const response = await fetch(`${apiBaseUrl}?student_id=${encodeURIComponent(id)}`);
                const data = await response.json();

                if (data.success) {
                    setHighestSemester(data.highest_semester_id);
                } else {
                    console.error(data.error);
                }
            } catch (error) {
                console.error('Error fetching semester:', error);
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            fetchHighestSemester();
        }
    }, [id]);




  return (
    <Overlay onClick={closeModal}>
      <Container onClick={(e) => e.stopPropagation()}>
        {/* Sticky Red Close Button */}
        <CloseIconButton onClick={closeModal} title="Close">
          <FaTimes />
        </CloseIconButton>

        {loading && <Loading>⏳ Loading student profile...</Loading>}
        {error && <Error>❌ {error}</Error>}

        {student && (
          <>
            {/* Section 1: Profile Header & Avatar */}
            <Section>
              <ProfileHeaderLayout>
                <ProfileAvatar>
                  {student.profile_image ? (
                    <img src={`${api_url}/${student.profile_image}`} alt={student.full_name} />
                  ) : (
                    <FaUserCircle />
                  )}
                </ProfileAvatar>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <Title><FaUserGraduate /> {student.full_name}</Title>
                  <Field>
                    <Label>Admission Number:</Label>
                    {student.admission_number ? student.admission_number : student.status}
                  </Field>
                  <Field>
                    <Label>Date of Admission:</Label>
                    {student.admission_date || 'N/A'}
                  </Field>
                </div>
              </ProfileHeaderLayout>
            </Section>

            {/* Section 2: Current Academic & Status Details */}
            <Section>
              <SectionTitle><FaCheckCircle /> Academic Status & Standing</SectionTitle>
                   <Field>
                 <Label>Program:</Label> {programs.find(p => p.id == student.program)?.name || 'N/A'}
              </Field>
              <Field>
                <Label>Admission Status:</Label>
                <Badge>{student.status.toUpperCase()}</Badge>
              </Field>
              <Field>
                <Label>Admission Session:</Label>
                {student.admission_session || 'N/A'}
              </Field>
               <Field>
                <Label>Current Academic Status:</Label>
                  {semesters?.find((s) => Number(s.id) === Number(highestSemester))?.name || `Semester ${highestSemester}`}
              </Field>
              {/* <Field>
                <Label>Level:</Label>
                {student.admission_number ? JSON.parse(student.level_semester).level_id : "Not yet Admitted"}
              </Field> */}
              {/* <Field>
                <Label>Semester:</Label>
                {student.admission_number ? JSON.parse(student.level_semester).semester_id : "Not yet Admitted"}
              </Field> */}
              <Field>
                <Label>Suspension State:</Label>
                <span style={{ backgroundColor: student.suspension === "suspended" ? "red" : "blue", padding: "2px 5px", color: "white", borderRadius: "4px", fontSize: "0.75rem", fontWeight: "600" }}>
                  {student.suspension.toUpperCase()}
                </span>
              </Field>
            </Section>

            {/* Section 3: Personal & Contact Information */}
            <Section>
              <SectionTitle><FaPhone /> Contact Information</SectionTitle>
              <Field><FaEnvelope /> <Label>Institution Email:</Label> {student.email}</Field>
              <Field><FaEnvelope /> <Label>Personal Email:</Label> {student.email2 || 'N/A'}</Field>
              <Field><FaPhone /> <Label>Phone:</Label> {student.phone || 'N/A'}</Field>
              <Field><FaMapMarkerAlt /> <Label>Address:</Label> {student.address || 'N/A'}</Field>
            </Section>

            {/* Section 4: Program & Educational Background */}
            <Section>
              <SectionTitle><MdSchool /> Program & Background</SectionTitle>
              <Field>
                <MdSchool /> <Label>Program:</Label> {programs.find(p => p.id == student.program)?.name || 'N/A'}
              </Field>
              <Field>
                <MdWork /> <Label>Qualification:</Label> {student.qualification || 'N/A'}
              </Field>
              {student.experience && (
                <Field><FaFileAlt /> <Label>Experience:</Label> {student.experience}</Field>
              )}
              {student.statement && (
                <Field><FaFileAlt /> <Label>Statement:</Label> {student.statement}</Field>
              )}
            </Section>

            {/* Section 5: Documents & Administrative Actions */}
            <Section>
              <SectionTitle><FaFileAlt /> Actions & Documents</SectionTitle>
              <ButtonWrap>
                <Button onClick={() => window.open(`${api_url}/${student.file_path}`, '_blank')}>
                  View Application Documents
                </Button>
                <Button onClick={() => window.open(`${api_url}/${student.proof_of_payment_path}`, '_blank')}>
                  View Application P O P 
                </Button>

                {student.status !== 'graduated' && <Button onClick={() => setOpen(true)}>Grant Admission</Button>}
                {student.status !== 'graduated' && <Button onClick={() => cancelStudentAdmission(student.id)}>Cancel Admission</Button>}
                 {student.status !== 'graduated' && <Button onClick={() => suspendStudent(student.id)}>Suspend</Button>}
                {student.status !== 'graduated' && <Button onClick={() => unsuspendStudent(student.id)}>Unsuspend</Button>}
                
                {/* <Button onClick={() => setShowModal(true)}>Update Level / Semester</Button> */}
                <Button onClick={() => deleteStudent(student.id)} style={{ color: 'red', borderColor: 'red' }}>Delete</Button>
                <Button onClick={closeModal}>Back</Button>
              </ButtonWrap>
            </Section>
          </>
        )}

        <UpdateLevelSemesterModal
          show={showModal}
          onClose={() => setShowModal(false)}
          student={student}
          refreshStudent={handleGetStudentById}
        />

        <AdmissionSessionsModal
          isOpen={open}
          onClose={() => setOpen(false)}
          student={student}
          handleAdmitStudent={admitStudent}
        />

       
        <StudentEnrollmentsForAdmin
        student={student}
        />

         <StudentPaymentProofs
         id={id}
         />

        <StudentResult
        id={id}
        />
      </Container>
    </Overlay>
  );
};

export default StudentProfile;