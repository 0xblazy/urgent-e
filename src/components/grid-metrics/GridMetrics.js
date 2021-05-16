import React from 'react';
import './GridMetrics.css';

import Translator from '../../utils/Translator';

export default class GridMetrics extends React.Component {

    render() {
        return(
            <div className="grid">
                <div className="grid-item">
                    <div className="metric_frame">
                        <div className="metric_value">?</div>
                    </div>
                    <div className="metric_name">
                        {Translator.translate("blood_pressure", this.props.language)}
                    </div>
                </div>
                <div className="grid-item">
                    <div className="metric_frame">
                        <div className="metric_value">?</div>
                    </div>
                    <div className="metric_name">
                        {Translator.translate("pulse", this.props.language)}
                    </div>
                </div>
                <div className="grid-item">
                    <div className="metric_frame">
                        <div className="metric_value">?</div>
                    </div>
                    <div className="metric_name">
                        {Translator.translate("saturation_o2", this.props.language)}
                    </div>
                </div>
                <div className="grid-item">
                    <div className="metric_frame">
                        <div className="metric_value">?</div>
                    </div>
                    <div className="metric_name">
                        {Translator.translate("respiratory_rate", this.props.language)}
                    </div>
                </div>
                <div className="grid-item">
                    <div className="metric_frame">
                        <div className="metric_value">?</div>
                    </div>
                    <div className="metric_name">
                        {Translator.translate("blood_sugar", this.props.language)}
                    </div>
                </div>
                <div className="grid-item">
                    <div className="metric_frame">
                        <div className="metric_value">?</div>
                    </div>
                    <div className="metric_name">
                        {Translator.translate("temperature", this.props.language)}
                    </div>
                </div>
            </div>
        )
    }
}