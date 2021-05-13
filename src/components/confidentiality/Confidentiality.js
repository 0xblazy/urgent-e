import React from 'react';
import './Confidentiality.css';
import Translator from '../../utils/Translator'; 

export default class Confidentiality extends React.Component {
    
    componentDidMount() {
        this.props.onPathChange("/confidentiality");
    }

    render() {
        return (
            <div className="Confidentiality">
                <h1>{Translator.translate("confidentiality", this.props.language)}</h1>
            </div>
        );
    }
}