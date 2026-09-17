



import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Context } from "./Context";
import jsPDF from "jspdf";
import "jspdf-autotable";
import QRCode from "qrcode";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  padding: 2rem 1rem;
  background-color: #f9fff9;
  min-height: 100vh;
  font-family: "Arial", sans-serif;
  max-width: 900px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: green;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Card = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 1.5rem;
`;

const HeaderInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #eef2ef;

  div {
    font-size: 0.95rem;
    color: #333;
    strong {
      color: #006400;
    }
  }
`;

const SectionSubtitle = styled.h4`
  color: #006400;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.4rem;
`;

const CourseGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const CourseCard = styled.div`
  background: #fdfdfd;
  border: 1px solid #e0e8e0;
  border-left: 4px solid #008000;
  padding: 1rem;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CourseDetails = styled.div`
  flex: 1;
  .code-title {
    font-weight: bold;
    color: #222;
    font-size: 1rem;
    margin-bottom: 0.3rem;
  }
  .units {
    font-size: 0.85rem;
    color: #666;
  }
`;

const ScoreBreakdown = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  font-size: 0.9rem;
  color: #444;

  span {
    background: #f0fdf4;
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
    border: 1px solid #d1fae5;
  }

  .total-score {
    font-weight: bold;
    color: #006400;
    background: #e6f4ea;
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const MetricBox = styled.div`
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  padding: 1rem;
  border-radius: 6px;
  text-align: center;

  .label {
    font-size: 0.8rem;
    color: #047857;
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: 0.4rem;
  }

  .values {
    font-size: 0.9rem;
    color: #1f2937;
    display: flex;
    justify-content: space-around;
    gap: 0.5rem;
    
    div {
      display: flex;
      flex-direction: column;
      font-size: 0.85rem;
      span:first-child {
        font-size: 0.7rem;
        color: #666;
      }
    }
  }
`;

const GrandTotalBanner = styled.div`
  background: #e9fce9;
  padding: 1rem;
  border-radius: 6px;
  text-align: right;
  font-weight: bold;
  font-size: 1.1rem;
  color: #006400;
  margin-top: 1rem;
`;

const Message = styled.p`
  text-align: center;
  color: #555;
`;

const Button = styled.button`
  background-color: #008000;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 1.5rem;
  transition: background 0.3s;
  display: block;
  width: 100%;

  &:hover {
    background-color: #006400;
  }
`;

const StudentResult2 = ({id, prevTcp, prevTnu, prevGpa}) => {
  const studentInfo = useSelector((state) => state.studentInfo);
  const studentId2 = studentInfo?.id;
  const semesterId=studentInfo?.selected_semester;
  const { courses, programs, api_url,semesters, isUploadModalOpen, setIsUploadModalOpen } = useContext(Context);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState(null);
  const [allowView, setAllowView] = useState(false);
const location = useLocation();
  
  
    const [studentId, setStudentId]=useState(null);
  
    useEffect(()=>{
      if(window.location.pathname==='/admin'){
        setStudentId(id)
      }else{
        setStudentId(studentId2)
      }
    },[])
  
  
  
  const semester = 2;

  useEffect(() => {
    const fetchSetting = async () => {
      try {
        const res = await axios.get(
          `${api_url}/get_result_setting.php?nocache=${Date.now()}`
        );
        if (res.data.success) setAllowView(res.data.allow_result);
      } catch (err) {
        console.error("Failed to fetch setting", err);
      }
    };

    fetchSetting();
    const interval = setInterval(fetchSetting, 5000);
    return () => clearInterval(interval);
  }, [api_url]);

  // 🔹 Fetch student details
  useEffect(() => {
    if (!studentId) return;
    axios
      .get(`${api_url}/get_student_by_id.php?id=${studentId}`)
      .then((res) => {
        if (res.data.success) setStudent(res.data.student);
      })
      .catch(() => Swal.fire("Error", "Failed to fetch student details", "error"));
  }, [studentId, api_url]);

  // 🔹 Fetch results
  useEffect(() => {
    if (!studentId) return;
    const fetchResults = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${api_url}/get_student_results.php`,
          { params: { student_id: studentId, t: Date.now(), semester_id:semester } }
        );
        if (res.data.success) setResults(res.data.results || []);
        else Swal.fire("Error", res.data.error || "Failed to fetch results.", "error");
      } catch {
        Swal.fire("Error", "Could not connect to the server.", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [studentId, api_url]);

  const programName =
    programs.find((p) => p.id === Number(student?.program))?.name || "—";

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
        credit_unit: course.unit || 0,
        assignment,
        quiz,
        exam,
        total,
      };
    })
    .filter(Boolean);

  // --- PRE-CALCULATED VALUES ---
  const getGradePoint = (score) => {
    if (score >= 70) return 5;
    if (score >= 60) return 4;
    if (score >= 50) return 3;
    if (score >= 45) return 2;
    return 0;
  };

  const currentTNU = groupedResults.reduce((sum, r) => sum + (Number(r.credit_unit) || 0), 0);
  const currentTCP = groupedResults.reduce((sum, r) => {
    const gp = getGradePoint(Number(r.total) || 0);
    return sum + (gp * (Number(r.credit_unit) || 0));
  }, 0);
  const currentGPA = currentTNU > 0 ? (currentTCP / currentTNU).toFixed(2) : "0.00";

  const grandTotal = groupedResults.reduce((sum, r) => sum + (Number(r.total) || 0), 0);

