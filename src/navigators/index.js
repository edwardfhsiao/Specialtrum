import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Index from '../pages/Index/index';
import Main from '../pages/Main/index';
import Photo from '../pages/Photo/index';

export const AppNavigator = StackNavigator(
  {
    Index: { screen: Index },
    Main: { screen: Main },
    Photo: { screen: Photo }
  },
  {
    // initialRouteName: 'Photo',
    // headerMode: 'none' // <- needed for being able to toggle header visibility
  }
);

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);
