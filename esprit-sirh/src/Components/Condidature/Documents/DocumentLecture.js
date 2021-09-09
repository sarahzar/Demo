import React, { Component } from "react";
import AuthService from "../../../services/Authentification/AuthService";
import CondidatService from "../../../services/Condidature/CondidatService";
class DocumentLecture extends React.Component {

    constructor(props){
       super(props)

       this.state ={
         username: AuthService.getLogin(),
       }
    }

    download = (e,nom) =>{
        CondidatService.downlodFiles(nom,this.state.username).then(resp => {
          console.log(resp)
          const url = resp.config.url;
          window.location.href = url;
    
        });
      }

    render() {

        return (

            <div className="card shadow mb-4 col-7 p-0">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Documents</h6>
                </div>
                <div className="card-body">
                    {this.props.documents.map((item, index) =>
                        <div>



                            {item.nom && item.type == 'PHOTO' && (
                                <div className="form-group row">

                                    <label className="col-md-5 control-label">Photo d'identité: (jpg/png) </label >
                                    <div className="col-md-6">
                                      
                                        <a  onClick={(e) => {this.download(e,item.nom)}}>{item.nom}</a>

                                    </div>

                                </div>
                            )}

                            {item.nom && item.type == 'CV' && (
                                <div className="form-group row">

                                    <label className="col-md-5 control-label">Curriculum vitae: (PDF) </label >
                                    <div className="col-md-6">

                                        <a  onClick={(e) => { this.download(e, item.nom) }}>{item.nom}</a>

                                    </div>

                                </div>
                            )}

                            {item.nom && item.type == 'LM' && (
                                <div className="form-group row">

                                    <label className="col-md-5 control-label">lettre de motivation: (pdf) </label >
                                    <div className="col-md-6">

                                        <a  onClick={(e) => { this.download(e, item.nom) }}>{item.nom}</a>

                                    </div>

                                </div>
                            )}

                              {item.nom && item.type == 'DIPLOME' && (
                                <div className="form-group row">

                                    <label className="col-md-5 control-label">Diplome: (pdf) </label >
                                    <div className="col-md-6">

                                        <a  onClick={(e) => { this.download(e, item.nom) }}>{item.nom}</a>

                                    </div>

                                </div>
                            )}
                             {item.nom && item.type == 'ANNEXE' && (
                                <div className="form-group row">

                                    <label className="col-md-5 control-label">Annexe: (pdf) </label >
                                    <div className="col-md-6">

                                        <a  onClick={(e) => { this.download(e, item.nom) }}>{item.nom}</a>

                                    </div>

                                </div>
                            )}



                        </div>
                    )}
                </div>
            </div>


        )
    }

}
export default DocumentLecture;