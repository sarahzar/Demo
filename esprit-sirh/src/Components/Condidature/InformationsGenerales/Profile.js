import React, { Component } from "react";
import { connect, Provider } from "react-redux";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Leftside from "../../../Layout/Leftside"
import Header from "../../../Layout/Header"
import { Redirect, Link } from 'react-router-dom';
import InfoPersonelles from "./InfoPersonelles";
import NiveauAcademique from "./NiveauAcademique";
import DomaineCompetence from "./DomaineCompetence";
import SimpleReactValidator from 'simple-react-validator';
import moment from 'moment';

class Profile extends Component {
  constructor(props) {

    super(props);
  //validations des champs 
    SimpleReactValidator.addLocale('fr', {
      required: 'champ obligatoire.',
      alpha: 'Le champ :attribute ne peut contenir que des lettres.',
      numeric: 'Le champ :attribute doit être numérique.',
      size: 'Le champ :attribute doit être 8 chiffres.',
      min: 'la valeur du champ :attribute ne peut pas être négative',
      before: 'Le champ :attribute doit être avant le :date.',
    });
    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
      locale: 'fr',
      validators: {
        requiredSelect: {  // name the rule
          message: 'champ obligatoire.',
          rule: (val) => {
            return val != -1
          },
        },
        dateAfterToday: {  // name the rule
          message: "Le champ :attribute doit être inférieure à aujourd'hui.",
          rule: (val) => {
           let  momentObject=  moment(val, 'YYYY-MM-DD');
           let today= moment(new Date(), 'YYYY-MM-DD');
           let isAfter=momentObject.isAfter(today)
           let isSame=momentObject.isSame(today,'day')
           
         
            return !isSame && !isAfter 
          },
        },
        telephone: {  // name the rule
        message: "Le champ :attribute est invalide.",      
         rule: (val) => {
            return this.validator.helpers.testRegex(val,/^((\+|00)216)?([7]{1}[0-9]{1}|[5]{1}[0-9]{1}|[2-3]{1}[0-9]{1})[0-9]{6}$/i);
          },
        },
        afterCurrentYear: {  // name the rule
          message: "valeur supérieure à l'année courrante",      
           rule: (val) => {
             let currentYear= new Date().getFullYear()
              return ! (val > currentYear);
            },
          },
      }
      
      
    });
   // states et méthodes 
    this.state = {
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
      etatCivils: this.props.location.state.etatCivils,
      postes: this.props.location.state.postes,
      diplomes: this.props.location.state.diplomes,
      domaines: this.props.location.state.domaines,
      types: this.props.location.state.types,
      etablissements:  this.props.location.state.etablissements,
      specialites:  this.props.location.state.specialites,
      pays:  this.props.location.state.pays,
      modules: this.props.location.state.modules,
      condidat: {},
      username: '',
      touched:{}


    };
  }

  componentDidMount() {
    let condidatFromPrecedent = this.props.location.state.condidatBackToProfile;
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

    let touchedElements = {...this.state.touched}
    touchedElements['nom'] =true;

    this.setState({
      nom: e.target.value,
      touched:touchedElements
    });   
    
  }
  onChangePreNom = (e) => {

    let touchedElements = {...this.state.touched}
    touchedElements['prenom'] =true;

    this.setState({
      prenom: e.target.value,
      touched:touchedElements
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

    let touchedElement = {...this.state.touched}
    touchedElement['etat'] =true;

    this.setState({
      etat: e.target.value,
      touched:touchedElement
    });
  }
  onChangeTelephone = (e) => {

    let touchedElement = {...this.state.touched}
    touchedElement['tel'] =true;

    this.setState({
      telephone: e.target.value,
      touched:touchedElement
    });
  }
  onChangeCin = (e) => {

    let touchedElement = {...this.state.touched}
    touchedElement['cin'] =true;

    this.setState({
      cin: e.target.value,
      touched:touchedElement
    });
  }
  onChangeDateNaissance = (e) => {

    let touchedElement = {...this.state.touched}
    touchedElement['datenaiss'] =true;

    this.setState({
      dateNaissance: e.target.value,
      touched:touchedElement
    });
  }
  onChangeEtatCivil = (e) => {

    let touchedElement = {...this.state.touched}
    touchedElement['etatCivil'] =true;

    this.setState({
      etatCivilId: e.target.value,
      touched:touchedElement
    });
  }
  onChangeDernierDiplome = (e) => {
    
    let touchedElement = {...this.state.touched}
    touchedElement['diplome'] =true;

    this.setState({
      dernierDiplomeId: e.target.value,
      touched:touchedElement
    });
  }
  onChangeSpecialite = (e) => {

    let touchedElement = {...this.state.touched}
    touchedElement['specialite'] =true;

    this.setState({
      specialiteId: e.target.value,
      touched:touchedElement
    });
  }
  onChangeEtablissement = (e) => {

    let touchedElement = {...this.state.touched}
    touchedElement['etablissement'] =true;

    this.setState({
      etablissementId: e.target.value,
      touched:touchedElement
    });
  }
  onChangePosteActuel = (e) => {

    let touchedElement = {...this.state.touched}
    touchedElement['poste'] =true;

    this.setState({
      posteActuelId: e.target.value,
      touched:touchedElement
    });
  }
  onChangeDomaine = (e) => {

    let touchedElement = {...this.state.touched}
    touchedElement['domaine'] =true;

    this.setState({
      domaineId: e.target.value,
      touched:touchedElement
    });
  }
  onChangTypeCondidature = (e) => {

    let touchedElement = {...this.state.touched}
    touchedElement['typeCondidat'] =true;

    this.setState({
      typeCondidatureId: e.target.value,
      touched:touchedElement
    });
  }
  onChangeAnneeObtention = (e) => {

    let touchedElement = {...this.state.touched}
    touchedElement['anneObt'] =true;

    this.setState({
      anneeObtention: e.target.value,
      touched:touchedElement
    });
  }
  handleSubmitCondidat = (e) => {
    e.preventDefault();
    // this.form.validateAll();
    if (this.validator.allValid()) {

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
    }else{
      this.validator.showMessages();
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
    const { modules } = this.state;
    const { pays } = this.state;
    const { condidat } = this.state;
    let condidatProfile = null;
    if (this.props.location.state.condidatBackToProfile) {
      condidat.listeParcours= this.props.location.state.condidatBackToProfile.listeParcours
      condidat.condidatExperEnseignt=this.props.location.state.condidatBackToProfile.condidatExperEnseignt
      condidat.condidatExperProfessionel=this.props.location.state.condidatBackToProfile.condidatExperProfessionel
      condidat.competences=this.props.location.state.condidatBackToProfile.competences
      condidat.recherches=this.props.location.state.condidatBackToProfile.recherches
    } 
    
    if (changePath) {
      return <Redirect to={{
        pathname: '/parcour',
        state: {
          login: username,
          condidatFromProfile: condidat,
          postes: postes,
          diplomes: diplomes,
          etablissements: etablissements,
          modules: modules,
          etatCivils: etatCivils,
          pays: pays,
          types: types,
          domaines: domaines,
          specialites: specialites
          
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
                      validator ={this.validator}
                      touched ={this.state.touched}
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
                      validator ={this.validator}
                      touched ={this.state.touched}
                    />

                    <DomaineCompetence
                      domaine={this.state}
                      modifPoste={this.onChangePosteActuel}
                      modifDomaine={this.onChangeDomaine}
                      modifTypeCondidature={this.onChangTypeCondidature}
                      postes={postes}
                      domaines={domaines}
                      types={types}
                      validator ={this.validator}
                      touched ={this.state.touched}
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