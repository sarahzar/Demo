
import React, { Component } from "react";
import { DateValidators } from "../Validators/DateValidators"
import { RejexValidators } from "../Validators/RejexValidators"

class InfoPersonelleLecture extends React.Component {

  constructor(props){
    super(props)
  }
  
  render() {
   
    return (

      <div class="height-main-container">
        <div className="card border-left-danger shadow col-5 div-info height-info-container ">
          <div className="card-body">

            {/* nom */}
           
              <div class="form-group form-inline">
                <label className="small font-weight-bold text-left justify-content-start">Nom: </label>
                <div class="col-4"> {this.props.infoPersonelle.nom} </div>
              </div>
           

            {/* prenom*/}
          
          
              <div class="form-group form-inline">
                <label className="small font-weight-bold text-left justify-content-start">Prenom: </label>
                <div class="col-4"> {this.props.infoPersonelle.prenom} </div>
              </div>
          
            
            {/* cin*/}
           
              <div class="form-group form-inline">
                <label className="small font-weight-bold text-left justify-content-start">CIN: </label>
                <div class="col-4"> {this.props.infoPersonelle.cin} </div>
              </div>
            

            {/* date naissance*/}
           
              <div class="form-group form-inline">
                <label className="small font-weight-bold text-left justify-content-start">Date de naissance: </label>
                <div class="col-4"> {this.props.infoPersonelle.dateNaissance} </div>
              </div>
           
          
          </div>
        </div>
       

     


        <div className="card border-left-danger shadow col-5 height-info-container  ">
          <div className="card-body">

            {/* sexe*/}      
           
              <div class="form-group form-inline">
                <label className="small font-weight-bold text-left justify-content-start">Sexe: </label>
                <div class="col-4"> {this.props.infoPersonelle.sexe} </div>
              </div>
           
            {/* ETAT CIVIL */}       

            <div class="form-group form-inline">
                <label className="small font-weight-bold text-left justify-content-start">Etat civile: </label>
                <div class="col-4"> {this.props.infoPersonelle.etatCivil.libelle} </div>
              </div>
            
            {/* Téléphone */}
          

            <div class="form-group form-inline">
                <label className="small font-weight-bold text-left justify-content-start">Téléphone: </label>
                <div class="col-4"> {this.props.infoPersonelle.telephone} </div>
              </div>


              <div class="form-group form-inline">
                <label className="small font-weight-bold text-left justify-content-start">Adresse: </label>
                <div class="col-4">  {this.props.infoPersonelle.adresse} </div>
              </div>


          </div>
        </div>

      </div>


    );
  }

}

export default InfoPersonelleLecture;
