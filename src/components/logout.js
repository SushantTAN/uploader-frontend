import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';


class Logout extends Component {
    constructor(props) {
        super(props);
        localStorage.removeItem("token");
        this.state = { 
            
         }
    }
    render() { 
        return ( 
        <div>
            <div>logged out</div>
            <Link to="/" >login again</Link>
        </div> 
        );
    }
}
 
export default Logout;