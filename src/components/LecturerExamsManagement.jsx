import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { FaPlus, FaTimes } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { Context } from "./Context";
import ExamQuestionsModal from "./ExamQuestionsModal";
import EssayExamQuestionsModal from "./EssayExamQuestionsModal";


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



/* ================= COMPONENT ================= */
const LecturerExamsManagement = ({ lecturerId }) => {
  const [exams, setExams] = useState([]);
  const [open, setOpen] = useState(false);
  const { courses, categories } = useContext(Context);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("default");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");

  const [editingExamId, setEditingExamId] = useState(null); // NEW

const [showQuestionsModal, setShowQuestionsModal] = useState(false);
const [showEssayQuestionsModal, setShowEssayQuestionsModal] = useState(false);
const [selectedExam, setSelectedExam] = useState(null);



const [selectedCategoryId, setSelectedCategoryId]= useState('');



// // Convert MySQL DATETIME → datetime-local
// const toDateTimeLocal = (mysqlDateTime) => {
//   if (!mysqlDateTime || mysqlDateTime.includes("0000")) return "";
//   return mysqlDateTime.replace(" ", "T").slice(0, 16);
// };


// // Convert datetime-local → MySQL DATETIME
// // Convert datetime-local → MySQL DATETIME
// const toMySQLDateTime = (dateTimeLocal) => {
//   if (!dateTimeLocal) return null;
//   return dateTimeLocal.replace("T", " ") + ":00";
// };







// Convert MySQL DATETIME (UTC) → datetime-local (UTC)
const toDateTimeLocalUTC = (mysqlDateTimeUTC) => {
  if (!mysqlDateTimeUTC || mysqlDateTimeUTC.includes("0000")) return "";
  return mysqlDateTimeUTC.replace(" ", "T").slice(0, 16);
};

// Convert datetime-local (UTC) → MySQL DATETIME (UTC)
const toMySQLDateTimeUTC = (dateTimeLocal) => {
  if (!dateTimeLocal) return null;
  return dateTimeLocal.replace("T", " ") + ":00";
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
    setSelectedCategoryId(exam.category_id);

    setDescription(exam.description);

//     setStartTime(toDateTimeLocal(exam.start_time));
// setEndTime(toDateTimeLocal(exam.end_time));

  // UTC-safe
  setStartTime(toDateTimeLocalUTC(exam.start_time));
  setEndTime(toDateTimeLocalUTC(exam.end_time));



    setOpen(true);
  };



   const closeEditModal = () => {
    setEditingExamId('');
    setSelectedCourseId('');
    setSelectedCategoryId('');

    setDescription('');

  setStartTime(toDateTimeLocalUTC(''));
  setEndTime(toDateTimeLocalUTC(''));

    setOpen(false);
  };






  // Create or update exam
  const saveExam = async () => {
    if (!selectedCategoryId  || !startTime || !endTime || !selectedCourseId) {
      Swal.fire("Validation", "Please fill all required fields", "warning");
      return;
    }

    const formData = new FormData();
    formData.append("course_id", selectedCourseId);
    formData.append("lecturer_id", lecturerId);
    formData.append("category_id", selectedCategoryId);
    formData.append("description", description);
    formData.append("duration", duration);
//     formData.append("start_time", toMySQLDateTime(startTime));
// formData.append("end_time", toMySQLDateTime(endTime));
formData.append("start_time", toMySQLDateTimeUTC(startTime));
formData.append("end_time", toMySQLDateTimeUTC(endTime));


    try {
      Swal.fire({ title: editingExamId ? "Updating..." : "Creating...", allowOutsideClick: false });
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
        Swal.fire("Failed", res.data.error || "Could not save", "error");
      }
    } catch (err) {
      Swal.close();
      Swal.fire("Error", "Server error occurred", "error");
    }
  };






