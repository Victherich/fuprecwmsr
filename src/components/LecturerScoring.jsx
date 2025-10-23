// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';
// import { Context } from './Context';
// import Swal from 'sweetalert2';

// const Container = styled.div`
//   padding: 40px;
//   max-width: 600px;
//   margin: auto;
//   background: #fff;
//   border-radius: 10px;
// //   box-shadow: 0 8px 24px rgba(0,0,0,0.1);
// `;

// const Title = styled.h2`
//   text-align: center;
//   margin-bottom: 20px;
//   color: #0a4d24;
// `;

// const Label = styled.label`
//   font-weight: bold;
//   margin-bottom: 5px;
//   display: block;
// `;

// const Select = styled.select`
//   width: 100%;
//   padding: 10px;
//   margin-bottom: 20px;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   margin-bottom: 20px;
// `;

// const Button = styled.button`
//   background: green;
//   color: white;
//   padding: 10px;
//   width: 100%;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background: darkorange;
//   }
// `;

// const Info = styled.div`
//   margin-top: 20px;
//   background: #f9f9f9;
//   padding: 20px;
//   border-radius: 8px;
// `;

// const LecturerScoring = () => {
//   const { courses } = useContext(Context);
//   const [selectedCourseId, setSelectedCourseId] = useState('');
//   const [admissionNumber, setAdmissionNumber] = useState('');
//   const [student, setStudent] = useState(null);
//   const [enrollmentData, setEnrollmentData]=useState(null);
//   const [scores, setScores] = useState({
//     assignment: '',
//     quiz: '',
//     exam: ''
//   });

//   const fetchStudent = async () => {

//     setStudent(null);
//     setEnrollmentData(null);
//     try {
//       const res = await axios.get(`https://www.cwmsrfupre.com.ng/api/get_student_by_admission_number.php?admission_number=${admissionNumber}`);
//       if (res.data.success) {
//         setStudent(res.data.student);
//         getEnrollmentByStudentAndCourse(res.data.student.id,selectedCourseId )
//         // console.log(res.data.student.id);
//       } else {
//         Swal.fire({text:res.data.error});
//       }
//     } catch (err) {
//       Swal.fire({text:'Error fetching student'});
//       console.error(err);
//     }
//   };




  
//   const getEnrollmentByStudentAndCourse = async (studentId, courseId) => {
//     if (!studentId || !courseId) {
//       Swal.fire('Missing Fields', 'Please provide both Student ID and Course ID.', 'warning');
//       return null;
//     }
  
//     try {
//       // Show loading
//       Swal.fire({
//         title: 'Fetching Enrollment...',
//         allowOutsideClick: false,
//         didOpen: () => {
//           Swal.showLoading();
//         }
//       });
  
//       const response = await axios.get(
//         `https://www.cwmsrfupre.com.ng/api/get_enrollment_by_course_id_and_student_id.php`,
//         {
//           params: {
//             student_id: studentId,
//             course_id: courseId,
//             t: Date.now() // Prevent caching
//           }
//         }
//       );
  
//       Swal.close(); // Close loading
  
//       if (response.data.success) {
//         Swal.fire('Success', 'Enrollment data loaded successfully.', 'success');
//         setEnrollmentData(response.data.enrollment);
//         console.log(response.data.enrollment);
//       } else {
//         Swal.fire('Not Found', response.data.error || 'Enrollment not found.', 'info');
//         return null;
//       }
  
//     } catch (error) {
//       Swal.fire('Error', 'Something went wrong while fetching enrollment.', 'error');
//       console.error(error);
//       return null;
//     }
//   };
  




//   const submitScores = async () => {
// Swal.fire({text:"Please wait.."})
// Swal.showLoading();

//     try {
//       const res = await axios.post(`https://www.cwmsrfupre.com.ng/api/submit_scores.php`, {
//         student_id: student.id,
//         course_id: selectedCourseId,
//         assignment_score: scores.assignment,
//         quiz_score: scores.quiz,
//         exam_score: scores.exam
//       });

