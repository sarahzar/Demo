import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Switch, Route, Link } from "react-router-dom";
import Profile from './Components/Condidature/InformationsGenerales/Profile';
import Forgot from './Components/Authentification/Forgot';
import Reset from './Components/Authentification/Reset';
import Register from './Components/Authentification/Register';
import Login from './Components/Authentification/Login';
import Header from "./Layout/Header"
import Leftside from "./Layout/Leftside"
import Footer from  "./Layout/Footer"
import Parcour from "./Components/Condidature/Parcour"
import { useLocation } from 'react-router-dom'
import ExperienceEnseignant from './Components/Condidature/ExperienceEnseignant';
import ExperienceProfessionel from './Components/Condidature/ExperienceProfessionel';
import Competence from './Components/Condidature/Competence';
import Recherche from './Components/Condidature/Recherches/Recherche';
import Documents from './Components/Condidature/Documents';
class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const pathname = window.location.pathname 
    console.log("path",pathname);
    
    // if (pathname == "/" || (pathname == "/login")) {
    //   return  <div>

    //   <div id="wrapper">
     
    //     <div id="content-wrapper" className="d-flex flex-column">
    //       <div id="content">
    //         <Header />
                 
    //         <Switch>
    //           <Route exact path={["/", "/home"]} component={Register} />          
    //           <Route path="/login" component={Login} />          
    //         </Switch>

    //       </div>
    //       <Footer />  
    //     </div>
    //   </div>
    // </div>;
    // }
  return (
    
    
    <div>

      {/* <div id="wrapper">
      <Leftside></Leftside>  
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content"> */}
            {/* <Header /> */}
                 
            <Switch>
              <Route exact path={["/", "/home"]} component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/forgot" component={Forgot} />
              <Route exact path="/reset/:token" component={Reset} />
              <Route path="/login" component={Login} />
              <Route path="/parcour" component={Parcour} />
              <Route path="/expEnseignant" component={ExperienceEnseignant} />
              <Route path="/expPro" component={ExperienceProfessionel} />
              <Route path="/competence" component={Competence} />
              <Route path="/recherche" component={Recherche} />
              <Route path="/documents" component={Documents} />
            </Switch>

          {/* </div> */}
          <Footer />  
        {/* </div>
      </div> */}
    </div>
  );
  }
  
}

export default App;