import React from 'react';
import {withRouter} from 'react-router-dom';
import './Dashboard.css';

import GridMetrics from './grid-metrics/GridMetrics';
import LinkDeviceButton from './link-device-button/LinkDeviceButton';

class Dashboard extends React.Component {

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

    render() {
        return (
            <div className="Dashboard">
                <LinkDeviceButton language={this.props.language} user={this.props.user}/>
                <GridMetrics language={this.props.language}/>
            </div>
        );
    }
}

export default withRouter(Dashboard);