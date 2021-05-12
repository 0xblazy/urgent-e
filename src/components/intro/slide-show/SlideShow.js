import React from 'react';
import './SlideShow.css';

import Translator from '../../../utils/Translator';

export default class SlideShow extends React.Component {

    constructor(props) {
        super(props);
    }

    slide_image = () => {
        switch (this.props.step) {
            case 1:
                return "./images/intro/medicine.svg";
            case 2:
                return "./images/intro/watch_application.svg";
            case 3:
                return "./images/intro/injured.svg";
            case 4:
                return "./images/intro/my_location.svg";
            default:
                return "./images/intro/medicine.svg";
        }
    }

    render() {
        return (
            <div className="SlideShow">
                {/* Étape 0 */}
                {this.props.step === 0 && <h3>{Translator.translate("slogan", this.props.language)}</h3>}

                {/* Étapes suivantes */}
                {
                    this.props.step !== 0 &&
                    <>
                        <img src={this.slide_image()} />
                        <h4>{Translator.translate("slide_" + this.props.step, this.props.language)}</h4>
                    </>
                }
            </div>
        );
    }
}