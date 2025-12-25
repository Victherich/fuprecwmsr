// App.js
import React from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useState } from "react";

/* ---------- layout ---------- */
const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 0 20px;
  font-family: "Poppins", sans-serif;
  color: #14532d; /* deep green */
`;

/* ---------- hero ---------- */
const HeroSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 120px 20px;
  color: white;

  background-image:
    linear-gradient(
      rgba(20, 83, 45, 0.75),
      rgba(20, 83, 45, 0.75)
    ),
    url("https://images.unsplash.com/photo-1501004318641-b39e6451bec6");

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: 768px) {
    padding: 90px 20px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.2rem;
  margin-bottom: 20px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2.3rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 750px;
  opacity: 0.95;
`;

/* ---------- activities ---------- */
const ActivitiesSection = styled.section`
  padding: 80px 20px;
  background: #ffffff;
`;

const ActivitiesTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: #166534;
`;

const ActivitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
`;

const ActivityCard = styled.div`
  background: #ecfdf5;
  padding: 24px;
  border-radius: 16px;
  text-align: center;
  border: 1px solid #bbf7d0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 30px rgba(20, 83, 45, 0.15);
  }
`;

const ActivityTitle = styled.h3`
  font-size: 1.1rem;
  color: #14532d;
`;

/* ---------- form ---------- */
const FormSection = styled.section`
  padding: 90px 20px;
  background: #f0fdf4;
`;

const FormTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: #166534;
`;

const Form = styled.form`
  max-width: 600px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Input = styled.input`
  padding: 15px;
  border-radius: 12px;
  border: 1px solid #86efac;
  font-size: 1rem;
  background: white;

  &:focus {
    outline: none;
    border-color: #22c55e;
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2);
  }
`;

const Button = styled.button`
  padding: 16px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #22c55e, #15803d);
  color: white;
  font-size: 1.15rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(21, 128, 61, 0.35);
  }
`;

export default function ZeroWastePage() {
  const activities = [
    "Teaching Creativity Around Waste",
    "Advocacy",
    "Skill Development",
    "Competition",
    "Inter-University Activities",
    "Intra-University Activities",
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    level: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Submitting...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, value)
      );

      const res = await fetch(
        "https://cwmsrfupre.com.ng/api/register_student.php",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();

      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Success 🎉",
          text: result.message,
        });

        setFormData({
          name: "",
          email: "",
          phone: "",
          department: "",
          level: "",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: result.message || "Something went wrong",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Please try again later",
      });
    }
  };

  return (
    <>
      <HeroSection>
        <HeroTitle>ZERO WASTE CLUB</HeroTitle>
        <HeroSubtitle>
          Empowering students to build a cleaner, greener future.
        </HeroSubtitle>
      </HeroSection>

      <ActivitiesSection>
        <Container>
          <ActivitiesTitle>Our Activities</ActivitiesTitle>
          <ActivitiesGrid>
            {activities.map((activity, index) => (
              <ActivityCard key={index}>
                <ActivityTitle>{activity}</ActivityTitle>
              </ActivityCard>
            ))}
          </ActivitiesGrid>
        </Container>
      </ActivitiesSection>

      <FormSection>
        <Container>
          <FormTitle>Student Registration</FormTitle>
          <Form onSubmit={handleSubmit}>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
            />
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
            />
            <Input
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Department"
              required
            />
            <Input
              name="level"
              value={formData.level}
              onChange={handleChange}
              placeholder="Level"
              required
            />
            <Button type="submit">Join the Club 🌱</Button>
          </Form>
        </Container>
      </FormSection>
    </>
  );
}