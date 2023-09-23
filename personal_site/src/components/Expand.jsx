/* eslint-disable react/prop-types */
import { useState } from 'react';
import '../css/expand.css'


const Expand = ({ children, size = 25 }) => {

    const [expanded, setExpanded] = useState(false);
    function handleClick() {
        setExpanded(!expanded);
    }
    const text_arr = children.split(" ");
    let text = expanded ? children : text_arr.slice(0, size).join(" ");
    text = text + (expanded ? "" : "...");


    return (
        <>
            {text}
            {expanded ?
                <span onClick={handleClick} className='expand-btn'>
                    &nbsp; &nbsp;
                    <span className='underline'>
                        Show Less
                    </span>

                </span>
                :
                <span onClick={handleClick} className='expand-btn'>
                    &nbsp; &nbsp;

                    <span className='underline'>
                        Show More
                    </span>
                </span>
            }


        </>
    )
};

export default Expand;