import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { Context } from "./Context";
import Swal from "sweetalert2";

// === Styled Components ===
const Container = styled.div`
  max-width: 1000px;
  margin: 40px auto;
  padding: 30px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 3px 15px rgba(51, 40, 40, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: green;
  margin-bottom: 30px;
  font-weight: 800;
`;

const SubmissionCard = styled.div`
  background: #f7f7f7;
  border-left: 6px solid #2ecc71;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 8px;
  transition: transform 0.2s ease;
  &:hover {
    transform: translateY(-3px);
  }
`;

const StudentInfo = styled.p`
  color: #333;
  margin: 6px 0;
  font-size: 0.95rem;
`;

const FileLink = styled.a`
  display: inline-block;
  margin-top: 10px;
  color: #0077b6;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const Message = styled.p`
  text-align: center;
  color: #777;
`;

const MarkButton = styled.button`
  background: #2ecc71;
  color: #fff;
  border: none;
  padding: 7px 14px;
  border-radius: 6px;
  font-size: 0.9rem;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    background: #27ae60;
  }
`;

// === Modal Styles ===
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 25px 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.2s ease-in-out;
`;

const ModalTitle = styled.h3`
  margin-bottom: 20px;
  text-align: center;
  color: #2ecc71;
`;

const ScoreInput = styled.input`
  padding: 10px 14px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-bottom: 20px;
  font-size: 1rem;
  outline: none;
  &:focus {
    border-color: #2ecc71;
  }
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  background: ${(props) => (props.cancel ? "#ccc" : "#2ecc71")};
  color: ${(props) => (props.cancel ? "#000" : "#fff")};
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background: ${(props) => (props.cancel ? "#aaa" : "#27ae60")};
  }
`;

// === Main Component ===
const SubmissionsToLecturer = ({ lecturerId }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [score, setScore] = useState("");
  const [saving, setSaving] = useState(false);
  const { categories, courses } = useContext(Context);
  const [lecturer, setLecturer]=useState([])

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.post(
          "https://www.cwmsrfupre.com.ng/api/get_submissions_for_lecturer.php",
          { lecturer_id: lecturerId },
          { headers: { "Cache-Control": "no-cache" } }
        );
        if (response.data.success) setSubmissions(response.data.submissions);
      } catch (err) {
        setError("Error fetching submissions.");
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, [lecturerId]);

  const getCategoryInfo = (id) => {
    const category = categories.find((c) => c.id === parseInt(id));
    return category ? category.name : `Category ${id}`;
  };

  const getCourseInfo = (courseId) => {
    const course = courses.find((c) => c.id === parseInt(courseId));
    return course ? `${course.code} - ${course.title}` : `Course ID: ${courseId}`;
  };

  const openModal = (submission) => {
    setSelectedSubmission(submission);
    setScore(submission.score || "");
  };

  const closeModal = () => {
    setSelectedSubmission(null);
    setScore("");
  };

  const saveScore = async () => {
    if (!score) return alert("Please enter a score first.");
    if (score < 0 || score > 100)
      return alert("Score must be between 0 and 100.");

    setSaving(true);
    try {
      const response = await axios.post(
        "https://www.cwmsrfupre.com.ng/api/mark_submission.php",
        {
          submission_id: selectedSubmission.submission_id,
          lecturer_id: lecturerId,
          score: parseFloat(score),
        }
      );

      if (response.data.success) {
        Swal.fire({text:"Score saved successfully!", icon:"success"});
        setSubmissions((prev) =>
          prev.map((s) =>
            s.submission_id === selectedSubmission.submission_id
              ? { ...s, score }
              : s
          )
        );
        closeModal();
      } else {
        Swal.fire({text:response.data.error});
      }
    } catch (err) {
      Swal.fire({text:"Network error while saving score."});
    } finally {
      setSaving(false);
    }
  };




 // 🧠 Fetch lecturer details by ID and cache results
  const getLecturerName = async (id) => {
    if (!id) return "—";
    if (lecturer[id]) return lecturer[id]; // already cached

    try {
      const res = await axios.get(
        `https://www.cwmsrfupre.com.ng/api/get_lecturer_by_id.php?id=${id}`
      );
      if (res.data.success && res.data.user?.name) {
        setLecturer((prev) => ({ ...prev, [id]: res.data.user.name }));
        return res.data.user.name;
      } else {
        return "Unknown Lecturer";
      }
    } catch (err) {
      console.error("Error fetching lecturer:", err);
      return "Error";
    }
  };


  // Fetch lecturer name whenever marked_by exists
  useEffect(() => {
    submissions.forEach((sub) => {
      if (sub.marked_by && !lecturer[sub.marked_by]) {
        getLecturerName(sub.marked_by);
      }
    });
  }, [submissions]);


  return (
    <Container>
      <Title>Student Submissions (Your Courses)</Title>

      {loading && <Message>Loading...</Message>}
      {error && <Message>{error}</Message>}

      {submissions.map((sub, i) => (
        <SubmissionCard key={i}>
          <StudentInfo>
            <strong>Student:</strong> {sub.student_name} ({sub.admission_number})
          </StudentInfo>
          <StudentInfo>
            <strong>Email:</strong> {sub.student_email}
          </StudentInfo>
          <StudentInfo>
            <strong>Course:</strong> {getCourseInfo(sub.course_id)}
          </StudentInfo>
          <StudentInfo>
            <strong>Category:</strong> {getCategoryInfo(sub.category_id)}
          </StudentInfo>
          <StudentInfo>
            <strong>Score:</strong>{" "}
            {sub.score ? `${sub.score}` : "Not marked"}
          </StudentInfo>
           <StudentInfo>
            <strong>Marked by:</strong>{" "}
            {lecturer[sub?.marked_by] || "Not marked..."}
          </StudentInfo>
           {/* <StudentInfo>
            <strong>Marked At:</strong> {sub.marked_at?sub.marked_at:"Not marked"}
          </StudentInfo> */}

          {sub.file_url && (
            <FileLink href={sub.file_url} target="_blank" rel="noopener noreferrer">
              📥 Download Submission
            </FileLink>
          )}
<br/>
          <MarkButton onClick={() => openModal(sub)}>Mark / Edit Score</MarkButton>
        </SubmissionCard>
      ))}

      {selectedSubmission && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Mark Submission</ModalTitle>
            <p>
              <strong>{selectedSubmission.student_name}</strong> (
              {selectedSubmission.admission_number})
            </p>
            <p>{getCategoryInfo(selectedSubmission.category_id)}</p>
            <ScoreInput
              type="number"
              min="0"
              max="100"
              placeholder="Enter score (0–100)"
              value={score}
              onChange={(e) => setScore(e.target.value)}
            />
            <ModalActions>
              <Button cancel onClick={closeModal}>
                Cancel
              </Button>
              <Button onClick={saveScore} disabled={saving}>
                {saving ? "Saving..." : "Save Score"}
              </Button>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default SubmissionsToLecturer;
