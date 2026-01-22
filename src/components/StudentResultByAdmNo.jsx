// import React, { useState, useContext, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import styled from "styled-components";
// import { Context } from "./Context"; // 🔹 adjust the import path

// // --- Styled Components ---
// const Container = styled.div`
//   padding: 2rem 1rem;
//   background-color: #f9fff9;
//   min-height: 100vh;
//   font-family: "Arial", sans-serif;
// `;

// const Title = styled.h2`
//   color: green;
//   text-align: center;
//   margin-bottom: 1rem;
// `;

// const InputBox = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-bottom: 1.5rem;

//   input {
//     padding: 0.7rem;
//     width: 280px;
//     border: 1px solid #ccc;
//     border-radius: 6px;
//     margin-right: 10px;
//   }

//   button {
//     background-color: #008000;
//     color: white;
//     border: none;
//     padding: 0.7rem 1.5rem;
//     border-radius: 6px;
//     font-weight: bold;
//     cursor: pointer;
//   }

//   button:hover {
//     background-color: #006400;
//   }
// `;

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   background: white;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

//   th,
//   td {
//     padding: 0.8rem;
//     text-align: left;
//     border-bottom: 1px solid #eee;
//   }

//   th {
//     background-color: #008000;
//     color: white;
//   }
// `;

// const Message = styled.p`
//   text-align: center;
//   color: #333;
//   font-weight: bold;
// `;

// const Button = styled.button`
//   background-color: #008000;
//   color: white;
//   border: none;
//   padding: 0.7rem 1.5rem;
//   border-radius: 6px;
//   cursor: pointer;
//   margin-bottom: 1rem;
//   font-weight: bold;

//   &:hover {
//     background-color: #006400;
//   }
// `;

// // --- Component ---
// const StudentResultByAdmNo = () => {
//   const { courses, categories, programs } = useContext(Context);
//   const [admNo, setAdmNo] = useState("");
//   const [student, setStudent] = useState(null);
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // 🔹 Fetch data by admission number
//   const fetchResults = async () => {
//     if (!admNo.trim()) {
//       Swal.fire("Input Required", "Please enter a valid admission number.", "info");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await axios.get(
//         "https://www.cwmsrfupre.com.ng/api/get_student_results_by_admno.php",
//         { params: { admission_number: admNo.trim() } }
//       );

//       if (res.data.success) {
//         setStudent(res.data.student);
//         setResults(res.data.results || []);
//       } else {
//         Swal.fire("Error", res.data.error || "No record found.", "error");
//         setStudent(null);
//         setResults([]);
//       }
//     } catch {
//       Swal.fire("Error", "Failed to connect to the server.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔹 Get program name from context
//   const programName =
//     programs.find((p) => p.id === Number(student?.program))?.name || "—";

//   // 🔹 Group results by course and category
//   const groupedResults = courses
//     .map((course) => {
//       const courseResults = results.filter(
//         (r) => Number(r.course_id) === Number(course.id)
//       );
//       if (courseResults.length === 0) return null;

//       const getScore = (catName) => {
//         const cat = categories.find(
//           (c) => c.name.toLowerCase() === catName.toLowerCase()
//         );
//         if (!cat) return 0;
//         const catResults = courseResults.filter(
//           (r) => Number(r.category_id) === Number(cat.id)
//         );
//         return catResults.reduce((sum, r) => sum + (Number(r.score) || 0), 0);
//       };

//       const assignment = getScore("assignment");
//       const quiz = getScore("quiz");
//       const exam = getScore("exam");
//       const total = assignment + quiz + exam;

//       return {
//         code: course.code,
//         title: course.title,
//         assignment,
//         quiz,
//         exam,
//         total,
//       };
//     })
//     .filter(Boolean);

//   const grandTotal = groupedResults.reduce((acc, r) => acc + r.total, 0);

//   // 🔹 Generate PDF
//   const generatePDF = () => {
//     if (groupedResults.length === 0) {
//       Swal.fire("No results", "No results to download.", "info");
//       return;
//     }

//     const doc = new jsPDF("p", "pt", "a4");
//     const pageWidth = doc.internal.pageSize.getWidth();

