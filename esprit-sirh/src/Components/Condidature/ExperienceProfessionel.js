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

class ExperienceProfessionel extends Component {
  constructor(props) {

    super(props); 

    this.state = {
      loading: false,
      etablissementId:-1,
      moduleId:-1,
      posteId:-1,
      dateDebut:"",
      dateFin:"",
      items:[{dateDebut:"",dateFin: "",etablissementId:-1,posteId: -1,paysId: -1,ville:""}],    
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
      condidat:this.props.location.state.condidatFromExpEns,
      changePath:false
    };
  }
  componentDidMount() {
    let condidatFromPrecedent = null
    if(this.props.location.state.condidatBackToExpPro){
      condidatFromPrecedent = this.props.location.state.condidatBackToExpPro
    }else{
      condidatFromPrecedent = this.props.location.state.condidatFromExpEns
    }
    if (condidatFromPrecedent.condidatExperProfessionel.length > 0) {
      this.setState({
        items: condidatFromPrecedent.condidatExperProfessionel,
        condidat:condidatFromPrecedent
      });
    }else{
      this.setState({
        condidat:condidatFromPrecedent
      });
    }
  }
  
  onChangeEtablissement = (e,index) => {
    let elements=this.state.items;
    elements[index].etablissementId=e.target.value;
    this.setState({
        items: elements,
      });
  }
  
 
  onChangePoste= (e,index) =>{
    let elements=this.state.items;
    elements[index].posteId=e.target.value;
    this.setState({
        items: elements,
      });
  }
  
  onChangePays= (e,index) =>{
    let elements=this.state.items;
    elements[index].paysId=e.target.value;
    this.setState({
        items: elements,
      });
  }

  onChangeDateDeb= (e,index) =>{
    let elements=this.state.items;
    elements[index].dateDebut=e.target.value;
    this.setState({
        items: elements,
      });
  }
  onChangeDateFin= (e,index) =>{
    let elements=this.state.items;
    elements[index].dateFin=e.target.value;
    this.setState({
        items: elements,
      });
  }
  onChangeVille= (e,index) =>{
    let elements=this.state.items;
    elements[index].ville=e.target.value;
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
  updateTabElements = (e) => {
    e.preventDefault();
    let elements=this.state.items;
    elements.push({dateDebut:"",dateFin: "",etablissementId:-1,posteId: -1,paysId: -1,ville:""});
    this.setState({
        items: elements
      });
  }
  handleSubmitCondidat =(e) =>{
    e.preventDefault();
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
     
      let condidatToSave=this.state.condidat
      condidatToSave.condidatExperProfessionel=this.state.items

      this.setState({
        loading:true,
        condidat:condidatToSave,
        changePath:true
      })
      
    }
  }
 
  render() {
    // const condidatRecieved=this.props.location.state.condidat
    // console.log("condidat recived",condidatRecieved)

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
    const {items}=this.state;
    const changePath=this.state.changePath;
    const {condidat} =this.state;

    let condidatRecieved = null;
    if (this.props.location.state.condidatFromExpEns) {
      condidatRecieved = this.props.location.state.condidatFromExpEns
    } else {
      condidatRecieved = this.props.location.state.condidatBackToExpPro
    }

    if (this.state.retour) {
      condidatRecieved.condidatExperProfessionel = items;
      return <Redirect to={{
        pathname: '/expEnseignant',
        state: {
          condidatBackToEnseigant: condidatRecieved,
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
        pathname: '/competence',
        state: {
          condidatFromExpPro:condidat,
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
            <h1 className="h3 mb-0 text-gray-800">Expériences Professionelles</h1>
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
                                
                                <tr >
                                    <th >Date de début</th>
                                    <th >Date de fin</th>
                                    <th>Etablissement</th>
                                    <th >Poste</th>
                                    <th>Pays</th>
                                    <th >Ville</th>
                                </tr>
                            </thead>
                            <tbody>
                           { items.map ((item,index) => 
                                <tr key={index} >
                                    <td class=""> <div className="form-group">

                                        <Input
                                            type="date"
                                            className="form-control form-control-sm"
                                            name="telephone"
                                            value={item.dateDebut}
                                            onBlur={(e) => {this.onChangeDateDeb(e,index)}}
                                            validations={[required]}
                                        />
                                    </div></td>
                                   <td class=""> <div className="form-group">

                                       <Input
                                           type="date"
                                           className="form-control form-control-sm"
                                           name="telephone"
                                           value={item.dateFin}
                                           onBlur={(e) => { this.onChangeDateFin(e, index) }}
                                           validations={[required]}
                                       />
                                   </div></td>
                                   
                                    <td  class=""><div className="form-group">
                                        <select className="form-control form-control-sm" id="sel1" onChange={(e) => {this.onChangeEtablissement(e,index)}} value={item.etablissementId}>
                                            <option value="-1" key="defaultetablissement"></option>
                                            {etablissements.map(({ id, libelle }, index) => <option value={id} key={index} >{libelle}</option>)}
                                        </select>
                                    </div></td>

                                    <td  class=""> <div className="form-group">
                                        <select className="form-control form-control-sm" id="sel1" onChange={(e)=>{this.onChangePoste(e,index)}} value={item.posteId}>
                                            <option value="-1" key="defaultposte"></option>
                                            {postes.map(({ id, libelle }, index) => <option value={id} key={index} >{libelle}</option>)}
                                        </select>
                                    </div></td>
                                   
                                    <td  class=""><div className="form-group">
                                        <select className="form-control form-control-sm" id="sel1" onChange={(e) => {this.onChangePays(e,index)}} value={item.paysId}>
                                            <option value="-1" key="defaulpays"></option>
                                            {pays.map(({ id, libelle }, index) => <option value={id} key={index} >{libelle}</option>)}
                                        </select>
                                    </div></td>
                                    <td class=""> <div className="form-group">

                                       <Input
                                           type="text"
                                           className="form-control form-control-sm"
                                           name="ville"
                                           value={item.ville}
                                           onBlur={(e) => { this.onChangeVille(e, index) }}
                                           validations={[required]}
                                       />
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

export default connect(mapStateToProps)(ExperienceProfessionel);   