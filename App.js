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
      value: 10,
    };
    this.handlePress = this.handlePress.bind(this);
  }
  render() {
//    alert('MMM');
    return (
      <NavigationContainer>
        <Fragment>
          <Provider store={store}>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={List} />
              <Stack.Screen
                name="Details"
                initialParams={{value: this.state.value}}
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
                }}>
                {props => (
                  <Content {...props} extraData={{value: this.state.value}} />
                )}
              </Stack.Screen>
            </Stack.Navigator>
          </Provider>
          <Slider
            step={1}
            maximumValue={100}
            onSlidingComplete={value => {
              this.setState(() => ({
                value: value,
              }));
            }}
            value={10}
            // eslint-disable-next-line react-native/no-inline-styles
            style={
              this.state.pressStatus ? styles.sliderShow : styles.sliderHide
            }
          />
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
  }
  handleMove(value) {
    this.setState(() => ({
      value: value,
    }));
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
});

export default App;
