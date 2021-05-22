import React from 'react';
import {withRouter} from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage, getIn} from 'formik';
import * as Yup from 'yup';
import './Emergency.css';

import NextPageButton from '../next-page-button/NextPageButton';
import SwitchLanguageButton from '../switch-language-button/SwitchLanguageButton';
import FindingHospital from './finding-hospital/FindingHospital';

import Translator from '../../utils/Translator';

class Emergency extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            step: 1,
            locked_step: this.props.emergency_request ? 0 : 1,
            address: this.props.emergency_request ? this.props.emergency_request.address : this.props.user ? this.props.user.address : null,
            perimeter: this.props.emergency_request ? this.props.emergency_request.perimeter : null
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
                const {history} = this.props;

                if (history) {
                    // Envoie poursuivre le formulaire
                    if (this.state.step === 4) {
                        history.push("/emergency/transferred");
                    }

                    // Renvoie à l'accueil si on annule
                    if (this.state.step === 10) {
                        this.props.onEmergencyRequestReset();
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
            return getIn(this.formRef.current.errors, fieldName) ? "error" : "";
        } else {
            return "";
        }
    }

    handleBlur = (event) => {
        // Met à jour l'adresse ou le périmètre pour le passer à FindingHospital
        if (event.target.name === "address" || event.target.name === "perimeter") {
            this.setState({
                [event.target.name]: event.target.value
            });
        }

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

    onHospitalChange = (hospital) => {
        if (hospital) {
            this.formRef.current.values.hospital.name = hospital.name;
            this.formRef.current.values.hospital.address = hospital.address;
        } else {
            this.formRef.current.values.hospital.name = "";
            this.formRef.current.values.hospital.address = "";
        }
    }
   
    render() {
        return (
            <div className="Emergency">
                <SwitchLanguageButton language={this.props.language} onLanguageChange={this.props.onLanguageChange} />

                <div className="shadow"></div>
                <Formik
                    initialValues={{ 
                        what_brings_you: this.props.emergency_request ? this.props.emergency_request.what_brings_you : "",
                        pain: this.props.emergency_request ? this.props.emergency_request.pain : 50,
                        photo: this.props.emergency_request ? this.props.emergency_request.photo : "",
                        connected_object: this.props.emergency_request ? this.props.emergency_request.connected_object : "",
                        address: this.props.emergency_request ? this.props.emergency_request.address : 
                            this.props.user ? this.props.user.address : "",
                        perimeter: this.props.emergency_request ? this.props.emergency_request.perimeter : 15,
                        hospital: {
                            name: this.props.emergency_request ? this.props.emergency_request.hospital.name : "",
                            address: this.props.emergency_request ? this.props.emergency_request.hospital.address : ""
                        },
                        ambulance: this.props.emergency_request ? this.props.emergency_request.ambulance : "no",
                        name: this.props.emergency_request ? this.props.emergency_request.name : 
                            this.props.user ? this.props.user.name : "",
                        firstname: this.props.emergency_request ? this.props.emergency_request.firstname : 
                            this.props.user ? this.props.user.firstname : "",
                        phone_number: this.props.emergency_request ? this.props.emergency_request.phone_number : 
                            this.props.user ? this.props.user.phone_number : "",
                        social_security: this.props.emergency_request ? this.props.emergency_request.social_security : 
                            this.props.user ? this.props.user.social_security : "",
                        mutual: this.props.emergency_request ? this.props.emergency_request.mutual : 
                            this.props.user ? this.props.user.mutual : ""
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
                                .required(Translator.translate("required_field", this.props.language)),
                            ambulance: Yup.string()
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
                        this.props.onEmergencyRequestChange(emergency);
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
                                    <FindingHospital language={this.props.language} 
                                        step={this.state.step}
                                        mapStep={2}
                                        address={this.state.address}
                                        perimeter={this.state.perimeter}
                                        onHospitalChange={(hospital) => this.onHospitalChange(hospital)} />
                                    <Field type="hidden" name="hospital.name" />
                                    <Field type="hidden" name="hospital.address" />
                                    <ErrorMessage component="div" className="error" name="hospital.name" />
                                </div>
                                <div className="form-group">
                                    <label>{Translator.translate("ambulance", this.props.language)}</label>
                                    <div className="radio-group">
                                        <Field type="radio" name="ambulance" id="amb-1" value="yes" className={this.getInputErrorClass("ambulance")} />
                                        <label htmlFor="amb-1">{Translator.translate("yes", this.props.language)}</label>
                                        <Field type="radio" name="ambulance" id="amb-2" value="no" className={this.getInputErrorClass("ambulance")} />
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
                
                <NextPageButton language={this.props.language} path={this.props.path} step={this.state.step} locked_step={this.state.locked_step} onStepChange={(step, skip = false) => this.onStepChange(step, skip)} />
            </div>
        );
    }
}

export default withRouter(Emergency);