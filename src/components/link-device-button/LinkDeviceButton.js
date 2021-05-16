import React from 'react';
import './LinkDeviceButton.css';

import Translator from '../../utils/Translator';

export default class LinkDeviceButton extends React.Component {

    get_class_name = () => {
        return "LinkDeviceButton";
    }

    render() {
        return(
            <div className={this.get_class_name()}>
                <button>{Translator.translate("link_device", this.props.language)}</button>
            </div>
        )
    }
}