import React from "react";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { green } from "@mui/material/colors";

export const ThoughtCard = ({ thought, link }) => {
  return (
    <Grid item>
      <Card
        sx={{
          maxWidth: 345,
          display: "inline-block",
        }}
      >
        <CardHeader
          avatar={
            <Link
              href={link && `/profile/${thought.username.S}`}
              underline="none"
            >
              <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
                {thought.username.S.slice(0, 1).toUpperCase()}
              </Avatar>
            </Link>
          }
          title={thought.username.S}
          subheader={new Date(
            parseInt(thought.createdAt.N)
          ).toLocaleDateString()}
        />
        <Box className="card-img-container">
          <CardMedia
            className="card-img"
            component="img"
            image={thought.image.S}
            alt={thought.username.S + thought.thought.S}
          />
        </Box>
        <CardContent className="card-content">
          <Typography variant="body2" color="text.secondary">
            {thought.thought.S}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
