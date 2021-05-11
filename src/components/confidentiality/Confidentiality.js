import React from 'react';
import './Confidentiality.css';
import Translator from '../../utils/Translator'; 

export default class Confidentiality extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="Confidentiality">
                <h1>{Translator.translate("confidentiality", this.props.language)}</h1>
            </div>
        );
    }
}