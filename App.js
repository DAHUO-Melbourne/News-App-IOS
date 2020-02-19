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
import {Button} from 'react-native';
const Stack = createStackNavigator();
class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Fragment>
          <Provider store={store}>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={List} />
              <Stack.Screen
                name="Details"
                component={Content}
                options={{
                  headerTitle: 'Details',
                  headerRight: () => (
                    <Button
                      onPress={() => alert('This is a button!')}
                      title="A"
                      color="#000"
                      style={{marginRight:10}}
                    />
                  ),
                }}
              />
            </Stack.Navigator>
          </Provider>
        </Fragment>
      </NavigationContainer>
    );
  }
}

export default App;
