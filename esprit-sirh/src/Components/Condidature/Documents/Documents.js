import React, { Component } from "react";
import Input from "react-validation/build/input";
import Leftside from "../../../Layout/Leftside"
import Header from "../../../Layout/Header"
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import CondidatService from "../../../services/Condidature/CondidatService";
import AuthService from "../../../services/Authentification/AuthService";
import { Link, Redirect } from "react-router-dom";
import ValidationService from "../../../services/Validation/ValidationService"
import { DocumentType } from "../Constantes/DocumentType"
import { condidatActions } from "../../../_actions/Shared/condidat.actions";
import { connect, Provider } from "react-redux";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { validerEtapeActions } from "../../../_actions/Shared/valider.etape.actions";
import DocumentLecture from "./DocumentLecture";
import { Switch } from "@material-ui/core";
import DocumentModif from "./DocumentModif";
import {Prompt} from 'react-router-dom'

const FILES_LOCATION = "http://localhost/uploads/"

export const docFields = {
  photo: 'photo',
  cv: 'cv',
  lm: 'lm',
  diplome: 'diplome',
}
class Documents extends Component {

  constructor(props) {

    super(props);
    ValidationService.validator.autoForceUpdate = this;
    this.state = {
      // condidat: null,
      login: AuthService.getLogin(),
      cv: null,
      photo: null,
      lettreMotivation: null,
      diplome: null,
      annexe: null,
      loading: false,
      message: "",
      typeMessage: "",
      retour: false,
      touched: {},
      saved: false,
      show: false,
      items: [],
      photoName: "",
      photoPath: "",
      cvName: "",
      cvPath: "",
      lmName: "",
      lmPath: "",
      diplomeName: "",
      diplomePath: "",
      annexeName: "",
      annexePath: "",
      modification:false
    };

  }

  handleClose = () => {
    this.setState({
      show: false
    })
  }

  handleShow = () => {
    this.setState({
      show: true
    })
  }
  componentDidMount() {
    let year = new Date().getFullYear()
    const { condidatReducer } = this.props
    if (condidatReducer) {
      // this.setState({
      //   condidat: condidatReducer,
      // });
      if (condidatReducer.documents && condidatReducer.documents.length > 0) {
        this.setState({
          items: condidatReducer.documents
        });
        this.updateFilesPaths(condidatReducer.documents, year);
      }
    }
  }


  validerEtapeDocuments = () => {
    const { condidatReducer } = this.props
    ValidationService.validator.purgeFields();
    this.addMessages();
    this.markUsTouched()
    if (condidatReducer.documents && condidatReducer.documents.length == 0) {

      if (!ValidationService.validator.allValid()) {

        ValidationService.validator.showMessages()
        this.props.validerDocuments(false)
        return false

      } else if (!this.state.saved) {
        this.props.validerDocuments(false)
        this.handleShow()
        return false

      } else {
        this.props.validerDocuments(true)
        return true;
      }

    } else {
      this.props.validerDocuments(true)
      return true;
    }

  }

  onChangePhoto = (e) => {
    let touchedElements = { ...this.state.touched }
    touchedElements[docFields.photo] = true;

    this.setState({
      photo: e.target.files[0],
      touched: touchedElements,
      photoName: e.target.files[0].name
    });
  }

  onChangeCV = (e) => {
    let touchedElements = { ...this.state.touched }
    touchedElements[docFields.cv] = true;

    this.setState({
      cv: e.target.files[0],
      touched: touchedElements,
      cvName: e.target.files[0].name
    });
  }

  onChangeLM = (e) => {
    let touchedElements = { ...this.state.touched }
    touchedElements[docFields.lm] = true;

    this.setState({
      lettreMotivation: e.target.files[0],
      touched: touchedElements,
      lmName: e.target.files[0].name
    });
  }

  onChangeDiplome = (e) => {
    let touchedElements = { ...this.state.touched }
    touchedElements[docFields.diplome] = true;

    this.setState({
      diplome: e.target.files[0],
      touched: touchedElements,
      diplomeName: e.target.files[0].name
    });
  }

  onChangeAnnexe = (e) => {
    this.setState({
      annexe: e.target.files[0],
      annexeName: e.target.files[0].name
    });
  }
  goBack = (e) => {
    e.preventDefault();
    this.setState({
      retour: true,
    });
  }

