import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import {storage} from '../firebase-config';
import {Redirect} from 'react-router-dom';
import Navbar from './navbar.component';
import Footer from './footer';



function Modal (props){
  
  return(
    <div>
      <div className="modal fade  " id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
              <div className="modal-body">  
                <img src={props.preview} style={{width:"100%", heigh:"100%"}}/>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button onClick={() => {props.deleteImg(props.modalname, props.id)}} type="button" className="btn btn-danger" data-dismiss="modal">delete</button>

               
              </div>
          </div>
        </div>
      </div>

      {
        props.arr.map(c => {
          return (
            <button  onClick={() => props.update(c.url, c.name, c.id)} className="btn btn-secondary" data-toggle="modal" data-target="#exampleModal" >
              <img src={c.url}  style={{height: "6rem", width: "6rem"}}/>
            </button>        
          )
        })
      }
    </div>)
}

class Viewer extends Component {
    constructor(props) {
        super(props);

        const token =localStorage.getItem("token");
        let loggedin = true;
        if(token == null){
          loggedin =false
        }

        this.fetch = this.fetch.bind(this);
        this.display = this.display.bind(this);
        this.deleteImg = this.deleteImg.bind(this);
        

        this.state = {  
            currentImg: [],
            currentdb: [{
              name: '',
              url: '',
              id: ''

            }],
            modalimg: '',
            modalname: '',
            modalid: '',
            loggedin
           
        }
    }

    deleteImg(m, i){
      // Create a reference to the file to delete
      var desertRef = storage.ref('images/').child(m);

      // Delete the file
      desertRef.delete().then(function() {
        // File deleted successfully
      }).catch(function(error) {
        // Uh-oh, an error occurred!
      });

      axios.delete('https://murmuring-sands-22620.herokuapp.com/image/delete/' + i)
        .then(response => { console.log(response.data); });

        this.setState({
          currentdb: this.state.currentdb.filter(el => el.id !== i)
        })
      
    }

    updateState(url, nam, i){
      this.setState({
        modalimg: url,
        modalname: nam,
        modalid: i

      })
    }

    fetch(){
        var i=0;
        var storageRef = storage.ref();
        storageRef.child('images/').listAll().then((result) => {
        result.items.forEach((imageRef) => {
            //console.log("image reference" + imageRef.toString);
            i++;
            imageRef.getDownloadURL().then((url) => {
                console.log(url);
                
            

            });
        });
     });
    }

    display(){
       return (
        <div>
        {
            this.state.currentdb.map(c => {
                return <div><img src={c} width="400rem" /> <br/> </div>
            })
        }
        </div>
       );
    }

    download(name){
      // Create a reference to the file we want to download
var starsRef = storage.ref('images/').child(name);

// Get the download URL
starsRef.getDownloadURL().then(function(url) {
  return( <a download={this.state.modalname} target="_blank" href={this.state.modalimg} >download 2</a>)
}).catch(function(error) {

  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/object-not-found':
      // File doesn't exist
      break;

    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      break;

    case 'storage/canceled':
      // User canceled the upload
      break;

    

    case 'storage/unknown':
      // Unknown error occurred, inspect the server response
      break;
  }
});
    }

    componentDidMount() {
        axios.get('https://murmuring-sands-22620.herokuapp.com/image/uploadbase')
          .then(res => {
              if(res.data.length) {
              this.setState({
                currentdb: res.data.map(images => ({name: images.imageName, url: images.imageData, id: images._id} )),
                })
            }
         }
           
            )
            
          .catch((error) => {
            console.log(error);
          });

         
    
      }

  render() {
    if(this.state.loggedin === false){
      return <Redirect to="/" />
    }
    return (
      <div className="container-fluid p-3 mb-2 text-dark bg-light">
        <Navbar />
        <h2 className="text-center">The Viewer<span className="badge badge-secondary">Images</span></h2>

          <div className="btn-group" role="group" aria-label="Basic example">
            <button onClick={this.fetch} type="button" className="btn btn-secondary">fetch</button>
            <button onClick={this.display} type="button" className="btn btn-secondary">display</button>
          </div>
            <p> </p>

            <Modal 
              arr={this.state.currentdb}
              update={this.updateState.bind(this)}
              preview={this.state.modalimg}
              deleteImg={this.deleteImg.bind(this)}
              modalname={this.state.modalname}
              id={this.state.modalid}
              download={this.download}
            />   

            <Footer/>
            
      </div>        
    );
  }
}
 
export default Viewer;