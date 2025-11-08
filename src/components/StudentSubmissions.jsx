import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { FaPlus, FaTimes } from "react-icons/fa";
import { Context } from "./Context"; // Assumes you have Context providing `courses` and `categories`

// ---------- STYLED COMPONENTS ----------
const Container = styled.div`
  padding: 40px;
  max-width: 900px;
  margin: auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
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
  color: green;
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

const SubmissionList = styled.div`
  margin-top: 40px;
`;

const SubmissionItem = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  margin-bottom: 15px;
  border-radius: 8px;
  background: #f9f9f9;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
`;

const SubmissionTitle = styled.h3`
  margin: 0;
  color: #0a4d24;
`;

const SubmissionMeta = styled.p`
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
  padding: 10px;
  border-radius: 20px;
  border: none;
  background: linear-gradient(90deg, #0cc0e0ff, #119459ff);
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

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

// ============= MAIN COMPONENT =============
const StudentSubmissions = () => {
  const { courses, categories } = useContext(Context);
  const studentInfo = useSelector((state) => state.studentInfo);
  const [submissions, setSubmissions] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [file, setFile] = useState(null);
    const [lecturer, setLecturer]=useState([])

    console.log(submissions)

  // ---------- SUBMIT HANDLER ----------
  // const handleSubmit = async () => {
  //   if (!selectedCourseId || !selectedCategory || !file) {
  //     Swal.fire("Please fill in all required fields and attach a file.");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("student_id", studentInfo.id);
  //   formData.append("course_id", selectedCourseId);
  //   formData.append("category", selectedCategory);
  //   formData.append("file", file);

  //   try {
  //     Swal.fire({ text: "Uploading..." });
  //     Swal.showLoading();

  //     const res = await axios.post(
  //       "https://www.cwmsrfupre.com.ng/api/create_student_submission.php",
  //       formData,
  //       { headers: { "Content-Type": "multipart/form-data" } }
  //     );

  //     Swal.close();

  //     if (res.data.success) {
  //       Swal.fire("Success", "Submission uploaded successfully!", "success");
  //       setFile(null);
  //       setSelectedCourseId("");
  //       setSelectedCategory("");
  //       setOpenForm(false);
  //       fetchSubmissions();
  //     } else {
  //       Swal.fire("Failed", res.data.error || "Submission failed.", "error");
  //     }
  //   } catch (err) {
  //     Swal.fire("Error", "An error occurred while uploading.", "error");
  //     console.error(err);
  //   }
  // };


  const handleSubmit = async () => {
  if (!selectedCourseId || !selectedCategory || !file) {
    Swal.fire({
      icon: "warning",
      title: "Incomplete fields",
      text: "Please fill in all required fields and attach a file before submitting.",
    });
    return;
  }

  // ⚠️ Step 1 — Ask for confirmation before proceeding
  const confirm = await Swal.fire({
    title: "Are you sure you want to submit?",
    text: "Once you submit, you cannot unsubmit. Please make sure everything is correct.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#2ecc71",
    cancelButtonColor: "#aaa",
    confirmButtonText: "Yes, submit",
    cancelButtonText: "Cancel",
  });

  if (!confirm.isConfirmed) return; // stop if cancelled

  // 📤 Step 2 — Proceed with upload
  const formData = new FormData();
  formData.append("student_id", studentInfo.id);
  formData.append("course_id", selectedCourseId);
  formData.append("category", selectedCategory);
  formData.append("file", file);

  try {
    // 🔄 Show loading state
    Swal.fire({
      title: "Uploading your submission...",
      text: "Please wait while your file is being uploaded.",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const res = await axios.post(
      "https://www.cwmsrfupre.com.ng/api/create_student_submission.php",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    Swal.close();

    // ✅ Success response
    if (res.data.success) {
      Swal.fire({
        icon: "success",
        title: "Submission Successful!",
        text: "Your submission has been uploaded successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      // Reset form and refresh data
      setFile(null);
      setSelectedCourseId("");
      setSelectedCategory("");
      setOpenForm(false);
      fetchSubmissions();
    } else {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: res.data.error || "An error occurred while submitting.",
      });
    }
  } catch (err) {
    Swal.close();
    Swal.fire({
      icon: "error",
      title: "Network Error",
      text: "An error occurred while uploading. Please try again.",
    });
    console.error(err);
  }
};




  // ---------- FETCH SUBMISSIONS ----------
  const fetchSubmissions = async () => {
    if (!studentInfo?.id) return;

    try {
      const res = await axios.get(
        "https://www.cwmsrfupre.com.ng/api/get_student_submissions.php",
        { params: { student_id: studentInfo.id, t: Date.now() } }
      );

      if (res.data.success) setSubmissions(res.data.submissions);
      else Swal.fire("Error", res.data.error || "Could not load submissions.");
    } catch (err) {
      Swal.fire("Error", "Something went wrong while loading.", "error");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [studentInfo]);




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



  // ---------- RENDER ----------
  return (
    <Container>
      <Title>Your Submissions</Title>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <NewPostButton onClick={() => setOpenForm(true)}>
          <IconWrapper>
            <FaPlus />
          </IconWrapper>
          New Submission
        </NewPostButton>
      </div>

      <SubmissionList>
        {submissions.length === 0 ? (
          <p style={{ textAlign: "center" }}>No submissions found.</p>
        ) : (
          submissions.map((sub) => {
            const course = courses.find(
              (c) => c.id === Number(sub.course_id)
            );
            const category = categories.find(
              (cat) => cat.id === Number(sub.category_id)
            );

            return (
              <SubmissionItem key={sub.id}>
                <SubmissionTitle>
                  {category ? category.name : "Submission"}
                </SubmissionTitle>
                <SubmissionMeta>
                  <strong>Course:</strong>{" "}
                  {course
                    ? `${course.code} - ${course.title}`
                    : "Course not found"}
                  <br />
                  <strong>Date:</strong>{" "}
                  {new Date(sub.created_at).toLocaleString()}
                    <br/>
                  <strong>Score:</strong> {sub.score?sub.score:"Not marked"}
                 
                <br/>
            <strong>Marked by:</strong>{" "}
            {lecturer[sub?.marked_by] || "Not marked..."}
      

                </SubmissionMeta>
                {sub.file_path && (
                  <FileLink
                    href={`https://www.cwmsrfupre.com.ng/api/${sub.file_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Uploaded File
                  </FileLink>
                )}
              </SubmissionItem>
            );
          })
        )}
      </SubmissionList>

      {/* ---------- MODAL FORM ---------- */}
      {openForm && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={() => setOpenForm(false)}>
              <FaTimes />
            </CloseButton>

            <Title>New Submission</Title>

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

            <Label>Select Category</Label>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">-- Select --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Select>

            <Label>Upload File (PDF only)</Label>
            <Input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <Button onClick={handleSubmit}>Submit</Button>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default StudentSubmissions;
