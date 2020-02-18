/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, Fragment} from 'react';
import List from './components/List';
import store from './store';
import {Provider} from 'react-redux';
class App extends Component {
  render() {
    return (
      <Fragment>
        <Provider store={store}>
          <List />
        </Provider>
      </Fragment>
    );
  }
}

export default App;
