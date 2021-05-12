import React from 'react';
import {withRouter} from 'react-router-dom';
import './Intro.css';

import SwitchLanguageButton from './switch-language-button/SwitchLanguageButton';
import SlideShow from './slide-show/SlideShow';
import NextPageButton from './next-page-button/NextPageButton';

class Intro extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            step: 0
        }
    }

    componentDidMount() {
        this.props.onIntroChange(true);
    }

    on_step_change = (new_step) => {
        this.setState({
            step: new_step
        }, () => {
            // Renvoi à l'accueil après avoir passé l'intro
            if (this.state.step > 4) {
                const {history} = this.props;

                if (history) {
                    this.props.onIntroChange(false);
                    history.push("/");
                }
            }
        });
    }

    small_class = () => {
        return this.state.step !== 0 ? " small" : "";
    }

    render() {
        return (
            <div className={"Intro" + this.small_class()}>

                <SwitchLanguageButton language={this.props.language} onLanguageChange={this.props.onLanguageChange} />

                <div className="logo-container">
                    <img alt="Logo Urgent-E" src="./images/Urgent-E.png" />
                    <h1>URGENT-E</h1>
                </div>

                <SlideShow language={this.props.language} step={this.state.step} />

                <NextPageButton language={this.props.language} step={this.state.step} onStepChange={(step) => this.on_step_change(step)} />

                {
                    this.state.step === 0 &&
                    <footer>
                        <div>
                            2021 - Sofiane Adjaoud, Nicolas Carbonier, Inaya ElAlaoui, Isabelle PauloMinero - Université de Lorraine - Institut des Sciences du Digital - M1 Sciences Cognitives
                        </div>
                    </footer>
                }
            </div>
        );
    }
}

export default withRouter(Intro);