
import React from 'react';
import styled from 'styled-components';

// --- Styled Component Definitions (MOVED TO TOP) ---
const PageContainer = styled.div`
  font-family: 'Arial', sans-serif;
  color: #333;
  line-height: 1.6;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 40px;
  background-color: #f0f8ff; /* Light blue background */
  padding: 40px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h2 {
    color: #2c3e50;
    font-size: 2rem;
    margin-bottom: 15px;
  }

  p {
    color: #555;
    font-size: 1.2em;
    max-width: 800px;
    margin: 0 auto;
  }
`;

const CourseListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const CourseCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 25px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 15px;
`;

const CourseNumber = styled.span`
  background-color: #3498db; /* Blue */
  color: white;
  font-weight: bold;
  padding: 5px 12px;
  border-radius: 50%;
  font-size: 0.8rem;
  margin-right: 15px;
  min-width: 30px;
  text-align: center;
`;

const CardTitle = styled.h3`
  color: #2980b9; /* Darker blue */
  font-size: 1.6em;
  margin: 0;
  flex-grow: 1;
`;

const CardGoal = styled.p`
  font-weight: bold;
  color: #2c3e50; /* Dark text */
  margin-bottom: 10px;
  font-size: 1.05em;
`;

const CardDescription = styled.p`
  color: #555;
  font-size: 0.95em;
  flex-grow: 1; /* Allows description to take up available space */
  margin-bottom: 15px;
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  margin-top: auto; /* Pushes details to the bottom of the card */
  padding-top: 15px;
  border-top: 1px dashed #eee;
`;

const DetailRow = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allows content to wrap on smaller screens */
  align-items: baseline;
  font-size: 0.9em;
`;

const DetailLabel = styled.span`
  font-weight: bold;
  color: #444;
  margin-right: 5px;
  white-space: nowrap; /* Prevent label from breaking */
`;

const DetailValue = styled.span`
  color: #666;
  flex-grow: 1; /* Allow value to take remaining space */
`;

const WhoShouldAttendSection = styled(DetailRow)`
  margin-top: 10px;
  ${DetailLabel} {
    color: #c0392b; /* Reddish color for emphasis */
  }
  ${DetailValue} {
    color: #333;
  }
`;
// --- End of Styled Component Definitions ---


