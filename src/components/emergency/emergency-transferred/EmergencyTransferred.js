import React from 'react';
import {withRouter} from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import './EmergencyTransferred.css';

import NextPageButton from '../../next-page-button/NextPageButton';
import SwitchLanguageButton from '../../switch-language-button/SwitchLanguageButton';

import Translator from '../../../utils/Translator';

class Emergency extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            step: 1,
            locked_step: 2
        }

        this.formRef = React.createRef();
        this.inputs = {
            1: ["allergies", "treatments"],
            2: ["chronic_diseases", "surgical_history"]
        };

        this.patientNumber = Math.floor(Math.random() * (10000 - 1000) + 1000 );
        this.waitingTime = Math.floor(Math.random() * (80 - 10) + 10);
    }

    componentDidMount() {
        this.props.onPathChange("/emergency/transferred");
    }

    onStepChange = (new_step, skip = false) => {
        // Si on est pas à l'étape bloquée ou si on a cliqué sur le bouton ANNULER/TERMINER
        if (this.state.locked_step === 0 || this.state.locked_step >= new_step || skip) {
            // Soumission du formulaire
            if (new_step === 3) {
                if (this.formRef.current) {
                    this.formRef.current.handleSubmit();
                }
                this.setState({
                    locked_step: -1
                });
            }
            this.setState({
                step: new_step
            }, () => {
                const {history} = this.props;

                if (history) {
                    // Renvoie à l'accueil après avoir réserver les urgences
                    if (this.state.step === 4) {
                        this.props.onEmergencyRequestReset();
                        history.push("/");
                    }

                    // Renvoie à la première partie du formulaire si on annule
                    if (this.state.step === 10) {
                        history.push("/emergency");
                    }
                }
            });
        }
    }

    getStepsContainerClassname = () => {
        return "steps-container step-" + this.state.step;
    }

    getInputErrorClass = (fieldName) => {
        if (this.formRef.current) {
            return fieldName in this.formRef.current.errors ? "error" : "";
        } else {
            return "";
        }
    }

    handleBlur = (event) => {
        if (event.target.name in this.formRef.current.errors) {
            this.setState({
                locked_step: this.state.step
            });
        } else {
            let errors_key = Object.keys(this.formRef.current.errors);
            let locked = false;

            for (let i = 1 ; i < 4 ; i++) {
                if (!locked && this.containsArray(this.inputs[i], errors_key)) {
                    this.setState({
                        locked_step: i
                    });
                    locked = true;
                }
            }
            if (!locked) {
                this.setState({
                    locked_step: 0
                });
            }
        }
    }

    containsArray = (array, container) => {
        return container.some(v => array.includes(v));
    }

    getTakeCare = () => {
        return Translator.translate("hospital", this.props.language) + " " + this.props.emergency_request.hospital + ", " + Translator.translate("at", this.props.language) + " (une adresse), " + Translator.translate("is_ready", this.props.language);
    }

    getPatientNumber = () => {
        return Translator.translate("patient_number", this.props.language) + " : " + this.patientNumber;
    }

    getWaitingTime = () => {
        return Translator.translate("waiting_time", this.props.language) + " " + this.waitingTime + " minutes";
    }
   
    render() {
        return (
            <div className="EmergencyTransferred">
                <SwitchLanguageButton language={this.props.language} onLanguageChange={this.props.onLanguageChange} />

                <div className="header">
                    {/* Affiche l'image de chargement */}
                    {
                        (this.state.step === 1 || this.state.step === 2) &&
                        <>
                            <img src="../images/emergency/waiting.png" className="waiting" alt="Waiting" />
                            <h3>{Translator.translate("information_transferred", this.props.language)}</h3>
                        </>
                    }
                    {/* Affiche l'image de validation */}
                    {
                        this.state.step === 3 &&
                        <>
                            <img src="../images/emergency/verified.svg" className="verified" alt="Verified" />
                            <h2>{this.getTakeCare()}</h2>
                        </>
                    }
                </div>

                <Formik
                    initialValues={{ 
                        allergies: this.props.user ? this.props.user.allergies : "",
                        treatments: this.props.user ? this.props.user.treatments : "",
                        chronic_diseases: this.props.user ? this.props.user.chronic_diseases : "",
                        surgical_history: this.props.user ? this.props.user.surgical_history : ""
                    }}
                    validationSchema={
                        Yup.object().shape({
                            allergies: Yup.string(),
                            treatments: Yup.string(),
                            chronic_diseases: Yup.string(),
                            surgical_history: Yup.string()
                    })}
                    validateOnMount={true}
                    innerRef={this.formRef}
                    onSubmit={(emergency) => {
                        this.props.onEmergencyRequestChange(emergency);
                    }}
                >
                    <Form className="stepper-container" onBlur={(e) => this.handleBlur(e)}>
                        <div className={this.getStepsContainerClassname()}>
                            <div className="step-1">
                                <div className="form-group">
                                    <label>{Translator.translate("allergies", this.props.language)}</label>
                                    <Field as="textarea" type="text" name="allergies" className={this.getInputErrorClass("allergies")} />
                                    <ErrorMessage component="div" className="error" name="allergies" />
                                </div>
                                <div className="form-group">
                                    <label>{Translator.translate("treatments", this.props.language)}</label>
                                    <Field as="textarea" type="text" name="treatments" className={this.getInputErrorClass("treatments")} />
                                    <ErrorMessage component="div" className="error" name="treatments" />
                                </div>
                            </div>
                            <div className="step-2">
                                <div className="form-group">
                                    <label>{Translator.translate("chronic_diseases", this.props.language)}</label>
                                    <Field as="textarea" type="text" name="chronic_diseases" className={this.getInputErrorClass("chronic_diseases")} />
                                    <ErrorMessage component="div" className="error" name="chronic_diseases" />
                                </div>
                                <div className="form-group">
                                    <label>{Translator.translate("surgical_history", this.props.language)}</label>
                                    <Field as="textarea" type="text" name="surgical_history" className={this.getInputErrorClass("surgical_history")} />
                                    <ErrorMessage component="div" className="error" name="surgical_history" />
                                </div>
                            </div>
                            <div className="step-3">
                                <div className="grid-item">
                                    <div className="metric-frame">
                                        <div className="metric-value">?</div>
                                    </div>
                                    <div className="metric-name">
                                        {this.getPatientNumber()}
                                    </div>
                                </div>
                                <div className="grid-item">
                                    <div className="metric-frame">
                                        <div className="metric-value">?</div>
                                    </div>
                                    <div className="metric-name">
                                        {this.getWaitingTime()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                </Formik>
                
                <NextPageButton language={this.props.language} path={this.props.path} step={this.state.step} locked_step={this.state.locked_step} onStepChange={(step, skip = false) => this.onStepChange(step, skip)} />
            </div>
        );
    }
}

export default withRouter(Emergency);