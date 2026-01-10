
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTimes } from "react-icons/fa";

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

const TakeExamModal = ({ examId, onClose, studentId, courseId, categoryId, courseName, examEndTime }) => {
  const [questions, setQuestions] = useState([]);
   const [essayQuestions, setEssayQuestions] = useState([]);
  const [answers, setAnswers] = useState({0:"no answer"});
  const [score, setScore] = useState(null);

  const [remainingSeconds, setRemainingSeconds] = useState(null);
const [autoSubmitted, setAutoSubmitted] = useState(false);
// const [examEndTime, setExamEndTime] = useState(null);


  // Fetch exam questions
  const fetchQuestions = async () => {
    try {
      const res = await axios.get(
        "https://www.cwmsrfupre.com.ng/api/get_exam_questions_for_student.php",
        { params: { exam_id: examId, _t: Date.now(),student_id:studentId } }
      );
      if (res.data.success) {
        setQuestions(res.data.questions);
      } else {
        Swal.fire({text: res.data.error || "Failed to fetch questions", icon:"info", allowOutsideClick:false});
      }
    } catch (err) {
      Swal.fire("Error", "Server error occurred", "error");
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);


    // Fetch exam questions
  const fetchEssayQuestions = async () => {
    try {
      const res = await axios.get(
        "https://www.cwmsrfupre.com.ng/api/get_essay_exam_questions_for_student.php",
        { params: { exam_id: examId, _t: Date.now(),student_id:studentId } }
      );
      if (res.data.success) {
        setEssayQuestions(res.data.questions);
      } else {
        Swal.fire({text: res.data.error || "Failed to fetch questions", icon:"info", allowOutsideClick:false});
      }
    } catch (err) {
      Swal.fire("Error", "Server error occurred", "error");
    }
  };

  useEffect(() => {
    fetchEssayQuestions();
  }, []);



// UTC COUNTDOWN CALCULATION
const getRemainingSeconds = (endTimeUTC) => {
  const now = new Date();
  const end = new Date(endTimeUTC + "Z"); // force UTC
  return Math.max(0, Math.floor((end - now) / 1000));
};



// START TIMER WHEN END TIME IS AVAILABLE
useEffect(() => {
  if (!examEndTime) return;

  setRemainingSeconds(getRemainingSeconds(examEndTime));
}, [examEndTime]);



// AUTO-SUBMIT WHEN TIME ELAPSES
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



// AUTO-SUBMIT FUNCTION (NO CONFIRMATION)
const handleAutoSubmit = async () => {
await  Swal.fire({
    title: "Time Up!",
    text: "Exam time has ended. Submitting automatically...",
    icon: "warning",
    allowOutsideClick: false,
    showConfirmButton: false,
    timer:5000
  });

//   await submitExam(true);
handleSubmit2();
};




  const handleChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };



  const handleSubmit = async () => {
      // ✅ Confirmation before submit
  const confirm = await Swal.fire({
    title: "Submit?",
    text: "Once submitted, you will not be able to change your answers.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#0a8f3d",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, submit",
    cancelButtonText: "Cancel"
  });

  if (!confirm.isConfirmed) {
    return; // stop if student cancels
  }

    try {
      Swal.fire({ title: "Submitting...", allowOutsideClick: false });
      Swal.showLoading();

      const res = await axios.post(
        "https://www.cwmsrfupre.com.ng/api/submit_exam.php",
        { exam_id: examId, student_id: studentId, answers, course_id: courseId, category_id:categoryId}
      );

      Swal.close();

      if (res.data.success) {
        setScore(res.data.score);
        Swal.fire({title:"Done", text:`You scored ${res.data.score} out of ${res.data.total}`, icon:"success", allowOutsideClick:false});
        onClose();
      } else {
        Swal.fire("Error", res.data.error || "Submission failed", "error");
      }
    } catch (err) {
      Swal.close();
      Swal.fire("Error", "Server error occurred", "error");
    }
  };



  const handleSubmit2 = async () => {

    try {
      Swal.fire({ title: "Submitting...", allowOutsideClick: false });
      Swal.showLoading();

      const res = await axios.post(
        "https://www.cwmsrfupre.com.ng/api/submit_exam.php",
        { exam_id: examId, student_id: studentId, answers, course_id: courseId, category_id:categoryId}
      );

      Swal.close();

      if (res.data.success) {
        setScore(res.data.score);
        Swal.fire({title:"Done", text:`You scored ${res.data.score} out of ${res.data.total}`, icon:"success", allowOutsideClick:false});
        onClose();
      } else {
        Swal.fire("Error", res.data.error || "Submission failed", "error");
      }
    } catch (err) {
      Swal.close();
      Swal.fire("Error", "Server error occurred", "error");
    }
  };



// const submitExam = async (forced = false) => {
//   try {
//     if (!forced) {
//       const confirm = await Swal.fire({
//         title: "Submit?",
//         text: "Once submitted, you cannot change your answers.",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#0a8f3d",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, submit"
//       });

//       if (!confirm.isConfirmed) return;
//     }

//     Swal.fire({ title: "Submitting...", allowOutsideClick: false });
//     Swal.showLoading();

//     const res = await axios.post(
//       "https://www.cwmsrfupre.com.ng/api/submit_exam.php",
//       {
//         exam_id: examId,
//         student_id: studentId,
//         answers,
//         // forced,
//         course_id: courseId,
//         category_id: categoryId
//       }
//     );

//     Swal.close();

//     if (res.data.success) {
//       Swal.fire("Done", "Exam submitted successfully", "success");
//       onClose();
//     } else {
//       Swal.fire("Error", res.data.error, "error");
//     }
//   } catch {
//     Swal.close();
//     Swal.fire("Error", "Submission failed", "error");
//   }
// };





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

       
        <p style={{textAlign:"center", color:"green", fontWeight:"bold"}}>Course: {courseName}</p>
        <ul style={{fontSize:"0.8rem"}}>
            <li>Do not close the modal until you submit to avoid lossing your progress.</li>
            <li>Do not refresh the page until you submit to avoid losing your progress.</li>
            <li>Do not navigate away from this window as it can lead to modal closing or page refreshing which will result in lossing your progress.</li>
        <li>Ensure to submit the exam by clicking the submit button when you are through</li>
        <li>This exam will automatically submit if the time elpases and you haven't yet submitted.</li>
        </ul>
 
       
<br/>
        <h3 style={{ textAlign: "center", color: "green" }}>Objective Questions</h3>

        {questions.map((q, index) => (
          <QuestionCard key={q.id}>
            <p><strong>Q{index + 1}:</strong> {q.question}</p>
            <div>
              {['A','B','C','D'].map(opt => (
                <label key={opt} style={{ display: "block", marginBottom: "5px" }}>
                  <input
                    type="radio"
                    name={`q_${q.id}`}
                    value={opt}
                    checked={answers[q.id] === opt}
                    onChange={() => handleChange(q.id, opt)}
                  /> {opt}. {q[`option_${opt.toLowerCase()}`]}
                </label>
              ))}
            </div>
          </QuestionCard>
        ))}
<br/>
<h3 style={{ textAlign: "center", color: "green" }}>Essay Questions</h3>
             {essayQuestions.map((q, index) => (
          <QuestionCard key={q.id}>
            <p><strong>Q{index + 1}:</strong> {q.question}</p>
            <div>
              {['A','B','C','D'].map(opt => (
                <label key={opt} style={{ display: "block", marginBottom: "5px" }}>
                  <input
                    type="radio"
                    name={`q_${q.id}`}
                    value={opt}
                    checked={answers[q.id] === opt}
                    onChange={() => handleChange(q.id, opt)}
                  /> {opt}. {q[`option_${opt.toLowerCase()}`]}
                </label>
              ))}
            </div>
          </QuestionCard>
        ))}



      {questions.length > 0 && <SubmitBtn onClick={handleSubmit}>Submit Exam</SubmitBtn>}
      </Modal>
    </Overlay>
  );
};

