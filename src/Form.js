import React from 'react';

function Element(props) {
    switch (props.type) {
        case "textarea":
            var formElement = <textarea>

            </textarea>
            break;
        default:
            var formElement = <input
                type={props.type}
                className="w3-input"
                name={props.fieldName}
                value={props.value}
                onChange={props.onChange}
            />
    }

    return <label>
        {props.label}

        {formElement}
    </label>
}

class Form extends React.Component {
    constructor(props) {
        super(props);

        var newState = {};

        this.props.fields.map((fieldData) => {
            newState[fieldData.fieldName] = fieldData.defaultValue;
        });

        this.state = newState;
    }

    onChange(field, e) {
        var newState = {};
        newState[field] = e.target.value;

        this.setState(newState);
    }

    render() {
        var i = 0;

        return <div className="d-form">
            {this.props.fields.length > 0 && this.props.fields.map((fieldData) => {
                var key = "label_" + i;
                i++;

                return <Element
                    key={key}
                    type={fieldData.type}
                    label={fieldData.label}
                    fieldName={fieldData.fieldName}
                    value={this.state[fieldData.fieldName]}
                    onChange={this.onChange.bind(this, fieldData.fieldName)}
                />
            })}

            <button className="w3-button" onClick={() => {this.props.onSubmit(this.state)}}>{this.props.submitButton}</button>
        </div>;
    }
}

export default Form