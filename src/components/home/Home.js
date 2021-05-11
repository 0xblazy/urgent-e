import React from 'react';
import './Home.css';
import Translator from '../../utils/Translator'; 

export default class Home extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="Home">
                <h1>{Translator.translate("home", this.props.language)}</h1>
            </div>
        );
    }
}