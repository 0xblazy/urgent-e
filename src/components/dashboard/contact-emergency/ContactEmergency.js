import React from 'react';
import './ContactEmergency.css';

import Translator from '../../../utils/Translator';

export default class ContactEmergency extends React.Component {

    render() {
        return (
            <div className="ContactEmergency">
                <div className="not-respond">
                    <h3>{Translator.translate("not_respond_1", this.props.language)}</h3>
                    <h3>{Translator.translate("not_respond_2", this.props.language)}</h3>
                </div>
                <button className="not-contact"
                    onClick={() => {this.props.onContactEmergencyChange(false)}}>
                        {Translator.translate("not_contact", this.props.language)}
                </button>
            </div>
        );
    }
}