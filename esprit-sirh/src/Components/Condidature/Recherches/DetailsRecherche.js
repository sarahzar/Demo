import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};
class DetailsRecherche extends React.Component {

    render() {

        return (
            <div className="">
                <div className="form-group row col-8">
                    <label className="col-md-4 p-0">Thématique du recherche:</label >
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            name="prenom"
                            value={this.props.recherche.thematique.description}
                            onChange={(e) => { this.props.changeThematique(e, this.props.indice) }}
                            validations={[required]}
                            placeholder="Ajouter une thématique"
                        />
                    </div>
                </div>
                <div className="card shadow mb-4 col-7 p-0">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Production</h6>
                    </div>
                    <div className="card-body">
                        <div>
                            <div className="form-group row">
                                <label className="col-md-4">Chapitre du livre:</label >
                                <div className="col-md-6">
                                    <input
                                        type="number"
                                        className="form-control form-control-sm col-4"
                                        name="chapitre"
                                        value={this.props.recherche.chapitreLivre}
                                        onChange={(e) => { this.props.changeChapitre(e, this.props.indice) }}
                                        validations={[required]}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-4">Article du journal:</label >
                                <div className="col-md-6">
                                    <input
                                        type="number"
                                        className="form-control form-control-sm col-4"
                                        name="articlej"
                                        value={this.props.recherche.articleJornaux}
                                        onChange={(e) => { this.props.changeArticleJournaux(e, this.props.indice) }}
                                        validations={[required]}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-4">Article du conférence:</label >
                                <div className="col-md-6">
                                    <input
                                        type="number"
                                        className="form-control form-control-sm col-4"
                                        name="artclec"
                                        value={this.props.recherche.articleConference}
                                        onChange={(e) => { this.props.changeArticleConf(e, this.props.indice) }}
                                        validations={[required]}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="card shadow mb-4 col-7 p-0">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Encadrements soutenus</h6>
                    </div>
                    <div className="card-body">
                        <div>
                            <div className="form-group row">
                                <label className="col-md-4">Msstères de recherche:</label >
                                <div className="col-md-6">
                                    <input
                                        type="number"
                                        className="form-control form-control-sm col-4"
                                        name="mastere"
                                        value={this.props.recherche.mastere}
                                        onChange={(e) => { this.props.changeMastere(e, this.props.indice) }}
                                        validations={[required]}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-4">Théses:</label >
                                <div className="col-md-6">
                                    <input
                                        type="number"
                                        className="form-control form-control-sm col-4"
                                        name="these"
                                        value={this.props.recherche.these}
                                        onChange={(e) => { this.props.changeThese(e, this.props.indice) }}
                                        validations={[required]}
                                    />
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default DetailsRecherche;