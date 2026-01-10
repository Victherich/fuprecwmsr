import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTimes } from "react-icons/fa";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 400;
`;

const Modal = styled.div`
  background: white;
  width: 90%;
  max-width: 600px;
  padding: 25px;
  border-radius: 12px;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  resize: vertical;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  background: green;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
`;

const AddEssayQuestionModal = ({ examId, onClose, onSaved, editingQuestion }) => {
  const [form, setForm] = useState({
    question: "",
    correct_answer: "",
    marks: ""
  });

  useEffect(() => {
    if (editingQuestion) {
      setForm({
        question: editingQuestion.question,
        correct_answer: editingQuestion.correct_answer,
        marks: editingQuestion.marks
      });
    }
  }, [editingQuestion]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const saveQuestion = async () => {
    if (!form.question || !form.correct_answer || !form.marks) {
      Swal.fire("Validation", "All fields are required", "warning");
      return;
    }

    try {
      Swal.fire({ title: "Saving...", allowOutsideClick: false });
      Swal.showLoading();

      const url = editingQuestion
        ? "https://www.cwmsrfupre.com.ng/api/update_essay_exam_question.php"
        : "https://www.cwmsrfupre.com.ng/api/create_essay_exam_question.php";

      const payload = editingQuestion
        ? { ...form, id: editingQuestion.id }
        : { ...form, exam_id: examId };

      const res = await axios.post(url, payload);
      Swal.close();

      if (res.data.success) {
        Swal.fire("Success", "Question saved", "success");
        onSaved();
        onClose();
      } else {
        Swal.fire("Error", res.data.error, "error");
      }
    } catch {
      Swal.close();
      Swal.fire("Error", "Server error", "error");
    }
  };

  return (
    <Overlay>
      <Modal>
        <FaTimes
          style={{ position: "absolute", right: 15, top: 15, cursor: "pointer" }}
          onClick={onClose}
        />

        <h3>{editingQuestion ? "Edit Essay Question" : "Add Essay Question"}</h3>

        <Input
          name="question"
          placeholder="Essay Question"
          value={form.question}
          onChange={handleChange}
        />

        <p style={{ fontWeight: "bold" }}>Model / Correct Answer</p>
        <TextArea
          name="correct_answer"
          rows={6}
          placeholder="Write the expected answer here..."
          value={form.correct_answer}
          onChange={handleChange}
        />

        <p style={{ fontWeight: "bold" }}>Marks</p>
        <Input
          type="number"
          name="marks"
          value={form.marks}
          onChange={handleChange}
        />

        <Button onClick={saveQuestion}>
          {editingQuestion ? "Update Question" : "Save Question"}
        </Button>
      </Modal>
    </Overlay>
  );
};

export default AddEssayQuestionModal;
