import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router';
import { Home } from './components/Home';

export default class App extends Component {

  render() {
    return (
      <div style={{ padding: '20px 15%' }}>
        <Route exact path='/' component={Home} />
      </div>
    );
  }
}