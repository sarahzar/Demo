import React, { Component } from "react";
import { connect, Provider } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../services/Authentification/AuthService";
import Leftside from "../../Layout/Leftside"
import Header from "../../Layout/Header"
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

class Competence extends Component {
    constructor(props) {

        super(props);
        this.handleSubmitCondidat = this.handleSubmitCondidat.bind(this)

        this.state = {
            currentUser: AuthService.getUserConneced(),
            loading: false,
            items: [{ titre: "", description: "" }],
            retour: false,
            condidat: this.props.location.state.condidatFromExpPro,
            changePath: false
        };
    }

    componentDidMount() {
        let condidatFromPrecedent = null
        if(this.props.location.state.condidatBackToCompetence){
          condidatFromPrecedent = this.props.location.state.condidatBackToCompetence
        }else{
          condidatFromPrecedent = this.props.location.state.condidatFromExpPro
        }
        if (condidatFromPrecedent.competences.length > 0) {
          this.setState({
            items: condidatFromPrecedent.competences,
            condidat:condidatFromPrecedent
          });
        }else{
          this.setState({
            condidat:condidatFromPrecedent
          });
        }
      }

    onChangeTitre = (e, index) => {
        let elements = this.state.items;
        elements[index].titre = e.target.value;
        this.setState({
            items: elements,
        });
    }
    onChangeDescription = (e, index) =>{
        let elements = this.state.items;
        elements[index].description = e.target.value;
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
    updateTabElements = (e) => {
        e.preventDefault();
        let elements = this.state.items;
        elements.push({  titre: "", description: "" });
        this.setState({
            items: elements
        });
    }

    handleSubmitCondidat = (e) => {
        e.preventDefault();
        this.form.validateAll();
        if (this.checkBtn.context._errors.length === 0) {
            let condidatToSave = this.state.condidat
            condidatToSave.competences = this.state.items

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

       
        const { loading } = this.state;
        const { items } = this.state;
        const { changePath } = this.state;
        const { condidat } = this.state;

        let condidatRecieved = null;
        if (this.props.location.state.condidatFromExpPro) {
          condidatRecieved = this.props.location.state.condidatFromExpPro
        } else {
          condidatRecieved = this.props.location.state.condidatBackToCompetence
        }
        //récupérer le condidat au click sue précédent 
        if (this.state.retour) {
            condidatRecieved.competences = items;
            return <Redirect to={{
                pathname: '/expPro',
                state: {
                    condidatBackToExpPro: condidatRecieved
                }
            }} />;
        }
        if (changePath){
          return <Redirect to={{
            pathname: '/recherche',
            state: {
              condidatFromCompetence:condidat
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
                                    <h1 className="h3 mb-0 text-gray-800">Compétence (Scientifique, Culturelle, Artistique, ...)</h1>
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

                                        <table className="table table-striped"  >
                                            <thead>

                                                <tr>
                                                    <th>Compétence</th>
                                                    <th>Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {items.map((item, index) =>
                                                    <tr key={index}>
                                                        <td> <div className="form-group">

                                                            <Input
                                                                type="text"
                                                                className="form-control form-control-sm"
                                                                name="titre"
                                                                value={item.titre}
                                                                onBlur={(e) => { this.onChangeTitre(e, index) }}
                                                                validations={[required]}
                                                            />
                                                        </div></td>
                                                        <td> <div className="form-group">

                                                            <Input
                                                                type="text"
                                                                className="form-control form-control-sm"
                                                                name="description"
                                                                value={item.description}
                                                                onBlur={(e) => { this.onChangeDescription(e, index) }}

                                                            />
                                                        </div></td>

                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
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

export default connect(mapStateToProps)(Competence);