export default TakeExamModal;






// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { FaTimes } from "react-icons/fa";

// /* ================= STYLES ================= */
// const Overlay = styled.div`
//   position: fixed;
//   inset: 0;
//   width: 100vw;
//   height: 100vh;
//   background: rgba(0, 0, 0, 0.95);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 9999;
//   overflow: hidden;
// `;

// const Modal = styled.div`
//   background: white;
//   width: 100%;
//   height: 100%;
//   max-width: none;
//   border-radius: 0;
//   padding: 30px;
//   overflow-y: auto;
//   position: relative;
// `;

// const CloseBtn = styled.button`
//   position: absolute;
//   top: 15px;
//   right: 15px;
//   background: none;
//   border: none;
//   font-size: 1.5rem;
//   cursor: pointer;
// `;

// const QuestionCard = styled.div`
//   background: #f7f7f7;
//   padding: 15px;
//   margin-bottom: 15px;
//   border-radius: 8px;
// `;

// const SubmitBtn = styled.button`
//   width: 100%;
//   padding: 12px;
//   background: green;
//   color: white;
//   font-weight: bold;
//   border: none;
//   border-radius: 6px;
//   margin-top: 20px;
//   cursor: pointer;
// `;

// /* ================= COMPONENT ================= */
// const TakeExamModal = ({ examId, onClose, studentId, courseId, categoryId, courseName, examEndTime }) => {
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const [score, setScore] = useState(null);
//   const [remainingSeconds, setRemainingSeconds] = useState(null);
//   const [autoSubmitted, setAutoSubmitted] = useState(false);

