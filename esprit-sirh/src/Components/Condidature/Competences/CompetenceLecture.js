import React, { Component } from "react";
import { connect, Provider } from "react-redux";
class CompetenceLecture extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            empty: false,
        };
    }

    componentDidMount() {
        if (this.props.condidatReducer.competences == null || this.props.condidatReducer.competences.length == 0 ) {
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
                                <th >Compétence </th>
                                <th >Description </th>

                            </tr>
                  </thead>
                 
                        <tbody>
                            {this.props.items.map((item, index) =>
                                <tr key={index}>
                                    <td >
                                        {item.titre}
                                    </td>
                                    <td >
                                        {item.description}
                                    </td>

                                </tr>
                            )}
                        </tbody>

              </table>
                )}
                   {(this.state.empty &&  
                        <div className="card border-left-danger shadow">
                            <div className="card-body">
                                Aucune compétence ajoutée
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
export default connect(mapStateToProps)( CompetenceLecture);