
// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import styled from 'styled-components';
// import { Context } from './Context';
// import { useSelector } from 'react-redux';

// // Styled Components
// const Container = styled.div`
//   padding: 40px;
//   max-width: 600px;
//   margin: auto;
//   background-color: white;
//   border-radius: 10px;
// //   box-shadow: 0 8px 24px rgba(0,0,0,0.1);
// `;

// const Title = styled.h2`
//   font-size: 28px;
//   font-weight: bold;
//   margin-bottom: 20px;
//   text-align: center;
//   color: #0a4d24;
// `;

// const Description = styled.p`
//   margin-bottom: 30px;
//   font-size: 16px;
//   color: #444;
//   text-align: center;
// `;

// const Label = styled.label`
//   display: block;
//   margin-bottom: 6px;
//   font-weight: bold;
//   color: #333;
// `;

// const Select = styled.select`
//   width: 100%;
//   padding: 10px 14px;
//   margin-bottom: 20px;
//   border: 1px solid #ccc;
//   border-radius: 6px;
//   font-size: 16px;
// `;

// const Button = styled.button`
//   background-color: green;
//   color: white;
//   font-size: 16px;
//   padding: 12px;
//   width: 100%;
//   border: none;
//   border-radius: 6px;
//   cursor: pointer;
//   transition: background-color 0.2s ease-in;

//   &:hover {
//     background-color: darkorange;
//   }
// `;



// const EnrolledCoursesSection = styled.div`
//   margin-top: 40px;
// `;

// const Card = styled.div`
//   border: 1px solid #ddd;
//   padding: 16px;
//   margin-bottom: 16px;
//   border-radius: 8px;
//   background: #f9f9f9;
// `;

// const CardRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 8px;
// `;

// const CardLabel = styled.span`
//   font-weight: bold;
//   color: #555;
// `;

// const CardValue = styled.span`
//   color: #222;
// `;


// const SearchInput = styled.input`
//   width: 100%;
//   padding: 10px 14px;
//   margin-bottom: 16px;
//   border: 1px solid #ccc;
//   border-radius: 6px;
//   font-size: 16px;
// `;


// const EnrollPage2 = ({ lecturerId }) => {
// const [student, setStudent]=useState({})
//     const { levels, semesters, courses } = useContext(Context);
//     const [error, setError]=useState("");
  
//     const [selectedLevel, setSelectedLevel] = useState('');
//     const [selectedSemester, setSelectedSemester] = useState('');
//     const [selectedCourse, setSelectedCourse] = useState('');
//     const [enrolledCourses, setEnrolledCourses] = useState([]);
//     const [searchTerm, setSearchTerm]=useState('');

    
//       useEffect(() => {
//         if (!studentId) return;
    
//         axios.get(`https://www.cwmsrfupre.com.ng/api/get_student_by_id.php?id=${studentId}`)
//           .then(res => {
//             if (res.data.success) {
//               setStudent(res.data.student);
//             //   console.log(res.data.student)
            
//             } else {
//               setError(res.data.error);
//             }
//           })
//           .catch(() => {
//             setError('Failed to fetch admin details.');
//           });
//       }, [studentId]);

  
  
//     // Filter courses based on level, semester, and program
//     const filteredCourses = courses.filter(course => 
//       course.level_id == selectedLevel &&
//       course.semester_id == selectedSemester &&
//       course.program_id == student.program
//     );
  
//     const handleEnroll = async () => {
//       if (!selectedCourse) {
//         return Swal.fire('Error', 'Please select a course.', 'error');
//       }
  
//       try {
//         Swal.fire({
//           title: 'Enrolling...',
//           didOpen: () => Swal.showLoading()
//         });
  
//         const res = await axios.post('https://www.cwmsrfupre.com.ng/api/enroll_course.php', {
//           student_id: student.id,
//           course_id: selectedCourse
//         });
  
//         if (res.data.success) {
//           Swal.fire('Success', res.data.message, 'success');
//           fetchEnrolledCourses();
//         } else {
//           Swal.fire('Error', res.data.error, 'error');
//         }
//       } catch (err) {
//         Swal.fire('Error', 'Something went wrong.', 'error');
//       }
//     };



    

