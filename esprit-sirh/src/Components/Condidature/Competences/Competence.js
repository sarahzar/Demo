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
import ValidationService from "../../../services/Validation/ValidationService"
import { ignorerEtapeActions } from '../../../_actions/Shared/ignorer.etape.actions';
import { condidatActions } from "../../../_actions/Shared/condidat.actions";
import CompetenceLecture from "./CompetenceLecture";
import CondidatService from "../../../services/Condidature/CondidatService";
import AuthService from "../../../services/Authentification/AuthService";

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

class Competence extends Component {
  constructor(props) {

    super(props);
    ValidationService.validator.autoForceUpdate = this;

    this.state = {
      loading: false,
      items: [{ id:-1, titre: "", description: "" }],
      retour: false,
      // condidat: null,
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
      // this.setState({
      //   condidat: condidatReducer,
      // });
      if (condidatReducer.competences && condidatReducer.competences.length > 0) {
        this.setState({
          items: condidatReducer.competences
        });
      }
    }
  }

  componentWillUnmount() {

    if(this.props.condidatReducer && !this.props.condidatReducer.aConfirmer){

    let elements = []
    elements = this.props.condidatReducer && this.props.condidatReducer.dateModif ? this.props.condidatReducer.competences : [...this.state.items]
    elements = this.initListe(elements)

    if (localStorage.getItem('persist:root')) {

      if(this.props.condidatReducer && !this.props.condidatReducer.dateModif){
      this.props.condidatReducer.competences = [...this.state.items];
      this.props.setCondidat(this.props.condidatReducer)
      }

      if (elements && elements.length > 0) {
        this.props.ignorerCompetence(false);
      } else {
        this.props.ignorerCompetence(true);
      }
    }
    
  }

  }

  onChangeTitre = (e, index) => {
    let touchedElement = { ...this.state.touched }
    touchedElement['titre' + index] = true;

    let elements = [...this.state.items];
    elements[index].titre = e.target.value;
    this.setState({
      items: elements,
      touched: touchedElement
    });

    ValidationService.validator.showMessageFor('titre' + index)
  }

  onChangeDescription = (e, index) => {
    let elements = [...this.state.items];
    elements[index].description = e.target.value;
    this.setState({
      items: elements,
    });
  }

  goBack = (e) => {
    e.preventDefault();
    this.setState({
      retour: true,
    });
  }

  ignorerEtape = (e) => {
    // let condidatToSave = this.state.condidat
    // condidatToSave.competences = [...this.state.items]

    this.setState({
      ignorer: true,
      changePath: true,
      loading: true,
      // condidat: condidatToSave
    });

    this.props.ignorerCompetence(true)
  }

  updateTabElements = (e) => {
    const defaultElem = { id:-1, titre: "", description: "" }
    e.preventDefault();
    let elements = [...this.state.items];
    elements.push(defaultElem);
    this.setState({
      items: elements
    });
    this.markUsUntouched()
  }

