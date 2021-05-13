import React from 'react';
import './NextPageButton.css';

import Translator from '../../../utils/Translator';

export default class NextPageButton extends React.Component {

    small_class = () => {
        return this.props.step !== 0 ? " small" : "";
    }

    dot_class = (index) => {
        return this.props.step === index ? "dot active" : "dot";
    }

    skip_or_finish = () => {
        return this.props.step === 4 ? Translator.translate("finish", this.props.language) : Translator.translate("skip", this.props.language) ;
    }

    render() {
        return (
            <div className={"NextPageButton" + this.small_class()}>
                {/* Étape 0 */}
                {
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
                        <button className={this.dot_class(4)} onClick={() => this.props.onStepChange(4)}></button>
                        <button className="skip" onClick={() => this.props.onStepChange(5)}>{this.skip_or_finish()}</button>
                    </div>
                }
            </div>
        );
    }
}