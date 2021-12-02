import React, { Component } from "react";
import { Redirect,Link } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { connect } from "react-redux";
import { userActions } from '../../_actions';
import { posteActions } from "../../_actions/Shared/Nomenclatures/poste.actions";
import { diplomeActions } from "../../_actions/Shared/Nomenclatures/diplome.actions";
import { domaineActions } from "../../_actions/Shared/Nomenclatures/domaine.actions";
import { etablissementActions } from "../../_actions/Shared/Nomenclatures/etablissement.actions";
import { etatCivilActions } from "../../_actions/Shared/Nomenclatures/etatCivil.actions";
import { specialiteActions } from "../../_actions/Shared/Nomenclatures/specialite.actions";
import { typeCondidatureActions } from "../../_actions/Shared/Nomenclatures/typeCondidature.actions";
import { paysActions } from "../../_actions/Shared/Nomenclatures/pays.actions";
import { modulesActions } from "../../_actions/Shared/Nomenclatures/modules.actions";
import ValidationService from "../../services/Validation/ValidationService";
import { isEmail } from "validator";
// import { login } from '../_actions/auth';


class Login extends Component {
  constructor(props) {
    super(props);

    ValidationService.validator.autoForceUpdate = this;

    this.state = {
      username: "",
      password: "",
      loading: false,
      touched: {}
    };
  }

  onChangeUsername = (e) => {
    let touchedElements = { ...this.state.touched }
    touchedElements['mail'] = true;

    this.setState({
      username: e.target.value,
      touched: touchedElements
    });
  }

  onChangePassword = (e) => {
    let touchedElements = { ...this.state.touched }
    touchedElements['pwd'] = true;

    this.setState({
      password: e.target.value,
      touched: touchedElements
    });
  }

  handleLogin = (e) => {
    e.preventDefault();

    this.setState({
      loading: true,
      redirect:false
    });

    ValidationService.validator.purgeFields();
    this.addMessages();
    if (ValidationService.validator.allValid()) {
      this.props.allPostes();
      this.props.allDiplomes();
      this.props.allEtablissements();
      this.props.allEtatCivil();
      this.props.allSpecialites();
      this.props.allTypesCondidatures();
      this.props.allDomaines();
      this.props.allPays();
      this.props.allModules()
      this.props.login(this.state.username, this.state.password);   
  } else {
    this.markUsTouched()
    ValidationService.validator.showMessages()
    
    this.setState({
      loading: false,
    });
  }
  }

  addMessages() {   
    ValidationService.validator.message('mail', this.state.username,  'required|email', { className: 'text-danger' })
    ValidationService.validator.message('pwd', this.state.password, 'required', { className: 'text-danger' }); 
  }
  markUsTouched() {
    this.state.touched['mail'] = true;
    this.state.touched['pwd'] = true;
  }


  render() {
    const { loggedIn } = this.props;
    const { alert } = this.props;
    const { loading } = this.props;
    const { username } = this.props;
    const { postes } = this.props;
    const { diplomes } = this.props;
    const { etablissements } = this.props;
    const { modules } = this.props;
    const { etatCivils } = this.props;
    const { pays } = this.props;
    const { types } = this.props;
    const { domaines } = this.props;
    const { specialites } = this.props;
    
    console.log("postes from login",postes)
    if (loggedIn) {
      return <Redirect to={{
        pathname: '/infosGenerales',
        state: {
          login: username,
          postes: postes,
          diplomes: diplomes,
          etablissements: etablissements,
          modules: modules,
          etatCivils: etatCivils,
          pays: pays,
          types: types,
          domaines: domaines,
          specialites: specialites
        }
      }} />;
      // document.getElementById("linkToProfile").click();
    }

    return (
      <div class="container">
      <div className="row justify-content-center">

          <div className="col-xl-10 col-lg-12 col-md-9">

              <div className="card o-hidden border-0 shadow-lg my-5">
                  <div className="card-body p-0">
                  
                      <div className="row">
                          <div className="col-lg-5 d-none d-lg-block bg-login-image"></div>
                          <div className="col-lg-7">
                              <div className="p-5">
                                  <div className="text-center">
                                      <h1 className="h4 text-gray-900 mb-4">Authentication!</h1>
                                  </div>

          <Form className="user"
            onSubmit={this.handleLogin}
            ref={(c) => {
              this.form = c;
            }}
          >
            <div className="form-group">
              
              <input
                type="text"
                className={this.state.touched && this.state.touched['mail'] && (!this.state.username || !isEmail(this.state.username))  ? "form-control form-control-user is-invalid" : "form-control form-control-user" }
                placeholder="Addresse Email"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
                onBlur={() => ValidationService.validator.showMessageFor('mail')}
                  />
                   {/* msg erreur */}
                   {this.state.touched && this.state.touched['mail']  && ValidationService.validator.message('mail', this.state.username, 'required|email', { className: 'text-danger' })}

            </div>

            <div className="form-group">
        
              <input
                type="password"
                className={this.state.touched && this.state.touched['pwd'] && !this.state.password ? "form-control form-control-user is-invalid" : "form-control form-control-user" }
                placeholder="Mot de passe"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                onBlur={() => ValidationService.validator.showMessageFor('pwd')}
              />
              {/* msg erreur */}
              {this.state.touched && this.state.touched['pwd']  && ValidationService.validator.message('pwd', this.state.password, 'required', { className: 'text-danger' })}

            </div>

            {alert.message && (
              <div className="form-group mb-2">
                <div className="alert alert-danger" role="alert">
                  {alert.message}
                </div>
              </div>
            )}

            <div className="form-group">
            <button
                className="btn btn-primary btn-user btn-block"
                disabled={loading}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>

           
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
          <hr/>
                    <div className="text-center small">
                      <Link to="/forgot"
                      >Mot de passe oublié?</Link>
                    </div>
                                    <div className="text-center">
                                        <Link className="small" to="/home">créer un compte!</Link>
                                        {/* <a className="small" href="/profile" hidden="true" id="linkToProfile"></a> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
    const { loggedIn } = state.authentication;
    const { alert } = state;
    const { username } = state.authentication;
    const { loading } = state.authentication;
    const { postes } = state.poste;
    const { diplomes } = state.diplome;
    const { domaines } = state.domaine;
    const { etablissements } = state.etablissement;
    const { etatCivils } = state.etatCivil;
    const { specialites } = state.specialite;
    const { types } = state.typeCondidature;
    const { pays } = state.pays;
    const { modules } = state.module;
    return { loggedIn,loading,alert ,username,postes,diplomes,domaines,
      etablissements,etatCivils,specialites,types,pays,modules};
}
  const actionCreators = {
    login: userActions.login,
    logout: userActions.logout,
    allPostes: posteActions.allPostes,
    allDiplomes: diplomeActions.allDiplomes,
    allDomaines: domaineActions.allDomaines,
    allEtablissements: etablissementActions.allEtablissements,
    allEtatCivil: etatCivilActions.allEtatCivil,
    allSpecialites: specialiteActions.allSpecialites,
    allTypesCondidatures: typeCondidatureActions.allTypesCondidatures,
    allPays: paysActions.allPays,
    allModules:modulesActions.allModules
  };
export default connect(mapStateToProps,actionCreators)(Login);