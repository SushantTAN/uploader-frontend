import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import 'bootstrap/dist/js/bootstrap.bundle.min';

class Navbar extends Component {
    
    render() { 
        return (
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                
                <div className="collpase navbar-collapse">
                 <ul className="navbar-nav ml-auto">
                    <li className="navbar-item">
                     <Link to="/uploader" className="nav-link">Uploader</Link>
                    </li>
                    <li className="navbar-item">
                     <Link to="/viewuploads" className="nav-link">List of uploads</Link>
                    </li>
                    <li className="navbar-item">
                     <Link to="/reactviewuploads" className="nav-link">react list</Link>
                    </li>
                    <li className="navbar-item">
                     <Link to="/logout" className="nav-link"> logout </Link>
                    </li>
                    
                 </ul>

                 
                </div>

              
            </nav>
        );
    }
}
 
export default Navbar;