import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import axios from "axios";
import { isEmail } from "validator";
import { Redirect, Link } from 'react-router-dom';
import ValidationService from "../../services/Validation/ValidationService";


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
class Forgot extends Component {
  constructor(props) {
    super(props);

    ValidationService.validator.autoForceUpdate = this;

    this.state = {
      mail: "",
      loading: false,
      message: "",
      messageSuccess: "",
      touched: {}
    };
  }

  onChangeUsername = (e) => {

    let touchedElements = { ...this.state.touched }
    touchedElements['mail'] = true;

    this.setState({
      mail: e.target.value,
      touched: touchedElements
    });
  }


  handleSubmit = (e) => {
    e.preventDefault();

    const mailInfos = {
      mail: this.state.mail,
    };

    this.setState({
      loading: true,
      message: "",
      messageSuccess: "",
    });

    ValidationService.validator.purgeFields();
    this.addMessages();
    if (ValidationService.validator.allValid()) {

      axios.post("http://localhost:8085/SIRH_Esprit/forgot_password", mailInfos).then(
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
    ValidationService.validator.message('mail', this.state.mail, 'required|email', { className: 'text-danger' })
  }
  markUsTouched() {
    this.state.touched['mail'] = true;
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
                        <h1 className="h4 text-gray-900 mb-4">Réinitialisation mot de passe</h1>
                      </div>

                      <Form
                        onSubmit={this.handleSubmit}
                        ref={c => {
                          this.form = c;
                        }}
                      >
                        <div className="form-group">

                          <Input
                            type="text"
                            className={this.state.touched && this.state.touched['mail'] && (!this.state.mail || !isEmail(this.state.mail)) ? "form-control form-control-user is-invalid" : "form-control form-control-user"}
                            placeholder="Addresse Email"
                            name="mail"
                            value={this.state.mail}
                            onChange={this.onChangeUsername}
                            onBlur={() => ValidationService.validator.showMessageFor('mail')}
                          />
                          {/* msg erreur */}
                          {this.state.touched && this.state.touched['mail'] && ValidationService.validator.message('mail', this.state.mail, 'required|email', { className: 'text-danger' })}

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

                      <hr />
                      <div className="text-center small">
                        <Link to="/"
                        >Retour à la page d'accueil</Link>
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

export default Forgot;