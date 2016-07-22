import React from 'react';
import Relay from 'react-relay';

class App extends React.Component {
  render() {
      console.log(this.props)
    return (
        <div>
            <h1>Daenerys Web Client</h1>
            <div>
                Currently connected to <strong>{this.props.viewer.name}</strong> at <emph>{this.props.viewer.url}</emph>
            </div>
        </div>
    );
  }
}

export default Relay.createContainer(App, {
    fragments: {
        viewer: () => Relay.QL`
            fragment on Realm {
                name
            }
        `,
    },
});