//   /* ================= FETCH QUESTIONS ================= */
//   const fetchQuestions = async () => {
//     try {
//       const res = await axios.get(
//         "https://www.cwmsrfupre.com.ng/api/get_exam_questions_for_student.php",
//         { params: { exam_id: examId, _t: Date.now(), student_id: studentId } }
//       );
//       if (res.data.success) {
//         setQuestions(res.data.questions);
//       } else {
//         Swal.fire({ text: res.data.error || "Failed to fetch questions", icon: "info", allowOutsideClick: false });
//       }
//     } catch (err) {
//       Swal.fire("Error", "Server error occurred", "error");
//     }
//   };

//   useEffect(() => {
//     fetchQuestions();
//   }, []);

//   /* ================= COUNTDOWN ================= */
//   const getRemainingSeconds = (endTimeUTC) => {
//     const now = new Date();
//     const end = new Date(endTimeUTC + "Z");
//     return Math.max(0, Math.floor((end - now) / 1000));
//   };

//   useEffect(() => {
//     if (!examEndTime) return;
//     setRemainingSeconds(getRemainingSeconds(examEndTime));
//   }, [examEndTime]);

//   useEffect(() => {
//     if (remainingSeconds === null) return;
//     if (remainingSeconds <= 0 && !autoSubmitted) {
//       setAutoSubmitted(true);
//       handleSubmit(true);
//       return;
//     }
//     const timer = setInterval(() => setRemainingSeconds(prev => prev - 1), 1000);
//     return () => clearInterval(timer);
//   }, [remainingSeconds]);

//   /* ================= LOCKDOWN ================= */
//   useEffect(() => {
//     // Warn on tab/window blur
//     const handleBlur = () => {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Do not leave this page!',
//         text: 'Switching tabs or minimizing the browser is not allowed during the exam.',
//         timer: 5000,
//         showConfirmButton: false
//       });
//     };

//     // Disable right-click and text selection
//     const disableContext = e => e.preventDefault();
//     const disableSelect = e => e.preventDefault();

//     window.addEventListener('blur', handleBlur);
//     document.addEventListener('contextmenu', disableContext);
//     document.addEventListener('selectstart', disableSelect);

//     // Request full-screen mode on exam start
//     if (document.documentElement.requestFullscreen) {
//       document.documentElement.requestFullscreen().catch(() => {});
//     }

