import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';

class Form extends Component {
  constructor(props) {
    super(props)

    this.state = {
      usernameText: '',
      passwordText: '',
      users: {},
      duplacate: false
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
              browserHistory.push('/doc');
              break;
          }
        }
      }
      else if(this.props.type === 'login') {
        for(let i = 0; i < this.state.users.length; i++) {
          if(this.state.usernameText === this.state.users[i]) {
            this.setState({duplacate: true})
          }
        }
      }
    }, 1000);
  }

  signup() {
    axios.post('http://localhost:4000/user', {
      username: this.state.username,
      password: this.state.password
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  renderSignup() {
    if(this.props.type === 'signup') {
      return <button onClick={this.signup.bind(this)}>Sign Up</button>
    }
  }

  render() {
    if(this.props.type === 'login') {
      this.checkInput()
    }
    return (
      <div>
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
