import React from 'react';
import './IgnoreButton.css';

import Translator from '../../../utils/Translator';

export default class IgnoreButton extends React.Component {

    render() {
        return (
            <div className="IgnoreButton">
                <button onClick={() => {this.props.onShowIgnoreChange(false); this.props.onAlertChange(false)}}>{Translator.translate("ignore", this.props.language)}</button>
            </div>
        );
    }
}