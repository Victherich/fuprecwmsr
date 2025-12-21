
// import React, { useContext, useEffect, useState } from "react";
// import styled from "styled-components";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { FaTimes, FaPlus } from "react-icons/fa";
// import AddQuestionModal from "./AddQuestionModal";
// import { Context } from "./Context";

// /* ================= STYLES ================= */
// const Overlay = styled.div`
//   position: fixed;
//   inset: 0;
//   background: rgba(0,0,0,0.6);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 300;
// `;

// const Modal = styled.div`
//   background: white;
//   width: 95%;
//   max-width: 800px;
//   height: 90vh;
//   padding: 25px;
//   border-radius: 12px;
//   overflow-y: auto;
//   position: relative;
// `;

// const CloseBtn = styled.button`
//   background: none;
//   border: none;
//   position: absolute;
//   right: 15px;
//   top: 15px;
//   font-size: 1.4rem;
//   cursor: pointer;
// `;

// const QuestionCard = styled.div`
//   background: #f7f7f7;
//   padding: 15px;
//   border-radius: 8px;
//   margin-bottom: 15px;
// `;



// const AddBtn = styled.button`
//   padding: 8px;
//   background: green;
//   color: white;
//   border: none;
//   border-radius: 6px;
//   font-weight: bold;
//   cursor: pointer;
//   margin-left: auto;
//   display: block;
// `;



// /* ================= COMPONENT ================= */
// const ExamQuestionsModal = ({ exam, onClose }) => {
//   const [questions, setQuestions] = useState([]);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const {courses} =useContext(Context)

//   const fetchQuestions = async () => {
//     try {
//       const res = await axios.get(
//         "https://www.cwmsrfupre.com.ng/api/get_exam_questions.php",
//         { params: { exam_id: exam.id } }
//       );

//       if (res.data.success) {
//         setQuestions(res.data.questions);
//       }
//     } catch {
//       Swal.fire("Error", "Failed to load questions", "error");
//     }
//   };

//   useEffect(() => {
//     fetchQuestions();
//   }, []);



// const course = courses.find(
//   (c) => String(c.id) === String(exam.course_id)
// );




//   return (
//     <>
//       <Overlay>
//         <Modal>
//           <CloseBtn onClick={onClose}><FaTimes /></CloseBtn>

//           <h3 style={{ textAlign: "center", color: "green" }}>
//             Exam Questions
//           </h3>
//           <p style={{ textAlign: "center", marginBottom: "5px", fontWeight: "bold" }}>
//   {course
//     ? `${course.code} — ${course.title}`
//     : `Course ID: ${exam.course_id}`}
// </p>

// <AddBtn onClick={() => setShowAddModal(true)}>
//             <FaPlus /> Add Question
//           </AddBtn>

//           {questions.length === 0 && <p>No questions added yet.</p>}

//           {questions.map((q, index) => (
//             <QuestionCard key={q.id}>
//               <strong>Q{index + 1}.</strong> {q.question}
//               <ul>
//                 <li>A. {q.option_a}</li>
//                 <li>B. {q.option_b}</li>
//                 <li>C. {q.option_c}</li>
//                 <li>D. {q.option_d}</li>
//               </ul>
//               <strong>Correct:</strong> {q.correct_option} | <strong>Marks:</strong> {q.marks}
//             </QuestionCard>
//           ))}

          
//         </Modal>
//       </Overlay>

//       {showAddModal && (
//         <AddQuestionModal
//           examId={exam.id}
//           onClose={() => setShowAddModal(false)}
//           onSaved={fetchQuestions}
//         />
//       )}
//     </>
//   );
// };

// export default ExamQuestionsModal;





import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTimes, FaPlus } from "react-icons/fa";
import AddQuestionModal from "./AddQuestionModal";
import { Context } from "./Context";

/* ================= STYLES ================= */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 300;
`;

const Modal = styled.div`
  background: white;
  width: 95%;
  max-width: 800px;
  height: 90vh;
  padding: 25px;
  border-radius: 12px;
  overflow-y: auto;
  position: relative;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  position: absolute;
  right: 15px;
  top: 15px;
  font-size: 1.4rem;
  cursor: pointer;
