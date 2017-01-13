import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';

class Form extends Component {
  constructor(props) {
    super(props)

    this.state = {
      usernameText: '',
      passwordText: '',
      users: {},
      duplacate: false,
      error: false
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/')
      .then((res) => {
        this.setState({ users: res.data });
    });
  }

  checkInput() {
    setInterval(() => {
      if(this.props.type === 'login') {
        for(let i = 0; i < this.state.users.length; i++) {
          if(this.state.usernameText === this.state.users[i].username &&
            this.state.passwordText === this.state.users[i].password) {
              cookie.save('userId', this.state.users[i]._id, { path: '/' });
              browserHistory.push('/');
              break;
          }
        }
      }
      else if(this.props.type === 'signup') {
        for(let i = 0; i < this.state.users.length; i++) {
          if(this.state.usernameText === this.state.users[i]) {
            this.setState({duplacate: true})
          }
        }
      }
    }, 1000);
  }

  signup() {
    if(this.props.type === 'signup') {
      axios.post('http://localhost:4000/user', {
        username: this.state.username,
        password: this.state.password
      })
      .then((response) => {
        cookie.save('userId', response.data._id, { path: '/' });
        browserHistory.push('/')
      })
      .catch((error) => {
        this.setState({error: true})
      })
    }
  }

  renderError() {
    if(this.state.error) {
      return <h1>There Was An error Logging in</h1>
    }
  }

  renderSignup() {
    if(this.props.type === 'signup') {
      return <button onClick={this.signup.bind(this)}>Sign Up</button>
    }
  }

  render() {
    this.renderError();
    this.renderSignup();
    this.checkInput()

    return (
      <div className="container">
        <input placeholder="username" onChange={(event) => {
            this.setState({ usernameText: event.target.value,duplacate: false});
        }}/>
      <input placeholder="password" onChange={(event) => {
          this.setState({ passwordText: event.target.value,duplacate: false});
        }}/>
      {this.renderSignup()}
      </div>
    );
  }
}

export default Form;
