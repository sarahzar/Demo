import React, { Component } from "react";
import { connect, Provider } from "react-redux";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Leftside from "../../Layout/Leftside"
import Header from "../../Layout/Header"
import { Link,Redirect } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';
import ReactTooltip from "react-tooltip";

import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from "@material-ui/core/styles";
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
class Parcour extends Component {
  constructor(props) {

    super(props);

    //validations des champs 
    SimpleReactValidator.addLocale('fr', {
      required: 'champ obligatoire.',
      numeric: 'Le champ :attribute doit être numérique.',
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

        afterCurrentYear: {  // name the rule
          message: "valeur supérieure à l'année courrante",      
           rule: (val) => {
             let currentYear= new Date().getFullYear()
              return ! (val > currentYear);
            },
          },
      }
      
      
    });
      
    this.state = {
      loading: false,
      domaineId:-1,
      specialiteId: -1,
      etablissementId:-1,
      diplomeId: -1,
      mention: -1,
      paysId: -1,
      anneeObtention:"",
      items:[{anneeObtention:"",diplomeId: -1,etablissementId:-1,specialiteId: -1,mention: -1,paysId: -1}],
      // index:0,     
      etatCivils: this.props.location.state.etatCivils,
      postes: this.props.location.state.postes,
      diplomes: this.props.location.state.diplomes,
      domaines: this.props.location.state.domaines,
      types: this.props.location.state.types,
      etablissements:  this.props.location.state.etablissements,
      specialites:  this.props.location.state.specialites,
      pays:  this.props.location.state.pays,
      modules: this.props.location.state.modules,
      retour:false,
      condidat:this.props.location.state.condidatFromProfile,
      changePath:false,
      touched:{},
      message:""
    };
  }
  componentDidMount() {
    let condidatFromPrecedent = null
    if(this.props.location.state.condidatBackToParcour){
      condidatFromPrecedent = this.props.location.state.condidatBackToParcour
    }else{
      condidatFromPrecedent = this.props.location.state.condidatFromProfile
    }
    if (condidatFromPrecedent.listeParcours.length > 0) {
      this.setState({
        items: condidatFromPrecedent.listeParcours,
        condidat:condidatFromPrecedent
      });
    }else{
      this.setState({
        condidat:condidatFromPrecedent
      });
    }
  }

  
  onChangeSpecialite = (e,index) =>{

    let touchedElement = {...this.state.touched}
    touchedElement['spetialite'+index] =true;

    let elements=this.state.items;
    elements[index].specialiteId=e.target.value;
    this.setState({
        items: elements,
        touched: touchedElement
      });
    this.validator.showMessageFor('spetialite'+index)
  }
  onChangeEtablissement = (e,index) =>{
    
    let touchedElement = {...this.state.touched}
    touchedElement['etablissement'+index] =true;

    let elements=this.state.items;
    elements[index].etablissementId=e.target.value;
    this.setState({
        items: elements,
        touched: touchedElement
      });
    this.validator.showMessageFor('etablissement'+index)
  }
  
  onChangeAnneeObtention = (e,index) =>{

    let touchedElement = {...this.state.touched}
    touchedElement['annee'+index] =true;

    let elements=this.state.items;
    elements[index].anneeObtention=e.target.value;
    this.setState({
        items: elements,
        touched:touchedElement
      });
    this.validator.showMessageFor('annee'+index)
   
  }

  onChangeDiplome = (e,index) =>{
    
    let touchedElement = {...this.state.touched}
    touchedElement['diplome'+index] =true;

    let elements=this.state.items;
    elements[index].diplomeId=e.target.value;
    this.setState({
        items: elements,
        touched:touchedElement
      });
    this.validator.showMessageFor('diplome'+index)  
  }

  onChangeMention = (e,index) =>{
     
    let touchedElement = {...this.state.touched}
    touchedElement['mention'+index] =true;

    let elements=this.state.items;
    elements[index].mention=e.target.value;
    this.setState({
        items: elements,
        touched:touchedElement
      });
    this.validator.showMessageFor('mention'+index)   
  }
  onChangePays = (e,index) =>{
     
    let touchedElement = {...this.state.touched}
    touchedElement['pays'+index] =true;

    let elements=this.state.items;
    elements[index].paysId=e.target.value;
    this.setState({
        items: elements,
        touched:touchedElement
      });
    this.validator.showMessageFor('pays'+index)    
  }

  goBack = (e) => {
    e.preventDefault();
    this.setState({
      retour: true,
    });
  }

  updateTabElements = (e) => {
    e.preventDefault();
    let elements = this.state.items;
    elements.push({ anneeObtention: "", diplomeId: -1, etablissementId: -1, specialiteId: -1, mention: -1, paysId: -1 });
    this.setState({
      items: elements
    });
    this.markUsUntouched()
  }

  deleteTabElement(){

  }

  handleSubmitCondidat =(e) => {
    e.preventDefault();
    this.addMessages();
    
    if (this.validator.allValid()) {
     
      let condidatToSave=this.state.condidat
      condidatToSave.listeParcours=this.state.items
      this.setState({
        loading:true,
        changePath:true,
        condidat:condidatToSave
      })
      
    }
    else{
      
      this.markUsTouched(); 
    this.validator.showMessages();
    }
  }
 
  addMessages() {
    this.state.items.forEach((elem,i) => {
      this.validator.message('annee'+i, elem.anneeObtention, 'required|afterCurrentYear');
      this.validator.message('diplome'+i, elem.diplomeId, 'requiredSelect');
      this.validator.message('etablissement'+i, elem.etablissementId, 'requiredSelect');
      this.validator.message('spetialite'+i, elem.specialiteId, 'requiredSelect');
      this.validator.message('mention'+i, elem.mention, 'requiredSelect');
      this.validator.message('pays'+i, elem.paysId, 'requiredSelect');
    });
  }

  markUsTouched() {
    this.state.items.forEach((item, i) => {
      this.state.touched['annee' + i] = true;
      this.state.touched['diplome' + i] = true;
      this.state.touched['etablissement' + i] = true;
      this.state.touched['spetialite' + i] = true;
      this.state.touched['mention' + i] = true;
      this.state.touched['pays' + i] = true;
    });
  }
  markUsUntouched() {
    this.state.touched['annee'+this.state.items.length - 1] = false
    this.state.touched['diplome'+this.state.items.length - 1] = false
    this.state.touched['etablissement'+this.state.items.length - 1] = false
    this.state.touched['spetialite'+this.state.items.length - 1] = false
    this.state.touched['mention'+this.state.items.length - 1] = false
    this.state.touched['pays'+this.state.items.length - 1] = false
  }
 
  render() {
    const { classes } = this.props;
    const { loading } = this.state;
    const { postes } = this.state;
    const { diplomes } = this.state;
    const { domaines } = this.state;
    const { types } = this.state;
    const { etablissements } = this.state;
    const { specialites } = this.state;
    const { etatCivils } = this.state;
    const { modules } = this.state;
    const { pays } = this.state;
    const { items } = this.state;
    const changePath = this.state.changePath;
    const { condidat } = this.state;

    let condidatRecieved = null;
    if (this.props.location.state.condidatFromProfile) {
      condidatRecieved = this.props.location.state.condidatFromProfile
    } else {
      condidatRecieved = this.props.location.state.condidatBackToParcour
    }



    //récupérer le condidat au click sur précédent 
    if (this.state.retour) {
      condidatRecieved.listeParcours = items;
      return <Redirect to={{
        pathname: '/profile',
        state: {
          condidatBackToProfile: condidatRecieved,
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
    if (changePath){
      return <Redirect to={{
        pathname: '/expEnseignant',
        state: {
          condidatFromParcour:condidat,
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
            <h1 className="h3 mb-0 text-gray-800">Parcours académique (tous les diplômes y compris le BAC)</h1>
                <div className="form-group m-0">
                    <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm mr-1" onClick={this.goBack}>
                      <i className="fas fa-angle-double-left fa-sm text-white-50"></i>Précédent
                  </button>

                    <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                      className="fas fa-angle-double-right fa-sm text-white-50"
                      disabled={loading}></i>
                      {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
              Suivant </button>
              
                 </div>

             
              
          </div>
         
          { /* Content Row */}
          <div className="row">
            <div className="col-lg-12 mb-4 ">
           
                    <table className="table table-striped"  >
                      <thead>

                        <tr className="d-flex">
                          <th className="col-1 control-label">Année </th>
                          <th className="col-2 control-label">Nom du diplôme </th>
                          <th className="col-3 control-label">Etablissement </th>
                          <th className="col-2 control-label">Spécialité </th>
                          <th className="col-2 control-label">Mention </th>
                          <th className="col-2 control-label">Pays </th>
                        </tr>
                      </thead>
                      {items.map((item, index) =>
                      <tbody>
                       
                          <tr key={index} className="d-flex">
                            {/* annee obtention */}
                            <td className="col-1"> <div className="form-group">

                              <input
                                type="text"
                                name="annee"
                                value={item.anneeObtention}
                                onChange={(e) => { this.onChangeAnneeObtention(e, index) }}
                                className={this.state.touched && this.state.touched['annee' + index] && (!item.anneeObtention || item.anneeObtention > new Date().getFullYear()) ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}
                                data-tip
                                data-for={"anneeTip"+index}
                              />
                                
                              {/* msg erreur */}
                              {this.state.touched && this.state.touched['annee' + index] && (!item.anneeObtention || item.anneeObtention > new Date().getFullYear()) && (
                                <ReactTooltip id={"anneeTip"+index} place="top" effect="solid">
                                  {this.validator.message('annee' + index, item.anneeObtention, 'required|afterCurrentYear')}
                                </ReactTooltip>
                             )} 

                            </div>
                            </td>
                            {/* diplome */}
                            <td className="col-2">
                              <div className="form-group">
                                <select
                                  className={this.state.touched && this.state.touched['diplome' + index] && item.diplomeId == -1 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}
                                  id="sel1"
                                  onChange={(e) => { this.onChangeDiplome(e, index) }}
                                  value={item.diplomeId}
                                  data-tip
                                  data-for={"diplomeTip"+index}>
                                  <option value="-1" key="defaultdiplome"></option>
                                  {diplomes.map(({ id, libelle }, index) => <option value={id} key={index} >{libelle}</option>)}
                                </select>
                               
                                {/* msg erreur */}
                                {this.state.touched && this.state.touched['diplome' + index] && item.diplomeId == -1  && (
                                  <ReactTooltip id={"diplomeTip"+index} place="top" effect="solid">
                                    {this.validator.message('diplome' + index, item.diplomeId, 'requiredSelect')}
                                  </ReactTooltip>
                                )}
                              </div>
                            </td>
                            {/* etablissement */}
                            <td className="col-3"><div className="form-group">
                              <select
                                className={this.state.touched && this.state.touched['etablissement' + index] && item.etablissementId == -1 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}
                                id="sel1"
                                onChange={(e) => { this.onChangeEtablissement(e, index) }}
                                value={item.etablissementId}
                                data-tip
                                data-for={"etablissementTip"+index}>
                                <option value="-1" key="defaultetablissement"></option>
                                {etablissements.map(({ id, libelle }, index) => <option value={id} key={index} >{libelle}</option>)}
                              </select>

                              {/* msg erreur */}
                              {this.state.touched && this.state.touched['etablissement' + index] && item.etablissementId == -1  && (
                                <ReactTooltip id={"etablissementTip"+index} place="top" effect="solid">
                                  {this.validator.message('etablissement' + index, item.etablissementId, 'requiredSelect')}
                                </ReactTooltip>
                              )}
                            </div>
                            </td>
                            {/* spetialite */}
                            <td className="col-2"> <div className="form-group">
                              <select
                                className={this.state.touched && this.state.touched['spetialite' + index] && item.specialiteId == -1 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}
                                id="sel1"
                                onChange={(e) => { this.onChangeSpecialite(e, index) }}
                                value={item.specialiteId}
                                data-tip
                                data-for={"spetialiteTip"+index}>
                                <option value="-1" key="defaultspecialite"></option>
                                {specialites.map(({ id, libelle }, index) => <option value={id} key={index} >{libelle}</option>)}
                              </select>

                              {/* msg erreur */}
                              {this.state.touched && this.state.touched['spetialite' + index] && item.specialiteId == -1 && (
                                <ReactTooltip id={"spetialiteTip"+index} place="top" effect="solid">
                                  {this.validator.message('spetialite' + index, item.specialiteId, 'requiredSelect')}
                                </ReactTooltip>
                              )}
                            </div>
                            </td>
                            {/* mention */}
                            <td className="col-2"><div className="form-group">
                              <select
                                className={this.state.touched && this.state.touched['mention' + index] && item.mention == -1 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}
                                id="sel1"
                                onChange={(e) => { this.onChangeMention(e, index) }}
                                value={item.mention}
                                data-tip
                                data-for={"mentionTip"+index}
                              >
                                <option value="-1" key="defaultspecialite"></option>
                                <option value="1" key="passable">Passable</option>
                                <option value="2" key="bien">Bien</option>
                                <option value="3" key="tbien">Très bien</option>
                              </select>

                              {/* msg erreur */}
                              {this.state.touched && this.state.touched['mention' + index] && item.mention == -1  && (
                                <ReactTooltip id={"mentionTip"+index} place="top" effect="solid">
                                  {this.validator.message('mention' + index, item.mention, 'requiredSelect')}
                                </ReactTooltip>
                              )}
                            </div>
                            </td>
                            {/* pays */}
                            <td className="col-2"><div className="form-group">
                              <select
                                className={this.state.touched && this.state.touched['pays' + index] && item.paysId == -1 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}
                                id="sel1"
                                onChange={(e) => { this.onChangePays(e, index) }}
                                value={item.paysId}
                                data-tip
                                data-for={"paysTip"+index}>
                                <option value="-1" key="defaultpays"></option>
                                {pays.map(({ id, libelle }, index) => <option value={id} key={index} >{libelle}</option>)}
                              </select>

                              {/* msg erreur */}
                              {this.state.touched && this.state.touched['pays' + index] && item.paysId == -1 && (
                                <ReactTooltip id={"paysTip"+index} place="top" effect="solid">
                                  {this.validator.message('pays' + index, item.paysId, 'requiredSelect')}
                                </ReactTooltip>
                              )}
                            </div>
                            <Fab color="secondary" aria-label="delete" size="small" className={classes.fab} style={{zIndex:100}}> 
                            <DeleteIcon />
                          </Fab>
                            </td>
                          </tr>
       
                          {/* <Fab color="secondary" aria-label="delete" size="small" className={classes.fab}> 
                            <DeleteIcon />
                          </Fab> */}
                   

                      </tbody>
                      )}
                    </table>

                        <button type="button" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"   onClick={this.updateTabElements}>+Ajouter</button>
                       
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
 
  const {diplomes} = state.diplome;
  
  const {etablissements} = state.etablissement;
  const {specialites} = state.specialite;

  return { diplomes,etablissements,specialites};
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps)(Parcour));   