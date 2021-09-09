import React, { Component } from "react";
class DocumentModif extends React.Component{

    render(){

        return(

            <div className="col-md-6 form-group row">

            {document.getElementById(this.props.id) &&
              !document.getElementById(this.props.id).value && (
                <div class="col-6">
                <a  href={this.props.path} target="blanck">
                  {this.props.name}
                </a>
                </div>
              )}
            {document.getElementById(this.props.id) &&
              document.getElementById(this.props.id).value && (
                <div class="col-6">
                <span >
                  {this.props.name}
                </span>
                </div>

              )}
            <input
              type="file"
              id={this.props.id}
              className="form-control form-control-sm selectedFile"
              name="file"
              onChange={this.props.onChangeFile}
              accept={this.props.accept}
            />
            <input type="button" value="Choisir un fichier" onClick={this.props.fileClick} />
          </div>
        )
    }
}

export default DocumentModif