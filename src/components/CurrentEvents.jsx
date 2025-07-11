
import React from 'react';
import styled from 'styled-components';
import imageUrl from '../Images/eet.jpeg'

// --- Styled Components ---

// Container for the entire event card
const EventCard = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  overflow: hidden;
  border: 1px solid #e0e0e0;
`;

// Header section for the organizer information
const OrganizerHeader = styled.div`
  text-align: center;
  margin-bottom: 25px;
  color: #004d40; /* Dark Teal */
`;

const OrganizerTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
  color: #4a4a4a;
`;

const OrganizerName = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #00796b; /* Teal */
  margin-top: 5px;
`;

// Main event title and theme
const EventTitle = styled.h1`
  font-size: 2.5rem;
  color: #333;
  text-align: center;
  margin-bottom: 10px;
  line-height: 1.2;
`;

const EventTheme = styled.p`
  font-size: 1.3rem;
  color: #00695c; /* Darker Teal */
  text-align: center;
  font-style: italic;
  margin-bottom: 30px;
  padding: 0 20px;
`;

// Container for the image and event details
const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-top: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// Image container
const ImageContainer = styled.div`
  flex: 1;
  min-width: 300px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const EventImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
`;

// Details container (Date, Time, Location)
const DetailsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 0;
`;

const InfoBlock = styled.div`
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  gap: 20px;
  color: #333;
`;

const Icon = styled.span`
  font-size: 1.8rem;
  color: #009688; /* Bright Teal */
`;

const InfoText = styled.div`
  h5 {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
    color: #444;
  }
  p {
    font-size: 1rem;
    margin: 5px 0 0 0;
    color: #666;
  }
`;

// Additional details and aim
const EventDescription = styled.div`
  margin-top: 20px;
  padding: 0 10px;
`;

const DescriptionTitle = styled.h4`
  color: #00796b;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 5px;
  margin-bottom: 15px;
`;

const DescriptionText = styled.p`
  line-height: 1.6;
  color: #555;
`;

// Contact Information and Footer
const ContactSection = styled.div`
  margin-top: 40px;
  padding: 20px 30px;
  background-color: #e0f2f1; /* Light Teal background */
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.05);
`;

const ContactInfo = styled.div`
  flex: 1;
  min-width: 250px;
  margin-bottom: 15px;
  color: #004d40;
  
  strong {
    color: #00796b;
  }
  
  p {
    margin: 5px 0;
    font-size: 0.95rem;
  }
`;

const Hashtags = styled.div`
  flex: 1;
  text-align: right;
  min-width: 250px;
  color: #004d40;

  @media (max-width: 600px) {
    text-align: center;
  }
`;

const HashtagSpan = styled.span`
  background-color: #00796b;
  color: #ffffff;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-right: 8px;
`;

// --- CurrentEvents Component ---

const CurrentEvents = () => {
  // Placeholder image URL (A relevant image representing sustainability/waste management)
//   const imageUrl = 'https://images.unsplash.com/photo-1549704257-a129d2f2d9c0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  return (
    <EventCard>
      {/* Organizer Information Header */}
      <OrganizerHeader>
        <OrganizerTitle>From the Office of the Director</OrganizerTitle>
        <OrganizerName>
          Centre for Waste Management and Sustainable Resources
        </OrganizerName>
        <OrganizerTitle>
          Federal University of Petroleum Resources, Effurun
        </OrganizerTitle>
      </OrganizerHeader>

      {/* Main Event Title and Theme */}
      <EventTitle>
        Round Table Discussion on Plastic Waste Management in Delta State!
      </EventTitle>
      <EventTheme>
        "Towards a Circular and Inclusive Approach to Plastic Waste Management in Delta State."
      </EventTheme>

      {/* Main Content: Image and Details */}
      <ContentWrapper>
        <ImageContainer>
          <EventImage src={imageUrl} alt="Plastic Waste Management Discussion" />
        </ImageContainer>

        <DetailsContainer>
          {/* Date */}
          <InfoBlock>
            <Icon>📅</Icon>
            <InfoText>
              <h5>Date</h5>
              <p>3rd July 2025</p>
            </InfoText>
          </InfoBlock>

          {/* Time */}
          <InfoBlock>
            <Icon>⏰</Icon>
            <InfoText>
              <h5>Time</h5>
              <p>10:00 AM - 3:00 PM</p>
            </InfoText>
          </InfoBlock>

          {/* Location */}
          <InfoBlock>
            <Icon>📍</Icon>
            <InfoText>
              <h5>Location</h5>
              <p>FUPRE Main Auditorium</p>
            </InfoText>
          </InfoBlock>
        </DetailsContainer>
      </ContentWrapper>

      {/* Event Description/Aim */}
      <EventDescription>
        <DescriptionTitle>Event Aim</DescriptionTitle>
        <DescriptionText>
          The aim of this meeting is to bring together stakeholders to discuss and develop sustainable strategies for managing plastic waste effectively. Join us to explore innovative solutions for a cleaner future!
        </DescriptionText>
      </EventDescription>

      {/* Contact Information and Hashtags Footer */}
      <ContactSection>
        <ContactInfo>
          <p><strong>For more info, contact:</strong></p>
          <p>📞 +2348119317782 / +2349030223041</p>
          <p>✉️ <a href="mailto:wmsr@fupre.edu.ng" style={{ color: '#00796b', textDecoration: 'none' }}>wmsr@fupre.edu.ng</a></p>
          <p>🌐 <a href="http://www.cwmsrfupre.com.ng" target="_blank" rel="noopener noreferrer" style={{ color: '#00796b', textDecoration: 'none' }}>www.cwmsrfupre.com.ng</a></p>
        </ContactInfo>
        <Hashtags>
          <p>Let’s work together for a zero-waste Delta State!</p>
          {/* <HashtagSpan>#PlasticWaste</HashtagSpan>
          <HashtagSpan>#Sustainability</HashtagSpan>
          <HashtagSpan>#FUPRE</HashtagSpan> */}
        </Hashtags>
      </ContactSection>
    </EventCard>
  );
};

export default CurrentEvents;