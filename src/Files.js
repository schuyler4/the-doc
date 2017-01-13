import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';
import Loading from './Loading';
import Logout from './Logout';

class Files extends Component {
  constructor() {
    super();

    this.state = {userId: cookie.load('userId'), fetchedData: false, user: {}}
  }

  checkAuth() {
    if(!this.state.userId) {
      browserHistory.push('/login');
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/' + this.state.userId + '/docs')
      .then((response) => {
        this.setState({ user: response.data, fetchedData: true })
      });
  }

  findDocuments() {
    return this.state.user.documents
  }

  onClick() {
    axios.post('http://localhost:4000/docs', {
      title: 'Untitled Document',
      content: '',
      _user: this.state.user
    });
  }

  render() {
    console.log(this.state.user._id)
    this.checkAuth();
    if(this.state.fetchedData) {
      return (
        <div className="container">
          <Logout />
          <Link to={`/doc`}>
            <h2>{this.state.user.username}</h2>
            <p>{this.state.user.password}</p>
            <p>{this.state.user.documents}</p>
            <button onClick={this.onClick.bind(this)}>
              New Doc
            </button>
          </Link>
        </div>
      );
    } else {
      return <Loading />
    }
  }

}

export default Files;
