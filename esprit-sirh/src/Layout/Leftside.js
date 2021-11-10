import React, { Component } from 'react'  
import { Link, Redirect } from 'react-router-dom';  
import { connect, Provider } from "react-redux";
export class Leftside extends Component {  

    constructor(props) {
        super(props)
        this.state ={

            navigate:false
        }
    }

    go = () => {
        let valideProfile = false;
        let validateParcours = false
        let validerDocs = false
        if (this.props.validerEtapeProfile) {
            valideProfile = this.props.validerEtapeProfile();
             
            if (valideProfile) {
                this.setState({
                    navigate: true
                })
            }
        }else if(this.props.validerEtapeParcour){
            validateParcours = this.props.validerEtapeParcour();
             
            if (validateParcours) {
                this.setState({
                    navigate: true
                })
            }
        }else if(this.props.validerEtapeDocuments){
            validerDocs = this.props.validerEtapeDocuments();
             
            if (validerDocs) {
                this.setState({
                    navigate: true
                })
            }
        }else {
            this.setState({
                navigate: true
            })
        }

    }

    // toggle = ()  =>{
      
    //     document.body.toggleClass("sidebar-toggled");
    //     document.getElementsByClassName(".sidebar").toggleClass("toggled");
    //         if (document.getElementsByClassName(".sidebar").hasClass("toggled")) {
    //             document.getElementsByClassName('.sidebar .collapse').collapse('hide');
    //         };
        
    // }
    render() {  
      
     const {navigate} = this.state
     const {condidatReducer} = this.props

     console.log()

        if(navigate){
           return  <Redirect
                to={{ pathname:"/terminer" }}
          ></Redirect>
        }
        return (  
             
                <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">  
                    <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">  
                        <div className="sidebar-brand-text mx-3"> </div>  
                    </a>  
  
                    <hr className="sidebar-divider my-0" />  
  
                    <li className="nav-item active">  
                        <a className="nav-link" href="index.html">  
                            <i className="fas fa-fw fa-tachometer-alt"></i>  
                            <span>Menu</span></a>  
                    </li>  
                    <hr className="sidebar-divider" />  
                    <div className="sidebar-heading">  
                        Paramétrage  
                    </div>  
                 
                    <li className="nav-item">  
                        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">  
                        <i className="fas fa-fw fa-cog"></i>  
                            <span>Profile</span>  
                        </a>  
                        <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">  
                            <div className="bg-white py-2 collapse-inner rounded">  
                                <h6 className="collapse-header">Custom Utilities:</h6>  
                                <a className="collapse-item" href="utilities-color.html">Colors</a>  
                                <a className="collapse-item" href="utilities-border.html">Borders</a>  
                                <a className="collapse-item" href="utilities-animation.html">Animations</a>  
                                <a className="collapse-item" href="utilities-other.html">Other</a>  
                            </div>  
                        </div>  
                    </li>  
                    <hr className="sidebar-divider" />  
  
                    <div className="sidebar-heading">  
                        Interfaces  
</div>  
                    <li className="nav-item">  
                        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">  
                            <i className="fas fa-fw fa-folder"></i>  
                            <span>Pages</span>  
                        </a>  
                        <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">  
                        <div className="bg-white py-2 collapse-inner rounded">  
                                {/* <h6 className="collapse-header">Custom Components:</h6>   */}
                                <Link className="collapse-item" to="/profile">Informations générales</Link>  
                                <Link className="collapse-item" to="/parcour">Parcours académique</Link>  
                                <Link className="collapse-item" to="/expEnseignant">Expériences enseignant</Link>  
                                <Link className="collapse-item" to="/expPro">Expériences professionnels</Link>
                                <Link className="collapse-item" to="/competence">Compétences</Link>   
                                <Link className="collapse-item" to="/recherche">activités de recherches</Link> 
                                <Link className="collapse-item" to="/documents">documents</Link> 
                               {/* {condidatReducer && !condidatReducer.aConfirmer && ( */}
                                <Link className="collapse-item" onClick={this.go}>terminer l'inscription</Link>
                               {/* )}  */}
                            </div>  
                        </div>  
                    </li>  
                    {/* <li className="nav-item">  
                        <Link className="nav-link" to="/color"> <i className="fas fa-fw fa-chart-area"></i>Colors</Link>  
                        <a className="nav-link" href="charts.html"> 
                            <i className="fas fa-fw fa-chart-area"></i> 
                            <span>Charts</span></a>  
                    </li>   */}
                    {/* <li className="nav-item">  
                        <Link className="nav-link" to="/table">  <i className="fas fa-fw fa-table"></i>Tables</Link>  
                        <a className="nav-link" href="tables.html"> 
                            <i className="fas fa-fw fa-table"></i> 
                            <span>Tables</span></a>  
                    </li>   */}


                    {/* <hr className="sidebar-divider d-none d-md-block" />  
                    <div className="text-center d-none d-md-inline">  
                        <button className="rounded-circle border-0" id="sidebarToggle" ></button>  
                    </div>   */}
  
                </ul>  
            
        )  
    }  
}  
function mapStateToProps(state) {
    const {condidatReducer} = state.condidat;  
    return { 
        condidatReducer
    };
  }
 
export default connect(mapStateToProps)(Leftside) 