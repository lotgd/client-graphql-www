import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * Displays a simple message. If prop error is true, the message is an error message.
 */
class Footer extends Component {
    static propTypes = {
        error: PropTypes.bool,
        message: PropTypes.string.isRequired
    };

    static defaultProps = {
        error: false
    };

    render() {
        if (this.props.message) {
            if (this.props.error) {
                return <p className="d-message d-message-error">{this.props.message}</p>
            } else {
                return <p className="d-message">{this.props.message}</p>
            }

        } else {
            return null;
        }
    }
}

export default Footer;