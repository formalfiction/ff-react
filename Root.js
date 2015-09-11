import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import Playground from './Playground';

// React components for Redux DevTools
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

const store = configureStore();

class Root extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>{()=><App />}</Provider>
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      </div>
    );
  }
}

export default Root;