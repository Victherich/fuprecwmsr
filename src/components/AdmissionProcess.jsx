import React from 'react';
import styled from 'styled-components';
import { FaCheckCircle, FaFileUpload, FaCreditCard, FaEnvelopeOpenText, FaGraduationCap } from 'react-icons/fa';

const AdmissionProcess = () => {
  return (
    <Container>
      {/* Hero Section */}
      <HeroSection>
        <h1>🎓 Admission Process</h1>
        <p>Follow these steps to apply for our Diploma to Doctoral programs.</p>
      </HeroSection>

      {/* Steps Section */}
      <StepsContainer>
        <Step>
          <FaGraduationCap className="icon" />
          <h3>Step 1: Choose a Program</h3>
          <p>Review our available programs and select the one that best suits your career and academic goals.</p>
        </Step>

        <Step>
          <FaFileUpload className="icon" />
          <h3>Step 2: Complete the Application Form</h3>
          <p>Fill out the online application form available on our website. Be sure to provide all the required details, including your academic qualifications and relevant work experience.</p>
        </Step>

        <Step>
          <FaFileUpload className="icon" />
          <h3>Step 3: Submit Required Documents</h3>
          <p>Prepare and upload the necessary documents, which may include:</p>
          <ul>
            <li>O’Level results</li>
            <li>Academic transcripts</li>
            <li>Certificates of previous qualifications</li>
            <li>Personal statement</li>
            <li>Curriculum Vitae (for professional programs)</li>
            <li>Two letters of recommendation (for postgraduate programs)</li>
          </ul>
        </Step>

        <Step>
          <FaCreditCard className="icon" />
          <h3>Step 4: Pay the Application Fee</h3>
          <p>Complete the payment for your application using the available payment options.</p>
          <p><strong>Bank Details:</strong></p>
          <p><strong>Account Name:</strong> FUPRE CENTRE FOR WASTE MANAGEMENT AND SUSTAINABLE RESOURCES</p>
          <p><strong>Bank:</strong> Zenith Bank</p>
          <p><strong>Account Number:</strong> 1310206641</p>
          <p>Ensure you retain proof of payment.</p>
        </Step>

        <Step>
          <FaEnvelopeOpenText className="icon" />
          <h3>Step 5: Await Confirmation</h3>
          <p>Once your application has been processed, you will receive an email confirming your admission status and further instructions on how to complete your registration.</p>
        </Step>

        <Step>
          <FaCheckCircle className="icon" />
          <h3>Step 6: Admission Successful</h3>
          <p>Once the admission is approved, you will receive an email confirming your admission.</p>
          <p>Students will then be allowed to download their admission letter, student profile form, and acceptance form.</p>
          <p>They will also be able to click the link to pay school fees and receive proof of payment via email.</p>
        </Step>

        <Step>
          <FaCheckCircle className="icon" />
          <h3>Step 7: Registration for Courses</h3>
          <p>Proof of payment will be uploaded to the page to begin registration for courses.</p>
          <p>After registration, students will click "Submit" and receive an email with:</p>
          <ul>
            <li>A copy of registered courses</li>
            <li>An automated matric number</li>
            <li>A secure password</li>
          </ul>
        </Step>

        <Step>
          <FaCheckCircle className="icon" />
          <h3>Step 8: Access to Student Resources</h3>
          <p>Your unique matric number and password will be used to create an email account.</p>
          <p>The email account and password will grant access to lectures and other resources from the centre.</p>
        </Step>
      </StepsContainer>
    </Container>
  );
};





const Container = styled.div`
  padding: 40px;
  text-align: center;
  background-color: #f8f9fa;
`;

 const HeroSection = styled.div`
  background: #004d40;
  color: white;
  padding: 50px 20px;
  border-radius: 10px;
  margin-bottom: 40px;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.2rem;
  }
`;

 const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

 const Step = styled.div`
  background: white;
  padding: 20px;
  width: 80%;
  max-width: 700px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: left;

  .icon {
    color: darkorange;
    font-size: 2rem;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 5px;
    color: green;
  }

  p {
    font-size: 1rem;
    margin-bottom: 10px;
  }

  ul {
    padding-left: 20px;
  }

  ul li {
    margin-bottom: 5px;
  }

  @media (max-width: 768px) {
    width: 95%;
  }
`;


export default AdmissionProcess;
