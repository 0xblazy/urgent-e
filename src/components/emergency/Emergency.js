import React from 'react';
import {withRouter} from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import './Emergency.css';

import NextPageButton from '../next-page-button/NextPageButton';
import SwitchLanguageButton from '../switch-language-button/SwitchLanguageButton';

import Translator from '../../utils/Translator';

export default class Emergency extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            step: 1,
            locked_step: 0
        }

        this.formRef = React.createRef();
        this.inputs = {
            1: ["name", "firstname", "age", "size", "weight"],
            2: ["address", "phone_number", "vital_card", "mutual", "emergency_contact"],
            3: ["allergies", "treatments", "chronic_diseases", "surgical_history"]
        };
    }

    componentDidMount() {
        this.props.onPathChange("/emergency");
    }
   
    render() {
        return (
            <div className="Emergency">
                <h1>{Translator.translate("emergency", this.props.language)}</h1>
            </div>
        );
    }
}