import React, { useState, useEffect } from "react";
import { Button, Container, Typography, TextField, Card, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Sample Interview Questions
const questions = [
  "Tell me about yourself.",
  "What are your strengths and weaknesses?",
  "Why do you want this job?",
  "Where do you see yourself in 5 years?",
  "Do you have any questions for us?"
];

const MockInterview = () => {
  const navigate = useNavigate();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");

  // Redirect if not logged in
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      navigate("/signin");
    }
  }, [navigate]);

  const handleNextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setAnswer("");
    } else {
      alert("Interview Completed! Redirecting to AI Interface...");
      navigate("/interface");
    }
  };

  const handlePreviousQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
      setAnswer("");
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        overflow: "hidden",
        background: "linear-gradient(135deg, #1e3c72, #2a5298)",
        backgroundSize: "cover",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('/ai_background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3, // Soft overlay effect
        },
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            p: 4,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: 3,
            boxShadow: 3,
            backdropFilter: "blur(10px)", // Glassmorphism Effect
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            Mock Interview
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {questions[questionIndex]}
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            sx={{
              mb: 2,
              input: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "#66a3ff" },
              },
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="outlined"
              onClick={handlePreviousQuestion}
              disabled={questionIndex === 0}
              sx={{
                borderColor: "#00c6ff",
                color: "#00c6ff",
                "&:hover": { backgroundColor: "#00c6ff", color: "white" },
              }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNextQuestion}
              sx={{
                backgroundColor: "#00c6ff",
                "&:hover": { backgroundColor: "#0072ff" },
              }}
            >
              {questionIndex < questions.length - 1 ? "Next" : "Finish"}
            </Button>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default MockInterview;
