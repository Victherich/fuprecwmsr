



// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import styled from "styled-components";
// import { Context } from "./Context";
// import { FaPlus, FaBookOpen, FaCheckCircle, FaTimes } from "react-icons/fa";

// // 🧱 Container
// const Container = styled.div`
//   padding: 40px;
//   max-width: 700px;
//   margin: 40px auto;
//   background: white;
//   border-radius: 20px;
//   box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
//   font-family: "Poppins", sans-serif;
// `;

// // 🔹 Titles
// const Title = styled.h2`
//   font-size: 30px;
//   font-weight: 800;
//   color: green;
//   margin-bottom: 10px;
//   text-align: center;
//   text-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
// `;

// const Description = styled.p`
//   font-size: 16px;
//   color: #555;
//   text-align: center;
//   margin-bottom: 30px;
// `;

// // 📦 Course List
// const EnrolledCoursesSection = styled.div`
//   margin-top: 40px;
// `;

// const Card = styled.div`
//   border: 1px solid #eee;
//   background: #f9f9f9;
//   border-radius: 10px;
//   padding: 16px;
//   margin-bottom: 16px;
//   transition: transform 0.2s ease, box-shadow 0.2s ease;

//   &:hover {
//     transform: translateY(-3px);
//     box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
//   }
// `;

// const CardRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 8px;
// `;

// const CardLabel = styled.span`
//   font-weight: 600;
//   color: #333;
// `;

// const CardValue = styled.span`
//   color: #111;
// `;

// // ➕ Floating Button
// const FloatingButton = styled.button`
//   position: fixed;
//   bottom: 60px;
//   right: 10px;
//   width: 120px;
//   height: 60px;
//   border-radius: 30px;
//   border: none;
//   background: linear-gradient(90deg, #0cc1e0, #119458);
//   color: white;
//   font-size: 1.2rem;
//   cursor: pointer;
//   box-shadow: 0 8px 18px rgba(0, 0, 0, 0.2);
//   transition: all 0.3s ease;
//   z-index: 300;

//   &:hover {
//     // transform: scale(1.1) rotate(10deg);
//     background: linear-gradient(90deg, #119458, #0cc1e0);
//   }
// `;

// // 🪟 Modal Styles
// const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.4);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 300;
// `;

// const ModalContent = styled.div`
//   background: #fff;
//   padding: 30px;
//   border-radius: 16px;
//   width: 90%;
//   max-width: 500px;
//   position: relative;
//   box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
//   animation: fadeIn 0.3s ease;

//   @keyframes fadeIn {
//     from {
//       opacity: 0;
//       transform: translateY(10px);
//     }
//     to {
//       opacity: 1;
//       transform: translateY(0);
//     }
//   }
// `;

// // ❌ Close Button
// const CloseButton = styled.button`
//   position: absolute;
//   top: 12px;
//   right: 12px;
//   background: transparent;
//   border: none;
//   color: #444;
//   font-size: 1.3rem;
//   cursor: pointer;
//   transition: color 0.2s ease;

//   &:hover {
//     color: #e63946;
//   }
// `;

// // 🧾 Form Elements
// const Label = styled.label`
//   display: block;
//   margin-bottom: 6px;
//   font-weight: 600;
//   color: #222;
// `;

// const Select = styled.select`
//   width: 100%;
//   padding: 12px 14px;
//   margin-bottom: 20px;
//   border: 2px solid #e0e0e0;
//   border-radius: 10px;
//   font-size: 15px;
//   outline: none;
//   transition: border-color 0.3s ease;
//   background: #fafafa;

//   &:focus {
//     border-color: #0cc1e0;
//   }
// `;

// // ✅ Button inside modal
// const EnrollButton = styled.button`
//   width: 100%;
//   background: linear-gradient(90deg, #0cc1e0, #119458);
//   color: white;
//   font-size: 1rem;
//   font-weight: 700;
//   padding: 14px;
//   border: none;
//   border-radius: 50px;
//   cursor: pointer;
//   margin-top: 8px;
//   transition: all 0.3s ease;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 8px;

//   &:hover {
//     background: linear-gradient(90deg, #119458, #0cc1e0);
//     transform: translateY(-2px);
//   }

//   &:active {
//     transform: scale(0.97);
//   }
// `;