//     const fetchEnrolledCourses = () => {
//       axios.get(`https://www.cwmsrfupre.com.ng/api/get_enrolled_courses.php?student_id=${student.id}`)
//         .then(res => {
//           if (res.data.success) {
//             setEnrolledCourses(res.data.enrollments);
//           } else {
//             setEnrolledCourses([]);
//           }
//         })
//         .catch(() => {
//           console.error("Error fetching enrolled courses");
//         });
//     };
    
//     useEffect(() => {
//       if (student.id) {
//         fetchEnrolledCourses();
//       }
//     }, [student]);
    

// // const search = ()=>{
// //     const newObj=enrolledCourses.filter(course => course.code.toLowerCase().includes(searchTerm.toLowerCase()));
// // setEnrolledCourses(newObj);
// // }

// // useEffect(()=>{
// //     search();
// // },[searchTerm])

  
//     return (
//       <Container>
//         <Title>Course Enrollment</Title>
//         <Description>
//           Please enroll in your courses by selecting the appropriate level and semester.
//         </Description>
  
//         <div>
//           <Label>Level</Label>
//           <Select
//             value={selectedLevel}
//             onChange={(e) => {
//               setSelectedLevel(e.target.value);
//               setSelectedCourse('');
//             }}
//           >
//             <option value="">Select Level</option>
//             {levels.map(level => (
//               <option key={level.id} value={level.id}>{level.name}</option>
//             ))}
//           </Select>
//         </div>
  
//         <div>
//           <Label>Semester</Label>
//           <Select
//             value={selectedSemester}
//             onChange={(e) => {
//               setSelectedSemester(e.target.value);
//               setSelectedCourse('');
//             }}
//           >
//             <option value="">Select Semester</option>
//             {semesters.map(sem => (
//               <option key={sem.id} value={sem.id}>{sem.name}</option>
//             ))}
//           </Select>
//         </div>
  
//         <div>
//           <Label>Courses</Label>
//           <Select
//             value={selectedCourse}
//             onChange={e => setSelectedCourse(e.target.value)}
//             disabled={!selectedLevel || !selectedSemester}
//           >
//             <option value="">Select Course</option>
//             {filteredCourses.map(course => (
//               <option key={course.id} value={course.id}>{course.code} - {course.title}</option>
//             ))}
//           </Select>
//         </div>
  
//         <Button onClick={handleEnroll}>Enroll</Button>

//         <EnrolledCoursesSection>
//   <Title>My Enrolled Courses</Title>

//     {/* 🔍 Search by Course Code */}
//     {/* <div>
//         <Label>You can also search by Course Code</Label>
//         <SearchInput
//           type="text"
//           placeholder="e.g., CSC101"
//           value={searchTerm}
//           onChange={e => setSearchTerm(e.target.value)}
      
//         />
//       </div> */}



//   {enrolledCourses.length === 0 ? (
//     <Description>No courses enrolled yet.</Description>
//   ) : (
//     enrolledCourses.map((enroll) => {
//       const course = courses.find(c => c.id == enroll.course_id);
//       return (
//         <Card key={enroll.id}>
//           <CardRow>
//             <CardLabel>Code:</CardLabel>
//             <CardValue>{course?.code || 'N/A'}</CardValue>
//           </CardRow>
//           <CardRow>
//             <CardLabel>Title:</CardLabel>
//             <CardValue>{course?.title || 'N/A'}</CardValue>
//           </CardRow>
//           <CardRow>
//             <CardLabel>Assignment Score:</CardLabel>
//             <CardValue>{enroll.assignment_score}</CardValue>
//           </CardRow>
//           <CardRow>
//             <CardLabel>Quiz Score:</CardLabel>
//             <CardValue>{enroll.quiz_score}</CardValue>
//           </CardRow>
//           <CardRow>
//             <CardLabel>Exam Score:</CardLabel>
//             <CardValue>{enroll.exam_score}</CardValue>
//           </CardRow>
//           <CardRow>
//             <CardLabel>Total Score:</CardLabel>
//             <CardValue>{enroll.total_score}</CardValue>
//           </CardRow>
//         </Card>
//       );
//     })
//   )}
// </EnrolledCoursesSection>

