
// import React from 'react';
// import styled from 'styled-components';

// const PageWrapper = styled.div`
//   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//   color: #333;
//   line-height: 1.6;
// `;

// const HeroSection = styled.section`
//   position: relative;
//   background: linear-gradient(135deg, #2e7d32, #66bb6a);
//   color: white;
//   padding: 100px 20px 80px;
//   text-align: center;
//   overflow: hidden;

//   h1 {
//     font-size: 3rem;
//     margin-bottom: 1rem;
//     font-weight: bold;
//   }

//   p {
//     font-size: 1.3rem;
//     max-width: 700px;
//     margin: 0 auto;
//   }
// `;

// const Wave = styled.div`
//   position: absolute;
//   bottom: 0;
//   width: 100%;
//   line-height: 0;
//   transform: translateY(1px);

//   svg {
//     display: block;
//     width: 100%;
//     height: 100px;
//   }

//   path {
//     fill: #fff;
//   }
// `;

// const Section = styled.section`
//   background: #fff;
//   padding: 60px 20px;
//   max-width: 1100px;
//   margin: 0 auto;

//   h2 {
//     font-size: 2rem;
//     margin-bottom: 20px;
//     color: #2e7d32;
//   }

//   p, li {
//     font-size: 1.1rem;
//     margin-bottom: 1rem;
//   }

//   ul {
//     padding-left: 20px;
//   }

//   &:not(:last-child) {
//     border-bottom: 1px solid #eee;
//     margin-bottom: 40px;
//   }
// `;

// export default function ResearchPage() {
//   return (
//     <PageWrapper>
//       <HeroSection>
//         <h1>Research at CWMSR</h1>
//         <p>
//           Advancing global sustainability through cutting-edge research in waste management,
//           circular economy, and environmental innovation.
//         </p>
//         <Wave>
//           <svg viewBox="0 0 1440 320">
//             <path
//               fillOpacity="1"
//               d="M0,64L40,85.3C80,107,160,149,240,160C320,171,400,149,480,138.7C560,128,640,128,720,144C800,160,880,192,960,186.7C1040,181,1120,139,1200,117.3C1280,96,1360,96,1400,96L1440,96L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
//             />
//           </svg>
//         </Wave>
//       </HeroSection>

//       <Section>
//         <h2>Research Focus Areas</h2>
//         <ul>
//           <li>Waste-to-Energy and Thermal Treatment Technologies</li>
//           <li>Recycling and Resource Recovery Innovation</li>
//           <li>Plastic Waste Reduction and Bio-based Alternatives</li>
//           <li>Lifecycle Assessment and Environmental Impact Modeling</li>
//           <li>Policy and Circular Economy Frameworks</li>
//         </ul>
//       </Section>

//       <Section>
//         <h2>Current Projects</h2>
//         <ul>
//           <li>
//             <strong>Urban Waste Mapping:</strong> Using GIS and AI to identify high-risk zones in developing countries.
//           </li>
//           <li>
//             <strong>Biodegradable Packaging Initiative:</strong> Testing next-gen materials for zero-waste supply chains.
//           </li>
//           <li>
//             <strong>Energy-from-Waste Microgrids:</strong> Integrating small-scale systems in off-grid communities.
//           </li>
//         </ul>
//       </Section>

//       <Section>
//         <h2>Publications</h2>
//         <p>
//           Our researchers have published in journals such as *Waste Management*, *Environmental Science & Technology*, and *Resources, Conservation & Recycling*.
//         </p>
//         <ul>
//           <li>"Circular Models for Municipal Waste Systems" - *Waste Mgmt. Journal* (2024)</li>
//           <li>"Biochar from Urban Waste for Soil Remediation" - *ES&T* (2023)</li>
//           <li>"Decentralized WTE Units: A Pilot in Kenya" - *RC&R* (2023)</li>
//         </ul>
//       </Section>

//       <Section>
//         <h2>Collaborations & Partnerships</h2>
//         <p>
//           CWMSR partners with local governments, international research institutions, and industries to co-develop sustainable waste solutions.
//         </p>
//         <ul>
//           <li>UNEP Sustainable Waste Programme</li>
//           <li>University of Nairobi Environmental Lab</li>
//           <li>GreenTech Circular Materials Consortium</li>
//         </ul>
//       </Section>

//       <Section>
//         <h2>Join Our Research Community</h2>
//         <p>
//           Interested in collaborating or pursuing a PhD with CWMSR? We welcome students, postdocs, and visiting researchers passionate about environmental sustainability.
//         </p>
//       </Section>
//     </PageWrapper>
//   );
// }




import React from 'react';
import styled, { keyframes } from 'styled-components';
import researchimg from '../Images/researchimg.jpg'

const PageWrapper = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  overflow-x: hidden;
`;

const HeroSection = styled.section`
  position: relative;
  background: linear-gradient(135deg, #2e7d32, #66bb6a);
  color: white;
  padding: 120px 20px 100px;
  text-align: center;
  z-index: 1;
  background-image:url(${researchimg});
  background-size:cover;

  h1 {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);
  }

  p {
    font-size: 1.3rem;
    max-width: 700px;
    margin: 0 auto;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.9);
  }