// const ClearButton = styled.button`
//   background: #e74c3c;
//   color: #fff;
//   border: none;
//   border-radius: 6px;
//   padding: 6px 12px;
//   font-size: 0.9rem;
//   cursor: pointer;
//   transition: background 0.2s ease;
//   margin-bottom: 20px;

//   &:hover {
//     background: #c0392b;
//   }
// `;






// const EnrollPage = ({ studentId, semesterId }) => {
//   const { levels, semesters, courses, api_url } = useContext(Context);
//   const [student, setStudent] = useState({});
//   const [selectedLevel, setSelectedLevel] = useState("");
//   const [selectedSemester, setSelectedSemester] = useState("");
//   const [selectedCourse, setSelectedCourse] = useState("");
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);

//   // 📡 Fetch student
//   useEffect(() => {
//     if (!studentId) return;

//     axios
//       .get(`${api_url}/get_student_by_id.php?id=${studentId}`)
//       .then((res) => {
//         if (res.data.success) setStudent(res.data.student);
//       })
//       .catch(() => Swal.fire("Error", "Failed to fetch student details.", "error"));
//   }, [studentId]);

//   // 📘 Fetch enrolled courses
//   const fetchEnrolledCourses = () => {
//     if (!student.id || !semesterId) return;
//     axios
//       .get(`${api_url}/get_enrolled_courses.php?student_id=${student.id}&semester_id=${semesterId}`)
//       .then((res) => {
//         if (res.data.success) setEnrolledCourses(res.data.enrollments);
//         else setEnrolledCourses([]);
//       })
//       .catch(() => console.error("Error fetching enrolled courses"));
//   };



//   useEffect(() => {
//     if (student.id) fetchEnrolledCourses();
//   }, [student]);



//   // ✅ Enroll handler
//   const handleEnroll = async () => {
//     if (!selectedCourse)
//       return Swal.fire("Error", "Please select a course.", "error");

//     try {
//       Swal.fire({ title: "Enrolling...", didOpen: () => Swal.showLoading() });
//       const res = await axios.post(`${api_url}/enroll_course.php`, {
//         student_id: student.id,
//         course_id: selectedCourse,
//         semesterId
//       });

//       if (res.data.success) {
//         Swal.fire("Success", res.data.message, "success");
//         setModalOpen(false);
//         fetchEnrolledCourses();
//       } else {
//         Swal.fire("Error", res.data.error, "error");
//       }
//     } catch (err) {
//       Swal.fire("Error", "Something went wrong.", "error");
//     }
//   };









// const deleteEnrollment = async (enrollmentId) => {
//   const confirm = await Swal.fire({
//     title: "Unenroll from this course?",
//     text: "This will remove you from the course permanently.",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#e74c3c",
//     cancelButtonColor: "#aaa",
//     confirmButtonText: "Yes, Unenroll",
//   });

//   if (!confirm.isConfirmed) return;

//   Swal.fire({
//     title: "Processing...",
//     text: "Unenrolling, please wait",
//     allowOutsideClick: false,
//     didOpen: () => Swal.showLoading(),
//   });

//   try {
//     const res = await axios.post(
//       `${api_url}/delete_enrollment.php`,
//       { enrollment_id: enrollmentId }
//     );

//     if (res.data.success) {
//       Swal.fire({
//         icon: "success",
//         title: "Unenrolled",
//         text: "You have been unenrolled from the course.",
//         timer: 2000,
//         showConfirmButton: false,
//       });

//       // Update UI
//       fetchEnrolledCourses();
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: res.data.error || "Failed to unenroll.",
//       });
//     }
//   } catch (err) {
//     Swal.fire({
//       icon: "error",
//       title: "Network Error",
//       text: "Could not connect to the server.",
//     });
//   }
// };









//   return (
//     <>
//       <Container>
//         <Title>
//           <FaBookOpen /> Your Enrollments
//         </Title>
//         <Description>Ensure to enroll for all the courses you are offering.</Description>

//         <EnrolledCoursesSection>
//           {enrolledCourses.length === 0 ? (
//             <Description>No courses enrolled yet.</Description>
//           ) : (
//             enrolledCourses.map((enroll) => {
//               const course = courses.find((c) => c.id == enroll.course_id);
//               return (
//                 <Card key={enroll.id}>
//                   <CardRow>
//                     <CardLabel>Code:</CardLabel>
//                     <CardValue>{course?.code || "N/A"}</CardValue>
//                   </CardRow>
//                   <CardRow>
//                     <CardLabel>Title:</CardLabel>
//                     <CardValue>{course?.title || "N/A"}</CardValue>
//                   </CardRow>
                  