//     // Clean up
//     return () => {
//       window.removeEventListener('blur', handleBlur);
//       document.removeEventListener('contextmenu', disableContext);
//       document.removeEventListener('selectstart', disableSelect);
//       if (document.fullscreenElement) document.exitFullscreen();
//     };
//   }, []);

//   /* ================= HANDLE ANSWERS ================= */
//   const handleChange = (questionId, value) => {
//     setAnswers({ ...answers, [questionId]: value });
//   };

//   /* ================= SUBMIT ================= */
//   const handleSubmit = async (forced = false) => {
//     if (!forced) {
//       const confirm = await Swal.fire({
//         title: "Submit?",
//         text: "Once submitted, you will not be able to change your answers.",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#0a8f3d",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, submit",
//         cancelButtonText: "Cancel"
//       });
//       if (!confirm.isConfirmed) return;
//     }

//     try {
//       Swal.fire({ title: "Submitting...", allowOutsideClick: false });
//       Swal.showLoading();

//       const res = await axios.post(
//         "https://www.cwmsrfupre.com.ng/api/submit_exam.php",
//         { exam_id: examId, student_id: studentId, answers, course_id: courseId, category_id: categoryId }
//       );

//       Swal.close();

//       if (res.data.success) {
//         setScore(res.data.score);
//         Swal.fire({ title: "Done", text: `You scored ${res.data.score} out of ${res.data.total}`, icon: "success", allowOutsideClick: false });
//         onClose();
//       } else {
//         Swal.fire("Error", res.data.error || "Submission failed", "error");
//       }
//     } catch (err) {
//       Swal.close();
//       Swal.fire("Error", "Server error occurred", "error");
//     }
//   };

//   /* ================= CLOSE ================= */
//   const handleClose = () => {
//     if (Object.keys(answers).length > 0 && !score) {
//       Swal.fire({
//         title: "Are you sure?",
//         text: "Closing will lose your progress!",
//         icon: "warning",
//         showCancelButton: true
//       }).then(res => {
//         if (res.isConfirmed) onClose();
//       });
//     } else {
//       onClose();
//     }
//   };

//   /* ================= RENDER ================= */
//   return (
//     <Overlay>
//       <Modal>
//         <CloseBtn onClick={handleClose}><FaTimes /></CloseBtn>

//         <h3 style={{ textAlign: "center", color: "green" }}>Take Exam</h3>

//         {remainingSeconds !== null && (
//           <p style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>
//             Time Remaining: {Math.floor(remainingSeconds / 60)}:{(remainingSeconds % 60).toString().padStart(2, "0")}
//           </p>
//         )}

//         <p style={{ textAlign: "center", color: "green", fontWeight: "bold" }}>Course: {courseName}</p>

//         <ul style={{ fontSize: "0.8rem" }}>
//           <li>Do not close the modal until you submit to avoid losing your progress.</li>
//           <li>Do not refresh or navigate away until submission is complete.</li>
//           <li>This exam will automatically submit if time elapses.</li>
//         </ul>

//         {score !== null && (
//           <p style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.2rem" }}>
//             Your Score: {score} / {questions.reduce((acc, q) => acc + q.marks, 0)}
//           </p>
//         )}

//         {questions.map((q, index) => (
//           <QuestionCard key={q.id}>
//             <p><strong>Q{index + 1}:</strong> {q.question}</p>
//             {['A', 'B', 'C', 'D'].map(opt => (
//               <label key={opt} style={{ display: "block", marginBottom: "5px" }}>
//                 <input
//                   type="radio"
//                   name={`q_${q.id}`}
//                   value={opt}
//                   checked={answers[q.id] === opt}
//                   onChange={() => handleChange(q.id, opt)}
//                 /> {opt}. {q[`option_${opt.toLowerCase()}`]}
//               </label>
//             ))}
//           </QuestionCard>
//         ))}

//         {questions.length > 0 && <SubmitBtn onClick={() => handleSubmit(false)}>Submit Exam</SubmitBtn>}
//       </Modal>
//     </Overlay>
//   );
// };

