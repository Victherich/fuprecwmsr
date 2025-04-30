import styled from "styled-components";

const ProgrammePage = () => {
  return (
    <Container>
      <Heading>GENERAL PROGRAMME REQUIREMENTS</Heading>
      <Content>
        <Section>
          <SubHeading> 📌 A. Registration Procedure</SubHeading>
          <p>
            Students shall normally complete registration for courses for the semester not later than two weeks after the start of the semester.
          </p>
        </Section>

        <Section>
          <SubHeading>📌B. Student Academic Status</SubHeading>
          <SubSubHeading>✅ Good Standing</SubSubHeading>
          <p>
            To be in good standing, a student must in each semester have a Cumulative Grade Point Average (CGPA) of not less than 3.00.
          </p>

          <SubSubHeading>⚠️ Withdrawal</SubSubHeading>
          <p>
            Candidates with less than 3.00 CGPA shall remain in the Programme for the 1st semester but shall be withdrawn if he/she fails to attain 3.00 CGPA at the end of the second semester.
          </p>
        </Section>

        <Section>
          <SubHeading>📌C. Attendance</SubHeading>
          <p>
            In order to be eligible for examination in a particular course, a student shall have attended a minimum of 75% of the total periods of formal instructions delivered for the course.
          </p>
        </Section>

        <Section>
  <SubHeading>📌D. Course Evaluation</SubHeading>

  <SubSubHeading>✅ In the PGD, M.Sc. programmes, assessment of students’ achievements shall be based on:</SubSubHeading>
  {/* <p>Assessment of students’ achievements shall be based on:</p> */}
  <ul>
    <li>Course Examination</li>
    <li>Term Papers/Seminars</li>
    <li>Other Assignments</li>
  </ul>

  <SubSubHeading>✅ In M.Phil programmes assessment of students’ achievements shall be based on:</SubSubHeading>
  {/* <p>Assessment of students’ achievements shall be based on:</p> */}
  <ul>
    <li>Selected Taught Courses (weight average of 9 Units)</li>
    <li>Research Project</li>
    <li>Conversion Oral Examination</li>
  </ul>

  <SubSubHeading>✅ In M.Phil/PhD programmes assessment of students’ achievements shall be based on:</SubSubHeading>
  {/* <p>Assessment of students’ achievements shall be based on:</p> */}
  <ul>
    <li>Research Project</li>
    <li>Conversion Oral Examination</li>
  </ul>

  <SubSubHeading>✅ PhD programmes assessment of students’ achievements shall be based on:</SubSubHeading>
  {/* <p>Assessment of students’ achievements shall be based on:</p> */}
  <ul>
    <li>Research Project</li>
    <li>Oral Viva Examination</li>
  </ul>
</Section>

<Section>
  <SubHeading>📌E. Continuous Assessment</SubHeading>
  
  <p>
    Continuous assessment shall be done through <strong>essays, tests, term papers, 
    tutorial exercises, quizzes, and homework.</strong>
  </p>

  <p>📊 <strong>Assessment Weight:</strong> Scores from continuous assessments shall be <strong>30%</strong> of the final marks.</p>

  <p>🧪 <strong>Laboratory & Field Studies:</strong> For courses that are laboratory-based (practical) or field studies, 
  continuous assessment shall be based on a student’s <strong>practical reports</strong> or <strong>field reports</strong> and 
  shall constitute <strong>100%</strong> of the final score.</p>

</Section>



<Section>
  <SubHeading>📑F. Examinations, Grading Procedure & Results</SubHeading>

  <SubSubHeading>📝 Examinations</SubSubHeading>
  
  <p>
    In addition to continuous assessment, a <strong>final examination</strong> shall be conducted 
    for every course at the end of each semester.
  </p>

  <p>
    The total scores obtainable for every course, including continuous assessment 
    and the final examination, is <strong>100%</strong>.

  </p>
  <div>
    <p>📊 <strong>Continuous Assessment:</strong> 30%</p>
    <p>📝 <strong>Final Examination:</strong> 70%</p>
    <p>✅ <strong>Total:</strong> 100%</p>
  </div>

  <p>
    Each course shall normally be <strong>completed and examined</strong> at the end of the semester 
    in which it is offered.
  </p>

  <SubSubHeading>🎯 Pass Mark</SubSubHeading>
  <p>📌 The minimum pass mark in any course shall be <strong>50%</strong> and <strong>60%</strong> for thesis.</p>


  <SubSubHeading>📊 Grading System</SubSubHeading>

  <p>
  Grading of courses shall be done by a combination of percentage marks and letter grades translated into a graduated system of Grade Point Equivalents (GPE).  For the purpose of determining a student’s standing at the end of every semester, the Grade Point Average (GPA) system shall be used.  The GPA is computed by dividing the total number of credit points (TCP) by the total number of units (TNU) for all the courses taken in the semester. The credit point for a course is computed by multiplying the number of units for the course by the Grade Point Equivalent of the marks scored in the course. 
  </p>
<br/>
  <p>
  Each course shall be graded out of a maximum of 100 marks and assigned appropriate Grade Point Equivalent as in the following table:
  </p>
  <br/>

<TableContainer>
  <p style={{textAlign:"center", fontSize:"1.3rem"}}> ⇐ Scroll ⇒</p>  
<Table style={{ borderCollapse: "collapse", width: "100%" }}>
    <thead>
      <tr style={{ border: "1px solid black" }}>
        <th style={{ border: "1px solid black", padding: "10px" }}>Credit Units</th>
        <th style={{ border: "1px solid black", padding: "10px" }}>% Scores</th>
        <th style={{ border: "1px solid black", padding: "10px" }}>Letter Grades</th>
        <th style={{ border: "1px solid black", padding: "10px" }}>Grade Points (GP)</th>
        <th style={{ border: "1px solid black", padding: "10px" }}>Average (GPA)</th>
      </tr>
    </thead>
    <tbody>
      <tr style={{ border: "1px solid black" }}>
        <td style={{ border: "1px solid black", padding: "10px" }} rowSpan="4">
          Vary according to contact hours assigned to each course per week per semester, and according to load carried by students.
        </td>
        <td style={{ border: "1px solid black", padding: "10px" }}>70 – 100</td>
        <td style={{ border: "1px solid black", padding: "10px" }}>A</td>
        <td style={{ border: "1px solid black", padding: "10px" }}>5</td>
        <td style={{ border: "1px solid black", padding: "10px" }} rowSpan="4">
          Derived by dividing total number of credit points (TCP) by total number of units (TNU)
        </td>
      </tr>
      <tr style={{ border: "1px solid black" }}>
        <td style={{ border: "1px solid black", padding: "10px" }}>60 – 69</td>
        <td style={{ border: "1px solid black", padding: "10px" }}>B</td>
        <td style={{ border: "1px solid black", padding: "10px" }}>4</td>
      </tr>
      <tr style={{ border: "1px solid black" }}>
        <td style={{ border: "1px solid black", padding: "10px" }}>50 – 59</td>
        <td style={{ border: "1px solid black", padding: "10px" }}>C</td>
        <td style={{ border: "1px solid black", padding: "10px" }}>3</td>
      </tr>
      <tr style={{ border: "1px solid black" }}>
        <td style={{ border: "1px solid black", padding: "10px" }}>0 – 49</td>
        <td style={{ border: "1px solid black", padding: "10px" }}>F</td>
        <td style={{ border: "1px solid black", padding: "10px" }}>0</td>
      </tr>
    </tbody>
  </Table>

</TableContainer>
 


  <SubSubHeading>📢 Presentation of Results</SubSubHeading>
  <p>
    Results from the Postgraduate School Board of Examiners shall be presented to Senate for approval.
  </p>



  <SubSubHeading>📅 Release of Results</SubSubHeading>
  <p>
    Results shall be released/published not later than 2 weeks after approval by the Senate.
  </p>




</Section>


<Section>
  <SubHeading>🎓G. External Examiner System</SubHeading>
  <p>
    The external examiner system shall be used at the end of the PGD, M.Sc., M.Phil., M.Phil/PhD, and Ph.D. programmes to assess the courses and projects.
  </p>
  <p>
    The project shall be subject to an oral examination where the student is required to show evidence that they carried out the work and have pertinent knowledge of the subject matter.
  </p>
</Section>




<Section>
  <SubHeading>📜H. Postgraduate Diploma Classification</SubHeading>
  <p>
    The determination of the PGD shall be based on the Cumulative Grade Point Average (CGPA) earned at the end of the programme.
  </p>


  <br/>
  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
    <thead>
      <tr>
        <th style={{ border: "1px solid black", padding: "8px" }}>Percentage</th>
        <th style={{ border: "1px solid black", padding: "8px" }}>CGPA</th>
        <th style={{ border: "1px solid black", padding: "8px" }}>Remark</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style={{ border: "1px solid black", padding: "8px" }}>40-49.9</td>
        <td style={{ border: "1px solid black", padding: "8px" }}>Below 3.0</td>
        <td style={{ border: "1px solid black", padding: "8px" }}>Fail</td>
      </tr>
      <tr>
        <td style={{ border: "1px solid black", padding: "8px" }}>50-54.9</td>
        <td style={{ border: "1px solid black", padding: "8px" }}>3.0-3.9</td>
        <td style={{ border: "1px solid black", padding: "8px" }}>Credit</td>
      </tr>
      <tr>
        <td style={{ border: "1px solid black", padding: "8px" }}>55-59.9</td>
        <td style={{ border: "1px solid black", padding: "8px" }}>4.0-4.9</td>
        <td style={{ border: "1px solid black", padding: "8px" }}>Merit/Pass</td>
      </tr>
      <tr>
        <td style={{ border: "1px solid black", padding: "8px" }}>60 and above</td>
        <td style={{ border: "1px solid black", padding: "8px" }}>5.0 and above</td>
        <td style={{ border: "1px solid black", padding: "8px" }}>Distinction</td>
      </tr>
    </tbody>
  </table>


</Section>







      </Content>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  padding: 40px;
  max-width: 800px;
  margin: auto;

  @media(max-width:428px){
    padding:40px 5px; 
  }
`;

const Heading = styled.h1`
  text-align: center;
  color: #094c2c;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Section = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SubHeading = styled.h2`
  color: #e44d26;
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const SubSubHeading = styled.h3`
  color: #094c2c;
  font-size: 1.2rem;
  margin-top: 10px;
`;


const Table = styled.table`

`


const TableContainer = styled.div`
  width:100%;
  overflow-x:scroll;
  padding:20px 0px; 
  border:2px solid gray;
`

export default ProgrammePage;
