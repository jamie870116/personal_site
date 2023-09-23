// import React from 'react'
import { forwardRef } from "react";
import { api_path } from '../api_path'
import React from 'react'

function Education(props, innerRef) {
    const endpoint = api_path + "/api/education/mixins/"
    const [education, setEducation] = React.useState([])
    React.useEffect(() => {
        getEducation()
    }, []);

    const getEducation = () => {
        const requestOptions = {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(endpoint, requestOptions)
            .then(res => res.json())
            .then(data => setEducation(data))
            .catch(err => console.log(err))
    }

    const renderEducation = () => {
        const educations = education.map((edu, idx) => {
            return (
                <div className="home-degree-content" key={idx}>
                    <div className="home-degree-content-image">
                        <a href="https://www.nchu.edu.tw/index1.php">
                            <img src={edu.badge} alt="NCHU image" />
                        </a>
                    </div>
                    <div className="home-degree-content-word">
                        <div className="home-degree-content-word-head">
                            <h5>{edu.school}</h5>
                            <p style={{ fontSize: 14 }} >{edu.date} </p>
                        </div>
                        <span>{edu.degree}</span>
                        <br />
                        GPA: {edu.gpa}
                    </div>
                </div>
            )
        });

        return educations;
    };


    return (
        <>
            <div className="home-title" ref={innerRef}>
                <h3>Education</h3>
            </div>
            {renderEducation()}
        </>

    )
}
export default forwardRef(Education)