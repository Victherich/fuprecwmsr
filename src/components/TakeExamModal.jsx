



import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { studentLogout } from "../Features/Slice";

/* ================= STYLES ================= */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(255,255,255,1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 500;
`;

const Modal = styled.div`
  background: white;
  width: 90%;
  max-width: 700px;
  height: 90vh;
  overflow-y: auto;
  padding: 25px;
  border-radius: 12px;
  position: relative;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const QuestionCard = styled.div`
  background: #f7f7f7;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 12px;
  background: green;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  margin-top: 20px;
  cursor: pointer;
`;

/* ================= COMPONENT ================= */
const TakeExamModal = ({
  examId,
  onClose,
  studentId,
  courseId,
  categoryId,
  courseName,
  examEndTime
}) => {

  /* ================= STATE ================= */
  const [questions, setQuestions] = useState([]);
  const [essayQuestions, setEssayQuestions] = useState([]);
const [fill_inQuestions, setFill_inQuestions] = useState([]);


  const [answers, setAnswers] = useState({ 0: "no answer" });
  const [essayAnswers, setEssayAnswers] = useState({});
  const [fill_inAnswers, setFill_inAnswers] = useState({});

  const [score, setScore] = useState(null);

  const [remainingSeconds, setRemainingSeconds] = useState(null);
  const [autoSubmitted, setAutoSubmitted] = useState(false);
  const dispatch = useDispatch();

  /* ================= FETCH OBJECTIVE QUESTIONS ================= */
  const fetchQuestions = async () => {
    try {
      const res = await axios.get(
        "https://www.cwmsrfupre.com.ng/base/get_exam_questions_for_student.php",
        { params: { exam_id: examId, student_id: studentId, _t: Date.now() } }
      );

      if (res.data.success) {
        setQuestions(res.data.questions);
      } else {
        Swal.fire({ text: res.data.error, icon: "info" });
      }
    } catch {
      Swal.fire("Error", "Server error occurred", "error");
    }
  };

  /* ================= FETCH ESSAY QUESTIONS ================= */
  const fetchEssayQuestions = async () => {
    try {
      const res = await axios.get(
        "https://www.cwmsrfupre.com.ng/base/get_essay_exam_questions_for_student.php",
        { params: { exam_id: examId, student_id: studentId, _t: Date.now() } }
      );

      if (res.data.success) {
        setEssayQuestions(res.data.questions);
      }
    } catch {
      Swal.fire("Error", "Server error occurred", "error");
    }
  };


  /* ================= FETCH ESSAY QUESTIONS ================= */
  const fetchFill_inQuestions = async () => {
    try {
      const res = await axios.get(
        "https://www.cwmsrfupre.com.ng/base/get_fill_in_exam_questions_for_student.php",
        { params: { exam_id: examId, student_id: studentId, _t: Date.now() } }
      );

      if (res.data.success) {
        setFill_inQuestions(res.data.questions);
      }
    } catch {
      Swal.fire("Error", "Server error occurred", "error");
    }
  };



  useEffect(() => {
    fetchQuestions();
    fetchEssayQuestions();
    fetchFill_inQuestions();
  }, []);


  /* ================= TIMER ================= */
  const getRemainingSeconds = (endTimeUTC) => {
    const now = new Date();
    const end = new Date(endTimeUTC + "Z");
    return Math.max(0, Math.floor((end - now) / 1000));
  };

  useEffect(() => {
    if (examEndTime) {
      setRemainingSeconds(getRemainingSeconds(examEndTime));
    }
  }, [examEndTime]);

  useEffect(() => {
    if (remainingSeconds === null) return;

    if (remainingSeconds <= 0 && !autoSubmitted) {
      setAutoSubmitted(true);
      handleAutoSubmit();
      return;
    }

    const timer = setInterval(() => {
      setRemainingSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingSeconds]);

  /* ================= ANSWER HANDLERS ================= */
  const handleChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleEssayChange = (questionId, value) => {
    setEssayAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

   const handleFill_inChange = (questionId, value) => {
    setFill_inAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };



  /* ================= ESSAY SUBMISSION ================= */
  const submitEssayExam = async () => {
    if (Object.keys(essayAnswers).length === 0) return;

    await axios.post(
      "https://www.cwmsrfupre.com.ng/base/submit_essay_exam.php",
      {
        exam_id: examId,
        student_id: studentId,
        answers: essayAnswers,
        course_id: courseId,
        category_id: categoryId
      }
    );
  };

    const submitFill_inExam = async () => {
    if (Object.keys(fill_inAnswers).length === 0) return;

    await axios.post(
      "https://www.cwmsrfupre.com.ng/base/submit_fill_in_exam.php",
      {
        exam_id: examId,
        student_id: studentId,
        answers: fill_inAnswers,
        course_id: courseId,
        category_id: categoryId
      }
    );
  };

  /* ================= AUTO SUBMIT ================= */
  const handleAutoSubmit = async () => {
    await Swal.fire({
      title: "Time Up!",
      text: "Exam time has ended. Submitting automatically...",
      icon: "warning",
      showConfirmButton: false,
      allowOutsideClick: false,
      timer: 4000
    });

    handleSubmit2();
  };

  // /* ================= MANUAL SUBMIT ================= */
  // const handleSubmit = async () => {
  //   const confirm = await Swal.fire({
  //     title: "Submit?",
  //     text: "Once submitted, you cannot change your answers.",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Yes, submit"
  //   });

  //   if (!confirm.isConfirmed) return;

  //   try {
  //     Swal.fire({ title: "Submitting...", allowOutsideClick: false });
  //     Swal.showLoading();

  //     const res = await axios.post(
  //       "https://www.cwmsrfupre.com.ng/base/submit_exam.php",
  //       {
  //         exam_id: examId,
  //         student_id: studentId,
  //         answers,
  //         course_id: courseId,
  //         category_id: categoryId
  //       }
  //     );

  //     Swal.close();

  //     if (res.data.success) {
  //       // await submitEssayExam();
  //       await submitFill_inExam();
  //       setScore(res.data.score);

  //       Swal.fire({
  //         title: "Submitted",
  //         text: `Objective score: ${res.data.score} / ${res.data.total}. Essay will be marked later.`,
  //         icon: "success",
  //         allowOutsideClick: false
  //       });

  //       onClose();
  //     } else {
  //       Swal.fire("Error", res.data.error || "Submission failed", "error");
  //     }
  //   } catch {
  //     Swal.fire("Error", "Server error occurred", "error");
  //   }
  // };




//   const handleSubmit = async () => {
//   const confirm = await Swal.fire({
//     title: "Submit?",
//     text: "Once submitted, you cannot change your answers.",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonText: "Yes, submit"
//   });

//   if (!confirm.isConfirmed) return;

//   try {
//     Swal.fire({ title: "Submitting...", allowOutsideClick: false });
//     Swal.showLoading();

//     // 🔹 Submit OBJECTIVE
//     const objRes = await axios.post(
//       "https://www.cwmsrfupre.com.ng/base/submit_exam.php",
//       {
//         exam_id: examId,
//         student_id: studentId,
//         answers,
//         course_id: courseId,
//         category_id: categoryId
//       }
//     );

//     // 🔹 Submit FILL-IN
//     let fillScore = 0;
//     let fillTotal = 0;

//     if (Object.keys(fill_inAnswers).length > 0) {
//       const fillRes = await axios.post(
//         "https://www.cwmsrfupre.com.ng/base/submit_fill_in_exam.php",
//         {
//           exam_id: examId,
//           student_id: studentId,
//           answers: fill_inAnswers,
//           course_id: courseId,
//           category_id: categoryId
//         }
//       );

//       if (fillRes.data.success) {
//         fillScore = fillRes.data.score;
//         fillTotal = fillRes.data.total;
//       }
//     }

//     Swal.close();

//     if (objRes.data.success) {
//       const objScore = objRes.data.score;
//       const objTotal = objRes.data.total;

//       Swal.fire({
//         title: "Submitted Successfully 🎉",
//         html: `
//           <div style="text-align:left">
//             <p><strong>Objective:</strong> ${objScore} / ${objTotal}</p>
//             <p><strong>Fill-in:</strong> ${fillScore} / ${fillTotal}</p>
//             <hr/>
//             <p><strong>Total Score:</strong> ${objScore + fillScore} / ${objTotal + fillTotal}</p>
//           </div>
//         `,
//         icon: "success",
//         allowOutsideClick: false
//       });

//       onClose();
//     } else {
//       Swal.fire("Error", objRes.data.error || "Submission failed", "error");
//     }
//   } catch (err) {
//     Swal.fire("Error", "Server error occurred", "error");
//   }
// };





const handleSubmit = async () => {
  const confirm = await Swal.fire({
    title: "Submit?",
    text: "Once submitted, you cannot change your answers.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, submit"
  });

  if (!confirm.isConfirmed) return;

  try {
    Swal.fire({ title: "Submitting...", allowOutsideClick: false });
    Swal.showLoading();

    let objScore = 0;
    let objTotal = 0;
    let fillScore = 0;
    let fillTotal = 0;

    /* ================= OBJECTIVE ================= */
    if (questions.length > 0) {
      const objRes = await axios.post(
        "https://www.cwmsrfupre.com.ng/base/submit_exam.php",
        {
          exam_id: examId,
          student_id: studentId,
          answers,
          course_id: courseId,
          category_id: categoryId
        }
      );

      if (objRes.data.success) {
        objScore = objRes.data.score;
        objTotal = objRes.data.total;
      } else {
        throw new Error(objRes.data.error || "Objective submission failed");
      }
    }

    /* ================= FILL-IN ================= */
    if (fill_inQuestions.length > 0) {
      const fillRes = await axios.post(
        "https://www.cwmsrfupre.com.ng/base/submit_fill_in_exam.php",
        {
          exam_id: examId,
          student_id: studentId,
          answers: fill_inAnswers,
          course_id: courseId,
          category_id: categoryId
        }
      );

      if (fillRes.data.success) {
        fillScore = fillRes.data.score;
        fillTotal = fillRes.data.total;
      } else {
        throw new Error(fillRes.data.error || "Fill-in submission failed");
      }
    }

    Swal.close();

    /* ================= RESULT DISPLAY ================= */
    Swal.fire({
      title: "Submitted Successfully 🎉",
      html: `
        <div style="text-align:left">
          ${
            questions.length > 0
              ? `<p><strong>Objective:</strong> ${objScore} / ${objTotal}</p>`
              : ""
          }
          ${
            fill_inQuestions.length > 0
              ? `<p><strong>Fill-in:</strong> ${fillScore} / ${fillTotal}</p>`
              : ""
          }
          <hr/>
          <p><strong>Total Score:</strong> ${objScore + fillScore} / ${objTotal + fillTotal}</p>
        </div>
      `,
      icon: "success",
      allowOutsideClick: false
    });

    onClose();

  } catch (err) {
    Swal.fire("Error", err.message || "Server error occurred", "error");
  }
};




  /* ================= AUTO SUBMIT HANDLER ================= */
  const handleSubmit2 = async () => {
    try {
      const res = await axios.post(
        "https://www.cwmsrfupre.com.ng/base/submit_exam.php",
        {
          exam_id: examId,
          student_id: studentId,
          answers,
          course_id: courseId,
          category_id: categoryId
        }
      );

      if (res.data.success) {
        await submitEssayExam();
        setScore(res.data.score);
        onClose();
      }
    } catch {
      Swal.fire("Error", "Auto submission failed", "error");
    }
  };





useEffect(() => {
  const handleFullscreenChange = () => {
    // If no fullscreen element → user exited
    if (!document.fullscreenElement) {

dispatch(studentLogout()); 

      Swal.fire({
        icon: "warning",
        title: "Fullscreen exited!",
        text: "You have been logged out for exiting the exam full screen.",
        allowOutsideClick: false
      });





      // OPTIONAL: try to re-enter fullscreen automatically
      document.documentElement.requestFullscreen().catch(() => {});
    }
  };

  document.addEventListener("fullscreenchange", handleFullscreenChange);

  return () => {
    document.removeEventListener("fullscreenchange", handleFullscreenChange);
  };
}, []);



  /* ================= RENDER ================= */
  return (
    <Overlay>
      <Modal>
        <CloseBtn onClick={onClose}><FaTimes /></CloseBtn>

        <h3 style={{ textAlign: "center", color: "green" }}>Take Exam</h3>

        {remainingSeconds !== null && (
          <p style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>
            Time Remaining: {Math.floor(remainingSeconds / 60)}:
            {(remainingSeconds % 60).toString().padStart(2, "0")}
          </p>
        )}

        <p style={{ textAlign: "center", color: "green", fontWeight: "bold" }}>
          Course: {courseName}
        </p>

        {questions.length>0&&<h3 style={{ textAlign: "center", color: "green" }}>Objective Questions</h3>}
        {questions.map((q, index) => (
          <QuestionCard key={q.id}>
            <p><strong>Q{index + 1}:</strong> {q.question}</p>
            {["A", "B", "C", "D"].map(opt => (
              <label key={opt} style={{ display: "block" }}>
                <input
                  type="radio"
                  name={`q_${q.id}`}
                  checked={answers[q.id] === opt}
                  onChange={() => handleChange(q.id, opt)}
                /> {opt}. {q[`option_${opt.toLowerCase()}`]}
              </label>
            ))}
          </QuestionCard>
        ))}

        {/* <h3 style={{ textAlign: "center", color: "green" }}>Essay Questions</h3>
        {essayQuestions.map((q, index) => (
          <QuestionCard key={q.id}>
            <p><strong>Q{index + 1}:</strong> {q.question}</p>
            <textarea
              rows="6"
              style={{ width: "100%", padding: "10px", borderRadius: "6px" }}
              placeholder="Write your answer here..."
              value={essayAnswers[q.id] || ""}
              onChange={(e) => handleEssayChange(q.id, e.target.value)}
            />
          </QuestionCard>
        ))} */}

           {fill_inQuestions.length>0&&<h3 style={{ textAlign: "center", color: "green" }}>Fill-in Questions</h3>}
        {fill_inQuestions.map((q, index) => (
          <QuestionCard key={q.id}>
            <p><strong>Q{index + 1}:</strong> {q.question}</p>
            <textarea
              rows="6"
              style={{ width: "100%", padding: "10px", borderRadius: "6px" }}
              placeholder="Write your answer here..."
              value={fill_inAnswers[q.id] || ""}
              onChange={(e) => handleFill_inChange(q.id, e.target.value)}
            />
          </QuestionCard>
        ))}

        <SubmitBtn onClick={handleSubmit}>Submit Exam</SubmitBtn>
      </Modal>
    </Overlay>
  );
};

export default TakeExamModal;
