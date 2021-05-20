import React from 'react';
import {Link} from 'react-router-dom';
import './EmergencyButton.css';

import Translator from '../../utils/Translator';

export default class EmergencyButton extends React.Component {

    getClassname = () => {
        return this.props.path === "/emergency" ? "EmergencyButton emergency" : "EmergencyButton";
    }

    render() {
        return (
            <div className={this.getClassname()}>
                <Link to="/emergency">
                    {Translator.translate("go_to_emergency", this.props.language)}
                </Link>
            </div>
        )
    }
}