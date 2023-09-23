// import React from "react";
import Home from "./components/Home";
import Resume from "./components/Resume";
import Projects from './components/Projects'
import Academic from './components/Academic'
import Header from "./components/Header";
import Blogs from "./components/Blogs";
import CreateDiary from "./components/CreateDiary";
import BlogDetail from "./components/BlogDetail";
import Login from "./components/Login";
import ProjectUpload from "./components/ProjectUpload";
import { Routes, Route } from "react-router-dom";
import './App.css'
import { useRef } from 'react'



function App() {
  const homeRef = useRef(null);
  const educationRef = useRef(null);
  const projectsRef = useRef(null);
  const academicRef = useRef(null);
  const refs = [
    { name: 'Biography', ref: homeRef },
    { name: 'Education', ref: educationRef },
    { name: 'Experience', ref: projectsRef },
    { name: 'Academic', ref: academicRef }
  ]

  return (
    <div className="root-container">
      <Header
        refs={refs} />
      <div className="container">
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home
              educationRef={educationRef}
              projectsRef={projectsRef}
              academicRef={academicRef}
              ref={homeRef}
            />} />
            <Route path="/Projects" element={<Projects />} />
            <Route path="/Academic" element={<Academic />} />
            <Route path="/Resume" element={<Resume />} />
            <Route path="/Blogs" element={<Blogs />} />
            <Route path="/CreateDiary" element={<CreateDiary />} />
            <Route path="/Blogs/:id" element={<BlogDetail />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/ProjectUpload" element={<ProjectUpload />} />
          </Routes>
        </div>

      </div>

    </div>
  );
}

export default App;