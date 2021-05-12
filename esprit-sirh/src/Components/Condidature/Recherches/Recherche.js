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


const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

class Recherche extends Component {
    constructor(props) {

        super(props);
        this.handleSubmitCondidat = this.handleSubmitCondidat.bind(this)
        this.state = {
            currentUser: AuthService.getUserConneced(),
            loading: false,
            items: [{ thematiqueDesciption: "",chapitreLivre:0,articleJornaux:0,articleConference:0,pfe:0,mastere:0,these:0}],
            savedItems:[],
            retour: false,
            condidat: this.props.location.state.condidatFromCompetence,
            changePath: false
        };
    }



    onChangeThematiqueDesciption= (e,index) => {
        let elements = this.state.items;
        elements[index].thematiqueDesciption = e.target.value;
        this.setState({
            items: elements,
        });
    }
    onChangeChapitreLivre = (e, index) => {
        let elements = this.state.items;
        elements[index].chapitreLivre = e.target.value;
        this.setState({
            items: elements,
        });
    }
    onChangeArticleJornaux = (e, index) => {
        let elements = this.state.items;
        elements[index].articleJornaux = e.target.value;
        this.setState({
            items: elements,
        });
    }
    onChangeArticleConference = (e, index) => {
        let elements = this.state.items;
        elements[index].articleConference = e.target.value;
        this.setState({
            items: elements,
        });
    }
    onChangePfe = (e, index) => {
        let elements = this.state.items;
        elements[index].pfe = e.target.value;
        this.setState({
            items: elements,
        });
    }
    onChangeMastere = (e, index) => {
        let elements = this.state.items;
        elements[index].mastere = e.target.value;
        this.setState({
            items: elements,
        });
    }
    onChangeThese = (e, index) => {
        let elements = this.state.items;
        elements[index].these = e.target.value;
        this.setState({
            items: elements,
        });
    }
    goBack = (e) => {
        e.preventDefault();
        this.setState({
            retour: true,
        });
    }
    updateTabElements = (e) =>{
        e.preventDefault()
        let elements = [...this.state.savedItems]
        this.state.items.forEach(i =>{
            elements.push(i)
        })
      
        let newItems=[{ thematiqueDesciption: "",chapitreLivre:0,articleJornaux:0,articleConference:0,pfe:0,mastere:0,these:0}]
        this.setState({
            savedItems: elements,
            items:newItems
        });
       
    }

    handleSubmitCondidat = (e) => {
        e.preventDefault();
        this.form.validateAll();
        if (this.checkBtn.context._errors.length === 0) {
            let condidatToSave = this.state.condidat
            condidatToSave.recherches = this.state.savedItems

            this.setState({
                loading: true,
                changePath: true,
                condidat: condidatToSave
            })

        }
    }

    render() {
        // const condidatRecieved=this.props.location.state.condidat
        // console.log("condidat recived",condidatRecieved)

        //récupérer le condidat au click sue précédent 
        // if (this.state.retour){
        //   return <Redirect to={{
        //     pathname: '/profile',
        //     state: {
        //       condidatBack:condidatRecieved
        //     }
        //   }} />;
        // }


        const { loading } = this.state;
        const { items } = this.state;
        const { changePath } = this.state;
        const { condidat } = this.state;
        console.log("elements enregistrés",this.state.savedItems)

        if (changePath){
          return <Redirect to={{
            pathname: '/documents',
            state: {
                condidatFromRecherche:condidat
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
                                        {/* <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm mr-1" onClick={this.goBack}>
                      <i className="fas fa-angle-double-left fa-sm text-white-50"></i>Précédent
                  </button> */}

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
                                    {items.map((item, index) =>
                                        <DetailsRecherche recherche={item} indice={index}
                                         changeThematique={this.onChangeThematiqueDesciption}
                                         changeChapitre={this.onChangeChapitreLivre}
                                         changeArticleJournaux={this.onChangeArticleJornaux}
                                         changeArticleConf={this.onChangeArticleConference}
                                         changeMastere={this.onChangeMastere}
                                         changeThese={this.onChangeThese}
                                         key={index}
                                        />
                                    )}
                                    <button type="button" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" onClick={this.updateTabElements}>+Ajouter</button>
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