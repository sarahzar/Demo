import React from "react";
import Header from "../../Layout/Header";
import Leftside from "../../Layout/Leftside";
import { diplomeActions } from "../../_actions/Shared/Nomenclatures/diplome.actions";
import { connect } from "react-redux";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import AdminService from '../../services/Administration/AdminService'
import Pagination from "react-js-pagination";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import "./styles.css";
class RechercheCondidat extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            nom: null,
            prenom: null,
            anneeInscrit: 0,
            idDiplome: 0,
            resultats: [],
            activePage: 1,
            itemsCount: 1,
            itemsPerPage: 5,
            searchdResult: [],
            show: false,
            indexCondidat: -1
        }
    }
    onChangeNom = (e) => {
        this.setState({
            nom: e.target.value
        })
    }
    onChangePrenom = (e) => {
        this.setState({
            prenom: e.target.value
        })
    }

    onChangeAnneeInscrit = (e) => {
        this.setState({
            anneeInscrit: e.target.value
        })
    }

    onChangeDiplome = (e) => {
        this.setState({
            idDiplome: e.target.value
        })
    }

    handleSearch = (e) => {
        e.preventDefault()
        AdminService.getFiltredCondidats(this.state.nom, this.state.prenom, this.state.anneeInscrit, this.state.idDiplome)
            .then(resp => {

                this.setState({
                    resultats: resp.data,
                })

                let items = [... this.state.resultats]
                this.setState({
                    itemsCount: items.length,
                })
            })
    }
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
    }

    handleSearchByName = (e) => {

        let allItems = [... this.state.resultats]

        let filtredItems = e.target.value != "" ? allItems.filter(i =>
            (i.prenom + " " + i.nom).includes(e.target.value)) : allItems

        this.setState({
            searchdResult: filtredItems
        })

    }
    handleShow = (e, index) => {
        console.log("i", index)
        this.setState({
            show: true,
            indexCondidat: index
        })
    }

    handleClose = () => {
        this.setState({
            show: false
        })
    }
    getIndex = (e, index) => {
        console.log("i", index)
    }
    render() {
        const { show } = this.state;
        const { diplomes } = this.props;
        const { resultats } = this.state
        const { searchdResult } = this.state
        const indexOfLastItem = this.state.activePage * this.state.itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
        const items = searchdResult && searchdResult.length > 0 ? searchdResult.slice(indexOfFirstItem, indexOfLastItem) : resultats.slice(indexOfFirstItem, indexOfLastItem);
        const selectedCondidat = items[this.state.indexCondidat]

        return (

            <div id="wrapper">
                <Leftside></Leftside>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Header />

                        <Modal show={show} onHide={this.handleClose} >
                            <Modal.Header closeButton>
                                <Modal.Title>Détails du condidat</Modal.Title>
                            </Modal.Header>

                            <Modal.Body className="overflow-auto">
                                <div class="row ">
                                    <div class="col-12">
                                    {/* Annee obtention */}
                                        <div class="form-group row mb-0">
                                            <div class="col-4">
                                                <label class="col-form-label font-weight-bold">Annee obtention:</label>
                                            </div>
                                            <div class="col-8">
                                                <label class="col-form-label">
                                                    {selectedCondidat && selectedCondidat.dernierDiplome && selectedCondidat.dernierDiplome.annee}
                                                </label>
                                            </div>
                                        </div>
                                        {/* Poste actuel */}
                                        <div class="form-group row">
                                            <div class="col-4">
                                                <label class="col-form-label font-weight-bold">Poste actuel:</label>
                                            </div>
                                            <div class="col-8">
                                                <label class="col-form-label">
                                                    {selectedCondidat && selectedCondidat.posteActuel && selectedCondidat.posteActuel.libelle}
                                                </label>
                                            </div>
                                        </div>
                                        {/* Parcours */}
                                        <div class="form-group row align-items-center">
                                            <div class="col-4">
                                                <label class="col-form-label font-weight-bold">Parcours:</label>
                                            </div>
                                            <div class="col-8">
                                                <ul class="list-group">
                                                    {selectedCondidat && selectedCondidat.parcourScolaire && selectedCondidat.parcourScolaire.map((parcour) =>
                                                      <li class="list-group-item list-group-item-primary">{parcour.diplome && parcour.diplome.libelle } obtenu en {parcour.annee}, spécialité {parcour.specialite && parcour.specialite.libelle}</li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                          {/* Compétences: */}
                                          {(selectedCondidat && selectedCondidat.competences && selectedCondidat.competences.length > 0 ) && (
                                          <div class="form-group row align-items-center">
                                            <div class="col-4">
                                                <label class="col-form-label font-weight-bold">Compétences:</label>
                                            </div>
                                            <div class="col-8">
                                                <ul class="list-group">
                                                    {selectedCondidat && selectedCondidat.competences && selectedCondidat.competences.map((cp) =>
                                                      <li class="list-group-item list-group-item-secondary">{cp.titre} </li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                          )}
                                          {/* Expériences enseignant: */}
                                          {(selectedCondidat && selectedCondidat.experienceEnseignants && selectedCondidat.experienceEnseignants.length > 0 ) && (
                                          <div class="form-group row align-items-center">
                                            <div class="col-4">
                                                <label class="col-form-label font-weight-bold">Expériences enseignant:</label>
                                            </div>
                                            <div class="col-8">
                                                <ul class="list-group">
                                                    {selectedCondidat && selectedCondidat.experienceEnseignants && selectedCondidat.experienceEnseignants.map((ex) =>
                                                      <li class="list-group-item list-group-item-primary">du {ex.dateDebut && ex.dateDebut.substring(0, 10)} au {ex.dateFin && ex.dateFin.substring(0, 10)}, à {ex.etablissement && ex.etablissement.libelle}, module enseigné {ex.moduleEnseigne && ex.moduleEnseigne.libelle}</li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                          )}
                                           {/* Expériences professionelles: */}
                                           {(selectedCondidat && selectedCondidat.experienceProfessionels && selectedCondidat.experienceProfessionels.length > 0 ) && (
                                          <div class="form-group row align-items-center">
                                            <div class="col-4">
                                                <label class="col-form-label font-weight-bold">Expériences professionelles:</label>
                                            </div>
                                            <div class="col-8">
                                                <ul class="list-group">
                                                    {selectedCondidat && selectedCondidat.experienceProfessionels && selectedCondidat.experienceProfessionels.map((ex) =>
                                                      <li class="list-group-item list-group-item-secondary">a occupé le poste "{ex.poste && ex.poste.libelle}" du {ex.dateDebut && ex.dateDebut.substring(0, 10)} au {ex.dateFin && ex.dateFin.substring(0, 10)}, dans la société {ex.etablissement && ex.etablissement.libelle}</li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                          )}
                                           {/* Recherches: */}
                                           {(selectedCondidat && selectedCondidat.recherches && selectedCondidat.recherches.length > 0 ) && (
                                          <div class="form-group row align-items-center">
                                            <div class="col-4">
                                                <label class="col-form-label font-weight-bold">Recherches:</label>
                                            </div>
                                            <div class="col-8">
                                                <ul class="list-group">
                                                    {selectedCondidat && selectedCondidat.recherches && selectedCondidat.recherches.map((recherche) =>
                                                      <li class="list-group-item list-group-item-primary">Thématique "{recherche.thematique && recherche.thematique.libelle}", nombre de chapitres: {recherche.chapitreLivre} </li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                          )}
                                          
                                    </div>
                                </div>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="primary" onClick={this.handleClose}>Close</Button>
                            </Modal.Footer>
                        </Modal>

                        <div class="container-fluid">
                            <div className="mb-4">
                                <Form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-4  mw-100 navbar-search"
                                    onSubmit={this.handleSearch}
                                    ref={(c) => {
                                        this.form = c;
                                    }}
                                >

                                    <div class="form-group row">
                                        <div class="form-inline col-2 pl-0">
                                            <label class="mr-2">Nom</label>
                                            <input type="text" class="form-control small col-8"
                                                aria-label="Search" aria-describedby="basic-addon2" onChange={this.onChangeNom} />
                                        </div>
                                        <div class="form-inline col-3">
                                            <label class="mr-2">Prénom</label>
                                            <input type="text" class="form-control small col-6"
                                                aria-label="Search" aria-describedby="basic-addon2" onChange={this.onChangePrenom} />
                                        </div>
                                        <div class="form-inline col-3">
                                            <label class="mr-2">Année d'inscription</label>
                                            <input type="text" class="form-control small col-4"
                                                aria-label="Search" aria-describedby="basic-addon2" onChange={this.onChangeAnneeInscrit} />
                                        </div>
                                        <div class="form-inline">
                                            <label class="mr-2">Diplôme</label>
                                            <select class="form-control small"
                                                aria-label="Search" aria-describedby="basic-addon2" onChange={this.onChangeDiplome}>
                                                <option value="-1"></option>
                                                {diplomes.map((d, i) =>
                                                    <option value={d.id} key={"dip" + i}>{d.libelle}</option>
                                                )}
                                            </select>
                                        </div>

                                        <button class="btn btn-primary ml-2" >
                                            <i class="fas fa-search fa-sm"></i>
                                        </button>

                                    </div>
                                    <CheckButton
                                        style={{ display: "none" }}
                                        ref={(c) => {
                                            this.checkBtn = c;
                                        }}
                                    />
                                </Form>
                            </div>
                            <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h6 class="m-0 font-weight-bold text-primary">Résultat</h6>
                                </div>
                                <div class="card-body table-responsive">
                                    <input type="text" id="search" onChange={this.handleSearchByName} placeholder="Rechercher.." class="form-control search-input sm col-3 my-2 float-right search btn-group" />
                                    <table class="table" >
                                        <thead>

                                            <tr className="d-flex">
                                                <th className="col-2">Date d'inscription </th>
                                                <th className="col-3">Nom & Prénom </th>
                                                <th className="col-2">Date de naissance </th>
                                                <th className="col-2">Spécialité </th>
                                                <th className="col-2 ">Dernier diplôme </th>
                                                <th className="col-1 ">Détails </th>
                                                {/* <th className="col-3">Poste actuel </th>
                                                <th className="col-2">Parcours</th>
                                                <th className="col-3">Expérience Enseignant</th> */}
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {resultats && items.map((res, index) =>
                                                <tr className="d-flex">
                                                    <td className="col-2">{res.dateInscrit && res.dateInscrit.substring(0, 10)} </td>
                                                    <td className="col-3">{res.nom} {res.prenom} </td>
                                                    <td className="col-2">{res.dateNaissance && res.dateNaissance.substring(0, 10)} </td>
                                                    <td className="col-2">{res.dernierDiplome && res.dernierDiplome.specialite.libelle} </td>
                                                    <td className="col-2">{res.dernierDiplome && res.dernierDiplome.diplome.libelle} </td>
                                                    <td className="col-1"><button className="border-0 bg-transparent" onClick={(e) => this.handleShow(e, index)}><i className="fa fa-list"></i></button></td>
                                                    {/* <td className="col-3">{res.posteActuel && res.posteActuel.libelle} </td>
                                                    <td className="col-2"> aa</td>
                                                    <td className="col-3"> aa</td> */}
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-12 p-0">
                                <div className="d-flex justify-content-center">
                                    <Pagination
                                        activePage={this.state.activePage}
                                        itemsCountPerPage={this.state.itemsPerPage}
                                        totalItemsCount={this.state.itemsCount}
                                        pageRangeDisplayed={5}
                                        itemClass="page-item"
                                        linkClass="page-link"
                                        onChange={this.handlePageChange.bind(this)}
                                    />
                                </div>
                            </div>

                        </div>
                    </div >
                </div >
            </div >

        )
    }


}
function mapStateToProps(state) {
    const { diplomes } = state.diplome;
    return {
        diplomes
    };
}
const actionCreators = {
    allDiplomes: diplomeActions.allDiplomes,
};
export default connect(mapStateToProps, actionCreators)(RechercheCondidat);

