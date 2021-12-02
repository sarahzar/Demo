import React, { Component } from "react";
import { connect, Provider } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Leftside from "../../../Layout/Leftside"
import Header from "../../../Layout/Header"
import { Link, Redirect } from "react-router-dom";
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from "@material-ui/core/styles";
import ReactTooltip from "react-tooltip";
import { DateValidators } from "../Validators/DateValidators"
import ValidationService from "../../../services/Validation/ValidationService"
import { ignorerEtapeActions } from '../../../_actions/Shared/ignorer.etape.actions';
import { condidatActions } from "../../../_actions/Shared/condidat.actions";
import ExperienceProLecture from "./ExperienceProLecture";
import CondidatService from "../../../services/Condidature/CondidatService";
import AuthService from "../../../services/Authentification/AuthService";

export const expProFields = {
  etablissement: 'etablissement',
  poste: 'poste',
  pays: 'pays',
  ville: 'ville',
  dateDeb: 'dateDeb',
  dateFin: 'dateFin'

}
const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(-1),
    right: theme.spacing(-1),
    "&:focus": {
      outline: "none"
    }
  }
});


class ExperienceProfessionel extends Component {
  constructor(props) {

    super(props);
    ValidationService.validator.autoForceUpdate = this;
    this.state = {
      loading: false,
      etablissementId: -1,
      moduleId: -1,
      posteId: -1,
      dateDebut: "",
      dateFin: "",
      items: [{ id: -1, dateDebut: "", dateFin: "", etablissement: { id: -1, libelle: "", telephone: -1, mail: "" }, poste: { id: -1, libelle: "" }, pays: { id: -1, libelle: "" }, ville: "" }],
      retour: false,
      changePath: false,
      ignorer: false,
      touched: {},
      message: "",
      typeMessage: "",
    };
  }
  componentDidMount() {
    let localCopy = Object.assign({}, this.props);
    let cdtString = JSON.stringify(localCopy.condidatReducer)
    const cdt = JSON.parse(cdtString)

    if (cdt) {
      if (cdt.experienceProfessionels && cdt.experienceProfessionels.length > 0) {

        this.setState({
          items: [...cdt.experienceProfessionels]
        });
      }
    }
  }
  componentWillUnmount() {

    if (this.props.condidatReducer && !this.props.condidatReducer.aConfirmer) {

      let elements = []
      elements = this.props.condidatReducer && this.props.condidatReducer.dateModif ? this.props.condidatReducer.experienceProfessionels : [...this.state.items]
      elements = this.initListeExp(elements)



      if (localStorage.getItem('persist:root')) {

        if (this.props.condidatReducer && !this.props.condidatReducer.dateModif && !this.props.condidatReducer.aConfirmer) {
          this.props.condidatReducer.experienceProfessionels = elements;
          this.props.setCondidat(this.props.condidatReducer)
        }

        if (elements && elements.length > 0) {
          this.props.ignorerExpPro(false);
        } else {
          this.props.ignorerExpPro(true);
        }
      }

    }

  }

  onChangeEtablissement = (e, index) => {
    let touchedElement = { ...this.state.touched }
    touchedElement[expProFields.etablissement + index] = true;

    let elements = [...this.state.items];
    // let id =e.target.value;
    // let etablissement = this.props.etablissements.filter(elem => elem.id == id).shift()
    let etablissement = { id: -1, libelle: e.target.value }

    elements[index].etablissement = etablissement;

    this.setState({
      items: elements,
      touched: touchedElement
    });
    ValidationService.validator.showMessageFor(expProFields.etablissement + index)
  }


  onChangePoste = (e, index) => {
    let touchedElement = { ...this.state.touched }
    touchedElement[expProFields.poste + index] = true;

    let elements = [...this.state.items];
    let id = e.target.value;
    let poste = id != -1 ? this.props.postes.filter(elem => elem.id == id).shift() : null

    elements[index].poste = poste ? poste : { id: -1, libelle: "" }

    this.setState({
      items: elements,
      touched: touchedElement
    });
    ValidationService.validator.showMessageFor(expProFields.poste + index)
  }