const deleteExam = async (examId) => {
  const confirm = await Swal.fire({
    title: "Delete?",
    text: "This and all its questions will be delete and this action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it",
  });

  if (!confirm.isConfirmed) return;

  try {
    Swal.fire({
      title: "Deleting...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const formData = new FormData();
    formData.append("exam_id", examId);
    formData.append("lecturer_id", lecturerId);

    const res = await axios.post(
      "https://www.cwmsrfupre.com.ng/api/delete_exam.php",
      formData
    );

    Swal.close();

    if (res.data.success) {
      Swal.fire("Deleted!", " Deleted successfully.", "success");
      fetchExams(); // refresh list
    } else {
      Swal.fire("Failed", res.data.error || "Could not delete ", "error");
    }
  } catch (err) {
    Swal.close();
    Swal.fire("Error", "Server error occurred", "error");
  }
};





  return (
    <Container>
      <PageTitle>Your Created Exam / Test / Assessment</PageTitle>

      <ExamGrid>
        {exams.length === 0 && <p>No exams / test or assessment created yet.</p>}

        {exams.map((exam) => {
          const course = courses.find((c) => c.id == exam.course_id);
          const category = categories.find(
              (cat) => cat.id === Number(exam.category_id)
            );
          return (
            <ExamCard key={exam.id}>
              <ExamTitle>
                {course ? `${course.code} - ${course.title}` : `Course ID: ${exam.course_id}`}
              </ExamTitle>
              <ExamMeta><strong> {category?.name}</strong></ExamMeta>
              <ExamMeta><strong>Description:</strong> {capitalizeFirst(exam.description)}</ExamMeta>
              {/* <ExamMeta><strong>Duration:</strong> {exam.duration} mins</ExamMeta> */}
              <ExamMeta><strong>Start:</strong> {exam.start_time} <strong>UTC TIME-ZONE</strong></ExamMeta>
              <ExamMeta><strong>End:</strong> {exam.end_time} <strong>UTC TIME-ZONE</strong></ExamMeta>
            <div style={{ marginTop: "10px" }}>
  <span
    style={{
      marginRight: "15px",
      textDecoration: "underline",
      cursor: "pointer",
      color: "green",
      fontWeight: "bold",
    }}
    onClick={() => openEditModal(exam)}
  >
    Edit
  </span>
  <br/>
<span
  style={{
    textDecoration: "underline",
    cursor: "pointer",
    color: "#0cc0e0",
    marginTop: "8px",
    fontWeight: "bold",
  }}
  onClick={() => {
    setSelectedExam(exam);
    setShowQuestionsModal(true);
  }}
>
  Manage OBJ Questions
</span>
<br/>
<span
  style={{
    textDecoration: "underline",
    cursor: "pointer",
    color: "#0cc0e0",
    marginTop: "8px",
    fontWeight: "bold",
  }}
  onClick={() => {
    setSelectedExam(exam);
    setShowEssayQuestionsModal(true);
  }}
>
  Manage EASSY Questions
</span>
<br/>
  <span
    style={{
      textDecoration: "underline",
      cursor: "pointer",
      color: "red",
      fontWeight: "bold",
    }}
    onClick={() => deleteExam(exam.id)}
  >
    Delete
  </span>
</div>
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
            <CloseBtn onClick={() => closeEditModal()}><FaTimes /></CloseBtn>
            <h3 style={{ textAlign: "center", color: "green" }}>{editingExamId ? "Edit Exam, Test or Assessment" : "Create New Exam, Test or Assessment"}</h3>

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


             <Label>Select Category</Label>
            <select
              style={{ width: "100%", padding: "10px", marginTop: "5px", borderRadius: "6px", border: "1px solid #ccc" }}
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              required
            >
              <option value="">-- Select Category --</option>
             {categories.map((c)=>(
                <option value={c.id}>
                    {c.name}
                </option>
             ))}
            </select>

            <Label>Description</Label>
            <TextArea value={description} onChange={(e) => setDescription(e.target.value)} />
{/* 
            <Label>Duration (minutes)</Label>
            <Input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} disabled/> */}

           {/* <Label>Start Time</Label>
            <Input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />

            <Label>End Time</Label>
            <Input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} /> */}

<Label>Start Time (UTC) - ***THIS IS INTERNATIONAL TIME-ZONE (UTC)***</Label>
<Input
  type="datetime-local"
  value={startTime}
  onChange={(e) => setStartTime(e.target.value)}
/>
<p style={{ fontSize: "12px", color: "#555" }}>
  Local Time: {startTime ? new Date(startTime + "Z").toLocaleString() : ""}
</p>


<Label>End Time (UTC) - ***THIS IS INTERNATIONAL TIME-ZONE (UTC)***</Label>
<Input
  type="datetime-local"
  value={endTime}
  onChange={(e) => setEndTime(e.target.value)}
/>
<p style={{ fontSize: "12px", color: "#555" }}>
  Local Time: {endTime ? new Date(endTime + "Z").toLocaleString() : ""}
</p>


            <Button onClick={saveExam}>{editingExamId ? "Update" : "Create"}</Button>
          </Modal>
        </Overlay>
      )}

      {showQuestionsModal && selectedExam && (
  <ExamQuestionsModal
    exam={selectedExam}
    onClose={() => setShowQuestionsModal(false)}
  />
)}

   {showEssayQuestionsModal && selectedExam && (
  <EssayExamQuestionsModal
    exam={selectedExam}
    onClose={() => setShowEssayQuestionsModal(false)}
  />
)}

    </Container>
  );
};


export default LecturerExamsManagement;
