
import React from 'react';
import styled from 'styled-components';
import ad1 from '../Images/ad1.jpg'
import director from '../Images/director.png'

// Styled Components
const HeroSection = styled.section`
//   background: linear-gradient(135deg, #ffffff 60%, #e6f4e6);
  padding: 6rem 2rem 4rem 2rem;
  text-align: center;
  
  border-bottom: 5px solid #ff6f00;
  background-image:url(${ad1});
h1 {
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);
}


  p {
    font-size: 1.2rem;
    color: #555;
  }

  @media (min-width: 768px) {
    h1 {
      font-size: 3.2rem;
    }
    p {
      font-size: 1.4rem;
    }
  }
`;

const Wrapper = styled.section`
  background-color: #ffffff;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: -2rem auto 4rem auto;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0, 128, 0, 0.5);
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  text-align: center;

  img {
    width: 220px;
    height: 220px;
    border-radius: 50%;
    border: 5px solid #ff6f00;
    object-fit: cover;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  }
`;

const Content = styled.div`
  flex: 2;
  color: #333;

  h2 {
    color: #228b22;
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  h3 {
    font-size: 1.3rem;
    color: #ff6f00;
    margin-bottom: 1rem;
  }

  p {
    line-height: 1.7;
    margin-bottom: 1rem;
    font-size: 1rem;
  }

  ul {
    margin-left: 1.2rem;
    margin-bottom: 1rem;
  }

  ul li {
    margin-bottom: 0.5rem;
  }

  .contact {
    margin-top: 1.5rem;
    font-weight: bold;
    color: #444;
    font-size: 0.95rem;

    span {
      display: block;
      margin-bottom: 0.3rem;
    }
  }
`;

const fadeIn = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const DirectorMessage = () => {
  return (
    <>
      <style>{fadeIn}</style>

      <HeroSection>
        <h1>Meet the Director</h1>
        {/* <p>Dr. Akinyemi O.Ogunkeyede – Leading the charge in sustainable waste management and environmental innovation.</p> */}
      </HeroSection>

      <Wrapper>
        <ImageContainer>
          <img src={director} alt="Dr. Akinyemi O.Ogunkeyede" />
        </ImageContainer>

        <Content>
          <h2>Dr. Akinyemi Olufemi Ogunkeyede</h2>
          <h3>Centre for Waste Management and Sustainable Resources</h3>
          <p>Federal University of Petroleum Resources, Effurun</p>
          <div className="contact">
            <span>+2348119317782; +2349030223041</span>
            <span>Ogunkeyede.akinyemi@fupre.edu.ng</span>
            <span>Dr. Akinyemi O.Ogunkeyede</span>
            <span>Acting Director</span>
          </div>

          <h3>Director’s Address</h3>
          <p>
            Welcome to the Centre for Waste Management and Sustainable Resources (CWMSR) at the Federal University of Petroleum Resources Effurun. As the Acting Director of this esteemed Centre, I am thrilled to introduce our mission and the vital work we are undertaking in the field of waste management and sustainability.
          </p>
          <p>
            At CWMSR, we are committed to advancing knowledge and practice in waste management, environmental sustainability, and community development. Our Centre serves as a hub for research, innovation, and collaboration, where we engage students, researchers, and industry stakeholders to address the pressing environmental challenges of our time.
          </p>
          <p>
            We focus on developing sustainable solutions that not only mitigate waste but also promote resource efficiency and environmental conservation. Our initiatives encompass various areas, including:
          </p>
          <ul>
            <li><strong>Research and Development:</strong> We conduct cutting-edge research to identify and implement best practices in waste management and sustainable resource utilization.</li>
            <li><strong>Capacity Building:</strong> Through workshops, training programs, and community outreach, we empower individuals and organizations with the knowledge and skills necessary to foster a sustainable future.</li>
            <li><strong>Partnerships:</strong> We actively collaborate with academic institutions, governmental agencies, and non-governmental organizations to amplify our impact and drive meaningful change.</li>
          </ul>
          <p>
            As we navigate the complexities of environmental challenges, I invite you to explore our website and learn more about our ongoing projects, initiatives, and opportunities for collaboration. Together, we can create a cleaner, healthier, and more sustainable environment for future generations.
          </p>
          <p>
            Thank you for your interest in our Centre. I look forward to working together to make a positive difference in our communities and beyond.
          </p>
          <p><strong>Warm regards,</strong></p>
        </Content>
      </Wrapper>
    </>
  );
};

export default DirectorMessage;
