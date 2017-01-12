import React, { Component } from 'react';

class Editor extends Component {
  constructor() {
    super();

    this.state = {text: '', title: ''};
  }

  render() {
    return (
      <div>
        <input />
        <textarea>
        </textarea>
        <button> Done </button>
      </div>
    );
  }
}

export default Editor;
