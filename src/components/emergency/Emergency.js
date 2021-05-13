import React from 'react';
import './Emergency.css';

import Translator from '../../utils/Translator';

export default class Emergency extends React.Component {

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