
import React, { Component } from "react";
import Input from "react-validation/build/input";
class InfoPersonelles extends React.Component{

    render(){

        return(
  
 <div>
  <div className="card border-left-danger shadow h-40 py-2 col-5 div-info div-info-height-lg">
      <div className="card-body">
        <h4 className="small font-weight-bold">Nom </h4>
        <div>
          <div className="form-group">

            <Input
              type="text"
              className="form-control form-control-sm"
              name="nom"
              value={this.props.infoPersonelle.nom}
              onChange={this.props.modfierNom}
              validations={[this.props.required]}
            />
          </div>
        </div>
        <h4 className="small font-weight-bold">Prenom </h4>
        <div>
          <div className="form-group">

            <Input
              type="text"
              className="form-control form-control-sm"
              name="prenom"
              value={this.props.infoPersonelle.prenom}
              onChange={this.props.modifPrenom}
              validations={[this.props.required]}
            />
          </div>
        </div>
        <h4 className="small font-weight-bold">CIN</h4>
        <div>
          <div className="form-group">

            <Input
              type="text"
              className="form-control form-control-sm"
              name="cin"
              value={this.props.infoPersonelle.cin}
              onChange={this.props.modifCin}
              validations={[this.props.required]}
            />
          </div>
        </div>
        <h4 className="small font-weight-bold">Date de naissance</h4>
        <div className="col-md-6 pl-0">
          <div className="form-group">

            <Input
              type="date"
              className="form-control form-control-sm"
              name="dateNaissance"
              value={this.props.infoPersonelle.dateNaissance}
              onChange={this.props.modifDateNaissance}
              validations={[this.props.required]}
            />
          </div>
        </div>
      

      </div>
    </div>
   

  
   <div className="card border-left-danger shadow h-40 py-2 col-5 div-info-height-lg">
     <div className="card-body">


       <h4 className="small font-weight-bold">Sexe</h4>
       <div>
         <div className="row">
           <div className="col-sm-5">
             <div className="form-check">
               <Input
                 type="radio"
                 className="form-check-input"
                 name="sexe"
                 value={this.props.infoPersonelle.sexe}
                 checked={this.props.infoPersonelle.sexe === "homme"}
                 onChange={this.props.modifSexeHomme}
                 validations={[this.props.required]}
               /> <label className="form-check-label">
                 Homme
             </label>
             </div>

             <div className="form-check">
               <Input
                 type="radio"
                 className="form-check-input"
                 name="sexe"
                 value={this.props.infoPersonelle.sexe}
                 checked={this.props.infoPersonelle.sexe === "femme"}
                 onChange={this.props.modifSexeFemme}
                 validations={[this.props.required]}
               />
               <label className="form-check-label">
                 Femme
              </label>
             </div>
           </div>
         </div>
       </div>

       <h4 className="small font-weight-bold">Etat civile</h4>
       <div>
         <div className="form-group">
           <select className="form-control form-control-sm" id="sel1" onChange={this.props.modifEtatCivil} value={this.props.infoPersonelle.etatCivilId}>
             <option value="-1" key="defaultetat"></option>
             {this.props.etats.map(({ id, libelle }, index) => <option value={id} key={index} >{libelle}</option>)}
           </select>
       </div>
       </div>
       <h4 className="small font-weight-bold">Téléphone </h4>
       <div>
         <div className="form-group">

           <Input
             type="text"
             className="form-control form-control-sm"
             name="telephone"
             value={this.props.infoPersonelle.telephone}
             onChange={this.props.modifTel}
             validations={[this.props.required]}
           />
         </div>
       </div>
       {/* <h4 className="small font-weight-bold">Adresse mail </h4>
       <div>
         <div className="form-group">

           <Input
             type="text"
             className="form-control form-control-sm"
             name="telephone"
             // value={this.props.infoPersonelle.telephone}
             // onChange={this.onChangeTelephone}
             // validations={[required]}
           />
         </div>
       </div> */}
       <h4 className="small font-weight-bold">Adresse </h4>
       <div>
         <div className="form-group">

           <Input
             type="text"
             className="form-control form-control-sm"
             name="nom"
             // value={this.props.infoPersonelle.nom}
             // onChange={this.onChangeNom}
             // validations={[required]}
           />
         </div>
       </div>

     </div>
   </div>

   </div>


        );
}

}

export default InfoPersonelles;