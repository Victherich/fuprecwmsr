import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Context } from "./Context";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { FaPlus, FaTimes } from "react-icons/fa";

/* -------- STYLES -------- */
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
  color: green;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  height: 100px;
  margin-bottom: 20px;
  border-radius: 6px;
  border: 1px solid #ccc;
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

const VideoList = styled.div`
  margin-top: 40px;
`;

const VideoItem = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  margin-bottom: 15px;
  border-radius: 8px;
  background: #f9f9f9;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
`;

const VideoTitle = styled.h3`
  margin: 0;
  color: #0a4d24;
`;

const Meta = styled.p`
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
`;

/* -------- MODAL -------- */
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
  &:hover {
    color: red;
  }
`;

/* -------- COMPONENT -------- */
const PostVideoLesson = () => {
  const { courses } = useContext(Context);
  const lecturer = useSelector((state) => state.lecturerInfo);
  const [videos, setVideos] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const fetchVideos = async () => {
    if (!lecturer?.id) return;
    try {
      const res = await axios.get(
        `https://www.cwmsrfupre.com.ng/api/get_videos_by_lecturer_id.php`,
        { params: { lecturer_id: lecturer.id, t: Date.now() } }
      );
      if (res.data.success) setVideos(res.data.videos);
    } catch {
      Swal.fire("Error", "Failed to fetch videos.", "error");
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [lecturer]);

//   const handleSubmit = async () => {
//     if (!selectedCourseId || !title || !description || !file) {
//       Swal.fire("Please fill all fields and upload a video file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("course_id", selectedCourseId);
//     formData.append("lecturer_id", lecturer.id);
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("file", file);

//     try {
//       // initialize progress alert
//       Swal.fire({
//         title: "Uploading Video...",
//         html: `
//           <div id="progress-container" style="margin-top:15px;">
//             <div style="background:#eee;border-radius:10px;overflow:hidden;">
//               <div id="progress-bar" style="height:10px;width:0;background:#119458;transition:width 0.3s;"></div>
//             </div>
//             <p id="progress-text" style="margin-top:10px;font-size:14px;color:#333;">0%</p>
//           </div>
//         `,
//         allowOutsideClick: false,
//         showConfirmButton: false,
//         didOpen: () => Swal.showLoading(),
//       });

//       const res = await axios.post(
//         "https://www.cwmsrfupre.com.ng/api/create_video.php",
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//           onUploadProgress: (event) => {
//             if (event.total) {
//               const percent = Math.round((event.loaded * 100) / event.total);
//               const progressBar = document.getElementById("progress-bar");
//               const progressText = document.getElementById("progress-text");
//               if (progressBar) progressBar.style.width = `${percent}%`;
//               if (progressText) progressText.textContent = `${percent}%`;
//             }
//           },
//         }
//       );

//       Swal.close();

//       if (res.data.success) {
//         Swal.fire("Success", "Video uploaded successfully.", "success");
//         setTitle("");
//         setDescription("");
//         setFile(null);
//         setSelectedCourseId("");
//         setOpenForm(false);
//         fetchVideos();
//       } else {
//         Swal.fire("Error", res.data.error || "Failed to upload.", "error");
//       }
//     } catch (err) {
//       Swal.close();
//       Swal.fire("Error", "Something went wrong.", "error");
//     }
//   };

 
const handleSubmit = async () => {
  if (!selectedCourseId || !title || !description || !file) {
    Swal.fire("Please fill all fields and upload a video file.");
    return;
  }

  const formData = new FormData();
  formData.append("course_id", selectedCourseId);
  formData.append("lecturer_id", lecturer.id);
  formData.append("title", title);
  formData.append("description", description);
  formData.append("file", file);

  try {
    // Initialize SweetAlert with progress UI
    Swal.fire({
      title: "Uploading Video...",
      html: `
        <div id="progress-container" style="margin-top:15px;">
          <div style="background:#eee;border-radius:10px;overflow:hidden;">
            <div id="progress-bar" style="height:10px;width:0;background:#119458;transition:width 0.3s;"></div>
          </div>
          <p id="progress-text" style="margin-top:10px;font-size:14px;color:#333;">0%</p>
        </div>
      `,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => Swal.showLoading(),
    });

    let uploadPercent = 0;
    const res = await axios.post(
      "https://www.cwmsrfupre.com.ng/api/create_video.php",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) => {
          if (event.total) {
            uploadPercent = Math.round((event.loaded * 100) / event.total);
            const progressBar = document.getElementById("progress-bar");
            const progressText = document.getElementById("progress-text");
            if (progressBar) progressBar.style.width = `${uploadPercent}%`;
            if (progressText) progressText.textContent = `${uploadPercent}%`;
          }
        },
      }
    );

    // If upload is done, simulate a short “processing” stage to complete the bar smoothly
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");

    if (progressBar && progressText) {
      let simulated = uploadPercent;
      const interval = setInterval(() => {
        simulated += 2;
        if (progressBar) progressBar.style.width = `${simulated}%`;
        if (progressText) progressText.textContent = `${simulated}%`;
        if (simulated >= 100) {
          clearInterval(interval);
          Swal.close();

          if (res.data.success) {
            Swal.fire("Success", "Video uploaded successfully.", "success");
            setTitle("");
            setDescription("");
            setFile(null);
            setSelectedCourseId("");
            setOpenForm(false);
            fetchVideos();
          } else {
            Swal.fire("Error", res.data.error || "Failed to upload.", "error");
          }
        }
      }, 30); // controls animation speed
    }
  } catch (err) {
    Swal.close();
    Swal.fire("Error", "Something went wrong.", "error");
  }
};