//     // Add logo
//     const logo = "/logo2.png";
//     const logoWidth = 300;
//     const logoHeight = 60;
//     const logoX = (pageWidth - logoWidth) / 2;
//     doc.addImage(logo, "PNG", logoX, 40, logoWidth, logoHeight);

//     // Title
//     doc.setFontSize(18);
//     doc.setFont("helvetica", "bold");
//     doc.setTextColor(0, 128, 0);
//     doc.text("STUDENT RESULT", pageWidth / 2, 130, { align: "center" });

//     // Student Info
//     doc.setFontSize(11);
//     doc.setTextColor(0, 128, 0);
//     doc.text(`Name: ${student?.full_name || "—"}`, 40, 160);
//     doc.text(`Admission No: ${student?.admission_number || admNo}`, 40, 180);
//     doc.text(`Program: ${programName}`, 40, 200);
//     doc.text(`Level: ${student?.level || "Default"}`, 40, 220);
//     doc.text(`Date Issued: ${new Date().toLocaleDateString()}`, 40, 240);

//     // Table
//     const columns = ["S/N", "Course", "Assignment", "Quiz", "Exam", "Total"];
//     const rows = groupedResults.map((r, i) => [
//       i + 1,
//       `${r.code} - ${r.title}`,
//       r.assignment,
//       r.quiz,
//       r.exam,
//       r.total,
//     ]);

//     doc.autoTable({
//       head: [columns],
//       body: rows,
//       startY: 270,
//       theme: "grid",
//       headStyles: { fillColor: [0, 128, 0], textColor: 255 },
//       bodyStyles: { textColor: 20 },
//       styles: { fontSize: 10, halign: "center" },
//       columnStyles: { 1: { halign: "left", cellWidth: 180 } },
//       alternateRowStyles: { fillColor: [245, 255, 245] },
//     });

//     const finalY = doc.lastAutoTable.finalY + 30;
//     doc.setFont("helvetica", "bold");
//     doc.setTextColor(0, 128, 0);
//     doc.text(`GRAND TOTAL: ${grandTotal}`, 40, finalY);
//     doc.text(
//       `AVERAGE: ${(grandTotal / groupedResults.length).toFixed(2)}%`,
//       250,
//       finalY
//     );

//     doc.setFontSize(9);
//     doc.setTextColor(100);
//     doc.text("Generated by CWMSRFUPRE Portal", 200, 820);

//     doc.save(`Result_${student?.admission_number || admNo}.pdf`);
//   };

//   return (
//     <Container>
//       <Title>Check Result by Admission Number</Title>

//       <InputBox>
//         <input
//           type="text"
//           placeholder="Enter Admission Number..."
//           value={admNo}
//           onChange={(e) => setAdmNo(e.target.value)}
//         />
//         <button onClick={fetchResults}>Search</button>
//       </InputBox>

//       {loading ? (
//         <Message>Loading results...</Message>
//       ) : groupedResults.length === 0 ? (
//         <Message>No results found.</Message>
//       ) : (
//         <>
//           <Button onClick={generatePDF}>Download Result as PDF</Button>

//           <Table>
//             <thead>
//               <tr>
//                 <th>Course</th>
//                 <th>Assignment</th>
//                 <th>Quiz</th>
//                 <th>Exam</th>
//                 <th>Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               {groupedResults.map((r, i) => (
//                 <tr key={i}>
//                   <td>{`${r.code} - ${r.title}`}</td>
//                   <td>{r.assignment}</td>
//                   <td>{r.quiz}</td>
//                   <td>{r.exam}</td>
//                   <td>
//                     <strong style={{ color: "green" }}>{r.total}</strong>
//                   </td>
//                 </tr>
//               ))}
//               <tr style={{ background: "#e9fce9", fontWeight: "bold" }}>
//                 <td colSpan="4" style={{ textAlign: "right" }}>
//                   Grand Total
//                 </td>
//                 <td>{grandTotal}</td>
//               </tr>
//             </tbody>
//           </Table>
//         </>
//       )}
//     </Container>
//   );
// };

// export default StudentResultByAdmNo;







