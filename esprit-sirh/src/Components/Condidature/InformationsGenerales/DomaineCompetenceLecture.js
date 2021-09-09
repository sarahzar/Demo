import React, { Component } from "react";


class DomaineCompetenceLecture extends React.Component {

  render() {

    return (

      <div className="card border-left-danger shadow h-40 col-5 mt-4  height-info-container ">
        <div className="card-body">


          {/* Poste actuel */}
       

          <div class="form-group form-inline">
                <label className="small font-weight-bold text-left justify-content-start">Poste Actuel: </label>
                <div class="col-8"> {this.props.domaine.posteActuel.libelle} </div>
              </div>
          {/* domaine compétence */}
         
          <div class="form-group form-inline">
                <label className="small font-weight-bold text-left justify-content-start">Domaine de compétence: </label>
                <div class="col-6"> {this.props.domaine.domaine.libelle} </div>
              </div>
          {/* Type de condidature */}
        
          <div class="form-group form-inline">
                <label className="small font-weight-bold text-left justify-content-start">Type de condidature: </label>
                <div class="col-4"> {this.props.domaine.typeCondidature.libelle} </div>
              </div>

        </div>
      </div>

    );

  }
}

export default DomaineCompetenceLecture;