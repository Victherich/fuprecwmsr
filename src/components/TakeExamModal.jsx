
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTimes } from "react-icons/fa";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
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

const TakeExamModal = ({ examId, onClose, studentId, courseId, categoryId }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  // Fetch exam questions
  const fetchQuestions = async () => {
    try {
      const res = await axios.get(
        "https://www.cwmsrfupre.com.ng/api/get_exam_questions.php",
        { params: { exam_id: examId, _t: Date.now() } }
      );
      if (res.data.success) {
        setQuestions(res.data.questions);
      } else {
        Swal.fire("Error", res.data.error || "Failed to fetch questions", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Server error occurred", "error");
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSubmit = async () => {
    // Ensure all questions answered
    if (questions.some(q => !answers[q.id])) {
      Swal.fire("Warning", "Please answer all questions", "warning");
      return;
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
        Swal.fire("Done", `You scored ${res.data.score} out of ${res.data.total}`, "success");
        onClose();
      } else {
        Swal.fire("Error", res.data.error || "Submission failed", "error");
      }
    } catch (err) {
      Swal.close();
      Swal.fire("Error", "Server error occurred", "error");
    }
  };

  return (
    <Overlay>
      <Modal>
        <CloseBtn onClick={onClose}><FaTimes /></CloseBtn>
        <h3 style={{ textAlign: "center", color: "green" }}>Take Exam</h3>

        {score !== null && (
          <p style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.2rem" }}>
            Your Score: {score} / {questions.reduce((acc, q) => acc + q.marks, 0)}
          </p>
        )}

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

        {questions.length > 0 && <SubmitBtn onClick={handleSubmit}>Submit Exam</SubmitBtn>}
      </Modal>
    </Overlay>
  );
};

export default TakeExamModal;




