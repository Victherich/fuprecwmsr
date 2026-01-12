
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
    const {courses, categories} = useContext(Context)
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeExam, setActiveExam] = useState(null);

console.log(activeExam)


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
  // Always fetch once on mount
  fetchExams();

  // DO NOT start interval if student is taking an exam
  if (activeExam) return;

  const interval = setInterval(() => {
    fetchExams();
  }, 60*1000);

  return () => clearInterval(interval);
}, [activeExam]);


//   const getCourseName = (courseId) => {
//     const course = courses.find(c => String(c.id) === String(courseId));
//     return course ? `${course.code} - ${course.title}` : `Course ID: ${courseId}`;
//   };


const getCourseName = (courseId) => {
    const course = courses.find(c => c.id === parseInt(courseId));
    return course ? `${course.code} - ${course.title}` : `Course ID: ${courseId}`;
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === parseInt(categoryId));
    return category ? `${category.name} ` : `Category ID: ${categoryId}`;
  };
  
  return (
    <Container>
      <PageTitle>Your Online Exams / Assessments</PageTitle>
       <p style={{fontSize:"0.8rem", marginBottom:"10px",textAlign: "center" }}>Note that the exam timings are in UTC TIME-ZONE to accomodate all students internationally, ensure you correctly match with your local timimg. If the time for your exam reaches and you have not seen your exam here , you can refresh the page. If it your exam still doesnt show, you can contact the management, but ensure that its time for your exam.</p>
        
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading exams...</p>
      ) : exams.length === 0 ? (
        <p style={{ textAlign: "center" }}><span style={{color:"green", fontWeight:"bold"}}>No exams available at the moment.</span> <br/><br/>Note that the exam timings are in UTC TIME-ZONE to accomodate all students internationally, ensure you correctly match with your local timimg. If the time for your exam reaches and you have not seen your exam here , you can refresh the page. If it your exam still doesnt show, you can contact the management, but ensure that its time for your exam.</p>
      ) : (
        <ExamGrid>
           {exams.map((exam) => (
            <ExamCard key={exam.exam_id}>
              <ExamTitle><strong>{getCourseName(exam.course_id)}</strong></ExamTitle>
              <ExamMeta><strong>{getCategoryName(exam.category_id)}</strong> </ExamMeta>
              <ExamMeta><strong>Description:</strong> {exam.description}</ExamMeta>
              {/* <ExamMeta><strong>Duration:</strong> {exam.duration} mins</ExamMeta> */}
              <ExamMeta><strong>Start:</strong> {exam.start_time} <strong>UTC TIME-ZONE</strong></ExamMeta>
              <ExamMeta><strong>End:</strong> {exam.end_time} <strong>UTC TIME-ZONE</strong></ExamMeta>

              {/* <button
    style={{ marginTop: "10px", padding: "8px", background: "green", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
    onClick={() => setActiveExam({ ...exam })}

  >
    Take Exam
  </button> */}

  {/* <button
  style={{ marginTop: "10px", padding: "8px", background: "green", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
  onClick={() => {
    // Trigger full-screen mode on direct user click
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {
        console.warn("Fullscreen request failed");
      });
    }

    // Open the exam modal
    setActiveExam({ ...exam });
  }}
>
  Take Exam
</button> */}

<button
  style={{
    marginTop: "10px",
    padding: "8px",
    background: "green",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }}
  onClick={async () => {

    try {
      Swal.fire({
        title: "Checking exam status...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
      });

      const res = await axios.post(
        "https://www.cwmsrfupre.com.ng/api/check_exam_taken.php",
        {
          exam_id: exam.exam_id,
          student_id: studentId
        }
      );

      Swal.close();

      if (res.data.success && res.data.taken) {
        Swal.fire({
          icon: "info",
          title: "Exam Already Taken",
          text: res.data.message,
          allowOutsideClick: false
        });
        return;
      }

      /* ===== SAFE TO START EXAM ===== */
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }

      setActiveExam({ ...exam });

    } catch (error) {
      Swal.close();
      Swal.fire(
        "Error",
        "Unable to verify exam status. Please try again.",
        "error"
      );
    }
  }}
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
    categoryId={activeExam.category_id} //will change it 
    onClose={() => setActiveExam(null)}
    courseName={getCourseName(activeExam.course_id)}
    examEndTime={activeExam.end_time}
  />
)}  </ExamGrid>
      )}


    </Container>
  );
};

export default StudentExams;
