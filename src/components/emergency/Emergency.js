import React from 'react';
import {withRouter} from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import './Emergency.css';

import NextPageButton from '../next-page-button/NextPageButton';
import SwitchLanguageButton from '../switch-language-button/SwitchLanguageButton';

import Translator from '../../utils/Translator';

class Emergency extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            step: 1,
            locked_step: 1
        }

        this.formRef = React.createRef();
        this.inputs = {
            1: ["what_brings_you", "pain", "photo", "connected_object"],
            2: ["address", "perimeter", "hospital", "ambulance"],
            3: ["name", "firstname", "phone_number", "social_security", "mutual"]
        };
    }

    componentDidMount() {
        this.props.onPathChange("/emergency");
    }

    onStepChange = (new_step) => {
        // Si on est pas à l'étape bloquée ou si on a cliqué sur le bouton ANNULER/TERMINER
        if (this.state.locked_step === 0 || this.state.locked_step >= new_step || new_step > 4) {
            // Soumission du formulaire
            if (this.state.step === 3 && new_step > 4) {
                if (this.formRef.current) {
                    this.formRef.current.handleSubmit();
                }
            }
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
                    locked = true
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
            <div className="Emergency">
                <SwitchLanguageButton language={this.props.language} onLanguageChange={this.props.onLanguageChange} />

                <div className="shadow"></div>
                <Formik
                    initialValues={{ 
                        what_brings_you: "",
                        pain: 50,
                        photo: "",
                        connected_object: "",
                        address: this.props.user ? this.props.user.address : "",
                        perimeter: "",
                        hospital: "",
                        ambulance: "",
                        name: this.props.user ? this.props.user.name : "",
                        firstname: this.props.user ? this.props.user.firstname : "",
                        phone_number: this.props.user ? this.props.user.phone_number : "",
                        social_security: this.props.user ? this.props.user.social_security : "",
                        mutual: this.props.user ? this.props.user.mutual : ""
                    }}
                    validationSchema={
                        Yup.object().shape({
                            what_brings_you: Yup.string()
                                .required(Translator.translate("required_field", this.props.language)),
                            pain: Yup.number()
                                .integer()
                                .required(Translator.translate("required_field", this.props.language)),
                            address: Yup.string()
                                .required(Translator.translate("required_field", this.props.language)),
                            perimeter: Yup.number().typeError(Translator.translate("enter_perimeter", this.props.language))
                                .positive(Translator.translate("enter_perimeter", this.props.language))
                                .integer(Translator.translate("enter_perimeter", this.props.language))
                                .required(Translator.translate("required_field", this.props.language)),
                            hospital: Yup.string()
                                .required(Translator.translate("required_field", this.props.language)),
                            ambulance: Yup.number()
                                .required(Translator.translate("required_field", this.props.language)),
                            name: Yup.string()
                                .required(Translator.translate("required_field", this.props.language)),
                            firstname: Yup.string()
                                .required(Translator.translate("required_field", this.props.language)),
                            phone_number: Yup.string()
                                .matches(/^[0-9]{2}(.| )?[0-9]{2}(.| )?[0-9]{2}(.| )?[0-9]{2}(.| )?[0-9]{2}$/, Translator.translate("entre_phone_number", this.props.language))
                                .required(Translator.translate("required_field", this.props.language)),
                            social_security: Yup.number().typeError(Translator.translate("enter_social_security", this.props.language))
                                .positive(Translator.translate("enter_vital_card", this.props.language))
                                .integer(Translator.translate("enter_vital_card", this.props.language)),
                            mutual: Yup.string()
                    })}
                    validateOnMount={true}
                    innerRef={this.formRef}
                    onSubmit={(emergency) => {
                        alert(JSON.stringify(emergency, null, 2));
                    }}
                >
                    <Form className="stepper-container" onBlur={(e) => this.handleBlur(e)}>
                        <div className={this.getStepsContainerClassname()}>
                            <div className="step-1">
                                <div className="form-group">
                                    <label>{Translator.translate("what_brings_you", this.props.language)}</label>
                                    <Field as="textarea" type="text" name="what_brings_you" className={this.getInputErrorClass("what_brings_you")} />
                                    <ErrorMessage component="div" className="error" name="what_brings_you" />
                                </div>
                                <div className="form-group">
                                    <label>{Translator.translate("pain", this.props.language)}</label>
                                    <Field name="pain" className={this.getInputErrorClass("pain")}>
                                        {({field}) => (
                                            <input type="range" min="0" max="100" step="5" {...field} />
                                        )}
                                    </Field>
                                    <ErrorMessage component="div" className="error" name="pain" />
                                </div>
                                <div className="form-group">
                                    <label>{Translator.translate("photo", this.props.language)}</label>
                                    <Field name="photo" className={this.getInputErrorClass("photo")}>
                                        {({field, form}) => (
                                            <label className="upload">
                                                <span>+</span>
                                                <input type="file" accept="image/*" onChange={(event) => {form.setFieldValue("photo", event.currentTarget.files[0]);}} {...field} />
                                            </label>
                                        )}
                                    </Field>
                                    <ErrorMessage component="div" className="error" name="photo" />
                                </div>
                                <div className="form-group">
                                    <label>{Translator.translate("connected_object", this.props.language)}</label>
                                    <Field name="connected_object" className={this.getInputErrorClass("connected_object")}>
                                        {({field, form}) => (
                                            <label className="upload">
                                                <span>+</span>
                                                <input type="file" accept="image/*" onChange={(event) => {form.setFieldValue("connected_object", event.currentTarget.files[0]);}} {...field} />
                                            </label>
                                        )}
                                    </Field>
                                    <ErrorMessage component="div" className="error" name="connected_object" />
                                </div>
                            </div>
                            <div className="step-2">
                                <div className="form-group">
                                    <label>{Translator.translate("address", this.props.language)}</label>
                                    <Field type="text" name="address" className={this.getInputErrorClass("address")} />
                                    <ErrorMessage component="div" className="error" name="address" />
                                </div>
                                <div className="form-group">
                                    <label>{Translator.translate("perimeter", this.props.language)}</label>
                                    <Field type="text" name="perimeter" className={this.getInputErrorClass("perimeter")} />
                                    <ErrorMessage component="div" className="error" name="perimeter" />
                                </div>
                                <div className="form-group">
                                    <Field type="text" name="hospital" placeholder="À remplacer par Maps" className={this.getInputErrorClass("hospital")} />
                                    <ErrorMessage component="div" className="error" name="hospital" />
                                </div>
                                <div className="form-group">
                                    <label>{Translator.translate("ambulance", this.props.language)}</label>
                                    <div className="radio-group">
                                        <Field type="radio" name="ambulance" id="amb-1" value="1" className={this.getInputErrorClass("ambulance")} />
                                        <label htmlFor="amb-1">{Translator.translate("yes", this.props.language)}</label>
                                        <Field type="radio" name="ambulance" id="amb-2" value="0" className={this.getInputErrorClass("ambulance")} />
                                        <label htmlFor="amb-2">{Translator.translate("no", this.props.language)}</label>
                                    </div>
                                    <ErrorMessage component="div" className="error" name="ambulance" />
                                </div>
                            </div>
                            <div className="step-3">
                                <div className="form-group">
                                    <label>{Translator.translate("name", this.props.language)}</label>
                                    <Field type="text" name="name" className={this.getInputErrorClass("name")} />
                                    <ErrorMessage component="div" className="error" name="name" />
                                </div>
                                <div className="form-group">
                                    <label>{Translator.translate("firstname", this.props.language)}</label>
                                    <Field type="text" name="firstname" className={this.getInputErrorClass("firstname")} />
                                    <ErrorMessage component="div" className="error" name="firstname" />
                                </div>
                                <div className="form-group">
                                    <label>{Translator.translate("phone_number", this.props.language)}</label>
                                    <Field type="text" name="phone_number" className={this.getInputErrorClass("phone_number")} />
                                    <ErrorMessage component="div" className="error" name="phone_number" />
                                </div>
                                <div className="form-group">
                                    <label>{Translator.translate("social_security", this.props.language)}</label>
                                    <Field type="text" name="social_security" className={this.getInputErrorClass("social_security")} />
                                    <ErrorMessage component="div" className="error" name="social_security" />
                                </div>
                                <div className="form-group">
                                    <label>{Translator.translate("mutual", this.props.language)}</label>
                                    <Field type="text" name="mutual" className={this.getInputErrorClass("mutual")} />
                                    <ErrorMessage component="div" className="error" name="mutual" />
                                </div>
                            </div>
                        </div>
                    </Form>
                </Formik>
                
                <NextPageButton language={this.props.language} step={this.state.step} locked_step={this.state.locked_step} onStepChange={(step) => this.onStepChange(step)} />
            </div>
        );
    }
}

export default withRouter(Emergency);