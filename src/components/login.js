import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        const token =localStorage.getItem("token");
        let loggedin = true;
        if(token == null){
            loggedin =false
        }

        
        this.state = { 
            username: '',
            password: '',
            loggedin
        }

        this.onChange = this.onChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitForm(e){
        e.preventDefault();
        const {username, password} = this.state

        if(username === "a" && password === "b"){
            localStorage.setItem("token", "sdasdef");
            this.setState({
                loggedin: true 
            })
        }

    }

    render() { 
        if(this.state.loggedin){
            return <Redirect to="/uploader"/> 
        }
        return (
            <div style={{backgroundImage: `url(${require("../895cccce862751373e5b14dc11e3bbd7.jpg")})`, 
            height: "100vh",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            }}>
                <h1 className="h1 text-center text-white " style={{fontFamily: "Book Antiqua", position: "relative", top: "20px"}}>
                    Welcome to Sushant's image repository
                </h1>

                <h2 className=" text-center text-white " style={{fontFamily: "Book Antiqua", position: "relative", top: "20px"}}>Login with the admin account to continue</h2>
        
                <div className="card text-centerborder-dark mx-auto" style={{width: "18rem", top: "100px"}}>
                    
                    
                    <form onSubmit={this.submitForm} className="card-body">
                        <h1>Login</h1>
                        <input type="text" placeholder="username" name="username" value={this.state.username} onChange={this.onChange} /><br/>
                        <input type="password" placeholder="password" name="password" value={this.state.password} onChange={this.onChange} /><br/>
                        <input type="submit" /><br/>
                    </form>
                </div>
            </div>
        );
    }
}
 
export default Login;