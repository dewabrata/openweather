import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/router/Router';
import { Provider } from 'react-redux';
import store from './src/redux/Store';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Router/>
        </NavigationContainer>
      </Provider>
    )
  }
}
