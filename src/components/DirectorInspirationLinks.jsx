
import React from "react";
import styled from "styled-components";
import { FaExternalLinkAlt } from "react-icons/fa";
import bgPattern from "../Images/29559.jpg"; // Optional background image

const DirectorInspirationLinks = () => {
  return (
    <Wrapper>
      <Title>🗞️ Thought Leadership in Action</Title>
      <Subtitle>
        Dr. Ogunkeyede, Acting Director of CWMSR, is inspiring a new era of environmental reform. Dive into his thought-provoking articles and interviews that are making waves in national conversations.
      </Subtitle>

      <LinkCards>
        <Card href="https://freshfactsnews.com.ng/2025/02/08/varsity-don-urges-governments-to-embrace-waste-management-strategy/" target="_blank">
          <h3>🌍 Embracing Waste Management Strategy</h3>
          <p>
            "Governments must begin to prioritize waste as a resource and not just a problem," says Dr. Ogunkeyede. A must-read on forward-thinking environmental leadership.
          </p>
          <span>Read More <FaExternalLinkAlt /></span>
        </Card>

        <Card href="https://distinctnewslive.blogspot.com/2025/02/varsity-don-urges-governments-to.html?m=1" target="_blank">
          <h3>♻️ National Call to Action on Sustainability</h3>
          <p>
            In this powerful blog feature, the Director emphasizes collaboration between government, academia, and private stakeholders to drive sustainable change.
          </p>
          <span>Read More <FaExternalLinkAlt /></span>
        </Card>
      </LinkCards>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: url(${bgPattern}) center/cover no-repeat;
  background-color: #e6f5e9;
  padding: 4rem 2rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #0c5b34;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  max-width: 800px;
  margin: 1rem auto 3rem;
  color: #2e3d2e;
`;

const LinkCards = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

const Card = styled.a`
  display: block;
  padding: 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  text-align: left;
  color: #0c5b34;
  text-decoration: none;
  transition: all 0.3s ease;

  h3 {
    color: #ff6600;
    margin-bottom: 0.5rem;
  }

  p {
    color: #2c3d2c;
    margin-bottom: 1rem;
  }

  span {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: #0c5b34;
    font-weight: bold;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
`;

export default DirectorInspirationLinks;
