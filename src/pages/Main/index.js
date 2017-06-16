import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppNavigator from '../../components/AppNavigator/index';

import {
  NavigatorIOS,
  StyleSheet,
  TabBarIOS,
  AlertIOS,
  Text,
  View
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import oc from 'open-color-js';
import Index from '../Index/index';
import Photo from '../Photo/index';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Index,
          title: ''
        }}
        navigationBarHidden={true}
        style={{ flex: 1 }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: oc.red9
  }
});

function mapStateToProps(state) {
  let { articleList } = state;
  return { articleList };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchArticles: page => {
      dispatch(fetchArticles(page));
    }
  };
}

App.propTypes = {
  fetchArticles: React.PropTypes.func.isRequired,
  articleList: React.PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
