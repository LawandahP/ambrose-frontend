/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";


const PhotoCard = ({imgUrl, title, onClick}) => {
  return (
    <Card 
      onClick={onClick} 
      sx={{ 
        height: "100%", display: "flex", flexDirection: "column",
        ":hover": { color: 'gray', transform: 'scale(1.005)', transition: 'transform 0.3s ease'}
        }}>
      <CardMedia
        component="div"
        sx={{
          pt: "56.25%",
        }}
        image={imgUrl}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PhotoCard;
