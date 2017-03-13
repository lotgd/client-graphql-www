import React, {Component, PropTypes} from 'react';
import {graphql} from 'react-apollo';

import ThreeColumnLayout from './parts/ThreeColumnLayout';
import Message from './parts/Message';

import getViewpointForCharacter from '../queries/getViewpointForCharacter.graphql';
import TakeActionMutation from './../mutations/TakeActionMutation.graphql';

class SceneRender extends Component {
    static PropType = {
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    };

    render() {
        return <div id="sceneRender">
            <h2>{this.props.title}</h2>

            {this.props.description}
        </div>
    }
}

class ActionRender extends Component {
    static PropType = {
        actionGroups: PropTypes.object.isRequired,
        takeAction: PropTypes.func.isRequired,
    };

    render() {
        return <div id="actionRender">
            {this.props.actionGroups.map((actionGroup) => {
                return <ActionGroup
                    key={actionGroup.id}
                    id={actionGroup.id}
                    title={actionGroup.title}
                    actions={actionGroup.actions}
                    takeAction={this.props.takeAction}
                />;
            })}
        </div>;
    }
}

class ActionGroup extends Component {
    static PropType = {
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        actions: PropTypes.array.isRequired,
        takeAction: PropTypes.func.isRequired,
    };

    render() {
        if (this.props.actions.length === 0 || this.props.id === "lotgd/core/hidden") {
            return null;
        }

        return <div className="d-actionGroup">
            <span className="d-actionGroupTitle">{this.props.title}</span>

            {this.props.actions.map((action) => {
                return <Action
                    key={action.id}
                    id={action.id}
                    title={action.title}
                    takeAction={this.props.takeAction}
                />;
            })}
        </div>;
    }
}

class Action extends Component {
    static PropType = {
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        takeAction: PropTypes.func.isRequired,
    };

    render() {
        return (<a className="d-actionItem" onClick={() => {this.props.takeAction(this.props.id)}}>
            {this.props.title}
        </a>);
    }
}

@graphql(getViewpointForCharacter, {
    options: (ownProps) => ({
        variables: {
            characterId: ownProps.characterId
        }
    })
})
@graphql(TakeActionMutation, {
    name: "takeAction",
    options: {
        updateQueries: {
            getViewpointForCharacter: (prev, {mutationResult}) => {
                return mutationResult.data.takeAction;
            }
        }
    }
})
class Viewpoint extends Component {
    static PropType = {
        characterId: PropTypes.string.isRequired,
        data: PropTypes.shape({
            loading: PropTypes.bool,
            error: PropTypes.object,
            viewpoint: PropTypes.object
        }).isRequired,
        takeAction: PropTypes.func.isRequired,
    };

    onTakeAction(actionId) {
        let a = this.props.takeAction({
            variables: {
                input: {
                    characterId: this.props.characterId,
                    actionId: actionId,
                }
            }
        });
        console.log(a);
    }

    render() {
        let left = null;
        let right = null;
        let middle = "";

        if (this.props.data.loading) {
            middle = <Message message="Viewpoint is loading..." />
        } else if (this.props.data.error) {
            console.log(this.props.data.error);
            middle = <Message message="An error occured during loading viewpoint." error={false} />
        } else {
            let viewpoint = this.props.data.viewpoint;

            left = <ActionRender
                actionGroups={viewpoint.actionGroups}
                takeAction={this.onTakeAction.bind(this)}
            />

            middle = <SceneRender
                title={viewpoint.title}
                description={viewpoint.description}
            />;
        }

        return <ThreeColumnLayout
            left={left}
            right={right}
            middle={middle}
        />
    }
}

export default Viewpoint;

/*function Action(props) {
    return (<a onClick={() => {props.onTakeAction(props.data.id);}}>
        {props.data.title}
    </a>);
}

function ActionGroup(props) {
    if (props.data.id === "lotgd/core/hidden") {
        return null;
    } else {
        return (
            <div>
                {props.data.title.length > 0 &&
                    <span className="actionTitle">{props.data.title} {props.data.id}</span>
                }
                {props.data.actions.map((entry) => {
                    return <Action
                        key={entry.id}
                        data={entry}
                        onTakeAction={props.onTakeAction}
                    />
                })}
            </div>
        );
    }
}

var Viewpoint = React.createClass({
    takeAction: function(actionId) {
        this.props.relay.commitUpdate(
            new TakeActionMutation({
                characterId: this.props.characterId,
                actionId: actionId,
                viewpoint: this.props.viewpoint,
            }), {
                onFailure: (response) => {this.onTakeActionFailure(this, response)},
                onSuccess: (response) => {this.onTakeActionSuccess(this, response)},
            }
        );
    },

    onTakeActionFailure: (self, response) => {
    },

    onTakeActionSuccess: (self, response) => {
        self.setState({updatedViewpoint: response.takeAction.viewpoint});
    },

    getInitialState: function() {
        return {
            characterId: false,
            updatedViewpoint: null,
        };
    },

    render: function() {
        console.log(this.props.viewpoint);
        var Viewpoint = this.props.viewpoint;
        if (this.state.updatedViewpoint !== null) {
            Viewpoint = this.state.updatedViewpoint;
        }

        return (
            <div id="viewpoint" className="w3-row">
                <div id="viewpoint-actions" className="w3-col l3 m2">&nbsp;
                    {Viewpoint.actionGroups.length > 0 &&
                        <nav>
                            {Viewpoint.actionGroups.map((entry) => {
                                return <ActionGroup
                                    key={entry.id}
                                    data={entry}
                                    onTakeAction={this.takeAction}
                                />
                            })}
                        </nav>
                    }
                </div>
                <div id="viewpoint-scene" className="w3-col l6 m8">
                    <h2>{Viewpoint.title}</h2>

                    {Viewpoint.description}
                </div>
                <div id="character-stats" className="w3-col l3 m2">
                    CharacterStats
                </div>
            </div>
        );
    },
});

export default Relay.createContainer(Viewpoint, {
    fragments: {
        viewpoint: () => Relay.QL`
            fragment on Viewpoint {
                title,
                description,
                actionGroups {
                    id,
                    title,
                    sortKey,
                    actions {
                        id,
                        title,
                    }
                }
            }
        `
    }
});*/