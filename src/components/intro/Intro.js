import React from 'react';
import './Intro.css';
import NextPageButton from './next-page-button/NextPageButton';
import Translator from '../../utils/Translator';

export default class Intro extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="Intro">
                <img alt="Logo Urgent-E" src="./images/Urgent-E.png" />
                <h1>URGENT-E</h1>
                <h3>{Translator.translate("slogan",this.props.language)}</h3>

                <NextPageButton language={this.props.language} onSwitch={this.on_mode_change} />

                <footer>
                    <div>
                        2021 - Sofiane Adjaoud, Nicolas Carbonier, Inaya ElAlaoui, Isabelle PauloMinero - Université de Lorraine - Institut des Sciences du Digital - M1 Sciences Cognitives
                    </div>
                    <div>
                        Icons and graphics made by <a href="https://www.flaticon.com/authors/turkkub" title="turkkub">turkkub</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
                    </div>
                </footer>
            </div>
        );
    }
}