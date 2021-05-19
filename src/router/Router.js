import React, { Component } from 'react';
import { View, Text } from 'react-native';
import HistoryWeather from '../page/HistoryWeather'
import MainApp from '../page/MainApp'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

class Router extends Component {

  render() {
    return (
        <Stack.Navigator initialRouteName="MainApp">
            <Stack.Screen name="MainApp" component={MainApp} />
            <Stack.Screen name="HistoryWeather" component={HistoryWeather} />
        </Stack.Navigator>
    );
  }
}

export default Router;
