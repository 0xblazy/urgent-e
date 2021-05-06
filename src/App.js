import React from 'react';
import './App.css';
import WebApp from "./components/webapp/WebApp";
import SwitchLanguageButton from './components/switch-language-button/SwitchLanguageButton';

export default class App extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return <div className="App">
      <WebApp/>
    </div>
  }
}