`;

const Wave = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  line-height: 0;
  transform: translateY(1px);
  z-index: 0;

  svg {
    display: block;
    width: 100%;
    height: 100px;
  }

  path {
    fill: #fff;
  }
`;

const Section = styled.section`
  padding: 80px 20px;
  max-width: 1200px;
  margin: auto;

  h2 {
    font-size: 2.4rem;
    margin-bottom: 1.5rem;
    color: #2e7d32;
    position: relative;
  }

  h2::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 4px;
    background: #66bb6a;
    border-radius: 5px;
  }

  p {
    font-size: 1.1rem;
    margin-bottom: 1.2rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  background: #f9f9f9;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  transition: 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  }

  h3 {
    margin-bottom: 0.8rem;
    font-size: 1.3rem;
    color: #2e7d32;
  }

  p {
    font-size: 1rem;
  }
`;

const PublicationList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PubItem = styled.li`
  margin-bottom: 20px;
  padding-left: 20px;
  position: relative;

  &::before {
    content: '📄';
    position: absolute;
    left: 0;
    top: 0;
  }

  span {
    font-weight: bold;
    color: #2e7d32;
  }

  em {
    color: #777;
  }
`;

const CollaborationsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  flex: 1;
  background: #e8f5e9;
  padding: 30px;
  border-radius: 10px;

  h4 {
    margin-bottom: 10px;
    color: #1b5e20;
  }

  ul {
    padding-left: 20px;
  }

  li {
    margin-bottom: 8px;
  }
`;

const ContentBox = styled.div`
  flex: 2;
`;

const CTASection = styled.section`
  background: #2e7d32;
  color: white;
  text-align: center;
  padding: 80px 20px;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }

  button {
    background: white;
    color: #2e7d32;
    border: none;
    padding: 12px 30px;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 25px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background: #e0f2f1;
    }
  }
`;

export default function CWMSRResearchPage() {
  return (
    <PageWrapper>
      <HeroSection>
        <h1>Research at CWMSR</h1>
        <p>
          Advancing sustainability through pioneering research in waste systems,
          circular economy, and environmental resilience.
        </p>
        <Wave>
          <svg viewBox="0 0 1440 320">
            <path d="M0,64L40,85.3C80,107,160,149,240,160C320,171,400,149,480,138.7C560,128,640,128,720,144C800,160,880,192,960,186.7C1040,181,1120,139,1200,117.3C1280,96,1360,96,1400,96L1440,96L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"/>
          </svg>
        </Wave>
      </HeroSection>

      <Section>
        <h2>Research Focus Areas</h2>
        <Grid>
          <Card>
            <h3>Waste-to-Energy</h3>
            <p>Exploring clean thermal conversion methods for turning waste into renewable energy.</p>
          </Card>
          <Card>
            <h3>Plastic Waste & Biomaterials</h3>
            <p>Developing sustainable alternatives and strategies to reduce plastic pollution.</p>
          </Card>
          <Card>
            <h3>Lifecycle Assessment</h3>
            <p>Modeling environmental impacts of materials and waste processing across lifecycles.</p>
          </Card>
          <Card>
            <h3>Policy & Circular Economy</h3>
            <p>Shaping effective waste management policies based on circular economy principles.</p>
          </Card>
        </Grid>
      </Section>

      <Section>
        <h2>Featured Projects</h2>
        <Grid>
          <Card>
            <h3>Urban Waste Mapping</h3>
            <p>Using AI + GIS to identify intervention zones for better waste planning.</p>
          </Card>
          <Card>
            <h3>Biochar for Soil</h3>
            <p>Investigating carbon-sequestering biochar from municipal biomass waste.</p>
          </Card>
          <Card>
            <h3>Microgrid WTE</h3>
            <p>Deploying community-scale energy-from-waste systems in rural Kenya.</p>
          </Card>
        </Grid>
      </Section>

      <Section>
        <h2>Publications</h2>
        <PublicationList>
          <PubItem>
            <span>Circular Models for Municipal Waste Systems</span> — <em>Waste Mgmt. Journal</em> (2024)
          </PubItem>
          <PubItem>
            <span>Biochar from Urban Waste for Soil Remediation</span> — <em>ES&T</em> (2023)
          </PubItem>
          <PubItem>
            <span>Decentralized WTE Units: A Pilot in Kenya</span> — <em>RC&R</em> (2023)
          </PubItem>
        </PublicationList>
      </Section>

      <Section>
        <h2>Collaborations</h2>
        <CollaborationsWrapper>
          <Sidebar>
            <h4>Our Partners</h4>
            <ul>
              <li>UNEP Sustainable Waste Programme</li>
              <li>University of Nairobi Environmental Lab</li>
              <li>GreenTech Circular Materials Consortium</li>
              <li>GIZ Innovation for Waste</li>
            </ul>
          </Sidebar>
          <ContentBox>
            <p>
              CWMSR actively engages in international and cross-disciplinary partnerships to
              co-develop scalable, impactful waste management solutions. Our collaborations support innovation,
              policy reform, and on-the-ground implementation globally.
            </p>
          </ContentBox>
        </CollaborationsWrapper>
      </Section>

      <CTASection>
        <h2>Join Our Mission</h2>
        <p>
          Become part of a vibrant research community transforming global waste systems.
        </p>
        <button>Explore Opportunities</button>
      </CTASection>
    </PageWrapper>
  );
}

