import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

import Navigation from './components/navigation/Navigation';
import Intro from './components/intro/Intro';
import Dashboard from './components/dashboard/Dashboard';
import Confidentiality from './components/confidentiality/Confidentiality';
import MyInformations from './components/my-informations/MyInformations';
import Emergency from './components/emergency/Emergency';

import Translator from './utils/Translator'; 

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            language: "fr",
            intro: true
        }
    }

    on_language_change = (language) => {
        this.setState({
            language: language
        });
    }

    on_intro_change = (intro) => {
        this.setState({
            intro: intro
        });
    }

    render() {
        return (
            <div className="App">
                <Router>
                    
                    {/* Affiche la navigation si on n'est pas dans l'intro */}
                    {! this.state.intro && <Navigation language={this.state.language} />}

                    <Switch>
                        <Route path="/" exact render={
                            () => <Dashboard language={this.state.language} />
                        } />
                        <Route path="/intro" exact render={
                            () => <Intro language={this.state.language} 
                            onIntroChange={(intro) => this.on_intro_change(intro)} 
                            onLanguageChange={(language) => this.on_language_change(language)} />
                        } /> 
                        <Route path="/confidentiality" exact render={
                            () => <Confidentiality language={this.state.language} />
                        } />
                        <Route path="/my-informations" exact render={
                            () => <MyInformations language={this.state.language} />
                        } /> 
                        <Route path="/emergency" exact render={
                            () => <Emergency language={this.state.language} />
                        } />
                        <Route path="/" render={
                            ()=> <div>{Translator.translate("error", this.state.language)}</div>
                        } />
                    </Switch>
                </Router>
            </div>
        );
    }
}
