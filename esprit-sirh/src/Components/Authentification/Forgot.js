import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import axios from "axios";
import { isEmail } from "validator";


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
export default class Forgot extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);

    this.state = {
      mail: "",
      loading: false,
      message: "",
      messageSuccess: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      mail: e.target.value
    });
  }


  handleSubmit(e) {
    e.preventDefault();

    const mailInfos = {
      mail: this.state.mail,
    };

    this.setState({
      loading: true,
      message: "",
      messageSuccess: "",
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {

      axios.post("http://localhost:8085/SIRH_Esprit/forgot_password",mailInfos).then(
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
     
    }else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
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
              <label htmlFor="mail">e-mail</label>
              <Input
                type="text"
                className="form-control"
                name="mail"
                value={this.state.mail}
                onChange={this.onChangeUsername}
                validations={[required,email]}
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