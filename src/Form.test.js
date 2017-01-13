import React from 'react';
import { render } from 'react-dom';
import { expect, assert } from 'chai'
import Form from './Form';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<Form type="login" />, div);
});

it('data shoudl be emty to start', () => {

});