// export default TakeExamModal;






// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { FaTimes } from "react-icons/fa";

// /* ================= STYLES ================= */
// const Overlay = styled.div`
//   position: fixed;
//   inset: 0;
//   width: 100vw;
//   height: 100vh;
//   background: rgba(0,0,0,0.95);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 9999;
//   overflow: hidden;
// `;

// const Modal = styled.div`
//   background: white;
//   width: 100%;
//   height: 100%;
//   max-width: none;
//   border-radius: 0;
//   padding: 30px;
//   overflow-y: auto;
//   position: relative;
// `;

// const CloseBtn = styled.button`
//   position: absolute;
//   top: 15px;
//   right: 15px;
//   background: none;
//   border: none;
//   font-size: 1.5rem;
//   cursor: pointer;
// `;

// const QuestionCard = styled.div`
//   background: #f7f7f7;
//   padding: 15px;
//   margin-bottom: 15px;
//   border-radius: 8px;
// `;

// const SubmitBtn = styled.button`
//   width: 100%;
//   padding: 12px;
//   background: green;
//   color: white;
//   font-weight: bold;
//   border: none;
//   border-radius: 6px;
//   margin-top: 20px;
//   cursor: pointer;
// `;

// const TakeExamModal = ({ examId, onClose, studentId, courseId, categoryId, courseName, examEndTime }) => {
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const [score, setScore] = useState(null);
//   const [remainingSeconds, setRemainingSeconds] = useState(null);
//   const [autoSubmitted, setAutoSubmitted] = useState(false);

//   /* ================= FETCH QUESTIONS ================= */
//   const fetchQuestions = async () => {
//     try {
//       const res = await axios.get(
//         "https://www.cwmsrfupre.com.ng/api/get_exam_questions_for_student.php",
//         { params: { exam_id: examId, _t: Date.now(), student_id: studentId } }
//       );
//       if (res.data.success) setQuestions(res.data.questions);
//       else Swal.fire({ text: res.data.error || "Failed to fetch questions", icon: "info", allowOutsideClick: false });
//     } catch (err) {
//       Swal.fire("Error", "Server error occurred", "error");
//     }
//   };

//   useEffect(() => { fetchQuestions(); }, []);

//   /* ================= COUNTDOWN ================= */
//   const getRemainingSeconds = (endTimeUTC) => {
//     const now = new Date();
//     const end = new Date(endTimeUTC + "Z");
//     return Math.max(0, Math.floor((end - now) / 1000));
//   };

//   useEffect(() => {
//     if (!examEndTime) return;
//     setRemainingSeconds(getRemainingSeconds(examEndTime));
//   }, [examEndTime]);

//   useEffect(() => {
//     if (remainingSeconds === null) return;
//     if (remainingSeconds <= 0 && !autoSubmitted) {
//       setAutoSubmitted(true);
//       handleSubmit(true);
//       return;
//     }
//     const timer = setInterval(() => setRemainingSeconds(prev => prev - 1), 1000);
//     return () => clearInterval(timer);
//   }, [remainingSeconds]);

//   /* ================= LOCKDOWN ================= */
//   useEffect(() => {
//     // Warn if student leaves the tab
//     const handleBlur = () => {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Do not leave this page!',
//         text: 'Switching tabs or minimizing the browser is not allowed during the exam.',
//         timer: 5000,
//         showConfirmButton: false
//       });
//     };

//     // Warn if full-screen is exited
//     const handleFullscreenChange = () => {
//       if (!document.fullscreenElement) {
//         Swal.fire({
//           icon: "warning",
//           title: "Full-screen exited!",
//           text: "Please return to full-screen to continue the exam.",
//           timer: 5000,
//           showConfirmButton: false
//         });
//       }
//     };

//     // Disable right-click and selection
//     const disableContext = e => e.preventDefault();
//     const disableSelect = e => e.preventDefault();

//     window.addEventListener('blur', handleBlur);
//     document.addEventListener('contextmenu', disableContext);
//     document.addEventListener('selectstart', disableSelect);
//     document.addEventListener("fullscreenchange", handleFullscreenChange);

