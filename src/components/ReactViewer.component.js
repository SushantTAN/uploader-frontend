import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Carousel, CarouselItem, CarouselProps } from 'react-bootstrap';
import {useState} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Navbar from './navbar.component';
import Footer from './footer';

 


function Example(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const rotLeft = (arr, rotations) => {
    const rotatedArray = arr.concat();
    for(let i=0; i < rotations; i++){
      const frontItem = rotatedArray.shift();
      rotatedArray.push(frontItem);
    }
    return rotatedArray;
  }

 

  var k = 0;

  return (<div>
     <h2 className="text-center">The Viewer<span className="badge badge-secondary">React Images</span></h2>
     <p></p>

    {/* list of images */}
    {
      props.arr.map(c => {
        return(
          <Button style={{width: "10rem", height: "10rem"}} variant="primary" onClick={() => {handleShow(); props.findPos(c)}}>
            
            <img src={c} style={{width: "100%", height: "100%"}} className="d-block w-100" />
            
          </Button>
        );
      })
    }
     
    {/* the modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body >

          {/* the carousel */}
        <Carousel style={{width: "100%", height: "100%" }}>
          {
            rotLeft(props.arr, props.pos).map(c => {
                return  <Carousel.Item style={{height:"100%", width:"100%"}}><img src={c}  className="d-block w-100" /></Carousel.Item>
            })
          }
  
        </Carousel>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      </div>
    
  );
}


class ReactViewer extends Component {
  constructor(props){
    super(props);

    const token =localStorage.getItem("token");
    let loggedin = true;
    if(token == null){
      loggedin =false
    }

  
  this.state = {  
    currentdb: [],
    pos: '',
    loggedin
  }
}

  componentDidMount() {
    axios.get('https://murmuring-sands-22620.herokuapp.com/image/uploadbase')
      .then(res => {
        if(res.data.length) {
          this.setState({
            currentdb: res.data.map(images => images.imageData),
          })
        }
      }
      )
      .catch((error) => {
        console.log(error);
      })
  }

  findPos = (p) => {
    var j=0;
    for(let i=0; i <= this.state.currentdb.length; i++){
      
      if(this.state.currentdb[i] === p){
        this.setState({pos: j});
      }
      j++;
    }
  }
      
      
  render() { 
    if(this.state.loggedin === false){
      return <Redirect to="/" />
    }
    return (<div className="container-fluid p-3 mb-2 text-dark bg-light">
      <Navbar />
      
      <Example 
        arr={this.state.currentdb} 
        findPos={this.findPos.bind(this)} 
        pos={this.state.pos}
      />

      <Footer/>
     
      </div>

    );
  }
}

export default ReactViewer;
