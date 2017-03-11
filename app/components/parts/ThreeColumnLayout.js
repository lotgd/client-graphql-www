import React from 'react';

class ThreeColumnLayout extends React.Component {
    render() {
        const left = this.props.left ? this.props.left : <div>&nbsp;</div>;
        const right = this.props.right ? this.props.right :  <div>&nbsp;</div>;
        const middle = this.props.middle ? this.props.middle :  <div>Empty</div>;

        return <div className="w3-row">
            <div className="d-3col-left w3-col l3 m4">{left}</div>
            <div className="d-3col-middle w3-col l3 m4">{middle}</div>
            <div className="d-3col-right w3-col l3 m4">{right}</div>
        </div>
    }
}

export default ThreeColumnLayout;