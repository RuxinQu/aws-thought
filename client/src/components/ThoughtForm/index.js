import React, { useState, useRef } from "react";

const ThoughtForm = () => {
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
    window.location.reload();
  };

  return (
    <div>
      <p className={`m-0 ${characterCount === 280 ? "text-error" : ""}`}>
        Character Count: {characterCount}/280
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <input
          placeholder="Name"
          name="username"
          value={formState.username}
          className="form-input col-12 "
          onChange={handleChange}
        ></input>
        <textarea
          placeholder="Here's a new thought..."
          name="thought"
          value={formState.thought}
          className="form-input col-12 "
          onChange={handleChange}
        ></textarea>
        <label className="form-input col-12  p-1">
          Add an image to your thought:
          <input type="file" ref={fileInput} className="form-input p-2" />
        </label>
        <button type="submit" disabled={uploading}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ThoughtForm;
