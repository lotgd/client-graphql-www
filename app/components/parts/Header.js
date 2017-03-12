import React from 'react';

/**
 * The part renders the header of the website
 */
class Header extends React.Component {
    render() {
        return <div className="app-header">
            <h1>{this.props.title}</h1>
            <div>Connected to {this.props.realm}</div>
        </div>
    }
}

export default Header;