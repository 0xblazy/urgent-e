import React from 'react';
import {withRouter} from 'react-router-dom';
import './Intro.css';

import SwitchLanguageButton from '../switch-language-button/SwitchLanguageButton';
import SlideShow from './slide-show/SlideShow';
import NextPageButton from '../next-page-button/NextPageButton';

class Intro extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            step: 0
        }
    }

    componentDidMount() {
        this.props.onPathChange("/intro");
    }

    onStepChange = (new_step) => {
        this.setState({
            step: new_step
        }, () => {
            // Met à jour le path pour indiquer que l'on est dans le diapo
            if (this.state.step > 0) {
                this.props.onPathChange("/intro/slideshow");
            }
            // Renvoi à l'accueil après avoir passé l'intro
            if (this.state.step > 4) {
                const {history} = this.props;

                if (history) {
                    history.push("/");
                }
            }
        });
    }

    getClassName = () => {
        return this.state.step !== 0 ? "Intro small" : "Intro";
    }

    render() {
        return (
            <div className={this.getClassName()}>

                <SwitchLanguageButton language={this.props.language} onLanguageChange={this.props.onLanguageChange} />

                <SlideShow language={this.props.language} step={this.state.step} />

                <NextPageButton language={this.props.language} path={this.props.path} step={this.state.step} onStepChange={(step) => this.onStepChange(step)} />

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