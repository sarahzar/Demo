import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Switch, Route, Link ,Redirect} from "react-router-dom";
import UserService from "../../services/Authentification/UserService";
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

const ROLE_ENSEIGNANT =  'ENSEIGNANT';



class Register extends Component {
  constructor(props) {
    super(props);

    ValidationService.validator.autoForceUpdate = this;

    this.state = {
      username: "",
      password: "",
      successful: false,
      message: "",
      passwordConfirm: "",
      touched: {},
    };
  }

  onChangePasswordConfirm = (e) => {
    let touchedElements = { ...this.state.touched }
    touchedElements['confirm'] = true;

    this.setState({
        passwordConfirm: e.target.value,
        touched: touchedElements
    });
  }
  onChangeEmail = (e) => {
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

  handleRegister = (e) => {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
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
      this.props.register(this.state.username,this.state.password,this.state.username, ROLE_ENSEIGNANT  )  
    }else {
      this.markUsTouched()
      ValidationService.validator.showMessages()
      this.setState({
        loading: false,
      });
    }
  }

  addMessages() {

    ValidationService.validator.message('confirm', this.state.passwordConfirm,  ['required',{ match: this.state.password }], { className: 'text-danger' })
    ValidationService.validator.message('mail', this.state.username,  'required|email', { className: 'text-danger' })
    ValidationService.validator.message('pwd', this.state.password, 'required|validPassword', { className: 'text-danger' });
  
  }
  markUsTouched() {

    this.state.touched['confirm'] = true;
    this.state.touched['mail'] = true;
    this.state.touched['pwd'] = true;
   

  }

  render() {
    const { registerd } = this.props;
    const { alert } = this.props;
    const { loading } = this.props;

  
    if (registerd == true) {
      return <Redirect to={{
        pathname: '/profile',
        state: {
          userlogin: this.state.username
        }
      }} />;

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
                        <h1 className="h4 text-gray-900 mb-4">Créer votre compte!</h1>
                    </div>

          <Form className="user"
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
           

                <div className="form-group">
                 
                  <input
                    type="email"
                    className={this.state.touched && this.state.touched['mail'] && (!this.state.username || !isEmail(this.state.username))  ? "form-control form-control-user is-invalid" : "form-control form-control-user" }
                    placeholder="Addresse Email"
                    name="email"
                    value={this.state.username}
                    onChange={this.onChangeEmail}
                    onBlur={() => ValidationService.validator.showMessageFor('mail')}
                  />
                   {/* msg erreur */}
                   {this.state.touched && this.state.touched['mail']  && ValidationService.validator.message('mail', this.state.username, 'required|email', { className: 'text-danger' })}

                </div>

                      <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">

                          <input
                            type="password"
                            placeholder="Mot de passe"
                            className={this.state.touched && this.state.touched['pwd'] && (!this.state.password || (this.state.password.length < 6 || this.state.password.length > 40) ) ? "form-control form-control-user is-invalid" : "form-control form-control-user" }
                            name="password"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            onBlur={() => ValidationService.validator.showMessageFor('pwd')}
                          />
                             {/* msg erreur */}
                   {this.state.touched && this.state.touched['pwd']  && ValidationService.validator.message('pwd', this.state.password, 'required|validPassword', { className: 'text-danger' })}

                        </div>
                        <div className="col-sm-6 mb-3 mb-sm-0">

                          <input
                            type="password"
                            placeholder="Répéter mot de passe"
                            className={this.state.touched && this.state.touched['confirm'] && (!this.state.passwordConfirm || (this.state.passwordConfirm && (this.state.password != this.state.passwordConfirm))) ? "form-control form-control-user is-invalid" : "form-control form-control-user" }
                            name="passwordConfirm"
                            value={this.state.passwordConfirm}
                            onChange={this.onChangePasswordConfirm}
                            onBlur={() => ValidationService.validator.showMessageFor('confirm')}
                          />
                           {/* msg erreur */}
                  {this.state.touched && this.state.touched['confirm']  && ValidationService.validator.message('confirm', this.state.passwordConfirm,  ['required',{ match: this.state.password }], { className: 'text-danger' })}

                        </div>
                      </div>
              
                  <button className="btn btn-primary btn-user btn-block" disabled={loading}>
                  {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                   )}
                    enregistrer</button>
                 
           
           

            {alert.message && (
              <div className="form-group">
                <div
                  className="alert alert-danger"
                  role="alert"
                >
                  {alert.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
          <hr/>
                            <div className="text-center small">
                            <Link to="/login">vous avez déjà un compte ?</Link>
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
  const { registerd } = state.registration;
  const { alert } = state;
  const { loading } = state.registration;
  const { login } = state.registration;
  const { postes } = state.poste;
  const { diplomes } = state.diplome;
  const { domaines } = state.domaine;
  const { etablissements } = state.etablissement;
  const { etatCivils } = state.etatCivil;
  const { specialites } = state.specialite;
  const { types } = state.typeCondidature;
  const { pays } = state.pays;
  const { modules } = state.module;
  return { loading,alert ,registerd,login,postes,diplomes,domaines,
    etablissements,etatCivils,specialites,types,pays,modules};
}
const actionCreators = {
  register: userActions.register,
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
export default connect(mapStateToProps,actionCreators)(Register);