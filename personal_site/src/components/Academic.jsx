/* eslint-disable react/no-unescaped-entities */
// import React from "react";
import '../css/academic.css'
import "react-image-gallery/styles/css/image-gallery.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
// import ImageGallery from 'react-image-gallery';
import Expand from './Expand';
import React, { useEffect } from 'react'
import { api_path } from '../api_path';



function Academic(props, innerRef) {

    const [publicationList, setPublicationList] = React.useState([])

    useEffect(() => {
        getAcademicList()
    }, []);

    const getAcademicList = async () => {
        const endpoint = api_path + "/api/academic/mixins/"
        console.log(endpoint)
        const requestOptions = {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(endpoint, requestOptions)
            .then(res => res.json())
            .then(data => setPublicationList(data))
            .catch(err => console.log(err))
    };



    const renderAuthor = (authors) => {
        const authorList = authors.split('Lai, C. Y.');
        return (
            <p className="publication-authors">
                {authorList[0]}
                <span className='publication-cheng'>
                    Lai, C. Y.
                </span>
                {authorList[1]}
            </p>
        )
    }

    const renderPublication = (publicationList) => {
        const publications = publicationList.slice(-2).reverse().map((publication, index) => (
            <div className="publication" key={index}>
                <div className="publication-content">
                    <h4 className="publication-title" onClick={() => (window.open(publication.url, '_blank'))}>
                        {publication.title}
                        &nbsp;
                        <FontAwesomeIcon className="publication-links-icons" icon={faLink} />
                    </h4>
                    {renderAuthor(publication.authors)}
                    <p className="publication-publisher">{publication.publisher}</p>
                    <p className="publication-abstrat">
                        <Expand>
                            {publication.abstract}
                        </Expand>
                    </p>
                </div>
                {/* {
                    publication.gallary.length > 0 &&
                        <div className="publication-image">
                            <ImageGallery items={publication.gallary}
                                showThumbnails={false}
                                showBullets={true}
                                showIndex={true}
                            />
                        </div>
                    } */}
            </div>
        ));
        return publications;
    };


    return (
        <div className="" >
            <div className="home-title" ref={innerRef}>
                <h3>Academic Publications</h3>
            </div>
            <div className='publications'>
                {renderPublication(publicationList)}
            </div>
        </div>
    )
}

export default React.forwardRef(Academic);