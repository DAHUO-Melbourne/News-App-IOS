/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, Fragment} from 'react';
import List from './components/List';
import Content from './components/Content';
import store from './store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Fragment>
          <Provider store={store}>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={List} />
              <Stack.Screen name="Details" component={Content} />
            </Stack.Navigator>
          </Provider>
        </Fragment>
      </NavigationContainer>
    );
  }
}

export default App;
