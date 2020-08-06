import React, { Component, Fragment }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class FileAdmin extends Component {
  state = {
    isEditMode: false,
    updateFileType: this.props.type
  }
  handleFileEdit = event => {
    event.preventDefault();
    this.setState({ isEditMode: true });
  }

  handleEditSave = event => {
    event.preventDefault();
    this.setState({ isEditMode: false });
    this.props.handleUpdateFile(this.props.name, this.state.updateFileType);
  }


  onFileTypeChange = event => this.setState({ "updateFileType": event.target.value });

  render() {
    return (
    <div className="tile is-child box notification is-success">
      {
          this.props.isAdmin &&
          <Fragment>
            <FontAwesomeIcon icon={["fal", "coffee"]} />
            <a href="/" onClick={this.handleFileEdit} className="product-edit-icon">
              <FontAwesomeIcon icon="edit" />
            </a>
            <button onClick={event => this.props.handleDeleteFile(this.props.name, event)} className="delete"></button>
          </Fragment>
        }
        {
          this.state.isEditMode
          ? <div>
              <p>Edit File Type</p>
              <input
                className="input is-medium"
                type="text"
                placeholder="Enter type"
                value={this.state.updateFileType}
                onChange={this.onFileTypeChange}
              />
              <p className="product-id">id: { this.props.type }</p>
              <button type="submit"
                className="button is-info is-small"
                onClick={ this.handleEditSave }
              >save</button>
            </div>
          : <div>
              <p className="product-title">File Type: { this.props.type }</p>
              <p className="product-id">File Name: { this.props.name }</p>
              <p className="product-id">File Path: { this.props.path }</p>
            </div>
        }
      </div>
    )

  }


}