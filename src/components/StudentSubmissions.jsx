import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { FaPlus, FaTimes } from "react-icons/fa";
import { Context } from "./Context"; // Assumes you have Context providing `courses` and `categories`
// ---------- MODERNIZED STYLED COMPONENTS ----------
const Container = styled.div`
  padding: 10px;
  max-width: 900px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid rgba(0, 128, 0, 0.1);
  box-shadow: 0 4px 20px rgba(0, 128, 0, 0.04);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 10px;
  color: #119458;
  font-weight: 800;
  font-size: 1.5rem;
  letter-spacing: -0.5px;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 4px;
  display: block;
  color: #119458;
  font-size: 0.9rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  border: 1.5px solid #e2e8f0;
  background-color: #f8fafc;
  color: #1e293b;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: #119458;
    background-color: #fff;
    box-shadow: 0 0 0 3px rgba(17, 148, 88, 0.1);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  border: 1.5px solid #e2e8f0;
  background-color: #f8fafc;
  color: #1e293b;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: #119458;
    background-color: #fff;
    box-shadow: 0 0 0 3px rgba(17, 148, 88, 0.1);
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #119458 0%, #0e7a46 100%);
  color: white;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  box-shadow: 0 4px 12px rgba(17, 148, 88, 0.2);
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.25);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SubmissionList = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SubmissionItem = styled.div`
  padding: 10px;
  border: 1px solid #e2e8f0;
  margin-bottom: 0px; /* Managed by list gap */
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    border-color: #119458;
    transform: translateY(-1px);
  }
`;

const SubmissionTitle = styled.h3`
  margin: 0 0 4px 0;
  color: #0a4d24;
  font-size: 1.05rem;
  font-weight: 700;
`;

const SubmissionMeta = styled.p`
  margin: 4px 0;
  font-size: 0.85rem;
  color: #555;
  line-height: 1.4;
`;

const FileLink = styled.a`
  color: #0077b6;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: color 0.2s ease;

  &:hover {
    color: #0cc1e0;
    text-decoration: underline;
  }
`;

const NewPostButton = styled.button`
  position: fixed;
  bottom: 55px;
  right: 10px;
  padding: 8px 10px;
  border-radius: 16px;
  border: none;
  background: linear-gradient(135deg, #0cc0e0ff 0%, #119459ff 100%);
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 0 6px 16px rgba(17, 148, 88, 0.25);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 4px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(12, 192, 224, 0.35);
  }

  &:active {
    transform: scale(0.96);
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  font-size: 0.85rem;
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;

  ${NewPostButton}:hover & {
    background: #ffffff;
    color: #119458;
  }
`;

/* ---------- MODAL ---------- */
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 300;
  padding: 10px;
`;

const ModalContent = styled.div`
  background: #ffffff;
  padding: 10px;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CloseButton = styled.button`
  background: #f1f5f9;
  border: none;
  color: #475569;
  font-size: 1.1rem;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: #fee2e2;
    color: #ef4444;
  }
