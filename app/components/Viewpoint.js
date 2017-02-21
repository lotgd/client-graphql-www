import React from 'react';
import Relay from 'react-relay';

import Configuration from './Configuration';
import Offline from './Offline';
import Online from './Online';
import UserRoute from '../routes/UserRoute';

import TakeActionMutation from '../mutations/TakeActionMutation';

function Action(props) {
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
});