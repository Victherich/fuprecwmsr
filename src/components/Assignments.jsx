// import React, { useState, useContext, useEffect } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';
// import { Context } from './Context';
// import Swal from 'sweetalert2';
// import { useSelector } from 'react-redux';
// import { FaPlus } from 'react-icons/fa';

// const Container = styled.div`
//   padding: 40px;
//   max-width: 600px;
//   margin: auto;
//   background: #fff;
//   border-radius: 10px;
// `;

// const Title = styled.h2`
//   text-align: center;
//   margin-bottom: 20px;
//   color: #0a4d24;
// `;

// const Label = styled.label`
//   font-weight: bold;
//   margin-bottom: 5px;
//   display: block;
// `;

// const Select = styled.select`
//   width: 100%;
//   padding: 10px;
//   margin-bottom: 20px;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   margin-bottom: 20px;
// `;

// const TextArea = styled.textarea`
//   width: 100%;
//   padding: 10px;
//   height: 100px;
//   margin-bottom: 20px;
// `;

// const Button = styled.button`
//   background: green;
//   color: white;
//   padding: 10px;
//   width: 100%;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background: darkorange;
//   }
// `;



// const AssignmentList = styled.div`
//   margin-top: 40px;
// `;

// const AssignmentItem = styled.div`
//   padding: 20px;
//   border: 1px solid #ddd;
//   margin-bottom: 15px;
//   border-radius: 8px;
//   background: #f9f9f9;
// `;

// const AssignmentTitle = styled.h3`
//   margin: 0;
// `;

// const AssignmentMeta = styled.p`
//   margin: 5px 0;
//   font-size: 14px;
//   color: #555;
// `;

// const FileLink = styled.a`
//   color: blue;
//   text-decoration: underline;
// `;

// const Button2 = styled.button`
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   gap: 10px;
//   background: linear-gradient(90deg, #0cc1e0, #119458);
//   color: white;
//   font-weight: 700;
//   font-size: 1rem;
//   padding: 12px 28px;
//   border: none;
//   border-radius: 50px;
//   cursor: pointer;
//   transition: all 0.3s ease;
//   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
//   // width:200px;

//   &:hover {
//     transform: translateY(-2px);
//     background: linear-gradient(90deg, #119458, #0cc1e0);
//     box-shadow: 0 6px 14px rgba(0, 0, 0, 0.25);
//   }

//   &:active {
//     transform: scale(0.97);
//   }
// `;

// const IconWrapper = styled.span`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: white;
//   color: #119458;
//   border-radius: 50%;
//   width: 28px;
//   height: 28px;
//   font-size: 0.9rem;
//   transition: all 0.3s ease;

//   ${Button}:hover & {
//     background: #0cc1e0;
//     color: white;
//   }
// `;



// const PostAssignment = () => {
//   const { courses} = useContext(Context); // assuming lecturer is also stored
//   const [selectedCourseId, setSelectedCourseId] = useState('');
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [file, setFile] = useState(null);
//   const adminInfo = useSelector(state=>state.adminInfo);
//   const [assignments, setAssignments]=useState([]);
//   const lecturer = adminInfo;
//   const [openForm, setOpenForm]=useState(false);

//   const handleSubmit = async () => {
//     if (!selectedCourseId || !title || !description) {
//       Swal.fire('Please fill in all required fields.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('course_id', selectedCourseId);
//     formData.append('lecturer_id', adminInfo?.id); // use from context
//     formData.append('title', title);
//     formData.append('description', description);
//     if (file) formData.append('file', file);

//     try {
//       Swal.fire({ text: "Uploading..." });
//       Swal.showLoading();

//       const res = await axios.post(
//         'https://www.cwmsrfupre.com.ng/api/create_assignment.php',
//         formData,
//         { headers: { 'Content-Type': 'multipart/form-data' } }
//       );

