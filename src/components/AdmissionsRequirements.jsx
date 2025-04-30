import React from "react";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  position: relative;
  overflow: hidden;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/path-to-your-background-image.jpg') no-repeat center center/cover;
  opacity: 0.1; /* Transparent overlay */
  z-index: -1;
`;

const Section = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  color: green;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
`;

const SubHeading = styled.h3`
  font-size: 1.8rem;
  color: orangered;
  margin-bottom: 10px;
`;

const Text = styled.p`
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
`;

const List = styled.ul`
  padding-left: 20px;
  font-size: 1rem;
  color: #333;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
`;

const AdmissionRequirements = () => {
  return (
    <Container>
      <Background />

      <Heading>📜 General Admission Requirements</Heading>

      <Section>
        <div>
          <SubHeading>1. Eligibility Criteria ✅</SubHeading>
          <Text>
            Candidates seeking admission into the Professional Master’s Programme in Environmental Social Work and 
            Community Development must be graduates of recognized institutions accredited by relevant authorities. 
            All applicants must meet the minimum matriculation requirements of the Centre for Waste Management 
            and Sustainable Resources.
          </Text>
        </div>
        <div>
          <SubHeading>2. Admissions Process 📌</SubHeading>
          <List>
            <ListItem>Admission decisions will be made by the Centre’s Admissions Committee based on the recommendation of the relevant academic departments. The Centre and the departments are not obligated to provide reasons for rejecting any application for postgraduate studies.</ListItem>
            <ListItem> Applicants without a prior higher degree in a relevant field will be admitted to the Master’s degree program. Candidates with recognized higher degrees that are assessed to be at least equivalent to a Master’s degree may be considered for direct admission into a Ph.D. program upon the recommendation of the appropriate academic committee.</ListItem>
           </List>
        </div>
      </Section>

      <Section>
        <div>
          <SubHeading>3. Modes of Admission 🎓</SubHeading>
          <List>
            <ListItem><strong>Full-Time Admission:</strong> Full-time candidates must provide proof that they are not in full-time employment or have been officially released by their employers to pursue full-time studies. Any candidate found to have made a false declaration regarding their employment status will be required to withdraw.</ListItem>
            <ListItem><strong>Part-Time Admission:</strong>Part-time admission may be offered to candidates who demonstrate the availability of adequate facilities to support their studies. Such candidates may need to show evidence of employer support.</ListItem>
            <ListItem><strong>Distance Learning:</strong> Candidates may also be admitted through the distance learning mode, provided they demonstrate computer literacy and have access to necessary technological resources and facilities to ensure effective</ListItem>
            <ListItem><strong>Occasional Students:</strong>Candidates who meet the minimum entry requirements but are not seeking a degree from the Centre may be admitted as occasional students.</ListItem>
          </List>
        </div>
        <div>
          <SubHeading>4. Registration Procedures 📝</SubHeading>
          <List>
            <ListItem>
            <strong>Registration Requirements:</strong> All admitted candidates must register for their respective programs in person or by proxy registration for distance learning students or on medical ground.
   – Registration is considered complete only after:

     – Payment of all prescribed fees.

     – Completion of all required forms and obtaining necessary endorsements.

     – Submission of all registration documents to the appropriate authorities.
            </ListItem>
            <ListItem>
                <strong>
                Registration Deadlines:
                </strong>
            
            Fresh students must complete all registration formalities one week before the matriculation date. Returning students must complete their registration within three weeks of the start of the first semester.
            </ListItem>
            </List>
        </div>
      </Section>

      <Section>
  <div>
    <SubHeading>5.  Renewal of Registration 🔄</SubHeading>
    <Text>
      Candidates must renew their registration at the beginning of each academic session 
      until the completion of their program. This renewal includes the submission of a 
      satisfactory progress report, where applicable.
    </Text>
  </div>
  <div>
    <SubHeading>6.  Suspension and Reactivation of Registration ⏸️</SubHeading>
    <Text>
      A candidate may apply for the suspension of registration for a maximum of one year, 
      subject to the approval of the relevant committee. A second year of suspension may be 
      allowed, but no further suspensions will be granted. Reactivation of suspended 
      registration requires the completion of specific forms and payment of reactivation fees.
    </Text>
  </div>
</Section>


<Section>
  <div>
    <SubHeading>7. Lapsed Registration 🔔</SubHeading>
    <Text>
      Registration will be considered lapsed if a candidate fails to renew registration, 
      does not present himself or herself for examination, or fails to meet degree 
      requirements within the approved maximum period. Reactivation of a lapsed registration 
      requires payment of prescribed fees. However, registration that has lapsed for two 
      sessions will not be reactivated.
    </Text>
  </div>
  <div>
    <SubHeading>8. Course Withdrawal ❌</SubHeading>
    <Text>
      A student may not withdraw from a course after five weeks of lectures in a given 
      semester without permission from the academic director of the Centre.
    </Text>
  </div>
</Section>

<Section>
  <div>
    <SubHeading>9. Failure to Seek Permission ⚠️</SubHeading>
    <Text>
      A student who withdraws after this time or who fails to seek permission from 
      the academic director shall be deemed to have failed that course.
    </Text>
  </div>
  <div>
    <SubHeading>10. Voluntary Withdrawal 🚫</SubHeading>
    <Text>
      A student who fails to sit for more than two courses at the end of a given semester 
      shall be deemed to have withdrawn voluntarily from the Programme.
    </Text>
  </div>
</Section>




      <Text style={{ textAlign: "center", marginTop: "40px", fontWeight: "bold", color: "green" }}>
        ✅ These regulations ensure high academic standards and smooth administration of the postgraduate programme at the Centre.
      </Text>
    </Container>
  );
};

export default AdmissionRequirements;
