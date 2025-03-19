import React, { useState, useEffect } from "react";
import { Button, Container, Typography, TextField, Card, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

const Background = styled(Box)({
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: `url('https://careercenter.ucdavis.edu/sites/g/files/dgvnsk15461/files/styles/sf_landscape_16x9/public/media/images/CC%E2%80%93Horizontal-Marketing-Block-2.jpg?h=0419be36&itok=Q4eP0cAr') no-repeat center center/cover`,
});

const aiQuestions = [
  "What inspired you to choose this career?",
  "How do you handle workplace conflicts?",
  "Can you describe a challenging project you worked on?",
  "What are your strategies for time management?",
  "How do you deal with stress and pressure?",
];

const aiResponses = [
  "That’s an interesting perspective! Can you elaborate?",
  "Great answer! What would you do differently next time?",
  "That’s a strong approach. How did it impact your work?",
  "Nice! Could you give a real-life example?",
  "Very insightful! How do you plan to improve further?",
];

const Interface = () => {
  const navigate = useNavigate();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  useEffect(() => {
    if (answer) {
      setAiResponse("");
      setTimeout(() => {
        setAiResponse(aiResponses[Math.floor(Math.random() * aiResponses.length)]);
      }, 1500);
    }
  }, [answer]);

  const handleNextQuestion = () => {
    if (questionIndex < aiQuestions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setAnswer("");
      setAiResponse("");
    } else {
      alert("AI Interview Completed! Redirecting...");
      navigate("/");
    }
  };

  const handlePreviousQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
      setAnswer("");
      setAiResponse("");
    }
  };

  return (
    <Background>
      <Box sx={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 2 }}>
        <Container maxWidth="sm">
          <Card
            sx={{
              p: 4,
              borderRadius: 3,
              boxShadow: 3,
              textAlign: "center",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              color: "white",
            }}
          >
            {/* AI Interviewer Video */}
            <Box sx={{ textAlign: "center", mb: 2 }}>
            <video
  width="100%"
  height="auto"
  autoPlay
  loop
  muted
  style={{ borderRadius: "10px", maxHeight: "200px" }}
>
  <source src="https://v.ftcdn.net/04/33/10/42/700_F_433104217_W6g0MGty3HdfcdQZURQV0AtjyiO3m1w8_ST.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

              <Typography variant="h6" sx={{ mt: 1, fontWeight: "bold" }}>
                AI Interviewer
              </Typography>
            </Box>

            {/* AI Question */}
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              AI: {aiQuestions[questionIndex]}
            </Typography>

            {/* User Response Input */}
            <TextField
              fullWidth
              multiline
              rows={3}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Your response..."
              sx={{
                mb: 2,
                input: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "#66a3ff" },
                },
              }}
            />

            {/* AI Response (Appears after user types) */}
            {aiResponse && (
              <Typography variant="body1" sx={{ mb: 2, fontWeight: "bold", color: "lightgreen", transition: "opacity 1s ease-in-out" }}>
                AI: {aiResponse}
              </Typography>
            )}

            {/* Navigation Buttons */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <Button
                variant="outlined"
                onClick={handlePreviousQuestion}
                disabled={questionIndex === 0}
                sx={{ borderColor: "#00c6ff", color: "#00c6ff", "&:hover": { backgroundColor: "#00c6ff", color: "white" } }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNextQuestion}
                sx={{ backgroundColor: "#00c6ff", "&:hover": { backgroundColor: "#0072ff" } }}
              >
                {questionIndex < aiQuestions.length - 1 ? "Next Question" : "Finish"}
              </Button>
            </Box>
          </Card>
        </Container>
      </Box>
    </Background>
  );
};

export default Interface;
