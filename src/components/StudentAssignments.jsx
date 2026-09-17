
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useContext } from 'react';
import { Context } from './Context';

// ---------- MODERNIZED STYLED COMPONENTS ----------
const Container = styled.div`
  max-width: 900px;
  margin: 10px auto;
  padding: 10px;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid rgba(0, 128, 0, 0.1);
  box-shadow: 0 4px 20px rgba(0, 128, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h2`
  text-align: center;
  color: #119458;
  margin: 0 0 10px 0;
  font-weight: 800;
  font-size: 1.5rem;
  letter-spacing: -0.5px;
`;

const AssignmentCard = styled.div`
  background: #f8fafc;
  border-left: 5px solid #f97316;
  margin: 0;
  padding: 10px;
  border-radius: 8px;
  border-top: 1px solid #e2e8f0;
  border-right: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  transition: transform 0.2s ease, border-color 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 6px;

  &:hover {
    border-color: #119458;
    transform: translateY(-1px);
  }
`;

const AssignmentTitle = styled.h3`
  margin: 0;
  color: #0a4d24;
  font-size: 1.05rem;
  font-weight: 700;
`;

const AssignmentDescription = styled.p`
  margin: 0;
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const FileLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
  color: #0077b6;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.85rem;
  transition: color 0.2s ease;

  &:hover {
    color: #0cc1e0;
    text-decoration: underline;
  }
`;

const Message = styled.p`
  text-align: center;
  color: #64748b;
  margin: 10px 0;
  font-size: 0.95rem;
  font-weight: 500;
`;
// Main Component
const StudentAssignments = ({ studentId, semesterId }) => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {courses}=useContext(Context);
  const [filterCourse, setFilterCourse] = useState("");
const [filterSearch, setFilterSearch] = useState("");
const {api_url}=useContext(Context);



 useEffect(() => {
  if (!studentId || !semesterId) {
    setError("Missing student ID or semester ID.");
    setLoading(false);
    return;
  }

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(
        `${api_url}/get_assignments_for_student.php?student_id=${studentId}&semester_id=${semesterId}`
      );

      if (response.data.success) {
        setAssignments(response.data.assignments);
        console.log(response.data.assignments);
      } else {
        setError(response.data.error || "Failed to fetch posts.");
      }
    } catch (err) {
      setError("An error occurred while fetching post.");
    } finally {
      setLoading(false);
    }
  };

  // Run immediately on mount or when IDs change
  fetchAssignments();

  // Run every 5 seconds
  const interval = setInterval(() => {
    fetchAssignments();
  }, 5000);

  // Cleanup on unmount
  return () => clearInterval(interval);

}, [studentId, semesterId]);



  const getCourseInfo = (courseId) => {
    const course = courses.find(c => c.id === parseInt(courseId));
    return course ? `${course.code} - ${course.title}` : `Course ID: ${courseId}`;
  };

  const filteredAssignments = assignments.filter((a) => {
  const matchesCourse =
    !filterCourse || String(a.course_id) === String(filterCourse);

  const matchesSearch =
    !filterSearch ||
    a.title.toLowerCase().includes(filterSearch.toLowerCase()) ||
    a.description.toLowerCase().includes(filterSearch.toLowerCase());

  return matchesCourse && matchesSearch;
});


  return (
    <Container>
      <Title>Your Assignments / Handouts</Title>

      <div
  style={{
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "20px",
    alignItems: "center",
  }}
>
  {/* Course Filter */}
  <select
    value={filterCourse}
    onChange={(e) => setFilterCourse(e.target.value)}
    style={{
      padding: "8px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      minWidth: "220px",
    }}
  >
    <option value="">All Courses</option>
    {courses.map((c) => (
      <option key={c.id} value={c.id}>
        {c.code} - {c.title}
      </option>
    ))}
  </select>

  {/* Search Filter */}
  <input
    type="text"
    placeholder="Search by title or description..."
    value={filterSearch}
    onChange={(e) => setFilterSearch(e.target.value)}
    style={{
      padding: "8px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      minWidth: "250px",
      flex: 1,
    }}
  />

  {/* Clear Filters Button */}
  {(filterCourse || filterSearch) && (
    <button
      onClick={() => {
        setFilterCourse("");
        setFilterSearch("");
      }}
      style={{
        padding: "8px 14px",
        backgroundColor: "red",
        border: "1px solid #ccc",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold",
        color:"white"
      }}
    >
      Clear Filters
    </button>
  )}
</div>


      {loading && <Message>Loading...</Message>}
      {error && <Message>{error}</Message>}
      {!loading && !error && assignments.length === 0 && (
        <Message>No post found for your enrolled courses.</Message>
      )}

      {filteredAssignments.map((assignment) => (
        <AssignmentCard key={assignment.assignment_id}>
          <AssignmentTitle>{assignment.title}</AssignmentTitle>
          <AssignmentDescription><strong>Course:</strong> {getCourseInfo(assignment.course_id)}</AssignmentDescription>
          <AssignmentDescription><strong>Description:</strong> {assignment.description}</AssignmentDescription>
          <AssignmentDescription><strong>Created At:</strong> {assignment.created_at}</AssignmentDescription>
          
          {assignment.file_url && (
            <FileLink href={assignment.file_url} target="_blank" rel="noopener noreferrer">
              📥 Download File
            </FileLink>
          )}
        </AssignmentCard>
      ))}
    </Container>
  );
};

export default StudentAssignments;
