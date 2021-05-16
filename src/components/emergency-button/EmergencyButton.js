import React from 'react';
import './EmergencyButton.css';

import Translator from '../../utils/Translator';

export default class EmergencyButton extends React.Component {

    get_class_name = () => {
        return "EmergencyButton";
    }

    render(){
       return (
           <div className={this.get_class_name()}>
               <button>{Translator.translate("go_to_emergency", this.props.language)}</button>
           </div>
       )
    }

}