//       </Container>
//     );
//   };
  
// export default EnrollPage2;



// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import styled from 'styled-components';
// import { Context } from './Context';

// // Styled Components (same as before)...

// // Styled Components
// const Container = styled.div`
//   padding: 40px;
//   max-width: 600px;
//   margin: auto;
//   background-color: white;
//   border-radius: 10px;
// //   box-shadow: 0 8px 24px rgba(0,0,0,0.1);
// `;

// const Title = styled.h2`
//   font-size: 28px;
//   font-weight: bold;
//   margin-bottom: 20px;
//   text-align: center;
//   color: #0a4d24;
// `;

// const Description = styled.p`
//   margin-bottom: 30px;
//   font-size: 16px;
//   color: #444;
//   text-align: center;
// `;

// const Label = styled.label`
//   display: block;
//   margin-bottom: 6px;
//   font-weight: bold;
//   color: #333;
// `;

// const Select = styled.select`
//   width: 100%;
//   padding: 10px 14px;
//   margin-bottom: 20px;
//   border: 1px solid #ccc;
//   border-radius: 6px;
//   font-size: 16px;
// `;

// const Button = styled.button`
//   background-color: green;
//   color: white;
//   font-size: 16px;
//   padding: 12px;
//   width: 100%;
//   border: none;
//   border-radius: 6px;
//   cursor: pointer;
//   transition: background-color 0.2s ease-in;

//   &:hover {
//     background-color: darkorange;
//   }
// `;



// const EnrolledCoursesSection = styled.div`
//   margin-top: 40px;
// `;

// const Card = styled.div`
//   border: 1px solid #ddd;
//   padding: 16px;
//   margin-bottom: 16px;
//   border-radius: 8px;
//   background: #f9f9f9;
// `;

// const CardRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 8px;
// `;

// const CardLabel = styled.span`
//   font-weight: bold;
//   color: #555;
// `;

// const CardValue = styled.span`
//   color: #222;
// `;


// const SearchInput = styled.input`
//   width: 100%;
//   padding: 10px 14px;
//   margin-bottom: 16px;
//   border: 1px solid #ccc;
//   border-radius: 6px;
//   font-size: 16px;
// `;


// const EnrollLecturerPage = ({ lecturerId }) => {
//   const { levels, semesters, courses } = useContext(Context);
//   const [lecturer, setLecturer] = useState({});
//   const [error, setError] = useState("");

//   const [selectedLevel, setSelectedLevel] = useState('');
//   const [selectedSemester, setSelectedSemester] = useState('');
//   const [selectedCourse, setSelectedCourse] = useState('');
//   const [assignedCourses, setAssignedCourses] = useState([]);

//   useEffect(() => {
//     if (!lecturerId) return;

//     axios.get(`https://www.cwmsrfupre.com.ng/api/get_lecturer_by_id.php?id=${lecturerId}`)
//       .then(res => {
//         if (res.data.success) {
//           setLecturer(res.data.lecturer);
//         } else {
//           setError(res.data.error);
//         }
//       })
//       .catch(() => {
//         setError('Failed to fetch lecturer details.');
//       });
//   }, [lecturerId]);

//   const filteredCourses = courses.filter(course =>
//     course.level_id == selectedLevel &&
//     course.semester_id == selectedSemester 
//     // course.program_id == lecturer.program
//   );

//   const handleAssign = async () => {
//     if (!selectedCourse) {
//       return Swal.fire('Error', 'Please select a course.', 'error');
//     }

//     try {
//       Swal.fire({
//         title: 'Assigning...',
//         didOpen: () => Swal.showLoading()
//       });

//       const res = await axios.post('https://www.cwmsrfupre.com.ng/api/lecturer_enroll_course.php', {
//         lecturer_id: lecturerId,
//         course_id: selectedCourse
//       });

