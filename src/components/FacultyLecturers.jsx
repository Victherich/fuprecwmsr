import React, { useEffect, useRef } from "react";
import "../CSS/FacultyLecturers.css"; // Import the CSS file
import "animate.css"; // Import animations

// Import Faculty Images
import faculty1 from "../Images/SeanSmith.jpg"; // Replace with actual paths
import faculty2 from "../Images/JohnKinney.jpg";
import faculty3 from "../Images/AntonioRomano.jpg";
import faculty4 from "../Images/ChristyJohannsen.jpg";
import faculty5 from "../Images/DaveCarrey.jpg";
import faculty6 from "../Images/MarcoEstavez.jpg";

const FacultyLecturers = () => {
  const facultyMembers = [
    { name: "Sean Smith", title: "Student Liaison", image: faculty1 },
    { name: "John Kinney", title: "Prof. Psychology", image: faculty2 },
    { name: "Antonio Romano", title: "Prof. Foreign Studies", image: faculty3 },
    { name: "Christy Johannsen", title: "Prof. Arts & Humanities", image: faculty4 },
    { name: "Dave Carrey", title: "Sports & Recreation", image: faculty5 },
    { name: "Marco Estavez", title: "Prof. Environmental Science", image: faculty6 },
  ];

  // Intersection Observer for animations
  const observer = useRef(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate__animated", "animate__slideInRight", "animate__slower");
          }
        });
      },
      { threshold: 0.3 }
    );

    const facultyCards = document.querySelectorAll(".faculty-card");
    facultyCards.forEach((card) => observer.current.observe(card));

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="faculty-section">
      <h2 className="faculty-title">Meet Our Faculty & Lecturers</h2>
      <div className="faculty-grid">
        {facultyMembers.map((faculty, index) => (
          <div key={index} className="faculty-card">
            <img src={faculty.image} alt={faculty.name} className="faculty-image" />
            <div className="faculty-info">
              <h3 className="faculty-name">{faculty.name}</h3>
              <p className="faculty-profession">{faculty.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultyLecturers;
