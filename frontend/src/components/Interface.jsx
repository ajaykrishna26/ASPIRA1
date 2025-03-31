import React, { useState, useEffect, useRef } from "react";
import { Button, Container, Typography, TextField, Card, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

// ========== Question Banks ==========
const getBehavioralQuestions = () => [
  "Tell me about a time you faced a difficult challenge at work.",
  "Describe a situation where you had to work with a difficult team member.",
  "Give an example of how you handled a mistake you made at work.",
  "Why do you want to work with the company.",
  "What do you think is better- being perfect and delivering late or being good and delivering on time."
];

const getTechnicalQuestions = () => [
  "What programming languages are you most familiar with.",
  "Describe a time when you had to learn a new technology or programming language quickly.",
  "Explain the concept of a binary search algorithm and its time complexity.",
  "What are the different types of HTTP request methods.",
  "How would you implement a responsive web design.",
];

const getSituationalQuestions = () => [
  "What would you do if you disagreed with your manager's decision?",
  "How would you handle a tight deadline with multiple priorities?",
  "Describe how you would onboard a new team member.",
  "Have you been faced with a difficult decision without having much information? What did you do.",
  "Can you share a time you had to deal with a difficult customer."
];

// ========== AI Response Generators ==========
const getEncouragingResponses = () => [
  "That's an excellent point! Could you elaborate further?",
  "Great answer! What other factors did you consider?",
  "Interesting perspective! How did this experience shape you?"
];

const getFollowUpResponses = () => [
  "What was the most challenging part of that situation?",
  "How would you approach this differently today?",
  "What key lessons did you learn from this experience?"
];

// ========== Speech Functions ==========
const initializeSpeech = () => {
  const synth = window.speechSynthesis;
  let recognition = null;

  if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = false;
    recognition.interimResults = false;
  }

  return { synth, recognition };
};

const speakQuestion = (synth, question) => {
  if (synth.speaking) {
    synth.cancel();
  }
  
  const utterance = new SpeechSynthesisUtterance(question);
  utterance.rate = 1.0;
  utterance.pitch = 1.0;
  synth.speak(utterance);
};

