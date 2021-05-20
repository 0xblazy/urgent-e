import React from 'react';
import {withRouter} from 'react-router-dom';
import './Dashboard.css';

import LinkDeviceButton from './link-device-button/LinkDeviceButton';
import Alert from './alert/Alert';
import IgnoreButton from './ignore-button/IgnoreButton';
import GridMetrics from './grid-metrics/GridMetrics';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            alert: false,
            showIgnore: false
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
        
        if (this.state.alert) c += " alert";
        if (this.state.showIgnore) c += " show-ignore";

        return c;
    }

    onShowIgnoreChange = (showIgnore) => {
        this.setState({
            showIgnore: showIgnore
        });
    }

    onAlertChange = (alert) => {
        this.setState({
            alert: alert
        });
    }

    render() {
        return (
            <div className={this.getClassName()}>
                {
                    this.state.showIgnore &&
                    <IgnoreButton 
                        language={this.props.language} 
                        onAlertChange={(alert) => this.onAlertChange(alert)}
                        onShowIgnoreChange={(showIgnore) => this.onShowIgnoreChange(showIgnore)} />
                }
                <div className="info">
                    {
                        !this.state.alert &&
                        <LinkDeviceButton language={this.props.language} user={this.props.user} />
                    }
                    {
                        this.state.alert &&
                        <Alert 
                            language={this.props.language} 
                            onShowIgnoreChange={(showIgnore) => this.onShowIgnoreChange(showIgnore)} />
                    }
                </div>
                <GridMetrics language={this.props.language} />
            </div>
        );
    }
}

export default withRouter(Dashboard);