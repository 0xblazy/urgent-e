import React from 'react';
import {Link} from 'react-router-dom';
import './Navigation.css';

import Translator from '../../utils/Translator'; 

export default class Navigation extends React.Component {

    render() {
        return (
            <div className="Navigation">
                <ul>
                    <Link to="/confidentiality">
                        <li>
                            <img src="./images/navigation/confidentiality.png" alt={Translator.translate("confidentiality", this.props.language)} />
                            {Translator.translate("confidentiality", this.props.language)}
                        </li>
                    </Link>
                    <Link to="/my-informations">
                        <li>
                            <img src="./images/navigation/my_informations.png" alt={Translator.translate("my_informations", this.props.language)} />
                            {Translator.translate("my_informations", this.props.language)}
                        </li>
                    </Link>
                </ul>
            </div>
        );
    }
}