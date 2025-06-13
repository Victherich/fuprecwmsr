
import React from 'react';
import styled from 'styled-components';
import { FaGraduationCap, FaFileAlt } from 'react-icons/fa';

const RequiredDocuments = () => {
  return (
    <Wrapper>
      <Title>📄 Required Documents and Fees for Application</Title>
      <Subtitle>
        Please ensure you upload the appropriate academic documents based on the program you are applying for:
      </Subtitle>

      <ProgramCard>
        <Heading><FaGraduationCap /> Ph.D. Applicants</Heading>
        <List>
          <ListItem><FaFileAlt /> Application Fee: 35,000 NGN</ListItem>
          <ListItem><FaFileAlt /> Master’s Degree (M.Sc.) Transcript</ListItem>
          <ListItem><FaFileAlt /> Bachelor’s Degree (B.Sc.) Transcript</ListItem>
          <ListItem><FaFileAlt /> WAEC / SSCE O’Level Results</ListItem>
        </List>
      </ProgramCard>

      <ProgramCard>
        <Heading><FaGraduationCap /> Master’s Degree (M.Sc.) Applicants</Heading>
        <List>
          <ListItem><FaFileAlt /> Application Fee: 25,000 NGN</ListItem>
          <ListItem><FaFileAlt /> Bachelor’s Degree (B.Sc.) Transcript</ListItem>
          <ListItem><FaFileAlt /> WAEC / SSCE O’Level Results</ListItem>
        </List>
      </ProgramCard>

      <ProgramCard>
        <Heading><FaGraduationCap /> Postgraduate Diploma (PGD) Applicants</Heading>
        <List>
          <ListItem><FaFileAlt /> Application Fee: 15,000 NGN</ListItem>
          <ListItem><FaFileAlt /> Higher National Diploma (HND) Transcript</ListItem>
          <ListItem><FaFileAlt /> WAEC / SSCE O’Level Results</ListItem>
        </List>
      </ProgramCard>


      <ProgramCard style={{backgroundColor:"green"}}>
        <Heading style={{color:"white"}}><FaGraduationCap style={{color:"white"}}/> PAY TO THE BELOW BANK ACCOUNT DETAILS:</Heading>
        <List>
          <ListItem style={{color:"white"}}><FaFileAlt style={{color:"white"}}/>ACCOUNT NAME: FUPRE CENTRE FOR WASTE MANAGEMENT AND SUSTAINABLE RESOURCES</ListItem>
          <ListItem style={{color:"white"}} ><FaFileAlt style={{color:"white"}}/> ACCOUNT NUMBER: 1310206641</ListItem>
          <ListItem style={{color:"white"}}><FaFileAlt style={{color:"white"}}/> BANK: ZENITH BANK</ListItem>
        </List>
      </ProgramCard>
    </Wrapper>
  );
};

export default RequiredDocuments;


const Wrapper = styled.div`
  max-width: 800px;
  margin: 3rem auto;
//   padding: 2rem;
  background: #f9fbfd;
  border-radius: 10px;
//   box-shadow: 0 4px 12px rgba(0, 0, 50, 0.05);
  font-family: 'Segoe UI', sans-serif;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: #003366;
  text-align: center;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  text-align: center;
  font-size: 1rem;
  color: #555;
  margin-bottom: 2rem;
`;

const ProgramCard = styled.div`
  background: white;
  border-left: 6px solid #005bb5;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 6px;
`;

const Heading = styled.h3`
  font-size: 1.3rem;
  color: #002244;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const List = styled.ul`
  list-style: none;
  padding-left: 0;
  text-align:left;

`;

const ListItem = styled.li`
  font-size: 1rem;
  color: #333;
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;
