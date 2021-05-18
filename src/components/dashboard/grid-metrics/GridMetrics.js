import React from 'react';
import './GridMetrics.css';

import Translator from '../../../utils/Translator';

export default class GridMetrics extends React.Component {

    render() {
        return(
            <div className="GridMetrics">
                <div className="grid-item">
                    <div className="metric-frame">
                        <div className="metric-value">?</div>
                    </div>
                    <div className="metric-name">
                        {Translator.translate("blood_pressure", this.props.language)}
                    </div>
                </div>
                <div className="grid-item">
                    <div className="metric-frame">
                        <div className="metric-value">?</div>
                    </div>
                    <div className="metric-name">
                        {Translator.translate("pulse", this.props.language)}
                    </div>
                </div>
                <div className="grid-item">
                    <div className="metric-frame">
                        <div className="metric-value">?</div>
                    </div>
                    <div className="metric-name">
                        {Translator.translate("saturation_o2", this.props.language)}
                    </div>
                </div>
                <div className="grid-item">
                    <div className="metric-frame">
                        <div className="metric-value">?</div>
                    </div>
                    <div className="metric-name">
                        {Translator.translate("respiratory_rate", this.props.language)}
                    </div>
                </div>
                <div className="grid-item">
                    <div className="metric-frame">
                        <div className="metric-value">?</div>
                    </div>
                    <div className="metric-name">
                        {Translator.translate("blood_sugar", this.props.language)}
                    </div>
                </div>
                <div className="grid-item">
                    <div className="metric-frame">
                        <div className="metric-value">?</div>
                    </div>
                    <div className="metric-name">
                        {Translator.translate("temperature", this.props.language)}
                    </div>
                </div>
            </div>
        )
    }
}