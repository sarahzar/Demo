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
import { ignorerEtapeActions } from '../../../_actions/Shared/ignorer.etape.actions';
import { condidatActions } from "../../../_actions/Shared/condidat.actions";
import RechercheLecture from "./RechercheLecture";
import CondidatService from "../../../services/Condidature/CondidatService";



class Recherche extends Component {
    constructor(props) {

        super(props);
        this.handleSubmitCondidat = this.handleSubmitCondidat.bind(this)
        this.state = {
            loading: false,
            savedItems: [{ id: -1, thematique: { id: -1, description: "" }, chapitreLivre: 0, articleJornaux: 0, articleConference: 0, pfe: 0, mastere: 0, these: 0 }],
            retour: false,
            // condidat: null,
            changePath: false,
            activePage: 1,
            itemsCount: 1,
            ignorer: false,
            message: "",
            typeMessage: ""
        };
    }

    componentDidMount() {

        let localCopy = Object.assign({}, this.props);
        let cdtString = JSON.stringify(localCopy.condidatReducer)
        const cdt = JSON.parse(cdtString)

        if (cdt) {
            if (cdt.recherches && cdt.recherches.length > 0) {

                let items = [...cdt.recherches]
                if (!cdt.aConfirmer) {
                    items.unshift({ id: -1, thematique: { id: -1, description: "" }, chapitreLivre: 0, articleJornaux: 0, articleConference: 0, pfe: 0, mastere: 0, these: 0 })
                }
                let count = items.length;

                this.setState({
                    savedItems: items,
                    itemsCount: count
                });
            }
        }
    }

    componentWillUnmount() {

        if (this.props.condidatReducer && !this.props.condidatReducer.aConfirmer) {

            let elements = []
            elements = this.props.condidatReducer && this.props.condidatReducer.dateModif ? this.props.condidatReducer.recherches : [...this.state.savedItems]
            elements = this.initListe(elements)

            if (localStorage.getItem('persist:root')) {

                if (this.props.condidatReducer && !this.props.condidatReducer.dateModif && elements.length > 0) {
                    this.props.condidatReducer.recherches = elements;
                    this.props.setCondidat(this.props.condidatReducer)
                }

                if (elements && elements.length > 0) {
                    this.props.ignorerRecherche(false);
                } else {
                    this.props.ignorerRecherche(true);
                }
            }
        }

    }

