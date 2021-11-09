
import React, { Component } from "react";
import { DateValidators } from "../Validators/DateValidators"
import { RejexValidators } from "../Validators/RejexValidators"
import InfoPersonelleLecture from "./InfoPersonelleLecture";

class InfoPersonelles extends React.Component {

  constructor(props){
    super(props)
  }
  
  render() {

    return (
      <div>

      {(this.props.condidatReducer && !this.props.condidatReducer.aConfirmer &&

      <div>
        <div className="card border-left-danger shadow h-40 col-5 div-info div-info-height-lg">
          <div className="card-body">

            {/* nom */}
            <div>
            <label className="small font-weight-bold control-label">Nom </label>
              <div className="form-group">
               
                <input
                  type="text"
                  name="nom"
                  value={this.props.infoPersonelle.nom}
                  onChange={this.props.modfierNom}
                  onBlur={() => {this.props.validator.showMessageFor('nom')/*;this.forceUpdate()*/}}
                  className={this.props.touched && this.props.touched['nom'] && (!this.props.infoPersonelle.nom || !RejexValidators.alpha(this.props.infoPersonelle.nom)) ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}
                />
                {/* msg erreur*/}
                {this.props.touched && this.props.touched['nom']  && this.props.validator.message('nom', this.props.infoPersonelle.nom, 'required|alpha_space', { className: 'text-danger' })}
              </div>
            </div>

            {/* prenom*/}
            <div>
              <div className="form-group">
                <label className="small font-weight-bold control-label">Prenom </label>
                <input
                  type="text"
                  className={this.props.touched && this.props.touched['prenom'] && (!this.props.infoPersonelle.prenom || !RejexValidators.alpha(this.props.infoPersonelle.prenom)) ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}
                  name="prenom"
                  value={this.props.infoPersonelle.prenom}
                  onChange={this.props.modifPrenom}
                  onBlur={() => this.props.validator.showMessageFor('prenom')}
                />
                {/* msg erreur*/}
                {this.props.touched && this.props.touched['prenom']  && this.props.validator.message('prenom', this.props.infoPersonelle.prenom, 'required|alpha_space', { className: 'text-danger' })}
              </div>
            </div>
            {/* cin*/}
            <div>
              <div className="form-group">
                <label className="small font-weight-bold control-label">CIN </label>
                <input
                  type="text"
                  className={this.props.touched && this.props.touched['cin'] && (!this.props.infoPersonelle.cin || isNaN(this.props.infoPersonelle.cin) || this.props.infoPersonelle.cin.length > 8) ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}
                  name="cin"
                  value={this.props.infoPersonelle.cin}
                  onChange={this.props.modifCin}
                  onBlur={() => this.props.validator.showMessageFor('cin')}
                />
                {/* msg erreur*/}
                {this.props.touched && this.props.touched['cin']  && this.props.validator.message('cin', this.props.infoPersonelle.cin, 'required|numeric|min:0,num|size:8', { className: 'text-danger' })}
              </div>
            </div>
            {/* date naissance*/}
            <div className="col-md-6 pl-0">
              <div className="form-group mb-0">
                <label className="small font-weight-bold control-label">Date de naissance </label>
                <input
                  type="date"
                  className={this.props.touched && this.props.touched['datenaiss'] &&
                   (!this.props.infoPersonelle.dateNaissance || 
                    DateValidators.isAfterToday(this.props.infoPersonelle.dateNaissance) ||
                     DateValidators.isSameToday(this.props.infoPersonelle.dateNaissance)) ? "form-control form-control-sm invalide-field" : "form-control form-control-sm"}
                  name="dateNaissance"
                  value={this.props.infoPersonelle.dateNaissance}
                  onChange={this.props.modifDateNaissance}
                  onBlur={() => this.props.validator.showMessageFor('dateNaissance')}
                />

              </div>
            </div>
            {/* msg erreur*/}
            <div className="col-md-12 pl-0">
              {this.props.touched && this.props.touched['datenaiss']  &&  this.props.validator.message('dateNaissance', this.props.infoPersonelle.dateNaissance, 'required|dateAfterToday', { className: 'text-danger' })}
            </div>
          </div>
        </div>



        <div className="card border-left-danger shadow h-40 col-5 div-info-height-lg">
          <div className="card-body">

            {/* sexe*/}
            <label className="small font-weight-bold control-label">Sexe </label>
            <div class="form-group">
              <div className="row">
                <div className="col-sm-8">
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="sexe"
                      value={this.props.infoPersonelle.sexe}
                      checked={this.props.infoPersonelle.sexe === "homme"}
                      onChange={this.props.modifSexeHomme}
                      onBlur={() => this.props.validator.showMessageFor('sexe')}
                    /> <label className="form-check-label">
                      Homme
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="sexe"
                      value={this.props.infoPersonelle.sexe}
                      checked={this.props.infoPersonelle.sexe === "femme"}
                      onChange={this.props.modifSexeFemme}
                      onBlur={() => this.props.validator.showMessageFor('sexe')}
                    />
                    <label className="form-check-label">
                      Femme
                    </label>
                  </div>
                  { this.props.touched && this.props.touched['sexe']  && this.props.validator.message('sexe', this.props.infoPersonelle.sexe, 'required', { className: 'text-danger' })}
                </div>
                {/* msg erreur*/}

              </div>
            </div>
            {/* ETAT CIVIL */}
            <div>
              <div className="form-group">
                <label className="small font-weight-bold control-label">Etat civile </label>
                <select 
                className={this.props.touched && this.props.touched['etatCivil'] && this.props.infoPersonelle.etatCivil.id == -1 ? "form-control form-control-sm invalide-field" : "form-control form-control-sm"}
                  id="sel1" 
                  onChange={this.props.modifEtatCivil} 
                  value={this.props.infoPersonelle.etatCivil.id} 
                  onBlur={() => this.props.validator.showMessageFor('Etat civile')}>
                  <option value="-1" key="defaultetat"></option>
                  {this.props.etats.map(({ id, libelle }, index) => <option value={id} key={index} >{libelle}</option>)}
                </select>
                {/* msg erreur */}
                {this.props.touched && this.props.touched['etatCivil']  && this.props.validator.message('Etat civile', this.props.infoPersonelle.etatCivil.id, 'requiredSelect:Etat civile', { className: 'text-danger' })}

              </div>
            </div>
            {/* Téléphone */}
            <div>
              <div className="form-group">
                <label className="small font-weight-bold control-label">Téléphone </label>
                <input
                  type="text"
                  className={this.props.touched && this.props.touched['tel'] && (!this.props.infoPersonelle.telephone || !RejexValidators.telRejex(this.props.infoPersonelle.telephone)) ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}
                  name="telephone"
                  value={this.props.infoPersonelle.telephone}
                  onChange={this.props.modifTel}
                  onBlur={() => this.props.validator.showMessageFor('téléphone')}
                  placeholder='exemple: 50515253/+21650515253'
                />
                {/* msg erreur */}
                {this.props.touched && this.props.touched['tel']  && this.props.validator.message('téléphone', this.props.infoPersonelle.telephone, 'required|telephone', { className: 'text-danger' })}

              </div>
            </div>


            <div>
              <div className="form-group">
                <label className="small font-weight-bold control-label">Adresse  </label>
                <input
                  type="text"
                  className={this.props.touched && this.props.touched['adresse'] && (!this.props.infoPersonelle.adresse) ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}
                  name="adresse"
                value={this.props.infoPersonelle.adresse}
                onChange={this.props.modifAdresse}
                onBlur={() => this.props.validator.showMessageFor('adresse')}
                />
                  {/* msg erreur */}
                  {this.props.touched && this.props.touched['adresse']  && this.props.validator.message('Adresse', this.props.infoPersonelle.adresse, 'required', { className: 'text-danger' })}

              </div>
            </div>

          </div>
        </div>

      </div>
      )}
      
  {(this.props.condidatReducer && this.props.condidatReducer.aConfirmer &&

   <InfoPersonelleLecture
     infoPersonelle={this.props.infoPersonelle}
   />

  )}

      </div>

    );
  }

}

export default InfoPersonelles;
