
import React, { Component } from "react";
import Leftside from "../../../Layout/Leftside"
import Header from "../../../Layout/Header"
import { connect, Provider } from "react-redux";
import { Link } from 'react-router-dom';
import { validerEtapeActions } from "../../../_actions/Shared/valider.etape.actions";
import CondidatService from "../../../services/Condidature/CondidatService";
import AuthService from "../../../services/Authentification/AuthService";
class TerminerInscription extends React.Component {
    constructor(props) {
        super(props)

        this.state ={
            msg:false,
            message:"",
            typeMessage:""
        }
    }

    terminerInscrit = () =>{
        CondidatService.confirmerCondidature(AuthService.getLogin()).then(
            resp => {
                if(resp.data.succesMessage){
                   this.setState({
                       message : resp.data.succesMessage,
                       typeMessage : "alert alert-success"
                   })
                }else{
                    this.setState({
                        message : resp.data.errorMessage,
                        typeMessage : "alert alert-danger"
                    })
                }
            }
              );
    }

    render() {

      const {ignorerCpt,ignorerExpEns,ignorerExpPro,ignorerRecherche,condidatReducer,validateParcours,validateDocuments} =this.props;
      const showMsg = 
      (this.props.ignorerExpEns == undefined || this.props.ignorerExpEns) ||
      (this.props.ignorerExpPro == undefined || this.props.ignorerExpPro) ||
      (this.props.ignorerCpt == undefined || this.props.ignorerCpt) ||
      (this.props.ignorerRecherche == undefined || this.props.ignorerRecherche) ;

      console.log("empty",validateParcours )
        return (
            <div id="wrapper">
                <Leftside></Leftside>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Header />


                        <div className="container-fluid pl-5">
                        <div className="col-lg-6">
                                {this.state.message && (
                                    <div className="form-group">
                                        <div className={this.state.typeMessage} role="alert">
                                            {this.state.message}
                                        </div>
                                    </div>
                                )}

<div className="card shadow mb-4">
    <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Terminer l'inscription</h6>
    </div>
    <div className="card-body">

        {showMsg && (
        <p class="text-xs font-weight-bold text-primary">Votre inscription manque quelques informtions!</p>
        )}

        {/* <Link to={{pathname: "/profile", state: {}, }} className="btn btn-success btn-icon-split">
            <span className="icon text-white-50">
                <i className="fas fa-check"></i>
            </span>
            <span className="text">Etape 1: Informations personnels</span>
        </Link>

        <div className="my-2"></div>
        <Link to={{pathname: "/parcour", state: {}, }} className={validateParcours ? "btn btn-success btn-icon-split" : "btn btn-danger btn-icon-split"  }>
            <span className="icon text-white-50">
            {!validateParcours && (
                <i className="fas fa-info-circle"></i>
                )}
                 {validateParcours  && (
                <i className="fas fa-check"></i>
                )}
            </span>
            <span className="text">Etape 2: Parcour académique</span>
        </Link> */}

        <div className="my-2"></div>
        <Link   to={{pathname: "/expEnseignant", state: {}, }} className={ignorerExpEns == undefined || (ignorerExpEns && ignorerExpEns == true) ? "btn btn-danger btn-icon-split" : "btn btn-success btn-icon-split"}>
            <span className="icon text-white-50">
            {(ignorerExpEns == undefined || (ignorerExpEns && ignorerExpEns == true)) && (
                <i className="fas fa-info-circle"></i>
                )}
                 {ignorerExpEns == false && (
                <i className="fas fa-check"></i>
                )}
            </span>
            <span className="text">Etape 3: Expériences d'enseignant </span>
        </Link>


        <div className="my-2"></div>
        <Link   to={{pathname: "/expPro", state: {}, }} className={ignorerExpPro == undefined || (ignorerExpPro && ignorerExpPro == true) ? "btn btn-danger btn-icon-split" : "btn btn-success btn-icon-split"}>
            <span className="icon text-white-50">
                {(ignorerExpPro == undefined || (ignorerExpPro && ignorerExpPro == true)) && (
                <i className="fas fa-info-circle"></i>
                )}
                 {ignorerExpPro == false && (
                <i className="fas fa-check"></i>
                )}
            </span>
            <span className="text">Etape 4: Expériences professionelles</span>
        </Link>


        <div className="my-2"></div>
        <Link   to={{pathname: "/competence", state: {}, }} className={ignorerCpt == undefined || (ignorerCpt && ignorerCpt == true) ? "btn btn-danger btn-icon-split" : "btn btn-success btn-icon-split"}>
            <span className="icon text-white-50">
                {(ignorerCpt == undefined || (ignorerCpt && ignorerCpt == true) ) && (
                <i className="fas fa-info-circle"></i>
                )}
                 {ignorerCpt == false && (
                <i className="fas fa-check"></i>
                )}
            </span>
            <span className="text">Etape 5: Compétences</span>
        </Link>

        <div className="my-2"></div>
        <Link   to={{pathname: "/recherche", state: {}, }} className={ignorerRecherche == undefined || (ignorerRecherche && ignorerRecherche ==true) ? "btn btn-danger btn-icon-split" : "btn btn-success btn-icon-split"}>
            <span className="icon text-white-50">
            {(ignorerRecherche == undefined || (ignorerRecherche && ignorerRecherche ==true))  && (
                <i className="fas fa-info-circle"></i>
                )}
                 {ignorerRecherche == false && (
                <i className="fas fa-check"></i>
                )}
            </span>
            <span className="text">Etape 6: Activités de recherche</span>
        </Link>


        <div className="my-2"></div>
        {/* <Link to={{pathname: "/documents", state: {}, }} className={validateDocuments ? "btn btn-success btn-icon-split" : "btn btn-danger btn-icon-split"} >
            <span className="icon text-gray-600">      
            {!validateDocuments  && (
                <i className="fas fa-info-circle"></i>
                )}
                 {validateDocuments  && (
                <i className="fas fa-check"></i>
                )}
            </span>
            <span className="text">Etape 7: Téléchargement des documents</span>
        </Link> */}

        <div className="mb-5"></div>

        <div className="form-group m-0">
        <button className="d-none d-sm-inline-block btn btn-sm btn-secondary shadow-sm mr-1 " >
           <i className="fas fa-download"></i>Générer un document PDF
                                        </button>
                                        <button className="d-none d-sm-inline-block btn btn-sm btn-primary " disabled={!validateDocuments || !validateParcours} onClick={this.terminerInscrit}>
           <i className="fas fa-check"></i>Confirmer ma condidature
                                        </button>
                                        </div>
    </div>
</div>

</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
function mapStateToProps(state) {
 
    const {ignorerCpt} = state.ignorerCompetence;
    const {ignorerExpEns} = state.ignorerExpEns;
    const {ignorerExpPro} = state.ignorerExpPro;
    const {ignorerRecherche} = state.ignorerRecherche;   
    const {condidatReducer} = state.condidat;  
    const {validateParcours} = state.validerEtapeParcours 
    const {validateDocuments} = state.validerEtapeDocuments     
    return { ignorerCpt,ignorerExpEns,ignorerExpPro,ignorerRecherche,condidatReducer,validateParcours,validateDocuments};
  }
  const actionCreators = {
    terminerInscription: validerEtapeActions.terminerInscription
  };
export default connect(mapStateToProps,actionCreators)(TerminerInscription);