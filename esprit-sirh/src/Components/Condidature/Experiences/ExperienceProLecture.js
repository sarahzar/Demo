import React, { Component } from "react";
import { connect, Provider } from "react-redux";
class ExperienceProLecture extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            empty: false,
        };
    }

    componentDidMount() {
        if (this.props.condidatReducer.experienceProfessionels == null || this.props.condidatReducer.experienceProfessionels.length == 0) {
            this.setState({
                empty: true
            })
        }
    }

    render() {

        return (



            <div className="col-lg-12 mb-4 ">
                {(!this.state.empty &&
                    <table className="table table-striped"  >
                        <thead>

                            <tr >
                                <th >Date de début </th>
                                <th >Date de fin </th>
                                <th >Etablissement </th>
                                <th >Poste </th>
                                <th >Pays </th>
                                <th >Ville </th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.props.items.map((item, index) =>
                                <tr key={index}>
                                    <td >
                                        {item.dateDebut}
                                    </td>
                                    <td >
                                        {item.dateFin}
                                    </td>
                                    <td >
                                        {item.etablissement.libelle}
                                    </td>
                                    <td >
                                        {item.poste.libelle}
                                    </td>
                                    <td >
                                        {item.pays.libelle}
                                    </td>
                                    <td >
                                        {item.ville}
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                )}
                {(this.state.empty &&
                    <div className="card border-left-danger shadow">
                        <div className="card-body">
                            Aucune experience professionelle ajoutée
                        </div>
                    </div>
                )}
            </div>


        )
    }


}
function mapStateToProps(state) {

    const { condidatReducer } = state.condidat;
    return { condidatReducer };
}
export default connect(mapStateToProps)(ExperienceProLecture);