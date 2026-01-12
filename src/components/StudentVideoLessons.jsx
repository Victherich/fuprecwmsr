
import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { Context } from "./Context";

// ---------- STYLES ----------
const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

const Title = styled.h2`
  text-align: center;
  color: green;
  margin-bottom: 30px;
`;

const VideoCard = styled.div`
  background: #f7f7f7;
  border-left: 6px solid #119458;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 8px;
`;

const VideoTitle = styled.h3`
  margin: 0 0 10px;
  color: #0a4d24;
`;

const Description = styled.p`
  color: #555;
`;

const Meta = styled.p`
  font-size: 14px;
  color: #777;
  margin: 4px 0;
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

// ---------- COMPONENT ----------
const StudentVideoLessons = ({ studentId }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { courses } = useContext(Context);

  const [filterCourse, setFilterCourse] = useState("");
const [filterSearch, setFilterSearch] = useState("");


  useEffect(() => {
    if (!studentId) {
      setError("No student ID provided.");
      setLoading(false);
      return;
    }

    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          `https://www.cwmsrfupre.com.ng/api/get_videos_for_student.php?student_id=${studentId}&t=${Date.now()}`
        );

        if (res.data.success) {
          setVideos(res.data.videos);
        } else {
          setError(res.data.error || "Failed to fetch videos.");
        }
      } catch (err) {
        setError("An error occurred while fetching videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [studentId]);

  const getCourseInfo = (courseId) => {
    const course = courses.find((c) => c.id === parseInt(courseId));
    return course ? `${course.code} - ${course.title}` : `Course ID: ${courseId}`;
  };

  const filteredVideos = videos.filter((v) => {
  const matchesCourse =
    !filterCourse || String(v.course_id) === String(filterCourse);

  const matchesSearch =
    !filterSearch ||
    v.title.toLowerCase().includes(filterSearch.toLowerCase()) ||
    v.description.toLowerCase().includes(filterSearch.toLowerCase()) ||
    (v.lecturer_name || "").toLowerCase().includes(filterSearch.toLowerCase());

  return matchesCourse && matchesSearch;
});


  return (
    <Container>
      <Title>Your Video Lessons / Courses</Title>

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
    placeholder="Search by title, description, or lecturer..."
    value={filterSearch}
    onChange={(e) => setFilterSearch(e.target.value)}
    style={{
      padding: "8px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      minWidth: "260px",
      flex: 1,
    }}
  />

  {/* Clear Filters */}
  {(filterCourse || filterSearch) && (
    <button
      onClick={() => {
        setFilterCourse("");
        setFilterSearch("");
      }}
      style={{
        padding: "8px 14px",
        backgroundColor: 'red',
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


      {loading && <Message>Loading videos...</Message>}
      {error && <Message>{error}</Message>}
      {!loading && !error && videos.length === 0 && (
        <Message>No video lessons available for your enrolled courses.</Message>
      )}

      {filteredVideos.map((video) => (
        <VideoCard key={video.video_id}>
          <VideoTitle>{video.title}</VideoTitle>
          <Description><strong>Course:</strong> {getCourseInfo(video.course_id)}</Description>
          <Description><strong>Description:</strong> {video.description}</Description>
          <Meta><strong>Lecturer:</strong> {video.lecturer_name || "Unknown"}</Meta>
          <Meta><strong>Uploaded:</strong> {new Date(video.created_at).toLocaleString()}</Meta>

          {video.file_url && (
            <FileLink href={video.file_url} target="_blank" rel="noopener noreferrer">
              🎥 Watch / Download Video
            </FileLink>
          )}
        </VideoCard>
      ))}
    </Container>
  );
};

export default StudentVideoLessons;
