import React from 'react';
import './GridMetrics.css';

import Translator from '../../../utils/Translator';

export default class GridMetrics extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            metrics : null
        }
    }

    componentDidMount() {
        fetch('http://localhost:1337/metrics/1').then((response) =>{
            return response.json()
        }).then((result) => {
            setTimeout( () => {
                this.setState({metrics : result})
            }, 4000)
        })
    }

    render() {
        return(
            <div className="GridMetrics">
                <div className="grid-item">
                    <div className="metric-frame">
                            <div className="metric-value">{this.state.metrics && this.state.metrics.blood_pressure ? this.state.metrics.blood_pressure : <img src = "../images/emergency/waiting.png" className="loading" alt="Waiting" />}</div>
                    </div>
                    <div className="metric-name">
                        {Translator.translate("blood_pressure", this.props.language)}
                    </div>
                </div>
                <div className="grid-item">
                    <div className="metric-frame">
                        <div className="metric-value">{this.state.metrics && this.state.metrics.pulse ? this.state.metrics.pulse : <img src = "../images/emergency/waiting.png" className="loading" alt="Waiting" />}</div>
                    </div>
                    <div className="metric-name">
                        {Translator.translate("pulse", this.props.language)}
                    </div>
                </div>
                <div className="grid-item">
                    <div className="metric-frame">
                        <div className="metric-value">{this.state.metrics && this.state.metrics.saturation_o2 ?  this.state.metrics.saturation_o2 : <img src = "../images/emergency/waiting.png" className="loading" alt="Waiting" />}</div>
                    </div>
                    <div className="metric-name">
                        {Translator.translate("saturation_o2", this.props.language)}
                    </div>
                </div>
                <div className="grid-item">
                    <div className="metric-frame">
                        <div className="metric-value">{this.state.metrics && this.state.metrics.respiratory_rate ?  this.state.metrics.respiratory_rate : <img src = "../images/emergency/waiting.png" className="loading" alt="Waiting" />}</div>
                    </div>
                    <div className="metric-name">
                        {Translator.translate("respiratory_rate", this.props.language)}
                    </div>
                </div>
                <div className="grid-item">
                    <div className="metric-frame">
                        <div className="metric-value">{this.state.metrics && this.state.metrics.blood_sugar ?  this.state.metrics.blood_sugar : <img src = "../images/emergency/waiting.png" className="loading" alt="Waiting" />}</div>
                    </div>
                    <div className="metric-name">
                        {Translator.translate("blood_sugar", this.props.language)}
                    </div>
                </div>
                <div className="grid-item">
                    <div className="metric-frame">
                        <div className="metric-value">{this.state.metrics && this.state.metrics.temperature ?  this.state.metrics.temperature : <img src = "../images/emergency/waiting.png" className="loading" alt="Waiting" />}</div>
                    </div>
                    <div className="metric-name">
                        {Translator.translate("temperature", this.props.language)}
                    </div>
                </div>
            </div>
        )
    }
}