// ========== Styled Components ==========
const Background = styled(Box)({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: `url('https://careercenter.ucdavis.edu/sites/g/files/dgvnsk15461/files/styles/sf_landscape_16x9/public/media/images/CC%E2%80%93Horizontal-Marketing-Block-2.jpg?h=0419be36&itok=Q4eP0cAr')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  zIndex: -1,
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
});

const ContentWrapper = styled(Box)({
  position: "relative",
  zIndex: 2,
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  overflow: "auto",
});

const AIVideoContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '300px',
  borderRadius: '10px',
  overflow: 'hidden',
  marginBottom: '20px',
  boxShadow: '0 4px 20px rgba(0, 198, 255, 0.3)',
  border: '2px solid rgba(0, 198, 255, 0.5)',
  backgroundColor: '#000',
  '& video': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

const AISpeakingIndicator = styled(Box)({
  position: 'absolute',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: '5px',
  '& span': {
    display: 'inline-block',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#00c6ff',
    animation: 'bounce 1.4s infinite ease-in-out',
  },
  '& span:nth-of-type(1)': {
    animationDelay: '0s',
  },
  '& span:nth-of-type(2)': {
    animationDelay: '0.2s',
  },
  '& span:nth-of-type(3)': {
    animationDelay: '0.4s',
  },
  '@keyframes bounce': {
    '0%, 80%, 100%': { transform: 'scale(0)' },
    '40%': { transform: 'scale(1)' },
  },
});

// ========== Main Component ==========
const Interface = () => {
  const navigate = useNavigate();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [questionBank, setQuestionBank] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef(null);
  const recognitionRef = useRef(null);
  const videoRef = useRef(null);

  // Initialize speech and question bank
  useEffect(() => {
    const { synth, recognition } = initializeSpeech();
    synthRef.current = synth;
    recognitionRef.current = recognition;

    if (recognition) {
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setAnswer(prev => prev + ' ' + transcript);
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    } else {
      console.warn("Speech recognition is not supported in this browser.");
    }

    // Default to behavioral questions
    setQuestionBank(getBehavioralQuestions());

    // Set up speech synthesis events
    synth.onvoiceschanged = () => {
      console.log("Voices loaded:", synth.getVoices());
    };

    return () => {
      if (synth.speaking) {
        synth.cancel();
      }
      if (recognition) {
        recognition.abort();
      }
    };
  }, []);

  // Speak question when it changes
  useEffect(() => {
    if (isInterviewStarted && questionBank.length > 0) {
      const question = questionBank[questionIndex];
      const utterance = new SpeechSynthesisUtterance(question);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      
      utterance.onstart = () => {
        setIsSpeaking(true);
        if (videoRef.current) {
          videoRef.current.play();
        }
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      };
      
      synthRef.current.speak(utterance);
    }
  }, [questionIndex, isInterviewStarted, questionBank]);

  // Generate AI response
  useEffect(() => {
    if (answer) {
      setAiResponse("");
      setTimeout(() => {
        const responses = [...getEncouragingResponses(), ...getFollowUpResponses()];
        setAiResponse(responses[Math.floor(Math.random() * responses.length)]);
      }, 1500);
    }
  }, [answer]);

  // ========== Question Navigation ==========
  const handleNextQuestion = () => {
    if (questionIndex < questionBank.length - 1) {
      setQuestionIndex(prev => prev + 1);
      setAnswer("");
      setAiResponse("");
    } else {
      synthRef.current.cancel();
      alert("AI Interview Completed! Redirecting...");
      navigate("/");
    }
  };

  const handlePreviousQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex(prev => prev - 1);
      setAnswer("");
      setAiResponse("");
    }
  };

  // ========== Question Bank Selection ==========
  const selectQuestionBank = (type) => {
    switch(type) {
      case 'technical':
        setQuestionBank(getTechnicalQuestions());
        break;
      case 'situational':
        setQuestionBank(getSituationalQuestions());
        break;
      default:
        setQuestionBank(getBehavioralQuestions());
    }
    setQuestionIndex(0);
    setAnswer("");
    setAiResponse("");
  };

  // ========== Voice Control ==========
  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert("Voice input is not supported in your browser");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
    setIsListening(!isListening);
  };

  const replayQuestion = () => {
    speakQuestion(synthRef.current, questionBank[questionIndex]);
  };

  return (
    <>
      <Background />
      <ContentWrapper>
        <Container maxWidth="sm">
          <Card sx={{
            p: 4,
            borderRadius: 3,
            boxShadow: 3,
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            color: "white",
          }}>
            {!isInterviewStarted ? (
              <>
                <Box sx={{ mb: 3 }}>
                  <img
                    src="https://images.cnbctv18.com/uploads/2023/05/artificial-intelligence-ai.jpeg"
                    alt="AI Interview"
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                      maxHeight: "200px",
                      objectFit: "cover",
                    }}
                  />
                </Box>

                <Typography variant="h5" sx={{ mb: 3 }}>
                  Select Question Type
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                  <Button 
                    variant="outlined" 
                    onClick={() => selectQuestionBank('behavioral')}
                    sx={{ color: 'white', borderColor: 'white' }}
                  >
                    Behavioral Questions
                  </Button>
                  <Button 
                    variant="outlined" 
                    onClick={() => selectQuestionBank('technical')}
                    sx={{ color: 'white', borderColor: 'white' }}
                  >
                    Technical Questions
                  </Button>
                  <Button 
                    variant="outlined" 
                    onClick={() => selectQuestionBank('situational')}
                    sx={{ color: 'white', borderColor: 'white' }}
                  >
                    Situational Questions
                  </Button>
                </Box>

                <Button
                  variant="contained"
                  onClick={() => setIsInterviewStarted(true)}
                  sx={{
                    backgroundColor: "#00c6ff",
                    "&:hover": { backgroundColor: "#0072ff" },
                    fontSize: '1.1rem',
                    padding: '10px 24px'
                  }}
                >
                  Start Interview
                </Button>
              </>
            ) : (
              <>
                <AIVideoContainer>
                  <video
                    ref={videoRef}
                    width="100%"
                    height="100%"
                    loop
                    muted
                    playsInline
                    poster="https://media.istockphoto.com/id/1334436084/photo/3d-rendering-of-ai-artificial-intelligence-robot-avatar-with-digital-data-network-background.jpg?s=612x612&w=0&k=20&c=QfXx5j5D5zG3XJmQJwVvq6o6p3Q5Q5Q5Q5Q5Q5Q5Q5Q5Q="
                  >
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-robot-humanoid-with-led-face-12230-large.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  {isSpeaking && (
                    <AISpeakingIndicator>
                      <span></span>
                      <span></span>
                      <span></span>
                    </AISpeakingIndicator>
                  )}
                </AIVideoContainer>
                <Typography variant="h6" sx={{ mt: 1, fontWeight: "bold" }}>
                  AI Interviewer
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    AI: {questionBank[questionIndex]}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={replayQuestion}
                    sx={{
                      color: '#00c6ff',
                      borderColor: '#00c6ff',
                      '&:hover': { backgroundColor: '#00c6ff20' }
                    }}
                  >
                    Replay
                  </Button>
                </Box>

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

                <Button
                  variant="contained"
                  onClick={toggleVoiceInput}
                  sx={{
                    mb: 2,
                    backgroundColor: isListening ? "#ff3b2f" : "#ff6f61",
                    '&:hover': { backgroundColor: isListening ? "#ff2b1f" : "#ff5f51" }
                  }}
                >
                  {isListening ? "Stop Recording" : "Start Voice Input"}
                </Button>

                {aiResponse && (
                  <Typography variant="body1" sx={{ mb: 2, fontWeight: "bold", color: "lightgreen" }}>
                    AI: {aiResponse}
                  </Typography>
                )}

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
                    {questionIndex < questionBank.length - 1 ? "Next Question" : "Finish"}
                  </Button>
                </Box>
              </>
            )}
          </Card>
        </Container>
      </ContentWrapper>
    </>
  );
};

export default Interface;