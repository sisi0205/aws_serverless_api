import React, { Component, Fragment } from 'react';
import File from './File';
import axios from "axios";

const config = require('../config.json');


export default class FileQuery extends Component {

  state = {
    query: {
      "fileType": "csv",
      "fileName": "csv"
    },
    files: []
  }


  handleQuery = async (fileType, fileName, event) => {

//    event.preventDefault();
    try {
      const params = {
        "fileType": this.fileType
      };
      const res = await axios.get(`${config.api.invokeUrl}/test`,{params});
      const files = res.data;
      console.log(res.data.body);
//      console.log(files);
      this.setState({ query: { "fileType" : "","fileName" : "" }});
      this.setState({ files: files});
    }catch (err) {
      console.log(`An error has occurred: ${err}`);
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

  onFileTypeChange = event => this.setState({ query: { ...this.state.query, "fileType": event.target.value} });
  onFileNameChange = event => this.setState({ query: { ...this.state.query, "fileName": event.target.value} });

  render() {
    return(
       <Fragment>
         <section className="section">
           <div className="container">
             <h1>File List</h1>
             <br/>
             <div className="columns">
               <div className="tile is-ancestor">
                  <div className="tile is-4 is-parent  is-vertical">
                    {
                      this.state.files && this.state.files.length > 0
                      ? this.state.files.map(file => <File name={file.fileName} type={file.fileType} path={file.filePath} key={file.fileName} />)
                      : <div className="tile notification is-warning">No Files available</div>
                    }
                  </div>
                </div>
             </div>
           </div>
         </section>
       </Fragment>
    )
  }

}