'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigator, View, Text, StyleSheet, Button } from 'react-native';
import * as Animatable from 'react-native-animatable';
import ViewContainer from '../ViewContainer/index';
import oc from 'open-color-js';

import { setIsShowAppNavigator } from '../../actions/index';
import { ANIMATABLE_SPEED } from '../../reducers/ConstValue';

class AppNavigator extends Component {
  componentWillUpdate(nextProps) {
    if (this.props.isShowAppNavigator != nextProps.isShowAppNavigator) {
      if (!this.isHandling) {
        this.handleToggleFullScreen(this.appNavigator)(
          nextProps.isShowAppNavigator
        );
      }
    }
  }

  setIsShowAppNavigator(bool) {
    this.props.setIsShowAppNavigator(bool);
  }

  handleToggleFullScreen(element) {
    this.isHandling = true;
    return isShow => {
      isShow
        ? element.fadeInDown(ANIMATABLE_SPEED).then(endState => {
            console.log(
              endState.finished ? 'bounce finished' : 'bounce cancelled'
            );
            this.isHandling = false;
          })
        : element.fadeOutUp(ANIMATABLE_SPEED).then(endState => {
            console.log(
              endState.finished ? 'bounce finished' : 'bounce cancelled'
            );
            this.isHandling = false;
          });
    };
  }

  render() {
    const {
      style,
      Left,
      Center,
      Right,
      leftWrapperStyle,
      centerWrapperStyle,
      rightWrapperStyle
    } = this.props;
    return (
      <Animatable.View
        ref={ref => (this.appNavigator = ref)}
        animation=""
        style={[styles.container, style]}
      >
        <View style={[styles.left, leftWrapperStyle]}>{Left}</View>
        <View style={[styles.center, centerWrapperStyle]}>{Center}</View>
        <View style={[styles.right, rightWrapperStyle]}>{Right}</View>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    top: 0,
    width: '100%',
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: oc.cyan9
    // height: 35
  },
  left: { flex: 1, alignItems: 'flex-start', padding: 10 },
  center: { flex: 1, alignItems: 'center', padding: 10 },
  right: { flex: 1, alignItems: 'flex-end', padding: 10 }
});

function mapStateToProps({ isShowAppNavigator }) {
  return { isShowAppNavigator };
}

function mapDispatchToProps(dispatch) {
  return {
    setIsShowAppNavigator: bool => {
      dispatch(setIsShowAppNavigator(bool));
    }
  };
}

AppNavigator.propTypes = {
  style: React.PropTypes.object,
  leftWrapperStyle: React.PropTypes.object,
  centerWrapperStyle: React.PropTypes.object,
  rightWrapperStyle: React.PropTypes.object,
  isShowAppNavigator: React.PropTypes.bool,
  setIsShowAppNavigator: React.PropTypes.func,
  onLeftPress: React.PropTypes.func,
  onCenterPress: React.PropTypes.func,
  onRightPress: React.PropTypes.func,
  Left: React.PropTypes.element,
  Center: React.PropTypes.element,
  Right: React.PropTypes.element
};

AppNavigator.defaultProps = {
  style: {},
  leftWrapperStyle: {},
  centerWrapperStyle: {},
  rightWrapperStyle: {},
  onLeftPress: () => {},
  onCenterPress: () => {},
  onRightPress: () => {},
  Left: <Button title="left" />,
  Center: <Button title="Center" />,
  Right: <Button title="Right" />
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
