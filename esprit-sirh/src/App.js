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
import Footer from "./Layout/Footer"
import Parcour from "./Components/Condidature/Parcours/Parcour"
import { useLocation } from 'react-router-dom'
import ExperienceEnseignant from './Components/Condidature/Experiences/ExperienceEnseignant';
import ExperienceProfessionel from './Components/Condidature/Experiences/ExperienceProfessionel';
import Competence from './Components/Condidature/Competences/Competence';
import Recherche from './Components/Condidature/Recherches/Recherche';
import Documents from './Components/Condidature/Documents/Documents';
import TerminerInscription from './Components/Condidature/ValidationInscription/TerminerInscription';
import UserInfos from './Components/Authentification/UserInfos';
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { connect } from 'react-redux';
import { AccesDenied } from './Components/Authentification/AccesDenied';
import { AdminHome } from './Components/Administration/AdminHome';
import RechercheCondidat from './Components/Administration/RechercheCondidat';


// using CommonJS modules
// const GuardProvider = require('react-router-guards').GuardProvider;
// const GuardedRoute = require('react-router-guards').GuardedRoute;



class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const pathname = window.location.pathname
    console.log("path", pathname);

    const requireLoginEns = (to, from, next) => {
      if (to.meta.auth) {

        const { loggedIn } = this.props
        const { role } = this.props
         
        if(!loggedIn){
          next.redirect('/login');
        }else if (loggedIn && role != 'ENSEIGNANT') {
          next.redirect('/denied');
        }else if(loggedIn && role == 'ENSEIGNANT'){
          next();
        }

      } else {
        next();
      }
    };


    const requireLoginAdmin = (to, from, next) => {
      if (to.meta.auth) {

        const { loggedIn } = this.props
        const { role } = this.props

        if(!loggedIn){
          next.redirect('/login');
        }else if (loggedIn && role != 'ADMIN') {
          next.redirect('/denied');
        }else if(loggedIn && role == 'ADMIN'){
          next();
        }

      } else {
        next();
      }
    };

    return (

      <body id="page-top" class="sidebar-toggled">
        <BrowserRouter>
          <GuardProvider guards={[requireLoginEns]} >
            <Switch>
              <GuardedRoute exact path="/infosGenerales" meta={{ auth: true }} component={Profile} />
              <GuardedRoute path="/parcour" meta={{ auth: true }} component={Parcour} />
              <GuardedRoute path="/expEnseignant" meta={{ auth: true }} component={ExperienceEnseignant} />
              <GuardedRoute path="/expPro" meta={{ auth: true }} component={ExperienceProfessionel} />
              <GuardedRoute path="/competence" meta={{ auth: true }} component={Competence} />
              <GuardedRoute path="/recherche" meta={{ auth: true }} component={Recherche} />
              <GuardedRoute path="/documents" meta={{ auth: true }} component={Documents} />
              <GuardedRoute path="/terminer" meta={{ auth: true }} component={TerminerInscription} />
              <GuardedRoute path="/profile" meta={{ auth: true }} component={UserInfos} />
            </Switch>
          </GuardProvider>

          <GuardProvider guards={[requireLoginAdmin]}>
            <Switch>
            <GuardedRoute path="/adminHome" component={AdminHome} meta={{ auth: true }} />
            </Switch>
          </GuardProvider>

          <GuardProvider>
            <Switch>
              <GuardedRoute path="/denied" component={AccesDenied} />
              <GuardedRoute exact path={["/", "/home"]} component={Register} />
              <GuardedRoute exact path="/forgot" component={Forgot} />
              <GuardedRoute exact path="/reset/:token" component={Reset} />
              <GuardedRoute exact path="/login" component={Login} />
              <GuardedRoute exact path="/rechercheCondidat" component={RechercheCondidat} />
            </Switch>
          </GuardProvider>

        </BrowserRouter>
        <Footer />
      </body>
    );
  }

}
function mapStateToProps(state) {
  const { loggedIn } = state.users;
  const { role } = state.users;
  return { loggedIn, role };
}
export default connect(mapStateToProps)(App);