//       if (res.data.success) {
//         Swal.fire('Success', 'Posted successfully.', 'success');
//         setTitle('');
//         setDescription('');
//         setFile(null);
//         setSelectedCourseId('');
//         fetchAssignments();
//       } else {
//         Swal.fire('Failed', res.data.error || 'Failed to post.', 'error');
//       }
//     } catch (err) {
//       Swal.fire('Error', 'An error occurred while posting.', 'error');
//       console.error(err);
//     }
//   };


//   const fetchAssignments = async () => {
//     if (!lecturer?.id) return;

//     try {
//       Swal.fire({ text: 'Loading...' });
//       Swal.showLoading();

//       const res = await axios.get(
//         `https://www.cwmsrfupre.com.ng/api/get_assignments_by_lecturer_id.php`,
//         {
//           params: {
//             lecturer_id: lecturer.id,
//             t: Date.now(), // 🔒 prevent browser caching
//           }
//         }
//       );

//       Swal.close();

//       if (res.data.success) {
//         setAssignments(res.data.assignments);
//       } else {
//         Swal.fire('Error', res.data.error || 'Could not load.', 'error');
//       }
//     } catch (err) {
//       Swal.fire('Error', 'Something went wrong while loading.', 'error');
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchAssignments();
//   }, [lecturer]);



//   const deleteAssignment = async (assignmentId) => {
//     const confirm = await Swal.fire({
//       title: 'Are you sure?',
//       text: 'This will be permanently delete and its file.',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, delete it!',
//     });
  
//     if (!confirm.isConfirmed) return;
  
//     try {
//       Swal.fire({ text: 'Deleting...' });
//       Swal.showLoading();
  
//       const res = await axios.post(
//         'https://www.cwmsrfupre.com.ng/api/delete_assignment.php',
//         { assignment_id: assignmentId },
//         { headers: { 'Content-Type': 'application/json' } }
//       );
  
//       Swal.close();
  
//       if (res.data.success) {
//         Swal.fire('Deleted!', 'Deleted.', 'success');
//         fetchAssignments(); // Refresh the list
//       } else {
//         Swal.fire('Error', res.data.error || 'Could not delete.', 'error');
//       }
//     } catch (err) {
//       Swal.fire('Error', 'Something went wrong while deleting.', 'error');
//       console.error(err);
//     }
//   };
  


//   return (
//     <Container>
//    { openForm? <>
//        <Title>Post Assignments / Quizes / Exam papers / Lecture notes / Handouts</Title>

//       <Label>Select Course</Label>
//       <Select value={selectedCourseId} onChange={e => setSelectedCourseId(e.target.value)}>
//         <option value="">-- Select --</option>
//         {courses.map(course => (
//           <option key={course.id} value={course.id}>
//             {course.code} - {course.title}
//           </option>
//         ))}
//       </Select>

//       <Label>Title</Label>
//       <Input
//         type="text"
//         placeholder="e.g. Assignment 1"
//         value={title}
//         onChange={e => setTitle(e.target.value)}
//       />

//       <Label>Description</Label>
//       <TextArea
//         placeholder="Describe the assignment requirements..."
//         value={description}
//         onChange={e => setDescription(e.target.value)}
//       />

//       <Label>File Upload (pdf)</Label>
//    <Input
//   type="file"
//   accept="application/pdf"   // ✅ Only allow PDF files
//   onChange={e => setFile(e.target.files[0])}
// />

//       <Button onClick={handleSubmit}>Post </Button>

//       <Button style={{backgroundColor:"gray"}} onClick={()=>setOpenForm(false)}>Cancel </Button>
      
//       </>:
     
//       <AssignmentList>
//   <h2 style={{textAlign:"center", marginBottom:"20px"}}>Your Posted Assignments / Quizes / Exam papers / Lecture notes / Handouts</h2>
//  <Button2 onClick={() => setOpenForm(true)}>
//       <IconWrapper>
//         <FaPlus />
//       </IconWrapper>
//       New Post
//     </Button2>
//   {assignments.length === 0 ? (
//     <p>No post found.</p>
//   ) : (
//     assignments.map((assignment) => {
//       const course = courses.find(c => c.id === Number(assignment.course_id));
      
