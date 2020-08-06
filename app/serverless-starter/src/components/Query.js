import React, { Component, Fragment } from 'react';

export default class Query extends Component {
  render() {
    return (
      <div className="column is-one-third">


      <form onSubmit={event => this.handleQuery(this.state.query.fileName, this.state.query.fileType, event)}>
                  <div className = "query condition">
                    <div className = "Control">
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Enter File Name"
                        value={this.state.query.fileName}
                        onChange={this.onFileNameChange}
                      />
                    </div>
                    <div>
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Enter File Type"
                        value={this.state.query.fileType}
                        onChange={this.onFileTypeChange}
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
    )
  }
}