`;

const QuestionCard = styled.div`
  background: #f7f7f7;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  position: relative;
`;

const ActionBtn = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  font-weight: bold;
  cursor: pointer;
`;

const EditBtn = styled(ActionBtn)`
  background: #0cc0e0;
  color: white;
`;

const DeleteBtn = styled(ActionBtn)`
  background: #e04c4c;
  color: white;
`;

const AddBtn = styled.button`
  padding: 8px 12px;
  background: green;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  margin-left: auto;
  display: block;
`;

/* ================= COMPONENT ================= */
const ExamQuestionsModal = ({ exam, onClose }) => {
  const [questions, setQuestions] = useState([]);
  const [showAddModal, setShowAddModal] = useState({ open: false, editingQuestion: null });
  const { courses } = useContext(Context);

  const course = courses.find(c => String(c.id) === String(exam.course_id));

  // Fetch questions
  const fetchQuestions = async () => {
    try {
      const res = await axios.get(
        "https://www.cwmsrfupre.com.ng/api/get_exam_questions.php",
        { params: { exam_id: exam.id, _t: Date.now() } } // prevent caching
      );
      if (res.data.success) setQuestions(res.data.questions);
    } catch {
      Swal.fire("Error", "Failed to load questions", "error");
    }
  };

  useEffect(() => { fetchQuestions(); }, []);

  // Delete question
  const handleDelete = async (questionId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the question permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (!confirm.isConfirmed) return;



    try {
      Swal.fire({ title: "Deleting...", allowOutsideClick: false });
      Swal.showLoading();
      const res = await axios.post(
        "https://www.cwmsrfupre.com.ng/api/delete_exam_question.php",
        { question_id: questionId }
      );
      Swal.close();
      if (res.data.success) {
        Swal.fire("Deleted", "Question deleted", "success");
        fetchQuestions();
      } else {
        Swal.fire("Failed", res.data.error, "error");
      }
    } catch {
      Swal.close();
      Swal.fire("Error", "Server error", "error");
    }
  };

  return (
    <>
      <Overlay>
        <Modal>
          <CloseBtn onClick={onClose}><FaTimes /></CloseBtn>

          <h3 style={{ textAlign: "center", color: "green" }}>Exam / Test / Assessment Questions</h3>
          <p style={{ textAlign: "center", marginBottom: "5px", fontWeight: "bold" }}>
            {course ? `${course.code} — ${course.title}` : `Course ID: ${exam.course_id}`}
          </p>

          <AddBtn onClick={() => setShowAddModal({ open: true, editingQuestion: null })}>
            <FaPlus /> Add Question
          </AddBtn>

          {questions.length === 0 && <p>No questions added yet.</p>}

          {questions.map((q, index) => (
            <QuestionCard key={q.id}>
              <strong>Q{index + 1}.</strong> {q.question}
              <ul>
                <li>A. {q.option_a}</li>
                <li>B. {q.option_b}</li>
                <li>C. {q.option_c}</li>
                <li>D. {q.option_d}</li>
              </ul>
              <strong>Correct:</strong> {q.correct_option} | <strong>Marks:</strong> {q.marks}
              <div style={{ marginTop: "10px" }}>
                <EditBtn onClick={() => setShowAddModal({ open: true, editingQuestion: q })}>
                  Edit
                </EditBtn>
                <DeleteBtn onClick={() => handleDelete(q.id)}>
                  Delete
                </DeleteBtn>
              </div>
            </QuestionCard>
          ))}
        </Modal>
      </Overlay>

      {showAddModal.open && (
        <AddQuestionModal
          examId={exam.id}
          editingQuestion={showAddModal.editingQuestion}
          onClose={() => setShowAddModal({ open: false, editingQuestion: null })}
          onSaved={fetchQuestions}
        />
      )}
    </>
  );
};

export default ExamQuestionsModal;

