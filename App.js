import React, { Component } from 'react'
import { Text, View } from 'react-native'
import HistoryWeather from './HistoryWeather'
import MainApp from './MainApp'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="MainApp">
        <Stack.Screen name="MainApp" component={MainApp} />
        <Stack.Screen name="HistoryWeather" component={HistoryWeather} />
      </Stack.Navigator>
    </NavigationContainer>
    )
  }
}
