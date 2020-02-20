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
import {Button, Slider, StyleSheet} from 'react-native';
const Stack = createStackNavigator();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressStatus: false,
    };
    this.handlePress = this.handlePress.bind(this);
  }
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
                      onPress={this.handlePress}
                      title="A"
                      color="#000"
                      // eslint-disable-next-line react-native/no-inline-styles
                      style={{marginRight: 10}}
                    />
                  ),
                }}
              />
            </Stack.Navigator>
            <Slider
              step={1}
              maximumValue={100}
              onValueChange={() => alert('AAA')}
              value={10}
              // eslint-disable-next-line react-native/no-inline-styles
              style={
                this.state.pressStatus ? styles.sliderShow : styles.sliderHide
              }
            />
          </Provider>
        </Fragment>
      </NavigationContainer>
    );
  }
  handlePress() {
    if (this.state.pressStatus === true) {
      this.setState(() => ({
        pressStatus: false,
      }));
    } else {
      this.setState(() => ({
        pressStatus: true,
      }));
    }
//    alert(this.state.pressStatus);
  }
}

const styles = StyleSheet.create({
  sliderShow: {
    position: 'relative',
    bottom: 300,
    backgroundColor: 'black',
    marginLeft: 20,
    marginRight: 20,
    opacity: 0.5,
    display: 'flex',
  },
  sliderHide: {
    position: 'relative',
    bottom: 300,
    backgroundColor: 'black',
    marginLeft: 20,
    marginRight: 20,
    opacity: 0.5,
    display: 'none',
  },
  viewShow: {
    display: 'flex',
  },
  viewHide: {
    display: 'none',
  },
});

export default App;
