import React from 'react';
import styled from 'styled-components';
import css1 from '../Images/css1.jpg'
import fa1 from '../Images/fa1.jpg'
import hm1 from '../Images/hm1.jpg'
import sc1 from '../Images/sc1.jpg'
import mt1 from '../Images/mt1.jpg'

// Styled Components for a modern layout
const Section = styled.section`
  padding: 50px;
  text-align: center;
  background-color: #f8f9fa;
`;

const SubHeading = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #2c3e50;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  justify-content: center;
  max-width: 1200px;
  margin: auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const GridItem = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  img {
    width: 100%;
    height: 200px;
    border-radius: 10px;
    object-fit: cover;
  }
  
  h3 {
    font-size: 1.5rem;
    margin: 15px 0;
    color: #333;
  }
  
  p {
    font-size: 1rem;
    color: #555;
  }
`;

const AcademicDepartments = () => {
  return (
    <Section>
      <SubHeading>📚 Our Academic Departments</SubHeading>
      <GridContainer>
        {/* Computer Science */}
        <GridItem>
          <img src={css1} alt="Computer Science" />
          <h3>💻 Computer Science</h3>
          <p>
            Hands-on experience with the latest programming languages and technology. 
            We have trained IT professionals who work closely with our students so 
            they are prepared for the real world.
          </p>
        </GridItem>

        {/* Fine Arts */}
        <GridItem>
          <img src={fa1} alt="Fine Arts" />
          <h3>🎨 Fine Arts</h3>
          <p>
            Giving wings to the artists who’d like to take it up as a career or just a hobby. 
            Our students are trained by professionals who help them develop, learn, 
            and polish their skills while at school.
          </p>
        </GridItem>

        {/* Humanities */}
        <GridItem>
          <img src={hm1} alt="Humanities" />
          <h3>📜 Humanities</h3>
          <p>
            The study of ancient and modern languages, philosophy, history, and more. 
            We take pride in offering top humanity courses from a dedicated and trained staff.
          </p>
        </GridItem>

        {/* Science */}
        <GridItem>
          <img src={sc1} alt="Science" />
          <h3>🔬 Science</h3>
          <p>
            The study encourages scientific reasoning, discoveries, and inventions. 
            Great teachers and well-equipped laboratories help students explore, discover, 
            and experiment with new things under the best supervision.
          </p>
        </GridItem>

        {/* Mathematics */}
        <GridItem>
          <img src={mt1} alt="Mathematics" />
          <h3>📐 Mathematics</h3>
          <p>
            Understanding the game of numbers and logic to solve real-world problems. 
            Learn mathematics from scholars and university toppers who not only make 
            it interesting but also fun to learn.
          </p>
        </GridItem>
      </GridContainer>
    </Section>
  );
};

export default AcademicDepartments;
