// import React from 'react'
import { forwardRef } from "react";
import { api_path } from '../api_path'
import React from 'react'
import NCHU_badge from '../assets/NCHU_badge.png'
import NUTC_badge from '../assets/NUTC_badge.png'
import UCSB_badge from '../assets/UCSB_badge.png'


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
    const urls = {
        "National Chung Hsing University": "https://www.nchu.edu.tw/index",
        "National Taichung University of Sci. and Tech.": "https://www.nutc.edu.tw/",
        "University of California, Santa Barbara": "https://www.ucsb.edu/",

    }

    const badges = {
        "National Chung Hsing University": NCHU_badge,
        "National Taichung University of Sci. and Tech.": NUTC_badge,
        "University of California, Santa Barbara": UCSB_badge,

    }
    const renderEducation = () => {
        const educations = education.map((edu, idx) => {
            return (
                <div className="home-degree-content" key={idx}>
                    <div className="home-degree-content-image">
                        <a href={urls[edu.school]} target="_blank" rel="noreferrer">
                            <img src={badges[edu.school]} alt={edu.school + ' image'} />
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