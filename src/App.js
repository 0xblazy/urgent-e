import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

import LogoContainer from './components/logo-container/LogoContainer';
import Navigation from './components/navigation/Navigation';
import EmergencyButton from './components/emergency-button/EmergencyButton';
import Intro from './components/intro/Intro';
import Dashboard from './components/dashboard/Dashboard';
import Confidentiality from './components/confidentiality/Confidentiality';
import MyInformations from './components/my-informations/MyInformations';
import Emergency from './components/emergency/Emergency';
import EmergencyTransferred from './components/emergency/emergency-transferred/EmergencyTransferred';

import Translator from './utils/Translator'; 

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            language: "fr",
            path: "/",
            user: null,
            emergency_request: null
        }
    }

    componentDidMount() {
        let user = localStorage["user"];
        if (user) {
            user = JSON.parse(user);
            this.setState({
                user: user
            });
        }
    }

    onLanguageChange = (language) => {
        this.setState({
            language: language
        });
    }

    onPathChange = (path) => {
        this.setState({
            path: path
        });
    }

    onUserChange = (user) => {
        this.setState({
            user: user
        });

        localStorage["user"] = JSON.stringify(user, null, 2);
    }

    onEmergencyRequestChange = (emergency_request) => {
        for (const [name, value] of Object.entries(emergency_request)) {
            this.setState(prevState => ({
                emergency_request: {
                    ...prevState.emergency_request,
                    [name]: value
                }
            }));
        }
    }

    onEmergencyRequestReset = () => {
        this.setState({
            emergency_request: null
        });
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <LogoContainer path={this.state.path} onEmergencyRequestReset={() => this.onEmergencyRequestReset()} />
                    {
                        (this.state.path === "/" || this.state.path === "/emergency") &&
                        <EmergencyButton language={this.state.language} path={this.state.path} />
                    }
                    
                    <Switch>
                        <Route path="/" exact render={
                            () => <Dashboard language={this.state.language}
                            user={this.state.user}
                            onPathChange={(path) => this.onPathChange(path)} />
                        } />
                        <Route path="/intro" exact render={
                            () => <Intro language={this.state.language}
                            path={this.state.path}
                            onLanguageChange={(language) => this.onLanguageChange(language)}
                            onPathChange={(path) => this.onPathChange(path)} />
                        } /> 
                        <Route path="/confidentiality" exact render={
                            () => <Confidentiality language={this.state.language}
                            onPathChange={(path) => this.onPathChange(path)} />
                        } />
                        <Route path="/my-informations" exact render={
                            () => <MyInformations language={this.state.language}
                            path={this.state.path}
                            user={this.state.user}
                            onLanguageChange={(language) => this.onLanguageChange(language)}
                            onPathChange={(path) => this.onPathChange(path)}
                            onUserChange={(user) => this.onUserChange(user)} />
                        } /> 
                        <Route path="/emergency" exact render={
                            () => <Emergency language={this.state.language}
                            path={this.state.path}
                            user={this.state.user}
                            emergency_request={this.state.emergency_request}
                            onLanguageChange={(language) => this.onLanguageChange(language)}
                            onPathChange={(path) => this.onPathChange(path)}
                            onEmergencyRequestChange={(emergency_request) => this.onEmergencyRequestChange(emergency_request)}
                            onEmergencyRequestReset={() => this.onEmergencyRequestReset()} />
                        } />
                        <Route path="/emergency/transferred" exact render={
                            () => <EmergencyTransferred language={this.state.language}
                            path={this.state.path}
                            user={this.state.user}
                            emergency_request = {this.state.emergency_request}
                            onLanguageChange={(language) => this.onLanguageChange(language)}
                            onPathChange={(path) => this.onPathChange(path)}
                            onEmergencyRequestChange={(emergency_request) => this.onEmergencyRequestChange(emergency_request)}
                            onEmergencyRequestReset={() => this.onEmergencyRequestReset()} />
                        } />
                        <Route path="/" render={
                            ()=> <div>{Translator.translate("error", this.state.language)}</div>
                        } />
                    </Switch>

                    {/* Affiche la navigation si on n'est pas dans l'intro */}
                    {
                        this.state.path !== "/intro" &&
                        this.state.path !== "/intro/slideshow" &&
                        this.state.path !== "/emergency" &&
                        this.state.path !== "/emergency/transferred" &&
                        this.state.path !== "/my-informations" &&
                        <Navigation language={this.state.language} />
                    }
                </Router>
            </div>
        );
    }
}
