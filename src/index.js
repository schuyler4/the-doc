import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Editor from './Editor';
import Files from './Files';
import Form from './Form';

const login = ()=> <Form type='login' />
const signup = ()=> <Form type='signup' />


render((
  <Router history={browserHistory}>
    <Route path="/" component={Files} />
    <Route path="/doc" component={Editor} />
    <Route path="/login" component={login} type={'login'} />
    <Route path="/signup" component={signup} type={'signup'} />
  </Router>
), document.getElementById('root'))