//       if (res.data.success) {
//         Swal.fire('Success', res.data.message, 'success');
//         fetchAssignedCourses();
//       } else {
//         Swal.fire('Error', res.data.error, 'error');
//       }
//     } catch (err) {
//       Swal.fire('Error', 'Something went wrong.', 'error');
//     }
//   };

//   const fetchAssignedCourses = () => {
//     axios.get(`https://www.cwmsrfupre.com.ng/api/get_lecturer_enrolled_courses.php?lecturer_id=${lecturerId}`)
//       .then(res => {
//         if (res.data.success) {
//           setAssignedCourses(res.data.enrollments);
//         } else {
//           setAssignedCourses([]);
//         }
//       })
//       .catch(() => {
//         console.error("Error fetching assigned courses");
//       });
//   };

//   useEffect(() => {
//     if (lecturerId) {
//       fetchAssignedCourses();
//     }
//   }, [lecturer]);

//   return (
//     <Container>
//       <Title>Lecturer Course Enrollment </Title>
//       <Description>
//         Assign courses to yourself by selecting level and semester.
//       </Description>

//       <div>
//         <Label>Level</Label>
//         <Select
//           value={selectedLevel}
//           onChange={(e) => {
//             setSelectedLevel(e.target.value);
//             setSelectedCourse('');
//           }}
//         >
//           <option value="">Select Level</option>
//           {levels.map(level => (
//             <option key={level.id} value={level.id}>{level.name}</option>
//           ))}
//         </Select>
//       </div>

//       <div>
//         <Label>Semester</Label>
//         <Select
//           value={selectedSemester}
//           onChange={(e) => {
//             setSelectedSemester(e.target.value);
//             setSelectedCourse('');
//           }}
//         >
//           <option value="">Select Semester</option>
//           {semesters.map(sem => (
//             <option key={sem.id} value={sem.id}>{sem.name}</option>
//           ))}
//         </Select>
//       </div>

//       <div>
//         <Label>Courses</Label>
//         <Select
//           value={selectedCourse}
//           onChange={e => setSelectedCourse(e.target.value)}
//           disabled={!selectedLevel || !selectedSemester}
//         >
//           <option value="">Select Course</option>
//           {filteredCourses.map(course => (
//             <option key={course.id} value={course.id}>{course.code} - {course.title}</option>
//           ))}
//         </Select>
//       </div>

//       <Button onClick={handleAssign}>Assign Course</Button>

//       <EnrolledCoursesSection>
//         <Title>My Courses</Title>
//         {assignedCourses?.length === 0 ? (
//           <Description>No courses assigned yet.</Description>
//         ) : (
//           assignedCourses?.map((assignment) => {
//             const course = courses.find(c => c.id == assignment.course_id);
//             return (
//               <Card key={assignment.id}>
//                 <CardRow>
//                   <CardLabel>Code:</CardLabel>
//                   <CardValue>{course?.code || 'N/A'}</CardValue>
//                 </CardRow>
//                 <CardRow>
//                   <CardLabel>Title:</CardLabel>
//                   <CardValue>{course?.title || 'N/A'}</CardValue>
//                 </CardRow>
//               </Card>
//             );
//           })
//         )}
//       </EnrolledCoursesSection>
//     </Container>
//   );
// };

// export default EnrollLecturerPage;














// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import styled from "styled-components";
// import { Context } from "./Context";

// // ---------- Styled Components ----------
// const Backdrop = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.45);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 2000;
// `;

// const ModalContainer = styled.div`
//   background: #fff;
//   border-radius: 16px;
//   width: 90%;
//   max-width: 600px;
//   padding: 32px 40px;
//   box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
//   position: relative;
//   animation: slideIn 0.3s ease-in-out;

//   @keyframes slideIn {
//     from {
//       opacity: 0;
//       transform: translateY(-20px);
//     }
//     to {
//       opacity: 1;
//       transform: translateY(0);
//     }
//   }
// `;

