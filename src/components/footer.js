import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';

class Footer extends Component {
    state = {  }
    render() { 
        return ( 
        <div style={{position: "relative", top: "40px"}}>
            <p>Contact info</p>
            <p>Gmail: <a>punk1susant@gmail.com</a></p>
            <p>Facebook: <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/sushant.tandukar.5" >https://www.facebook.com/sushant.tandukar.5</a></p>

        </div> );
    }
}
 
export default Footer;