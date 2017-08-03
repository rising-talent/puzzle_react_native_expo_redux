import React from 'react';
import {
  TabNavigator,
  StackNavigator,
  addNavigationHelpers
} from 'react-navigation';

import { bindActionCreators } from 'redux'
import { ActionCreators } from '../redux/actions'
import { connect } from 'react-redux'
import AppNavigator from './AppNavigator'

class AppWithNav extends React.Component {
  render() {
    return (
      <AppNavigator/>
    );
  }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => { 
    return {}
}, mapDispatchToProps)(AppWithNav);
