import React from 'react';

import {
  TabNavigator,
  StackNavigator,
  StackRouter
} from 'react-navigation';

import Login from './login'
import Home from './home'
import Setting from './setting'

const AppNavigator = StackNavigator({
  login: {
    screen: Login,
    navigationOptions: () => ({
      title: 'Login Page',
    }),
  },
  home: {
    screen: Home,
    title: 'Home page'
  },  
  setting: {
    screen: Setting,
    title: 'setting page'
  }
},{
  headerMode: 'none',
});

export default AppNavigator;
