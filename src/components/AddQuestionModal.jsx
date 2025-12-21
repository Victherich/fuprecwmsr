
import React, { useState } from "react";
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
//   margin-top: 10px;
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

const AddQuestionModal = ({ examId, onClose, onSaved }) => {
  const [form, setForm] = useState({
    question: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    correct_option: "",
    marks: null,
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const saveQuestion = async () => {
if(form.marks==null){
    Swal.fire({text:"Please complete the missing Fields"})
    return;
}


    try {
      Swal.fire({ title: "Saving...", allowOutsideClick: false });
      Swal.showLoading();

      const res = await axios.post(
        "https://www.cwmsrfupre.com.ng/api/create_exam_question.php",
        { ...form, exam_id: examId }
      );

      Swal.close();

      if (res.data.success) {
        Swal.fire("Success", "Question added", "success");
        onSaved();
        onClose();
      } else {
        Swal.fire("Failed", res.data.error, "error");
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

        <h3>Add Question</h3>

        <Input name="question" placeholder="Question" onChange={handleChange} />
<br/><br/>
        <p style={{fontSize:"small", fontWeight:"bold"}}>Answer Options:</p>
        <Input name="option_a" placeholder="Option A" onChange={handleChange} />
        <Input name="option_b" placeholder="Option B" onChange={handleChange} />
        <Input name="option_c" placeholder="Option C" onChange={handleChange} />
        <Input name="option_d" placeholder="Option D" onChange={handleChange} />
<br/><br/>
        <p style={{fontSize:"small", fontWeight:"bold"}}>Correct Answer:</p>
        <select
          name="correct_option"
          onChange={handleChange}
          style={{ width: "100%", padding: "10px"}}
        >
            <option value={null}>-Select correct Option-</option>
          <option value="A">Correct: A</option>
          <option value="B">Correct: B</option>
          <option value="C">Correct: C</option>
          <option value="D">Correct: D</option>
        </select>
<br/><br/>
        <p style={{fontSize:"small", fontWeight:"bold"}}>Mark:</p>
        <Input
          type="number"
          name="marks"
          value={form.marks}
          onChange={handleChange}
        />

        <Button onClick={saveQuestion}>Save Question</Button>
      </Modal>
    </Overlay>
  );
};

export default AddQuestionModal;
