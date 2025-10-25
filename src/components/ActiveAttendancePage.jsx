
import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import { Context } from "./Context";

const Container = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 1rem;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  padding: 18px 22px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h3`
  color: #119458;
  margin: 0;
`;

const Button = styled.button`
  background: #119458;
  color: #fff;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  align-self: flex-start;
  &:hover {
    background: #0d7d45;
  }
`;

const ActiveAttendancePage = ({
  apiBase = "https://www.cwmsrfupre.com.ng/api",
  userId,
  userType // 'student' or 'lecturer'
}) => {
  const [activeList, setActiveList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { courses } = useContext(Context);

  const fetchActive = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiBase}/get_active_attendance.php`);
      if (res.data.success) setActiveList(res.data.attendance);
      else Swal.fire("Error", "Failed to fetch active attendance", "error");
    } catch {
      Swal.fire("Error", "Network or server issue", "error");
    } finally {
      setLoading(false);
    }
  };

//   useEffect(() => { fetchActive(); }, []);

  useEffect(() => {
    // Run immediately on mount
    fetchActive();
  
    // Then re-run every 10 seconds
    const interval = setInterval(() => {
      fetchActive();
    }, 10000); // 10,000 ms = 10 seconds
  
    // Cleanup on unmount to prevent memory leaks
    return () => clearInterval(interval);
  }, []);

  const handleClockIn = async (attendanceId) => {
    const confirm = await Swal.fire({
      title: "Confirm Clock-in?",
      text: "Are you sure you want to clock in for this attendance?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Clock In",
      confirmButtonColor: "#119458"
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axios.post(`${apiBase}/clock_in.php`, {
        attendance_id: attendanceId,
        user_id: userId,
        user_type: userType
      });

      if (res.data.success) {
        Swal.fire("Success", res.data.message, "success");
      } else {
        Swal.fire("Notice", res.data.error || "Clock-in failed", "info");
      }
    } catch {
      Swal.fire("Error", "Could not clock in", "error");
    }
  };

  const getCourseTitle = (courseId) => {
    if (!courseId) return "—";
    const course = courses.find(c => c.id === parseInt(courseId));
    return course ? `${course.code} - ${course.title}` : "Unknown Course";
  };

  return (
    <Container>
      <h2 style={{ color: "#119458" }}>Active Attendance Sheets</h2>

      {loading ? (
        <p>Loading...</p>
      ) : activeList.length === 0 ? (
        <p>No active attendance sheets available.</p>
      ) : (
        activeList.map((item) => (
          <Card key={item.id}>
            <Title>{item.title.charAt(0).toUpperCase() + item.title.slice(1)}</Title>
            <div><strong>Type:</strong> {item.type}</div>
            {item.course_id && <div><strong>Course:</strong> {getCourseTitle(item.course_id)}</div>}
            {item.description && <div><strong>Description:</strong> {item.description}</div>}
            <div><strong>Created:</strong> {new Date(item.created_at).toLocaleString()}</div>

            <Button onClick={() => handleClockIn(item.id)}>Clock In</Button>
          </Card>
        ))
      )}
    </Container>
  );
};

export default ActiveAttendancePage;
