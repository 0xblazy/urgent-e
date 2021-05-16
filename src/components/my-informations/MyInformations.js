import React from 'react';
import {withRouter} from 'react-router-dom'
import './MyInformations.css';

import NextPageButton from '../next-page-button/NextPageButton';
import SwitchLanguageButton from '../switch-language-button/SwitchLanguageButton';

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

    get_steps_classname = () => {
        return "steps-container step-" + this.state.step;
    }

    create_title = () => {
        let titles = [];

        for (let i = 1 ; i < 4 ; i++) {
            titles.push(
                <h3 id={"step-" + i} key={i}><span>{Translator.translate("my_info_" + i, this.props.language)}</span></h3>
            );
        }

        return titles;
    }

    get_title_classname = () => {
        return "title step-" + this.state.step;
    }

    render() {
        return (
            <div className="MyInformations">
                <SwitchLanguageButton language={this.props.language} onLanguageChange={this.props.onLanguageChange} />

                <div className={this.get_title_classname()}>
                    {this.create_title()}
                </div>
                
                <form className="stepper-container">
                    <div className={this.get_steps_classname()}>
                        <div className="step-1">
                            <div className="form-group">
                                <label>
                                    <p>{Translator.translate("name", this.props.language)}</p>
                                    <input type="text" name="name" />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    <p>{Translator.translate("firstname", this.props.language)}</p>
                                    <input type="text" name="firstname" />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    <p>{Translator.translate("age", this.props.language)}</p>
                                    <input type="text" name="age" />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    <p>{Translator.translate("size", this.props.language)}</p>
                                    <input type="text" name="size" />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    <p>{Translator.translate("weight", this.props.language)}</p>
                                    <input type="text" name="weight" />
                                </label>
                            </div>

                        </div>
                        <div className="step-2">

                            <div className="form-group">
                                <label>
                                    <p>{Translator.translate("address", this.props.language)}</p>
                                    <input type="text" name="address" />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    <p>{Translator.translate("phone_number", this.props.language)}</p>
                                    <input type="text" name="phone_number" />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    <p>{Translator.translate("vital_card", this.props.language)}</p>
                                    <input type="text" name="vital_card" />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    <p>{Translator.translate("mutual", this.props.language)}</p>
                                    <input type="text" name="mutual" />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    <p>{Translator.translate("emergency_contact", this.props.language)}</p>
                                    <input type="text" name="emergency_contact" />
                                </label>
                            </div>

                        </div>
                        <div className="step-3">

                            <div className="form-group">
                                <label>
                                    <p>{Translator.translate("allergies", this.props.language)}</p>
                                    <input type="text" name="allergies" />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    <p>{Translator.translate("treatments", this.props.language)}</p>
                                    <input type="text" name="treatments" />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    <p>{Translator.translate("chronic_diseases", this.props.language)}</p>
                                    <input type="text" name="chronic_diseases" />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    <p>{Translator.translate("surgical_history", this.props.language)}</p>
                                    <input type="text" name="surgical_history" />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    <p>{Translator.translate("emergency", this.props.language)}</p>
                                    <input type="text" name="emergency" />
                                </label>
                            </div>

                        </div>
                    </div>
                </form>
                <NextPageButton language={this.props.language} step={this.state.step} onStepChange={(step) => this.on_step_change(step)} />
            </div>
        );
    }
}

export default withRouter(MyInformations);