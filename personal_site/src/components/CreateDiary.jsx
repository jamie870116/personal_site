/* eslint-disable no-unused-vars */
import React from 'react'
import MDEditor from '@uiw/react-md-editor';
import '../css/createDiary.css'
import { useNavigate } from "react-router-dom";
import { api_path } from '../api_path'



export default function CreateDiary() {

    const endpoint = api_path + "api/diary/mixins/"
    const [content, setContent] = React.useState("**Hello world!!!**");
    const [title, setTitle] = React.useState("");
    const [isAuthenticated, setIsAuthenticated] = React.useState(localStorage.getItem("authenticated"));

    React.useEffect(() => {
        const loggedInUser = localStorage.getItem("authenticated");
        if (loggedInUser) {
            setIsAuthenticated(loggedInUser);
        }
    }, []);
    // React.useEffect(() => !isAuthenticated && navigate("/Blogs"), []);

    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault()
        // console.log(title)
        // console.log(content) // string
        const formData = {
            'title': title,
            'content': content
        }
        console.log(isAuthenticated)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + isAuthenticated },
            body: JSON.stringify(formData)
        };

        fetch(endpoint, requestOptions).then(res => {
            res.json()
            // redirect to /Blogs
            navigate("/Blogs");
        }).catch(err => console.log(err))
    }
    // console.log(isAuthenticated)

    function handleChange(event) {
        // console.log(event.target.value)
        setTitle(event.target.value)
    }



    return (

        <div className="diary-form" data-color-mode="light">
            <h1>New Diary</h1>
            <form onSubmit={handleSubmit}>
                <input
                    className='diary-title'
                    type="text"
                    placeholder="Type the title here"
                    onChange={handleChange}
                    name="title"
                    value={title}
                />

                <MDEditor
                    value={content}
                    onChange={setContent}
                />
                <button className='diary-btn'>save</button>
            </form>
        </div>
    );

}
