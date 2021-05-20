import React from 'react';
import './NextPageButton.css';

import Translator from '../../utils/Translator';

export default class NextPageButton extends React.Component {

    getClassName = () => {
        return this.props.step !== 0 ? "NextPageButton small" : "NextPageButton";
    }

    dotClass = (index) => {
        let c = "dot";

        if (this.props.step === index) c += " active";
        if (this.props.locked_step > 0 && this.props.locked_step < index) c += " locked";
        if (this.props.locked_step === -1) c += " locked";

        return c;
    }

    skipOrFinish = () => {
        if (this.props.path === "/intro" || this.props.path === "/intro/slideshow") {
            return this.props.step === 4 ? Translator.translate("finish", this.props.language) : Translator.translate("skip", this.props.language);
        } else if (this.props.path === "/my-informations" || this.props.path === "/emergency") {
            return this.props.step === 3 ? Translator.translate("finish", this.props.language) : Translator.translate("cancel", this.props.language) ;
        } else if (this.props.path === "/emergency/transferred") {
            return this.props.step === 3 ? Translator.translate("back_dashboard", this.props.language) : (this.props.step === 2 ? Translator.translate("finish", this.props.language) : Translator.translate("cancel", this.props.language));
        }
    }

    skipOrFinishStep = () => {
        if (this.props.path === "/intro" || this.props.path === "/intro/slideshow") {
            return this.props.step === 4 ? 5 : 10;
        } else if (this.props.path === "/my-informations" || this.props.path === "/emergency") {
            return this.props.step === 3 ? 4 : 10;
        } else if (this.props.path === "/emergency/transferred") {
            return this.props.step === 2 ? 3 : (this.props.step === 3 ? 4 : 10);
        }
    }

    render() {
        return (
            <div className={this.getClassName()}>
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
                        <button className={this.dotClass(1)} onClick={() => this.props.onStepChange(1)}></button>
                        <button className={this.dotClass(2)} onClick={() => this.props.onStepChange(2)}></button>
                        <button className={this.dotClass(3)} onClick={() => this.props.onStepChange(3)}></button>

                        {/* 4ème bouton pour l'intro */}
                        {
                            this.props.path === "/intro/slideshow" &&
                            <button className={this.dotClass(4)} onClick={() => this.props.onStepChange(4)}></button>
                        }
                        
                        <button type="submit" className="skip" onClick={() => this.props.onStepChange(this.skipOrFinishStep(), true)}>{this.skipOrFinish()}</button>
                    </div>
                }
            </div>
        );
    }
}