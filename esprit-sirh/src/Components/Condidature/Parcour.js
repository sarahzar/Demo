import React, { Component } from "react";
import { connect, Provider } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../services/Authentification/AuthService";
import CondidatService from "../../services/Condidature/CondidatService";
import UserService from "../../services/Authentification/UserService";
import NomenclaturesService from  "../../services/Shared/NomenclaturesService";
import Leftside from "../../Layout/Leftside"
import Header from "../../Layout/Header"
import { Link,Redirect } from "react-router-dom";


const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class Parcour extends Component {
  constructor(props) {

    super(props);
      
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
    let elements=this.state.items;
    elements[index].specialiteId=e.target.value;
    this.setState({
        items: elements,
      });
  }
  onChangeEtablissement = (e,index) =>{
    let elements=this.state.items;
    elements[index].etablissementId=e.target.value;
    this.setState({
        items: elements,
      });
  }
  
  onChangeAnneeObtention = (e,index) =>{
    let elements=this.state.items;
    elements[index].anneeObtention=Number(e.target.value);
    this.setState({
        items: elements,
      });
  }
  onChangeDiplome = (e,index) =>{
    let elements=this.state.items;
    elements[index].diplomeId=e.target.value;
    this.setState({
        items: elements,
      });
  }

  onChangeMention = (e,index) =>{
    let elements=this.state.items;
    elements[index].mention=e.target.value;
    this.setState({
        items: elements,
      });
  }
  onChangePays = (e,index) =>{
    let elements=this.state.items;
    elements[index].paysId=e.target.value;
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
  updateTabElements = (e) =>{
    e.preventDefault();
    // let updatedIndex= this.state.index;
    let elements=this.state.items;
    // updatedIndex++;
    elements.push({anneeObtention:"",diplomeId: -1,etablissementId:-1,specialiteId: -1,mention: -1,paysId: -1});
    this.setState({
        // index: updatedIndex,
        items: elements
      });
  }
  handleSubmitCondidat =(e) => {
    e.preventDefault();
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
     
      let condidatToSave=this.state.condidat
      condidatToSave.listeParcours=this.state.items
      this.setState({
        loading:true,
        changePath:true,
        condidat:condidatToSave
      })
      
    }
  }
 
  render() {

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
                                    <th className="col-1">Année</th>
                                    <th className="col-2">Nom du diplôme</th>
                                    <th className="col-3">Etablissement</th>
                                    <th className="col-2">Spécialité</th>
                                    <th className="col-2">Mention</th>
                                    <th className="col-2">Pays</th>
                                </tr>
                            </thead>
                            <tbody>
                           { items.map ((item,index) => 
                                <tr key={index} className="d-flex">
                                    <td className="col-1"> <div className="form-group">

                                        <Input
                                            type="text"
                                            className="form-control form-control-sm"
                                            name="telephone"
                                            value={item.anneeObtention}
                                            onBlur={(e) => {this.onChangeAnneeObtention(e,index)}}
                                            validations={[required]}
                                        />
                                    </div></td>
                                    <td  className="col-2">
                                        <div className="form-group">
                                            <select className="form-control form-control-sm" id="sel1" onChange={(e) => {this.onChangeDiplome(e,index)}} value={item.diplomeId}>
                                                <option value="-1" key="defaultdiplome"></option>
                                                {diplomes.map(({ id, libelle }, index) => <option value={id} key={index} >{libelle}</option>)}
                                            </select>
                                        </div>
                                    </td>
                                    <td  className="col-3"><div className="form-group">
                                        <select className="form-control form-control-sm" id="sel1" onChange={(e) => {this.onChangeEtablissement(e,index)}} value={item.etablissementId}>
                                            <option value="-1" key="defaultetablissement"></option>
                                            {etablissements.map(({ id, libelle }, index) => <option value={id} key={index} >{libelle}</option>)}
                                        </select>
                                    </div></td>
                                    <td  className="col-2"> <div className="form-group">
                                        <select className="form-control form-control-sm" id="sel1" onChange={(e)=>{this.onChangeSpecialite(e,index)}}  value={item.specialiteId}>
                                            <option value="-1" key="defaultspecialite"></option>
                                            {specialites.map(({ id, libelle }, index) => <option value={id} key={index} >{libelle}</option>)}
                                        </select>
                                    </div></td>
                                    <td className="col-2"><div className="form-group">
                                        <select className="form-control form-control-sm" id="sel1" onChange={(e) => {this.onChangeMention(e,index)}} value={item.mention}>
                                            <option value="-1" key="defaultspecialite"></option>
                                            <option value="1" key="passable">Passable</option>
                                            <option value="2" key="bien">Bien</option>
                                            <option value="3" key="tbien">Très bien</option>
                                        </select>
                                    </div></td>
                                    <td  className="col-2"><div className="form-group">
                                        <select className="form-control form-control-sm" id="sel1" onChange={(e) => {this.onChangePays(e,index)}} value={item.paysId}>
                                            <option value="-1" key="defaultpays"></option>
                                            {pays.map(({ id, libelle }, index) => <option value={id} key={index} >{libelle}</option>)}
                                        </select>
                                    </div></td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                        <button type="button" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" onClick={this.updateTabElements}>+Ajouter</button>
            
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

export default connect(mapStateToProps)(Parcour);   