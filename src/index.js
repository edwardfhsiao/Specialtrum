/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reducers, { getRootReducer, navReducer } from './reducers/index';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import AppWithNavigationState from './navigators/index';

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default class yismage extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
