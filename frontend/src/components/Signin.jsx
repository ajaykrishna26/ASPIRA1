import * as React from "react";
import {

  
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  Card as MuiCard,
  Stack,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  backgroundColor: "rgba(0, 0, 51, 0.9)",
  color: "white",
  boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
  background: `url('/ai_background.jpg') no-repeat center center/cover`,
}));

export default function SignIn({ onLogin }) {
  const navigate = useNavigate();
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");

  // Redirect if already logged in
  // React.useEffect(() => {
  //   if (localStorage.getItem("isLoggedIn") === "true") {
  //     navigate("/mock-interview");
  //   }
  // }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateInputs()) return;
    localStorage.setItem("isLoggedIn", "true");
    onLogin();
    setTimeout(() => navigate("/mock-interview"), 500);
  };

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Enter a valid email.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  return (
    
    
    <>
      <CssBaseline />
      <SignInContainer>
        <Card variant="outlined">
          <Typography component="h1" variant="h4" sx={{ textAlign: "center" }}>
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <FormControl fullWidth>
              <FormLabel htmlFor="email" sx={{ color: "#ffffff" }}>
                Email
              </FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                required
                fullWidth
                variant="outlined"
                sx={{
                  input: { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "#66a3ff" },
                  },
                }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <FormLabel htmlFor="password" sx={{ color: "#ffffff" }}>
                Password
              </FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                type="password"
                id="password"
                required
                fullWidth
                variant="outlined"
                sx={{
                  input: { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "#66a3ff" },
                  },
                }}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" sx={{ color: "white" }} />}
              label="Remember me"
              sx={{ color: "white", mt: 2 }}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              Sign in
            </Button>
            <Button
              onClick={() => {
                localStorage.setItem("isLoggedIn", "true");
                onLogin();
                navigate("/mock-interview");
              }}
              sx={{ textTransform: "none", marginTop: 2, color: "#bbbbbb" }}
            >
              Skip
            </Button>
          </Box>
          
        </Card>
      </SignInContainer>
    </>
  );
}
