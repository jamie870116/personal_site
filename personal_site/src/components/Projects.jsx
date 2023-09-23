import React, { useEffect, useState } from 'react'
import '../css/projects.css'
import "react-image-gallery/styles/css/image-gallery.css";
import Button from "react-bootstrap/Button";
import ImageGallery from 'react-image-gallery';
// import { ShangdaImages } from '../ShangdaImages';
// import { WaninImages } from '../WaninImages';
import Skill from './Skill'
import { api_path } from '../api_path'



function Projects(props, innerRef) {

    const [projects, setProjects] = useState([])
    const [isAuthenticated, setIsAuthenticated] = React.useState(null);
    const loggedInUser = localStorage.getItem("authenticated");
    useEffect(() => {
        getProjects();
        if (loggedInUser) {
            setIsAuthenticated(loggedInUser);
        };
    }, []);

    console.log(projects)

    const getProjects = () => {
        const endpoint = api_path + "/api/experience/mixins/"
        const requestOptions = {
            'method': 'GET',
            'headers': { 'Content-Type': 'application/json' }
        };

        fetch(endpoint, requestOptions)
            .then(res => res.json())
            .then(data => setProjects(data))
            .catch(err => console.log(err));
    };

    const handleImageForImageGallery = (images) => {
        const data = images.map((image) => {
            image = api_path + image
            return {
                original: image,
                originalHeight: "300px"
            }
        });
        return data
    };

    const handleDelete = (id) => {
        const requestOptions = {
            'method': 'DELETE',
            'headers': {
                'Authorization': 'Bearer ' + isAuthenticated,
            }
        };

        fetch(endpoint + id + '/', requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                getProjects()
            })
            .catch(err => console.log(err));
    };


    const renderProject = (projects) => {
        const projectList = projects.map((project, index) => (
            <div className='project' key={index}>
                <div className='project-head'>
                    <h4>{project.title}</h4>
                    <p style={{ fontSize: 14 }}>{project.year}</p>
                </div>
                <p className='project-company'>{project.subtitle}</p>
                <div className='project-info'>
                    <div className='project-description'>
                        {project.description.split('\n').map((line, index) => (<p key={index}>{line}</p>))}
                    </div>
                    {
                        project.skills && (
                            <div className='project-skills'>
                                <Skill skills={project.skills} />
                            </div>
                        )
                    }
                    {/* {project.gallery.length > 0 && handleImage(project.gallery)} */}
                    {
                        project.gallery.length > 0 &&
                        <div className='project-gallery'>
                            <ImageGallery items={handleImageForImageGallery(project.gallery)}
                                showThumbnails={false}
                                showBullets={true}
                                showIndex={true}
                            />
                        </div>
                    }
                    {
                        project.urls.length > 0 &&
                        (
                            <div className='project-links'>
                                {project.urls.map((url, index) => (
                                    <button key={index}
                                        className='project-links-btn'
                                        onClick={() => (window.open(url.url, '_blank'))}>
                                        {url.title}
                                    </button>
                                ))}
                            </div>
                        )
                    }
                    {
                        isAuthenticated && (
                            <Button
                                variant="danger"
                                type="delete"
                                onClick={() => handleDelete(project.id)}>
                                delete
                            </Button>
                        )
                    }


                </div>
            </div>
        ));
        return (
            <div className='project-list'>
                {projectList}
            </div>
        )
    };

    return (
        <div className='' ref={innerRef}>
            <div className="home-title">
                <h3>Experience</h3>
            </div>
            <div className='project-list'>
                {renderProject(projects)}
            </div>
        </div>
    )
}
export default React.forwardRef(Projects)