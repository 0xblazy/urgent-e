import React from 'react';
import './Navigation.css';
import Translator from '../../utils/Translator'; 
import {Link} from 'react-router-dom';

export default class Navigation extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Navigation">
                <ul>
                    <Link to="/confidentiality">
                        <li>{Translator.translate("confidentiality", this.props.language)}</li>
                    </Link>
                    <Link to="/my-informations">
                        <li>{Translator.translate("my_informations", this.props.language)}</li>
                    </Link>
                </ul>
            </div>
        );
    }
}