// const CloseButton = styled.button`
//   position: absolute;
//   top: 14px;
//   right: 14px;
//   background: transparent;
//   border: none;
//   font-size: 20px;
//   cursor: pointer;
//   color: #888;

//   &:hover {
//     color: #333;
//   }
// `;

// const Title = styled.h2`
//   font-size: 26px;
//   font-weight: 700;
//   text-align: center;
//   margin-bottom: 16px;
//   color: #0a4d24;
// `;

// const Description = styled.p`
//   text-align: center;
//   color: #555;
//   margin-bottom: 30px;
//   font-size: 15px;
// `;

// const Label = styled.label`
//   display: block;
//   font-weight: 600;
//   color: #333;
//   margin-bottom: 6px;
// `;

// const Select = styled.select`
//   width: 100%;
//   padding: 10px 14px;
//   margin-bottom: 20px;
//   border-radius: 8px;
//   border: 1px solid #ccc;
//   font-size: 15px;
//   transition: border-color 0.2s ease-in-out;

//   &:focus {
//     border-color: #0a4d24;
//     outline: none;
//   }
// `;

// const Button = styled.button`
//   width: 100%;
//   padding: 12px;
//   background-color: #0a4d24;
//   color: white;
//   border: none;
//   border-radius: 8px;
//   font-size: 16px;
//   font-weight: 600;
//   cursor: pointer;
//   transition: all 0.25s ease-in-out;

//   &:hover {
//     background-color: darkorange;
//     transform: translateY(-2px);
//   }
// `;

// const EnrolledCoursesSection = styled.div`
//   margin-top: 40px;
// `;

// const Card = styled.div`
//   background: #f8f8f8;
//   border: 1px solid #e0e0e0;
//   padding: 16px;
//   border-radius: 8px;
//   margin-bottom: 16px;
// `;

// const CardRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 6px;
// `;

// const CardLabel = styled.span`
//   font-weight: 600;
//   color: #555;
// `;

// const CardValue = styled.span`
//   color: #111;
// `;

// // ---------- Component ----------
// const EnrollLecturerPage = ({ lecturerId, onClose }) => {
//   const { levels, semesters, courses } = useContext(Context);
//   const [lecturer, setLecturer] = useState({});
//   const [selectedLevel, setSelectedLevel] = useState("");
//   const [selectedSemester, setSelectedSemester] = useState("");
//   const [selectedCourse, setSelectedCourse] = useState("");
//   const [assignedCourses, setAssignedCourses] = useState([]);

//   useEffect(() => {
//     if (!lecturerId) return;
//     axios
//       .get(`https://www.cwmsrfupre.com.ng/api/get_lecturer_by_id.php?id=${lecturerId}`)
//       .then((res) => {
//         if (res.data.success) setLecturer(res.data.lecturer);
//       })
//       .catch(() => {
//         Swal.fire("Error", "Failed to fetch lecturer details.", "error");
//       });
//   }, [lecturerId]);

//   const filteredCourses = courses.filter(
//     (c) => c.level_id == selectedLevel && c.semester_id == selectedSemester
//   );

//   const fetchAssignedCourses = () => {
//     axios
//       .get(
//         `https://www.cwmsrfupre.com.ng/api/get_lecturer_enrolled_courses.php?lecturer_id=${lecturerId}`
//       )
//       .then((res) => {
//         if (res.data.success) {
//           setAssignedCourses(res.data.enrollments);
//         } else {
//           setAssignedCourses([]);
//         }
//       });
//   };

//   useEffect(() => {
//     if (lecturerId) fetchAssignedCourses();
//   }, [lecturer]);

//   const handleAssign = async () => {
//     if (!selectedCourse)
//       return Swal.fire("Error", "Please select a course.", "error");

//     try {
//       Swal.fire({
//         title: "Assigning...",
//         didOpen: () => Swal.showLoading(),
//       });

//       const res = await axios.post(
//         "https://www.cwmsrfupre.com.ng/api/lecturer_enroll_course.php",
//         {
//           lecturer_id: lecturerId,
//           course_id: selectedCourse,
//         }
//       );

