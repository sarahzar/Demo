import React, { Component } from "react";
class ParcourLecture extends React.Component {



    render() {

        return (



            <div className="col-lg-12 mb-4 ">

                <table className="table table-striped"  >
                    <thead>

                        <tr>
                            <th >Année </th>
                            <th >Nom du diplôme </th>
                            <th >Etablissement </th>
                            <th>Spécialité </th>
                            <th >Mention </th>
                            <th >Pays </th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.props.items.map((item, index) =>
                            <tr key={index}>
                                <td >
                                    {item.annee}
                                </td>
                                <td >
                                    {item.diplome.libelle}
                                </td>
                                <td >
                                    {item.etablissement.libelle}
                                </td>
                                <td >
                                    {item.specialite.libelle}
                                </td>
                                <td >
                                    {item.mention}
                                </td>
                                <td>
                                    {item.pays && item.pays.libelle}
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>


            </div>



        )
    }



}
export default ParcourLecture;