import React from 'react';
import './IgnoreButton.css';

import Translator from '../../../utils/Translator';

export default class IgnoreButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            countdown: this.props.alertCritical ? this.props.countdown : null
        }

        this.timer = null;
    }

    componentDidMount() {
        // Mise en place du décompte si il s'agit d'une alerte critique
        if (this.props.alertCritical) {
            this.timer = setInterval(() => {
                if (this.state.countdown > 0) {
                    this.setState({
                        countdown: this.state.countdown - 1
                    }, () => {
                        // Affiche le message de contact lorsque le décompte atteint 0
                        if (this.state.countdown === 0) {
                            this.props.onShowIgnoreChange(false);
                            this.props.onAlertChange(false);
                            this.props.onAlertCriticalChange(false);
                            this.props.onContactEmergencyChange(true);
                        }
                    });
                }
            }, 1000);
        }
    }

    componentWillUnmount() {
        if (this.props.alertCritical) clearInterval(this.timer);
    }

    render() {
        return (
            <div className="IgnoreButton">

                {/* Affiche le décompte si il s'agit d'une alerte critique */}
                {
                    this.props.alertCritical &&
                    <h3>{Translator.translate("we_contact", this.props.language)} <span className="countdown">{this.state.countdown}</span> SECONDES</h3>
                }

                <button onClick={() => {
                    this.props.onShowIgnoreChange(false);
                    this.props.onAlertChange(false);
                    this.props.onAlertCriticalChange(false);
                }}>{Translator.translate("ignore", this.props.language)}</button>
            </div>
        );
    }
}