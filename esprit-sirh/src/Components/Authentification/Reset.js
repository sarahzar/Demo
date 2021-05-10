import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import axios from "axios";


export default class Reset extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.validPassword=this.validPassword.bind(this)
    this.state = {
      passwordConfirm: "",
      password: "",
      loading: false,
      message: "",
      messageSuccess: "",
    };
  }



  onChangePasswordConfirm(e) {
    this.setState({
        passwordConfirm: e.target.value
    });
  }

  validPassword(e) {
    if (e.target.value!=this.state.password) {
         return true;
    }
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      message: "",
      messageSuccess: "",
      loading: true
    });

    this.form.validateAll();

    const resetInfos={
      token: this.props.match.params.token,
      newPassword: this.state.passwordConfirm
    };

        if (this.checkBtn.context._errors.length === 0) {
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
            this.setState({
                loading: false
            });
        }
    }

  render() {
    const required = value => {
        if (!value) {
          return (
            <div className="alert alert-danger" role="alert">
              This field is required!
            </div>
          );
        }
      };
    const match = value => {
        if (value!=this.state.password) {
          return (
            <div className="alert alert-danger" role="alert">
              Mot de passe incorrect!
            </div>
          );
        }
      };
      if(this.state.messageSuccess){
         return  <Redirect to={'/'} />
      }
    return (
      <div className="col-md-12">
        <div className="card card-container">
         

          <Form
            onSubmit={this.handleSubmit}
            ref={c => {
              this.form = c;
            }}
          >
         

            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="passwordConfirm">Confirmer le mot de passe</label>
              <Input
                type="password"
                className="form-control"
                name="passwordConfirm"
                value={this.state.passwordConfirm}
                onChange={this.onChangePasswordConfirm}
                validations={[required,match]}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
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
    );
  }
}
