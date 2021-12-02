import React, { Component } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import ValidationService from "../../services/Validation/ValidationService";
import Leftside from "../../Layout/Leftside";
import Header from "../../Layout/Header";
import { isEmail } from "validator";
import avatar from '../../img/unknown_avatar2.jpg';
import { connect } from "react-redux";
import AuthService from "../../services/Authentification/AuthService";
import CondidatService from "../../services/Condidature/CondidatService";
import { condidatActions } from "../../_actions/Shared/condidat.actions";
import { imageProfileAtions } from "../../_actions/Shared/image.profile.ations";
const FILES_LOCATION = "http://localhost/uploads/"
class UserInfos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            passwordConfirm: "",
            password: "",
            loading: false,
            message: "",
            typeMessage: "",
            username: "",
            touched: {},
            imgUrl: "",
            photo: null,
            initImageName: ""
        }

    }
    componentDidMount() {
        let initImageUrl = this.props.imagePath ? this.props.imagePath : avatar;
        this.setState({
            username: AuthService.getLogin(),
            imgUrl: initImageUrl
        });

    }

    onChangePasswordConfirm = (e) => {
        let touchedElements = { ...this.state.touched }
        touchedElements['confirm'] = true;

        this.setState({
            passwordConfirm: e.target.value,
            touched: touchedElements,
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
    onChangeEmail = (e) => {
        let touchedElements = { ...this.state.touched }
        touchedElements['mail'] = true;

        this.setState({
            username: e.target.value,
            touched: touchedElements
        });
    }
    onChangePhoto = (e) => {

        let newUrl = URL.createObjectURL(e.target.files[0]);
        let image = e.target.files[0];
        this.setState({
            imgUrl: newUrl,
            photo: image
        });

    }
    photoClick = e => {
        let photo = document.getElementById("selectedPhoto")
        if (photo) {
            photo.click()
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();


        ValidationService.validator.purgeFields();
        this.addMessages();

        if (ValidationService.validator.allValid()) {

            this.setState({
                loading: true
            });

            const user = {
                login: this.state.username,
                password: this.state.password
            }

            formData.append('file', this.state.photo);
            formData.append('user', JSON.stringify(user));

            CondidatService.updateUserInfos(AuthService.getLogin(), formData)
                .then(
                    resp => {
                        if (resp.data.succesMessage) {
                            this.setState({
                                message: resp.data.succesMessage,
                                typeMessage: "alert alert-success",
                                loading: false
                            })
                            CondidatService.getCondidat(AuthService.getLogin()).then(

                                data => {
                                    this.updatePhoto(data);
                                    this.props.setCondidat(data)
                                }
                            )
                        } else {
                            this.setState({
                                message: resp.data.errorMessage,
                                typeMessage: "alert alert-danger",
                                loading: false
                            })
                        }
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

    updatePhoto(data) {
        let year = new Date().getFullYear();
        let pathLogin = AuthService.getLogin();
        let path = "";
        data.documents.forEach(d => {
            if (d.type == 'PHOTO') {
                path = FILES_LOCATION + "/" + year + "/" + pathLogin + "/" + d.nom;
            }
        });
        this.props.setImage(path);
    }

    addMessages() {
        ValidationService.validator.message('confirm', this.state.passwordConfirm, ['required', { match: this.state.password }], { className: 'text-danger' })
        ValidationService.validator.message('pwd', this.state.password, 'required|validPassword', { className: 'text-danger' });
        ValidationService.validator.message('mail', this.state.username, 'required|email', { className: 'text-danger' })
    }
    markUsTouched() {
        this.state.touched['confirm'] = true;
        this.state.touched['pwd'] = true;
        this.state.touched['mail'] = true;
    }

    render() {

        return (
            <div id="wrapper">
                <Leftside></Leftside>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Header />


                        <div class="container">
                            <div className="row justify-content-center">

                                <div className="col-xl-10 col-lg-12 col-md-9">

                                    <div className="card o-hidden border-0 shadow-lg my-5">
                                        <div className="card-body">

                                            <div className="row justify-content-center">

                                                <div class="col-lg-6">
                                                    <div className="p-5">
                                                        <div className="text-center">
                                                            <h1 className="h4 text-gray-900 mb-4">Modifier votre profile</h1>
                                                        </div>

                                                        <Form
                                                            onSubmit={this.handleSubmit}
                                                            ref={c => {
                                                                this.form = c;
                                                            }}
                                                        >
                                                            {this.props.imagePath && (
                                                                <div>
                                                                    <button class="mx-auto d-block border-0 bg-transparent" onClick={this.photoClick}>
                                                                        <img className="img-profile rounded-circle mx-auto d-block mb-4" src={this.state.imgUrl} />
                                                                    </button>
                                                                    <input
                                                                        type="file"
                                                                        id="selectedPhoto"
                                                                        className="form-control form-control-sm selectedFile"
                                                                        name="file"
                                                                        onChange={this.onChangePhoto}
                                                                        accept="image/png,image/jpg,image/jpeg"
                                                                    />
                                                                </div>
                                                            )}
                                                            {!this.props.imagePath && (
                                                                <img className="img-profile rounded-circle mx-auto d-block mb-4" src={avatar} />
                                                            )}
                                                            <div className="form-group">

                                                                <input
                                                                    type="email"
                                                                    className={this.state.touched && this.state.touched['mail'] && (!this.state.username || !isEmail(this.state.username)) ? "form-control form-control-user is-invalid" : "form-control form-control-user"}
                                                                    placeholder="Addresse Email"
                                                                    name="email"
                                                                    value={this.state.username}
                                                                    onChange={this.onChangeEmail}
                                                                    onBlur={() => ValidationService.validator.showMessageFor('mail')}
                                                                />
                                                                {/* msg erreur */}
                                                                {this.state.touched && this.state.touched['mail'] && ValidationService.validator.message('mail', this.state.username, 'required|email', { className: 'text-danger' })}

                                                            </div>
                                                            <div className="form-group">

                                                                <input
                                                                    type="password"
                                                                    className={this.state.touched && this.state.touched['pwd'] && (!this.state.password || (this.state.password.length < 6 || this.state.password.length > 40)) ? "form-control form-control-user is-invalid" : "form-control form-control-user"}
                                                                    placeholder="Nouveau mot de passe"
                                                                    name="password"
                                                                    value={this.state.password}
                                                                    onChange={this.onChangePassword}
                                                                    onBlur={() => ValidationService.validator.showMessageFor('pwd')}
                                                                />
                                                                {/* msg erreur */}
                                                                {this.state.touched && this.state.touched['pwd'] && ValidationService.validator.message('pwd', this.state.password, 'required|validPassword', { className: 'text-danger' })}

                                                            </div>

                                                            <div className="form-group">

                                                                <input
                                                                    type="password"
                                                                    className={this.state.touched && this.state.touched['confirm'] && (!this.state.passwordConfirm || (this.state.passwordConfirm && (this.state.password != this.state.passwordConfirm))) ? "form-control form-control-user is-invalid" : "form-control form-control-user"}
                                                                    placeholder="Confirmer le mot de passe"
                                                                    name="passwordConfirm"
                                                                    value={this.state.passwordConfirm}
                                                                    onChange={this.onChangePasswordConfirm}
                                                                    onBlur={() => ValidationService.validator.showMessageFor('confirm')}
                                                                />
                                                                {/* msg erreur */}
                                                                {this.state.touched && this.state.touched['confirm'] && ValidationService.validator.message('confirm', this.state.passwordConfirm, ['required', { match: this.state.password }], { className: 'text-danger' })}

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
                                                                    <div className={this.state.typeMessage} role="alert">
                                                                        {this.state.message}
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
                    </div>
                </div>
            </div>

        );
    }
}
function mapStateToProps(state) {
    const { imagePath } = state.imageProfile;
    const { condidatReducer } = state.condidat;
    return { imagePath, condidatReducer };
}
const actionCreators = {
    setCondidat: condidatActions.setCondidat,
    setImage: imageProfileAtions.setImage
};
export default connect(mapStateToProps, actionCreators)(UserInfos);