//                   <ClearButton
//     onClick={() =>window.open(course?.link, "_blank")}
//     style={{backgroundColor:"green", marginRight:"20px"}}
//   >
//     Enter Class
//   </ClearButton>
//                   <ClearButton
//     onClick={() => deleteEnrollment(enroll.id)}
//   >
//     Delete
//   </ClearButton>
//                 </Card>
//               );
//             })
//           )}
//         </EnrolledCoursesSection>
//       </Container>

//       {/* ➕ Floating button */}
//       <FloatingButton onClick={() => setModalOpen(true)}>
//         <FaPlus /> Enroll
//       </FloatingButton>

//       {/* 🪟 Modal */}
//       {modalOpen && (
//         <ModalOverlay>
//           <ModalContent>
//             <CloseButton onClick={() => setModalOpen(false)}>
//               <FaTimes />
//             </CloseButton>
//             <Title>Enroll New Course</Title>

//             <Label>Course</Label>
//             <Select
//               value={selectedCourse}
//               onChange={(e) => setSelectedCourse(e.target.value)}
//               // disabled={!selectedLevel || !selectedSemester}
//             >
//               <option value="">Select Course</option>
//               {courses.map((course) => (
//                 <option key={course.id} value={course.id}>
//                   {course.code} — {course.title}
//                 </option>
//               ))}
//             </Select>

//             <EnrollButton onClick={handleEnroll}>
//               <FaCheckCircle /> Enroll
//             </EnrollButton>
//           </ModalContent>
//         </ModalOverlay>
//       )}
//     </>
//   );
// };

// export default EnrollPage;





import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import styled from "styled-components";
import { Context } from "./Context";
import { FaPlus, FaBookOpen, FaCheckCircle, FaTimes, FaExternalLinkAlt, FaTrash } from "react-icons/fa";

// 🧱 Container
const Container = styled.div`
  padding: 30px;
  max-width: 650px;
  margin: 30px auto;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
  font-family: "Poppins", sans-serif;
`;

// 🔹 Titles
const Title = styled.h2`
  font-size: 26px;
  font-weight: 700;
  color: #006400;
  margin-bottom: 6px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  text-align: center;
  margin-bottom: 24px;
`;

// 📦 Course List Section
const EnrolledCoursesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Card = styled.div`
  border: 1px solid #eaeaea;
  background: #fbfbfb;
  border-radius: 12px;
  padding: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
  }
`;

const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
`;

const CardLabel = styled.span`
  font-weight: 600;
  color: #444;
  font-size: 14px;
`;

const CardValue = styled.span`
  color: #111;
  font-size: 14px;
`;

// ⚙️ Action Row inside Card
const ActionRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 14px;
  padding-top: 10px;
  border-top: 1px solid #eee;
`;

const ActionButton = styled.button`
  flex: 1;
  background: #006400;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: background 0.2s ease;

  &:hover {
    background: #004d00;
  }
`;

const DeleteButton = styled(ActionButton)`
  background: #e74c3c;

  &:hover {
    background: #c0392b;
  }
`;

// ➕ Floating Button
const FloatingButton = styled.button`
  position: fixed;
  bottom: 50px;
  right: 30px;
  width: 110px;
  height: 50px;
  border-radius: 25px;
  border: none;
  background: #006400;
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(0, 100, 0, 0.3);
  transition: all 0.3s ease;
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:hover {
    background: #004d00;
    transform: scale(1.05);
  }
`;

// 🪟 Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 400;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 24px;
  border-radius: 16px;
  width: 90%;
  max-width: 450px;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  animation: fadeIn 0.25s ease;

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

const CloseButton = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  background: transparent;
  border: none;
  color: #666;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    color: #e63946;
  }
`;

// 🧾 Form Elements
const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #333;
  font-size: 13px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  background: #fafafa;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #006400;
  }
`;

const EnrollSubmitButton = styled.button`
  width: 100%;
  background: #006400;
  color: white;
  font-size: 14px;
  font-weight: 600;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.2s ease;

  &:hover {
    background: #004d00;
  }
`;

