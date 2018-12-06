import React, { Component } from 'react';
import Menu from './components/Menu';
import PrimaryView from './components/PrimaryView';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="bob">
        <Menu/>,
        <br></br>
      <PrimaryView/>
      </div>
      
    );
  }
}

export default App;
