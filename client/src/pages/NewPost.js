import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function NewPost() {
  const [formState, setFormState] = useState({
    username: "",
    thought: "",
  });
  const [characterCount, setCharacterCount] = useState(0);
  const [uploading, setUploading] = useState(false);
  const fileInput = useRef(null);

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setFormState({ ...formState, [event.target.name]: event.target.value });
      setCharacterCount(event.target.value.length);
    }
  };

  const handleImageUpload = async () => {
    if (!!fileInput.current.files[0]) {
      const data = new FormData();
      data.append("image", fileInput.current.files[0]);
      try {
        const res = await fetch("http://20.29.208.6/api/image-upload", {
          mode: "cors",
          method: "POST",
          body: data,
        });
        if (!res.ok) throw new Error(res.statusText);
        const postResponse = await res.json();
        return postResponse.imageUrl;
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setUploading(true);
    let url = (await handleImageUpload()) || "";
    await fetch("http://20.29.208.6/api/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formState, image: url }),
    });

    console.log("done");

    // clear form value
    setFormState({ username: "", thought: "" });
    setUploading(false);
    setCharacterCount(0);
    window.location.assign("/");
  };

  return (
    <Box
      sx={{ width: { xs: "100%", md: "90%", lg: 800 }, margin: "50px auto" }}
    >
      <Typography variant="h5" color="#134e4a" textAlign="center" my={2}>
        Add a new post
      </Typography>
      <form onSubmit={handleFormSubmit} className="newpost-container">
        <div style={{ marginTop: 20, display: "flex", alignItems: "flex-end" }}>
          <span>Username:</span>
          <TextField
            name="username"
            variant="standard"
            value={formState.username}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ margin: "30px 0" }}>
          <p>Here's a new thought:</p>
          <TextField
            name="thought"
            multiline
            rows={4}
            fullWidth
            value={formState.thought}
            onChange={handleChange}
            required
          />
          <p style={{ padding: 0, margin: 0, fontSize: 16 }}>
            Character Count: {characterCount}/280
          </p>
        </div>

        <div style={{ margin: "20px 0" }}>
          Add an image to your thought:
          <input type="file" ref={fileInput} />
        </div>
        <Button variant="contained" type="submit" disabled={uploading}>
          Submit
        </Button>
      </form>
    </Box>
  );
}
