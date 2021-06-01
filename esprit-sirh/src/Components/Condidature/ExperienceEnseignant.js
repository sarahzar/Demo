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

class ExperienceEnseignant extends Component {
  constructor(props) {

    super(props);

    this.state = {
      currentUser: AuthService.getUserConneced(),
      loading: false,
      items:[{dateDebut:"",dateFin: "",etablissementId:-1,posteId: -1,moduleId: -1}],    
      etablissements:NomenclaturesService.getSavedEtablissements(),
      modules:NomenclaturesService.getSavedModules(),
      postes:NomenclaturesService.getSavedPostes(),
      retour:false,
      condidat:this.props.location.state.condidatFromParcour,
      changePath:false
    };
  }
  componentDidMount() {
    let condidatFromPrecedent = null
    if(this.props.location.state.condidatBackToEnseigant){
      condidatFromPrecedent = this.props.location.state.condidatBackToEnseigant
    }else{
      condidatFromPrecedent = this.props.location.state.condidatFromParcour
    }
    if (condidatFromPrecedent.condidatExperEnseignt.length > 0) {
      this.setState({
        items: condidatFromPrecedent.condidatExperEnseignt,
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
  
 
  onChangePoste = (e,index) => {
    let elements=this.state.items;
    elements[index].posteId=e.target.value;
    this.setState({
        items: elements,
      });
  }
  
  onChangeModule = (e,index) => {
    let elements=this.state.items;
    elements[index].moduleId=e.target.value;
    this.setState({
        items: elements,
      });
  }

  onChangeDateDeb = (e,index) => {
    let elements=this.state.items;
    elements[index].dateDebut=e.target.value;
    this.setState({
        items: elements,
      });
  }
  onChangeDateFin = (e,index) => {
    let elements=this.state.items;
    elements[index].dateFin=e.target.value;
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
    let elements=this.state.items;
    elements.push({dateDebut:"",dateFin: "",etablissementId:-1,posteId: -1,moduleId: -1});
    this.setState({
        items: elements
      });
  }
  handleSubmitCondidat = (e) =>  {
    e.preventDefault();
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      let condidatToSave=this.state.condidat
      condidatToSave.condidatExperEnseignt=this.state.items
      
      this.setState({
        loading:true,
        changePath:true,
        condidat:condidatToSave
      })
      

    }
  }
 
  render() {
   // const condidatRecieved=this.props.location.state.condidatFromParcour 
    const { loading } = this.state;
    const {etablissements} =this.state;
    const {postes} =this.state;
    const {modules} =this.state;
    const {items}=this.state;
    const {changePath}=this.state;
    const {condidat} =this.state;

    let condidatRecieved = null;
    if (this.props.location.state.condidatFromParcour) {
      condidatRecieved = this.props.location.state.condidatFromParcour
    } else {
      condidatRecieved = this.props.location.state.condidatBackToEnseigant
    }

    // récupérer le condidat au click sue précédent 
    if (this.state.retour) {
      condidatRecieved.condidatExperEnseignt = items;
      return <Redirect to={{
        pathname: '/parcour',
        state: {
          condidatBackToParcour: condidatRecieved
        }
      }} />;
    }


    if (changePath){
      return <Redirect to={{
        pathname: '/expPro',
        state: {
          condidatFromExpEns:condidat
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
            <h1 className="h3 mb-0 text-gray-800">Expérience d'enseignement</h1>
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
                                
                                <tr class="d-flex">
                                    <th class="col-2">Date de début</th>
                                    <th class="col-2">Date de fin</th>
                                    <th class="col-3">Etablissement</th>
                                    <th class="col-2">Poste</th>
                                    <th class="col-3">Module enseigné</th>
                                </tr>
                            </thead>
                            <tbody>
                           { items.map ((item,index) => 
                                <tr key={index} class="d-flex">
                                    <td class="col-2"> <div className="form-group">

                                        <Input
                                            type="date"
                                            className="form-control form-control-sm"
                                            name="telephone"
                                            value={item.dateDebut}
                                            onBlur={(e) => {this.onChangeDateDeb(e,index)}}
                                            validations={[required]}
                                        />
                                    </div></td>
                                   <td class="col-2"> <div className="form-group">

                                       <Input
                                           type="date"
                                           className="form-control form-control-sm"
                                           name="telephone"
                                           value={item.dateFin}
                                           onBlur={(e) => { this.onChangeDateFin(e, index) }}
                                           validations={[required]}
                                       />
                                   </div></td>
                                   
                                    <td  class="col-3"><div className="form-group">
                                        <select className="form-control form-control-sm" id="sel1" onChange={(e) => {this.onChangeEtablissement(e,index)}} value={item.etablissementId}>
                                            <option value="-1" key="defaultetablissement"></option>
                                            {etablissements.map(({ id, libelle }, index) => <option value={id} key={index} >{libelle}</option>)}
                                        </select>
                                    </div></td>

                                    <td  class="col-2"> <div className="form-group">
                                        <select className="form-control form-control-sm" id="sel1" onChange={(e)=>{this.onChangePoste(e,index)}} value={item.posteId}>
                                            <option value="-1" key="defaultposte"></option>
                                            {postes.map(({ id, libelle }, index) => <option value={id} key={index} >{libelle}</option>)}
                                        </select>
                                    </div></td>
                                   
                                    <td  class="col-3"><div className="form-group">
                                        <select className="form-control form-control-sm" id="sel1" onChange={(e) => {this.onChangeModule(e,index)}} value={item.moduleId}>
                                            <option value="-1" key="defaultmodule"></option>
                                            {modules.map(({ id, libelle }, index) => <option value={id} key={index} >{libelle}</option>)}
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

export default connect(mapStateToProps)(ExperienceEnseignant);   