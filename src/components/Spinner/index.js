import React, { Component } from 'react';

import { View, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import oc from 'open-color-js';

import Spinner from 'react-native-spinkit';

class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      spinnerWrapperStyle,
      spinnerStyle,
      type,
      isVisible,
      color,
      size
    } = this.props;
    return (
      <View style={[styles.spinnerWrapper, spinnerWrapperStyle]}>
        <Spinner
          style={[styles.spinner, spinnerStyle]}
          isVisible={isVisible}
          size={size}
          type={type}
          color={color}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  spinnerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 10,
    backgroundColor: oc.gray3,
    // padding: 30,
    borderRadius: 50
  },
  spinner: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 10,
  }
});

Index.propTypes = {
  spinnerWrapperStyle: React.PropTypes.object,
  spinnerStyle: React.PropTypes.object,
  type: React.PropTypes.string,
  isVisible: React.PropTypes.bool,
  color: React.PropTypes.string,
  size: React.PropTypes.number
};

Index.defaultProps = {
  spinnerWrapperStyle: {},
  spinnerStyle: {},
  type: 'Arc',
  isVisible: true,
  color: oc.red9,
  size: 30
};
export default Index;
