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
                <img src="./images/confidentiality/security.png" alt={Translator.translate("confidentiality", this.props.language)} />
                <div className="confi">
                    <h4>{Translator.translate("confi_1", this.props.language)}</h4>
                    <h4>{Translator.translate("confi_2", this.props.language)}</h4>
                </div>
            </div>
        );
    }
}