  onChangePays = (e, index) => {
    let touchedElement = { ...this.state.touched }
    touchedElement[expProFields.pays + index] = true;

    let elements = [...this.state.items];
    let id = e.target.value;
    let pays = id ? this.props.pays.filter(elem => elem.id == id).shift() : null

    elements[index].pays = pays ? pays : { id: -1, libelle: "" };

    this.setState({
      items: elements,
      touched: touchedElement
    });
    ValidationService.validator.showMessageFor(expProFields.pays + index)
  }

  onChangeDateDeb = (e, index) => {
    let touchedElement = { ...this.state.touched }
    touchedElement[expProFields.dateDeb + index] = true;

    let elements = [...this.state.items];
    elements[index].dateDebut = e.target.value;
    this.setState({
      items: elements,
      touched: touchedElement
    });
    ValidationService.validator.showMessageFor(expProFields.dateDeb + index)
  }

  onChangeDateFin = (e, index) => {
    let touchedElement = { ...this.state.touched }
    touchedElement[expProFields.dateFin + index] = true;

    let elements = [...this.state.items];
    elements[index].dateFin = e.target.value;
    this.setState({
      items: elements,
      touched: touchedElement
    });
    ValidationService.validator.showMessageFor(expProFields.dateFin + index)
  }

  onChangeVille = (e, index) => {
    let touchedElement = { ...this.state.touched }
    touchedElement[expProFields.ville + index] = true;

    let elements = [...this.state.items];
    elements[index].ville = e.target.value;

    this.setState({
      items: elements,
      touched: touchedElement
    });
    ValidationService.validator.showMessageFor(expProFields.ville + index)
  }

  goBack = (e) => {
    e.preventDefault();
    this.setState({
      retour: true,
    });
  }

  ignorerEtape = (e) => {

    this.setState({
      ignorer: true,
      loading: true,
      changePath: true,
    });

    this.props.ignorerExpPro(true)
  }

  initListeExp(liste) {

    const defaultElem = { id: -1, dateDebut: "", dateFin: "", etablissement: { id: -1, libelle: "", telephone: -1, mail: "" }, poste: { id: -1, libelle: "" }, pays: { id: -1, libelle: "" }, ville: "" }
    const firstElem = Array.isArray(liste) ? liste[0] : !Array.isArray(liste) ? liste : null;

    if (JSON.stringify(defaultElem) === JSON.stringify(firstElem)) {
      Array.isArray(liste) ? liste.splice(0, 1) : liste = [];
    }
    return liste;
  }

  deleteTabElement = (e, index) => {
    //declaration variables copies du state
    const exppro = this.state.items.slice()
    const touchedcp = { ...this.state.touched }
    const replacedTouched = []
    const defaultElem = { id: -1, dateDebut: "", dateFin: "", etablissement: { id: -1, libelle: "", telephone: -1, mail: "" }, poste: { id: -1, libelle: "" }, pays: { id: -1, libelle: "" }, ville: "" }

    //spprimer l'élément sélectionner
    exppro.splice(index, 1)
    //mettre à jour la variable du state touched après la suppression d'un élément
    this.updateTouchedAfterDelete(index, replacedTouched, touchedcp);

    //rajouter l'élément par défaut si la liste est vide
    if (exppro.length == 0) {
      exppro.unshift(defaultElem)
    }
    //mise à jour du state
    this.setState({
      items: exppro,
      touched: replacedTouched
    })
  }

  updateTouchedAfterDelete(index, replacedTouched, touchedcp) {
    this.state.items.forEach((elem, i) => {
      if (i < index) {
        this.updateTouched(replacedTouched, i, i, touchedcp);
      }
      else if (i > 0 && i < (this.state.items.length - 1) && (i == index || i > index)) {
        this.updateTouched(replacedTouched, i, (i + 1), touchedcp);
      }
    });
  }

