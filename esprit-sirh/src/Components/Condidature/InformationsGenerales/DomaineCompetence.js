import React, { Component } from "react";
import DomaineCompetenceLecture from "./DomaineCompetenceLecture";


class DomaineCompetence extends React.Component {

  render() {

    return (

      <div>

      {(this.props.condidatReducer && !this.props.condidatReducer.aConfirmer &&

      <div className="card border-left-danger shadow h-40 col-5 mt-4 div-info-height-lg">
        <div className="card-body">


          {/* Poste actuel */}
          <div>
            <div className="form-group">
              <label className="small font-weight-bold control-label">Poste Actuel </label>
              <select className="form-control form-control-sm"
                id="sel1" onChange={this.props.modifPoste} value={this.props.domaine.posteActuel.id}>
                <option value="-1" key="defaulposte"></option>
                {this.props.postes.map(({ id, libelle }, index) => <option value={id} key={index} >{libelle}</option>)}
              </select>
            </div>
          </div>
          {/* domaine compétence */}
          <div>
            <div className="form-group">
              <label className="small font-weight-bold control-label">Domaine de compétence </label>
              <select className={this.props.touched && this.props.touched['domaine'] && this.props.domaine.domaine.id == -1 ? "form-control form-control-sm invalide-field" : "form-control form-control-sm"}
                id="sel1" onChange={this.props.modifDomaine} value={this.props.domaine.domaine.id}
                onBlur={() => this.props.validator.showMessageFor('Domaine de compétence')}>
                <option value="-1" key="defauldomaine"></option>
                {this.props.domaines.map(({ id, libelle }, index) => <option value={id} key={index} >{libelle}</option>)}
              </select>
              {/* msg erreur */}
              {this.props.touched && this.props.touched['domaine']  && this.props.validator.message('Domaine de compétence', this.props.domaine.domaine.id, 'requiredSelect:Domaine de compétence', { className: 'text-danger' })}

            </div>
          </div>
          {/* Type de condidature */}
          <div>
            <div className="form-group">
              <label className="small font-weight-bold control-label">Type de condidature </label>
              <select className={this.props.touched && this.props.touched['typeCondidat'] && this.props.domaine.typeCondidature.id == -1 ? "form-control form-control-sm invalide-field" : "form-control form-control-sm"}
                id="sel1" onChange={this.props.modifTypeCondidature} value={this.props.domaine.typeCondidature.id}
                onBlur={() => this.props.validator.showMessageFor('Type de condidature')}>
                <option value="-1" key="defaultype"></option>
                {this.props.types.map(({ id, libelle }, index) => <option value={id} key={id} >{libelle}</option>)}
              </select>
              {/* msg erreur */}
              {this.props.touched && this.props.touched['typeCondidat']  && this.props.validator.message('Type de condidature', this.props.domaine.typeCondidature.id, 'requiredSelect:Type de condidature', { className: 'text-danger' })}

            </div>
          </div>

        </div>
      </div>
  )}
   {(this.props.condidatReducer && this.props.condidatReducer.aConfirmer &&

   <DomaineCompetenceLecture domaine={this.props.domaine} />

   )}

</div>
    );

  }
}

export default DomaineCompetence;