import React from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Intro from './components/intro/Intro';
import Home from './components/home/Home';
import Confidentiality from './components/confidentiality/Confidentiality';
import MyInformations from './components/my-informations/MyInformations';
import SwitchLanguageButton from './components/switch-language-button/SwitchLanguageButton';
import Translator from './utils/Translator'; 
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language:"fr"
        }
    }

    on_language_change = (language)=>{
        this.setState({
            language:language
        });
    }

    render() {
        return (
            <div className="App">
                <SwitchLanguageButton onLanguageChange={(language)=>this.on_language_change(language)} language={this.state.language} />
                <Router>
                    <Intro language={this.state.language} />
                    <Navigation language={this.state.language} />

                    <Switch>
                        <Route path="/" exact component={() => <Home language={this.state.language} />} />
                        <Route path="/confidentiality" exact component={() => <Confidentiality language={this.state.language} />} />
                        <Route path="/my-informations" exact component={() => <MyInformations language={this.state.language} />} /> 
                        <Route path="/" component={()=> <div>{Translator.translate("error", this.state.language)}</div>} />
                    </Switch>
                </Router>
            </div>
        );
    }
}
