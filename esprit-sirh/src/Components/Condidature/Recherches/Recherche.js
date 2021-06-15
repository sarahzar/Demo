import React, { Component } from "react";
import { connect, Provider } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../../services/Authentification/AuthService";
import Leftside from "../../../Layout/Leftside"
import Header from "../../../Layout/Header"
import DetailsRecherche from "../Recherches/DetailsRecherche"
import { Link, Redirect } from "react-router-dom";
import Pagination from "react-js-pagination";



class Recherche extends Component {
    constructor(props) {

        super(props);
        this.handleSubmitCondidat = this.handleSubmitCondidat.bind(this)
        this.state = {
            loading: false,
            savedItems:[{ thematiqueDesciption: "",chapitreLivre:0,articleJornaux:0,articleConference:0,pfe:0,mastere:0,these:0}],
            retour: false,
            condidat: this.props.location.state.condidatFromCompetence,
            changePath: false,
            activePage: 1,
            itemsCount:1,
            etatCivils: this.props.location.state.etatCivils,
            postes: this.props.location.state.postes,
            diplomes: this.props.location.state.diplomes,
            domaines: this.props.location.state.domaines,
            types: this.props.location.state.types,
            etablissements: this.props.location.state.etablissements,
            specialites: this.props.location.state.specialites,
            pays: this.props.location.state.pays,
            modules: this.props.location.state.modules,
            ignorer: false,
        };
    }

    componentDidMount() {
        let condidatFromPrecedent = null
        if(this.props.location.state.condidatBackToRecherche){
          condidatFromPrecedent = this.props.location.state.condidatBackToRecherche
        }else{
          condidatFromPrecedent = this.props.location.state.condidatFromCompetence
        }
        if (condidatFromPrecedent.recherches.length > 0) {
          this.setState({
            savedItems: condidatFromPrecedent.recherches,
            condidat:condidatFromPrecedent,
            itemsCount:condidatFromPrecedent.recherches.length  
          });
        }else{
          this.setState({
            condidat:condidatFromPrecedent
          });
        }
      }

    onChangeThematiqueDesciption= (e,index) => {
        let elements = this.state.savedItems;
        elements[index].thematiqueDesciption = e.target.value;
        this.setState({
            savedItems: elements,
        });
    }
    onChangeChapitreLivre = (e, index) => {
        let elements = this.state.savedItems;
        elements[index].chapitreLivre = e.target.value;
        this.setState({
            savedItems: elements,
        });
    }
    onChangeArticleJornaux = (e, index) => {
        let elements = this.state.savedItems;
        elements[index].articleJornaux = e.target.value;
        this.setState({
            savedItems: elements,
        });
    }
    onChangeArticleConference = (e, index) => {
        let elements = this.state.savedItems;
        elements[index].articleConference = e.target.value;
        this.setState({
            savedItems: elements,
        });
    }
    onChangePfe = (e, index) => {
        let elements = this.state.savedItems;
        elements[index].pfe = e.target.value;
        this.setState({
            savedItems: elements,
        });
    }
    onChangeMastere = (e, index) => {
        let elements = this.state.savedItems;
        elements[index].mastere = e.target.value;
        this.setState({
            savedItems: elements,
        });
    }
    onChangeThese = (e, index) => {
        let elements = this.state.savedItems;
        elements[index].these = e.target.value;
        this.setState({
            savedItems: elements,
        });
    }
    goBack = (e) => {
        e.preventDefault();
        this.setState({
            retour: true,
        });
    }
    ignorerEtape = (e) =>{
        this.setState({
          ignorer: true,
          changePath:true
        });
      }
    updateTabElements = (e) =>{
        e.preventDefault()
        let elements = [...this.state.savedItems]
        // this.state.items.forEach(i =>{
        //     elements.push(i)
        // })
        elements.unshift({ thematiqueDesciption: "",chapitreLivre:0,articleJornaux:0,articleConference:0,pfe:0,mastere:0,these:0})
        this.setState({
            savedItems: elements,
            itemsCount:elements.length  
        });
       
    }

