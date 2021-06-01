import React, { Component } from "react";
import Input from "react-validation/build/input";
import Leftside from "../../Layout/Leftside"
import Header from "../../Layout/Header"
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import CondidatService from "../../services/Condidature/CondidatService";
import AuthService from "../../services/Authentification/AuthService";
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
class Documents  extends Component{

    constructor(props){

        super(props);

        this.state = {
          condidat: this.props.location.state.condidatFromRecherche,
          currentUser: AuthService.getUserConneced(),
          cv:null,
          photo:null,
          lettreMotivation:null,
          diplome:null,
          annexe:null,
          loading:false,
          message:"",
          typeMessage:"",
          retour:false
        };

    }

    onChangePhoto = (e) => {
        this.setState({
            photo: e.target.files[0],
        });
      }

      onChangeCV = (e) => {
        this.setState({
            cv: e.target.files[0],
        });
      }
      onChangeLM = (e) => {
        this.setState({
            lettreMotivation: e.target.files[0],
        });
      }
      onChangeDiplome = (e) => {
        this.setState({
            diplome: e.target.files[0],
        });
      }
      onChangeAnnexe = (e) => {
        this.setState({
            annexe: e.target.files[0],
        });
      }
      goBack = (e) => {
        e.preventDefault();
        this.setState({
            retour: true,
        });
    }
      handleSubmitCondidat =(e) => {
        e.preventDefault();
        this.form.validateAll();
        if (this.checkBtn.context._errors.length === 0) {
            this.setState({
                loading: true
            })  
            const formData = new FormData();

            formData.append('file', this.state.cv);
            formData.append('file', this.state.photo);
            formData.append('file', this.state.lettreMotivation);
            formData.append('file', this.state.diplome);
            formData.append('file', this.state.annexe);
           
          let documents=[
                {id:1,fileName:this.state.cv.name},
                {id:2,fileName:this.state.photo.name},
                {id:3,fileName:this.state.lettreMotivation.name},
                {id:4,fileName:this.state.diplome.name},
                {id:5,fileName:this.state.annexe.name},
            ]

            let condidatToSave=this.state.condidat
            condidatToSave.documents=documents
            formData.append('condidat', JSON.stringify(condidatToSave));

           
      CondidatService.registerCondidatInfos(this.state.currentUser.login,formData)
      .then(
        resp => {
          if(resp.data.succesMessage){
            this.setState({          
              loading:false,
              message:resp.data.succesMessage,
              typeMessage: "alert alert-success",
            })
          }else{
            this.setState({
              message:resp.data.errorMessage,
              typeMessage: "alert alert-danger",
              loading:false
            })
          }
        }

      );
    
        }
      }

render(){
    const { message } = this.state;
    const { loading } = this.state;
    const { typeMessage } = this.state;
    const { condidat } = this.state;
    console.log("path",this.state.pathPhoto)

     //récupérer le condidat au click sue précédent 
     if (this.state.retour) {
    
      return <Redirect to={{
          pathname: '/recherche',
          state: {
            condidatBackToRecherche: condidat
          }
      }} />;
  }
    return(
        <div id="wrapper">
        <Leftside></Leftside>
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Header />


            <div className="container-fluid pl-5">
              <Form 
                encType="multipart/form-data" 
                onSubmit={this.handleSubmitCondidat}
                ref={(c) => {
                  this.form = c;
                }}
              >
                { /* Page Heading */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4 ">
                  <h1 className="h3 mb-0 text-gray-800">Joindre vos documents</h1>
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
              enregistrer </button>
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
                  <div className="col-lg-12 mb-4 ">


        <div className="card shadow mb-4 col-7 p-0">
        <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Documents</h6>
        </div>
        <div className="card-body">
            <div>
            <div className="form-group row">
                  <label  className="col-md-5 is-required">Photo d'identité: (jpg/png)</label >
                  <div  className="col-md-6">
                    <input
                        type="file"
                        className="form-control form-control-sm "
                        name="file"
                        onChange={this.onChangePhoto}
                        validations={[required]}
                        accept="image/png,image/jpg"
                    />
                    </div>
                </div>

                <div className="form-group row">
                  <label  className="col-md-4 is-required">Curriculum vitae: (PDF)</label >
                  <div  className="col-md-6">
                    <input
                        type="file"
                        className="form-control form-control-sm"
                        name="file"
                        onChange={this.onChangeCV}
                        validations={[required]}
                        accept="application/pdf"
                    />
                    </div>
                </div>

                <div className="form-group row">
                  <label  className="col-md-4 is-required">lettre de motivation: (pdf)</label >
                  <div  className="col-md-6">
                    <input
                        type="file"
                        className="form-control form-control-sm"
                        name="file"
                        onChange={this.onChangeLM}
                        validations={[required]}
                        accept="application/pdf"
                    />
                    </div>
                </div>

                <div className="form-group row">
                  <label  className="col-md-4 is-required">Diplome: (pdf)</label >
                  <div  className="col-md-6">
                    <input
                        type="file"
                        className="form-control form-control-sm"
                        name="file"
                        onChange={this.onChangeDiplome}
                        validations={[required]}
                        accept="application/pdf"
                    />
                    </div>
                </div>

                <div className="form-group row">
                  <label  className="col-md-4">Annexe: (pdf)</label >
                  <div  className="col-md-6">
                    <input
                        type="file"
                        className="form-control form-control-sm"
                        name="file"
                        onChange={this.onChangeAnnexe}
                        validations={[required]}
                        accept="application/pdf"
                    />
                    </div>
                </div>
            </div>
           
        </div>
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

export default Documents;