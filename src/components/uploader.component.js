import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import {storage} from '../firebase-config';
import {Redirect} from 'react-router-dom';
import Navbar from './navbar.component';
import Footer from './footer';

class Uploader extends Component {
    constructor(props) {
      super(props);

      const token =localStorage.getItem("token");
      let loggedin = true;
      if(token == null){
        loggedin =false
      }
  
      this.setDefaultImage = this.setDefaultImage.bind(this);
      this.uploadImage = this.uploadImage.bind(this);
  
      this.state = {
        multerImage: 'logo192.png',
        firebaseImage: 'logo192.png',
        uploaded: [],
        loggedin
      }  
    }
    
    setDefaultImage(uploadType){
      if (uploadType === "multer"){
        this.setState({
          multerImage: 'logo192.png'
        });
      } else if(uploadType === "firebase"){
        this.setState({
          firebaseImage: 'logo192.png'
        });
      }
    }
  
  
    //function to upload image once it has been captured
    uploadImage(e, method){
      let imageObj ={};
  
      if(method === "multer"){
        let imageFormObj =new FormData();
  
        imageFormObj.append("imageName", "multer-image-" + Date.now());
        imageFormObj.append("imageData", e.target.files[0]);
  
        //stores aredable instance of the image being uploaded using multer
        this.setState({
          multerImage: URL.createObjectURL(e.target.files[0])
        });
  
        axios.post('https://murmuring-sands-22620.herokuapp.com/image/uploadmulter', imageFormObj)
          .then((data) => {
            if (data.data.success){
              alert("Image has been successfully uploaded using multer");
              this.setDefaultImage("multer");
            }
          })
          .catch((err) => {
            alert("error while uploading image using multer");
            this.setDefaultImage("multer");
        });
      }
  
      else if(method === "firebase"){
        let currentImageName = "firebase-image-" + Date.now();
        let uploadImage = storage.ref(`images/${currentImageName}`).put(e.target.files[0]);
  
        uploadImage.on('state_changed',
          (snapshot) => { },
          (error) => {alert(error);},
          () => 
            storage.ref('images').child(currentImageName).getDownloadURL().then(url => {
              this.setState({
                firebaseImage: url
              });
  
              //store image object in the database
              imageObj = {
                imageName: currentImageName,
                imageData: url
              };
  
              axios.post('https://murmuring-sands-22620.herokuapp.com/image/uploadbase', imageObj)
                .then((data) => {
                  if(data.data.success){
                    alert("image has beeen successfully stored using firebase storage");
                    this.setDefaultImage("firebase");
                  }
                })
                .catch((err) => {
                  alert("error while uploading image using firebase storege");
                  this.setDefaultImage("firebase");
                });
            })
        )
  
      }
  
    }
  
  
    render() { 
      if(this.state.loggedin === false){
        return <Redirect to="/" />
      }
      return ( 
        <div className="container-fluid p-3 mb-2 text-dark bg-light">
          <Navbar />
        <div className="container">
          
          <p className="h1 text-center" >Image Uploader</p>
          
          <form>
          <div className="image-container">
            {/*<div className="process p-3 mb-2 bg-primary text-white">
              <h4 className="process__heading text-center">Using multer</h4>
              <p className="process__details text-center" >upload image to a node server, connected to a mongoDB database, with the help of multer</p>
  
              <input type="file" className="prosess__upload-btn" onChange={(e)=> {this.uploadImage(e, "multer")}} />
              <img src={this.state.multerImage} alt="upload-project" className="process__image" />
              
              
            </div>*/}
  
            
            
            <div className="p-3 mb-2 bg-secondary text-white">
              <h4 className="text-center">Using firebase storage</h4>
              <p className="text-center">upload image to firebase storage and retrieve a reference to the image</p>
  
              <input type="file" onChange={(e) => this.uploadImage(e, "firebase")} />
              <img src={this.state.firebaseImage} alt="upload-project" />
            </div>
          </div>
          </form>

          <Footer/>

          
  
          
        </div>
        </div>
       );
    }
  }
   
  export default Uploader;