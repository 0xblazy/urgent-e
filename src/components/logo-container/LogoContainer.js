import React from 'react';
import {withRouter} from 'react-router-dom';
import './LogoContainer.css';

class LogoContainer extends React.Component {

    getClassname = () => {
        if (this.props.path === "/intro") {
            return "LogoContainer intro";
        } else if (this.props.path === "/intro/slideshow") {
            return "LogoContainer slideshow";
        } else {
            return "LogoContainer";
        }
    }

    onLogoClick = () => {
        if (this.props.path === "/emergency/transferred") {
            this.props.onEmergencyRequestReset();
        }

        if (this.props.path !== "/intro" && this.props.path !== "/intro/slideshow") {
            const {history} = this.props;
    
            if (history) {
                history.push("/");
            }
        }
    }

    render() {
        return (
            <div className={this.getClassname()}>
                <button onClick={(e) => this.onLogoClick()}>
                    <img alt="Logo Urgent-E" src="./images/Urgent-E.png" />
                </button>
            </div>
        );
    }
}

export default withRouter(LogoContainer);