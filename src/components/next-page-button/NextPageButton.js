import React from "react";
import "./NextPageButton.css";
import Translator from "../../utils/Translator";

export default class NextPageButton extends React.Component {

    constructor(props) {
        super(props);//cannot use "this" keyword until "super(props);" has been placed

        //initialization of the attributes of the application state
        this.state = {
            button_value: false,
        };
    }

    on_click = () => {

    }

    get_button_classname = () => {
        return (this.state.button_value) ? "switch-to-light" : "switch-to-dark";//get class name according to state value
    }

    render() {
        return <div className="NextPageButton"><button className={this.get_button_classname()}>{Translator.translate("next_page",this.props.language)}</button></div>;
    }
}