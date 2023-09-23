/* eslint-disable no-unused-vars */
import React from 'react'
import '../css/blogs.css'
import RemovalModal from './RemovalModal'
import { api_path } from '../api_path'

function Blogs() {
    const endpoint = api_path + "api/diary/mixins/"
    const [blogs, setblogs] = React.useState([])
    const [isAuthenticated, setIsAuthenticated] = React.useState(null);
    React.useEffect(() => {
        getBlogs()
        const loggedInUser = localStorage.getItem("authenticated");
        if (loggedInUser) {
            setIsAuthenticated(loggedInUser);
        }
    }, []);


    function getBlogs() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify(params)
        };
        fetch(endpoint, requestOptions).then(res => res.json()).then(data => {
            setblogs(data)
        }).catch(err => console.log(err))
    }



    function deleteBlog(blog_id) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + isAuthenticated },
            // body: JSON.stringify(formData)
        };

        const del_url = endpoint + blog_id
        fetch(del_url, requestOptions).then(res => {
            res.json()
            // redirect to /Blogs
            window.location.href = "/Blogs"
        })
            .catch(err => console.log(err))
    }

    // display the blogs 
    return (
        <div className="blogs">
            <h1>Blogs</h1>
            {
                blogs.length > 0 ?
                    blogs.map((blog) => (
                        <div className="blog-el" key={blog.id}>
                            <div className='blog-el-head'>
                                <h2 className="blog-title">{blog.title}</h2>
                                <p className="blog-create-date">{blog.date}</p>
                            </div>
                            <div className='blog-content'>
                                <p>{blog.content}</p>
                            </div>
                            <a href={'Blogs/' + blog.id + '/'}>see more...</a>
                            {
                                isAuthenticated &&
                                <RemovalModal
                                    pk={blog.id}
                                    deleteBlog={deleteBlog}
                                />
                            }
                        </div>
                    ))
                    :
                    <p>There are no blogs yet.</p>
            }
        </div>
    )
}

export default Blogs