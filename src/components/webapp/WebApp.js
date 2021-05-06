import React from "react";
import './WebApp.css';
import Intro from "../intro/Intro";
import SwitchLanguageButton from "../switch-language-button/SwitchLanguageButton";

export default class WebApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            language:"en"
        }
    }

    on_language_change = (language)=>{
        this.setState({
            language:language
        });
    }


    render() {
        return <div className="Intro">
            <SwitchLanguageButton onLanguageChange={(language)=>this.on_language_change(language)} language={this.state.language} />
            <Intro language={this.state.language} />
        </div>

    }
}
