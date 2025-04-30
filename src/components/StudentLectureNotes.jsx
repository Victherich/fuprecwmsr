
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
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
  color: #2c3e50;
  margin-bottom: 30px;
`;

const NoteCard = styled.div`
  background: #f9f9f9;
  border-left: 6px solid #27ae60;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 8px;
`;

const NoteTitle = styled.h3`
  margin: 0 0 10px;
  color: #34495e;
`;

const NoteDescription = styled.p`
  color: #555;
`;

const FileLink = styled.a`
  display: inline-block;
  margin-top: 10px;
  color: #27ae60;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const Message = styled.p`
  text-align: center;
  color: #888;
`;

// Component
const StudentLectureNotes = ({ studentId }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {courses}=useContext(Context);

  useEffect(() => {
    if (!studentId) {
      setError("No student ID provided.");
      setLoading(false);
      return;
    }

    const fetchNotes = async () => {
      try {
        const res = await axios.get(
          `https://www.cwmsrfupre.com.ng/api/get_lecture_notes_for_student.php?student_id=${studentId}`
        );

        if (res.data.success) {
          setNotes(res.data.lecture_notes);
        } else {
          setError(res.data.error || "Could not fetch lecture notes.");
        }
      } catch (err) {
        setError("An error occurred while fetching lecture notes.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [studentId]);



  const getCourseInfo = (courseId) => {
    const course = courses.find(c => c.id === parseInt(courseId));
    return course ? `${course.code} - ${course.title}` : `Course ID: ${courseId}`;
  };



  return (
    <Container>
      <Title>Your Lecture Notes</Title>

      {loading && <Message>Loading notes...</Message>}
      {error && <Message>{error}</Message>}
      {!loading && !error && notes.length === 0 && (
        <Message>No lecture notes found for your courses.</Message>
      )}

      {notes.map((note) => (
        <NoteCard key={note.note_id}>
          <NoteTitle>{note.title}</NoteTitle>
          <NoteDescription><strong>Course:</strong> {getCourseInfo(note.course_id)}</NoteDescription>
          <NoteDescription><strong>Description:</strong> {note.description}</NoteDescription>
          <NoteDescription><strong>Created At:</strong> {note.created_at}</NoteDescription>
          {note.file_url && (
            <FileLink href={note.file_url} target="_blank" rel="noopener noreferrer">
              📥 Download Note
            </FileLink>
          )}
        </NoteCard>
      ))}
    </Container>
  );
};

export default StudentLectureNotes;
