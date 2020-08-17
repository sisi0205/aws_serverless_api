import React, { Component, Fragment } from 'react';
import File from './File';
import axios from "axios";
const config = require('../config.json');

export default class FileAdmin extends Component {
  state = {
    query: {
      "fileType": "",
      "fileName": "",
      "filePath": ""
    },
    files: []
  }

  handleQuery = async (fileType, fileName, event) => {
  }

  handleMLEdit = async (fileName,event) => {
    try {
      const res = await axios.get(`${config.api.invokeUrl}/ai/${fileName}`);
      console.log(res.data)
      const fileType = res.data;
      const fileToUpdate = [...this.state.files].find(file => file.fileName === fileName);
      const updatedFiles = [...this.state.files].filter(file => file.fileName !== fileName);
      fileToUpdate.fileType = fileType;
      updatedFiles.push(fileToUpdate);
      this.setState({files: updatedFiles});
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  handleAddFile = async (fileName, filePath, event) => {
    event.preventDefault();
//    // add call to AWS API Gateway add product endpoint here
    try {
      const params = {
        "fileName": fileName,
        "filePath": filePath
      };
      await axios.post(`${config.api.invokeUrl}/files/${fileName}`, params);
      this.setState({ files: [...this.state.files, this.state.query] });
      this.setState({ query: { "filePath": "", "fileName": "" }});
    }catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  handleUpdateFile = async (fileName, fileType) => {
    try {
      const params = {
        "fileName": fileName,
        "fileType": fileType
      };
      await axios.patch(`${config.api.invokeUrl}/files/${fileName}`, params);
      const fileToUpdate = [...this.state.files].find(file => file.fileName === fileName);
      const updatedFiles = [...this.state.files].filter(file => file.fileName !== fileName);
      fileToUpdate.fileType = fileType;
      updatedFiles.push(fileToUpdate);
      this.setState({files: updatedFiles});
    }catch (err) {
      console.log(`Error updating product: ${err}`);
    }
  }

  handleDeleteFile = async (fileName, event) => {
    event.preventDefault();
    // add call to AWS API Gateway delete product endpoint here
    try {
      await axios.delete(`${config.api.invokeUrl}/files/${fileName}`);
      const updatedFiles = [...this.state.files].filter(file => file.fileName !== fileName);
      this.setState({files: updatedFiles});
    }catch (err) {
      console.log(`Unable to delete product: ${err}`);
    }
  }
  fetchFiles = async () => {
    // add call to AWS API Gateway to fetch products here
    // then set them in state
    try {
      const res = await axios.get(`${config.api.invokeUrl}/files`);
      const files = res.data;
      console.log(files);
      this.setState({ files: files });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }
  componentDidMount = () => {
    this.fetchFiles();
  }


  onFileNameChange = event => this.setState({ query: { ...this.state.query, "fileName": event.target.value } });
  onFileTypeChange = event => this.setState({ query: { ...this.state.query, "fileType": event.target.value } });
  onFilePathChange = event => this.setState({ query: { ...this.state.query, "filePath": event.target.value } });


  render() {
   return (
     <Fragment>
      <section className="section">
        <div className="container">
          <h1> MetaData Management</h1>
            <p className="subtitle is-5">Edit and remove file using the form below:</p>
            <br />
            <div className="columns">
             <div className="column is-one-third">
               <form onSubmit={event => this.handleAddFile(this.state.query.fileName, this.state.query.filePath, event)}>
                 <div className = "query condition">
                    <div>
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Enter File Name"
                        value={this.state.query.fileName}
                        onChange={this.onFileNameChange}
                      />
                    </div>
                    <div className = "Control">
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Enter File Path"
                        value={this.state.query.filePath}
                        onChange={this.onFilePathChange}
                      />
                    </div>
                    <div className="control">
                      <button type="submit" className="button is-primary is-medium">
                        Submit
                      </button>
                    </div>
                 </div>
               </form>
             </div>
             <div className="column is-two-thirds">
               <div className="tile is-ancestor">
                 <div className="tile is-4 is-parent  is-vertical">
                 {
                   this.state.files.map((file, index) =>
                        <File
                          isAdmin={true}
                          handleMLEdit = {this.handleMLEdit}
                          handleUpdateFile={this.handleUpdateFile}
                          handleDeleteFile={this.handleDeleteFile}
                          name={file.fileName}
                          type={file.fileType}
                          path={file.filePath}
                          key={file.fileName}
                        />
                        )
                  }
                 </div>
               </div>
             </div>
            </div>
        </div>
      </section>
     </Fragment>
   )

  }

}