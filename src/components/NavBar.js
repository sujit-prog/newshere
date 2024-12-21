import React from 'react';
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">NewsHERE</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/" activeclassname="active">Home</NavLink>
                            </li>
                            <li className="nav-item"><NavLink className="nav-link" to="/business" activeclassname="active">Business</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" to="/entertainment" activeclassname="active">Entertainment</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" to="/general" activeclassname="active">General</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" to="/health" activeclassname="active">Health</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" to="/science" activeclassname="active">Science</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" to="/sports" activeclassname="active">Sports</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" to="/technology" activeclassname="active">Technology</NavLink></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;