  updateTabElements = (e) => {
    const defaultElem = { id: -1, dateDebut: "", dateFin: "", etablissement: { id: -1, libelle: "", telephone: -1, mail: "" }, poste: { id: -1, libelle: "" }, pays: { id: -1, libelle: "" }, ville: "" }
    e.preventDefault();
    let elements = [...this.state.items];
    elements.push(defaultElem);
    this.setState({
      items: elements
    });
    this.markUsUntouched()
  }

  handleSubmitCondidat = (e) => {
    e.preventDefault();

    ValidationService.validator.purgeFields();
    this.addMessages();
    let elements = this.initListeExp(...this.state.items)
    console.log("validator", ValidationService.validator)
    if (ValidationService.validator.allValid() || (this.props.condidatReducer && this.props.condidatReducer.aConfirmer) || (elements && elements.length == 0)) {

      this.setState({
        loading: true,
        changePath: true
      })

    } else {
      this.markUsTouched();
      ValidationService.validator.showMessages();
    }
  }

  updateTouched(replacedTouched, index1, index2, touchedcp) {
    replacedTouched[expProFields.etablissement + index1] = touchedcp[expProFields.etablissement + index2];
    replacedTouched[expProFields.poste + index1] = touchedcp[expProFields.poste + index2];
    replacedTouched[expProFields.pays + index1] = touchedcp[expProFields.pays + index2];
    replacedTouched[expProFields.ville + index1] = touchedcp[expProFields.ville + index2];
    replacedTouched[expProFields.dateDeb + index1] = touchedcp[expProFields.dateDeb + index2];
    replacedTouched[expProFields.dateFin + index1] = touchedcp[expProFields.dateFin + index2];
  }

  addMessages() {
    this.state.items.forEach((elem, i) => {
      ValidationService.validator.message(expProFields.etablissement + i, elem.etablissement, 'requiredSelect');
      ValidationService.validator.message(expProFields.poste + i, elem.poste, 'requiredSelect');
      ValidationService.validator.message(expProFields.pays + i, elem.pays, 'requiredSelect');
      ValidationService.validator.message(expProFields.ville + i, elem.ville, 'required');
      ValidationService.validator.message(expProFields.dateDeb + i, elem.dateDebut, ['dateAfterToday', 'required', { dateAfter: elem.dateFin }]);
      ValidationService.validator.message(expProFields.dateFin + i, elem.dateFin, ['dateAfterToday', 'required', { dateBefore: elem.dateDebut }]);
    });
  }

  markUsTouched() {
    this.state.items.forEach((item, i) => {
      this.state.touched[expProFields.etablissement + i] = true;
      this.state.touched[expProFields.poste + i] = true;
      this.state.touched[expProFields.pays + i] = true;
      this.state.touched[expProFields.ville + i] = true;
      this.state.touched[expProFields.dateDeb + i] = true;
      this.state.touched[expProFields.dateFin + i] = true;
    });
  }

  markUsUntouched() {
    let touchedCopy = { ...this.state.touched }
    let indice = this.state.items.length - 1;
    touchedCopy[expProFields.etablissement + indice] = false
    touchedCopy[expProFields.poste + indice] = false
    touchedCopy[expProFields.pays + indice] = false
    touchedCopy[expProFields.ville + indice] = false
    touchedCopy[expProFields.dateDeb + indice] = false
    touchedCopy[expProFields.dateFin + indice] = false

    this.setState({
      touched: touchedCopy
    })
  }

