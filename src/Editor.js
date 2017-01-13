import React, { Component } from 'react';
import axios from 'axios';
import Loading from './Loading';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';

class Editor extends Component {
  constructor() {
    super();

    this.state = {
      content: '',
      title: '',
      doc: {},
      fetchedData: false,
      status: ''
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/docs/last')
      .then((res) => {
        this.setState({ doc: res.data, fetchedData: true });
    });
  }

  checkAuth() {
    if(!cookie.load('userId')) {
      browserHistory.push('/login');
    }
  }

  onChange(event) {
    if(event.target.id === 'title') {
      this.setState({title: event.target.value});
    }
    else if(event.target.id === 'content') {
      this.setState({content: event.target.value});
    }
    this.save();
  }

  save() {
    console.log(this.state.doc._id)
    axios.put('http://localhost:4000/docs/edit', {
      id: this.state.doc._id,
      title: this.state.title,
      content: this.state.content
    })
    .then(function(response) {
      console.log(response)
    });
  }


  doneOnPress() {
    browserHistory.push('/');
  }

  render() {
    this.checkAuth();

    if(!this.state.fetchedData) {
      return (
        <Loading />
      )
    } else {
      return (
        <div>
          <input
            id="title"
            value={this.state.title}
            onChange={this.onChange.bind(this)}
          />
          <textarea
            id="content"
            value={this.state.content}
            onChange={this.onChange.bind(this)}
          />
        <button onClick={this.doneOnPress}> Done </button>
        </div>
      );
    }
  }
}

export default Editor;
