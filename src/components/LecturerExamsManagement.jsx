import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { FaPlus, FaTimes } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { Context } from "./Context";

/* ================= STYLES ================= */
const Container = styled.div`
  max-width: 1000px;
  margin: auto;
  padding: 40px;
`;

const PageTitle = styled.h2`
  text-align: center;
  color: green;
  margin-bottom: 30px;
`;

const ExamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const ExamCard = styled.div`
  background: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.5);
`;

const ExamTitle = styled.h4`
  margin: 0 0 10px;
  color: #0a4d24;
`;

const ExamMeta = styled.p`
  font-size: 14px;
  color: #555;
  margin: 5px 0;
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 60px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(90deg, #0cc0e0, #119459);
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(0,0,0,0.2);
`;

/* ================= MODAL ================= */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
`;

const Modal = styled.div`
  background: white;
  width: 90%;
  max-width: 600px;
  padding: 30px;
  border-radius: 12px;
  position: relative;
  height:95vh;
  overflow-y:scroll;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  position: absolute;
  right: 15px;
  top: 15px;
  font-size: 1.3rem;
  cursor: pointer;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-top: 15px;
  color: green;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 6px;
  border: 1px solid #ccc;
  min-height: 80px;
`;

const Button = styled.button`
  margin-top: 25px;
  width: 100%;
  padding: 12px;
  background: green;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
