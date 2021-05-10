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
// import { login } from '../_actions/auth';
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      loading: true,
      redirect:false
    });

    this.form.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
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
    this.setState({
      loading: false,
    });
  }
  }

  render() {
    const { loggedIn } = this.props;
    const { alert } = this.props;
    const { loading } = this.props;
    const { username } = this.props;
    if (loggedIn) {
      return <Redirect to={{
        pathname: '/profile',
        state: {
          login: username
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
                          <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                          <div className="col-lg-6">
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
              
              <Input
                type="text"
                className="form-control form-control-user"
                placeholder="Addresse Email"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]}
              />
            </div>

            <div className="form-group">
        
              <Input
                type="password"
                className="form-control form-control-user"
                placeholder="Mot de passe"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div>

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

            {alert.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {alert.message}
                </div>
              </div>
            )}
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
    return { loggedIn,loading,alert ,username};
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