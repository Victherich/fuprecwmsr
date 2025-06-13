import React, { useEffect, useRef } from "react";
import "../CSS/FacultyLecturers.css"; // Import the CSS file
import "animate.css"; // Import animations

// Import Faculty Images
import st1 from '../Images/staff/st1.jpg';
import st2 from '../Images/staff/st2.jpg';
import st3 from '../Images/staff/st3.jpg';
import st4 from '../Images/staff/st4.jpg';
import st5 from '../Images/staff/st5.jpg';
import st6 from '../Images/staff/st6.jpeg';
import st7 from '../Images/staff/st7.png';
import st8 from '../Images/staff/st8.jpg';
import st9 from '../Images/staff/st9.jpg';
import st10 from '../Images/staff/st10.jpg';
import st11 from '../Images/staff/st11.jpg';
import st12 from '../Images/staff/st12.jpg';
import st13 from '../Images/staff/st13.jpg';
import st14 from '../Images/staff/st14.jpg';
import st17 from '../Images/staff/st17.jpeg';
import st18 from '../Images/staff/st18.jpeg';
import { useNavigate } from "react-router-dom";




const FacultyLecturers = () => {
  const navigate =useNavigate();


  const facultyMembers = [
      { id: 1, name: 'Dr Beatrice Okorhi', image: st1 },
      { id: 2, name: 'Dr Chaanda', image: st2 },
      { id: 3, name: 'Dr E.E. Elemike', image: st3 },
      { id: 4, name: 'Dr N.O.Nenuwe', image: st4 },
      { id: 5, name: 'Dr Ogwuche', image: st5 },
      { id: 6, name: 'Dr Tebu Oghenerukevwe', image: st6 },
      { id: 7, name: 'Prof. Akindele Okewale', image: st7 },
      { id: 8, name: 'Porf.  D F Ogeleka', image: st8 },
      { id: 9, name: 'Prof. Adedosu', image: st9 },
      { id: 10, name: 'Prof. Chris Pix', image: st10 },
      { id: 11, name: 'Prof. Mgbemena', image: st11 },
      { id: 12, name: 'Prof. Olubunmi Akponime', image: st12 },
      { id: 13, name: 'Professional Photo - Dr. Modestus', image: st13 },
      { id: 14, name: 'Weyimi Metseagharun', image: st14 },
      { id: 17, name: 'Lady Diana Eyo-Enoette', image: st17 },
      { id: 18, name: 'Professor Nkechinyere O. Nwaeze ', image: st18 },
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
        {facultyMembers.slice(0,6).map((faculty, index) => (
          <div key={index} className="faculty-card">
            <img src={faculty.image} alt={faculty.name} className="faculty-image" />
            <div className="faculty-info">
              <h3 className="faculty-name">{faculty.name}</h3>
              {/* <p className="faculty-profession">{faculty.title}</p> */}
            </div>
          </div>
        ))}
      </div>
      <button onClick={()=>navigate('/staffteam')}>View More</button>
    </div>
  );
};

export default FacultyLecturers;