    onChangeThematiqueDesciption = (e, index) => {
        let elements = [...this.state.savedItems];
        elements[index].thematique.description = e.target.value;
        this.setState({
            savedItems: elements,
        });

        console.log(this.props.condidatReducer.recherches)
    }
    onChangeChapitreLivre = (e, index) => {
        let elements = [...this.state.savedItems];
        elements[index].chapitreLivre = e.target.value;
        this.setState({
            savedItems: elements,
        });
    }
    onChangeArticleJornaux = (e, index) => {
        let elements = [...this.state.savedItems];
        elements[index].articleJornaux = e.target.value;
        this.setState({
            savedItems: elements,
        });
    }
    onChangeArticleConference = (e, index) => {
        let elements = [...this.state.savedItems];
        elements[index].articleConference = e.target.value;
        this.setState({
            savedItems: elements,
        });
    }
    onChangePfe = (e, index) => {
        let elements = [...this.state.savedItems];
        elements[index].pfe = e.target.value;
        this.setState({
            savedItems: elements,
        });
    }
    onChangeMastere = (e, index) => {
        let elements = [...this.state.savedItems];
        elements[index].mastere = e.target.value;
        this.setState({
            savedItems: elements,
        });
    }
    onChangeThese = (e, index) => {
        let elements = [...this.state.savedItems];
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
    ignorerEtape = (e) => {

        this.setState({
            ignorer: true,
            changePath: true,
        });

        this.props.ignorerRecherche(true)
    }

    deleteTabElement = (e, index) => {
        //declaration variables copies du state
        const recherches = this.state.savedItems.slice()

        //spprimer l'élément sélectionner
        recherches.splice(index, 1)

        let currentPage = this.state.activePage - 1

        //mise à jour du state
        this.setState({
            savedItems: recherches,
            itemsCount: recherches.length,
            activePage: currentPage
        })
    }

    updateTabElements = (e) => {
        e.preventDefault()
        let elements = [...this.state.savedItems]
        const defaultElement = { id: -1, thematique: { id: -1, description: "" }, chapitreLivre: 0, articleJornaux: 0, articleConference: 0, pfe: 0, mastere: 0, these: 0 }
        elements.unshift(defaultElement)
        this.setState({
            savedItems: elements,
            itemsCount: elements.length
        });

    }

    initListe(liste) {

        const defaultElement = { id: -1, thematique: { id: -1, description: "" }, chapitreLivre: 0, articleJornaux: 0, articleConference: 0, pfe: 0, mastere: 0, these: 0 }
        const firstElem = Array.isArray(liste) ? liste[0] : !Array.isArray(liste) ? liste : null;

        if (JSON.stringify(defaultElement) === JSON.stringify(firstElem)) {
            Array.isArray(liste) ? liste.splice(0, 1) : liste = [];
        }
        return liste;
    }

    handleSubmitCondidat = (e) => {
        e.preventDefault();
        if (!this.props.condidatReducer.aConfirmer) {
            this.form.validateAll();
            if (this.checkBtn.context._errors.length === 0) {

                this.setState({
                    loading: true,
                    changePath: true,
                })

            }
        } else {
            this.setState({
                loading: true,
                changePath: true,
            })

        }
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
    }

    modifierCondidat = (e) => {

        e.preventDefault();
        const formData = new FormData();
        const defaultElement = { id: -1, thematique: { id: -1, description: "" }, chapitreLivre: 0, articleJornaux: 0, articleConference: 0, pfe: 0, mastere: 0, these: 0 }

        let condidatToSave = this.props.condidatReducer

        let recherches = [...this.state.savedItems]
        recherches.shift()
        condidatToSave.recherches = recherches

        condidatToSave = CondidatService.updateListEmpty(condidatToSave);
        formData.append('condidat', JSON.stringify(condidatToSave));

        CondidatService.registerCondidatInfos(AuthService.getLogin(), formData)
            .then(
                resp => {
                    if (resp.data.succesMessage) {
                        this.setState({
                            message: resp.data.succesMessage,
                            typeMessage: "alert alert-success",
                        })
                        CondidatService.getCondidat(AuthService.getLogin()).then(
                            data => {
                                let cdt = data
                                let recherches = [...cdt.recherches]
                                recherches.unshift(defaultElement)
                                this.props.setCondidat(cdt)

                                this.setState({
                                    savedItems: recherches
                                })
                            }
                        )
                    } else {
                        this.setState({
                            message: resp.data.errorMessage,
                            typeMessage: "alert alert-danger",
                        })
                    }
                }

            );

    }

    render() {

        const { loading } = this.state;
        const { changePath } = this.state
        const { savedItems } = this.state;
        const { message } = this.state;
        const { typeMessage } = this.state;

        console.log("items", savedItems, "num page", this.state.activePage)

        if (this.state.retour) {

            return <Redirect to={{
                pathname: '/competence'
            }} />;
        }

        if (changePath) {
            return <Redirect to={{
                pathname: '/documents',
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

                                        {this.props.condidatReducer && !this.props.condidatReducer.aConfirmer && this.props.condidatReducer.dateModif && (
                                            <button type="button" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm ml-2 mr-2" onClick={this.modifierCondidat}>modifier</button>
                                        )}

                                        <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                                            className="fas fa-angle-double-right fa-sm text-white-50"
                                            disabled={loading}></i>
                                            {loading && (
                                                <span className="spinner-border spinner-border-sm"></span>
                                            )}
                                            Suivant </button>

                                    </div>

                                </div>

                                {message && (
                                    <div className="form-group">
                                        <div className={typeMessage} role="alert">
                                            {message}
                                        </div>
                                    </div>
                                )}


                                { /* Content Row */}


                                <div className="row">
                                    {(this.props.condidatReducer && !this.props.condidatReducer.aConfirmer &&
                                        <div className="col-lg-12 mb-4 ">


                                            <DetailsRecherche recherche={savedItems[(this.state.activePage - 1)]} indice={(this.state.activePage - 1)}
                                                changeThematique={this.onChangeThematiqueDesciption}
                                                changeChapitre={this.onChangeChapitreLivre}
                                                changeArticleJournaux={this.onChangeArticleJornaux}
                                                changeArticleConf={this.onChangeArticleConference}
                                                changeMastere={this.onChangeMastere}
                                                changeThese={this.onChangeThese}
                                                key={(this.state.activePage - 1)}
                                            />


                                            {this.state.activePage == 1 && (
                                                <div>
                                                    <button type="button" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" onClick={this.updateTabElements}>+Ajouter</button>
                                                    <button type="button" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm ml-1" onClick={this.ignorerEtape}>Ignorer cette étape</button>
                                                </div>
                                            )}
                                            {this.state.activePage > 1 && (
                                                <button type="button" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm ml-1" onClick={(e) => this.deleteTabElement(e, this.state.activePage - 1)}>Supprimer</button>
                                            )}
                                        </div>
                                    )}
                                    {(this.props.condidatReducer && !this.props.condidatReducer.aConfirmer &&
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
                                    )}
                                    {(this.props.condidatReducer && this.props.condidatReducer.aConfirmer &&
                                        <RechercheLecture items={savedItems} />
                                    )}

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
    const { condidatReducer } = state.condidat;
    return { condidatReducer };
}
const actionCreators = {
    ignorerRecherche: ignorerEtapeActions.ignorerRecherche,
    setCondidat: condidatActions.setCondidat,
};
export default connect(mapStateToProps, actionCreators)(Recherche);