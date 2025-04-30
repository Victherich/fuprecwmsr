import React from "react";
import styled from "styled-components";

const ProgrammesOverview = () => {
  return (
    <Container>
      <Header>
        <h1>Programmes Overview 🎓</h1>
        <p>Comprehensive postgraduate programs to equip professionals for the future.</p>
      </Header>

      <Content>
        {/* PGD & Master's Section (Left Column) */}
        <Column>
          <Section>
            <h2>1. 📌 Postgraduate Diploma (PGD)</h2>
            <List>
              <ListItem> Petroleum Waste Management</ListItem>
              <ListItem>Waste Management</ListItem>
              <ListItem>Environmental Social Work & Community Development</ListItem>
              <ListItem>Environmental Health Management</ListItem>
            </List>

   
  <SubHeading>Admission Requirements</SubHeading>
  <p>Holders of a Higher National Diploma (HND), Bachelor’s degree (B.Sc.) in Natural Science or Science Education program, or Professional Advanced Diploma Certificate.</p>
  <p>Minimum of five credit passes, including English and Mathematics, in O’ Level or equivalent certificate from a recognised institution.</p>

  <SubHeading>Duration</SubHeading>
  <p>📅 <strong>Full-time:</strong> Minimum of two (2) semesters.</p>
  <p>📅 <strong>Part-time:</strong> Minimum of three (3) semesters.</p>


          </Section>

          <Section>
            <h2>2. 🎓 Master’s Degree</h2>
            <List>
              <ListItem>Petroleum Waste Management</ListItem>
              <ListItem>Waste Management</ListItem>
              <ListItem>Environmental Social Work & Community Development</ListItem>
              <ListItem>Environmental Health Management</ListItem>
            </List>

          
  <SubHeading>Admission Requirements</SubHeading>
  <p>Holders of a Bachelor’s degree (B.Sc.) in Natural Science or Science Education program or Postgraduate Diploma (PGD) from a recognized institution.</p>
  <p>Minimum of five credit passes, including English and Mathematics, in O’ Level or equivalent certificate from a recognised institution.</p>

  <SubHeading>Duration</SubHeading>
  <p>📅 <strong>Full-time:</strong> Minimum of two (2) semesters.</p>
  <p>📅 <strong>Part-time:</strong> Minimum of three (3) semesters.</p>


          </Section>
        </Column>

        {/* MPhil & PhD Section (Right Column) */}
        <Column>
          <Section>
            <h2>3. 📖 Master of Philosophy (M.Phil.)</h2>
            <List>
              <ListItem>Petroleum Waste Management</ListItem>
              <ListItem>Waste Management</ListItem>
              <ListItem>Environmental Social Work & Community Development</ListItem>
              <ListItem>Environmental Health Management</ListItem>
            </List>

   
  <SubHeading>Admission Requirements</SubHeading>
  <p>Master’s degree (M.Sc.) or Professional Master’s degree in a relevant field.</p>
  <p>Minimum of five credit passes, including English and Mathematics, in O’ Level or equivalent certificate from a recognised institution.</p>

  <SubHeading>Duration</SubHeading>
  <p>📅 <strong>Full-time:</strong> Minimum of two (2) semesters.</p>
  <p>📅 <strong>Part-time:</strong> Minimum of three (3) semesters.</p>



          </Section>

          <Section>
            <h2>4. 🎓 Doctor of Philosophy (Ph.D.)</h2>
            <List>
              <ListItem>Petroleum Waste Management</ListItem>
              <ListItem>Waste Management</ListItem>
              <ListItem>Environmental Social Work & Community Development</ListItem>
              <ListItem>Environmental Health Management</ListItem>
            </List>

           
  <SubHeading>Admission Requirements</SubHeading>
  <p>Holders of a Master’s degree (M.Sc.), M.Phil, or Professional Master’s degree in relevant fields.</p>
  <p>Minimum of five credit passes, including English and Mathematics, in O’ Level or equivalent certificate from a recognised institution.</p>

  <SubHeading>Duration</SubHeading>
  <p>📅 <strong>Full-time:</strong> Minimum of six (6) semesters, maximum of seven (7) semesters.</p>
  <p>📅 <strong>Part-time:</strong> Minimum of eight (8) semesters, maximum of nine (9) semesters.</p>

</Section>
        </Column>
      </Content>
    </Container>
  );
};

export default ProgrammesOverview;

// Styled Components
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
  }

  p {
    font-size: 1.2rem;
    color: #555;
  }
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  flex: 1;
  min-width: 400px;
  
  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

const Section = styled.div`
  background: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;

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

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
  padding-left: 20px;
  position: relative;

  &::before {
    content: "-";
    position: absolute;
    left: 0px;
    top: 0;
  }
`;

const SubHeading = styled.h3`
  font-size: 1.4rem;
  color: orangered;
  margin-top: 15px;
`;
