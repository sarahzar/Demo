
import React, { Component } from "react";
import NiveauAcademiqueLecture from "./NiveauAcademiqueLecture";

class NiveauAcademique extends React.Component {

  render() {
    return (

      <div>
        {(this.props.condidatReducer && !this.props.condidatReducer.aConfirmer &&
          <div className="card border-left-danger shadow h-40 col-5 mt-4 div-info div-info-height-lg">
            <div className="card-body">
              {/* Dernier diplôme */}
              <div>
                <div className="form-group">
                  <label className="small font-weight-bold control-label">Dernier diplôme </label>
                  <select
                    className={this.props.touched && this.props.touched['diplome'] && this.props.niveau.diplome.id == -1 ? "form-control form-control-sm invalide-field" : "form-control form-control-sm"}
                    id="sel1"
                    onChange={this.props.modifDiplome} value={this.props.niveau.diplome.id}
                    onBlur={() => this.props.validator.showMessageFor('Dernier diplôme')}>
                    <option value="-1" key="defaultdiplome"></option>
                    {this.props.diplomes.map(({ id, libelle }, index) => <option value={id} key={index} >{libelle}</option>)}
                  </select>
                  {/* msg erreur */}
                  {this.props.touched && this.props.touched['diplome'] && this.props.validator.message('Dernier diplôme', this.props.niveau.diplome.id, 'requiredSelect:Dernier diplôme', { className: 'text-danger' })}

                </div>
              </div>
              {/* Spétialité*/}
              <div>
                <div className="form-group">
                  <label className="small font-weight-bold control-label">Spétialité </label>
                  <select
                    className={this.props.touched && this.props.touched['specialite'] && this.props.niveau.specialite.id == -1 ? "form-control form-control-sm invalide-field" : "form-control form-control-sm"}
                    id="sel1"
                    onChange={this.props.modifSpecialite} value={this.props.niveau.specialite.id}
                    onBlur={() => this.props.validator.showMessageFor('Spétialité')}>
                    <option value="-1" key="defaultspecialite"></option>
                    {this.props.specialites.map(({ id, libelle }, index) => <option value={id} key={index} >{libelle}</option>)}
                  </select>
                  {/* msg erreur */}
                  {this.props.touched && this.props.touched['specialite'] && this.props.validator.message('Spétialité', this.props.niveau.specialite.id, 'requiredSelect:Spétialité', { className: 'text-danger' })}

                </div>
              </div>
              {/* Année d'obtention */}
              <div>
                <div className="form-group">
                  <label className="small font-weight-bold control-label">Année d'obtention </label>
                  <input
                    type="text"
                    className={this.props.touched && this.props.touched['anneObt'] && (!this.props.niveau.anneeObtention || isNaN(this.props.niveau.anneeObtention) || this.props.niveau.anneeObtention > new Date().getFullYear()) ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}
                    name="telephone"
                    value={this.props.niveau.anneeObtention}
                    onChange={this.props.modifAnneObtension}
                    onBlur={() => this.props.validator.showMessageFor('Année d obtention')}
                  />
                  {/* msg erreur */}
                  {this.props.touched && this.props.touched['anneObt'] && this.props.validator.message('Année d obtention', this.props.niveau.anneeObtention, 'required|numeric|afterCurrentYear', { className: 'text-danger' })}

                </div>
              </div>
              {/* Etablissement */}
              <div>
                <div className="form-group">
                  <label className="small font-weight-bold control-label">Etablissement </label>
                  <select
                    className={this.props.touched && this.props.touched['etablissement'] && this.props.niveau.etablissement.id == -1 ? "form-control form-control-sm invalide-field" : "form-control form-control-sm"}
                    id="sel1" onChange={this.props.modifEtablissement} value={this.props.niveau.etablissement.id}
                    onBlur={() => this.props.validator.showMessageFor('Etablissement')}>
                    <option value="-1" key="defaultetablissement"></option>
                    {this.props.etablissements.map(({ id, libelle }, index) => <option value={id} key={index} >{libelle}</option>)}
                  </select>
                  {/* msg erreur */}
                  {this.props.touched && this.props.touched['etablissement'] && this.props.validator.message('Etablissement', this.props.niveau.etablissement.id, 'requiredSelect:Etablissement', { className: 'text-danger' })}

                </div>
              </div>


            </div>
          </div>
        )}
        {(this.props.condidatReducer && this.props.condidatReducer.aConfirmer &&
          <NiveauAcademiqueLecture niveau={this.props.niveau} />
        )}
      </div>
    );
  }

}

export default NiveauAcademique;