//       if (res.data.success) {
//         Swal.fire("Success", res.data.message, "success");
//         fetchAssignedCourses();
//       } else {
//         Swal.fire("Error", res.data.error, "error");
//       }
//     } catch {
//       Swal.fire("Error", "Something went wrong.", "error");
//     }
//   };

//   return (
//     <Backdrop>
//       <ModalContainer>
//         <CloseButton onClick={onClose}>&times;</CloseButton>

//         <Title>Lecturer Course Enrollment</Title>
//         <Description>
//           Assign courses to yourself by selecting level and semester.
//         </Description>

//         {/* Select Controls */}
//         <div>
//           <Label>Level</Label>
//           <Select
//             value={selectedLevel}
//             onChange={(e) => {
//               setSelectedLevel(e.target.value);
//               setSelectedCourse("");
//             }}
//           >
//             <option value="">Select Level</option>
//             {levels.map((level) => (
//               <option key={level.id} value={level.id}>
//                 {level.name}
//               </option>
//             ))}
//           </Select>
//         </div>

//         <div>
//           <Label>Semester</Label>
//           <Select
//             value={selectedSemester}
//             onChange={(e) => {
//               setSelectedSemester(e.target.value);
//               setSelectedCourse("");
//             }}
//           >
//             <option value="">Select Semester</option>
//             {semesters.map((sem) => (
//               <option key={sem.id} value={sem.id}>
//                 {sem.name}
//               </option>
//             ))}
//           </Select>
//         </div>

//         <div>
//           <Label>Course</Label>
//           <Select
//             value={selectedCourse}
//             onChange={(e) => setSelectedCourse(e.target.value)}
//             disabled={!selectedLevel || !selectedSemester}
//           >
//             <option value="">Select Course</option>
//             {filteredCourses.map((course) => (
//               <option key={course.id} value={course.id}>
//                 {course.code} - {course.title}
//               </option>
//             ))}
//           </Select>
//         </div>

//         <Button onClick={handleAssign}>Assign Course</Button>

//         <EnrolledCoursesSection>
//           <Title>My Courses</Title>
//           {assignedCourses.length === 0 ? (
//             <Description>No courses assigned yet.</Description>
//           ) : (
//             assignedCourses.map((assignment) => {
//               const course = courses.find((c) => c.id == assignment.course_id);
//               return (
//                 <Card key={assignment.id}>
//                   <CardRow>
//                     <CardLabel>Code:</CardLabel>
//                     <CardValue>{course?.code || "N/A"}</CardValue>
//                   </CardRow>
//                   <CardRow>
//                     <CardLabel>Title:</CardLabel>
//                     <CardValue>{course?.title || "N/A"}</CardValue>
//                   </CardRow>
//                 </Card>
//               );
//             })
//           )}
//         </EnrolledCoursesSection>
//       </ModalContainer>
//     </Backdrop>
//   );
// };

// export default EnrollLecturerPage;








import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import styled from "styled-components";
import { Context } from "./Context";

// ---------- Styled Components ----------
const Container = styled.div`
  padding: 40px;
  max-width: 600px;
  margin: auto;
  background-color: white;
  border-radius: 10px;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #0a4d24;
`;

const Description = styled.p`
  margin-bottom: 30px;
  font-size: 16px;
  color: #444;
  text-align: center;
`;

const Button = styled.button`
  background-color: green;
  color: white;
  font-size: 16px;
  padding: 12px;
  width: 100%;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease-in;

  &:hover {
    background-color: darkorange;
  }
`;

const EnrolledCoursesSection = styled.div`
  margin-top: 40px;
`;

const Card = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  background: #f9f9f9;
`;

const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const CardLabel = styled.span`
  font-weight: bold;
  color: #555;
`;

const CardValue = styled.span`
  color: #222;
`;

// Modal Styles
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
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

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
  color: #333;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 14px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
`;