//       if (res.data.success) {
//         Swal.fire({text:'Scores submitted successfully!'});
//         setScores({ assignment: '', quiz: '', exam: '' });
//         fetchStudent();
//       } else {
//         Swal.fire({text:res.data.error});
//       }
//     } catch (err) {
//       Swal.fire({text:'Error submitting scores'});
//       console.error(err);
//     }
//   };

//   return (
//     <Container>
//       <Title>Score a Student</Title>

//       <Label>Select Course</Label>
//       <Select value={selectedCourseId} onChange={e => setSelectedCourseId(e.target.value)}>
//         <option value="">-- Select --</option>
//         {courses.map(course => (
//           <option key={course.id} value={course.id}>{course.code} - {course.title}</option>
//         ))}
//       </Select>

//       <Label>Enter Student Admission Number</Label>
//       <Input
//         placeholder="e.g. CWMS/2021/0021"
//         value={admissionNumber}
//         onChange={e => setAdmissionNumber(e.target.value)}
//       />
//       <Button onClick={fetchStudent}>Fetch Student</Button>

//       {student && enrollmentData &&(
//         <Info>
//           <p><strong>Name:</strong> {student.full_name}</p>
//           <p><strong>Admission No:</strong> {student.admission_number}</p>
//           <Label>Total Score: {enrollmentData.total_score}</Label>
// <br/>
//           <Label>Assignment Score: {enrollmentData.assignment_score}</Label>
//           (Add positive or negative numbers to add or subtract score)
//           <Input
//             type="number"
//             value={scores.assignment}
//             onChange={e => setScores({ ...scores, assignment: e.target.value })}
//           />

//           <Label>Quiz Score: {enrollmentData.quiz_score}</Label>
//           (Add positive or negative numbers to add or subtract score)
//           <Input
//             type="number"
//             value={scores.quiz}
//             onChange={e => setScores({ ...scores, quiz: e.target.value })}
//           />

//           <Label>Exam Score: {enrollmentData.exam_score}</Label>
//           (Add positive or negative numbers to add or subtract score)
//           <Input
//             type="number"
//             value={scores.exam}
//             onChange={e => setScores({ ...scores, exam: e.target.value })}
//           />

//           <Button onClick={submitScores}>Submit Scores</Button>
//           <Button onClick={()=>{setStudent(null);setEnrollmentData(null); setAdmissionNumber('')}} style={{color:"green", backgroundColor:"white", border:"1px solid green", marginTop:"10px"}}>Close</Button>
//         </Info>
//       )}
//     </Container>
//   );
// };

// export default LecturerScoring;



