import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Context } from './Context';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

const Container = styled.div`
  padding: 40px;
  max-width: 600px;
  margin: auto;
  background: #fff;
  border-radius: 10px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #0a4d24;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  height: 100px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background: green;
  color: white;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: darkorange;
  }
`;

const LectureNotesList = styled.div`
  margin-top: 40px;
`;

const LectureNotesItem = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  margin-bottom: 15px;
  border-radius: 8px;
  background: #f9f9f9;
`;

const LectureNotesTitle = styled.h3`
  margin: 0;
`;

const LectureNotesMeta = styled.p`
  margin: 5px 0;
  font-size: 14px;
  color: #555;
`;

const FileLink = styled.a`
  color: blue;
  text-decoration: underline;
`;

const PostLectureNotes = () => {
  const { courses } = useContext(Context); // assuming lecturer is also stored
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const lecturerInfo = useSelector(state => state.lecturerInfo);
  const [lectureNotes, setLectureNotes] = useState([]);
  const lecturer = lecturerInfo;

  const handleSubmit = async () => {
    if (!selectedCourseId || !title || !description) {
      Swal.fire('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('course_id', selectedCourseId);
    formData.append('lecturer_id', lecturerInfo?.id); // use from context
    formData.append('title', title);
    formData.append('description', description);
    if (file) formData.append('file', file);

    try {
      Swal.fire({ text: "Uploading lecture note..." });
      Swal.showLoading();

      const res = await axios.post(
        'https://www.cwmsrfupre.com.ng/api/create_lecture_note.php',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (res.data.success) {
        Swal.fire('Success', 'Lecture note posted successfully.', 'success');
        setTitle('');
        setDescription('');
        setFile(null);
        setSelectedCourseId('');
        fetchLectureNotes();
      } else {
        Swal.fire('Failed', res.data.error || 'Failed to post lecture note.', 'error');
      }
    } catch (err) {
      Swal.fire('Error', 'An error occurred while posting the lecture note.', 'error');
      console.error(err);
    }
  };

  const fetchLectureNotes = async () => {
    if (!lecturer?.id) return;

    try {
      Swal.fire({ text: 'Loading lecture notes...' });
      Swal.showLoading();

      const res = await axios.get(
        'https://www.cwmsrfupre.com.ng/api/get_lecture_notes_by_lecturer_id.php',
        {
          params: {
            lecturer_id: lecturer.id,
            t: Date.now(), // 🔒 prevent browser caching
          }
        }
      );

      Swal.close();

      if (res.data.success) {
        setLectureNotes(res.data.lecture_notes);
        Swal.fire({icon:"success"})
      } else {
        Swal.fire('Error', res.data.error || 'Could not load lecture notes.', 'error');
      }
    } catch (err) {
      Swal.fire('Error', 'Something went wrong while loading lecture notes.', 'error');
      console.error(err);
    }
  };

 // Function to delete a lecture note
 const deleteLectureNote = async (lectureNoteId) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the lecture note and its file.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (!confirm.isConfirmed) return;

    try {
      Swal.fire({ text: 'Deleting lecture note...', didOpen: () => Swal.showLoading() });

      const res = await axios.post(
        'https://www.cwmsrfupre.com.ng/api/delete_lecture_note.php',
        { lecture_note_id: lectureNoteId },
        { headers: { 'Content-Type': 'application/json' } }
      );

      Swal.close();

      if (res.data.success) {
        Swal.fire('Deleted!', 'Lecture note has been deleted.', 'success');
        fetchLectureNotes(); // Refresh the list after deleting
      } else {
        Swal.fire('Error', res.data.error || 'Could not delete lecture note.', 'error');
      }
    } catch (err) {
      Swal.fire('Error', 'Something went wrong while deleting.', 'error');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLectureNotes();
  }, [lecturer]);

  return (
    <Container>
      <Title>Post Lecture Notes</Title>

      <Label>Select Course</Label>
      <Select value={selectedCourseId} onChange={e => setSelectedCourseId(e.target.value)}>
        <option value="">-- Select --</option>
        {courses.map(course => (
          <option key={course.id} value={course.id}>
            {course.code} - {course.title}
          </option>
        ))}
      </Select>

      <Label>Lecture Note Title</Label>
      <Input
        type="text"
        placeholder="e.g. Lecture Note 1"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <Label>Lecture Note Description</Label>
      <TextArea
        placeholder="Describe the lecture note content..."
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <Label>Optional File Upload</Label>
      <Input
        type="file"
        onChange={e => setFile(e.target.files[0])}
      />

      <Button onClick={handleSubmit}>Post Lecture Note</Button>

      <LectureNotesList>
        <h2>Your Posted Lecture Notes</h2>
        {lectureNotes.length === 0 ? (
          <p>No lecture notes found.</p>
        ) : (
          lectureNotes.map((note) => {
            const course = courses.find(c => c.id === Number(note.course_id));

            return (
              <LectureNotesItem key={note.id}>
                <LectureNotesTitle>{note.title}</LectureNotesTitle>
                <LectureNotesMeta>
                  <strong>Course:</strong>{' '}
                  {course ? `${course.code} - ${course.title}` : 'Course info not found'}
                  <br />
                  <strong>Date:</strong> {new Date(note.created_at).toLocaleString()}
                </LectureNotesMeta>
                <p><strong>Description: </strong>{note.description}</p>
                {note.file_url && (
                  <FileLink href={note.file_url} target="_blank" rel="noopener noreferrer">
                    Download Attached File
                  </FileLink>
                )}
                <Button
                  style={{ border: "1px solid green", backgroundColor: "white", color: "green", marginTop: '10px' }}
                  onClick={() => deleteLectureNote(note.id)}
                >
                  Delete Lecture Note
                </Button>
              </LectureNotesItem>
            );
          })
        )}
      </LectureNotesList>
    </Container>
  );
};

export default PostLectureNotes;

