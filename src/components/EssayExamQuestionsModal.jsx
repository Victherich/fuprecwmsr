import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTimes, FaPlus } from "react-icons/fa";
import AddQuestionModal from "./AddQuestionModal";
import { Context } from "./Context";
import AddEssayQuestionModal from "./AddEssayQuestionModal";

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
`;

const ActionBtn = styled.button`
  margin-right: 10px;
  padding: 6px 12px;
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
  padding: 8px 14px;
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
const EssayExamQuestionsModal = ({ exam, onClose }) => {
  const [questions, setQuestions] = useState([]);
  const [showAddModal, setShowAddModal] = useState({ open: false, editingQuestion: null });
  const { courses } = useContext(Context);

  const course = courses.find(c => String(c.id) === String(exam.course_id));

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(
        "https://www.cwmsrfupre.com.ng/api/get_essay_exam_questions.php",
        { params: { exam_id: exam.id } }
      );
      if (res.data.success) setQuestions(res.data.questions);
    } catch {
      Swal.fire("Error", "Failed to load questions", "error");
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete question?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete"
    });

    if (!confirm.isConfirmed) return;

    try {
      Swal.showLoading();
      const res = await axios.post(
        "https://www.cwmsrfupre.com.ng/api/delete_essay_exam_question.php",
        { question_id: id }
      );
      Swal.close();

      if (res.data.success) {
        Swal.fire("Deleted", "Question removed", "success");
        fetchQuestions();
      } else {
        Swal.fire("Error", res.data.error, "error");
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

          <h3 style={{ textAlign: "center", color: "green" }}>
            Essay Questions
          </h3>

          <p style={{ textAlign: "center", fontWeight: "bold" }}>
            {course ? `${course.code} — ${course.title}` : ""}
          </p>

          <AddBtn onClick={() => setShowAddModal({ open: true, editingQuestion: null })}>
            <FaPlus /> Add Essay Question
          </AddBtn>

          {questions.length === 0 && <p>No questions added yet.</p>}

          {questions.map((q, index) => (
            <QuestionCard key={q.id}>
              <strong>Q{index + 1}.</strong> {q.question}

              <p style={{ marginTop: "8px" }}>
                <strong>Model Answer:</strong>
              </p>

              <p style={{
                background: "#fff",
                padding: "10px",
                borderRadius: "5px",
                fontSize: "14px"
              }}>
                {q.correct_answer}
              </p>

              <p><strong>Marks:</strong> {q.marks}</p>

              <div>
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
        <AddEssayQuestionModal
          examId={exam.id}
          editingQuestion={showAddModal.editingQuestion}
          onClose={() => setShowAddModal({ open: false, editingQuestion: null })}
          onSaved={fetchQuestions}
        />
      )}
    </>
  );
};

export default EssayExamQuestionsModal;
