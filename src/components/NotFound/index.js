import React, { Component } from 'react';

import { View, StyleSheet, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import oc from 'open-color-js';

import Spinner from 'react-native-spinkit';
import ViewContainer from '../ViewContainer/index';

class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      wrapperStyle,
      textStyle,
      text,
    } = this.props;
    return (
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.text, textStyle]}>
          {text}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: oc.gray9,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: oc.gray1
  }
});

Index.propTypes = {
  wrapperStyle: React.PropTypes.object,
  textStyle: React.PropTypes.object,
  text: React.PropTypes.number
};

Index.defaultProps = {
  wrapperStyle: {},
  textStyle: {},
  text: 'Something weird is happening...'
};
export default Index;
