import React from 'react';
import './NextPageButton.css';

import Translator from '../../utils/Translator';

export default class NextPageButton extends React.Component {

    get_class_name = () => {
        return this.props.step !== 0 ? "NextPageButton small" : "NextPageButton";
    }

    dot_class = (index) => {
        return this.props.step === index ? "dot active" : "dot";
    }

    skip_or_finish = () => {
        if (this.props.path === "/intro" || this.props.path === "/intro/slideshow") {
            return this.props.step === 4 ? Translator.translate("finish", this.props.language) : Translator.translate("skip", this.props.language) ;
        } else {
            return this.props.step === 3 ? Translator.translate("finish", this.props.language) : Translator.translate("cancel", this.props.language) ;
        }
    }

    render() {
        return (
            <div className={this.get_class_name()}>
                {/* Étape 0 (Intro) */}
                {
                    this.props.path === "/intro" &&
                    this.props.step === 0 &&
                    <button onClick={() => this.props.onStepChange(1)}>
                        {Translator.translate("next_page", this.props.language)}
                    </button>
                }

                {/* Étapes suivantes */}
                {
                    this.props.step !==0 &&
                    <div className="steps">
                        <button className={this.dot_class(1)} onClick={() => this.props.onStepChange(1)}></button>
                        <button className={this.dot_class(2)} onClick={() => this.props.onStepChange(2)}></button>
                        <button className={this.dot_class(3)} onClick={() => this.props.onStepChange(3)}></button>

                        {/* 4ème bouton pour l'intro */}
                        {
                            this.props.path === "/intro/slideshow" &&
                            <button className={this.dot_class(4)} onClick={() => this.props.onStepChange(4)}></button>
                        }
                        
                        <button className="skip" onClick={() => this.props.onStepChange(5)}>{this.skip_or_finish()}</button>
                    </div>
                }
            </div>
        );
    }
}