//       return (
//         <AssignmentItem key={assignment.id}>
//           <AssignmentTitle>{assignment.title}</AssignmentTitle>
//           <AssignmentMeta>
//             <strong>Course:</strong>{' '}
//             {course ? `${course.code} - ${course.title}` : 'Course info not found'}
//             <br />
//             <strong>Date:</strong> {new Date(assignment.created_at).toLocaleString()}
//           </AssignmentMeta>
//           <p><strong>Description: </strong>{assignment.description}</p>
//           {assignment.file_url && (
//             <FileLink href={assignment.file_url} target="_blank" rel="noopener noreferrer">
//               Download Attached File
//             </FileLink>
//           )}
//           <Button
//   style={{ border:"1px solid green",backgroundColor:"white",color:"green", marginTop: '10px' }}
//   onClick={() => deleteAssignment(assignment.id)}
// >
//   Delete 
// </Button>

//         </AssignmentItem>
//       );
//     })
//   )}
// </AssignmentList>}



//     </Container>
//   );
// };

// export default PostAssignment;




import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Context } from "./Context";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { FaPlus, FaTimes } from "react-icons/fa";

const Container = styled.div`
  padding: 40px;
  max-width: 900px;
  margin: auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  position: relative;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 25px;
  color: green;
  font-weight: 800;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
  color:green;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 6px;
  border: 1px solid #ccc;
  outline: none;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 6px;
  border: 1px solid #ccc;
  outline: none;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  height: 100px;
  margin-bottom: 20px;
  border-radius: 6px;
  border: 1px solid #ccc;
  outline: none;
`;

const Button = styled.button`
  background: green;
  color: white;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;

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
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
`;

const AssignmentTitle = styled.h3`
  margin: 0;
  color: #0a4d24;
`;

const AssignmentMeta = styled.p`
  margin: 5px 0;
  font-size: 14px;
  color: #555;
`;

const FileLink = styled.a`
  color: #0077b6;
  text-decoration: underline;
  font-weight: 500;

  &:hover {
    color: #0cc1e0;
  }
`;

const NewPostButton = styled.button`
  position: fixed;
  bottom: 60px;
  right: 10px;
  padding:10px;
  // width: 150px;
  // height: 60px;
  border-radius: 20px;
  border: none;
  background: linear-gradient(90deg, #0cc0e0ff, #119459ff);
  // background:green;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  // z-index: 300;
  text-align:center;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;

  &:hover {
    transform: translateY(-2px);
    background: linear-gradient(90deg, #119458, #0cc1e0);
  }

  &:active {
    transform: scale(0.97);
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  color: #119458;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  ${NewPostButton}:hover & {
    background: #0cc1e0;
    color: white;
  }
`;

/* ---------- MODAL ---------- */
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 300;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #333;
  font-size: 1.4rem;
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    color: red;
  }
