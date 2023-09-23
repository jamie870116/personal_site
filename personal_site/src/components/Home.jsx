/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import '../css/home.css'
// import profileImg from '../assets/Small.jpeg'
import Education from './Education'
import Projects from './Projects'
import Academic from './Academic'


// import profileImg from 'https://drive.google.com/file/d/..'



function Home(props, innerRef) {

  return (
    <div className="home">
      <div className="home-content" ref={innerRef}>
        <div className='home-text'>

          <p>
            I am Jamie Lai, a passionate and driven computer science graduate student with a focus on practical applications.
            I will soon be pursuing a Master of Science degree in Computer Science at UC Santa Barbara.
            Through my past experiences, I have developed proficiency in Python, PHP, and JavaScript, as well as related frameworks and AI libraries.
            <br /><br />
            With a growth mindset and a constant drive for learning,
            I am actively seeking internship opportunities in Summer 2024.
            I am eager to apply my abilities and passion to a mission I deeply care about.

          </p>
        </div>
        <Education ref={props.educationRef} />
        <Projects ref={props.projectsRef} />
        <Academic ref={props.academicRef} />
      </div>
    </div>

  )
}

export default React.forwardRef(Home)