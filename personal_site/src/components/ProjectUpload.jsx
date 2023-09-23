import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// // React-Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { api_path } from '../api_path'

import "../css/upload.css";

const ProjectUpload = (props) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(null);
    const loggedInUser = localStorage.getItem("authenticated");
    const [images, setImages] = useState([]);
    const endpoint = api_path + "/api/experience/mixins/"
    const navigate = useNavigate();


    React.useEffect(() => {
        if (loggedInUser) {
            setIsAuthenticated(loggedInUser);
        }
    }, []);
    // console.log(isAuthenticated);
    const [data, setData] = useState({
        title: "",
        subtitle: "",
        year: "",
        description: "",
        gallary: "",
        urls: "",
        skills: "",
    });

    const handleChange = ({ currentTarget: input }) => {
        let newData = { ...data };
        newData[input.name] = input.value;
        setData(newData);
        console.log(data);
    };

    const handleImageChange = (e) => {
        const selectedImages = e.target.files;
        setImages(selectedImages);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(data);

        // console.log(isAuthenticated);

        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('subtitle', data.subtitle);
        formData.append('year', data.year);
        formData.append('skills', data.skills);
        formData.append('description', data.description);
        console.log(images)
        for (let i = 0; i < images.length; i++) {
            formData.append("gallery", images[i]);
        }
        console.log(formData);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + isAuthenticated
            },
            body: formData
        };
        try {
            const response = await fetch(endpoint, requestOptions);
            if (response.ok) {
                console.log('ok');
            } else {
                console.log(response);
            }
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (

        <div className="upload">
            <Form>
                <Row>
                    <Form.Group className="mb-3" controlId="titleInput">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={data.title}
                            onChange={(e) => {
                                handleChange(e);
                            }}
                            maxLength={80}
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group className="mb-3" controlId="titleInput">
                        <Form.Label>Subtitle</Form.Label>
                        <Form.Control
                            type="text"
                            name="subtitle"
                            value={data.subtitle}
                            onChange={(e) => {
                                handleChange(e);
                            }}
                            maxLength={80}
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group className="mb-3" controlId="titleInput">
                        <Form.Label>Year</Form.Label>
                        <Form.Control
                            type="text"
                            name="year"
                            value={data.year}
                            onChange={(e) => {
                                handleChange(e);
                            }}
                            maxLength={80}
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group className="mb-3" controlId="titleInput">
                        <Form.Label>Skills</Form.Label>
                        <Form.Control
                            type="text"
                            name="skills"
                            value={data.skills}
                            onChange={(e) => {
                                handleChange(e);
                            }}
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>gallary</Form.Label>
                        <Form.Control
                            type="file"
                            name="gallary"
                            multiple
                            accept="image/jpeg,image/png,image/gif"
                            onChange={(e) => {
                                handleImageChange(e);
                            }}
                        />
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="descriptionInput">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={10}
                        name="description"
                        value={data.description}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                    />

                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                >
                    Upload
                </Button>
            </Form >
        </div>



    );

};
export default ProjectUpload;