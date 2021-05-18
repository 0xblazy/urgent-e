import React from 'react';
import './SlideShow.css';

import Translator from '../../../utils/Translator';

export default class SlideShow extends React.Component {

    createSlider = () => {
        let slider = [];
        
        for (let i = 1 ; i <= 4 ; i++) {
            slider.push(
                <div className={"step-" + i} key={i}>
                    <img src={this.slideImage(i)} alt={"Slide " + i} />
                </div>
            )
        }
        
        return slider;
    }

    slideImage = (step) => {
        switch (step) {
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

    getSliderClassname = () => {
        return "slider-container step-" + this.props.step;
    }

    createLegend = () => {
        let legend = [];

        for (let i = 1 ; i < 5 ; i++) {
            legend.push(
                <h4 id={"step-" + i} key={i}>{Translator.translate("slide_" + i, this.props.language)}</h4>
            );
        }

        return legend;
    }

    getLegendClassname = () => {
        return "legend step-" + this.props.step;
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
                        <div className="slideshow-container">
                            <div className={this.getSliderClassname()}>
                                {this.createSlider()}
                            </div>
                        </div>
                        <div className={this.getLegendClassname()}>
                            {this.createLegend()}
                        </div>
                    </>
                }
            </div>
        );
    }
}