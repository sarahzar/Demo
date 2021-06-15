import React, { Component } from "react";
import Input from "react-validation/build/input";

class DomaineCompetence extends React.Component{

render(){

    return(

<div className="card border-left-danger shadow h-40 col-5 mt-4 div-info-height-lg">
<div className="card-body">


 {/* Poste actuel */}
          <div>
            <div className="form-group">
            <label className="small font-weight-bold control-label">Poste Actuel </label>    
              <select className={this.props.touched  && this.props.touched['poste'] && this.props.domaine.posteActuelId == -1 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}
                id="sel1" onChange={this.props.modifPoste} value={this.props.domaine.posteActuelId}
                onBlur={() => this.props.validator.showMessageFor('Poste Actuel')}>
                <option value="-1" key="defaulposte"></option>
                {this.props.postes.map(({ id, libelle }, index) => <option value={id} key={index} >{libelle}</option>)}
              </select>
              {/* msg erreur */}
              {this.props.validator.message('Poste Actuel', this.props.domaine.posteActuelId, 'requiredSelect', { className: 'text-danger' })}
            </div>
          </div>
   {/* domaine compétence */}
          <div>
            <div className="form-group">
            <label className="small font-weight-bold control-label">Domaine de compétence </label>  
              <select className={this.props.touched  && this.props.touched['domaine'] && this.props.domaine.domaineId == -1 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}
                id="sel1" onChange={this.props.modifDomaine} value={this.props.domaine.domaineId}
                onBlur={() => this.props.validator.showMessageFor('Domaine de compétence')}>
                <option value="-1" key="defauldomaine"></option>
                {this.props.domaines.map(({ id, libelle }, index) => <option value={id} key={index} >{libelle}</option>)}
              </select>
              {/* msg erreur */}
              {this.props.validator.message('Domaine de compétence', this.props.domaine.domaineId, 'requiredSelect', { className: 'text-danger' })}

            </div>
          </div>
   {/* Type de condidature */}
          <div>
            <div className="form-group">
            <label className="small font-weight-bold control-label">Type de condidature </label>  
              <select className={this.props.touched  && this.props.touched['typeCondidat'] && this.props.domaine.typeCondidatureId == -1 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}
                id="sel1" onChange={this.props.modifTypeCondidature} value={this.props.domaine.typeCondidatureId}
                onBlur={() => this.props.validator.showMessageFor('Type de condidature')}>
                <option value="-1" key="defaultype"></option>
                {this.props.types.map(({ id, libelle }, index) => <option value={id} key={id} >{libelle}</option>)}
              </select>
              {/* msg erreur */}
              {this.props.validator.message('Type de condidature', this.props.domaine.typeCondidatureId, 'requiredSelect', { className: 'text-danger' })}

            </div>
          </div>

</div>
</div>

);

}
}

export default DomaineCompetence;