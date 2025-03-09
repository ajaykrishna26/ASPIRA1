import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ShareIcon from "@mui/icons-material/Share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const Navbar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const pageUrl = window.location.href; // Get the current page URL

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  // Function for general sharing (Web Share API)
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check out ASPIRA!",
          text: "Explore movie reviews on ASPIRA",
          url: pageUrl,
        })
        .catch((error) => console.log("Error sharing:", error));
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  // WhatsApp Share Handler
  const handleWhatsAppShare = () => {
    const message = `Check out ASPIRA! Movie reviews and more: ${pageUrl}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "lightblue", width: "100vw", boxShadow: "none" }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: 3 }}>
          <Typography
            variant="h3"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              fontWeight: "bold",
              fontFamily: "Algerian",
              color: "darkblue",
            }}
          >
            ASPIRA
          </Typography>
          
          <Box>
            <Button
              sx={{
                color: "black",
                backgroundColor: "green",
                mr: 1,
                "&:hover": { backgroundColor: "darkgreen" },
              }}
              onClick={handleWhatsAppShare}
              startIcon={<WhatsAppIcon />}
            >
              WhatsApp
            </Button>

            <Button
              sx={{
                color: "black",
                backgroundColor: "gray",
                mr: 1,
                "&:hover": { backgroundColor: "darkgray" },
              }}
              onClick={handleShare}
              startIcon={<ShareIcon />}
            >
              Share
            </Button>

            <Button
              onClick={handleLogout}
              sx={{
                color: "black",
                backgroundColor: "blue",
                "&:hover": { backgroundColor: "gray" },
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ height: "64px" }} />
    </Box>
  );
};

export default Navbar;
