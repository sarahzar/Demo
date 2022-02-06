
import React from "react";
import Header from "../../Layout/Header";
import Leftside from "../../Layout/Leftside";
import AdminService from '../../services/Administration/AdminService'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import AuthService from "../../services/Authentification/AuthService";
class Roles extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            usernameAdd: "",
            roleNameAdd: "",
            usernameGet: "",
            usernameDelete: "",
            roleNameDelete: "",
            message: "",
            typeMessage: "",
            userRoles: [],
            show: false,
            AllRoles: []
        }
    }
    componentDidMount() {
        AdminService.getAllRoles().then(resp => {
            this.setState({
                AllRoles: resp.data
            })
        })
    }

    onChangeUserToAddRole = (e) => {
        this.setState({
            usernameAdd: e.target.value
        })
    }
    onChangeRoleToAddRole = (e) => {
        this.setState({
            roleNameAdd: e.target.value
        })
    }
    onChangeUserToGetRoles = (e) => {
        this.setState({
            usernameGet: e.target.value
        })
    }
    onChangeUserToDeleteRole = (e) => {
        this.setState({
            usernameDelete: e.target.value
        })
    }
    onChangeRoleToDeleteRole = (e) => {
        this.setState({
            roleNameDelete: e.target.value
        })
    }

    affectRoleToUser = (e) => {
        let usernameConnected = AuthService.getLogin();
        if (this.state.usernameAdd == usernameConnected) {
            this.setState({
                message: "Le login inséré est celui de l'utilisateur connecté!",
                typeMessage: "alert alert-danger"
            })
        } else {
            AdminService.affecteRoleToUser(this.state.roleNameAdd, this.state.usernameAdd).then(

                resp => {
                    if (resp.data.succesMessage) {
                        this.setState({
                            message: resp.data.succesMessage,
                            typeMessage: "alert alert-success"
                        })
                    } else {
                        this.setState({
                            message: resp.data.errorMessage,
                            typeMessage: "alert alert-danger"
                        })
                    }
                }

            )
        }
    }
    getUserRoles = (e) => {
        AdminService.getUserRoles(this.state.usernameGet).then(

            resp => {
                this.setState({
                    userRoles: resp.data
                })
                this.handleShow()
            }

        )
    }
    deleteUserRole = (e) => {
        let usernameConnected = AuthService.getLogin();
        if (this.state.usernameDelete == usernameConnected) {
            this.setState({
                message: "Le login inséré est celui de l'utilisateur connecté!",
                typeMessage: "alert alert-danger"
            })
        } else {
            AdminService.deleteUserRole(this.state.roleNameDelete, this.state.usernameDelete).then(

                resp => {
                    if (resp.data.succesMessage) {
                        this.setState({
                            message: resp.data.succesMessage,
                            typeMessage: "alert alert-success"
                        })
                    } else {
                        this.setState({
                            message: resp.data.errorMessage,
                            typeMessage: "alert alert-danger"
                        })
                    }
                }

            )
        }
    }

    handleClose = () => {
        this.setState({
            show: false
        })
    }

    handleShow = () => {
        this.setState({
            show: true
        })
    }
    render() {

        const { message } = this.state
        const { typeMessage } = this.state
        const { show } = this.state
        const { AllRoles } = this.state
        return (
            <div id="wrapper">
                <Leftside></Leftside>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Header />

                        <Modal show={show} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Utilisateurs roles</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                l'utilisateur est autorisé aux roles suivants:
                                {this.state.userRoles && this.state.userRoles.map(r =>
                                    <ul><li>{r.name}</li></ul>
                                )}
                            </Modal.Body>

                            {/* <Modal.Footer>
                                <Button variant="primary" onClick={this.handleClose}>Close</Button>
                            </Modal.Footer> */}
                        </Modal>

                        <div class="container-fluid">
                            {message && (
                                <div className="form-group">
                                    <div className={typeMessage} role="alert">
                                        {message}
                                    </div>
                                </div>
                            )}
                            <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h6 class="m-0 font-weight-bold text-primary">Gestion des roles</h6>
                                </div>
                                <div class="card-body">
                                    {/* affecter un role */}
                                    <div class="border-left-danger shadow p-2 mb-4">
                                        <h6 class="m-0 font-weight-bold col-form-label col-6 mb-4">Affecter un role</h6>
                                        <div class="form-group row col-6">
                                            <div class="col-3">
                                                <label>Login</label>
                                            </div>
                                            <div class="col-6">
                                                <input tyoe="text" class="form-control" onChange={this.onChangeUserToAddRole} />
                                            </div>

                                        </div>
                                        <div class="form-group row col-6">
                                            <div class="col-3">
                                                <label>Role</label>
                                            </div>
                                            <div class="col-6">
                                                <select class="form-control small"
                                                    aria-label="Search" aria-describedby="basic-addon2" onChange={this.onChangeRoleToAddRole}>
                                                    <option value=""></option>
                                                    {AllRoles.map((r, i) =>
                                                        <option value={r.name} key={"rl" + i}>{r.name}</option>
                                                    )}
                                                </select>

                                            </div>
                                        </div>
                                        <div class="form-group row col-6">
                                            <div class="col-6">
                                                <button class="btn btn-primary" onClick={this.affectRoleToUser}>Affecter</button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* utilisateur role */}
                                    <div class="border-left-danger shadow p-2 mb-4">
                                        <h6 class="m-0 font-weight-bold col-form-label col-6 mb-4">Utilisateur roles</h6>
                                        <div class="form-group row col-6">
                                            <div class="col-3">
                                                <label>Login</label>
                                            </div>
                                            <div class="col-6">
                                                <div class="input-group">
                                                    <input tyoe="text" class="form-control" onChange={this.onChangeUserToGetRoles} />
                                                    <div class="input-group-append">
                                                        <button class="btn btn-primary" onClick={this.getUserRoles}>
                                                            <i class="fas fa-search fa-sm"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    {/* supprimer un role */}
                                    <div class="border-left-danger shadow p-2 mb-4">
                                        <h6 class="m-0 font-weight-bold col-form-label col-6 mb-4">Supprimer un role</h6>
                                        <div class="form-group row col-6">
                                            <div class="col-3">
                                                <label>Login</label>
                                            </div>
                                            <div class="col-6">
                                                <input tyoe="text" class="form-control" onChange={this.onChangeUserToDeleteRole} />
                                            </div>

                                        </div>
                                        <div class="form-group row col-6">
                                            <div class="col-3">
                                                <label>Role</label>
                                            </div>
                                            <div class="col-6">
                                                <select class="form-control small"
                                                    aria-label="Search" aria-describedby="basic-addon2" onChange={this.onChangeRoleToDeleteRole}>
                                                    <option value=""></option>
                                                    {AllRoles.map((r, i) =>
                                                        <option value={r.name} key={"rl" + i}>{r.name}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group row col-6">
                                            <div class="col-6">
                                                <button class="btn btn-primary" onClick={this.deleteUserRole}>Supprimer</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Roles;