import React from "react";
import "../CSS/OnlineCourses.css"; // Import CSS file
import { FaLeaf, FaBookOpen, FaFlask, FaUsers } from "react-icons/fa"; // Import React Icons
import img1 from "../Images/cs1.jpg";
import img2 from "../Images/cs2.jpg";
import img3 from "../Images/cs3.png";
import img4 from "../Images/cs4.png";

const courses = [
  {
    id: "01",
    title: "Professional Diploma in Petroleum Waste Management",
    image: img1,
    icon: <FaLeaf />,
  },
  {
    id: "02",
    title: "Master’s in Environmental Health Management (Professional)",
    image: img2,
    icon: <FaBookOpen />,
  },
  {
    id: "03",
    title: "PhD in Environmental Health Management (Professional)",
    image: img3,
    icon: <FaFlask />,
  },
  {
    id: "04",
    title: "PhD in Environmental Social Work and Community Development (Professional)",
    image: img4,
    icon: <FaUsers />,
  },
];

const OnlineCourses = () => {
  return (
    <div className="courses-section">
      <h2 className="courses-title">🌱 Online Courses</h2>
      <p className="courses-description">
        The Centre for Waste Management and Sustainable Resources (CWMSR) offers a wide range of academic and professional programs aimed at equipping students and professionals with cutting-edge knowledge and skills in environmental sustainability, waste management, and pollution control, with specific focus on the oil and gas sector.
      </p>

      <div className="courses-grid">
        {courses.map((course, index) => (
          <div key={index} className={`course-card card-${index + 1}`}>
            <img src={course.image} alt={course.title} className="course-image" />
            <div className="course-info">
              <span className="course-icon">{course.icon}</span>
              <h3 className="course-title">{course.id} {course.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnlineCourses;
