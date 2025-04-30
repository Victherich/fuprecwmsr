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



const AssignmentList = styled.div`
  margin-top: 40px;
`;

const AssignmentItem = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  margin-bottom: 15px;
  border-radius: 8px;
  background: #f9f9f9;
`;

const AssignmentTitle = styled.h3`
  margin: 0;
`;

const AssignmentMeta = styled.p`
  margin: 5px 0;
  font-size: 14px;
  color: #555;
`;

const FileLink = styled.a`
  color: blue;
  text-decoration: underline;
`;





const PostAssignment = () => {
  const { courses} = useContext(Context); // assuming lecturer is also stored
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const adminInfo = useSelector(state=>state.adminInfo);
  const [assignments, setAssignments]=useState([]);
  const lecturer = adminInfo;

  const handleSubmit = async () => {
    if (!selectedCourseId || !title || !description) {
      Swal.fire('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('course_id', selectedCourseId);
    formData.append('lecturer_id', adminInfo?.id); // use from context
    formData.append('title', title);
    formData.append('description', description);
    if (file) formData.append('file', file);

    try {
      Swal.fire({ text: "Uploading assignment..." });
      Swal.showLoading();

      const res = await axios.post(
        'https://www.cwmsrfupre.com.ng/api/create_assignment.php',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (res.data.success) {
        Swal.fire('Success', 'Assignment posted successfully.', 'success');
        setTitle('');
        setDescription('');
        setFile(null);
        setSelectedCourseId('');
        fetchAssignments();
      } else {
        Swal.fire('Failed', res.data.error || 'Failed to post assignment.', 'error');
      }
    } catch (err) {
      Swal.fire('Error', 'An error occurred while posting the assignment.', 'error');
      console.error(err);
    }
  };


  const fetchAssignments = async () => {
    if (!lecturer?.id) return;

    try {
      Swal.fire({ text: 'Loading assignments...' });
      Swal.showLoading();

      const res = await axios.get(
        `https://www.cwmsrfupre.com.ng/api/get_assignments_by_lecturer_id.php`,
        {
          params: {
            lecturer_id: lecturer.id,
            t: Date.now(), // 🔒 prevent browser caching
          }
        }
      );

      Swal.close();

      if (res.data.success) {
        setAssignments(res.data.assignments);
      } else {
        Swal.fire('Error', res.data.error || 'Could not load assignments.', 'error');
      }
    } catch (err) {
      Swal.fire('Error', 'Something went wrong while loading assignments.', 'error');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [lecturer]);



  const deleteAssignment = async (assignmentId) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the assignment and its file.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });
  
    if (!confirm.isConfirmed) return;
  
    try {
      Swal.fire({ text: 'Deleting assignment...' });
      Swal.showLoading();
  
      const res = await axios.post(
        'https://www.cwmsrfupre.com.ng/api/delete_assignment.php',
        { assignment_id: assignmentId },
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      Swal.close();
  
      if (res.data.success) {
        Swal.fire('Deleted!', 'Assignment has been deleted.', 'success');
        fetchAssignments(); // Refresh the list
      } else {
        Swal.fire('Error', res.data.error || 'Could not delete assignment.', 'error');
      }
    } catch (err) {
      Swal.fire('Error', 'Something went wrong while deleting.', 'error');
      console.error(err);
    }
  };
  


  return (
    <Container>
      <Title>Post an Assignment</Title>

      <Label>Select Course</Label>
      <Select value={selectedCourseId} onChange={e => setSelectedCourseId(e.target.value)}>
        <option value="">-- Select --</option>
        {courses.map(course => (
          <option key={course.id} value={course.id}>
            {course.code} - {course.title}
          </option>
        ))}
      </Select>

      <Label>Assignment Title</Label>
      <Input
        type="text"
        placeholder="e.g. Assignment 1"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <Label>Assignment Description</Label>
      <TextArea
        placeholder="Describe the assignment requirements..."
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <Label>Optional File Upload</Label>
      <Input
        type="file"
        onChange={e => setFile(e.target.files[0])}
      />

      <Button onClick={handleSubmit}>Post Assignment</Button>



      <AssignmentList>
  <h2>Your Posted Assignments</h2>
  {assignments.length === 0 ? (
    <p>No assignments found.</p>
  ) : (
    assignments.map((assignment) => {
      const course = courses.find(c => c.id === Number(assignment.course_id));
      
      return (
        <AssignmentItem key={assignment.id}>
          <AssignmentTitle>{assignment.title}</AssignmentTitle>
          <AssignmentMeta>
            <strong>Course:</strong>{' '}
            {course ? `${course.code} - ${course.title}` : 'Course info not found'}
            <br />
            <strong>Date:</strong> {new Date(assignment.created_at).toLocaleString()}
          </AssignmentMeta>
          <p><strong>Description: </strong>{assignment.description}</p>
          {assignment.file_url && (
            <FileLink href={assignment.file_url} target="_blank" rel="noopener noreferrer">
              Download Attached File
            </FileLink>
          )}
          <Button
  style={{ border:"1px solid green",backgroundColor:"white",color:"green", marginTop: '10px' }}
  onClick={() => deleteAssignment(assignment.id)}
>
  Delete Assignment
</Button>

        </AssignmentItem>
      );
    })
  )}
</AssignmentList>



    </Container>
  );
};

export default PostAssignment;