  deleteTabElement = (e, index) => {
    //declaration variables copies du state
    const competences = this.state.items.slice()
    const touchedcp = { ...this.state.touched }
    const replacedTouched = []
    const defaultElem = { id:-1, titre: "", description: "" }

    //spprimer l'élément sélectionner
    competences.splice(index, 1)
    //mettre à jour la variable du state touched après la suppression d'un élément
    this.updateTouchedAfterDelete(index, replacedTouched, touchedcp);
   
    //rajouter l'élément par défaut si la liste est vide
    if (competences.length == 0) {
      competences.unshift(defaultElem)
    }
    //mise à jour du state
    this.setState({
      items: competences,
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

  initListe(liste) {

    const defaultElem = { id:-1, titre: "", description: "" }
    const firstElem = liste ? liste[0] : 0;

    if (JSON.stringify(defaultElem) === JSON.stringify(firstElem)) {
      liste = [];
    }
    return liste;
  }

  handleSubmitCondidat = (e) => {
    e.preventDefault();
    if(this.props.condidatReducer && !this.props.condidatReducer.aConfirmer && !this.props.condidatReducer.dateModif){
    ValidationService.validator.purgeFields();
    this.addMessages();
    if (ValidationService.validator.allValid()) {
      // let condidatToSave = this.props.condidatReducer
      // condidatToSave.competences = [...this.state.items]


      this.setState({
        loading: true,
        changePath: true,
        // condidat: condidatToSave
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

  updateTouched(replacedTouched, index1, index2, touchedcp) {
    replacedTouched['titre' + index1] = touchedcp['titre' + index2];
  }

  addMessages() {
    this.state.items.forEach((elem, i) => {
      ValidationService.validator.message('titre' + i, elem.titre, 'required');
    });
  }

  markUsTouched() {
    this.state.items.forEach((item, i) => {
      this.state.touched['titre' + i] = true;
    });
  }

  markUsUntouched() {
    let touchedCopy = { ...this.state.touched }
    let indice = this.state.items.length - 1;
    touchedCopy['titre' + indice] = false

    this.setState({
      touched: touchedCopy
    })
  }

  modifierCondidat= (e) => {

    e.preventDefault();
    const formData = new FormData();
    ValidationService.validator.purgeFields();
    this.addMessages();

    if (ValidationService.validator.allValid()) {      
      let condidatToSave = this.props.condidatReducer
      condidatToSave.competences = [...this.state.items]

      // this.setState({
      //   condidat: condidatToSave,
      // })

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
    }else {
      this.markUsTouched();
      ValidationService.validator.showMessages();
    }
    
  }

  render() {

    const { classes } = this.props;
    const { loading } = this.state;
    const { items } = this.state;
    const { changePath } = this.state;
    const { condidatReducer } = this.props;
    const { message } = this.state;
    const { typeMessage } = this.state;

    if (this.state.retour) {   
      return <Redirect to={{
        pathname: '/expPro',
      }} />;
    }
    if (changePath) {
      return <Redirect to={{
        pathname: '/recherche',
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
                  <h1 className="h3 mb-0 text-gray-800">Compétence (Scientifique, Culturelle, Artistique, ...)</h1>
                  <div className="form-group m-0">
               
                    <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm mr-1" onClick={this.goBack}>
                      <i className="fas fa-angle-double-left fa-sm text-white-50"></i>Précédent
                    </button>

                    {this.props.condidatReducer && this.props.condidatReducer.dateModif && (
                      <button  className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm ml-2 mr-2" onClick={this.modifierCondidat} >modifier</button>
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

                        <tr>
                          <th className="control-label">Compétence </th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, index) =>
                          <tr key={index}>
                            <td> 
                            {(this.props.condidatReducer && !this.props.condidatReducer.aConfirmer &&
                              <div className="form-group">
                              <input
                                type="text"
                                className={!this.state.ignorer && this.state.touched && this.state.touched['titre' + index] && !item.titre ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}
                                name="titre"
                                value={item.titre}
                                onChange={(e) => { this.onChangeTitre(e, index) }}
                                data-tip
                                data-for={"titreTip" + index}
                              />
                              {/* msg erreur */}
                              {!this.state.ignorer && this.state.touched && this.state.touched['titre' + index] && !item.titre && (
                                <ReactTooltip id={"titreTip" + index} place="top" effect="solid">
                                  {ValidationService.validator.message('titre' + index, item.titre, 'required')}
                                </ReactTooltip>
                              )}
                            </div>
                            )}
                              {(this.props.condidatReducer && this.props.condidatReducer.aConfirmer &&
                                  <span>{item.titre}</span>
                              )}
                            </td>
                            <td className="col-6"> 
                            {(this.props.condidatReducer && !this.props.condidatReducer.aConfirmer &&
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                name="description"
                                value={item.description}
                                onChange={(e) => { this.onChangeDescription(e, index) }}

                              />
                            </div>
                            )}
                               {(this.props.condidatReducer && !this.props.condidatReducer.aConfirmer &&
                              <Fab color="secondary" aria-label="delete" size="small" className={classes.fab} style={{ zIndex: 100 }} >
                                <DeleteIcon onClick={(e) => this.deleteTabElement(e, index)} />
                              </Fab>
                               )}

                              {(this.props.condidatReducer && this.props.condidatReducer.aConfirmer &&
                                  <span>{item.description}</span>
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
                    <CompetenceLecture items={items} />
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
   const { condidatReducer } = state.condidat;
  return { condidatReducer };
}
const actionCreators = {
  ignorerCompetence: ignorerEtapeActions.ignorerCompetence,
  setCondidat: condidatActions.setCondidat,
};

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, actionCreators)(Competence));