`;

const PostAssignment = () => {
  const { courses } = useContext(Context);
  const lecturer = useSelector((state) => state.lecturerInfo);
  const [assignments, setAssignments] = useState([]);
  // const lecturer = adminInfo;
  const [openForm, setOpenForm] = useState(false);

  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async () => {
    if (!selectedCourseId || !title || !description) {
      Swal.fire("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("course_id", selectedCourseId);
    formData.append("lecturer_id", lecturer?.id);
    formData.append("title", title);
    formData.append("description", description);
    if (file) formData.append("file", file);

    try {
      Swal.fire({ text: "Uploading..." });
      Swal.showLoading();

      const res = await axios.post(
        "https://www.cwmsrfupre.com.ng/api/create_assignment.php",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        Swal.fire("Success", "Posted successfully.", "success");
        setTitle("");
        setDescription("");
        setFile(null);
        setSelectedCourseId("");
        setOpenForm(false);
        fetchAssignments();
      } else {
        Swal.fire("Failed", res.data.error || "Failed to post.", "error");
      }
    } catch (err) {
      Swal.fire("Error", "An error occurred while posting.", "error");
      console.error(err);
    }
  };

  const fetchAssignments = async () => {
    if (!lecturer?.id) return;

    try {
      const res = await axios.get(
        `https://www.cwmsrfupre.com.ng/api/get_assignments_by_lecturer_id.php`,
        { params: { lecturer_id: lecturer.id, t: Date.now() } }
      );

      if (res.data.success) setAssignments(res.data.assignments);
      else Swal.fire("Error", res.data.error || "Could not load.", "error");
    } catch (err) {
      Swal.fire("Error", "Something went wrong while loading.", "error");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [lecturer]);

  const deleteAssignment = async (assignmentId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete this post and its file.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      Swal.fire({ text: "Deleting..." });
      Swal.showLoading();

      const res = await axios.post(
        "https://www.cwmsrfupre.com.ng/api/delete_assignment.php",
        { assignment_id: assignmentId },
        { headers: { "Content-Type": "application/json" } }
      );

      Swal.close();

      if (res.data.success) {
        Swal.fire("Deleted!", "Post deleted.", "success");
        fetchAssignments();
      } else {
        Swal.fire("Error", res.data.error || "Could not delete.", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong while deleting.", "error");
      console.error(err);
    }
  };

  return (
    <Container>
      <AssignmentList>
        <h2 style={{ textAlign: "center", marginBottom: "25px", color:"green" }}>
          Your Posted Assignments / Quizes / Exam papers / Lecture notes / Handouts
        </h2>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <NewPostButton onClick={() => setOpenForm(true)}>
            <IconWrapper>
              <FaPlus />
            </IconWrapper>
            New Post
          </NewPostButton>
        </div>

        {assignments.length === 0 ? (
          <p style={{ textAlign: "center" }}>No posts found.</p>
        ) : (
          assignments.map((assignment) => {
            const course = courses.find(
              (c) => c.id === Number(assignment.course_id)
            );

            return (
              <AssignmentItem key={assignment.id}>
                <AssignmentTitle>{assignment.title}</AssignmentTitle>
                <AssignmentMeta>
                  <strong>Course:</strong>{" "}
                  {course
                    ? `${course.code} - ${course.title}`
                    : "Course info not found"}
                  <br />
                  <strong>Date:</strong>{" "}
                  {new Date(assignment.created_at).toLocaleString()}
                </AssignmentMeta>
                <p>
                  <strong>Description: </strong>
                  {assignment.description}
                </p>
                {assignment.file_url && (
                  <FileLink
                    href={assignment.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download Attached File
                  </FileLink>
                )}
                <Button
                  style={{
                    border: "1px solid green",
                    backgroundColor: "white",
                    color: "green",
                    marginTop: "10px",
                  }}
                  onClick={() => deleteAssignment(assignment.id)}
                >
                  Delete
                </Button>
              </AssignmentItem>
            );
          })
        )}
      </AssignmentList>

      {/* MODAL */}
      {openForm && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={() => setOpenForm(false)}>
              <FaTimes />
            </CloseButton>

            <Title>New Post</Title>

            <Label>Select Course</Label>
            <Select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
            >
              <option value="">-- Select --</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.code} - {course.title}
                </option>
              ))}
            </Select>

            <Label>Title</Label>
            <Input
              type="text"
              placeholder="e.g. Assignment 1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Label>Description</Label>
            <TextArea
              placeholder="Write a description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Label>Upload File (PDF only)</Label>
            <Input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <Button onClick={handleSubmit}>Submit Post</Button>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default PostAssignment;
