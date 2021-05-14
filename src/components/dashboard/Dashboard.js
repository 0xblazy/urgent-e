import React from 'react';
import {withRouter} from 'react-router-dom';
import './Dashboard.css';
import Translator from '../../utils/Translator'; 

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
                <h1>{Translator.translate("dashboard", this.props.language)}</h1>
            </div>
        );
    }
}

export default withRouter(Dashboard);