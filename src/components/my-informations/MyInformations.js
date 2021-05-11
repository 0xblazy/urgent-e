import React from 'react';
import './MyInformations.css';
import Translator from '../../utils/Translator'; 

export default class MyInformations extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="MyInformations">
                <h1>{Translator.translate("my_informations", this.props.language)}</h1>
            </div>
        );
    }
}