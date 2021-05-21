import React from 'react';
import {withRouter} from 'react-router-dom';
import './Dashboard.css';

import LinkDeviceButton from './link-device-button/LinkDeviceButton';
import Alert from './alert/Alert';
import IgnoreButton from './ignore-button/IgnoreButton';
import ContactEmergency from './contact-emergency/ContactEmergency';
import GridMetrics from './grid-metrics/GridMetrics';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            alert: false,
            alertCritical: false,
            showIgnore: false,
            contactEmergency: false
        }
    }

    componentDidMount() {
        this.props.onPathChange("/");

        // Redirige vers l'intro la première fois que l'on va sur l'application
        const visited = localStorage["alreadyVisited"];
        if (! visited) {
            localStorage["alreadyVisited"] = true;
            const {history} = this.props;
            if (history) history.push("/intro");
        } 
    }

    getClassName = () => {
        let c = "Dashboard";
        
        if (this.state.alert || this.state.alertCritical || this.state.contactEmergency) c += " alert";
        if (this.state.showIgnore) c += " show-ignore";

        return c;
    }

    onAlertChange = (alert) => {
        this.setState({
            alert: alert
        });
    }

    onAlertCriticalChange = (alertCritical) => {
        this.setState({
            alertCritical: alertCritical
        });
    }

    onShowIgnoreChange = (showIgnore) => {
        this.setState({
            showIgnore: showIgnore
        });
    }

    onContactEmergencyChange = (contactEmergency) => {
        this.setState({
            contactEmergency: contactEmergency
        });
    }

    render() {
        return (
            <div className={this.getClassName()}>

                {/* Affiche le bouton pour ignorer l'alerte */}
                {
                    this.state.showIgnore &&
                    <IgnoreButton 
                        language={this.props.language} 
                        alertCritical={this.state.alertCritical}
                        countdown="60"
                        onAlertChange={(alert) => this.onAlertChange(alert)}
                        onAlertCriticalChange={(alertCritical) => this.onAlertCriticalChange(alertCritical)}
                        onShowIgnoreChange={(showIgnore) => this.onShowIgnoreChange(showIgnore)}
                        onContactEmergencyChange={(contactEmergency) => this.onContactEmergencyChange(contactEmergency)} />
                }

                {/* Affiche le contenu principal si l'application ne contacte pas les urgences */}
                {
                    !this.state.contactEmergency &&
                    <>
                        <div className="info">
                            {
                                !this.state.alert &&
                                !this.state.alertCritical &&
                                <LinkDeviceButton language={this.props.language} user={this.props.user} />
                            }
                            {
                                (this.state.alert || this.state.alertCritical ) &&
                                <Alert 
                                    language={this.props.language} 
                                    alertCritical={this.state.alertCritical}
                                    onShowIgnoreChange={(showIgnore) => this.onShowIgnoreChange(showIgnore)} />
                            }
                        </div>
                        <GridMetrics language={this.props.language} />
                    </>
                }
                
                {/* Affiche le message de contact des urgences */}
                {
                    this.state.contactEmergency &&
                    <ContactEmergency language={this.state.language} onContactEmergencyChange={(contactEmergency) => this.onContactEmergencyChange(contactEmergency)} />
                }

            </div>
        );
    }
}

export default withRouter(Dashboard);