import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { TextInput } from './ui.js';

const SettingsView = observer(class SettingsView extends Component {
  handleChangeToken = e => {
    this.props.settings.apiToken = e.target.value;
  }

  render() {
    const { apiToken } = this.props.settings;

    return (
      <div>
        <strong>GitHub API Token</strong>
        <TextInput 
          style={{ width: '100%', fontFamily: 'monospace' }} 
          onChange={this.handleChangeToken} 
          value={apiToken}
        />
      </div>
    );
  }
});

export default SettingsView;
