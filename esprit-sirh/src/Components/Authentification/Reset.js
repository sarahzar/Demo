import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import axios from "axios";
import ValidationService from "../../services/Validation/ValidationService";


export default class Reset extends Component {
  constructor(props) {
    super(props);

    ValidationService.validator.autoForceUpdate = this;

    this.state = {
      passwordConfirm: "",
      password: "",
      loading: false,
      message: "",
      messageSuccess: "",
      touched: {}
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

  onChangePassword = (e) => {
    let touchedElements = { ...this.state.touched }
    touchedElements['pwd'] = true;

    this.setState({
      password: e.target.value,
      touched: touchedElements
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({
      message: "",
      messageSuccess: "",
      loading: true
    });

    

    const resetInfos={
      token: this.props.match.params.token,
      newPassword: this.state.passwordConfirm
    };

    ValidationService.validator.purgeFields();
    this.addMessages();
    if (ValidationService.validator.allValid()) {
            axios.post("http://localhost:8085/SIRH_Esprit/reset_password", resetInfos).then(
                resp => {
                    if (resp.data.succesMessage) {
                        const resMessage =
                            (resp.data.succesMessage)
                        this.setState({
                            loading: false,
                            messageSuccess: resMessage
                        });
                    } else {
                        const resMessage =
                            (resp.data.errorMessage)
                        this.setState({
                            loading: false,
                            message: resMessage
                        });
                    }

                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        loading: false,
                        message: resMessage
                    });
                }
            );
        } else {

          this.markUsTouched()
          ValidationService.validator.showMessages()
          
            this.setState({
                loading: false
            });
        }
    }

    addMessages() {   
      ValidationService.validator.message('confirm', this.state.passwordConfirm,  ['required',{ match: this.state.password }], { className: 'text-danger' })
      ValidationService.validator.message('pwd', this.state.password, 'required|validPassword', { className: 'text-danger' });
    }
    markUsTouched() {
      this.state.touched['confirm'] = true;
      this.state.touched['pwd'] = true;
    }

  render() {
   
    return (
      <div class="container">
        <div className="row justify-content-center">

          <div className="col-xl-10 col-lg-12 col-md-9">

            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body">

                <div className="row justify-content-center">

                  <div class="col-lg-6">
                  <div className="p-5">
                                  <div className="text-center">
                                      <h1 className="h4 text-gray-900 mb-4">Nouveau mot de passe</h1>
                                  </div>

          <Form
            onSubmit={this.handleSubmit}
            ref={c => {
              this.form = c;
            }}
          >
         

            <div className="form-group">
             
              <input
                type="password"
                className={this.state.touched && this.state.touched['pwd'] && (!this.state.password || (this.state.password.length < 6 || this.state.password.length > 40) ) ? "form-control form-control-user is-invalid" : "form-control form-control-user" }
                placeholder="Mot de passe"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                onBlur={() => ValidationService.validator.showMessageFor('pwd')}
                />
                   {/* msg erreur */}
         {this.state.touched && this.state.touched['pwd']  && ValidationService.validator.message('pwd', this.state.password, 'required|validPassword', { className: 'text-danger' })}

            </div>

            <div className="form-group">
             
              <input
                type="password"
                className={this.state.touched && this.state.touched['confirm'] && (!this.state.passwordConfirm || (this.state.passwordConfirm && (this.state.password != this.state.passwordConfirm))) ? "form-control form-control-user is-invalid" : "form-control form-control-user" }
                placeholder="Confirmer le mot de passe"
                name="passwordConfirm"
                value={this.state.passwordConfirm}
                onChange={this.onChangePasswordConfirm}
                onBlur={() => ValidationService.validator.showMessageFor('confirm')}
                />
                 {/* msg erreur */}
        {this.state.touched && this.state.touched['confirm']  && ValidationService.validator.message('confirm', this.state.passwordConfirm,  ['required',{ match: this.state.password }], { className: 'text-danger' })}

            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-user btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Confirmer</span>
              </button>
            
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
             {this.state.messageSuccess && (
              <div className="form-group">
                <div className="alert alert-success" role="alert">
                  {this.state.messageSuccess}
                  <a href="/login">&nbsp;connectez-vous!</a>
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
