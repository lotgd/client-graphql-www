import React, {Component, PropTypes} from 'react';

import ThreeColumnLayout from './ThreeColumnLayout';

class Dialog extends Component {
    static PropType = {
        onClose: PropTypes.func,
        displayed: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
    };

    static defaultProps = {
        onClose: null,
        displayed: false,
    }

    render() {
        if (!this.props.displayed) {
            return null;
        }

        const middle = <div className="d-dialog">
            <div className="d-dialog-head">
                {this.props.onClose && <a onClick={this.props.onClose}>[X]</a>}
                <h2>{this.props.title}</h2>
            </div>

            <div className="d-dialog-content">
                {this.props.children}
            </div>
        </div>;

        return <ThreeColumnLayout
            middle={middle}
        />;
    }
}

export default Dialog;