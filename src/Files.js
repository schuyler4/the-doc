import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

class Files extends Component {
  onClick() {
    console.log("panda");
    /*axios.post('http://localhost:4000/docs')
      .then((response) => {

      });*/
  }

  render() {
    return (
      <div>
        <Link to={`/doc`}>
          <button onClick={this.onClick.bind(this)}>
            New Doc
          </button>
        </Link>
      </div>
    );
  }
}

export default Files;