//   const prevTCP = Number(student?.previous_tcp) || 0;
//   const prevTNU = Number(student?.previous_tnu) || 0;
//   const prevGPA = prevTNU > 0 ? (prevTCP / prevTNU).toFixed(2) : "0.00";


  const prevTCP = prevTcp;
  const prevTNU = prevTnu;
  const prevGPA = prevGpa;

  const cumTCP = currentTCP + prevTCP;
  const cumTNU = currentTNU + prevTNU;
  const cumGPA = cumTNU > 0 ? (cumTCP / cumTNU).toFixed(2) : "0.00";

  const courseTotals = groupedResults.map((r) => r.total || "0");

  const payWithPaystack = (amount, onSuccess) => {
    if (!studentInfo?.email) {
      Swal.fire("Error", "Student email not found.", "error");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: "pk_test_60e1f53bba7c80b60029bf611a26a66a9a22d4e4",
      email: studentInfo.email,
      amount: amount * 100,
      currency: "NGN",
      channels: ["card"],
      metadata: {
        custom_fields: [
          {
            display_name: "Student Name",
            variable_name: "student_name",
            value: student?.full_name || "Student",
          },
          {
            display_name: "Purpose",
            variable_name: "purpose",
            value: "Result Download",
          },
        ],
      },
      callback: function () {
        Swal.fire({
          icon: "success",
          title: "Payment Successful",
          text: "Payment confirmed. Generating your result...",
          timer: 2000,
          showConfirmButton: false,
        });
        onSuccess();
      },
      onClose: function () {
        Swal.fire({
          icon: "info",
          title: "Payment Cancelled",
          text: "You must complete payment to download your result.",
        });
      },
    });

    handler.openIframe();
  };

  // --- GENERATE PDF USING PRE-CALCULATED VALUES ---
  const generatePDF = async () => {
    if (groupedResults.length === 0) {
      Swal.fire("No results", "You have no results to download.", "info");
      return;
    }

    const doc = new jsPDF("l", "pt", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Logo (Centered)
    const logo = "/logo.png";
    const logoWidth = 50;
    const logoHeight = 50;
    doc.addImage(logo, "PNG", (pageWidth - logoWidth) / 2, 10, logoWidth, logoHeight);

    // Header Image (Full width)
    const headerImg = "/resultheader.png";
    const headerWidth = pageWidth - 80; 
    const headerHeight = 250; 
    doc.addImage(headerImg, "PNG", 40, 65, headerWidth, headerHeight);

    // Option/Program Title
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(`OPTION: ${programName?.toUpperCase() || "WASTE MANAGEMENT"}`, 40, 340);

    // --- TABLE STRUCTURE ---
    const headerRow1 = [
      { content: 'S/N', rowSpan: 2 },
      { content: 'NAME OF CANDIDATE', rowSpan: 2 },
      { content: 'REGISTRATION NUMBER', rowSpan: 2 },
      { content: 'SEX', rowSpan: 2 },
      ...groupedResults.map(r => ({ content: `${r.code}\n(${r.credit_unit || 0})`, rowSpan: 2 })),
      { content: 'CURRENT', colSpan: 3 },
      { content: 'PREVIOUS', colSpan: 3 },
      { content: 'CUMULATIVE', colSpan: 3 }
    ];

    const headerRow2 = [
      'TCP', 'TNU', 'GPA', 
      'TCP', 'TNU', 'GPA', 
      'TCP', 'TNU', 'GPA'
    ];

    const rows = [
      [
        "1.", 
        student?.full_name?.toUpperCase() || "—", 
        student?.admission_number || "—", 
        student?.sex || "M", 
        ...courseTotals,
        currentTCP, currentTNU, currentGPA,
        prevTCP, prevTNU, prevGPA,
        cumTCP, cumTNU, cumGPA
      ]
    ];

    doc.autoTable({
      head: [headerRow1, headerRow2],
      body: rows,
      startY: 345,
      theme: "grid",
      styles: { 
        fontSize: 7.5, 
        cellPadding: 2, 
        halign: "center", 
        valign: "middle", 
        lineColor: [0, 128, 0],
        lineWidth: 0.5,
        textColor: 0
      },
      headStyles: { 
        fillColor: [255, 255, 255], 
        textColor: [0, 0, 0], 
        fontStyle: "bold",
      },
      columnStyles: {
        1: { halign: "left", cellWidth: 90 },
        2: { cellWidth: 70 }
      }
    });

    // --- SUMMARY & SIGNATURES ---
    const finalY = doc.lastAutoTable.finalY + 40;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");

    doc.text(`SUMMARY: TOTAL: ${grandTotal}     RANGE OF GPA: ${currentGPA}     RANGE OF CGPA: ${cumGPA}`, 40, finalY);

    const sigLineY = finalY + 60;
    doc.setDrawColor(0, 0, 0); 
    doc.setLineWidth(1);
    
    doc.line(40, sigLineY, 300, sigLineY);
    doc.text("AG.DIRECTOR: DR AKINYEMI OGUNKEYEDE", 40, sigLineY + 15);

    const rightSigX = pageWidth - 340;
    doc.line(rightSigX, sigLineY, pageWidth - 40, sigLineY);
    doc.text("DEAN, PG SCHOOL: PROF (MRS) J.E. EMUDIANUGHE", rightSigX, sigLineY + 15);

    // --- QR CODE & FOOTER ---
    const verifyLink = "https://cwmsrfupre.com.ng/resultverification";
    const qrCodeData = await QRCode.toDataURL(verifyLink);
    const qrSize = 60;
    const qrX = pageWidth - 100;
    const qrY = pageHeight - 85; 

    doc.addImage(qrCodeData, "PNG", qrX, qrY, qrSize, qrSize);
    doc.setFontSize(8);
    doc.text("(scan to verify)", qrX + (qrSize/2), qrY + qrSize + 10, { align: "center" });

    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text("Generated by CWMSRFUPRE Portal", pageWidth / 2, pageHeight - 15, { align: "center" });

    doc.save(`Result_${student?.admission_number || "student"}.pdf`);

    Swal.fire({
      icon: "success",
      title: "Download Successful",
      text: "Your result has been Downloaded, Please check your downloads folder.",
    });
  };

  const handleAlert = () => {
    Swal.fire({
      icon: "info",
      text: "Result is not yet opened please try again later"
    });
  };








const handleCheckApprovalAndDownload = async () => {
    if (!allowView) {
      handleAlert();
      return;
    }

    if (!studentId) {
      Swal.fire("Error", "Student ID is missing.", "error");
      return;
    }

      Swal.fire({text:"Please wait..."})
        Swal.showLoading();

    try {
      const res = await axios.get(`${api_url}/check_payment_approval.php`, {
        params: { student_id: studentId, semester_id: semester, t: Date.now() }
      });

      if (res.data.success && res.data.is_approved) {
        // Payment is approved — run the PDF generator function
        generatePDF();
      } else {
        Swal.fire({
          icon: "warning",
          title: "Approval Pending",
          text: "Your payment proof has not been approved by an administrator yet, please ensure that you uploaded the payment proof.",
        });
      }
    } catch (err) {
      Swal.fire("Error", "Could not connect to the server to verify approval status.", "error");
    }
  };








  return (
    <Container>

    <Title style={{marginTop:"50px"}}>Result for {semesters?.find((s) => Number(s.id) === Number(semester))?.name || `Semester ${semester}`}</Title>

      {loading ? (
        <Message>Loading results...</Message>
      ) : groupedResults.length === 0 ? (
        <Message>No results available yet.</Message>
      ) : (
        <>
            {allowView ? (
<>
{window.location.pathname!=='/admin'&&<>
<div>
  <h4 style={{color:"green", textAlign:"center"}}>
    Follow these steps to download your  {semesters?.find((s) => Number(s.id) === Number(semester))?.name || `Semester ${semester}`} Result
  </h4>
  <br/>
</div>
  {/* Step 1: External Remita Payment Link */}
  <p>1. Make Payment for the result.</p>
  <Button 
    as="a" 
    href="https://login.remita.net/remita/onepage/OAGFCRF/biller.spa" 
    target="_blank" 
    rel="noopener noreferrer"
    style={{ textAlign: "center", textDecoration: "none" }}
  >
    Click to Make payment for the result
  </Button>

  {/* Step 2: Upload Proof Modal Trigger */}
  <p>2. Upload proof of payment after you have paid, then wait to be approved.</p>
  <Button
    onClick={() => setIsUploadModalOpen(true)}
    style={{ backgroundColor: "#0284c7" }}
  >
    Click to Upload proof of payment
  </Button>

  {/* Step 3: Backend Approval Check & Download Trigger */}
  <p>3. Download your result after you have been approved.</p>
  <Button 
    onClick={handleCheckApprovalAndDownload}
    style={{ backgroundColor: "#16a34a" }} // Green for success/download
  >
    Click to download official result if you have been approved
  </Button>

</>}
{window.location.pathname==='/admin'&&<Button onClick={generatePDF}>Download Result</Button>}
</>
      
          ) : (
            <h3>
             {semesters?.find((s) => Number(s.id) === Number(semester))?.name || `Semester ${semester}`} Result is not yet available for downloading
            </h3>
          )}

      {window.location.pathname==='/admin'&&<Card>
            <HeaderInfoGrid>
              <div><strong>Candidate Name:</strong> {student?.full_name?.toUpperCase() || "—"}</div>
              <div><strong>Reg Number:</strong> {student?.admission_number || "—"}</div>
              <div><strong>Sex:</strong> {student?.sex || "M"}</div>
              <div><strong>Program:</strong> {programName?.toUpperCase()}</div>
              <div>
  <strong>Year-Semester:</strong>{" "}
  {semesters?.find((s) => Number(s.id) === Number(semester))?.name || `Semester ${semester}`}
</div>
            </HeaderInfoGrid>

            <SectionSubtitle>Course Breakdown</SectionSubtitle>
            <CourseGrid>
              {groupedResults.map((r, i) => (
                <CourseCard key={i}>
                  <CourseDetails>
                    <div className="code-title">{i + 1}. {r.code} - {r.title}</div>
                    <div className="units">Credit Units: {r.credit_unit}</div>
                  </CourseDetails>
                  <ScoreBreakdown>
                    <span>Assignment: <strong>{r.assignment}</strong></span>
                    <span>Quiz: <strong>{r.quiz}</strong></span>
                    <span>Exam: <strong>{r.exam}</strong></span>
                    <span className="total-score">Total: {r.total}</span>
                  </ScoreBreakdown>
                </CourseCard>
              ))}
            </CourseGrid>

            <GrandTotalBanner>
              Grand Total: {grandTotal}
            </GrandTotalBanner>

            <SectionSubtitle style={{ marginTop: "1.5rem" }}>Academic Performance Metrics</SectionSubtitle>
            <MetricsGrid>
              <MetricBox>
                <div className="label">Current Semester</div>
                <div className="values">
                  <div><span>TCP</span><strong>{currentTCP}</strong></div>
                  <div><span>TNU</span><strong>{currentTNU}</strong></div>
                  <div><span>GPA</span><strong>{currentGPA}</strong></div>
                </div>
              </MetricBox>

              <MetricBox>
                <div className="label">Previous Standing</div>
                <div className="values">
                  <div><span>TCP</span><strong>{prevTCP}</strong></div>
                  <div><span>TNU</span><strong>{prevTNU}</strong></div>
                  <div><span>GPA</span><strong>{prevGPA}</strong></div>
                </div>
              </MetricBox>

              <MetricBox>
                <div className="label">Cumulative Standing</div>
                <div className="values">
                  <div><span>TCP</span><strong>{cumTCP}</strong></div>
                  <div><span>TNU</span><strong>{cumTNU}</strong></div>
                  <div><span>CGPA</span><strong>{cumGPA}</strong></div>
                </div>
              </MetricBox>
            </MetricsGrid>
          </Card>}
        </>
      )}
    </Container>
  );
};

export default StudentResult2;