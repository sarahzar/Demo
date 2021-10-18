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
import ValidationService from "../../../services/Validation/ValidationService"
import { condidatActions } from "../../../_actions/Shared/condidat.actions";
import CondidatService from "../../../services/Condidature/CondidatService";
import AuthService from "../../../services/Authentification/AuthService";
import { ignorerEtapeActions } from "../../../_actions/Shared/ignorer.etape.actions";
import { validerEtapeActions } from "../../../_actions/Shared/valider.etape.actions";
import { imageProfileAtions } from "../../../_actions/Shared/image.profile.ations";


const FILES_LOCATION = "http://localhost/uploads/"

export const profilFields = {

  etablissement: 'etablissement',
  nom: 'nom',
  prenom: 'prenom',
  etat: 'etat',
  tel: 'tel',
  cin: 'cin',
  datenaiss: 'datenaiss',
  etatCivil: 'etatCivil',
  diplome: 'diplome',
  specialite: 'specialite',
  poste: 'poste',
  domaine: 'domaine',
  typeCondidat: 'typeCondidat',
  anneObt: 'anneObt',
  sexe: 'sexe',

}
class Profile extends Component {
  constructor(props) {

    super(props);
    ValidationService.validator.autoForceUpdate = this;
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
      dateModif: "",
      aConfirmer: "",
      demandeModif: "",
      loading: false,
      message: "",
      typeMessage: "",
      typeCondidature: {id:-1,libelle:""},
      posteActuel:{id:-1,libelle:""},
      domaine: {id:-1,libelle:""},
      etatCivil: {id:-1,libelle:""},
      diplome:{id:-1,libelle:""},
      etablissement:{id:-1,libelle:"",telephone:-1,mail:""},
      specialite:{id:-1,libelle:""},
      anneeObtention: "",
      condidat: {},
      username: '',
      touched: {},
      invalide:false,
      fromPl:false,
      validePl:false,
      confirmed:false,
      imageProfilePath:"",
      nomPrenom:"",
    };
  }

  componentDidMount() {
    const { condidatReducer } = this.props
    this.updateUserInfos(condidatReducer);
  }
  
  componentWillUnmount() {
    if (localStorage.getItem('persist:root')) {
      let condidat = this.updateCondidatInfos()
      this.getCondidatLists(condidat)
      this.props.setCondidat(condidat)
    }

  }

  updateUserInfos(condidatReducer) {

    let year = new Date().getFullYear()
    let pathLogin= AuthService.getLogin()?  AuthService.getLogin() : this.props.location.state.userlogin
    
  
    CondidatService.getCondidat(pathLogin).then(

      resp => {
        let cdt = null;
        let condidat =null
        cdt = resp;
        console.log("from profile", resp)
        if (cdt) {

          console.log("condiadat from profile",cdt)
          this.setState({
            confirmed: cdt.aConfirmer,
            username: pathLogin,
          });

          // this.setState({
          //   username: pathLogin
          // });
      

          if(cdt.documents && cdt.documents.length > 0){
            cdt.documents.forEach(d => {
               if(d.type == 'PHOTO'){
                   let path=FILES_LOCATION+"/"+year+"/"+pathLogin+"/"+d.nom;
                   this.props.setImage(path)
                   this.setState({
                     imageProfilePath: path
                   })
               }
            })
          }

          this.setState({
            nomPrenom: cdt.nom +" "+cdt.prenom
          })
             
          if (condidatReducer) {
            condidat = condidatReducer
            this.updateState(condidatReducer)
            this.props.setCondidat(condidatReducer)

          } else {
            condidat = cdt
            this.updateState(cdt);
            this.props.setCondidat(cdt)

          }


          
          this.setIgnorerVariables(condidat)
          this.setValiderEtapeVariables(condidat)
         
        }
      }
    );
  }

  setIgnorerVariables(condidat) {
    if (condidat.experienceEnseignants && condidat.experienceEnseignants.length > 0) {
      this.props.ignorerExpEns(false);
    }
    if (condidat.experienceProfessionels && condidat.experienceProfessionels.length > 0) {
      this.props.ignorerExpPro(false);
    }
    if (condidat.competences && condidat.competences.length > 0) {
      this.props.ignorerCompetence(false);
    }
    if (condidat.competences && condidat.recherches.length > 0) {
      this.props.ignorerRecherche(false);
    }
    
  }

  setValiderEtapeVariables(condidat){
    if (condidat.parcourScolaire.length > 0) {
      this.props.validerParcours(true)
    }
    if (condidat.documents.length > 0) {
      this.props.validerDocuments(true)
    }
  }

  updateState(condidatReducer) {
    this.setState({
      nom: condidatReducer.nom,
      prenom: condidatReducer.prenom,
      dateNaissance: condidatReducer.dateNaissance,
      sexe: condidatReducer.sexe,
      cin: condidatReducer.cin !=0 ? condidatReducer.cin : this.state.cin,
      telephone: condidatReducer.telephone != 0 ? condidatReducer.telephone  : this.state.telephone,
      typeCondidature: condidatReducer.typeCondidature ? condidatReducer.typeCondidature : this.state.typeCondidature,
      posteActuel: condidatReducer.posteActuel ? condidatReducer.posteActuel : this.state.posteActuel,
      dernierDiplome: condidatReducer.dernierDiplome ? condidatReducer.dernierDiplome : null,
      diplome:  condidatReducer.dernierDiplome ? condidatReducer.dernierDiplome.diplome : this.state.diplome ,
      etablissement: condidatReducer.dernierDiplome ? condidatReducer.dernierDiplome.etablissement : this.state.diplome,
      specialite:  condidatReducer.dernierDiplome ? condidatReducer.dernierDiplome.specialite : this.state.specialite,
      domaine: condidatReducer.domaine ? condidatReducer.domaine : this.state.domaine,
      etatCivil: condidatReducer.etatCivil ? condidatReducer.etatCivil : this.state.etatCivil,
      anneeObtention:  condidatReducer.dernierDiplome ? condidatReducer.dernierDiplome.annee : this.state.anneeObtention ,
      parcourScolaire: condidatReducer.parcourScolaire,
      experienceEnseignants: condidatReducer.experienceEnseignants,
      experienceProfessionels: condidatReducer.experienceProfessionels,
      competences: condidatReducer.competences,
      recherches: condidatReducer.recherches,
      documents: condidatReducer.documents,
    });
  }

 
  validerEtapeProfile = () => {
   if (!this.state.confirmed) {
      ValidationService.validator.purgeFields();
      this.addMessages();
      this.markUsTouched()

      if (!ValidationService.validator.allValid()) {
        ValidationService.validator.showMessages()
        return false
      } else {
        return true;
      }

    } else {
      return true;
    }

  }
  onChangeNom = (e) => {

    let touchedElements = { ...this.state.touched }
    touchedElements[profilFields.nom] = true;

    this.setState({
      nom: e.target.value,
      touched: touchedElements
    });

  }
  onChangePreNom = (e) => {

    let touchedElements = { ...this.state.touched }
    touchedElements[profilFields.prenom] = true;

    this.setState({
      prenom: e.target.value,
      touched: touchedElements
    });
  }
  onChangeSexeHomme = (e) => {
    let touchedElements = { ...this.state.touched }
    touchedElements[profilFields.sexe] = true;

    this.setState({
      sexe: "homme",
      touched: touchedElements
    });
  }
  
  onChangeSexeFemme = (e) => {
    let touchedElements = { ...this.state.touched }
    touchedElements[profilFields.sexe] = true;

    this.setState({
      sexe: "femme",
      touched: touchedElements
    });
  }

  onChangeEtat = (e) => {

    let touchedElement = { ...this.state.touched }
    touchedElement['etat'] = true;

    this.setState({
      etat: e.target.value,
      touched: touchedElement
    });
  }

  onChangeTelephone = (e) => {

    let touchedElement = { ...this.state.touched }
    touchedElement[profilFields.tel] = true;

    this.setState({
      telephone: e.target.value,
      touched: touchedElement
    });
  }

  onChangeCin = (e) => {

    let touchedElement = { ...this.state.touched }
    touchedElement[profilFields.cin] = true;

    this.setState({
      cin: e.target.value,
      touched: touchedElement
    });
  }

  onChangeDateNaissance = (e) => {

    let touchedElement = { ...this.state.touched }
    touchedElement[profilFields.datenaiss] = true;

    this.setState({
      dateNaissance: e.target.value,
      touched: touchedElement
    });
  }

  onChangeEtatCivil = (e) => {

    let touchedElement = { ...this.state.touched }
    touchedElement[profilFields.etatCivil] = true;
    let id =e.target.value;

    let etatCvl = this.props.etatCivils.filter(elem => elem.id == id).shift()
      
    this.setState({
      etatCivil: etatCvl,
      touched: touchedElement
    });
  }

  onChangeDernierDiplome = (e) => {

    let touchedElement = { ...this.state.touched }
    touchedElement[profilFields.diplome] = true;

    let id =e.target.value;
    let diplome = this.props.diplomes.filter(elem => elem.id == id).shift()
      

    this.setState({
      diplome: diplome,
      touched: touchedElement
    });
  }

  onChangeSpecialite = (e) => {

    let touchedElement = { ...this.state.touched }
    touchedElement[profilFields.specialite] = true;

    let id =e.target.value;
    let specialite = this.props.specialites.filter(elem => elem.id == id).shift()

    this.setState({
      specialite: specialite,
      touched: touchedElement
    });
  }

  onChangeEtablissement = (e) => {

    let touchedElement = { ...this.state.touched }
    touchedElement[profilFields.etablissement] = true;

    let id =e.target.value;
    let etblissement = this.props.etablissements.filter(elem => elem.id == id).shift()

    this.setState({
      etablissement: etblissement,
      touched: touchedElement
    });
  }

  onChangePosteActuel = (e) => {

    let touchedElement = { ...this.state.touched }
    touchedElement[profilFields.poste] = true;

    let id =e.target.value;
    let poste = this.props.postes.filter(elem => elem.id == id).shift()

    this.setState({
      posteActuel: poste,
      touched: touchedElement
    });
  }

  onChangeDomaine = (e) => {

    let touchedElement = { ...this.state.touched }
    touchedElement[profilFields.domaine] = true;

    let id =e.target.value;
    let domaine = this.props.domaines.filter(elem => elem.id == id).shift()

    this.setState({
      domaine: domaine,
      touched: touchedElement
    });
  }

  onChangTypeCondidature = (e) => {

    let touchedElement = { ...this.state.touched }
    touchedElement[profilFields.typeCondidat] = true;

    let id =e.target.value;
    let typeCondidature = this.props.types.filter(elem => elem.id == id).shift()

    this.setState({
      typeCondidature: typeCondidature,
      touched: touchedElement
    });
  }

  onChangeAnneeObtention = (e) => {

    let touchedElement = { ...this.state.touched }
    touchedElement[profilFields.anneObt] = true;

    this.setState({
      anneeObtention: e.target.value,
      touched: touchedElement
    });
  }

  handleSubmitCondidat = (e) => {
    
    e.preventDefault();
    ValidationService.validator.purgeFields();
    this.addMessages();
    console.log("vld", ValidationService.validator)
    if (!this.state.confirmed) {
      if (ValidationService.validator.allValid()) {

        let condidatToSave = this.updateCondidatInfos();

        this.setState({
          // loading:true,
          condidat: condidatToSave,
          changePath: true
        })

        this.getCondidatLists(condidatToSave)
        this.props.setCondidat(condidatToSave)

      } else {
        this.markUsTouched();
        ValidationService.validator.showMessages();
      }
    }else{
      this.setState({
        changePath: true
      })
    }
  }

  updateCondidatInfos(){

    const {condidatReducer} = this.props;

    const dernierDiplome = {
      id: condidatReducer.dernierDiplome && condidatReducer.dernierDiplome.id != -1 ? condidatReducer.dernierDiplome.id : -1,
      annee : this.state.anneeObtention,
      diplome: this.state.diplome,
      etablissement: this.state.etablissement,
      specialite: this.state.specialite,

    }
   const condidat = { nom: this.state.nom,
      aConfirmer: this.state.confirmed,
      prenom: this.state.prenom,
      dateNaissance: this.state.dateNaissance,
      sexe: this.state.sexe,
      etat: this.state.etat,
      cin: this.state.cin,
      telephone: this.state.telephone,
      typeCondidature: this.state.typeCondidature,
      posteActuel: this.state.posteActuel.id != -1 ? this.state.posteActuel : null,
      dernierDiplome: dernierDiplome,
      domaine: this.state.domaine,
      etatCivil: this.state.etatCivil,
      dateModif:condidatReducer ? condidatReducer.dateModif : null,
      parcourScolaire: condidatReducer ? condidatReducer.parcourScolaire :  [],
      experienceEnseignants: condidatReducer ? condidatReducer.experienceEnseignants :  [],
      experienceProfessionels: condidatReducer ? condidatReducer.experienceProfessionels :  [],
      competences: condidatReducer ? condidatReducer.competences :  [],
      recherches: condidatReducer ? condidatReducer.recherches :  [],
      documents: condidatReducer ? condidatReducer.documents :  [],
    }
      return  condidat;
  }


  getCondidatLists(condidat) {
    const { condidatReducer } = this.props;

    if (condidatReducer) {

      if (condidatReducer.parcourScolaire && condidatReducer.parcourScolaire.length > 0) {
        condidat.parcourScolaire = condidatReducer.parcourScolaire;
      }
      if (condidatReducer.experienceEnseignants && condidatReducer.experienceEnseignants.length > 0) {
        condidat.experienceEnseignants = condidatReducer.experienceEnseignants;
      }
      if (condidatReducer.experienceProfessionels && condidatReducer.experienceProfessionels.length > 0) {
        condidat.experienceProfessionels = condidatReducer.experienceProfessionels;
      }
      if (condidatReducer.competences && condidatReducer.competences.length > 0) {
        condidat.competences = condidatReducer.competences;
      }
      if (condidatReducer.recherches && condidatReducer.recherches.length > 0) {
        condidat.recherches = condidatReducer.recherches;
      }
      if (condidatReducer.documents && condidatReducer.documents.length > 0) {
        condidat.documents = condidatReducer.documents;
      }  
    }
  }

  markUsTouched() {

    this.state.touched[profilFields.etablissement] = true;
    this.state.touched[profilFields.nom] = true;
    this.state.touched[profilFields.prenom] = true;
    this.state.touched[profilFields.specialite] = true;
    this.state.touched[profilFields.tel] = true;
    this.state.touched[profilFields.typeCondidat] = true;
    this.state.touched[profilFields.poste] = true;
    this.state.touched[profilFields.etatCivil] = true;
    this.state.touched[profilFields.cin] = true;
    this.state.touched[profilFields.datenaiss] = true;
    this.state.touched[profilFields.domaine] = true;
    this.state.touched[profilFields.diplome] = true;
    this.state.touched[profilFields.anneObt] = true;
    this.state.touched[profilFields.sexe] = true;

  }
  addMessages() {

    ValidationService.validator.message(profilFields.nom, this.state.nom, 'required|alpha_space');
    ValidationService.validator.message(profilFields.prenom, this.state.prenom, 'required|alpha_space');
    ValidationService.validator.message(profilFields.cin, this.state.cin, 'required|numeric|min:0,num|size:8');
    ValidationService.validator.message(profilFields.datenaiss, this.state.dateNaissance, 'required|dateAfterToday');
    ValidationService.validator.message(profilFields.etatCivil, this.state.etatCivilId, 'requiredSelect');
    ValidationService.validator.message(profilFields.tel, this.state.telephone, 'required|telephone');
    ValidationService.validator.message(profilFields.diplome, this.state.dernierDiplomeId, 'requiredSelect');
    ValidationService.validator.message(profilFields.typeCondidat, this.state.typeCondidatureId, 'requiredSelect');
    ValidationService.validator.message(profilFields.domaine, this.state.domaineId, 'requiredSelect');
    ValidationService.validator.message(profilFields.specialite, this.state.specialiteId, 'requiredSelect');
    ValidationService.validator.message(profilFields.etablissement, this.state.etablissementId, 'requiredSelect');
    ValidationService.validator.message(profilFields.anneObt, this.state.anneeObtention, 'required|numeric|afterCurrentYear');
    ValidationService.validator.message(profilFields.sexe, this.state.sexe, 'required');
  }

  modifierCondidat= (e) => {

    e.preventDefault();

    ValidationService.validator.purgeFields();
    this.addMessages();
    console.log("vld", ValidationService.validator)
    const formData = new FormData();
   
    if (ValidationService.validator.allValid()) {

      let condidatToSave = this.updateCondidatInfos();

      this.setState({
        condidat: condidatToSave,
      })

      this.getCondidatLists(condidatToSave)
      this.props.setCondidat(condidatToSave)

      condidatToSave = CondidatService.updateListEmpty(condidatToSave);
      formData.append('condidat', JSON.stringify(condidatToSave));

      CondidatService.registerCondidatInfos(AuthService.getLogin(), formData)
      .then(
        resp => {
          if (resp.data.succesMessage) {
            this.setState({
              message: resp.data.succesMessage,
              typeMessage: "alert alert-success",
            })
          } else {
            this.setState({
              message: resp.data.errorMessage,
              typeMessage: "alert alert-danger",
            })
          }
        }

      );


    } else {
      this.markUsTouched();
      ValidationService.validator.showMessages();
    }
    
  }

  render() {

    console.log("etat civil",this.state.etatCivil)
    const { message } = this.state;
    const { loading } = this.state;
    const { typeMessage } = this.state;
    const { changePath } = this.state;
    const { username } = this.props;
    const { postes } = this.props;
    const { diplomes } = this.props;
    const { domaines } = this.props;
    const { types } = this.props;
    const { etablissements } = this.props;
    const { specialites } = this.props;
    const { etatCivils } = this.props;
    const { invalide } = this.state;
    const {condidatReducer} = this.props
   
    if (changePath) {
      return <Redirect to={{
        pathname: '/parcour',
        state: {
          login: username,
        }
      }} />;
    }
    return (


      <div id="wrapper">
        <Leftside 
         validerEtapeProfile={this.validerEtapeProfile}    
        ></Leftside>
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Header 
             imageProfilePath={this.state.imageProfilePath}
             nom={this.state.nom}
             prenom={this.state.prenom}
             userlogin={this.state.username}
             />


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
                  <div>
                    {condidatReducer && !condidatReducer.aConfirmer && condidatReducer.dateModif && (
                      <button  className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm mr-2" onClick={this.modifierCondidat}>modifier</button>
                    )}

                    <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                      className="fas fa-angle-double-right fa-sm text-white-50"
                      disabled={loading}></i>
                      {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      Suivant </button>
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
                      validator={ValidationService.validator}
                      touched={this.state.touched}
                      confirmed = {this.state.confirmed}
                      condidatReducer = {condidatReducer}
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
                      validator={ValidationService.validator}
                      touched={this.state.touched}
                      condidatReducer = {condidatReducer}
                    />

                    <DomaineCompetence
                      domaine={this.state}
                      modifPoste={this.onChangePosteActuel}
                      modifDomaine={this.onChangeDomaine}
                      modifTypeCondidature={this.onChangTypeCondidature}
                      postes={postes}
                      domaines={domaines}
                      types={types}
                      validator={ValidationService.validator}
                      touched={this.state.touched}
                      condidatReducer = {condidatReducer}
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
  const { condidatReducer } = state.condidat;
  return { username, user, postes, diplomes, domaines, types, etablissements, specialites, etatCivils, condidatReducer };
}
const actionCreators = {
  setCondidat: condidatActions.setCondidat,
  ignorerExpEns: ignorerEtapeActions.ignorerExpEns,
  ignorerExpPro: ignorerEtapeActions.ignorerExpPro,
  ignorerCompetence: ignorerEtapeActions.ignorerCompetence,
  ignorerRecherche: ignorerEtapeActions.ignorerRecherche,
  validerParcours: validerEtapeActions.validerParcours,
  validerDocuments: validerEtapeActions.validerDocuments,
  setImage: imageProfileAtions.setImage
};
export default connect(mapStateToProps, actionCreators)(Profile);