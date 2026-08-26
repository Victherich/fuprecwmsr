





import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import styled from "styled-components";
import { Context } from "./Context";

// ---------- Styled Components ----------
const Container = styled.div`
  padding: 40px;
  max-width: 600px;
  margin: auto;
  background-color: white;
  border-radius: 10px;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #0a4d24;
`;

const Description = styled.p`
  margin-bottom: 30px;
  font-size: 16px;
  color: #444;
  text-align: center;
`;

const Button = styled.button`
  background-color: green;
  color: white;
  font-size: 16px;
  padding: 12px;
  width: 100%;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease-in;

  &:hover {
    background-color: darkorange;
  }
`;

const EnrolledCoursesSection = styled.div`
  margin-top: 40px;
`;

const Card = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  background: #f9f9f9;
`;

const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const CardLabel = styled.span`
  font-weight: bold;
  color: #555;
`;

const CardValue = styled.span`
  color: #222;
`;

// Modal Styles
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 300;
`;

const Modal = styled.div`
  background: white;
  padding: 30px 40px;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  position: relative;
  animation: fadeIn 0.25s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 14px;
  background: none;
  border: none;
  font-size: 22px;
  color: #777;
  cursor: pointer;

  &:hover {
    color: #000;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
  color: #333;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 14px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
`;


const ClearButton = styled.button`
  background: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s ease;
  margin-bottom: 20px;

  &:hover {
    background: #c0392b;
  }
`;


// ---------- Component ----------
const EnrollLecturerPage = ({ lecturerId }) => {
  const { levels, semesters, courses, api_url } = useContext(Context);
  const [lecturer, setLecturer] = useState({});
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("NA");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!lecturerId) return;

    axios
      .get(`${api_url}/get_lecturer_by_id.php?id=${lecturerId}`)
      .then((res) => {
        if (res.data.success) setLecturer(res.data.lecturer);
      })
      .catch(() => {
        Swal.fire("Error", "Failed to fetch lecturer details.", "error");
      });
  }, [lecturerId]);

  const fetchAssignedCourses = () => {
    axios
      .get(
        `${api_url}/get_lecturer_enrolled_courses.php?lecturer_id=${lecturerId}`
      )
      .then((res) => {
        if (res.data.success) {
          setAssignedCourses(res.data.enrollments);
        } else {
          setAssignedCourses([]);
        }
      });
  };

  useEffect(() => {
    if (lecturerId) fetchAssignedCourses();
  }, [lecturer]);

  const filteredCourses = courses.filter(
    (c) => c.level_id == selectedLevel && c.semester_id == selectedSemester
  );

  const handleAssign = async () => {
    if (!selectedCourse)
      return Swal.fire("Error", "Please select a course.", "error");

    try {
      Swal.fire({
        title: "Assigning...",
        didOpen: () => Swal.showLoading(),
      });

      const res = await axios.post(
        `${api_url}/lecturer_enroll_course.php`,
        {
          lecturer_id: lecturerId,
          course_id: selectedCourse,
        }
      );

      if (res.data.success) {
        Swal.fire("Success", res.data.message, "success");
        fetchAssignedCourses();
        setShowModal(false);
      } else {
        Swal.fire("Error", res.data.error, "error");
      }
    } catch {
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };







// deleteEnrollment function
const deleteEnrollment = async (enrollmentId) => {
  // Step 1️⃣ — Ask for confirmation
  const confirm = await Swal.fire({
    title: "Are you sure?",
    text: "This will remove your enrollment from the course.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#e74c3c",
    cancelButtonColor: "#aaa",
    confirmButtonText: "Yes, delete it",
    cancelButtonText: "Cancel",
  });

  if (!confirm.isConfirmed) return;

  // Step 2️⃣ — Show loading alert
  Swal.fire({
    title: "Deleting enrollment...",
    text: "Please wait",
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading(),
  });

  try {
    // Step 3️⃣ — Send delete request
    const response = await axios.post(
      `${api_url}/lecturer_delete_enrollment.php`,
      { enrollment_id: enrollmentId }
    );

    // Step 4️⃣ — Handle response
    if (response.data.success) {
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Enrollment deleted successfully.",
        timer: 1800,
        showConfirmButton: false,
      });

   fetchAssignedCourses();

    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.data.error || "Failed to delete enrollment.",
      });
    }
  } catch (err) {
    console.error("Delete error:", err);
    Swal.fire({
      icon: "error",
      title: "Network Error",
      text: "Could not connect to the server.",
    });
  }
};





  return (
    <Container>
      <Title>Lecturer Course Enrollment</Title>
      <Description>
        Manage your assigned courses. Click below to add new ones.
      </Description>

      <Button onClick={() => setShowModal(true)}>+ Assign New Course</Button>

      {/* --- Modal Form --- */}
      {showModal && (
        <Backdrop>
          <Modal>
            <CloseButton onClick={() => setShowModal(false)}>&times;</CloseButton>
            <Title style={{ fontSize: "22px", marginBottom: "16px" }}>
              Assign Course
            </Title>

            <Label>Level</Label>
            <Select
              value={selectedLevel}
              onChange={(e) => {
                setSelectedLevel(e.target.value);
                setSelectedCourse("");
              }}
              disabled
            >
              {/* <option value="">Select Level</option> */}
              {levels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </Select>

            {/* <Label>Semester</Label>
            <Select
              value={selectedSemester}
              onChange={(e) => {
                setSelectedSemester(e.target.value);
                setSelectedCourse("");
              }}
            >
              <option value="">Select Semester</option>
              {semesters.map((sem) => (
                <option key={sem.id} value={sem.id}>
                  {sem.name}
                </option>
              ))}
            </Select> */}

            <Label>Course</Label>
            <Select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              // disabled={!selectedLevel || !selectedSemester}
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.code} - {course.title}
                </option>
              ))}
            </Select>

            <Button onClick={handleAssign}>Assign Course</Button>
          </Modal>
        </Backdrop>
      )}

      {/* --- Assigned Courses Section --- */}
      <EnrolledCoursesSection>
        <Title>My Courses</Title>
        {assignedCourses.length === 0 ? (
          <Description>No courses assigned yet.</Description>
        ) : (
          assignedCourses.map((assignment) => {
            const course = courses.find((c) => c.id == assignment.course_id);
            return (
              <Card key={assignment.id}>
                <CardRow>
                  <CardLabel>Code:</CardLabel>
                  <CardValue>{course?.code || "N/A"}</CardValue>
                </CardRow>
                <CardRow>
                  <CardLabel>Title:</CardLabel>
                  <CardValue>{course?.title || "N/A"}</CardValue>
                </CardRow>

  <ClearButton
    onClick={() =>window.open(course?.link, "_blank")}
    style={{backgroundColor:"green", marginRight:"20px"}}
  >
    Enter Class
  </ClearButton>

                 <ClearButton
    onClick={() => deleteEnrollment(assignment.id)}
  >
    Delete
  </ClearButton>
              </Card>
            );
          })
        )}
      </EnrolledCoursesSection>
    </Container>
  );
};

export default EnrollLecturerPage;
