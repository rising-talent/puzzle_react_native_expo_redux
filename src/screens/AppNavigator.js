import React from 'react';

import {
  TabNavigator,
  StackNavigator,
  StackRouter
} from 'react-navigation';

import Login from './login'
import Home from './home'
import Setting from './setting'
import TrophyList from './trophies'

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

const MainNavigator = StackNavigator(
  {
    mainnavigator: { screen: AppNavigator },
    trophylist: { screen: TrophyList },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

export default MainNavigator;