  handleSubmitCondidat = (e,type) => {
    e.preventDefault();

    console.log("document validator", ValidationService.validator)
    let year = new Date().getFullYear()
    const { condidatReducer } = this.props;

    if (ValidationService.validator.allValid()) {
      this.setState({
        loading: true
      })
      const formData = new FormData();
     
      let documents = [
        // { nom: this.state.cv.name, type: DocumentType.CV },
        // { nom: this.state.photo.name, type: DocumentType.PHOTO },
        // { nom: this.state.lettreMotivation.name, type: DocumentType.LM },
        // { nom: this.state.diplome.name, type: DocumentType.DIPLOME },
        // { nom: this.state.annexe ? this.state.annexe.name : null, type: DocumentType.ANNEXE },
      ]
      
      if(this.state.cv) {
        formData.append('file', this.state.cv);
        documents[0] = {nom: this.state.cv.name, type: DocumentType.CV}
      }
      if(this.state.photo){
        formData.append('file', this.state.photo);
        documents[1] =  { nom: this.state.photo.name, type: DocumentType.PHOTO }
      }
      if(this.state.lettreMotivation){
        formData.append('file', this.state.lettreMotivation);
        documents[2] = { nom: this.state.lettreMotivation.name, type: DocumentType.LM }
      }
      if(this.state.diplome){
        formData.append('file', this.state.diplome);
        documents[3] = { nom: this.state.diplome.name, type: DocumentType.DIPLOME }
      }
      if(this.state.annexe){
        formData.append('file', this.state.annexe);
        documents[4] = { nom: this.state.annexe ? this.state.annexe.name : null, type: DocumentType.ANNEXE }
      }

      if(type === 'update'){
        documents = this.updateListDocuments(condidatReducer, documents);
      }

      let condidatToSave = this.props.condidatReducer
      condidatToSave.documents = documents

      condidatToSave = CondidatService.updateListEmpty(condidatToSave);
      formData.append('condidat', JSON.stringify(condidatToSave));

      // this.getCondidatLists(condidatToSave)
      this.props.setCondidat(condidatToSave)


      CondidatService.registerCondidatInfos(this.state.login, formData)
        .then(
          resp => {
            if (resp.data.succesMessage) {
              this.setState({
                loading: false,
                message: resp.data.succesMessage,
                typeMessage: "alert alert-success",
                saved: true
              })
              
              if(type === 'update'){
                this.setState({
                  modification:true
                })
                
              }

              this.updateFilesPaths(documents, year)
              
              CondidatService.getCondidat(this.state.login).then(
                resp =>{             
                  this.props.setCondidat(resp)
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
      this.markUsTouched();
      ValidationService.validator.showMessages();
    }
  }

  updateListDocuments(condidatReducer, documents) {
    let documentsFromDB = condidatReducer ? condidatReducer.documents : null;
    if (documentsFromDB) {
      documents.forEach((d, index) => {
        if (d.type === condidatReducer.documents[index].type ) {
          condidatReducer.documents[index].nom = d.nom;
        }
      });
    }

    return documentsFromDB
  }

  updateFilesPaths(documents, year) {
    documents.forEach(d => {
      switch (d.type) {
        case 'PHOTO':
          this.setState({
            photoPath: FILES_LOCATION + "/" + year + "/" + this.state.login + "/" + d.nom,
            photoName: d.nom
          }); break;
        case 'CV':
          this.setState({
            cvPath: FILES_LOCATION + "/" + year + "/" + this.state.login + "/" + d.nom,
            cvName: d.nom
          }); break;
        case 'LM':
          this.setState({
            lmPath: FILES_LOCATION + "/" + year + "/" + this.state.login + "/" + d.nom,
            lmName: d.nom
          }); break;
        case 'DIPLOME':
          this.setState({
            diplomePath: FILES_LOCATION + "/" + year + "/" + this.state.login + "/" + d.nom,
            diplomeName: d.nom
          }); break;
        case 'ANNEXE':
          this.setState({
            annexePath: FILES_LOCATION + "/" + year + "/" + this.state.login + "/" + d.nom,
            annexeName: d.nom
          }); break;

      }

    });
  }

  markUsTouched() {

    this.state.touched[docFields.photo] = true;
    this.state.touched[docFields.cv] = true;
    this.state.touched[docFields.lm] = true;
    this.state.touched[docFields.diplome] = true;
  }
  addMessages() {

    ValidationService.validator.message(docFields.photo, this.state.photo, 'required');
    ValidationService.validator.message(docFields.cv, this.state.cv, 'required');
    ValidationService.validator.message(docFields.lm, this.state.lettreMotivation, 'required');
    ValidationService.validator.message(docFields.diplome, this.state.diplome, 'required');

  }

  photoClick= e => {
    let photo = document.getElementById("selectedPhoto")
    if (photo) {
      this.setState({
        modification:false
      })
      photo.click()
    }
  }
  cvClick= e => {
    let cv = document.getElementById("selectedCv")
    if (cv) {
      this.setState({
        modification:false
      })
      cv.click()
    }
  }
  lmClick= e => {
    let lm = document.getElementById("selectedLM")
    if (lm) {
      this.setState({
        modification:false
      })
      lm.click()
    }
  }
  diplomeClick= e => {
    let diplome = document.getElementById("selectedDiplome")
    if (diplome) {
      this.setState({
        modification:false
      })
      diplome.click()
    }
  }
  annexeClick = e => {
    let annexe = document.getElementById("selectedAnnexe")
    if (annexe) {
      this.setState({
        modification:false
      })
      annexe.click()
    }
  }

  handleBlockedNavigation = () => {

    ValidationService.validator.purgeFields();
    this.addMessages();
    console.log("validation", ValidationService.validator)

    if (this.props.condidatReducer && !this.props.condidatReducer.dateModif && !ValidationService.validator.allValid()  && window.location.pathname != '/terminer' && window.location.pathname != '/') {
      this.markUsTouched();
      ValidationService.validator.showMessages();
      return false
    }
    return true
  }


  render() {
    const { message } = this.state;
    const { loading } = this.state;
    const { typeMessage } = this.state;
    const { condidatReducer } = this.props;
    const { show } = this.state;
    const {when} = this.props

    const test = document.getElementById("selectedFile")
    console.log("show btn", test && test.value)

    if (this.state.retour) {
      return <Redirect to={{
        pathname: '/recherche',
      }} />;
    }


    console.log("cdt", condidatReducer.aConfirmer)

    return (
      <div id="wrapper">

        <Leftside
          validerEtapeDocuments={this.validerEtapeDocuments}
        ></Leftside>
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Header />

            <Prompt
              when={when}
              message={this.handleBlockedNavigation} />

            <div className="container-fluid pl-5">


              <Modal show={show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Enregistrer la condidature</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <p>Veuillez enregistrer vos informations avant de terminer l'inscription.</p>
                </Modal.Body>

                <Modal.Footer>
                  <Button variant="primary" onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
              </Modal>

              <Form
                encType="multipart/form-data"
                onSubmit={e => {this.handleSubmitCondidat(e,'create')}}
                ref={(c) => {
                  this.form = c;
                }}
              >
                { /* Page Heading */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4 ">
                  <h1 className="h3 mb-0 text-gray-800">Joindre vos documents</h1>
                  <div className="form-group m-0">
                    <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm mr-1" onClick={this.goBack}>
                      <i className="fas fa-angle-double-left fa-sm text-white-50"></i>Précédent
                    </button>
                    {(!this.props.condidatReducer.dateModif  && !condidatReducer.aConfirmer &&  this.props.condidatReducer && !this.props.condidatReducer.aConfirmer &&
                      <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                        className="fas fa-angle-double-right fa-sm text-white-50"
                        disabled={loading}></i>
                        {loading && (
                          <span className="spinner-border spinner-border-sm"></span>
                        )}
                        enregistrer </button>
                    )}
                      {this.props.condidatReducer && this.props.condidatReducer.dateModif && (
                      <button  className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm ml-2" onClick={e => {this.handleSubmitCondidat(e,'update')}}>modifier</button>
                    )}
                  </div>
                </div>
                {message && (
                  <div className="form-group">
                    <div className={typeMessage} role="alert">
                      {message}
                    </div>
                  </div>
                )}
                { /* Content Row */}
                <div className="row">
                  <div className="col-lg-12 mb-4 ">

                    {(this.props.condidatReducer && !this.props.condidatReducer.aConfirmer &&
                      <div className="card shadow mb-4 col-10 p-0">
                        <div className="card-header py-3">
                          <h6 className="m-0 font-weight-bold text-primary">Documents</h6>
                        </div>
                        <div className="card-body">
                          <div>
                            <div className="form-group row">
                              <label className="col-md-4 control-label">Photo d'identité: (jpg/png) </label >
                              {condidatReducer && condidatReducer.documents.length > 0 && (
                                <DocumentModif
                                  id="selectedPhoto"
                                  path={this.state.photoPath}
                                  name={this.state.photoName}
                                  accept="image/png,image/jpg,image/jpeg"
                                  fileClick={this.photoClick}
                                  onChangeFile={this.onChangePhoto}
                                  modif={this.state.modification}
                                />
                              )}

                              {condidatReducer && condidatReducer.documents.length == 0 && (
                                <div className="col-md-6">
                                  <input
                                    type="file"
                                    className={this.state.touched && this.state.touched[docFields.photo] && !this.state.photo ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}
                                    name="file"
                                    onChange={this.onChangePhoto}
                                    accept="image/png,image/jpg,image/jpeg"
                                    onBlur={() => { ValidationService.validator.showMessageFor(docFields.photo) }}
                                  />

                                  {/* msg erreur*/}
                                  {ValidationService.validator.message(docFields.photo, this.state.photo, 'required', { className: 'text-danger' })}
                                </div>
                              )}

                            </div>


                            <div className="form-group row">
                              <label className="col-md-4 control-label">Curriculum vitae: (PDF) </label >

                              {condidatReducer && condidatReducer.documents.length > 0 && (
                                <DocumentModif
                                  id="selectedCv"
                                  path={this.state.cvPath}
                                  name={this.state.cvName}
                                  accept="application/pdf"
                                  fileClick={this.cvClick}
                                  onChangeFile={this.onChangeCV}
                                  modif={this.state.modification}
                                />
                              )}
                              {condidatReducer && condidatReducer.documents.length == 0 && (
                                <div className="col-md-6">
                                  <input
                                    type="file"
                                    className={this.state.touched && this.state.touched[docFields.cv] && !this.state.cv ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}
                                    name="file"
                                    onChange={this.onChangeCV}
                                    accept="application/pdf"
                                    onBlur={() => { ValidationService.validator.showMessageFor(docFields.cv) }}
                                  />
                                  {/* msg erreur*/}
                                  {ValidationService.validator.message(docFields.cv, this.state.cv, 'required', { className: 'text-danger' })}
                                </div>
                              )}
                            </div>

                            <div className="form-group row">
                              <label className="col-md-4 control-label">lettre de motivation: (pdf) </label >
                              {condidatReducer && condidatReducer.documents.length > 0 && (
                                <DocumentModif
                                  id="selectedLM"
                                  path={this.state.lmPath}
                                  name={this.state.lmName}
                                  accept="application/pdf"
                                  fileClick={this.lmClick}
                                  onChangeFile={this.onChangeLM}
                                  modif={this.state.modification}
                                />
                              )}
                              {condidatReducer && condidatReducer.documents.length == 0 && (
                                <div className="col-md-6">
                                  <input
                                    type="file"
                                    className={this.state.touched && this.state.touched[docFields.lm] && !this.state.lettreMotivation ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}
                                    name="file"
                                    onChange={this.onChangeLM}
                                    accept="application/pdf"
                                    onBlur={() => { ValidationService.validator.showMessageFor(docFields.lm) }}
                                  />
                                  {/* msg erreur*/}
                                  {ValidationService.validator.message(docFields.lm, this.state.lettreMotivation, 'required', { className: 'text-danger' })}
                                </div>
                              )}
                            </div>

                            <div className="form-group row">
                              <label className="col-md-4 control-label">Diplome: (pdf) </label >
                              {condidatReducer && condidatReducer.documents.length > 0 && (
                                <DocumentModif
                                  id="selectedDiplome"
                                  path={this.state.diplomePath}
                                  name={this.state.diplomeName}
                                  accept="application/pdf"
                                  fileClick={this.diplomeClick}
                                  onChangeFile={this.onChangeDiplome}
                                  modif={this.state.modification}
                                />
                              )}
                              {condidatReducer && condidatReducer.documents.length == 0 && (
                                <div className="col-md-6">
                                  <input
                                    type="file"
                                    className={this.state.touched && this.state.touched[docFields.diplome] && !this.state.diplome ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}
                                    name="file"
                                    onChange={this.onChangeDiplome}
                                    accept="application/pdf"
                                    onBlur={() => { ValidationService.validator.showMessageFor(docFields.diplome) }}
                                  />
                                  {/* msg erreur*/}
                                  {ValidationService.validator.message(docFields.diplome, this.state.diplome, 'required', { className: 'text-danger' })}
                                </div>
                              )}
                            </div>

                            <div className="form-group row">
                              <label className="col-md-4">Annexe: (pdf) </label >
                              {condidatReducer && condidatReducer.documents.length > 0 && (
                                <DocumentModif
                                  id="selectedAnnexe"
                                  path={this.state.annexePath}
                                  name={this.state.annexeName}
                                  accept="application/pdf"
                                  fileClick={this.annexeClick}
                                  onChangeFile={this.onChangeAnnexe}
                                  modif={this.state.modification}
                                />
                              )}
                              {condidatReducer && condidatReducer.documents.length == 0 && (
                                <div className="col-md-6">
                                  <input
                                    type="file"
                                    className="form-control form-control-sm"
                                    name="file"
                                    onChange={this.onChangeAnnexe}
                                    accept="application/pdf"
                                  />
                                </div>
                              )}
                            </div>

                          </div>

                        </div>
                      </div>

                    )}
                    {(this.props.condidatReducer && this.props.condidatReducer.aConfirmer &&
                      <DocumentLecture documents={this.state.items} />
                    )}

                  </div>
                </div>
                <CheckButton
                  style={{ display: "none" }}
                  ref={(c) => {
                    this.checkBtn = c;
                  }}
                />

              </Form>

            </div>
          </div>
        </div>
      </div>

    );

  }




}
function mapStateToProps(state) {
  const { condidatReducer } = state.condidat;
  return { condidatReducer };
}
const actionCreators = {
  setCondidat: condidatActions.setCondidat,
  validerDocuments: validerEtapeActions.validerDocuments
};
export default connect(mapStateToProps, actionCreators)(Documents);