  modifierCondidat = (e) => {

    e.preventDefault();
    const formData = new FormData();
    ValidationService.validator.purgeFields();
    this.addMessages();
    let elements = this.initListeExp(...this.state.items)

    if (ValidationService.validator.allValid() || (elements && elements.length == 0)) {

      let condidatToSave = this.props.condidatReducer
      condidatToSave.experienceProfessionels = [...this.state.items]

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
              CondidatService.getCondidat(AuthService.getLogin()).then(
                data => {
                  this.props.setCondidat(data)
                }
              )
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


    const { classes } = this.props;
    const { loading } = this.state;
    const { postes } = this.props;
    const { etablissements } = this.props;
    const { pays } = this.props;
    const { items } = this.state;
    const changePath = this.state.changePath;
    const { message } = this.state;
    const { typeMessage } = this.state;

    console.log("items", items)

    if (this.state.retour) {

      return <Redirect to={{
        pathname: '/expEnseignant',
      }} />;
    }

    if (changePath) {
      return <Redirect to={{
        pathname: '/competence',
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
                  <h1 className="h3 mb-0 text-gray-800">Expériences Professionelles</h1>
                  <div className="form-group m-0">
                    <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm mr-1" onClick={this.goBack}>
                      <i className="fas fa-angle-double-left fa-sm text-white-50"></i>Précédent
                    </button>

                    {this.props.condidatReducer && !this.props.condidatReducer.aConfirmer && this.props.condidatReducer.dateModif && (
                      <button type="button" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm ml-2 mr-2" onClick={this.modifierCondidat} >modifier</button>
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
                  {(this.props.condidatReducer && !this.props.condidatReducer.aConfirmer &&
                    <div className="col-lg-12 mb-4 ">

                      <table className="table table-striped"  >
                        <thead>

                          <tr >
                            <th className="control-label">Date de début </th>
                            <th className="control-label">Date de fin </th>
                            <th className="control-label">Etablissement </th>
                            <th className="control-label">Poste </th>
                            <th className="control-label">Pays </th>
                            <th className="control-label">Ville </th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((item, index) =>
                            <tr key={index} >
                              <td class="">
                                {(this.props.condidatReducer && !this.props.condidatReducer.aConfirmer &&
                                  <div className="form-group">
                                    <input
                                      type="date"
                                      className={!this.state.ignorer &&
                                        this.state.touched &&
                                        this.state.touched[expProFields.dateDeb + index] &&
                                        (!item.dateDebut || DateValidators.isSameToday(item.dateDebut) || DateValidators.isAfterToday(item.dateDebut) || DateValidators.isAfterDate(item.dateDebut, item.dateFin) || DateValidators.isSameDate(item.dateDebut, item.dateFin)) ? "form-control form-control-sm invalide-field" : "form-control form-control-sm"}
                                      name="telephone"
                                      value={item.dateDebut}
                                      onChange={(e) => { this.onChangeDateDeb(e, index) }}
                                      data-tip
                                      data-for={"dateDebTip" + index}
                                    />
                                    {/* msg erreur */}
                                    {!this.state.ignorer &&
                                      this.state.touched &&
                                      this.state.touched[expProFields.dateDeb + index] &&
                                      (!item.dateDebut || DateValidators.isSameToday(item.dateDebut) || DateValidators.isAfterToday(item.dateDebut) || DateValidators.isAfterDate(item.dateDebut, item.dateFin) || DateValidators.isSameDate(item.dateDebut, item.dateFin)) && (
                                        <ReactTooltip id={"dateDebTip" + index} place="top" effect="solid">
                                          {ValidationService.validator.message(expProFields.dateDeb + index, item.dateDebut, ['dateAfterToday', 'required', { dateAfter: item.dateFin }])}
                                        </ReactTooltip>
                                      )}
                                  </div>
                                )}
                                {(this.props.condidatReducer && this.props.condidatReducer.aConfirmer &&
                                  <span>{item.dateDebut}</span>
                                )}
                              </td>
                              <td class="">
                                {(this.props.condidatReducer && !this.props.condidatReducer.aConfirmer &&
                                  <div className="form-group">
                                    <Input
                                      type="date"
                                      className={!this.state.ignorer &&
                                        this.state.touched &&
                                        this.state.touched[expProFields.dateFin + index] &&
                                        (!item.dateFin || DateValidators.isSameToday(item.dateFin) || DateValidators.isAfterToday(item.dateFin) || DateValidators.isbeforeDate(item.dateFin, item.dateDebut) || DateValidators.isSameDate(item.dateDebut, item.dateFin)) ? "form-control form-control-sm invalide-field" : "form-control form-control-sm"}
                                      name="telephone"
                                      value={item.dateFin}
                                      onChange={(e) => { this.onChangeDateFin(e, index) }}
                                      data-tip
                                      data-for={"dateFinTip" + index}
                                    />
                                    {/* msg erreur */}
                                    {!this.state.ignorer &&
                                      this.state.touched &&
                                      this.state.touched[expProFields.dateFin + index] &&
                                      (!item.dateFin || DateValidators.isSameToday(item.dateFin) || DateValidators.isAfterToday(item.dateFin) || DateValidators.isbeforeDate(item.dateFin, item.dateDebut) || DateValidators.isSameDate(item.dateDebut, item.dateFin)) && (
                                        <ReactTooltip id={"dateFinTip" + index} place="top" effect="solid">
                                          {ValidationService.validator.message(expProFields.dateFin + index, item.dateFin, ['dateAfterToday', 'required', { dateBefore: item.dateDebut }])}
                                        </ReactTooltip>
                                      )}
                                  </div>
                                )}

                                {(this.props.condidatReducer && this.props.condidatReducer.aConfirmer &&
                                  <span>{item.dateFin}</span>
                                )}
                              </td>

                              <td class="">
                                {(this.props.condidatReducer && !this.props.condidatReducer.aConfirmer &&
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className={!this.state.ignorer && this.state.touched && this.state.touched[expProFields.etablissement + index] && item.etablissement.libelle == "" ? "form-control form-control-sm invalide-field" : "form-control form-control-sm"}
                                      id="sel1"
                                      onChange={(e) => { this.onChangeEtablissement(e, index) }}
                                      value={item.etablissement && item.etablissement.libelle}
                                      data-tip
                                      data-for={"etablissementTip" + index} />

                                    {/* msg erreur */}
                                    {!this.state.ignorer && this.state.touched && this.state.touched[expProFields.etablissement + index] && item.etablissement.libelle == "" && (
                                      <ReactTooltip id={"etablissementTip" + index} place="top" effect="solid">
                                        {ValidationService.validator.message(expProFields.etablissement + index, item.etablissement.id, 'requiredSelect:etablissement')}
                                      </ReactTooltip>
                                    )}
                                  </div>
                                )}
                                {(this.props.condidatReducer && this.props.condidatReducer.aConfirmer &&
                                  <span>{item.etablissement.libelle}</span>
                                )}
                              </td>

                              <td class="">
                                {(this.props.condidatReducer && !this.props.condidatReducer.aConfirmer &&
                                  <div className="form-group">
                                    <select
                                      className={!this.state.ignorer && this.state.touched && this.state.touched[expProFields.poste + index] && item.poste.id == -1 ? "form-control form-control-sm invalide-field" : "form-control form-control-sm"}
                                      id="sel1"
                                      onChange={(e) => { this.onChangePoste(e, index) }}
                                      value={item.poste.id}
                                      data-tip
                                      data-for={"posteTip" + index}>
                                      <option value="-1" key="defaultposte"></option>
                                      {postes.map(({ id, libelle }, index) => <option value={id} key={index} >{libelle}</option>)}
                                    </select>
                                    {/* msg erreur */}
                                    {!this.state.ignorer && this.state.touched && this.state.touched[expProFields.poste + index] && item.poste.id == -1 && (
                                      <ReactTooltip id={"posteTip" + index} place="top" effect="solid">
                                        {ValidationService.validator.message(expProFields.poste + index, item.poste.id, 'requiredSelect:poste')}
                                      </ReactTooltip>
                                    )}
                                  </div>
                                )}
                                {(this.props.condidatReducer && this.props.condidatReducer.aConfirmer &&
                                  <span>{item.poste.libelle}</span>
                                )}
                              </td>

                              <td class="">
                                {(this.props.condidatReducer && !this.props.condidatReducer.aConfirmer &&
                                  <div className="form-group">
                                    <select
                                      className={!this.state.ignorer && this.state.touched && this.state.touched[expProFields.pays + index] && item.pays.id == -1 ? "form-control form-control-sm invalide-field" : "form-control form-control-sm"}
                                      id="sel1"
                                      onChange={(e) => { this.onChangePays(e, index) }}
                                      value={item.pays.id}
                                      data-tip
                                      data-for={"paysTip" + index}>
                                      <option value="-1" key="defaulpays"></option>
                                      {pays.map(({ id, libelle }, index) => <option value={id} key={index} >{libelle}</option>)}
                                    </select>
                                    {/* msg erreur */}
                                    {!this.state.ignorer && this.state.touched && this.state.touched[expProFields.pays + index] && item.pays.id == -1 && (
                                      <ReactTooltip id={"paysTip" + index} place="top" effect="solid">
                                        {ValidationService.validator.message(expProFields.pays + index, item.pays.id, 'requiredSelect:pays')}
                                      </ReactTooltip>
                                    )}
                                  </div>
                                )}
                                {(this.props.condidatReducer && this.props.condidatReducer.aConfirmer &&
                                  <span>{item.pays.libelle}</span>
                                )}
                              </td>
                              <td className="col-3">
                                {(this.props.condidatReducer && !this.props.condidatReducer.aConfirmer &&
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className={!this.state.ignorer && this.state.touched && this.state.touched[expProFields.ville + index] && !item.ville ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}
                                      name="ville"
                                      value={item.ville}
                                      onChange={(e) => { this.onChangeVille(e, index) }}
                                      data-tip
                                      data-for={"villeTip" + index}
                                    />
                                    {/* msg erreur */}
                                    {!this.state.ignorer && this.state.touched && this.state.touched[expProFields.ville + index] && !item.ville && (
                                      <ReactTooltip id={"villeTip" + index} place="top" effect="solid">
                                        {ValidationService.validator.message(expProFields.ville + index, item.ville, 'required')}
                                      </ReactTooltip>
                                    )}

                                  </div>
                                )}
                                {(this.props.condidatReducer && !this.props.condidatReducer.aConfirmer &&
                                  <Fab color="secondary" aria-label="delete" size="small" className={classes.fab} style={{ zIndex: 100 }} >
                                    <DeleteIcon onClick={(e) => this.deleteTabElement(e, index)} />
                                  </Fab>
                                )}
                                {(this.props.condidatReducer && this.props.condidatReducer.aConfirmer &&
                                  <span>{item.ville}</span>
                                )}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                      {(this.props.condidatReducer && !this.props.condidatReducer.aConfirmer &&
                        <div>
                          <button type="button" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" onClick={this.updateTabElements}>+Ajouter</button>
                          <button type="button" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm ml-1" onClick={this.ignorerEtape}>Ignorer cette étape</button>
                        </div>
                      )}
                    </div>
                  )}
                  {(this.props.condidatReducer && this.props.condidatReducer.aConfirmer &&
                    <ExperienceProLecture items={items} />
                  )}
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
  const { postes } = state.poste;
  const { etablissements } = state.etablissement;
  const { pays } = state.pays;
  const { condidatReducer } = state.condidat;
  return { pays, etablissements, postes, condidatReducer };
}
const actionCreators = {
  ignorerExpPro: ignorerEtapeActions.ignorerExpPro,
  setCondidat: condidatActions.setCondidat,
};

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, actionCreators)(ExperienceProfessionel));