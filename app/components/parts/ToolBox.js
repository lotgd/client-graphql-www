import React,  {Component, PropTypes} from 'react';

class ToolBox extends Component {
    static PropType = {
        children: PropTypes.arrayOf(Tool).isRequired
    };

    render() {
        console.log("ToolBox");
        console.log(this.props.children);

        return <menu className="w3-navbar w3-dark-grey">
            {this.props.children}
        </menu>
    }
}

class Tool extends Component {
    static PropType = {
        type: PropTypes.oneOf(["left", "right"]),
        children: PropTypes.string.isRequired,
        onClick: PropTypes.func,
    };

    static defaultProps = {
        type: "left",
        onClick: null,
    };

    render() {
        console.log("Tool");
        console.log(this.props.children);

        let rightClass = "";

        if (this.props.type === "right") {
            rightClass = "w3-right";
        }


        return <li
            className={rightClass}
            onClick={this.props.onClick}
        >
            <a>{this.props.children}</a>
        </li>
    }
}

export {ToolBox, Tool};