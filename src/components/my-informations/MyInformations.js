import React from 'react';
import {withRouter} from 'react-router-dom'
import './MyInformations.css';

import NextPageButton from '../next-page-button/NextPageButton';

import Translator from '../../utils/Translator'; 

class MyInformations extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            step: 1
        }
    }

    componentDidMount() {
        this.props.onPathChange("/my-informations");
    }

    on_step_change = (new_step) => {
        this.setState({
            step: new_step
        }, () => {
            // Renvoi à l'accueil après avoir terminé de compléter les informations personnelles
            if (this.state.step > 4) {
                const {history} = this.props;

                if (history) {
                    history.push("/");
                }
            }
        });
    }

    render() {
        return (
            <div className="MyInformations">
                <h1>{Translator.translate("my_informations", this.props.language)}</h1>
                <NextPageButton language={this.props.language} step={this.state.step} onStepChange={(step) => this.on_step_change(step)} />
            </div>
        );
    }
}

export default withRouter(MyInformations);