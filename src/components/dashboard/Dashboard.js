import React from 'react';
import './Dashboard.css';
import Translator from '../../utils/Translator'; 

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="Dashboard">
                <h1>{Translator.translate("dashboard", this.props.language)}</h1>
            </div>
        );
    }
}