import React from 'react';

class Header extends React.Component {
    render() {
        return <div className="app-header">
            <h1>{this.props.title}</h1>
            <div>Connected to {this.props.realm}</div>
        </div>
    }
}

export default Header;