const coursesData = [
  {
    id: 1,
    goal: "To provide foundational knowledge of waste types, sources, and basic management strategies.",
    contentFormat: "Lectures, interactive quizzes, videos.",
    courseTitle: "Fundamentals of Waste Management",
    duration: "3 days (18 contact hours)",
    format: "Online",
    whoShouldAttend: "New entrants in environmental services, students, facility managers, NGO staff.",
    courseDescription: "This entry-level course introduces participants to the core principles of waste management, including waste classification, sources, environmental impacts, and basic disposal methods. It also covers the waste hierarchy, sustainable practices, and the roles of stakeholders. Designed for beginners, it provides a broad understanding of how waste is generated, handled, treated, and monitored."
  },
  {
    id: 2,
    goal: "To develop practical skills in managing solid waste and implementing recycling programmes.",
    contentFormat: "Workshops, facility case studies, hands-on exercises.",
    courseTitle: "Solid Waste Management and Recycling Strategies",
    duration: "4 days (24 contact hours)",
    format: "Hybrid",
    whoShouldAttend: "Urban waste managers, environmental officers, local government staff, recycling coordinators.",
    courseDescription: "This course provides comprehensive training in solid waste handling, collection, transport, and recycling systems. Participants will learn how to design and implement effective recycling programmes and understand market dynamics for recyclable materials. Practical sessions will explore sorting systems, collection route planning, and community-based recycling models."
  },
  {
    id: 3,
    goal: "To equip participants with knowledge and techniques for managing organic waste through composting.",
    contentFormat: "Hands-on composting demo, lectures, troubleshooting clinics.",
    courseTitle: "Composting and Organic Waste Management Techniques",
    duration: "3 days (18 contact hours)",
    format: "In-person",
    whoShouldAttend: "Agricultural officers, waste handlers, farmers, environmental NGOs.",
    courseDescription: "This course introduces the science and practical application of composting organic waste, including food, garden, and agricultural residues. Participants will explore composting methods, microbial activity, aeration, moisture control, and pathogen reduction. The course also covers how to set up small- and medium-scale composting systems and apply finished compost in agriculture."
  },
  {
    id: 4,
    goal: "To provide strategies for managing electronic waste in line with global environmental standards.",
    contentFormat: "Lectures, regulatory case studies, facility walk-throughs.",
    courseTitle: "E-Waste Management and Sustainable Recycling",
    duration: "3 days (18 contact hours)",
    format: "Hybrid",
    whoShouldAttend: "Electronics recyclers, environmental consultants, IT companies, regulators.",
    courseDescription: "This course focuses on the lifecycle management of electronic waste, including collection, dismantling, data security, recycling, and safe disposal. It highlights toxic components in e-waste, international regulations such as Basel Convention, and extended producer responsibility. Practical sessions will review dismantling techniques and e-waste logistics."
  },
  {
    id: 5,
    goal: "To train participants in the safe identification, handling, and treatment of hazardous waste.",
    contentFormat: "Lectures, hazard classification labs, emergency drills.",
    courseTitle: "Safe Handling and Disposal of Hazardous Waste",
    duration: "4 days (24 contact hours)",
    format: "In-person",
    whoShouldAttend: "Industrial facility managers, safety officers, environmental engineers, emergency responders.",
    courseDescription: "This course covers the classification, storage, transport, and treatment of hazardous waste such as chemicals, batteries, oils, and clinical waste. Participants will learn to conduct hazard identification, risk assessments, and emergency response planning. It includes national and international regulatory frameworks and best practices for compliance."
  },
  {
    id: 6,
    goal: "To promote strategies for reducing waste generation and preventing environmental pollution.",
    contentFormat: "Workshops, audits, behaviour change models.",
    courseTitle: "Waste Minimization and Pollution Prevention Strategies",
    duration: "3 days (18 contact hours)",
    format: "Online",
    whoShouldAttend: "Sustainability managers, industrial process engineers, regulators, corporate environmental officers.",
    courseDescription: "This course teaches proactive techniques for minimizing waste at the source and reducing emissions into air, water, and soil. Topics include process modification, raw material substitution, inventory control, and cleaner production. It emphasizes pollution prevention planning, environmental audits, and lifecycle thinking."
  },
  {
    id: 7,
    goal: "To build capacity in designing and implementing comprehensive, integrated waste management systems.",
    contentFormat: "Lectures, system design simulations, policy framework review.",
    courseTitle: "Integrated Waste Management Planning and Implementation",
    duration: "5 days (30 contact hours)",
    format: "Hybrid",
    whoShouldAttend: "Municipal planners, waste management consultants, infrastructure developers, policy makers.",
    courseDescription: "This course presents an integrated approach to managing various waste streams—solid, liquid, hazardous, and recyclable. Participants will learn how to design waste management systems that are efficient, cost-effective, and environmentally sound. Topics include system planning, stakeholder engagement, facility integration, and performance evaluation."
  },
  {
    id: 8,
    goal: "To provide an in-depth understanding of biodegradable waste treatment processes and technologies.",
    contentFormat: "Lectures, plant tours (virtual), technical comparisons.",
    courseTitle: "Technologies for Biodegradable Waste Treatment",
    duration: "3 days (18 contact hours)",
    format: "Online",
    whoShouldAttend: "Engineers, waste facility operators, researchers, sanitation officers.",
    courseDescription: "This course explores technologies used for the treatment of biodegradable wastes, including anaerobic digestion, aerobic composting, vermicomposting, and bio-drying. It covers the design and operational requirements of each method, as well as challenges such as odour control, moisture management, and energy recovery."
  },
  {
    id: 9,
    goal: "To develop strategies for managing waste in coastal and marine environments.",
    contentFormat: "Case studies, GIS mapping, stakeholder analysis.",
    courseTitle: "Marine and Coastal Waste Management: Solutions for Blue Environments",
    duration: "3 days (18 contact hours)",
    format: "In-person",
    whoShouldAttend: "Coastal managers, marine ecologists, port authorities, environmental NGOs.",
    courseDescription: "This course addresses the sources, impacts, and mitigation of marine and coastal pollution from plastic debris, oil spills, and land-based waste. It emphasizes integrated coastal zone management, marine litter monitoring, and regional action plans. Participants will learn to coordinate local interventions with global marine waste frameworks."
  },
  {
    id: 10,
    goal: "To enhance understanding of waste governance frameworks and legal compliance mechanisms.",
    contentFormat: "Policy brief writing, legislative reviews, stakeholder workshops.",
    courseTitle: "Policy and Legal Frameworks for Waste Management",
    duration: "4 days (24 contact hours)",
    format: "Hybrid",
    whoShouldAttend: "Policy makers, environmental lawyers, regulatory officers, programme managers.",
    courseDescription: "This course provides a detailed overview of national and international policies, laws, and regulatory instruments governing waste management. It covers policy development, legal enforcement, and institutional roles in compliance. Participants will analyse case studies of successful legislation, such as plastic bans, EPR policies, and pollution charges."
  },
  {
    id: 11,
    goal: "To equip participants with the knowledge and skills to identify, evaluate, and implement resource recovery strategies for different waste streams.",
    contentFormat: "Lectures, case studies, field project review, group discussions.",
    courseTitle: "Resource Recovery from Waste: Strategies for Sustainable Reuse",
    duration: "3 days (18 contact hours)",
    format: "Hybrid (Online + In-person)",
    whoShouldAttend: "Environmental professionals, waste management officers, sustainability consultants, municipal planners, and students in environmental sciences.",
    courseDescription: "This course introduces the principles and practices of resource recovery from solid and liquid waste streams. Participants will explore techniques such as composting, biogas production, metal recovery, and water reclamation. The course emphasises circular economy applications, cost-effectiveness, and regulatory considerations. Real-world case studies will be examined to illustrate successful recovery initiatives in industrial, agricultural, and urban settings."
  },
  {
    id: 12,
    goal: "To develop competence in applying LCA methodologies to assess environmental impacts of various waste management strategies.",
    contentFormat: "Software-based training, lectures, data analysis workshops.",
    courseTitle: "Life Cycle Assessment for Sustainable Waste Management",
    duration: "4 days (24 contact hours)",
    format: "Fully Online",
    whoShouldAttend: "Environmental analysts, sustainability officers, researchers, policy makers, and postgraduate students.",
    courseDescription: "This course offers practical training in conducting Life Cycle Assessments (LCA) with a focus on waste management systems. Participants will learn to model the environmental footprint of landfilling, incineration, recycling, and composting using LCA software. The course covers impact categories such as global warming potential, eutrophication, and resource depletion. By the end, attendees will be able to use LCA as a decision-making tool for improving waste systems."
  },
  {
    id: 13,
    goal: "To provide an in-depth understanding of converting waste into usable energy through modern technologies.",
    contentFormat: "Lectures, virtual plant tours, technology reviews.",
    courseTitle: "Waste-to-Energy: Technologies and Applications",
    duration: "3 days (18 contact hours)",
    format: "Hybrid",
    whoShouldAttend: "Energy engineers, waste managers, sustainability consultants, environmental regulators.",
    courseDescription: "This course covers key Waste-to-Energy (WtE) technologies such as incineration, gasification, pyrolysis, and anaerobic digestion. It highlights their principles, system components, energy outputs, and environmental considerations. Participants will gain insights into design, operation, emissions control, and economic viability of WtE systems. Real-life examples from low- and high-income countries will help contextualise their application and scalability."
  },
  {
    id: 14,
    goal: "To empower stakeholders to design and implement inclusive, locally-driven waste management systems.",
    contentFormat: "Interactive workshops, community case studies, role plays.",
    courseTitle: "Community-Based Approaches to Waste Management",
    duration: "2 days (12 contact hours)",
    format: "In-person",
    whoShouldAttend: "Community leaders, NGO staff, local government officers, environmental educators.",
    courseDescription: "This course introduces practical approaches for engaging communities in sustainable waste management. It explores participatory methods, waste segregation at source, low-cost technologies, and public education campaigns. Using case studies from informal settlements and rural areas, participants will design community-driven waste management models that are socially acceptable and environmentally sound."
  },
  {
    id: 15,
    goal: "To deepen understanding of circular economy principles in the context of modern waste management systems.",
    contentFormat: "Lectures, systems mapping exercises, policy analysis.",
    courseTitle: "Circular Economy for Effective Waste Management",
    duration: "4 days (24 contact hours)",
    format: "Online",
    whoShouldAttend: "Sustainability professionals, environmental scientists, policy makers, industry stakeholders.",
    courseDescription: "This course explores how the circular economy framework transforms traditional waste management into regenerative systems. Topics include product design for recyclability, material flow analysis, reverse logistics, and extended producer responsibility. Participants will also review global best practices and emerging circular economy policies that support zero-waste goals."
  },
  {
    id: 16,
    goal: "To build technical and strategic skills for managing plastic waste and improving recycling outcomes.",
    contentFormat: "Technical lectures, recycling facility insights, policy discussion.",
    courseTitle: "Innovative Approaches to Plastic Waste Management and Recycling",
    duration: "3 days (18 contact hours)",
    format: "Hybrid",
    whoShouldAttend: "Recycling operators, environmental regulators, packaging industry professionals, NGOs.",
    courseDescription: "This course provides a comprehensive overview of plastic waste challenges and recycling technologies. Topics include plastic types and their recyclability, collection logistics, mechanical vs chemical recycling, and emerging biodegradable alternatives. The course also covers policy instruments like plastic bans, EPR, and public awareness campaigns that shape plastic waste governance."
  },
  {
    id: 17,
    goal: "To train participants in effective identification, minimisation, and treatment of industrial waste.",
    contentFormat: "Industry case studies, technical lectures, regulatory frameworks.",
    courseTitle: "Industrial Waste Management: Compliance and Control",
    duration: "4 days (24 contact hours)",
    format: "In-person",
    whoShouldAttend: "Environmental compliance officers, industrial engineers, safety managers, consultants.",
    courseDescription: "This course addresses the complexities of managing industrial waste streams, including hazardous and non-hazardous types. Topics include waste auditing, minimisation strategies, treatment technologies (e.g., physical, chemical, biological), and regulatory compliance. Participants will also learn about ISO standards, pollution control technologies, and sustainable production practices."
  },
  {
    id: 18,
    goal: "To enhance capacity for planning and operating efficient municipal solid waste systems.",
    contentFormat: "Lectures, simulations, operational case reviews.",
    courseTitle: "Municipal Solid Waste Management: Planning and Best Practices",
    duration: "5 days (30 contact hours)",
    format: "Hybrid",
    whoShouldAttend: "Municipal officials, urban planners, waste management contractors, civil society actors.",
    courseDescription: "This course offers a holistic view of municipal solid waste (MSW) management, from collection to disposal. It covers system design, route optimization, recycling, landfill operations, and citizen engagement. Participants will learn to integrate environmental, economic, and social factors into MSW planning, with a focus on low-resource urban contexts."
  },
  {
    id: 19,
    goal: "To strengthen institutional capacity to safely manage healthcare waste in line with international standards.",
    contentFormat: "Risk assessments, simulation exercises, WHO guidelines review.",
    courseTitle: "Safe Management of Healthcare Waste: Practices and Protocols",
    duration: "3 days (18 contact hours)",
    format: "In-person",
    whoShouldAttend: "Hospital administrators, environmental health officers, infection control staff, waste handlers.",
    courseDescription: "This course trains participants on the classification, segregation, treatment, and disposal of healthcare waste. Emphasis is placed on infection prevention, worker safety, and regulatory compliance. Methods such as incineration, autoclaving, and secure landfilling are covered, alongside handling protocols for sharps, pharmaceuticals, and radioactive waste."
  },
  {
    id: 20,
    goal: "To expose participants to modern sorting technologies that enhance material recovery from mixed waste streams.",
    contentFormat: "Technical demos, plant tour videos, technology comparisons.",
    courseTitle: "Advanced Waste Sorting and Separation Technologies",
    duration: "2 days (12 contact hours)",
    format: "Online",
    whoShouldAttend: "Recycling facility managers, waste engineers, technology developers, circular economy advocates.",
    courseDescription: "This course introduces state-of-the-art sorting technologies such as optical sorting, AI-driven robotics, magnetic and eddy current separators. It explains how these systems improve efficiency, reduce contamination, and enhance the value of recovered materials. Participants will assess equipment specifications, capital costs, and performance data to inform technology adoption."
  },
];

