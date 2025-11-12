import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

// 🔁 Continuous scrolling keyframes
const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const TickerContainer = styled.div`
  width: 100%;
  overflow: hidden;
  background: linear-gradient(90deg, #0cc1e0, #0077b6);
  color: white;
  font-weight: bold;
  position: fixed;
  bottom: 5px;
  left: 0;
  z-index: 9999;
  padding: 10px 0;
  display: flex;
  align-items: center;
  font-family: "Arial", sans-serif;
`;

const TickerTrack = styled.div`
  display: flex;
  width: max-content;
  animation: ${scroll} 40s linear infinite; /* speed controlled here */
  transition: animation-play-state 0.3s ease;

  &:hover {
    animation-play-state: paused;
  }
`;

const TickerText = styled.span`
  white-space: nowrap;
  font-size: 1.3rem;
  margin-right: 3rem;
  text-shadow: 0px 0px 6px rgba(0, 0, 0, 1);
`;

const MoreLink = styled.span`
  color: yellow;
  text-decoration: underline;
  cursor: pointer;
  margin-left: 10px;
  font-weight: 600;

  &:hover {
    color: #fff;
  }
`;

const AnnouncementTicker = () => {
  const [latest, setLatest] = useState(null);
  const navigate = useNavigate();

useEffect(() => {
  const fetchLatest = async () => {
    try {
      const res = await fetch(`https://www.cwmsrfupre.com.ng/api/fetch_announcements.php`);
      const data = await res.json();

      if (data.success && data.announcements.length > 0) {
        // Reverse the array so latest is first
        const reversed = [...data.announcements].reverse();
        setLatest(reversed[0]); // latest announcement
      } else {
        setLatest(null); // no announcements, hide ticker
      }
    } catch (err) {
      console.error("Failed to fetch announcements", err);
      setLatest(null); // optionally clear on error
    }
  };

  fetchLatest();

  const intervalId = setInterval(fetchLatest, 5000); // every 3 minutes

  return () => clearInterval(intervalId);
}, []);


  if (!latest) return null;

  const message = `🗞️ ${latest.title}: ${latest.content}   |   Click here for more announcements →`;

  return (
    <TickerContainer>
      <TickerTrack>
        {/* Duplicate text for seamless infinite scrolling */}
        <TickerText>
          {message.split("Click here")[0]}
          <MoreLink onClick={() => navigate("/announcements")}>Click here for more announcements →</MoreLink>
        </TickerText>
        <TickerText>
          {message.split("Click here")[0]}
          <MoreLink onClick={() => navigate("/announcements")}>Click here for more announcements →</MoreLink>
        </TickerText>
      </TickerTrack>
    </TickerContainer>
  );
};

export default AnnouncementTicker;
