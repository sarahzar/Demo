import React, { Component } from "react";
import { connect, Provider } from "react-redux";
import Form from "react-validation/build/form";
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
import ExperienceEnsLecture from "./ExperienceEnsLecture";
import CondidatService from "../../../services/Condidature/CondidatService";
import AuthService from "../../../services/Authentification/AuthService";

export const expEnseignantFields = {

  etablissement: 'etablissement',
  poste: 'poste',
  module: 'module',
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
class ExperienceEnseignant extends Component {
  constructor(props) {

    super(props);
    ValidationService.validator.autoForceUpdate = this;
    this.state = {
      loading: false,
      items: [{ id:-1, dateDebut: "", dateFin: "", etablissement: {id:-1,libelle:""}, poste:{id:-1,libelle:""}, moduleEnseigne:{id:-1,libelle:""} }],
      retour: false,
      condidat: null,
      changePath: false,
      ignorer: false,
      touched: {},
      message: "",
      typeMessage: "",
    };
  }

  componentDidMount() {
    const { condidatReducer } = this.props
    if (condidatReducer) {
      this.setState({
        condidat: condidatReducer,
      });
      if (condidatReducer.experienceEnseignants && condidatReducer.experienceEnseignants.length > 0) {
        this.setState({
          items: condidatReducer.experienceEnseignants
        });
      }
    }
  }

  componentWillUnmount() {

    if(this.props.condidatReducer && !this.props.condidatReducer.aConfirmer){

      let elements = []
      elements = this.props.condidatReducer && this.props.condidatReducer.dateModif ? this.props.condidatReducer.experienceEnseignants : [...this.state.items]
      elements = this.initListeExp(elements)


    if (localStorage.getItem('persist:root')) {

      if(this.props.condidatReducer && !this.props.condidatReducer.dateModif){
      this.props.condidatReducer.experienceEnseignants = [...this.state.items];
      this.props.setCondidat(this.props.condidatReducer)
      }

      if (elements && elements.length > 0) {
        this.props.ignorerExpEns(false);
      } else {
        this.props.ignorerExpEns(true);
      }
    }

  }
 

  }

  onChangeEtablissement = (e, index) => {
    let touchedElement = { ...this.state.touched }
    touchedElement[expEnseignantFields.etablissement + index] = true;

    let elements = this.state.items;
    let id =e.target.value;
    let etablissement = this.props.etablissements.filter(elem => elem.id == id).shift()

    elements[index].etablissement = etablissement;
    this.setState({
      items: elements,
      touched: touchedElement
    });
    ValidationService.validator.showMessageFor(expEnseignantFields.etablissement + index)
  }


  onChangePoste = (e, index) => {
    let touchedElement = { ...this.state.touched }
    touchedElement[expEnseignantFields.poste + index] = true;

    let elements = this.state.items;
    let id =e.target.value;
    let poste = this.props.postes.filter(elem => elem.id == id).shift()

    elements[index].poste = poste;
    this.setState({
      items: elements,
      touched: touchedElement
    });
    ValidationService.validator.showMessageFor(expEnseignantFields.poste + index)
  }

  onChangeModule = (e, index) => {
    let touchedElement = { ...this.state.touched }
    touchedElement[expEnseignantFields.module + index] = true;

    let elements = this.state.items;
    let id =e.target.value;
    let module = this.props.modules.filter(elem => elem.id == id).shift()

    elements[index].moduleEnseigne = module;
    this.setState({
      items: elements,
      touched: touchedElement
    });
    ValidationService.validator.showMessageFor(expEnseignantFields.module + index)
  }

  onChangeDateDeb = (e, index) => {
    let touchedElement = { ...this.state.touched }
    touchedElement[expEnseignantFields.dateDeb + index] = true;

    let elements = this.state.items;
    elements[index].dateDebut = e.target.value;
    this.setState({
      items: elements,
      touched: touchedElement
    });
    ValidationService.validator.showMessageFor(expEnseignantFields.dateDeb + index)
  }

  onChangeDateFin = (e, index) => {
    let touchedElement = { ...this.state.touched }
    touchedElement[expEnseignantFields.dateFin + index] = true;

    let elements = this.state.items;
    elements[index].dateFin = e.target.value;
    this.setState({
      items: elements,
      touched: touchedElement
    });
    ValidationService.validator.showMessageFor(expEnseignantFields.dateFin + index)
  }

  goBack = (e) => {
    e.preventDefault();
    this.setState({
      retour: true,
    });
  }

  ignorerEtape = (e) => {

    let condidatToSave = this.state.condidat
    condidatToSave.experienceEnseignants = this.state.items

    this.setState({
      ignorer: true,
      loading: true,
      changePath: true,
      condidat: condidatToSave
    });

    this.props.ignorerExpEns(true)
  
  }

  deleteTabElement = (e, index) => {
    //declaration variables copies du state
    const expEnseignants = this.state.items.slice()
    const touchedcp = { ...this.state.touched }
    const replacedTouched = []
    const defaultElem = { id:-1, dateDebut: "", dateFin: "", etablissement: {id:-1,libelle:""}, poste:{id:-1,libelle:""}, moduleEnseigne:{id:-1,libelle:""} }

    //spprimer l'élément sélectionner
    expEnseignants.splice(index, 1)

    //mettre à jour la variable du state touched après la suppression d'un élément
    this.updateTouchedAfterDelete(index, replacedTouched, touchedcp);

    //rajouter l'élément par défaut si la liste est vide
    if (expEnseignants.length == 0) {
      expEnseignants.unshift(defaultElem)
    }
    //mise à jour du state
    this.setState({
      items: expEnseignants,
      touched: replacedTouched
    })

  }

  updateTabElements = (e) => {
    const defaultElem = { id:-1, dateDebut: "", dateFin: "", etablissement: {id:-1,libelle:""}, poste:{id:-1,libelle:""}, moduleEnseigne:{id:-1,libelle:""} }
    e.preventDefault();
    let elements = this.state.items;

    elements.push(defaultElem);
    this.setState({
      items: elements
    });

    this.markUsUntouched()
    this.props.condidatReducer.experienceEnseignants = elements;
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

  initListeExp(liste) {

    const defaultElem = { id:-1, dateDebut: "", dateFin: "", etablissement: {id:-1,libelle:""}, poste:{id:-1,libelle:""}, moduleEnseigne:{id:-1,libelle:""} }
    const firstElem = liste ? liste[0] : null;

    if (JSON.stringify(defaultElem) === JSON.stringify(firstElem)) {
      liste = [];
    }
    return liste;
  }

  updateTouched(replacedTouched, index1, index2, touchedcp) {
    replacedTouched[expEnseignantFields.etablissement + index1] = touchedcp[expEnseignantFields.etablissement + index2];
    replacedTouched[expEnseignantFields.poste + index1] = touchedcp[expEnseignantFields.poste + index2];
    replacedTouched[expEnseignantFields.module + index1] = touchedcp[expEnseignantFields.module + index2];
    replacedTouched[expEnseignantFields.dateDeb + index1] = touchedcp[expEnseignantFields.dateDeb + index2];
    replacedTouched[expEnseignantFields.dateFin + index1] = touchedcp[expEnseignantFields.dateFin + index2];
  }

  addMessages() {
    this.state.items.forEach((elem, i) => {
      ValidationService.validator.message(expEnseignantFields.etablissement + i, elem.etablissement, 'requiredSelect');
      ValidationService.validator.message(expEnseignantFields.poste + i, elem.poste, 'requiredSelect');
      ValidationService.validator.message(expEnseignantFields.moduleEnseigne + i, elem.module, 'requiredSelect');
      ValidationService.validator.message(expEnseignantFields.dateDeb + i, elem.dateDebut, ['dateAfterToday', 'required', { dateAfter: elem.dateFin }]);
      ValidationService.validator.message(expEnseignantFields.dateFin + i, elem.dateFin, ['dateAfterToday', 'required', { dateBefore: elem.dateDebut }]);
    });
  }

  markUsTouched() {
    this.state.items.forEach((item, i) => {
      this.state.touched[expEnseignantFields.etablissement + i] = true;
      this.state.touched[expEnseignantFields.poste + i] = true;
      this.state.touched[expEnseignantFields.module + i] = true;
      this.state.touched[expEnseignantFields.dateDeb + i] = true;
      this.state.touched[expEnseignantFields.dateFin + i] = true;
    });
  }

  markUsUntouched() {
    let touchedCopy = { ...this.state.touched }
    let indice = this.state.items.length - 1;
    touchedCopy[expEnseignantFields.etablissement + indice] = false
    touchedCopy[expEnseignantFields.poste + indice] = false
    touchedCopy[expEnseignantFields.module + indice] = false
    touchedCopy[expEnseignantFields.dateDeb + indice] = false
    touchedCopy[expEnseignantFields.dateFin + indice] = false

    this.setState({
      touched: touchedCopy
    })
  }
  
  handleSubmitCondidat = (e) => {
    e.preventDefault();
    if(this.props.condidatReducer && !this.props.condidatReducer.aConfirmer){
    ValidationService.validator.purgeFields();
    this.addMessages();
    if (ValidationService.validator.allValid()) {
      let condidatToSave = this.state.condidat
      condidatToSave.experienceEnseignants = this.state.items

      this.setState({
        loading: true,
        changePath: true,
        condidat: condidatToSave
      })

    } else {

      this.markUsTouched();
      ValidationService.validator.showMessages();

    }
  }else{
    this.setState({
      loading: true,
      changePath: true,
    })
  }
  }

  modifierCondidat= (e) => {

    e.preventDefault();
    const formData = new FormData();
   
      let condidatToSave = this.state.condidat
      condidatToSave.experienceEnseignants = this.state.items

      this.setState({
        condidat: condidatToSave,
      })

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
              data =>{
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
    
  }

  render() {



    const { classes } = this.props;
    const { loading } = this.state;
    const { postes } = this.props;
    const { modules } = this.props;
    const { etablissements } = this.props
    const { items } = this.state;
    const { changePath } = this.state;
    const { message } = this.state;
    const { typeMessage } = this.state;


    if (this.state.retour) {
      return <Redirect to={{
        pathname: '/parcour',
      }} />;
    }


    if (changePath) {
      return <Redirect to={{
        pathname: '/expPro',
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
                  <h1 className="h3 mb-0 text-gray-800">Expérience d'enseignement</h1>
                  <div className="form-group m-0">
                    <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm mr-1" onClick={this.goBack}>
                      <i className="fas fa-angle-double-left fa-sm text-white-50"></i>Précédent
                    </button>

                    {this.props.condidatReducer && this.props.condidatReducer.dateModif && (
                      <button type="button" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm ml-2 mr-2" onClick={this.modifierCondidat}>modifier</button>
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

                        <tr className="d-flex">
                          <th className="col-2 control-label">Date de début </th>
                          <th className="col-2 control-label">Date de fin </th>
                          <th className="col-3 control-label">Etablissement </th>
                          <th className="col-2 control-label">Poste </th>
                          <th className="col-3 control-label">Module enseigné </th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, index) =>
                          <tr key={index} className="d-flex">
                            <td className="col-2">
                            {(this.props.condidatReducer && !this.props.condidatReducer.aConfirmer &&
                             <div className="form-group">
                              <input
                                type="date"
                                className={!this.state.ignorer &&
                                  this.state.touched &&
                                  this.state.touched[expEnseignantFields.dateDeb + index] &&
                                  (!item.dateDebut || DateValidators.isSameToday(item.dateDebut) || DateValidators.isAfterToday(item.dateDebut) || DateValidators.isAfterDate(item.dateDebut, item.dateFin) || DateValidators.isSameDate(item.dateDebut, item.dateFin)) ? "form-control form-control-sm invalide-field" : "form-control form-control-sm"}
                                name="dated"
                                value={item.dateDebut}
                                onChange={(e) => { this.onChangeDateDeb(e, index) }}
                                data-tip
                                data-for={"dateDebTip" + index}
                              />
                              {/* msg erreur */}
                              {!this.state.ignorer &&
                                this.state.touched &&
                                this.state.touched[expEnseignantFields.dateDeb + index] &&
                                (!item.dateDebut || DateValidators.isSameToday(item.dateDebut) || DateValidators.isAfterToday(item.dateDebut) || DateValidators.isAfterDate(item.dateDebut, item.dateFin) || DateValidators.isSameDate(item.dateDebut, item.dateFin)) && (
                                  <ReactTooltip id={"dateDebTip" + index} place="top" effect="solid">
                                    {ValidationService.validator.message(expEnseignantFields.dateDeb + index, item.dateDebut, ['dateAfterToday', 'required', { dateAfter: item.dateFin }])}
                                  </ReactTooltip>
                                )}
                            </div>
                            )}
                              {(this.props.condidatReducer && this.props.condidatReducer.aConfirmer &&
                                  <span>{item.dateDebut}</span>
                              )}
                            </td>
                            <td className="col-2"> 
                            {(this.props.condidatReducer && !this.props.condidatReducer.aConfirmer &&
                            <div className="form-group">
                              <input
                                type="date"
                                className={!this.state.ignorer &&
                                  this.state.touched &&
                                  this.state.touched[expEnseignantFields.dateFin + index] &&
                                  (!item.dateFin || DateValidators.isSameToday(item.dateFin) || DateValidators.isAfterToday(item.dateFin) || DateValidators.isbeforeDate(item.dateFin, item.dateDebut) || DateValidators.isSameDate(item.dateDebut, item.dateFin)) ? "form-control form-control-sm invalide-field" : "form-control form-control-sm"}
                                name="datef"
                                value={item.dateFin}
                                onChange={(e) => { this.onChangeDateFin(e, index) }}
                                data-tip
                                data-for={"dateFinTip" + index}
                              />
                              {/* msg erreur */}
                              {!this.state.ignorer &&
                                this.state.touched &&
                                this.state.touched[expEnseignantFields.dateFin + index] &&
                                (!item.dateFin || DateValidators.isSameToday(item.dateFin) || DateValidators.isAfterToday(item.dateFin) || DateValidators.isbeforeDate(item.dateFin, item.dateDebut) || DateValidators.isSameDate(item.dateDebut, item.dateFin)) && (
                                  <ReactTooltip id={"dateFinTip" + index} place="top" effect="solid">
                                    {ValidationService.validator.message(expEnseignantFields.dateFin + index, item.dateFin, ['dateAfterToday', 'required', { dateBefore: item.dateDebut }])}
                                  </ReactTooltip>
                                )}
                            </div>
                            )}
                              {(this.props.condidatReducer && this.props.condidatReducer.aConfirmer &&
                                  <span>{item.dateFin}</span>
                              )}
                            </td>

                            <td className="col-3">
                            {(this.props.condidatReducer && !this.props.condidatReducer.aConfirmer &&
                              <div className="form-group">
                              <select
                                className={!this.state.ignorer && this.state.touched && this.state.touched[expEnseignantFields.etablissement + index] && item.etablissement.id == -1 ? "form-control form-control-sm invalide-field" : "form-control form-control-sm"}
                                id="sel1"
                                onChange={(e) => { this.onChangeEtablissement(e, index) }}
                                value={item.etablissement.id}
                                data-tip
                                data-for={"etablissementTip" + index}>
                                <option value="-1" key="defaultetablissement"></option>
                                {etablissements.map(({ id, libelle }, index) => <option value={id} key={index} >{libelle}</option>)}
                              </select>
                              {/* msg erreur */}
                              {!this.state.ignorer && this.state.touched && this.state.touched[expEnseignantFields.etablissement + index] && item.etablissement.id == -1 && (
                                <ReactTooltip id={"etablissementTip" + index} place="top" effect="solid">
                                  {ValidationService.validator.message(expEnseignantFields.etablissement + index, item.etablissement.id, 'requiredSelect:etablissement')}
                                </ReactTooltip>
                              )}
                            </div>
                            )}
                             {(this.props.condidatReducer && this.props.condidatReducer.aConfirmer &&
                                  <span>{item.etablissement.libelle}</span>
                              )}
                            </td>

                            <td className="col-2"> 
                            {(this.props.condidatReducer && !this.props.condidatReducer.aConfirmer &&
                            <div className="form-group">
                              <select
                                className={!this.state.ignorer && this.state.touched && this.state.touched[expEnseignantFields.poste + index] && item.poste.id == -1 ? "form-control form-control-sm invalide-field" : "form-control form-control-sm"}
                                id="sel1" onChange={(e) => { this.onChangePoste(e, index) }}
                                value={item.poste.id}
                                data-tip
                                data-for={"posteTip" + index}>
                                <option value="-1" key="defaultposte"></option>
                                {postes.map(({ id, libelle }, index) => <option value={id} key={index} >{libelle}</option>)}
                              </select>
                              {/* msg erreur */}
                              {!this.state.ignorer && this.state.touched && this.state.touched[expEnseignantFields.poste + index] && item.poste.id == -1 && (
                                <ReactTooltip id={"posteTip" + index} place="top" effect="solid">
                                  {ValidationService.validator.message(expEnseignantFields.poste + index, item.poste.id, 'requiredSelect:poste')}
                                </ReactTooltip>
                              )}
                            </div>
                            )}
                             {(this.props.condidatReducer && this.props.condidatReducer.aConfirmer &&
                                  <span>{item.poste.libelle}</span>
                              )}
                            </td>

                            <td className="col-3">
                            {(this.props.condidatReducer && !this.props.condidatReducer.aConfirmer &&
                              <div className="form-group">
                              <select
                                className={!this.state.ignorer && this.state.touched && this.state.touched[expEnseignantFields.module + index] && item.moduleEnseigne.id == -1 ? "form-control form-control-sm invalide-field" : "form-control form-control-sm"}
                                id="sel1"
                                onChange={(e) => { this.onChangeModule(e, index) }}
                                value={item.moduleEnseigne.id}
                                data-tip
                                data-for={"moduleTip" + index}>
                                <option value="-1" key="defaultmodule"></option>
                                {modules.map(({ id, libelle }, index) => <option value={id} key={index} >{libelle}</option>)}
                              </select>
                              {/* msg erreur */}
                              {!this.state.ignorer && this.state.touched && this.state.touched[expEnseignantFields.module + index] && item.moduleEnseigne.id == -1 && (
                                <ReactTooltip id={"moduleTip" + index} place="top" effect="solid">
                                  {ValidationService.validator.message(expEnseignantFields.module + index, item.moduleEnseigne.id, 'requiredSelect:module')}
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
                                  <span>{item.moduleEnseigne.libelle}</span>
                              )}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  
                      <div>
                        <button type="button" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" onClick={this.updateTabElements}>+Ajouter</button>
                        <button type="button" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm ml-1" onClick={this.ignorerEtape}>Ignorer cette étape</button>
                      </div>
                  
                  </div>
                   )}
                  {(this.props.condidatReducer && this.props.condidatReducer.aConfirmer &&
                    <ExperienceEnsLecture items={items} />
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
  const { modules } = state.module;
  const { postes } = state.poste;
  const { etablissements } = state.etablissement;
  const { condidatReducer } = state.condidat;
  return { modules, postes, etablissements, condidatReducer };
}
const actionCreators = {
  ignorerExpEns: ignorerEtapeActions.ignorerExpEns,
  setCondidat: condidatActions.setCondidat,
  completeExpEns: ignorerEtapeActions.completeExpEns
};
export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, actionCreators)(ExperienceEnseignant));

