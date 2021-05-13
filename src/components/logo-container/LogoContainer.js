import React from 'react';
import {withRouter} from 'react-router-dom';
import './LogoContainer.css';

class LogoContainer extends React.Component {

    get_class_name = () => {
        if (this.props.path === "/intro") {
            return "LogoContainer intro";
        } else if (this.props.path === "/intro/slideshow") {
            return "LogoContainer slideshow";
        } else {
            return "LogoContainer";
        }
    }

    on_logo_click = () => {
        if (this.props.path !== "/intro" && this.props.path !== "/intro/slideshow") {
            const {history} = this.props;
    
            if (history) {
                history.push("/");
            }
        }
    }

    render() {
        return (
            <div className={this.get_class_name()}>
                <button onClick={(e) => this.on_logo_click()}>
                    <img alt="Logo Urgent-E" src="./images/Urgent-E.png" />
                </button>
            </div>
        );
    }
}

export default withRouter(LogoContainer);