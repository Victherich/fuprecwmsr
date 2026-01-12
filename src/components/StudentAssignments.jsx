
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useContext } from 'react';
import { Context } from './Context';

// Styled Components
const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: green;
  margin-bottom: 30px;
`;

const AssignmentCard = styled.div`
  background: #f7f7f7;
  border-left: 6px solid orange;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 8px;
`;

const AssignmentTitle = styled.h3`
  margin: 0 0 10px;
  color: #2c3e50;
`;

const AssignmentDescription = styled.p`
  color: #555;
`;

const FileLink = styled.a`
  display: inline-block;
  margin-top: 10px;
  color: #3498db;
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

// Main Component
const StudentAssignments = ({ studentId }) => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {courses}=useContext(Context);
  const [filterCourse, setFilterCourse] = useState("");
const [filterSearch, setFilterSearch] = useState("");


  // useEffect(() => {
  //   if (!studentId) {
  //     setError("No student ID provided.");
  //     setLoading(false);
  //     return;
  //   }

  //   const fetchAssignments = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://www.cwmsrfupre.com.ng/api/get_assignments_for_student.php?student_id=${studentId}`
  //       );

  //       if (response.data.success) {
  //         setAssignments(response.data.assignments);
  //         console.log(response.data.assignments)
          
  //       } else {
  //         setError(response.data.error || "Failed to fetch posts.");
  //         console.log(response.data)
  //       }
  //     } catch (err) {
  //       setError("An error occurred while fetching post.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchAssignments();
  // }, [studentId]);

useEffect(() => {
  if (!studentId) {
    setError("No student ID provided.");
    setLoading(false);
    return;
  }

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(
        `https://www.cwmsrfupre.com.ng/api/get_assignments_for_student.php?student_id=${studentId}`
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

  // Run immediately on mount
  fetchAssignments();

  // Run every 5 seconds
  const interval = setInterval(() => {
    fetchAssignments();
  }, 5000);

  // Cleanup on unmount
  return () => clearInterval(interval);

}, [studentId]);



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
