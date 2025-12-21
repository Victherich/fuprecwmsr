
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import { Context } from "./Context";
import TakeExamModal from "./TakeExamModal";

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
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
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

/* ================= COMPONENT ================= */
const StudentExams = ({ studentId}) => {
    const {courses} = useContext(Context)
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeExam, setActiveExam] = useState(null);




  const fetchExams = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://www.cwmsrfupre.com.ng/api/get_exams_for_student.php",
        { params: { student_id: studentId, _t: Date.now() } } // prevent caching
      );
      if (res.data.success) {
        setExams(res.data.exams);
      } else {
        Swal.fire("Error", res.data.error || "Failed to fetch exams", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Server error occurred", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

//   const getCourseName = (courseId) => {
//     const course = courses.find(c => String(c.id) === String(courseId));
//     return course ? `${course.code} - ${course.title}` : `Course ID: ${courseId}`;
//   };


const getCourseName = (courseId) => {
    const course = courses.find(c => c.id === parseInt(courseId));
    return course ? `${course.code} - ${course.title}` : `Course ID: ${courseId}`;
  };

  return (
    <Container>
      <PageTitle>Your Enrolled Exams</PageTitle>
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading exams...</p>
      ) : exams.length === 0 ? (
        <p style={{ textAlign: "center" }}>No exams available.</p>
      ) : (
        <ExamGrid>
          {exams.map((exam) => (
            <ExamCard key={exam.exam_id}>
              <ExamTitle>{getCourseName(exam.course_id)}</ExamTitle>
              <ExamMeta><strong>Title:</strong> {exam.title}</ExamMeta>
              <ExamMeta><strong>Description:</strong> {exam.description}</ExamMeta>
              <ExamMeta><strong>Duration:</strong> {exam.duration} mins</ExamMeta>
              <ExamMeta><strong>Start:</strong> {exam.start_time}</ExamMeta>
              <ExamMeta><strong>End:</strong> {exam.end_time}</ExamMeta>

              <button
    style={{ marginTop: "10px", padding: "8px", background: "green", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
    onClick={() => setActiveExam(exam)}
  >
    Take Exam
  </button>
            </ExamCard>
          ))}
      {activeExam && (
  <TakeExamModal
    examId={activeExam.exam_id}
    studentId={studentId}
    courseId={activeExam.course_id}
    categoryId={activeExam.course_id} //will change it 
    onClose={() => setActiveExam(null)}
  />
)}  </ExamGrid>
      )}


    </Container>
  );
};

export default StudentExams;
