
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

// ✨ Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  min-height: 100vh;
  background: #f7f9fb;
  padding: 100px 20px 40px; /* top padding for navbar/ticker space */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #0077b6;
  font-weight: 800;
  margin-bottom: 30px;
  text-align: center;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.6s ease-in-out;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  width: 100%;
  max-width: 1000px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${fadeIn} 0.8s ease both;
  border-top: 4px solid #0cc1e0;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
`;

const CardTitle = styled.h2`
  font-size: 1.3rem;
  color: #0cc1e0;
  font-weight: bold;
  margin-bottom: 10px;
`;

const CardContent = styled.p`
  font-size: 1rem;
  color: #333;
  line-height: 1.5;
`;

const BackButton = styled.button`
  background: #0077b6;
  color: white;
  padding: 10px 20px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  margin-top: 30px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: #0cc1e0;
    transform: translateY(-2px);
  }
`;

const Loader = styled.div`
  border: 4px solid #eee;
  border-top: 4px solid #0cc1e0;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 100px auto;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  font-weight: bold;
  margin-top: 20px;
`;

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch(`https://www.cwmsrfupre.com.ng/api/fetch_announcements.php`);
        const data = await res.json();
        if (data.success) {
          setAnnouncements(data.announcements);
        } else {
          setError(data.error || "Failed to load announcements.");
        }
      } catch (err) {
        setError("An error occurred while fetching announcements.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <Container>
      <Title>📢 Latest Announcements</Title>

      {announcements.length === 0 ? (
        <p style={{ color: "#666", fontSize: "1.1rem" }}>No announcements available yet.</p>
      ) : (
        <Grid>
          {announcements.map((item) => (
            <Card key={item.id}>
              <CardTitle>{item.title}</CardTitle>
              <CardContent>{item.content}</CardContent>
            </Card>
          ))}
        </Grid>
      )}

      <BackButton onClick={() => navigate(-1)}>← Go Back</BackButton>
    </Container>
  );
};

export default AnnouncementsPage;
