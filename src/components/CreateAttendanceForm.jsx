// CreateAttendanceForm.jsx
import React, { useContext, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import { Context } from "./Context";

const Box = styled.div`
  max-width: 720px;
  margin: 2rem auto;
  padding: 22px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
`;

const Row = styled.div`margin-bottom: 12px;`;
const Label = styled.label`display:block;margin-bottom:6px;font-weight:600;`;
const Input = styled.input`width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;`;
const Textarea = styled.textarea`width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;min-height:100px;`;
const Select = styled.select`width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;`;
const Button = styled.button`
  background:#119458;color:#fff;padding:10px 16px;
  border:none;border-radius:6px;cursor:pointer;font-weight:700;
  &:disabled { opacity:0.6; cursor:not-allowed; }
`;

const CreateAttendanceForm = ({onClose, fetchAttendance, adminId, apiBase = "https://www.cwmsrfupre.com.ng/api" }) => {
  const { courses } = useContext(Context);
  const [type, setType] = useState("class");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courseId, setCourseId] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!title.trim()) {
      Swal.fire("Validation", "Title is required.", "warning");
      return false;
    }
    if (type === "class" && !courseId) {
      Swal.fire("Validation", "Please select a course for class attendance.", "warning");
      return false;
    }
    if (!adminId || adminId <= 0) {
      Swal.fire("Validation", "Admin ID required.", "warning");
      return false;
    }
    return true;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  // ⚠️ Confirmation before creating
  const confirm = await Swal.fire({
    title: "Confirm Attendance Creation",
    html: `
      <p style="font-size:16px;">
        For <b>authenticity</b>, once this attendance sheet is created, 
        <b>it cannot be edited</b>. <br/><br/>
        Please ensure that all information provided is accurate before proceeding.
      </p>
    `,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Create Attendance",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#119458",
    reverseButtons: true,
  });

  if (!confirm.isConfirmed) return; // If cancelled, stop here

  setLoading(true);
  try {
    const payload = {
      type,
      title,
      description,
      course_id: type === "class" ? courseId : null,
      created_by: adminId,
    };

    const res = await axios.post(`${apiBase}/create_attendance.php`, payload);
    if (res.data.success) {
      Swal.fire("Success", "Attendance created successfully!", "success");
      setTitle("");
      setDescription("");
      setCourseId("");
      setType("class");
      fetchAttendance();
      onClose();
    } else {
      Swal.fire("Error", res.data.error || "Creation failed", "error");
    }
  } catch (err) {
    console.error(err);
    Swal.fire("Error", "Network or server error", "error");
  } finally {
    setLoading(false);
  }
};


  return (
    <Box>
      <h2 style={{color:"#119458", marginBottom:12}}>Create Attendance Sheet</h2>
      <form onSubmit={handleSubmit}>
        <Row>
          <Label>Type</Label>
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="class">Class</option>
            <option value="meeting">Meeting</option>
          </Select>
        </Row>

        {type === "class" && (
          <Row>
            <Label>Course</Label>
            <Select value={courseId} onChange={(e) => setCourseId(e.target.value)}>
              <option value="">-- Select course --</option>
              {courses.map(c => (
                <option key={c.id} value={c.id}>{c.code} - {c.title}</option>
              ))}
            </Select>
          </Row>
        )}

        <Row>
          <Label>Title</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Attendance title (e.g. Week 4 Lecture)"
          />
        </Row>

        <Row>
          <Label>Description</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
          />
        </Row>

        <Row style={{display:'flex', justifyContent:'flex-end', gap:10}}>
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Attendance"}
          </Button>
        </Row>
      </form>
    </Box>
  );
};

export default CreateAttendanceForm;




