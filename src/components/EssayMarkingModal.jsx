
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";

/* ================= STYLES ================= */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
`;

const Modal = styled.div`
  background: #fff;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 14px;
  padding: 25px 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.35);
`;

const Title = styled.h2`
  text-align: center;
  color: #2ecc71;
  margin-bottom: 20px;
`;

const QuestionBlock = styled.div`
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
`;

const QuestionText = styled.p`
  font-weight: 700;
  margin-bottom: 8px;
`;

const Label = styled.p`
  font-weight: 600;
  margin: 8px 0 4px;
`;

const TextBox = styled.div`
  background: #f7f7f7;
  border-radius: 6px;
  padding: 12px;
  font-size: 0.9rem;
  line-height: 1.5;
  white-space: pre-wrap;
`;

const ScoreRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
`;

const ScoreInput = styled.input`
  width: 120px;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: #2ecc71;
  }
`;

const TotalScore = styled.h3`
  text-align: right;
  color: #0a4d24;
  margin-top: 20px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 25px;
`;

const Button = styled.button`
  padding: 9px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;

  background: ${(p) => (p.cancel ? "#ccc" : "#2ecc71")};
  color: ${(p) => (p.cancel ? "#000" : "#fff")};

  &:hover {
    background: ${(p) => (p.cancel ? "#aaa" : "#27ae60")};
  }
`;

/* ================= COMPONENT ================= */

const EssayMarkingModal = ({
  submission,
  lecturerId,
  onClose,
  onSaved,
}) => {
  const [questions, setQuestions] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ESSAY ================= */
  useEffect(() => {
    const fetchEssay = async () => {
      try {
        const res = await axios.get(
          "https://www.cwmsrfupre.com.ng/api/get_essay_submission_for_marking.php",
          {
            params: { submission_id: submission.submission_id },
            headers: {
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
            },
          }
        );

        if (res.data.success) {
          setQuestions(res.data.questions);
          calculateTotal(res.data.questions);
        }
      } catch (err) {
        Swal.fire("Error", "Failed to load essay submission", "error");
        onClose();
      } finally {
        setLoading(false);
      }
    };

    fetchEssay();
  }, [submission]);

  /* ================= HELPERS ================= */
  const calculateTotal = (qs) => {
    const total = qs.reduce((sum, q) => sum + Number(q.score || 0), 0);
    setTotalScore(total);
  };

  const handleScoreChange = (qid, value, max) => {
    const score = Math.min(Math.max(Number(value), 0), max);

    const updated = questions.map((q) =>
      q.question_id === qid ? { ...q, score } : q
    );

    setQuestions(updated);
    calculateTotal(updated);
  };

  /* ================= SAVE ================= */
  const saveMarks = async () => {
    try {
      await axios.post(
        "https://www.cwmsrfupre.com.ng/api/mark_essay_submission.php",
        {
          submission_id: submission.submission_id,
          lecturer_id: lecturerId,
          answers: questions.reduce((acc, q) => {
            acc[q.question_id] = {
              answer: q.student_answer,
              score: q.score,
            };
            return acc;
          }, {}),
        },
        {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        }
      );

      Swal.fire("Success", "Essay marked successfully", "success");
      onSaved();
      onClose();
    } catch (err) {
      Swal.fire("Error", "Failed to save marks", "error");
    }
  };

  /* ================= RENDER ================= */
  return (
    <Overlay>
      <Modal>
        <Title>Essay Marking</Title>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {questions.map((q, i) => (
              <QuestionBlock key={q.question_id}>
                <QuestionText>
                  Q{i + 1}. {q.question}
                </QuestionText>

                <Label>Student Answer</Label>
                <TextBox>
                  {q.student_answer || "No answer provided"}
                </TextBox>

                <Label>Model Answer</Label>
                <TextBox>{q.model_answer}</TextBox>

                <ScoreRow>
                  <ScoreInput
                    type="number"
                    min="0"
                    max={q.max_marks}
                    value={q.score}
                    onChange={(e) =>
                      handleScoreChange(
                        q.question_id,
                        e.target.value,
                        q.max_marks
                      )
                    }
                  />
                  <span> / {q.max_marks} marks</span>
                </ScoreRow>
              </QuestionBlock>
            ))}

            <TotalScore>Total Score: {totalScore}</TotalScore>

            <Actions>
              <Button cancel onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={saveMarks}>
                Update Marks
              </Button>
            </Actions>
          </>
        )}
      </Modal>
    </Overlay>
  );
};

export default EssayMarkingModal;
