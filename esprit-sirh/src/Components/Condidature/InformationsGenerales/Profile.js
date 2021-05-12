import React, { Component } from "react";
import { connect, Provider } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../../services/Authentification/AuthService";
import CondidatService from "../../../services/Condidature/CondidatService";
import UserService from "../../../services/Authentification/UserService";
import NomenclaturesService from "../../../services/Shared/NomenclaturesService";
import { history } from '../../../_helpers';
import Leftside from "../../../Layout/Leftside"
import Header from "../../../Layout/Header"
import { Redirect, Link } from 'react-router-dom';
import InfoPersonelles from "./InfoPersonelles";
import NiveauAcademique from "./NiveauAcademique";
import DomaineCompetence from "./DomaineCompetence";
const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class Profile extends Component {
  constructor(props) {

    super(props);

    this.state = {
      currentUser: AuthService.getUserConneced(),
      changePath: false,
      nom: "",
      prenom: "",
      dateNaissance: "",
      sexe: "",
      etat: "",
      cin: "",
      telephone: "",
      dateInscrit: "",
      dateModif: "",
      aConfirmer: "",
      demandeModif: "",
      loading: false,
      message: "",
      typeMessage: "",
      typeCondidatureId: -1,
      posteActuelId: -1,
      dernierDiplomeId: -1,
      domaineId: -1,
      etatCivilId: -1,
      specialiteId: -1,
      etablissementId: -1,
      anneeObtention: "",
      etatCivils: NomenclaturesService.getSavedEtatCivils(),
      postes: NomenclaturesService.getSavedPostes(),
      diplomes: NomenclaturesService.getSavedDiplomes(),
      domaines: NomenclaturesService.getSavedDomaines(),
      types: NomenclaturesService.getSavedTypesCondidatures(),
      etablissements: NomenclaturesService.getSavedEtablissements(),
      specialites: NomenclaturesService.getSavedSpecialites(),
      condidat: {},
      username: ''


    };
  }

  componentDidMount() {
    // this.setState({
    //   username:this.props
    // })
    // let login=AuthService.getUsername()
    // if(login.username.username=="" || login.username==""){
    //   AuthService.setUsername(this.props)
    // }
    // console.log("user login",AuthService.getUsername())
    console.log("user login", this.props.location.state.login)
    let condidatFromPrecedent = this.props.location.state.condidatBack;
    if (condidatFromPrecedent) {
      this.setState({
        nom: condidatFromPrecedent.nom,
        prenom: condidatFromPrecedent.prenom,
        dateNaissance: condidatFromPrecedent.dateNaissance,
        sexe: condidatFromPrecedent.sexe,
        cin: condidatFromPrecedent.cin,
        telephone: condidatFromPrecedent.telephone,
        typeCondidatureId: condidatFromPrecedent.typeCondidatureId,
        posteActuelId: condidatFromPrecedent.posteActuelId,
        dernierDiplomeId: condidatFromPrecedent.dernierDiplomeId,
        domaineId: condidatFromPrecedent.domaineId,
        etatCivilId: condidatFromPrecedent.etatCivilId,
        specialiteId: condidatFromPrecedent.specialiteId,
        etablissementId: condidatFromPrecedent.etablissementId,
        anneeObtention: condidatFromPrecedent.anneeObtention,
        listeParcours: [],
        condidatExperEnseignt: [],
        condidatExperProfessionel: [],
        competences: [],
        recherches: [],
        documents:[]
      });
    }
  }


  onChangeNom = (e) => {
    this.setState({
      nom: e.target.value,
    });
  }
  onChangePreNom = (e) => {
    this.setState({
      prenom: e.target.value,
    });
  }
  onChangeSexeHomme = (e) => {
    this.setState({
      sexe: "homme",
    });
  }
  onChangeSexeFemme = (e) => {
    this.setState({
      sexe: "femme",
    });
  }
  onChangeEtat = (e) => {
    this.setState({
      etat: e.target.value,
    });
  }
  onChangeTelephone = (e) => {
    this.setState({
      telephone: e.target.value,
    });
  }
  onChangeCin = (e) => {
    this.setState({
      cin: e.target.value,
    });
  }
  onChangeDateNaissance = (e) => {
    this.setState({
      dateNaissance: e.target.value,
    });
  }
  onChangeEtatCivil = (e) => {
    this.setState({
      etatCivilId: e.target.value,
    });
  }
  onChangeDernierDiplome = (e) => {
    this.setState({
      dernierDiplomeId: e.target.value,
    });
  }
  onChangeSpecialite = (e) => {
    this.setState({
      specialiteId: e.target.value,
    });
  }
  onChangeEtablissement = (e) => {
    this.setState({
      etablissementId: e.target.value,
    });
  }
  onChangePosteActuel = (e) => {
    this.setState({
      posteActuelId: e.target.value,
    });
  }
  onChangeDomaine = (e) => {
    this.setState({
      domaineId: e.target.value,
    });
  }
  onChangTypeCondidature = (e) => {
    this.setState({
      typeCondidatureId: e.target.value,
    });
  }
  onChangeAnneeObtention = (e) => {
    this.setState({
      anneeObtention: e.target.value,
    });
  }
  handleSubmitCondidat = (e) => {
    e.preventDefault();
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {

      const condidat = {
        nom: this.state.nom,
        prenom: this.state.prenom,
        dateNaissance: this.state.dateNaissance,
        sexe: this.state.sexe,
        etat: this.state.etat,
        cin: this.state.cin,
        telephone: this.state.telephone,
        typeCondidatureId: this.state.typeCondidatureId,
        posteActuelId: this.state.posteActuelId,
        dernierDiplomeId: this.state.dernierDiplomeId,
        domaineId: this.state.domaineId,
        etatCivilId: this.state.etatCivilId,
        etablissementId: this.state.etablissementId,
        specialiteId: this.state.specialiteId,
        anneeObtention: this.state.anneeObtention,
        listeParcours: [],
        condidatExperEnseignt: [],
        condidatExperProfessionel: [],
        competences: [],
        recherches: [],
        documents:[]
      }
      this.setState({
        // loading:true,
        condidat: condidat,
        changePath: true
      })

      CondidatService.registerCondidatInfos(this.state.currentUser.login, condidat)
      .then(
        resp => {
          if(resp.data.succesMessage){
            this.setState({
              changePath:true,
              loading:false
            })
            // history.push("/parcour");
          }else{
            this.setState({
              message:resp.data.errorMessage,
              typeMessage: "alert alert-danger",
              loading:false
            })
          }
        }

      );
    }
  }

  render() {


    const { message } = this.state;
    const { loading } = this.state;
    const { typeMessage } = this.state;
    const { changePath } = this.state;
    const { username } = this.props;
    const { postes } = this.state;
    const { diplomes } = this.state;
    const { domaines } = this.state;
    const { types } = this.state;
    const { etablissements } = this.state;
    const { specialites } = this.state;
    const { etatCivils } = this.state;
    const { condidat } = this.state;


    if (changePath) {
      return <Redirect to={{
        pathname: '/parcour',
        state: {
          login: username,
          condidatFromProfile: condidat
        }
      }} />;
    }
    return (


      <div id="wrapper">
        <Leftside></Leftside>
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Header />


            <div className="container-fluid pl-5">
              <Form
                onSubmit={this.handleSubmitCondidat}
                ref={(c) => {
                  this.form = c;
                }}
              >
                { /* Page Heading */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4 ">
                  <h1 className="h3 mb-0 text-gray-800">Informations générales</h1>
                  <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                    className="fas fa-angle-double-right fa-sm text-white-50"
                    disabled={loading}></i>
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
              Suivant </button>
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


                    {/* <div className="card-body col-md-6"> */}


                    <InfoPersonelles
                      infoPersonelle={this.state}
                      modfierNom={this.onChangeNom}
                      modifPrenom={this.onChangePreNom}
                      modifCin={this.onChangeCin}
                      modifDateNaissance={this.onChangeDateNaissance}
                      modifSexeFemme={this.onChangeSexeFemme}
                      modifSexeHomme={this.onChangeSexeHomme}
                      modifEtatCivil={this.onChangeEtatCivil}
                      modifTel={this.onChangeTelephone}
                      etats={etatCivils}
                      required={required}
                    />

                    <NiveauAcademique
                      niveau={this.state}
                      modifDiplome={this.onChangeDernierDiplome}
                      modifSpecialite={this.onChangeSpecialite}
                      modifEtablissement={this.onChangeEtablissement}
                      modifAnneObtension={this.onChangeAnneeObtention}
                      diplomes={diplomes}
                      etablissements={etablissements}
                      specialites={specialites}
                      required={required}
                    />

                    <DomaineCompetence
                      domaine={this.state}
                      modifPoste={this.onChangePosteActuel}
                      modifDomaine={this.onChangeDomaine}
                      modifTypeCondidature={this.onChangTypeCondidature}
                      postes={postes}
                      domaines={domaines}
                      types={types}
                      required={required}
                    />


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
  const { username } = state.authentication;
  const { user } = state.authentication;
  const { postes } = state.poste;
  const { diplomes } = state.diplome;
  const { domaines } = state.domaine;
  const { types } = state.typeCondidature;
  const { etablissements } = state.etablissement;
  const { specialites } = state.specialite;
  const { etatCivils } = state.etatCivil;
  return { username, user, postes, diplomes, domaines, types, etablissements, specialites, etatCivils };
}

export default connect(mapStateToProps)(Profile);