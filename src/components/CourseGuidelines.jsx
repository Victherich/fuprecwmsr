import React from "react";
import styled from "styled-components";

const CourseGuidelines = () => {
  return (
    <Container>
      <Header>
        <h1>Course Guidelines 📚</h1>
        <p>Ensuring high academic standards and structured learning.</p>
      </Header>
      <Content>
        <Section>
          <h2>📌 Course Structure</h2>
          <p>
            The Centre will offer a range of <strong>compulsory</strong>,
            <strong> required</strong>, <strong>elective</strong>,
            <strong> pre-requisite</strong>, and <strong>concurrent courses</strong> as designated by the academic departments. 
            Courses may be evaluated in terms of units, with a maximum of four units for most courses. 
            The Master’s project will carry a maximum of six units.
          </p>
        </Section>

        <Section>
          <h2>📝 Examination and Assessment</h2>
          <p>
            Candidates will be required to undertake examinations in all registered courses at the end of each semester. 
            The pass mark is set at <strong>50%</strong>. Examination results will be recorded as percentage marks and interpreted accordingly.
          </p>
        </Section>

        <Section>
          <h2>🚀 Withdrawal and Re-registration</h2>
          <p>
            Students may withdraw from a course within the first six weeks of the semester. 
            Those who fail in a compulsory course must re-register and be re-examined at the next opportunity.
          </p>
        </Section>

        <Section>
          <h2>🎓 Matriculation</h2>
          <p>
          All new students must participate in the formal matriculation ceremony, where they take the matriculation oath and sign the register of matriculated students. Students will only be officially recognized after completing all matriculation formalities.
<br/>
These regulations are designed to maintain high academic standards and ensure the effective administration of the Professional postgraduate Programme at the Centre for Waste Management and Sustainable Resources.
          </p>
        </Section>
      </Content>
    </Container>
  );
};

export default CourseGuidelines;

const Container = styled.div`
  background: #f5f5f5;
  padding: 50px 20px;
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;

  h1 {
    font-size: 3rem;
    color: orangered;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  }

  p {
    font-size: 1.2rem;
    color: #555;
  }
`;

const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Section = styled.div`
  background: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);

  h2 {
    color: green;
    font-size: 1.8rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
    color: #333;
    line-height: 1.6;
  }
`;
