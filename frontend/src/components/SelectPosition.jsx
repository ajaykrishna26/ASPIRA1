// import React, { useState } from "react";
// import { Button, Container, Typography, MenuItem, Select, Box } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const positions = [
//   "Software Engineer",
//   "Data Scientist",
//   "Cloud Engineer",
//   "Product Manager",
//   "Marketing Specialist",
//   "Cybersecurity Analyst"
// ];

// const SelectPosition = () => {
//   const navigate = useNavigate();
//   const [selectedPosition, setSelectedPosition] = useState("");

//   const handleStartInterview = () => {
//     if (selectedPosition) {
//       localStorage.setItem("selectedPosition", selectedPosition);
//       navigate("/interface");  // Redirect to AI Interview Interface
//     } else {
//       alert("Please select a position before proceeding.");
//     }
//   };

//   return (
//     <Container sx={{ textAlign: "center", mt: 5 }}>
//       <Typography variant="h4" gutterBottom>
//         Select Your Interview Position
//       </Typography>
//       <Select
//         value={selectedPosition}
//         onChange={(e) => setSelectedPosition(e.target.value)}
//         displayEmpty
//         fullWidth
//         sx={{ mb: 3 }}
//       >
//         <MenuItem value="" disabled>Select a Position</MenuItem>
//         {positions.map((position) => (
//           <MenuItem key={position} value={position}>
//             {position}
//           </MenuItem>
//         ))}
//       </Select>
//       <Button variant="contained" color="primary" onClick={handleStartInterview}>
//         Start Interview
//       </Button>
//     </Container>
//   );
// };

// export default SelectPosition;
