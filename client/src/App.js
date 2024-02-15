import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Footer from "./components/Footer";
import Home from "./pages/Home";
import NewPost from "./pages/NewPost";
import NoMatch from "./pages/NoMatch";
import Profile from "./pages/Profile";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./util/theme";
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newpost" element={<NewPost />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>

        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