// ---------- Component ----------
const EnrollLecturerPage = ({ lecturerId }) => {
  const { levels, semesters, courses } = useContext(Context);
  const [lecturer, setLecturer] = useState({});
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("NA");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!lecturerId) return;

    axios
      .get(`https://www.cwmsrfupre.com.ng/api/get_lecturer_by_id.php?id=${lecturerId}`)
      .then((res) => {
        if (res.data.success) setLecturer(res.data.lecturer);
      })
      .catch(() => {
        Swal.fire("Error", "Failed to fetch lecturer details.", "error");
      });
  }, [lecturerId]);

  const fetchAssignedCourses = () => {
    axios
      .get(
        `https://www.cwmsrfupre.com.ng/api/get_lecturer_enrolled_courses.php?lecturer_id=${lecturerId}`
      )
      .then((res) => {
        if (res.data.success) {
          setAssignedCourses(res.data.enrollments);
        } else {
          setAssignedCourses([]);
        }
      });
  };

  useEffect(() => {
    if (lecturerId) fetchAssignedCourses();
  }, [lecturer]);

  const filteredCourses = courses.filter(
    (c) => c.level_id == selectedLevel && c.semester_id == selectedSemester
  );

  const handleAssign = async () => {
    if (!selectedCourse)
      return Swal.fire("Error", "Please select a course.", "error");

    try {
      Swal.fire({
        title: "Assigning...",
        didOpen: () => Swal.showLoading(),
      });

      const res = await axios.post(
        "https://www.cwmsrfupre.com.ng/api/lecturer_enroll_course.php",
        {
          lecturer_id: lecturerId,
          course_id: selectedCourse,
        }
      );

      if (res.data.success) {
        Swal.fire("Success", res.data.message, "success");
        fetchAssignedCourses();
        setShowModal(false);
      } else {
        Swal.fire("Error", res.data.error, "error");
      }
    } catch {
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  return (
    <Container>
      <Title>Lecturer Course Enrollment</Title>
      <Description>
        Manage your assigned courses. Click below to add new ones.
      </Description>

      <Button onClick={() => setShowModal(true)}>+ Assign New Course</Button>

      {/* --- Modal Form --- */}
      {showModal && (
        <Backdrop>
          <Modal>
            <CloseButton onClick={() => setShowModal(false)}>&times;</CloseButton>
            <Title style={{ fontSize: "22px", marginBottom: "16px" }}>
              Assign Course
            </Title>

            <Label>Level</Label>
            <Select
              value={selectedLevel}
              onChange={(e) => {
                setSelectedLevel(e.target.value);
                setSelectedCourse("");
              }}
              disabled
            >
              {/* <option value="">Select Level</option> */}
              {levels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </Select>

            {/* <Label>Semester</Label>
            <Select
              value={selectedSemester}
              onChange={(e) => {
                setSelectedSemester(e.target.value);
                setSelectedCourse("");
              }}
            >
              <option value="">Select Semester</option>
              {semesters.map((sem) => (
                <option key={sem.id} value={sem.id}>
                  {sem.name}
                </option>
              ))}
            </Select> */}

            <Label>Course</Label>
            <Select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              // disabled={!selectedLevel || !selectedSemester}
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.code} - {course.title}
                </option>
              ))}
            </Select>

            <Button onClick={handleAssign}>Assign Course</Button>
          </Modal>
        </Backdrop>
      )}

      {/* --- Assigned Courses Section --- */}
      <EnrolledCoursesSection>
        <Title>My Courses</Title>
        {assignedCourses.length === 0 ? (
          <Description>No courses assigned yet.</Description>
        ) : (
          assignedCourses.map((assignment) => {
            const course = courses.find((c) => c.id == assignment.course_id);
            return (
              <Card key={assignment.id}>
                <CardRow>
                  <CardLabel>Code:</CardLabel>
                  <CardValue>{course?.code || "N/A"}</CardValue>
                </CardRow>
                <CardRow>
                  <CardLabel>Title:</CardLabel>
                  <CardValue>{course?.title || "N/A"}</CardValue>
                </CardRow>
              </Card>
            );
          })
        )}
      </EnrolledCoursesSection>
    </Container>
  );
};

export default EnrollLecturerPage;
