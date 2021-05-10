import React, { Component } from "react";
import Input from "react-validation/build/input";

class DomaineCompetence extends React.Component{

render(){

    return(

<div className="card border-left-danger shadow h-40 py-2 col-5 mt-4 div-info-height-md">
<div className="card-body">



  <h4 className="small font-weight-bold">Poste Actuel</h4>
  <div>
    <div className="form-group">
      <select className="form-control form-control-sm" id="sel1" onChange={this.props.modifPoste}  value={this.props.domaine.posteActuelId}>
      <option value="-1" key="defaulposte"></option>
      {this.props.postes.map(({ id, libelle }, index) => <option value={id} key={index} >{libelle}</option>)}
      </select>
  </div>
  </div>
  <h4 className="small font-weight-bold">Domaine de compétence </h4>
  <div>
    <div className="form-group ">
      <select className="form-control form-control-sm" id="sel1" onChange={this.props.modifDomaine}  value={this.props.domaine.domaineId}>
      <option value="-1" key="defauldomaine"></option>
      {this.props.domaines.map(({ id, libelle }, index) => <option value={id} key={index} >{libelle}</option>)}
      </select>
  </div>
  </div>
  <h4 className="small font-weight-bold">Type de condidature </h4>
  <div>
    <div className="form-group ">
      <select className="form-control form-control-sm" id="sel1" onChange={this.props.modifTypeCondidature}  value={this.props.domaine.typeCondidatureId}>
      <option value="-1" key="defaultype"></option>
      {this.props.types.map(({ id, libelle }, index) => <option value={id} key={id} >{libelle}</option>)}
      </select>
  </div>
  </div>

</div>
</div>

);

}
}

export default DomaineCompetence;