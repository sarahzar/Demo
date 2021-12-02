
import React, { Component } from "react";

class NiveauAcademiqueLecture extends React.Component {

  render() {
    return (


      <div className="card border-left-danger shadow col-5 mt-4 div-info height-info-container ">
        <div className="card-body">
          {/* Dernier diplôme */}

          <div class="form-group form-inline">
            <label className="small font-weight-bold text-left justify-content-start">Dernier diplôme: </label>
            <div class="col-4"> {this.props.niveau.diplome.libelle} </div>
          </div>
          {/* Spétialité*/}

          <div class="form-group form-inline">
            <label className="small font-weight-bold text-left justify-content-start">Spétialité: </label>
            <div class="col-4"> {this.props.niveau.specialite.libelle} </div>
          </div>
          {/* Année d'obtention */}

          <div class="form-group form-inline">
            <label className="small font-weight-bold text-left justify-content-start">Année d'obtention: </label>
            <div class="col-4"> {this.props.niveau.anneeObtention} </div>
          </div>
          {/* Etablissement */}

          <div class="form-group form-inline">
            <label className="small font-weight-bold text-left justify-content-start">Etablissement: </label>
            <div class="col-4"> {this.props.niveau.etablissement.libelle} </div>
          </div>

        </div>
      </div>

    );
  }

}

export default NiveauAcademiqueLecture;