const ShortCourses2 = () => {
  return (
    <PageContainer>
      <HeroSection>
        <h2>Our Comprehensive Waste Management Courses</h2>
        <p>
          Explore our range of specialized courses designed to equip you with the knowledge and practical skills needed for sustainable waste management practices. From foundational principles to advanced technologies and policy frameworks, our programs cater to diverse needs and expertise levels.
        </p>
      </HeroSection>

      <CourseListContainer>
        {coursesData.map((course) => (
          <CourseCard key={course.id}>
            <CardHeader>
              <CourseNumber>{course.id}</CourseNumber>
              <CardTitle>{course.courseTitle}</CardTitle>
            </CardHeader>
            <CardGoal>Goal: {course.goal}</CardGoal>
            <CardDescription>{course.courseDescription}</CardDescription>
            <DetailsGrid>
              <DetailRow>
                <DetailLabel>Content Format:</DetailLabel>
                <DetailValue>{course.contentFormat}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Duration:</DetailLabel>
                <DetailValue>{course.duration}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Format:</DetailLabel>
                <DetailValue>{course.format}</DetailValue>
              </DetailRow>
              <WhoShouldAttendSection>
                <DetailLabel>Who Should Attend:</DetailLabel>
                <DetailValue>{course.whoShouldAttend}</DetailValue>
              </WhoShouldAttendSection>
            </DetailsGrid>
          </CourseCard>
        ))}
      </CourseListContainer>
    </PageContainer>
  );
};

export default ShortCourses2;