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

const ROLE_ENSEIGNANT =  'ENSEIGNANT';


const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};
/*onst vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};
*/
const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
   // this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);

    this.state = {
      username: "",
      password: "",
      successful: false,
      message: "",
      passwordConfirm: "",
    };
  }

  onChangePasswordConfirm(e) {
    this.setState({
        passwordConfirm: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      // UserService.register(
      //   this.state.username,       
      //   this.state.password,
      //   this.state.username,
      //   ROLE_ENSEIGNANT
      // ).then(
      //   response => {
      //     this.setState({
      //       message: response.data.succesMessage ? 
      //       response.data.succesMessage : 
      //       response.data.errorMessage,
      //       successful: response.data.succesMessage ? true : false
      //     });
      //     if(response.data.succesMessage){
      //       this.props.history.push("/profile");
      //       window.location.reload();
      //     }
      //   },
      //   error => {
      //     const resMessage =
      //       (error.response &&
      //         error.response.data &&
      //         error.response.data.message) ||
      //       error.message ||
      //       error.toString();

      //     this.setState({
      //       successful: false,
      //       message: resMessage
      //     });
      //   }
      // );
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
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { registerd } = this.props;
    const { alert } = this.props;
    const { loading } = this.props;
    const { username } = this.props;
    const match = value => {
      if (value!=this.state.password) {
        return (
          <div className="alert alert-danger" role="alert">
            Mot de passe incorrect!
          </div>
        );
      }
    };
    if (registerd) {
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
                        <h1 className="h4 text-gray-900 mb-4">Créer votre compte!</h1>
                    </div>

          <Form className="user"
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
           

                <div className="form-group">
                 
                  <Input
                    type="text"
                    className="form-control form-control-user"
                    placeholder="Addresse Email"
                    name="email"
                    value={this.state.username}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                      <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">

                          <Input
                            type="password"
                            placeholder="Mot de passe"
                            className="form-control form-control-user"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            validations={[required, vpassword]}
                          />
                        </div>
                        <div className="col-sm-6 mb-3 mb-sm-0">

                          <Input
                            type="password"
                            placeholder="Répéter mot de passe"
                            className="form-control form-control-user"
                            name="passwordConfirm"
                            value={this.state.passwordConfirm}
                            onChange={this.onChangePasswordConfirm}
                            validations={[required, match]}
                          />
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
  const {login} = state.registration;
  return { loading,alert ,registerd,login};
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