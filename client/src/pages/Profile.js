import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThoughtCard } from "../components/ThoughtCard";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const Profile = (props) => {
  const { username: userParam } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [thoughts, setThoughts] = useState([
    {
      username: userParam,
      createdAt: "",
      thought: "",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://20.29.208.6/api/users/${userParam}`);
        const data = await res.json();
        setThoughts([...data]);
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userParam]);

  return (
    <div>
      <Typography variant="h5" textAlign={"center"} mt={5} color={"#134e4a"}>
        Viewing {userParam ? `${userParam}'s` : "your"} profile.
      </Typography>

      {!isLoaded ? (
        <Grid container justifyContent="center" sx={{ margin: "50px auto" }}>
          Loading...
        </Grid>
      ) : (
        <Grid
          container
          justifyContent="center"
          alignItems="stretch"
          spacing={2}
          sx={{ maxWidth: 1200, margin: "50px auto" }}
        >
          {thoughts.length &&
            thoughts.map((thought) => (
              <ThoughtCard thought={thought} key={thought.createdAt.N} />
            ))}
        </Grid>
      )}
    </div>
  );
};

export default Profile;