//     return () => {
//       window.removeEventListener('blur', handleBlur);
//       document.removeEventListener('contextmenu', disableContext);
//       document.removeEventListener('selectstart', disableSelect);
//       document.removeEventListener("fullscreenchange", handleFullscreenChange);
//     };
//   }, []);

//   /* ================= ANSWERS ================= */
//   const handleChange = (questionId, value) => setAnswers({ ...answers, [questionId]: value });

//   /* ================= SUBMIT ================= */
//   const handleSubmit = async (forced = false) => {
//     if (!forced) {
//       const confirm = await Swal.fire({
//         title: "Submit?",
//         text: "Once submitted, you will not be able to change your answers.",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#0a8f3d",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, submit",
//         cancelButtonText: "Cancel"
//       });
//       if (!confirm.isConfirmed) return;
//     }

//     try {
//       Swal.fire({ title: "Submitting...", allowOutsideClick: false });
//       Swal.showLoading();

//       const res = await axios.post(
//         "https://www.cwmsrfupre.com.ng/api/submit_exam.php",
//         { exam_id: examId, student_id: studentId, answers, course_id: courseId, category_id: categoryId }
//       );

//       Swal.close();

//       if (res.data.success) {
//         setScore(res.data.score);
//         Swal.fire({ title: "Done", text: `You scored ${res.data.score} out of ${res.data.total}`, icon: "success", allowOutsideClick: false });
//         onClose();
//       } else {
//         Swal.fire("Error", res.data.error || "Submission failed", "error");
//       }
//     } catch (err) {
//       Swal.close();
//       Swal.fire("Error", "Server error occurred", "error");
//     }
//   };

//   /* ================= CLOSE ================= */
//   const handleClose = () => {
//     if (Object.keys(answers).length > 0 && !score) {
//       Swal.fire({
//         title: "Are you sure?",
//         text: "Closing will lose your progress!",
//         icon: "warning",
//         showCancelButton: true
//       }).then(res => { if (res.isConfirmed) onClose(); });
//     } else onClose();
//   };

//   /* ================= RENDER ================= */
//   return (
//     <Overlay>
//       <Modal>
//         <CloseBtn onClick={handleClose}><FaTimes /></CloseBtn>

//         <h3 style={{ textAlign: "center", color: "green" }}>Take Exam</h3>

//         {remainingSeconds !== null && (
//           <p style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>
//             Time Remaining: {Math.floor(remainingSeconds / 60)}:{(remainingSeconds % 60).toString().padStart(2,"0")}
//           </p>
//         )}

//         <p style={{ textAlign: "center", color: "green", fontWeight: "bold" }}>Course: {courseName}</p>

//         <ul style={{ fontSize: "0.8rem" }}>
//           <li>Do not close the modal until you submit to avoid losing progress.</li>
//           <li>Do not refresh or navigate away until submission is complete.</li>
//           <li>This exam will automatically submit if time elapses.</li>
//         </ul>

//         {score !== null && (
//           <p style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.2rem" }}>
//             Your Score: {score} / {questions.reduce((acc, q) => acc + q.marks, 0)}
//           </p>
//         )}

//         {questions.map((q,index) => (
//           <QuestionCard key={q.id}>
//             <p><strong>Q{index+1}:</strong> {q.question}</p>
//             {['A','B','C','D'].map(opt => (
//               <label key={opt} style={{ display:"block", marginBottom:"5px" }}>
//                 <input type="radio" name={`q_${q.id}`} value={opt} checked={answers[q.id]===opt} onChange={()=>handleChange(q.id,opt)} />
//                 {opt}. {q[`option_${opt.toLowerCase()}`]}
//               </label>
//             ))}
//           </QuestionCard>
//         ))}

//         {questions.length>0 && <SubmitBtn onClick={()=>handleSubmit(false)}>Submit Exam</SubmitBtn>}
//       </Modal>
//     </Overlay>
//   );
// };

// export default TakeExamModal;