import React, { useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { Context } from "./Context";
import Swal from "sweetalert2";

// ---------- Styled Components ----------
const Container = styled.div`
  padding: 40px;
  max-width: 600px;
  margin: auto;
  background: #fff;
  border-radius: 10px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #0a4d24;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background: green;
  color: white;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: darkorange;
  }
`;

const Info = styled.div`
  margin-top: 20px;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 300;
`;

const Modal = styled.div`
  background: white;
  padding: 30px 40px;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  position: relative;
  animation: fadeIn 0.25s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 14px;
  background: none;
  border: none;
  font-size: 22px;
  color: #777;
  cursor: pointer;

  &:hover {
    color: #000;
  }
`;

// ---------- Component ----------
const LecturerScoring = () => {
  const { courses } = useContext(Context);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [student, setStudent] = useState(null);
  const [enrollmentData, setEnrollmentData] = useState(null);
  const [scores, setScores] = useState({
    assignment: "",
    quiz: "",
    exam: "",
  });
  const [showModal, setShowModal] = useState(false);

  const fetchStudent = async () => {
    setStudent(null);
    setEnrollmentData(null);
    try {
      const res = await axios.get(
        `https://www.cwmsrfupre.com.ng/api/get_student_by_admission_number.php?admission_number=${admissionNumber}`
      );
      if (res.data.success) {
        setStudent(res.data.student);
        getEnrollmentByStudentAndCourse(res.data.student.id, selectedCourseId);
      } else {
        Swal.fire({ text: res.data.error });
      }
    } catch (err) {
      Swal.fire({ text: "Error fetching student" });
      console.error(err);
    }
  };

  const getEnrollmentByStudentAndCourse = async (studentId, courseId) => {
    if (!studentId || !courseId) {
      Swal.fire(
        "Missing Fields",
        "Please provide both Student ID and Course ID.",
        "warning"
      );
      return null;
    }

    try {
      Swal.fire({
        title: "Fetching Enrollment...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await axios.get(
        `https://www.cwmsrfupre.com.ng/api/get_enrollment_by_course_id_and_student_id.php`,
        {
          params: {
            student_id: studentId,
            course_id: courseId,
            t: Date.now(),
          },
        }
      );

      Swal.close();

      if (response.data.success) {
        Swal.fire("Success", "Enrollment data loaded successfully.", "success");
        setEnrollmentData(response.data.enrollment);
        setShowModal(true); // ✅ open modal when ready
      } else {
        Swal.fire(
          "Not Found",
          response.data.error || "Enrollment not found.",
          "info"
        );
        return null;
      }
    } catch (error) {
      Swal.fire(
        "Error",
        "Something went wrong while fetching enrollment.",
        "error"
      );
      console.error(error);
      return null;
    }
  };

  const submitScores = async () => {
    Swal.fire({ text: "Please wait..." });
    Swal.showLoading();

    try {
      const res = await axios.post(
        `https://www.cwmsrfupre.com.ng/api/submit_scores.php`,
        {
          student_id: student.id,
          course_id: selectedCourseId,
          assignment_score: scores.assignment,
          quiz_score: scores.quiz,
          exam_score: scores.exam,
        }
      );

      if (res.data.success) {
        Swal.fire({ text: "Scores submitted successfully!" });
        setScores({ assignment: "", quiz: "", exam: "" });
        setShowModal(false);
        fetchStudent();
      } else {
        Swal.fire({ text: res.data.error });
      }
    } catch (err) {
      Swal.fire({ text: "Error submitting scores" });
      console.error(err);
    }
  };

  return (
    <Container>
      <Title>Score a Student</Title>

      <Label>Select Course</Label>
      <Select
        value={selectedCourseId}
        onChange={(e) => setSelectedCourseId(e.target.value)}
      >
        <option value="">-- Select --</option>
        {courses.map((course) => (
          <option key={course.id} value={course.id}>
            {course.code} - {course.title}
          </option>
        ))}
      </Select>

      <Label>Enter Student Admission Number</Label>
      <Input
        placeholder="e.g. CWMS/2021/0021"
        value={admissionNumber}
        onChange={(e) => setAdmissionNumber(e.target.value)}
      />
      <Button onClick={fetchStudent}>Fetch Student</Button>

      {/* --- Scoring Modal --- */}
      {showModal && student && enrollmentData && (
        <Backdrop>
          <Modal>
            <CloseButton
              onClick={() => {
                setShowModal(false);
                setStudent(null);
                setEnrollmentData(null);
              }}
            >
              &times;
            </CloseButton>

            <Title style={{ fontSize: "22px", marginBottom: "10px" }}>
              Score for {student.full_name}
            </Title>
            <p>
              <strong>Admission No:</strong> {student.admission_number}
            </p>
            <p>
              <strong>Total Score:</strong> {enrollmentData.total_score}
            </p>

            <Label>Assignment Score: {enrollmentData.assignment_score}</Label>
            <small>(Add positive or negative numbers)</small>
            <Input
              type="number"
              value={scores.assignment}
              onChange={(e) =>
                setScores({ ...scores, assignment: e.target.value })
              }
            />

            <Label>Quiz Score: {enrollmentData.quiz_score}</Label>
            <small>(Add positive or negative numbers)</small>
            <Input
              type="number"
              value={scores.quiz}
              onChange={(e) => setScores({ ...scores, quiz: e.target.value })}
            />

            <Label>Exam Score: {enrollmentData.exam_score}</Label>
            <small>(Add positive or negative numbers)</small>
            <Input
              type="number"
              value={scores.exam}
              onChange={(e) => setScores({ ...scores, exam: e.target.value })}
            />

            <Button onClick={submitScores}>Submit Scores</Button>
          </Modal>
        </Backdrop>
      )}
    </Container>
  );
};

export default LecturerScoring;
