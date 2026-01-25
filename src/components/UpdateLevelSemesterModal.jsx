import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const Modal = styled.div`
  background: white;
  padding: 20px;
  border-radius: 16px;
  width: 400px;
  max-width: 90%;
`;

const Title = styled.h2`
  margin-bottom: 10px;
  color: #006400;
  text-align: center;
`;

const Field = styled.div`
  margin: 10px 0;
`;

const Label = styled.label`
  font-weight: 600;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px;
  border-radius: 10px;
  border: 1px solid green;
  background: white;
  color: green;
  cursor: pointer;

  &:hover {
    background: green;
    color: white;
  }
`;

export default function UpdateLevelSemesterModal({
  show,
  onClose,
  student,
  refreshStudent,
}) {
  const [levels, setLevels] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [levelId, setLevelId] = useState("");
  const [semesterId, setSemesterId] = useState("");

  useEffect(() => {
    if (!show) return;

    // fetch levels & semesters
    axios
      .get("https://www.cwmsrfupre.com.ng/api/get_levels.php")
      .then((res) => setLevels(res.data.levels || []))
      .catch(() => setLevels([]));

    axios
      .get("https://www.cwmsrfupre.com.ng/api/get_semesters.php")
      .then((res) => setSemesters(res.data.semesters || []))
      .catch(() => setSemesters([]));

    // prefill current values
    if (student?.level_semester) {
      setLevelId(student.level_semester.level_id);
      setSemesterId(student.level_semester.semester_id);
    }
  }, [show, student]);

  const handleSave = async () => {
    if (!levelId && !semesterId) {
      Swal.fire("Error", "Please select level or semester.", "error");
      return;
    }

    try {
      const res = await axios.post(
        "https://www.cwmsrfupre.com.ng/api/update_student_level_semester.php",
        {
          id: student.id,
          level_id: levelId,
          semester_id: semesterId,
        }
      );

      if (res.data.success) {
        Swal.fire("Success", res.data.message || "Updated successfully", "success");
        refreshStudent();
        onClose();
      } else {
        Swal.fire("Error", res.data.error || "Failed to update", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  if (!show) return null;

  return (
    <Overlay>
      <Modal>
        <Title>Update Level & Semester</Title>

        <Field>
          <Label>Level</Label>
          <Select value={levelId} onChange={(e) => setLevelId(e.target.value)}>
            <option value="">-- Select Level --</option>
            {levels.map((l) => (
              <option key={l.id} value={l.id}>
                {l.level_name}
              </option>
            ))}
          </Select>
        </Field>

        <Field>
          <Label>Semester</Label>
          <Select
            value={semesterId}
            onChange={(e) => setSemesterId(e.target.value)}
          >
            <option value="">-- Select Semester --</option>
            {semesters.map((s) => (
              <option key={s.id} value={s.id}>
                {s.semester_name}
              </option>
            ))}
          </Select>
        </Field>

        <ButtonWrap>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </ButtonWrap>
      </Modal>
    </Overlay>
  );
}
