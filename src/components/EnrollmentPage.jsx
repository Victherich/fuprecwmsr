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


// const EnrollPage = ({ studentId }) => {
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
  
// export default EnrollPage;



















import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import styled from "styled-components";
import { Context } from "./Context";
import { FaPlus, FaBookOpen, FaCheckCircle, FaTimes } from "react-icons/fa";

// 🧱 Container
const Container = styled.div`
  padding: 40px;
  max-width: 700px;
  margin: 40px auto;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  font-family: "Poppins", sans-serif;
`;

// 🔹 Titles
const Title = styled.h2`
  font-size: 30px;
  font-weight: 800;
  color: green;
  margin-bottom: 10px;
  text-align: center;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
`;

const Description = styled.p`
  font-size: 16px;
  color: #555;
  text-align: center;
  margin-bottom: 30px;
`;

// 📦 Course List
const EnrolledCoursesSection = styled.div`
  margin-top: 40px;
`;

const Card = styled.div`
  border: 1px solid #eee;
  background: #f9f9f9;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
  }
`;

const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const CardLabel = styled.span`
  font-weight: 600;
  color: #333;
`;

const CardValue = styled.span`
  color: #111;
`;

// ➕ Floating Button
const FloatingButton = styled.button`
  position: fixed;
  bottom: 60px;
  right: 10px;
  width: 120px;
  height: 60px;
  border-radius: 30px;
  border: none;
  background: linear-gradient(90deg, #0cc1e0, #119458);
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 300;

  &:hover {
    // transform: scale(1.1) rotate(10deg);
    background: linear-gradient(90deg, #119458, #0cc1e0);
  }
`;

// 🪟 Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 300;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  position: relative;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// ❌ Close Button
const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  color: #444;
  font-size: 1.3rem;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #e63946;
  }
`;

// 🧾 Form Elements
const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #222;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 14px;
  margin-bottom: 20px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.3s ease;
  background: #fafafa;

  &:focus {
    border-color: #0cc1e0;
  }
`;

// ✅ Button inside modal
const EnrollButton = styled.button`
  width: 100%;
  background: linear-gradient(90deg, #0cc1e0, #119458);
  color: white;
  font-size: 1rem;
  font-weight: 700;
  padding: 14px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  margin-top: 8px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: linear-gradient(90deg, #119458, #0cc1e0);
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.97);
  }
`;

const EnrollPage = ({ studentId }) => {
  const { levels, semesters, courses } = useContext(Context);
  const [student, setStudent] = useState({});
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  // 📡 Fetch student
  useEffect(() => {
    if (!studentId) return;

    axios
      .get(`https://www.cwmsrfupre.com.ng/api/get_student_by_id.php?id=${studentId}`)
      .then((res) => {
        if (res.data.success) setStudent(res.data.student);
      })
      .catch(() => Swal.fire("Error", "Failed to fetch student details.", "error"));
  }, [studentId]);

  // 📘 Fetch enrolled courses
  const fetchEnrolledCourses = () => {
    axios
      .get(`https://www.cwmsrfupre.com.ng/api/get_enrolled_courses.php?student_id=${student.id}`)
      .then((res) => {
        if (res.data.success) setEnrolledCourses(res.data.enrollments);
        else setEnrolledCourses([]);
      })
      .catch(() => console.error("Error fetching enrolled courses"));
  };

  useEffect(() => {
    if (student.id) fetchEnrolledCourses();
  }, [student]);

  // Filter courses
  const filteredCourses = courses.filter(
    (course) =>
      course.level_id == selectedLevel &&
      // course.semester_id == selectedSemester &&
      course.program_id == student.program
  );

  // ✅ Enroll handler
  const handleEnroll = async () => {
    if (!selectedCourse)
      return Swal.fire("Error", "Please select a course.", "error");

    try {
      Swal.fire({ title: "Enrolling...", didOpen: () => Swal.showLoading() });
      const res = await axios.post("https://www.cwmsrfupre.com.ng/api/enroll_course.php", {
        student_id: student.id,
        course_id: selectedCourse,
      });

      if (res.data.success) {
        Swal.fire("Success", res.data.message, "success");
        setModalOpen(false);
        fetchEnrolledCourses();
      } else {
        Swal.fire("Error", res.data.error, "error");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  return (
    <>
      <Container>
        <Title>
          <FaBookOpen /> Your Enrollments
        </Title>
        <Description>Ensure to enroll for all the courses you are offering.</Description>

        <EnrolledCoursesSection>
          {enrolledCourses.length === 0 ? (
            <Description>No courses enrolled yet.</Description>
          ) : (
            enrolledCourses.map((enroll) => {
              const course = courses.find((c) => c.id == enroll.course_id);
              return (
                <Card key={enroll.id}>
                  <CardRow>
                    <CardLabel>Code:</CardLabel>
                    <CardValue>{course?.code || "N/A"}</CardValue>
                  </CardRow>
                  <CardRow>
                    <CardLabel>Title:</CardLabel>
                    <CardValue>{course?.title || "N/A"}</CardValue>
                  </CardRow>
                  <CardRow>
                    <CardLabel>Assignment:</CardLabel>
                    <CardValue>{enroll.assignment_score}</CardValue>
                  </CardRow>
                  <CardRow>
                    <CardLabel>Quiz:</CardLabel>
                    <CardValue>{enroll.quiz_score}</CardValue>
                  </CardRow>
                  <CardRow>
                    <CardLabel>Exam:</CardLabel>
                    <CardValue>{enroll.exam_score}</CardValue>
                  </CardRow>
                  <CardRow>
                    <CardLabel>Total:</CardLabel>
                    <CardValue>{enroll.total_score}</CardValue>
                  </CardRow>
                </Card>
              );
            })
          )}
        </EnrolledCoursesSection>
      </Container>

      {/* ➕ Floating button */}
      <FloatingButton onClick={() => setModalOpen(true)}>
        <FaPlus /> Enroll
      </FloatingButton>

      {/* 🪟 Modal */}
      {modalOpen && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={() => setModalOpen(false)}>
              <FaTimes />
            </CloseButton>
            <Title>Enroll New Course</Title>

            <Label>Level</Label>
            <Select
              value={selectedLevel}
              onChange={(e) => {
                setSelectedLevel(e.target.value);
                setSelectedCourse("");
              }}
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
                  {course.code} — {course.title}
                </option>
              ))}
            </Select>

            <EnrollButton onClick={handleEnroll}>
              <FaCheckCircle /> Enroll
            </EnrollButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default EnrollPage;
