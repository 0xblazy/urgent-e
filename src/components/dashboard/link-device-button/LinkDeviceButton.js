import React from 'react';
import {Link} from 'react-router-dom';
import './LinkDeviceButton.css';

import Translator from '../../../utils/Translator';

export default class LinkDeviceButton extends React.Component {

    render() {
        return(
            <div className="LinkDeviceButton">
                <Link to="/">
                    {
                        this.props.user &&
                        Translator.translate("hello", this.props.language) + " " + this.props.user.firstname.toUpperCase()
                    }
                    {
                        !this.props.user &&
                        Translator.translate("link_device", this.props.language)
                    }
                </Link>
            </div>
        )
    }
}