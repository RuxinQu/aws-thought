import React, { useState, useEffect } from "react";
import { ThoughtCard } from "../components/ThoughtCard";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [thoughts, setThoughts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://20.29.208.6/api/users");
        const jsonData = await res.json();
        const _data = jsonData.sort((a, b) => b.createdAt.N - a.createdAt.N);
        setThoughts([..._data]);
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <header>
        <h1>Cloud Thoughts</h1>
        <Link to={"/newpost"}>
          <Button variant="contained">+ New Post</Button>
        </Link>
      </header>

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
              <ThoughtCard
                thought={thought}
                key={thought.createdAt.N}
                link={true}
              />
            ))}
        </Grid>
      )}
    </div>
  );
};

export default Home;
