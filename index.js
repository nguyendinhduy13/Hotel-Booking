/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import store from './src/redux/store';
import { Provider as ReduxProvider } from 'react-redux';
AppRegistry.registerComponent(appName, () => () => (
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>
));
