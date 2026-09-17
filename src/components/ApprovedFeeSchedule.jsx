import React from 'react';
import styled from 'styled-components';

// --- STYLED COMPONENTS ---
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin:0 auto;
  padding: 0px;
  max-width:600px;
`;

const Card = styled.div`
  border: 1px solid green;
  border-radius: 6px;
  padding: 15px;
  background-color: whitesmoke;
  box-shadow: 0 2px 4px rgba(0, 128, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionHeader = styled.h3`
  margin: 0px 0px 5px 0px;
  padding: 8px 12px;
  font-size: 15px;
  color: darkgreen;
  background-color: lightgreen;
  border-radius: 4px;
  text-align: center;
`;

const FeeCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FeeItemCard = styled.div`
  background-color: white;
  border: 1px solid #c8e6c9;
  border-radius: 4px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const FeeItemTitle = styled.h4`
  margin: 0;
  font-size: 14px;
  color: darkgreen;
  border-bottom: 1px solid #e8f5e9;
  padding-bottom: 4px;
`;

const FeeDetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #333;

  span:last-child {
    font-weight: 600;
    color: darkgreen;
  }
`;

const GuideIntro = styled.p`
  font-size: 13px;
  color: #333;
  margin: 0;
  line-height: 1.5;
`;

const StepsList = styled.ol`
  margin: 0;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align:left;
`;

const StepItem = styled.li`
  font-size: 13px;
  color: #2c4a3e;
  line-height: 1.4;
  
  strong {
    color: darkgreen;
  }
`;

const NoticeBox = styled.div`
  padding: 10px 12px;
  background-color: #e8f5e9;
  border-left: 4px solid green;
  border-radius: 0 4px 4px 0;
  font-size: 12px;
  color: #1b4332;
  line-height: 1.4;

  a {
    color: darkgreen;
    font-weight: bold;
    text-decoration: underline;
  }
`;

export default function ApprovedFeeSchedule() {
  const feeData = [
    {
      level: "Postgraduate Diploma",
      application: "₦25,000.00",
      tuition: "₦455,000.00",
      total: "₦480,000.00",
      session: "2026-2027"
    },
    {
      level: "Professional Master's Programme",
      application: "₦25,000.00",
      tuition: "₦555,000.00",
      total: "₦580,000.00",
      session: "2026-2027"
    },
    {
      level: "Professional Doctoral Programme",
      application: "₦35,000.00",
      tuition: "₦765,000.00",
      total: "₦800,000.00",
      session: "2026-2027"
    }
  ];

  return (
    <Container>
      <h2 style={{ textAlign: "center", color: "darkgreen", margin: "5px 0" }}>Fee Schedule & Payments</h2>
      
      {/* FEE SCHEDULE CARD LIST */}
      <Card>
        <SectionHeader>Approved Fee Schedule</SectionHeader>
        <FeeCardList>
          {feeData.map((item, index) => (
            <FeeItemCard key={index}>
              <FeeItemTitle>{item.level} ({item.session})</FeeItemTitle>
              <FeeDetailRow>
                <span>Application Fee:</span>
                <span>{item.application}</span>
              </FeeDetailRow>
              <FeeDetailRow>
                <span>Tuition Fee:</span>
                <span>{item.tuition}</span>
              </FeeDetailRow>
              <FeeDetailRow>
                <span>Total Payable:</span>
                <span>{item.total}</span>
              </FeeDetailRow>
            </FeeItemCard>
          ))}
        </FeeCardList>
      </Card>

      {/* REMITA PAYMENT GUIDE CARD */}
      <Card>
        <SectionHeader>How to Pay Through Remita</SectionHeader>
        <GuideIntro>
          Newly admitted students should use the following procedure to pay the applicable application fee, tuition fee, or other approved programme charge through Remita:
        </GuideIntro>
        
        <StepsList>
          <StepItem>Visit <strong>remita.net</strong>.</StepItem>
          <StepItem>Select <strong>Pay Government</strong>.</StepItem>
          <StepItem>Select <strong>Continue as a Guest</strong>.</StepItem>
          <StepItem>Select <strong>Pay Federal Government of Nigeria</strong>.</StepItem>
          <StepItem>Complete the payment page that opens.</StepItem>
          <StepItem>In the institution field, begin typing <strong>Federal University of Petroleum Resources</strong>. Select the University's name when it appears in the suggested list.</StepItem>
          <StepItem>Open the <strong>Name of Service or Purpose of Payment</strong> drop-down menu.</StepItem>
          <StepItem>Select <strong>WASTE MANAGEMENT AND SUSTAINABLE RESOURCES</strong>. Where a specific service is displayed for the fee being paid, select the appropriate payment purpose.</StepItem>
          <StepItem>Enter the remaining required personal and payment details carefully, confirm that all entries are correct and submit the transaction.</StepItem>
          <StepItem>Choose either online payment or payment at a commercial bank. For bank payment, generate and print or save the Remita Retrieval Reference (RRR) and present it at any commercial bank of your choice.</StepItem>
          <StepItem>After payment, retain the Remita receipt and other evidence of payment for verification and student financial records.</StepItem>
          <StepItem>Send the receipt to the centre email: <a href="mailto:wmsr@fupre.edu.ng">wmsr@fupre.edu.ng</a> and upload it on your student page.</StepItem>
        </StepsList>

        <NoticeBox>
          <strong>Payment Verification Note:</strong> Students should ensure that their full name, programme level, payment purpose, and Remita Retrieval Reference (RRR) are clearly shown on the payment evidence submitted to CWMSR.
        </NoticeBox>
      </Card>
    </Container>
  );
}