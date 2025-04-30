import React from 'react';
import '../CSS/Admissions.css';
import { FaCheckCircle, FaBookOpen, FaGraduationCap, FaFileAlt, FaMoneyBillWave, FaUserCheck, FaClipboardList, FaLaptopCode, FaClipboardCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AdmissionProcess from './AdmissionProcess';
import ShortCourses from './ShortCourses';

const Admissions = () => {
  const navigate = useNavigate();

  return (
    <div className="admissions-page">
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1>🌱 Join the Future of Sustainable Resource Management</h1>
          <p>Empowering students and professionals in environmental sustainability and waste management.</p>
          <a onClick={()=>navigate('/application')} className="apply-btn">Apply Now</a>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>📚 About Our Programs</h2>
        <p>
        The Centre for Waste Management and Sustainable Resources (CWMSR) offers a wide range of academic and professional programs aimed at equipping students and professionals with cutting-edge knowledge and skills in environmental sustainability, waste management, and pollution control, with specific focus on the oil and gas sector. Our programs are designed to meet the needs of full-time students, working professionals, and distance learners. </p>
        <br/>
        <h3>Mode of Study:</h3>
        <p>Full-Time, Part-Time, and Distance Online Learning.</p>
      </section>

      {/* Available Programs */}
      <section className="programs-section">
  <h2>🎓 Available Programs</h2>
  <div className="program-list">
    <div className="program-card"><FaBookOpen /> Professional Diploma in Waste Management</div>
    <div className="program-card"><FaBookOpen /> Professional Diploma in Petroleum Waste Management</div>
    <div className="program-card"><FaBookOpen /> Professional Diploma in Zero Waste Management</div>
    <div className="program-card"><FaBookOpen /> Master’s in Environmental Health Management (Professional)</div>
    <div className="program-card"><FaBookOpen /> Master’s in Environmental Social Work and Community Development (Professional)</div>
    <div className="program-card"><FaBookOpen /> Master’s in Waste Management (Professional)</div>
    <div className="program-card"><FaBookOpen /> Master’s in Petroleum Waste Management (Professional)</div>
    <div className="program-card"><FaBookOpen /> PhD in Environmental Health Management (Professional)</div>
    <div className="program-card"><FaBookOpen /> PhD in Environmental Social Work and Community Development (Professional)</div>
    <div className="program-card"><FaBookOpen /> PhD in Waste Management (Professional)</div>
    <div className="program-card"><FaBookOpen /> PhD in Petroleum Waste Management (Professional)</div>
  </div>
</section>

<AdmissionProcess/>

      {/* Admission Requirements */}
      {/* <section className="requirements-section">
        <h2>📜 Admission Requirements & Duration</h2>
        <p><strong>Professional Diploma:</strong> OND or equivalent (2 years)</p>
        <p><strong>Postgraduate Diploma:</strong> HND/B.Sc or equivalent</p>
        <p><strong>Master’s Programs:</strong> Bachelor's Degree (Second Class Lower or above) (18 months)</p>
        <p><strong>PhD Programs:</strong> Master’s Degree with research experience</p>
      </section> */}

<section className="requirements-section">
  <h2>📜 Admission Requirements & Duration</h2>
  <div className="requirement-list">
    <div className="requirement-card">
      <h3>Professional Diploma Programs</h3>
      <p>Minimum of an OND or its equivalent in a relevant field. <strong>(2 years)</strong></p>
    </div>

    <div className="requirement-card">
      <h3>Professional Postgraduate Diploma Programs</h3>
      <p>Minimum HND/B.Sc, FUPRE Professional Diploma or equivalent Professional Advanced Diploma Certificate holder from a recognized institution.</p>
    </div>

    <div className="requirement-card">
      <h3>Master’s Programs</h3>
      <p>A Bachelor’s degree (minimum of second class lower) in a relevant discipline, or its equivalent, from a recognized institution. PGD holders <strong>(18 months or three semesters)</strong>.</p>
    </div>

    <div className="requirement-card">
      <h3>Ph.D. Programs</h3>
      <p>A Master’s degree in a related field, along with evidence of research experience and publications, as applicable.</p>
    </div>
  </div>
</section>


      {/* Short Courses */}

    <ShortCourses/>

    </div>
  );
};

export default Admissions;
