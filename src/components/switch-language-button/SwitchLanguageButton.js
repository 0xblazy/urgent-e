import React from "react";
import "./SwitchLanguageButton.css";

export default class SwitchLanguageButton extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            current_language : "en",
            languages : ["en","fr"],
        };
    }

    componentDidMount(){
        this.setState({
            language : this.props.language
        });
    }

    componentDidUpdate(nextProps){
        if(this.props!==nextProps){
            this.setState({
                language : this.props.language
            });
        }
    }

    on_click = ()=>{

        const new_language = (this.state.current_language===this.state.languages[0])? this.state.languages[1] : this.state.languages[0];

        this.setState({
            current_language: new_language
        });

        this.props.onLanguageChange(new_language);
    }

    current_language_label(){
        return (this.state.current_language===this.state.languages[0])? this.state.current_language.toUpperCase() : this.state.current_language.toUpperCase();
    }

    not_current_language_label(){
        return (this.state.current_language===this.state.languages[0])? this.state.languages[1].toUpperCase() : this.state.languages[0].toUpperCase();
    }

    render(){
        return <button className="SwitchLanguageButton" onClick={(e)=>this.on_click()}><span className="active">{this.current_language_label()}</span><span>{this.not_current_language_label()}</span></button>;
    }

}