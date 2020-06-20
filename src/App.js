import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Uploader from './components/uploader.component';

import Viewer from './components/viewuploads.component';
import ReactViewer from './components/ReactViewer.component';
import Login from './components/login';
import Logout from './components/logout';



function App() {
  return (
    
      
    
    <Router>
      
      <div >
      
          <br/>
          <Route path="/" exact component={Login} />
          <Route path="/logout"  component={Logout} />
          <Route path="/uploader" exact component={Uploader}/>
          <Route path="/viewuploads" exact component={Viewer}/>  
          <Route path="/reactviewuploads" exact component={ReactViewer}/>
      </div>
    </Router>
    

  

  );
}

export default App;