    handleSubmitCondidat = (e) => {
        e.preventDefault();
        this.form.validateAll();
        if (this.checkBtn.context._errors.length === 0) {
            let condidatToSave = this.state.condidat
            let recherches= this.state.savedItems
            recherches.shift()     
            condidatToSave.recherches =  recherches

            this.setState({
                loading: true,
                changePath: true,
                condidat: condidatToSave
            })

        }
    }
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
      }

    render() {
        const required = value => {
            if (!this.state.ignorer && !value) {
                return (
                    <div className="alert alert-danger" role="alert">
                        This field is required!
                    </div>
                );
            }
        };
        const { loading } = this.state;
        const { changePath } = this.state;
        const { condidat } = this.state;
        const {savedItems} =this.state;
        const { postes } = this.state;
        const { diplomes } = this.state;
        const { domaines } = this.state;
        const { types } = this.state;
        const { etablissements } = this.state;
        const { specialites } = this.state;
        const { etatCivils } = this.state;
        const { modules } = this.state;
        const { pays } = this.state;

        let condidatRecieved = null;
        if (this.props.location.state.condidatFromCompetence) {
          condidatRecieved = this.props.location.state.condidatFromCompetence
        } else {
          condidatRecieved = this.props.location.state.condidatBackToRecherche
        }

         //récupérer le condidat au click sue précédent 
         if (this.state.retour) {
            condidatRecieved.recherches = savedItems;
            return <Redirect to={{
                pathname: '/competence',
                state: {
                    condidatBackToCompetence: condidatRecieved,
                    postes: postes,
                    diplomes: diplomes,
                    etablissements: etablissements,
                    modules: modules,
                    etatCivils: etatCivils,
                    pays: pays,
                    types: types,
                    domaines: domaines,
                    specialites: specialites
                }
            }} />;
        }

        if (changePath){
          return <Redirect to={{
            pathname: '/documents',
            state: {
                condidatFromRecherche:condidat,
                postes: postes,
                diplomes: diplomes,
                etablissements: etablissements,
                modules: modules,
                etatCivils: etatCivils,
                pays: pays,
                types: types,
                domaines: domaines,
                specialites: specialites
            }
          }} />;
        }

        return (
        
            <div id="wrapper">
                <Leftside></Leftside>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Header />



                        <div className="container-fluid pl-5">
                            <Form
                                onSubmit={this.handleSubmitCondidat}
                                ref={(c) => {
                                    this.form = c;
                                }}
                            >
                                { /* Page Heading */}
                                <div className="d-sm-flex align-items-center justify-content-between mb-4 ">
                                    <h1 className="h3 mb-0 text-gray-800">Activités de recherche</h1>
                                    <div className="form-group m-0">
                                        <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm mr-1" onClick={this.goBack}>
                                            <i className="fas fa-angle-double-left fa-sm text-white-50"></i>Précédent
                                        </button>
            
                                        <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                                            className="fas fa-angle-double-right fa-sm text-white-50"
                                            disabled={loading}></i>
                                            {loading && (
                                                <span className="spinner-border spinner-border-sm"></span>
                                            )}
                                         Suivant </button>

                                    </div>

                                </div>

                                { /* Content Row */}
                                <div className="row">
                                <div className="col-lg-12 mb-4 ">
                                    {/* {items.map((item, index) => */}
                                        <DetailsRecherche recherche={savedItems[(this.state.activePage - 1)]} indice={(this.state.activePage - 1)}
                                         changeThematique={this.onChangeThematiqueDesciption}
                                         changeChapitre={this.onChangeChapitreLivre}
                                         changeArticleJournaux={this.onChangeArticleJornaux}
                                         changeArticleConf={this.onChangeArticleConference}
                                         changeMastere={this.onChangeMastere}
                                         changeThese={this.onChangeThese}
                                         key={(this.state.activePage - 1)}
                                        />
                                    {/* )} */}
                                    {this.state.activePage ==1 && (
                                    <button type="button" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" onClick={this.updateTabElements}>+Ajouter</button>
                                    )}
                                     {this.state.activePage ==1 && (
                                     <button type="button" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm ml-1" onClick={this.ignorerEtape}>Ignorer cette étape</button>  
                                    )}
                                </div>
                                <div className="col-7 p-0">
                                    <div className="d-flex justify-content-center">
                                        <Pagination
                                            activePage={this.state.activePage}
                                            itemsCountPerPage={1}
                                            totalItemsCount={this.state.itemsCount}
                                            pageRangeDisplayed={this.state.itemsCount}
                                            itemClass="page-item"
                                            linkClass="page-link"
                                            onChange={this.handlePageChange.bind(this)}
                                        />
                                        </div>
                                        </div>
                               
                               </div>
                                <CheckButton
                                    style={{ display: "none" }}
                                    ref={(c) => {
                                        this.checkBtn = c;
                                    }}
                                />

                            </Form>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {

    const { diplomes } = state.diplome;

    const { etablissements } = state.etablissement;
    const { specialites } = state.specialite;

    return { diplomes, etablissements, specialites };
}

export default connect(mapStateToProps)(Recherche);