`;

// /* ================= COMPONENT ================= */
// const LecturerExamsManagement = ({lecturerId}) => {
//   const [exams, setExams] = useState([]);
//   const [open, setOpen] = useState(false);
//   const {courses} = useContext(Context)

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [duration, setDuration] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//  const [lecturer, setLecturer] = useState({});
//  const [assignedCourses, setAssignedCourses] = useState([]);
//  const [selectedCourseId, setSelectedCourseId] = useState("");


//   const fetchExams = async () => {
//     try {
//       const res = await axios.get("https://www.cwmsrfupre.com.ng/api/get_exams_by_lecturer.php", {
//         params: { lecturer_id: lecturerId }
//       });
//       if (res.data.success) {
//         setExams(res.data.exams);
//       }
//     } catch (err) {
//       Swal.fire("Error", "Failed to load exams", "error");
//     }
//   };

//   useEffect(() => {
//     fetchExams();
//   }, []);

//   const createExam = async () => {
//     if (!title || !duration || !startTime || !endTime || !selectedCourseId) {
//       Swal.fire("Validation", "Please fill all required fields", "warning");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("course_id", selectedCourseId);
//     formData.append("lecturer_id", lecturerId);
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("duration", duration);
//     formData.append("start_time", startTime);
//     formData.append("end_time", endTime);

//     try {
//       Swal.fire({ title: "Creating exam...", allowOutsideClick: false });
//       Swal.showLoading();

//       const res = await axios.post("https://www.cwmsrfupre.com.ng/api/create_exam.php", formData);

//       Swal.close();

//       if (res.data.success) {
//         Swal.fire("Success", "Exam created successfully", "success");
//         setOpen(false);
//         setTitle("");
//         setDescription("");
//         setDuration("");
//         setStartTime("");
//         setEndTime("");
//         fetchExams();
//       } else {
//         Swal.fire("Failed", res.data.error || "Could not create exam", "error");
//       }
//     } catch (err) {
//       Swal.close();
//       Swal.fire("Error", "Server error occurred", "error");
//     }
//   };
  



//  useEffect(() => {
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


// // Helper function
// const capitalizeFirst = (str) => {
//   if (!str) return "";
//   return str.charAt(0).toUpperCase() + str.slice(1);
// };


//   return (
//     <Container>
//       <PageTitle>Your Created Examinations</PageTitle>

//       <ExamGrid>
//         {exams.length === 0 && <p>No exams created yet.</p>}

//         {exams.map((exam) => {
//   const course = courses.find((c) => c.id == exam.course_id);

//   return (
//     <ExamCard key={exam.id}>
//       <ExamTitle>
//         {course ? `${course.code} - ${course.title}` : `Course ID: ${exam.course_id}`}
//       </ExamTitle>
//        <ExamMeta><strong>Title:</strong> {capitalizeFirst(exam.title)}</ExamMeta>
//       <ExamMeta><strong>Description:</strong> {capitalizeFirst(exam.description)}</ExamMeta>
//       <ExamMeta><strong>Duration:</strong> {exam.duration} mins</ExamMeta>
//       <ExamMeta><strong>Start:</strong> {exam.start_time}</ExamMeta>
//       <ExamMeta><strong>End:</strong> {exam.end_time}</ExamMeta>
//     </ExamCard>
//   );
// })}

//       </ExamGrid>

//       <FloatingButton onClick={() => setOpen(true)}>
//         <FaPlus />
//       </FloatingButton>

//       {open && (
//         <Overlay>
//           <Modal>
//             <CloseBtn onClick={() => setOpen(false)}><FaTimes /></CloseBtn>

//             <h3 style={{ textAlign: "center", color: "green" }}>Create New Exam</h3>

          

// <Label>Select Course</Label>
// <select
//   style={{
//     width: "100%",
//     padding: "10px",
//     marginTop: "5px",
//     borderRadius: "6px",
//     border: "1px solid #ccc",
//   }}
//   value={selectedCourseId}
//   onChange={(e) => setSelectedCourseId(e.target.value)}
// >
//   <option value="">-- Select Course --</option>
//   {assignedCourses.map((enrollment) => {
//     const course = courses.find(
//       (c) => c.id == enrollment.course_id
//     );
//     if (!course) return null;
//     return (
//       <option key={course.id} value={course.id}>
//         {course.code} - {course.title}
//       </option>
//     );
//   })}
// </select>


//             <Label>Exam Title</Label>
//             <Input value={title} onChange={(e) => setTitle(e.target.value)} />

//             <Label>Description</Label>
//             <TextArea value={description} onChange={(e) => setDescription(e.target.value)} />

//             <Label>Duration (minutes)</Label>
//             <Input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />

//             <Label>Start Time</Label>
//             <Input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />

//             <Label>End Time</Label>
//             <Input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />

//             <Button onClick={createExam}>Create Exam</Button>
//           </Modal>
//         </Overlay>
//       )}
//     </Container>
//   );
// };


/* ================= COMPONENT ================= */
const LecturerExamsManagement = ({ lecturerId }) => {
  const [exams, setExams] = useState([]);
  const [open, setOpen] = useState(false);
  const { courses } = useContext(Context);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");

  const [editingExamId, setEditingExamId] = useState(null); // NEW


// Convert MySQL DATETIME → datetime-local
const toDateTimeLocal = (mysqlDateTime) => {
  if (!mysqlDateTime || mysqlDateTime.includes("0000")) return "";
  return mysqlDateTime.replace(" ", "T").slice(0, 16);
};

// Convert datetime-local → MySQL DATETIME
const toMySQLDateTime = (dateTimeLocal) => {
  if (!dateTimeLocal) return null;
  return dateTimeLocal.replace("T", ":") + ":00";
};







  // Fetch exams
  const fetchExams = async () => {
    try {
      const res = await axios.get(
        "https://www.cwmsrfupre.com.ng/api/get_exams_by_lecturer.php",
        { params: { lecturer_id: lecturerId } }
      );
      if (res.data.success) setExams(res.data.exams);
    } catch (err) {
      Swal.fire("Error", "Failed to load exams", "error");
    }
  };

  useEffect(() => {
    fetchExams();
    fetchAssignedCourses();
  }, []);

  // Fetch assigned courses
  const fetchAssignedCourses = () => {
    axios
      .get(
        `https://www.cwmsrfupre.com.ng/api/get_lecturer_enrolled_courses.php?lecturer_id=${lecturerId}`
      )
      .then((res) => {
        if (res.data.success) setAssignedCourses(res.data.enrollments);
        else setAssignedCourses([]);
      });
  };

  // Helper
  const capitalizeFirst = (str) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : "");

  // Open modal for edit
  const openEditModal = (exam) => {
    setEditingExamId(exam.id);
    setSelectedCourseId(exam.course_id);
    setTitle(exam.title);
    setDescription(exam.description);
    setDuration(exam.duration);
    // setStartTime(exam.start_time);
    // setEndTime(exam.end_time);


    setStartTime(toDateTimeLocal(exam.start_time));
setEndTime(toDateTimeLocal(exam.end_time));



console.log(exam.start_time)
console.log(toDateTimeLocal(exam.start_time))

    setOpen(true);
  };






  // Create or update exam
  const saveExam = async () => {
    if (!title || !duration || !startTime || !endTime || !selectedCourseId) {
      Swal.fire("Validation", "Please fill all required fields", "warning");
      return;
    }

    const formData = new FormData();
    formData.append("course_id", selectedCourseId);
    formData.append("lecturer_id", lecturerId);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("duration", duration);
    // formData.append("start_time", startTime);
    // formData.append("end_time", endTime);
    formData.append("start_time", toMySQLDateTime(startTime));
formData.append("end_time", toMySQLDateTime(endTime));


    try {
      Swal.fire({ title: editingExamId ? "Updating exam..." : "Creating exam...", allowOutsideClick: false });
      Swal.showLoading();

      let url = editingExamId
        ? "https://www.cwmsrfupre.com.ng/api/update_exam.php"
        : "https://www.cwmsrfupre.com.ng/api/create_exam.php";

      if (editingExamId) formData.append("exam_id", editingExamId);

      const res = await axios.post(url, formData);
      Swal.close();

      if (res.data.success) {
        Swal.fire("Success", `Exam ${editingExamId ? "updated" : "created"} successfully`, "success");
        setOpen(false);
        setEditingExamId(null);
        setTitle("");
        setDescription("");
        setDuration("");
        setStartTime("");
        setEndTime("");
        setSelectedCourseId("");
        fetchExams();
      } else {
        Swal.fire("Failed", res.data.error || "Could not save exam", "error");
      }
    } catch (err) {
      Swal.close();
      Swal.fire("Error", "Server error occurred", "error");
    }
  };






  return (
    <Container>
      <PageTitle>Your Created Examinations</PageTitle>

      <ExamGrid>
        {exams.length === 0 && <p>No exams created yet.</p>}

        {exams.map((exam) => {
          const course = courses.find((c) => c.id == exam.course_id);
          return (
            <ExamCard key={exam.id}>
              <ExamTitle>
                {course ? `${course.code} - ${course.title}` : `Course ID: ${exam.course_id}`}
              </ExamTitle>
              <ExamMeta><strong>Title:</strong> {capitalizeFirst(exam.title)}</ExamMeta>
              <ExamMeta><strong>Description:</strong> {capitalizeFirst(exam.description)}</ExamMeta>
              <ExamMeta><strong>Duration:</strong> {exam.duration} mins</ExamMeta>
              <ExamMeta><strong>Start:</strong> {exam.start_time}</ExamMeta>
              <ExamMeta><strong>End:</strong> {exam.end_time}</ExamMeta>
              <Button onClick={() => openEditModal(exam)} style={{marginTop:"10px"}}>Edit Exam</Button>
            </ExamCard>
          );
        })}
      </ExamGrid>

      <FloatingButton onClick={() => { setOpen(true); setEditingExamId(null); }}>
        <FaPlus />
      </FloatingButton>

      {open && (
        <Overlay>
          <Modal>
            <CloseBtn onClick={() => setOpen(false)}><FaTimes /></CloseBtn>
            <h3 style={{ textAlign: "center", color: "green" }}>{editingExamId ? "Edit Exam" : "Create New Exam"}</h3>

            <Label>Select Course</Label>
            <select
              style={{ width: "100%", padding: "10px", marginTop: "5px", borderRadius: "6px", border: "1px solid #ccc" }}
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
            >
              <option value="">-- Select Course --</option>
              {assignedCourses.map((enrollment) => {
                const course = courses.find((c) => c.id == enrollment.course_id);
                if (!course) return null;
                return (
                  <option key={course.id} value={course.id}>{course.code} - {course.title}</option>
                );
              })}
            </select>

            <Label>Exam Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />

            <Label>Description</Label>
            <TextArea value={description} onChange={(e) => setDescription(e.target.value)} />

            <Label>Duration (minutes)</Label>
            <Input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />

           <Label>Start Time</Label>
            <Input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />

            <Label>End Time</Label>
            <Input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />

            <Button onClick={saveExam}>{editingExamId ? "Update Exam" : "Create Exam"}</Button>
          </Modal>
        </Overlay>
      )}
    </Container>
  );
};


export default LecturerExamsManagement;
