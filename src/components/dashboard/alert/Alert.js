import React from 'react';
import './Alert.css';

import Translator from '../../../utils/Translator';

export default class Alert extends React.Component {

    componentDidMount() {
        setTimeout(function() {
            this.props.onShowIgnoreChange(true);
        }.bind(this), 5000);
    }

    render() {
        return (
            <div className="Alert">
                <img src="images/dashboard/warning.svg" alt="Warning" />
                <p>{Translator.translate("alert_1", this.props.language)}</p>
                <p>{Translator.translate("alert_2", this.props.language)}</p>
            </div>
        );
    }
}