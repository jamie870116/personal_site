import React from "react";
import "../css/skill.css";

const Skill = ({ skills }) => {
    skills = skills.split(",");
    const skillList = skills.map((skill, index) => (
        <div key={index} className="skill">
            {skill}
        </div>
    ));
    return <div className="skill-list">{skillList}</div>;
};

export default Skill;