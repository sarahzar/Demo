
import React, { Component } from "react";
import Input from "react-validation/build/input";
class NiveauAcademique extends React.Component{

    render(){
        return(


<div className="card border-left-danger shadow h-40 py-2 col-5 mt-4 div-info">
  <div className="card-body">

  <h4 className="small font-weight-bold">Dernier diplôme</h4>
    <div>
      <div className="form-group">
        <select className="form-control form-control-sm" id="sel1" onChange={this.props.modifDiplome}  value={this.props.niveau.dernierDiplomeId}>
        <option value="-1" key="defaultdiplome"></option>
        {this.props.diplomes.map(({ id, libelle }, index) => <option value={id} key={index} >{libelle}</option>)}
        </select>
    </div>
    </div>
    <h4 className="small font-weight-bold">Spétialité</h4>
    <div>
      <div className="form-group">
        <select className="form-control form-control-sm" id="sel1" onChange={this.props.modifSpecialite}  value={this.props.niveau.specialiteId}>
        <option value="-1" key="defaultspecialite"></option>
        {this.props.specialites.map(({ id, libelle }, index) => <option value={id} key={index} >{libelle}</option>)}
        </select>
    </div>
    </div>
    <h4 className="small font-weight-bold">Année d'obtention </h4>
    <div>
      <div className="form-group">

        <Input
          type="text"
          className="form-control form-control-sm"
          name="telephone"
          value={this.props.niveau.anneeObtention}
          onChange={this.props.modifAnneObtension}
          validations={[this.props.required]}
        />
      </div>
    </div>
     
    <h4 className="small font-weight-bold">Etablissement </h4>
    <div>
      <div className="form-group">
        <select className="form-control form-control-sm" id="sel1" onChange={this.props.modifEtablissement}  value={this.props.niveau.etablissementId}>
        <option value="-1" key="defaultetablissement"></option>
        {this.props.etablissements.map(({ id, libelle }, index) => <option value={id} key={index} >{libelle}</option>)}
        </select>
    </div>
    </div>


  </div>
</div>

        );
    }

}

export default NiveauAcademique;