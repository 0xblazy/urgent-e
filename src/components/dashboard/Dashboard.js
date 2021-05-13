import React from 'react';
import './Dashboard.css';
import Translator from '../../utils/Translator'; 

export default class Dashboard extends React.Component {

    componentDidMount() {
        this.props.onPathChange("/");
    }

    render() {
        return (
            <div className="Dashboard">
                <h1>{Translator.translate("dashboard", this.props.language)}</h1>
            </div>
        );
    }
}