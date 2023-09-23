/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import '../css/header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faInstagramSquare, faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faRightFromBracket, faPhone, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons'
// import { faGithubSquare } from '@fortawesome/free-brands-svg-icons'
import { Link, useResolvedPath, useMatch, useNavigate, useLocation } from "react-router-dom"
import DarkModeToggle from './DarkModeToggle'

// eslint-disable-next-line react-refresh/only-export-components, react/prop-types
function CostomLink({ href, children, ...prop }) {
    const path = useResolvedPath(href)
    const isActive = useMatch({ path: path.pathname, end: false })
    return (
        <div className='menu-link'>
            <li className={isActive ? "actived" : ""}>
                <Link to={href} {...prop}>
                    {children}
                </Link>
            </li>
        </div>
    )

}

function Header(props) {
    const location = useLocation();
    const [menuRefs, setMenuRefs] = React.useState(props.refs);
    // console.log(location.pathname);
    const [isAuthenticated, setIsAuthenticated] = React.useState(null);
    const loggedInUser = localStorage.getItem("authenticated");
    const socialAccountUrls = {
        facebook: 'https://www.facebook.com/chieh.ying.1998/',
        instagram: 'https://www.instagram.com/shiori_lai/',
        github: 'https://github.com/jamie870116',
        linkedin: 'https://www.linkedin.com/in/chiehying-lai/',
    }



    const navigate = useNavigate();

    React.useEffect(() => {
        if (loggedInUser) {
            setIsAuthenticated(loggedInUser);
        }
    }, []);

    const handleNavigation = async (targetRef) => {
        if (location.pathname !== "/") {
            await navigate("/");
        }

        setTimeout(() => {
            targetRef.current.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    function logout() {
        localStorage.clear();
        navigate("/");
    }


    const renderMenu = (refs) => {
        const menuList = refs.map((ref, idx) => {
            return (
                <li key={idx}>
                    <a className='hover' onClick={() => handleNavigation(ref.ref)} >{ref.name}</a>
                </li>
            )
        });

        return menuList;
    };

    return (
        <div className='header'>
            <div className='header-content'>
                {/* <DarkModeToggle /> */}
                <div className="header-upper">
                    <Link to="/"><h2>Chieh-Ying Lai</h2></Link>
                    <h3>Current M.S. Student<br />Majoring in Computer Science</h3>
                    <p>Laravel | Django | React | Pytorch, seeking for Full-stack & AI software engineer intern.</p>
                </div>
                <ul className='menu'>
                    {renderMenu(menuRefs)}
                    <CostomLink href="/Resume">Resume</CostomLink>
                    {isAuthenticated && <CostomLink href="/ProjectUpload">Upload Experience</CostomLink>}

                </ul>

                <div className='contact'>
                    <ul>
                        <li><FontAwesomeIcon icon={faPhone} /> &nbsp;&nbsp;(984) 317-9219</li>
                        <li><FontAwesomeIcon icon={faEnvelopeOpen} /> &nbsp;&nbsp;chiehying.lai.w@gmail.com</li>
                    </ul>
                    <div className='social-links'>
                        <a href={socialAccountUrls.facebook} target="_blank" rel="noreferrer noopener"><FontAwesomeIcon className="social-links-icons" icon={faFacebookSquare} /></a>
                        <a href={socialAccountUrls.instagram} target="_blank" rel="noreferrer noopener"><FontAwesomeIcon className="social-links-icons" icon={faInstagramSquare} /></a>
                        <a href={socialAccountUrls.github} target="_blank" rel="noreferrer noopener"><FontAwesomeIcon className="social-links-icons" icon={faGithubSquare} /></a>
                        <a href={socialAccountUrls.linkedin} target="_blank" rel="noreferrer noopener"><FontAwesomeIcon className="social-links-icons" icon={faLinkedin} /></a>
                        {isAuthenticated && <a href="" onClick={logout}><FontAwesomeIcon className="social-links-icons" icon={faRightFromBracket} /></a>}
                    </div>
                </div>



            </div>
        </div>
    )
}
export default Header

{/* {
                    isAuthenticated ?
                        <ul className='menu'>
                            <CostomLink href="/Resume">Resume</CostomLink>
                            <CostomLink href="/Academic">Academic</CostomLink>
                            <CostomLink href="/Projects">Projects</CostomLink>
                            <CostomLink href="/Blogs">Blogs</CostomLink>
                            <CostomLink href="/CreateDiary">Create Diary</CostomLink>

                        </ul>
                        :
                        <ul className='menu'>
                            <CostomLink href="/Resume">Resume</CostomLink>
                            <CostomLink href="/Academic">Academic</CostomLink>
                            <CostomLink href="/Projects">Projects</CostomLink>
                            <CostomLink href="/Blogs">Blogs</CostomLink>
                            <CostomLink href="/Login">Login</CostomLink>
                        </ul>
                } */}