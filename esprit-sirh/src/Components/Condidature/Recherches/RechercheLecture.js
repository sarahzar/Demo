import React, { Component } from "react";
import { connect, Provider } from "react-redux";
class RechercheLecture extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            empty: false,
        };
    }

    componentDidMount() {
        
            if (this.props.condidatReducer.recherches.length == 0) {
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

                            <tr className="d-flex">
                                <th  className="col-3">Thématique du recherche </th>
                                <th  className="col-2">Chapitre du livre </th>
                                <th  className="col-2">Article du journal </th>
                                <th  className="col-2">Article du conférence </th>
                                <th  className="col-2">Msstères de recherche </th>
                                <th  className="col-1">Théses </th>
                            </tr>
                        </thead>
                      
                            <tbody>
                            {this.props.items.map((item, index) =>
                                <tr key={index} className="d-flex" >
                                    <td className="col-3">
                                        {item.thematique.description}
                                    </td>
                                    <td className="col-2">
                                        {item.chapitreLivre}
                                    </td>
                                    <td className="col-2">
                                        {item.articleJornaux}
                                    </td>
                                    <td className="col-2">
                                        {item.articleConference}
                                    </td>
                                    <td className="col-2">
                                        {item.mastere}
                                    </td>
                                    <td className="col-1">
                                        {item.these}
                                    </td>
                                </tr>
                              )}
                            </tbody>
                       
                    </table>
                )}
                   {(this.state.empty &&  
                        <div className="card border-left-danger shadow">
                            <div className="card-body">
                                Aucune activité de recherche ajoutée
                            </div>
                        </div>
                    )}
                </div>

        )
    }


}
function mapStateToProps(state) {
  
    const { condidatReducer } = state.condidat;
    return {  condidatReducer };
  }
export default connect(mapStateToProps)(RechercheLecture);