import React, { useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import styled from "styled-components";
import { Context } from "./Context";
import QRCode from "qrcode"; // ✅ Import QRCode

// --- Styled Components ---
const Container = styled.div`
  padding: 2rem 1rem;
  background-color: #f9fff9;
  min-height: 100vh;
  font-family: "Arial", sans-serif;
`;

const Title = styled.h2`
  color: green;
  text-align: center;
  margin-bottom: 1rem;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;

  input {
    padding: 0.7rem;
    width: 280px;
    border: 1px solid #ccc;
    border-radius: 6px;
    margin-right: 10px;
  }

  button {
    background-color: #008000;
    color: white;
    border: none;
    padding: 0.7rem 1.5rem;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
  }

  button:hover {
    background-color: #006400;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  th,
  td {
    padding: 0.8rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background-color: #008000;
    color: white;
  }
`;

const Message = styled.p`
  text-align: center;
  color: #333;
  font-weight: bold;
`;

const Button = styled.button`
  background-color: #008000;
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 1rem;
  font-weight: bold;

  &:hover {
    background-color: #006400;
  }
`;

// --- Component ---
const StudentResultByAdmNo = () => {
  const { courses, categories, programs } = useContext(Context);
  const [admNo, setAdmNo] = useState("");
  const [student, setStudent] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch data by admission number
  const fetchResults = async () => {
    if (!admNo.trim()) {
      Swal.fire("Input Required", "Please enter a valid admission number.", "info");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(
        "https://www.cwmsrfupre.com.ng/api/get_student_results_by_admno.php",
        { params: { admission_number: admNo.trim() } }
      );

      if (res.data.success) {
        setStudent(res.data.student);
        setResults(res.data.results || []);
      } else {
        Swal.fire("Error", res.data.error || "No record found.", "error");
        setStudent(null);
        setResults([]);
      }
    } catch {
      Swal.fire("Error", "Failed to connect to the server.", "error");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Get program name from context
  const programName =
    programs.find((p) => p.id === Number(student?.program))?.name || "—";

  // 🔹 Group results by course and category
  // const groupedResults = courses
  //   .map((course) => {
  //     const courseResults = results.filter(
  //       (r) => Number(r.course_id) === Number(course.id)
  //     );
  //     if (courseResults.length === 0) return null;

  //     const getScore = (catName) => {
  //       const cat = categories.find(
  //         (c) => c.name.toLowerCase() === catName.toLowerCase()
  //       );
  //       if (!cat) return 0;
  //       const catResults = courseResults.filter(
  //         (r) => Number(r.category_id) === Number(cat.id)
  //       );
  //       return catResults.reduce((sum, r) => sum + (Number(r.score) || 0), 0);
  //     };

  //     const assignment = getScore("assignment");
  //     const quiz = getScore("quiz");
  //     const exam = getScore("exam");
  //     const total = assignment + quiz + exam;

  //     return {
  //       code: course.code,
  //       title: course.title,
  //       assignment,
  //       quiz,
  //       exam,
  //       total,
  //     };
  //   })
  //   .filter(Boolean);


  const groupedResults = courses
  .map((course) => {
    const courseResults = results.filter(
      (r) => Number(r.course_id) === Number(course.id)
    );
    if (courseResults.length === 0) return null;

    const getScoreById = (categoryId) => {
      const catResults = courseResults.filter(
        (r) => Number(r.category_id) === Number(categoryId)
      );
      return catResults.reduce(
        (sum, r) => sum + (Number(r.score) || 0),
        0
      );
    };

    const assignment = getScoreById(1);
    const quiz = getScoreById(2);
    const exam = getScoreById(3);
    const total = assignment + quiz + exam;

    return {
      code: course.code,
      title: course.title,
      assignment,
      quiz,
      exam,
      total,
    };
  })
  .filter(Boolean);


  const grandTotal = groupedResults.reduce((acc, r) => acc + r.total, 0);

  // 🔹 Generate PDF (with QR code)
  const generatePDF = async () => {
    if (groupedResults.length === 0) {
      Swal.fire("No results", "No results to download.", "info");
      return;
    }

    const doc = new jsPDF("p", "pt", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();

    // Add logo
    const logo = "/logo2.png";
    const logoWidth = 300;
    const logoHeight = 60;
    const logoX = (pageWidth - logoWidth) / 2;
    doc.addImage(logo, "PNG", logoX, 40, logoWidth, logoHeight);

    // Title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 128, 0);
    doc.text("STUDENT RESULT", pageWidth / 2, 130, { align: "center" });

    // Student Info
    doc.setFontSize(11);
    doc.setTextColor(0, 128, 0);
    doc.text(`Name: ${student?.full_name || "—"}`, 40, 160);
    doc.text(`Admission No: ${student?.admission_number || admNo}`, 40, 180);
    doc.text(`Program: ${programName}`, 40, 200);
    // doc.text(`Level: ${student?.level || "Default"}`, 40, 220);
    doc.text(`Date Issued: ${new Date().toLocaleDateString()}`, 40, 220);

    // Table
    const columns = ["S/N", "Course", "Assignment", "Quiz", "Exam", "Total"];
    const rows = groupedResults.map((r, i) => [
      i + 1,
      `${r.code} - ${r.title}`,
      r.assignment,
      r.quiz,
      r.exam,
      r.total,
    ]);

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 270,
      theme: "grid",
      headStyles: { fillColor: [0, 128, 0], textColor: 255 },
      bodyStyles: { textColor: 20 },
      styles: { fontSize: 10, halign: "center" },
      columnStyles: { 1: { halign: "left", cellWidth: 180 } },
      alternateRowStyles: { fillColor: [245, 255, 245] },
    });

    const finalY = doc.lastAutoTable.finalY + 30;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 128, 0);
    doc.text(`GRAND TOTAL: ${grandTotal}`, 40, finalY);
    doc.text(
      `AVERAGE: ${(grandTotal / groupedResults.length).toFixed(2)}%`,
      250,
      finalY
    );

    // ✅ Generate QR Code (with admission number in the URL)
    const verifyLink = `https://www.cwmsrfupre.com.ng/resultverification`;
    const qrCodeData = await QRCode.toDataURL(verifyLink);
    const qrSize = 80;
    const qrX = (pageWidth - qrSize) / 2;
    const qrY = 720;

    doc.addImage(qrCodeData, "PNG", qrX, qrY, qrSize, qrSize);
    doc.setFontSize(9);
    doc.setTextColor(80);
    doc.text("(scan to verify)", pageWidth / 2, qrY + qrSize + 6, {
      align: "center",
    });

    // Footer
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text("Generated by CWMSRFUPRE Portal", pageWidth / 2, 830, {
      align: "center",
    });

    doc.save(`Result_${student?.admission_number || admNo}.pdf`);
  };

  return (
    <Container>
      <Title>Check Result by Admission Number</Title>

      <InputBox>
        <input
          type="text"
          placeholder="Enter Admission Number..."
          value={admNo}
          onChange={(e) => setAdmNo(e.target.value)}
        />
        <button onClick={fetchResults}>Search</button>
      </InputBox>

      {loading ? (
        <Message>Loading results...</Message>
      ) : groupedResults.length === 0 ? (
        <Message>No results found.</Message>
      ) : (
        <>
          <Button onClick={generatePDF}>Download Result as PDF</Button>

          <Table>
            <thead>
              <tr>
                <th>Course</th>
                <th>Assignment</th>
                <th>Quiz</th>
                <th>Exam</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {groupedResults.map((r, i) => (
                <tr key={i}>
                  <td>{`${r.code} - ${r.title}`}</td>
                  <td>{r.assignment}</td>
                  <td>{r.quiz}</td>
                  <td>{r.exam}</td>
                  <td>
                    <strong style={{ color: "green" }}>{r.total}</strong>
                  </td>
                </tr>
              ))}
              <tr style={{ background: "#e9fce9", fontWeight: "bold" }}>
                <td colSpan="4" style={{ textAlign: "right" }}>
                  Grand Total
                </td>
                <td>{grandTotal}</td>
              </tr>
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default StudentResultByAdmNo;