`;

// ============= MAIN COMPONENT =============
const StudentSubmissions = () => {
  const { courses, categories, api_url, semesters} = useContext(Context);
  const studentInfo = useSelector((state) => state.studentInfo);
  const [submissions, setSubmissions] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [file, setFile] = useState(null);
    const [lecturer, setLecturer]=useState([]);

    const [filterCourse, setFilterCourse] = useState("");
const [filterCategory, setFilterCategory] = useState("");
const [filterStatus, setFilterStatus] = useState("");
const [filterSearch, setFilterSearch] = useState("");
const [selectedSemester, setSelectedSemester]=useState(null)


    console.log(submissions)



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
  formData.append("semester_id", studentInfo.selected_semester);
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
      `${api_url}/create_student_submission.php`,
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
    if (!studentInfo?.id||!studentInfo?.selected_semester) return;

    try {
      const res = await axios.get(
        `${api_url}/get_student_submissions.php`,
        { params: { student_id: studentInfo.id, semester_id:studentInfo.selected_semester, t: Date.now() } }
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
        `${api_url}/get_lecturer_by_id.php?id=${id}`
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




// ---------- UPDATE SUBMISSION SEMESTER ----------
  const updateSubmissionSemester = async (submissionId, newSemesterId) => {
    if (!studentInfo?.id) return;

    try {
      const res = await axios.post(
        `${api_url}/update_submission_semester.php`,
        {
          submission_id: submissionId,
          student_id: studentInfo.id,
          new_semester_id: newSemesterId
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if (res.data.success) {
        Swal.fire("Success", res.data.message || "Semester updated successfully.", "success");
        // Refresh the submissions list automatically
        fetchSubmissions();
      } else {
        Swal.fire("Error", res.data.error || "Could not update submission semester.");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong while updating.", "error");
      console.error(err);
    }
  };





const filteredSubmissions = submissions.filter((sub) => {
  const matchesCourse =
    !filterCourse || String(sub.course_id) === String(filterCourse);

  const matchesCategory =
    !filterCategory || String(sub.category_id) === String(filterCategory);

  const matchesStatus =
    !filterStatus ||
    (filterStatus === "marked" && sub.score !== null) ||
    (filterStatus === "unmarked" && sub.score === null);

  const course = courses.find((c) => c.id === Number(sub.course_id));
  const category = categories.find((c) => c.id === Number(sub.category_id));
  const lecturerName = lecturer[sub.marked_by] || "";

  const matchesSearch =
    !filterSearch ||
    course?.title?.toLowerCase().includes(filterSearch.toLowerCase()) ||
    course?.code?.toLowerCase().includes(filterSearch.toLowerCase()) ||
    category?.name?.toLowerCase().includes(filterSearch.toLowerCase()) ||
    lecturerName.toLowerCase().includes(filterSearch.toLowerCase());

  return (
    matchesCourse &&
    matchesCategory &&
    matchesStatus &&
    matchesSearch
  );
});



  // ---------- RENDER ----------
  return (
    <Container>
      <Title>Your Submissions2</Title>

<div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "24px",
    padding: "14px",
    background: "#fafafa",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    alignItems: "center",
  }}
>
  {/* Course Filter */}
  <select
    value={filterCourse}
    onChange={(e) => setFilterCourse(e.target.value)}
    style={selectStyle}
  >
    <option value="">All Courses</option>
    {courses.map((c) => (
      <option key={c.id} value={c.id}>
        {c.code} - {c.title}
      </option>
    ))}
  </select>

  {/* Category Filter */}
  <select
    value={filterCategory}
    onChange={(e) => setFilterCategory(e.target.value)}
    style={selectStyle}
  >
    <option value="">All Categories</option>
    {categories.map((cat) => (
      <option key={cat.id} value={cat.id}>
        {cat.name}
      </option>
    ))}
  </select>

  {/* Status Filter */}
  <select
    value={filterStatus}
    onChange={(e) => setFilterStatus(e.target.value)}
    style={selectStyle}
  >
    <option value="">All Status</option>
    <option value="marked">Marked</option>
    <option value="unmarked">Not Marked</option>
  </select>

  {/* Search */}
  <input
    type="text"
    placeholder="Search course, category, or lecturer..."
    value={filterSearch}
    onChange={(e) => setFilterSearch(e.target.value)}
    style={inputStyle}
  />

  {/* Clear Filters */}
  {(filterCourse || filterCategory || filterStatus || filterSearch) && (
    <button
      onClick={() => {
        setFilterCourse("");
        setFilterCategory("");
        setFilterStatus("");
        setFilterSearch("");
      }}
      style={clearButtonStyle}
    >
      Clear Filters
    </button>
  )}
</div>



      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <NewPostButton onClick={() => setOpenForm(true)}>
          <IconWrapper>
            <FaPlus />
          </IconWrapper>
          Submit Assignment
        </NewPostButton>
      </div>

      <SubmissionList>
        {submissions.length === 0 ? (
          <p style={{ textAlign: "center" }}>No submissions found.</p>
        ) : (
          filteredSubmissions.map((sub) => {
            const course = courses.find(
              (c) => c.id === Number(sub.course_id)
            );
            const category = categories.find(
              (cat) => cat.id === Number(sub.category_id)
            );

            return (
              <SubmissionItem key={sub.id}>
                <SubmissionTitle>
                  {category ? category.name : "Submission"} {sub.exam_type?<span>- ({sub.exam_type})</span>:""}
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
                  {/* <strong>Score:</strong> {sub.score?sub.score:"Not marked"} */}
                 
                {/* <br/> */}
            {sub.marked_by==0?<><strong>Marked by: </strong> System</>
            :
            <><strong>Marked by:</strong>{" "}
            {lecturer[sub?.marked_by] || "Not marked..."}</>}
      

                </SubmissionMeta>
                {sub.file_path && (
                  <FileLink
                    href={`${api_url}/${sub.file_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Uploaded File
                  </FileLink>
                )}
                {/* <select
                style={{width:"100%"}}
                onChange={(e)=>setSelectedSemester(e.target.value)}>
              
                  {semesters.map((semester)=>(
                    <option value={semester.id}>{semester.name}</option>
                  ))}
                </select>
                <button >Update Semester</button> */}
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

            <Title>Submit Assignment</Title>

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
              {categories.slice(0,1).map((cat) => (
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


const selectStyle = {
  padding: "8px 10px",
  minWidth: "180px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  background: "#fff",
  fontSize: "14px",
  outline: "none",
};

const inputStyle = {
  padding: "8px 10px",
  minWidth: "220px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px",
  outline: "none",
};

const clearButtonStyle = {
  padding: "8px 14px",
  borderRadius: "6px",
  border: "1px solid #bfc7bf",
  background: "red",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  color: "white",
  transition: "all 0.2s ease",
};
