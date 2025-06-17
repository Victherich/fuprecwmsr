import React from 'react';
import styled from 'styled-components';
// import director2 from '../Images/staff/phd2.jpeg'
import director2 from '../Images/drnp1.jpeg'
import deputydirector from '../Images/deputydirector.jpeg'
import headadmin from '../Images/headadmin.jpeg'
import pic6 from '../Images/pic6.jpeg'
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
import vc from '../Images/staff/vc.jpeg'


// Hero Section
const HeroSection = styled.section`
  background: linear-gradient(135deg, #ffffff 60%, #e6f4e6);
  padding: 6rem 2rem 4rem 2rem;
  text-align: center;
  color: #228b22;
  border-bottom: 5px solid #ff6f00;
  background-image:url(${pic6});
  background-size:cover;

  h1 {
    font-size: 2.8rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);
  }

  p {
    font-size: 1.2rem;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);
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

// Staff Layout
const StaffWrapper = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
`;

const StaffCard = styled.div`
  background: #ffffff;
  border: 2px solid #e0f7e0;
  border-left: 6px solid #ff6f00;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 6px 15px rgba(0, 128, 0, 0.5);
  text-align: center;
  animation: fadeIn 0.7s ease-in;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 18px rgba(0, 128, 0, 0.15);
  }

 img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  object-position: top;
  border-radius: 50%;
  margin-bottom: 1rem;
  border: 4px solid #e0f7e0;
}


  h2 {
    color: #228b22;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  h3{
  color: #228b22;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }

  h4 {
    font-size: 1rem;
    color: #ff6f00;
    margin-bottom: 0.3rem;
  }

  p {
    color: #333;
    font-size: 0.95rem;
  }
`;

const fadeIn = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const StaffTeam = () => {

  const staffMembers = [
    { id: 1, name: 'Dr Beatrice Okorhi', image: st1, bio:"Doctor of Petroleum and Environmental Microbiology, Department of Environmental Management & Toxicology, Federal University of Petroleum Resources, Effurun."  },
    { id: 2, name: 'Dr Mohammed Suleiman Chaanda', image: st2, bio:"Associate Professor of Geological Sciences, Federal University of Petroleum Resources, Effurun." },
    { id: 3, name: 'Dr E.E. Elemike', image: st3, bio:"Nanotechnology expert/Material Science" },
    { id: 4, name: 'Dr N.O.Nenuwe', image: st4 },
    { id: 5, name: 'Dr Ogwuche', image: st5 },
    { id: 6, name: 'Dr Tebu Oghenerukevwe', image: st6, bio:"Doctor of Public Health (Epidemiology), Federal University of Petroleum Resources, Effurun." },
    { id: 7, name: 'Prof. Akindele Okewale', image: st7, bio:"Professor of Chemical Engineering Department of Chemical Engineering Federal University of Petroleum Resources, Effurun" },
    { id: 8, name: 'Porf.  D F Ogeleka', image: st8 , bio:"Analytical Chemistry (Ecotoxicology expert)"},
    { id: 9, name: 'Prof. Taofik Adewale Adedosu', image: st9, bio:"Professor of Organic Geochemistry, Department of Pure and Applied Chemistry, Ladoke Akintola University of Technology, Ogbomoso." },
    { id: 10, name: 'Prof. Christopher Onosemuode', image: st10, bio:"Professor of Geography (Cartography), Department of Environmental Management and Toxicology, Federal University of Petroleum Resources, Effurun." },
    { id: 11, name: 'Prof. Chinedum O. Mgbemena', image: st11, bio:"Professor of Mechanical Engineering Design and Manufacturing, Department of Mechanical Engineering, Federal University of Petroleum Resources, Effurun" },
    { id: 12, name: 'Prof. Olubunmi Akponime', image: st12 },
    { id: 13, name: 'Dr Modestus Okechukwu Okwu', image: st13, bio:"Associate Professor of Industrial and Production Engineering, Department of Mechanical and Industrial Engineering, Federal University of Petroleum Resources Effurun." },
    { id: 14, name: 'Dr Weyimi Metseagharun', image: st14, bio:"Head, Environment (HSE/6) Nigeria LNG Limited (NLNG) Corporate Head Office, PHC Rivers State, Nigeria" },
    { id: 17, name: 'Lady Diana Eyo-Enoette', image: st17, bio:"Masters in Development Studies, Certifications in Project Management (Global Health), Mental Health and Nutrition. " },
    { id: 18, name: 'Professor Nkechinyere O. Nwaeze ', image: st18, bio:"Professor of Plant Science and Biotechnology, Department of Plant Science and Biotechnology, University of Nigeria, Nsukka" },
  ];




  return (
    <>
      <style>{fadeIn}</style>

      <HeroSection>
        <h1>Our Staff Team</h1>
        <p>The dedicated team leading CWMSR toward a cleaner, sustainable future.</p>
      </HeroSection>

      <StaffWrapper>
  
           <StaffCard>
              <img src={vc} alt="staff"/>
              <h3>Prof. Ezekiel Agbalagba</h3>
              <h5 style={{color:"#333"}}>The VC of Federal University of Petroleum Resources Effurun Delta State Nigeria</h5>
            <p style={{fontSize:"0.8rem", fontWeight:"500"}}>Nuclear and radiation health physics</p>
           </StaffCard>
        

      </StaffWrapper>

      <StaffWrapper>
        <StaffCard>
          <img src={director2} alt="Dr. Akinyemi O. Ogunkeyede" />
          <h2>Dr Akinyemi Olufemi Ogunkeyede</h2>
          <h4>Acting Director</h4>
          <h5 style={{color:"#333"}}>Fellow-NSLP, Fellow-TETFAiR, MNES,MCSN</h5>
          <p style={{fontSize:"0.8rem", fontWeight:"500"}}>Waste management and resource sustainability expert</p> 
        </StaffCard>

        <StaffCard>
          <img src={deputydirector} alt="Dr. Ozioma Nduagu" />
          <h2>Very Revd. Dr. Ozioma Israel Nduagu Sw.</h2>
          <h4>Deputy Director</h4>
          <h5 style={{color:"#333"}}>FIWM, FAIPHP, FSWA, DSW.</h5>
           <p style={{fontSize:"0.8rem", fontWeight:"500"}}>Centre for Waste Management and sustainable resources, FUPRE
 Abuja Liaison Office.
No, 2. Olanikpeku Street APIS ( Bassan Plaza)  Central Business District FCT, Abuja</p> 
       
        
          {/* <p>Deputy Director, CWMSR</p> */}
        </StaffCard>

        <StaffCard>
          <img src={headadmin} alt="Miss Enyioko Ivy" />
          <h2>Miss Enyioko Ivy</h2>
          <h4>Head Admin & Collaboration</h4>
          {/* <p>Head Admin 2</p> */}
        </StaffCard>
      </StaffWrapper>
      <StaffWrapper>
       {staffMembers.map((staff)=>(
           <StaffCard>
              <img src={staff.image} alt="staff"/>
              <h3>{staff.name}</h3>
              <p style={{fontSize:"0.8rem", fontWeight:"500"}}>{staff.bio}</p>
           </StaffCard>
        
       ))}
      </StaffWrapper>
    </>
  );
};

export default StaffTeam;
