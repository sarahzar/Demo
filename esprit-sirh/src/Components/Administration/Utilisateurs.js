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
class Utilisateurs extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            activePage: 1,
            itemsCount: 1,
            itemsPerPage: 5,
            searchdResult: [],
            resultats: []
        }
    }

    componentDidMount() {
        this.handleSearch();
    }

    handleSearch = () => {

        AdminService.getAllUsers()
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
            i.username.includes(e.target.value)) : allItems

        this.setState({
            searchdResult: filtredItems
        })

    }
    handleLock = (e, i,username) => {
        let res = [...this.state.resultats]
        res[i].active = false;
        this.setState({
            resultats: res
        })
        AdminService.lockUser(username, false);
    }
    handleUnLock = (e, i,username) => {
        let res = [...this.state.resultats]
        res[i].active = true;
        this.setState({
            resultats: res
        })
        AdminService.lockUser(username, true);
    }
    handleUnCancelConfirm = (e, i,username) => {
        let res = [...this.state.resultats]
        res[i].aconfirmer = false;
        this.setState({
            resultats: res
        })
        AdminService.confirmUser(username, false);
    }
    handleConfirm = (e, i,username) => {
        let res = [...this.state.resultats]
        res[i].aconfirmer = true;
        this.setState({
            resultats: res
        })
        AdminService.confirmUser(username, true);
    }
    handleDelete = (e, i,username) => {
        let res = [...this.state.resultats]
        res.splice(i, 1)
        this.setState({
            resultats: res
        })
        AdminService.deleteUser(username);
    }
    render() {
        const { resultats } = this.state
        const { searchdResult } = this.state
        const indexOfLastItem = this.state.activePage * this.state.itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
        const items = searchdResult && searchdResult.length > 0 ? searchdResult.slice(indexOfFirstItem, indexOfLastItem) : resultats.slice(indexOfFirstItem, indexOfLastItem);
        // const selectedCondidat = items[this.state.indexCondidat]

        return (

            <div id="wrapper">
                <Leftside></Leftside>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Header />



                        <div class="container-fluid">

                            <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h6 class="m-0 font-weight-bold text-primary">Résultat</h6>
                                </div>
                                <div class="card-body table-responsive">
                                    <input type="text" id="search" onChange={this.handleSearchByName} placeholder="Rechercher.." class="form-control search-input sm col-3 my-2 float-right search btn-group" />
                                    <table class="table" >
                                        <thead>

                                            <tr className="d-flex">
                                                <th className="col-4">Login </th>
                                                <th className="col-2">Role </th>
                                                <th className="col-2">verouiller</th>
                                                <th className="col-2 ">confirmer</th>
                                                <th className="col-2 ">supprimer </th>

                                            </tr>
                                        </thead>

                                        <tbody>
                                            {resultats && items.map((res, index) =>
                                                <tr className="d-flex">
                                                    <td className="col-4">{res.username} </td>
                                                    <td className="col-2">{res.role}</td>
                                                    <td className="col-2">{!res.active && (<i class="fa fa-lock" aria-hidden="true" onClick={(e) => this.handleUnLock(e, index,res.username)}></i>)}
                                                        {res.active && (<i class="fa fa-unlock" aria-hidden="true" onClick={(e) => this.handleLock(e, index,res.username)}></i>)}</td>
                                                    <td className="col-2">{res.aconfirmer && (<i class="fas fa-user-check" onClick={(e) => this.handleUnCancelConfirm(e, index,res.username)}></i>)}
                                                        {!res.aconfirmer && (<i class="fas fa-user-times" onClick={(e) => this.handleConfirm(e, index,res.username)}></i>)}</td>
                                                    <td className="col-2"><i class="fa fa-trash" aria-hidden="true" onClick={(e) => this.handleDelete(e, index,res.username)}></i></td>

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

    return {
    };
}
const actionCreators = {
};
export default connect(mapStateToProps, actionCreators)(Utilisateurs);

