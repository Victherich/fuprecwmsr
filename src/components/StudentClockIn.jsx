
// StudentClockIn.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import styled from "styled-components";
import { Context } from "./Context";

const Box = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 24px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  text-align: center;
`;

const Button = styled.button`
  background: #119458;
  color: #fff;
  border: none;
  padding: 10px 22px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 700;
`;

const StudentClockIn = ({student, apiBase = "https://www.cwmsrfupre.com.ng/api" }) => {

  const [activeSheet, setActiveSheet] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchActive = async () => {
      try {
        const res = await axios.get(`${apiBase}/get_active_attendance.php`);
        if (res.data.active) setActiveSheet(res.data.attendance);
      } catch (err) {
        console.error(err);
      }
    };
    fetchActive();
  }, [apiBase]);

  const handleClockIn = async () => {
    if (!student?.id || !activeSheet) return;
    setLoading(true);
    try {
      const res = await axios.post(`${apiBase}/submit_attendance.php`, {
        student_id: student.id,
        attendance_id: activeSheet.id
      });
      if (res.data.success) {
        Swal.fire("Success", "Your attendance has been recorded.", "success");
      } else {
        Swal.fire("Error", res.data.error || "Failed to submit", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Network error", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!activeSheet) {
    return (
      <Box>
        <h3>No Active Attendance</h3>
        <p>Attendance will appear here when opened by admin.</p>
      </Box>
    );
  }

  return (
    <Box>
      <h3 style={{ color: "#119458" }}>{activeSheet.title}</h3>
      <p>{activeSheet.description}</p>
      <Button onClick={handleClockIn} disabled={loading}>
        {loading ? "Submitting..." : "Clock In"}
      </Button>
    </Box>
  );
};

export default StudentClockIn;
