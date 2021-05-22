import React from 'react';
import {withRouter} from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage, getIn} from 'formik';
import * as Yup from 'yup';
import './MyInformations.css';

import NextPageButton from '../next-page-button/NextPageButton';
import SwitchLanguageButton from '../switch-language-button/SwitchLanguageButton';

import Translator from '../../utils/Translator'; 

class MyInformations extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            step: 1,
            locked_step: this.props.user ? 0 : 1
        }

        this.formRef = React.createRef();
        this.inputs = {
            1: ["name", "firstname", "age", "size", "weight"],
            2: ["address", "phone_number", "social_security", "mutual", "emergency_contact"],
            3: ["allergies", "treatments", "chronic_diseases", "surgical_history"]
        };
    }

    componentDidMount() {
        this.props.onPathChange("/my-informations");
    }

    onStepChange = (new_step, skip = false) => {
        // Si on est pas à l'étape bloquée ou si on a cliqué sur le bouton ANNULER/TERMINER
        if (this.state.locked_step === 0 || this.state.locked_step >= new_step || skip) {
            // Soumission du formulaire
            if (new_step === 4) {
                if (this.formRef.current) {
                    this.formRef.current.handleSubmit();
                }
            }
            this.setState({
                step: new_step
            }, () => {
                // Renvoi à l'accueil après avoir terminé de compléter les informations personnelles
                if (this.state.step === 4 || this.state.step === 10) {
                    const {history} = this.props;
    
                    if (history) {
                        history.push("/");
                    }
                }
            });
        }
    }

    getStepsContainerClassname = () => {
        return "steps-container step-" + this.state.step;
    }

    createTitle = () => {
        let titles = [];

        for (let i = 1 ; i < 4 ; i++) {
            titles.push(
                <h3 id={"step-" + i} key={i}><span>{Translator.translate("my_info_" + i, this.props.language)}</span></h3>
            );
        }

        return titles;
    }

    getTitleClassname = () => {
        return "title step-" + this.state.step;
    }

    createSteps = () => {
        let steps = [];

        for (let i = 1 ; i < 4 ; i++) {
            steps.push(
                <div className={"step-" + i} key={i}>
                    {this.createFields(i)}
                </div>
            );
        }

        return steps;
    }

    createFields = (step) => {
        let fields = [];

        for (let i = 0 ; i < this.inputs[step].length ; i++) {
            fields.push(
                <div className="form-group" key={i}>
                    <label>{Translator.translate(this.inputs[step][i], this.props.language)}</label>
                    <Field 
                        as={step === 3 ? "textarea" : ""} 
                        type="text"
                        name={this.inputs[step][i]}
                        className={this.getInputErrorClass(this.inputs[step][i])} />
                    <ErrorMessage component="div" className="error" name={this.inputs[step][i]} />
                </div>
            )
        }
        
        return fields;
    }

    getInputErrorClass = (fieldName) => {
        if (this.formRef.current) {
            return getIn(this.formRef.current.errors, fieldName) ? "error" : "";
        } else {
            return "";
        }
    }

    handleBlur = (event) => {
        if (getIn(this.formRef.current.errors, event.target.name)) {
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

    render() {
        return (
            <div className="MyInformations">
                <SwitchLanguageButton language={this.props.language} onLanguageChange={this.props.onLanguageChange} />

                <div className={this.getTitleClassname()}>
                    {this.createTitle()}
                </div>

                <Formik
                    initialValues={{ 
                        name: this.props.user ? this.props.user.name : "",
                        firstname: this.props.user ? this.props.user.firstname : "",
                        age: this.props.user ? this.props.user.age : "",
                        size: this.props.user ? this.props.user.size : "",
                        weight: this.props.user ? this.props.user.weight : "",
                        address: this.props.user ? this.props.user.address : "",
                        phone_number: this.props.user ? this.props.user.phone_number : "",
                        social_security: this.props.user ? this.props.user.social_security : "",
                        mutual: this.props.user ? this.props.user.mutual : "",
                        emergency_contact: this.props.user ? this.props.user.emergency_contact : "",
                        allergies: this.props.user ? this.props.user.allergies : "",
                        treatments: this.props.user ? this.props.user.treatments : "",
                        chronic_diseases: this.props.user ? this.props.user.chronic_diseases : "",
                        surgical_history: this.props.user ? this.props.user.surgical_history : ""
                    }}
                    validationSchema={
                        Yup.object().shape({
                            name: Yup.string()
                                .required(Translator.translate("required_field", this.props.language)),
                            firstname: Yup.string()
                                .required(Translator.translate("required_field", this.props.language)),
                            age: Yup.number().typeError(Translator.translate("enter_age", this.props.language))
                                .positive(Translator.translate("enter_age", this.props.language))
                                .integer(Translator.translate("enter_age", this.props.language))
                                .required(Translator.translate("required_field", this.props.language)),
                            size: Yup.number().typeError(Translator.translate("enter_size", this.props.language))
                                .positive(Translator.translate("enter_size", this.props.language))
                                .required(Translator.translate("required_field", this.props.language)),
                            weight: Yup.number().typeError(Translator.translate("enter_weight", this.props.language))
                                .positive(Translator.translate("enter_weight", this.props.language))
                                .required(Translator.translate("required_field", this.props.language)),
                            address: Yup.string()
                                .required(Translator.translate("required_field", this.props.language)),
                            phone_number: Yup.string()
                                .matches(/^[0-9]{2}(.| )?[0-9]{2}(.| )?[0-9]{2}(.| )?[0-9]{2}(.| )?[0-9]{2}$/, Translator.translate("entre_phone_number", this.props.language))
                                .required(Translator.translate("required_field", this.props.language)),
                            social_security: Yup.number().typeError(Translator.translate("enter_social_security", this.props.language))
                                .positive(Translator.translate("enter_social_security", this.props.language))
                                .integer(Translator.translate("enter_social_security", this.props.language)),
                            mutual: Yup.string(),
                            emergency_contact: Yup.string()
                                .matches(/^[0-9]{2}(.| )?[0-9]{2}(.| )?[0-9]{2}(.| )?[0-9]{2}(.| )?[0-9]{2}$/, Translator.translate("entre_phone_number", this.props.language)),
                            allergies: Yup.string(),
                            treatments: Yup.string(),
                            chronic_diseases: Yup.string(),
                            surgical_history: Yup.string()
                        }
                    )}
                    validateOnMount={true}
                    innerRef={this.formRef}
                    onSubmit={(user) => {
                        this.props.onUserChange(user)
                    }}
                >
                    <Form className="stepper-container" onBlur={(e) => this.handleBlur(e)}>
                        <div className={this.getStepsContainerClassname()}>
                            {this.createSteps()}
                        </div>
                    </Form>
                </Formik>
                
                <NextPageButton language={this.props.language} path={this.props.path} step={this.state.step} locked_step={this.state.locked_step} onStepChange={(step, skip = false) => this.onStepChange(step, skip)} />
            </div>
        );
    }
}

export default withRouter(MyInformations);