const EnrollPage = ({ studentId, semesterId }) => {
  const { levels, courses, api_url } = useContext(Context);
  const [student, setStudent] = useState({});
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  console.log(student)


  // 📡 Fetch student details
  useEffect(() => {
    if (!studentId) return;

    axios
      .get(`${api_url}/get_student_by_id.php?id=${studentId}`)
      .then((res) => {
        if (res.data.success) setStudent(res.data.student);
      })
      .catch(() => Swal.fire("Error", "Failed to fetch student details.", "error"));
  }, [studentId, api_url]);

  // 📘 Fetch enrolled courses
  const fetchEnrolledCourses = () => {
    if (!student.id || !semesterId) return;
    axios
      .get(`${api_url}/get_enrolled_courses.php?student_id=${student.id}&semester_id=${semesterId}`)
      .then((res) => {
        if (res.data.success) setEnrolledCourses(res.data.enrollments);
        else setEnrolledCourses([]);
      })
      .catch(() => console.error("Error fetching enrolled courses"));
  };

  useEffect(() => {
    if (student.id) fetchEnrolledCourses();
  }, [student, semesterId]);



  // Filter courses by level in the modal selector
 // Assuming student object is available in this scope, e.g., student.admission_session
const studentSession = student?.admission_session || "";
const isTargetBatch = studentSession >= "2026/2027"; // Lexicographical comparison works perfectly for "YYYY/YYYY" format

const filteredCourses = courses.filter((course) => {

  // 2. Apply admission session rule
  if (isTargetBatch) {
    // Students with 2026/2027 and above see only courses for 2026/2027
    return course.admission_session === "2026/2027";
  } else {
    // Other students see the rest of the courses
    return course.admission_session !== "2026/2027";
  }
});



  // ✅ Secure & Structured Enroll Handler
  const handleEnroll = async () => {
    if (!selectedCourse) {
      return Swal.fire("Error", "Please select a course to enroll.", "error");
    }

    if (!semesterId) {
      return Swal.fire("Error", "Semester identifier is missing for this course.", "error");
    }

    try {
      Swal.fire({ title: "Enrolling...", didOpen: () => Swal.showLoading() });
      const res = await axios.post(`${api_url}/enroll_course.php`, {
        student_id: student.id,
        course_id: selectedCourse,
        semester_id: semesterId,
      });

      if (res.data.success) {
        Swal.fire("Success", res.data.message, "success");
        setModalOpen(false);
        setSelectedCourse("");
        setSelectedLevel("");
        fetchEnrolledCourses();
      } else {
        Swal.fire("Error", res.data.error, "error");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong while processing enrollment.", "error");
    }
  };

  // ❌ Unenroll / Delete Handler
  const deleteEnrollment = async (enrollmentId) => {
    const confirm = await Swal.fire({
      title: "Unenroll from this course?",
      text: "This will remove you from the course permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e74c3c",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, Unenroll",
    });

    if (!confirm.isConfirmed) return;

    Swal.fire({
      title: "Processing...",
      text: "Unenrolling, please wait",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const res = await axios.post(`${api_url}/delete_enrollment.php`, {
        enrollment_id: enrollmentId,
      });

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Unenrolled",
          text: "You have been unenrolled from the course.",
          timer: 2000,
          showConfirmButton: false,
        });
        fetchEnrolledCourses();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: res.data.error || "Failed to unenroll.",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Could not connect to the server.",
      });
    }
  };

  return (
    <>
      <Container>
        <Title>
          <FaBookOpen /> Your Enrollments
        </Title>
        <Description>Ensure you are enrolled in all required courses for this semester.</Description>

        <EnrolledCoursesSection>
          {enrolledCourses.length === 0 ? (
            <Description>No courses enrolled yet for this semester.</Description>
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

                  <ActionRow>
                    {course?.link && (
                      <ActionButton onClick={() => window.open(course.link, "_blank")}>
                        <FaExternalLinkAlt /> Enter Class
                      </ActionButton>
                    )}
                    <DeleteButton onClick={() => deleteEnrollment(enroll.id)}>
                      <FaTrash /> Delete
                    </DeleteButton>
                  </ActionRow>
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
            <Title style={{ fontSize: "20px", marginBottom: "16px" }}>Enroll New Course</Title>

            
            <Label>Select Course</Label>
            <Select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="">Choose a course...</option>
              {filteredCourses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.code} — {course.title}
                </option>
              ))}
            </Select>

            <EnrollSubmitButton onClick={handleEnroll}>
              <FaCheckCircle /> Confirm Enrollment
            </EnrollSubmitButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default EnrollPage;