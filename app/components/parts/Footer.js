import React from 'react';

/**
 * This part is responsible for rendering the lower part of the website with copyright etc
 */
class Footer extends React.Component {
    render() {
        const core = this.props.configuration.core;
        const crate = this.props.configuration.crate;

        return <div className="app-footer">
            <dl>
                <dt>Web-design</dt><dd>2016-2017 The Daenerys Development Team</dd>
                <dt>crate</dt><dd>{crate.library} in version {crate.version}</dd>
                <dt>core</dt><dd>{core.library} in version {core.version}</dd>
            </dl>
        </div>
    }
}

export default Footer;