const deleteVideo = async (videoId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete this video.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (!confirm.isConfirmed) return;

    try {
      Swal.fire({ text: "Deleting..." });
      Swal.showLoading();
      const res = await axios.post(
        "https://www.cwmsrfupre.com.ng/api/delete_video.php",
        { video_id: videoId },
        { headers: { "Content-Type": "application/json" } }
      );
      Swal.close();
      if (res.data.success) {
        Swal.fire("Deleted!", "Video deleted.", "success");
        fetchVideos();
      } else Swal.fire("Error", res.data.error || "Failed to delete.", "error");
    } catch {
      Swal.fire("Error", "Server error.", "error");
    }
  };

  return (
    <Container>
      <VideoList>
        <h2 style={{ textAlign: "center", color: "green" }}>
          Your Uploaded Video Lessons / Courses
        </h2>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <NewPostButton onClick={() => setOpenForm(true)}>
            <IconWrapper><FaPlus /></IconWrapper>New Video
          </NewPostButton>
        </div>

        {videos.length === 0 ? (
          <p style={{ textAlign: "center" }}>No videos uploaded yet.</p>
        ) : (
          videos.map((v) => {
            const course = courses.find((c) => c.id === Number(v.course_id));
            return (
              <VideoItem key={v.id}>
                <VideoTitle>{v.title}</VideoTitle>
                <Meta>
                  <strong>Course:</strong>{" "}
                  {course ? `${course.code} - ${course.title}` : "N/A"}
                  <br />
                  <strong>Date:</strong>{" "}
                  {new Date(v.created_at).toLocaleString()}
                </Meta>
                <p><strong>Description: </strong>{v.description}</p>
                {v.file_url && (
                  <FileLink href={v.file_url} target="_blank" rel="noopener noreferrer">
                    Watch / Download Video
                  </FileLink>
                )}
                <Button
                  style={{
                    border: "1px solid green",
                    backgroundColor: "white",
                    color: "green",
                    marginTop: "10px",
                  }}
                  onClick={() => deleteVideo(v.id)}
                >
                  Delete
                </Button>
              </VideoItem>
            );
          })
        )}
      </VideoList>

      {openForm && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={() => setOpenForm(false)}>
              <FaTimes />
            </CloseButton>
            <Title>Upload New Video</Title>

            <Label>Select Course</Label>
            <Select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
            >
              <option value="">-- Select --</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.code} - {c.title}
                </option>
              ))}
            </Select>

            <Label>Title</Label>
            <Input
              type="text"
              placeholder="e.g. Week 1: Introduction"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Label>Description</Label>
            <TextArea
              placeholder="Describe the video lesson..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Label>Upload Video (MP4, MOV, AVI)</Label>
            <Input
              type="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <Button onClick={handleSubmit}>Upload Video</Button>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default PostVideoLesson;
