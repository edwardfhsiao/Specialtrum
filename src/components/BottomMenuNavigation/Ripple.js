import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  TouchableWithoutFeedback,
  ActivityIndicator,
  Navigator,
  StatusBar,
  StyleSheet,
  TabBarIOS,
  AlertIOS,
  Text,
  Animated,
  Dimensions,
  Easing,
  View,
  Platform
} from 'react-native';
import oc from 'open-color-js';

const easeInOut = new Easing.bezier(0.4, 0.0, 0.2, 1);
const easeOut = new Easing.bezier(0, 0, 0.2, 1);

class Ripple extends Component {
  constructor(props) {
    super(props);
    this.maxRippleOpacity = 0.12;
    this.size = 100;

    this.state = {
      opacity: new Animated.Value(0),
      scale: new Animated.Value(0.01),
      animating: false
    };
  }

  componentDidMount() {}

  handleTabPress() {
    this.setTabActive();
  }

  render() {
    const { color, x, y } = this.props;
    const { scale, opacity, animating } = this.state;
    const { size } = this;

    if (!animating) return null;

    return (
      <Animated.View
        style={{
          backgroundColor: this.props.color,
          position: 'absolute',
          top: this.props.y - size / 2,
          left: this.props.x - size / 2,
          width: size,
          height: size,
          borderRadius: size / 2,
          opacity,
          zIndex: 11,
          transform: [{ scale }]
        }}
      />
    );
  }

  run = () => {
    const useNativeDriver = Platform.OS === 'android';

    // Render the Component
    this.setState({ animating: true });
    this.state.opacity.setValue(this.maxRippleOpacity);

    // GET TO THE CHOPPA
    Animated.parallel([
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 200,
        easing: easeOut,
        useNativeDriver
      }),
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: 300,
        easing: easeOut,
        useNativeDriver
      })
    ]).start(() => {
      // Initial values
      this.state.scale.setValue(0.01);
      this.state.opacity.setValue(0);

      // Don't render the Component anymore
      this.setState({ animating: true });
    });
  };
}

Ripple.propTypes = {
  label: React.PropTypes.string
};

Ripple.defaultProps = {
  label: ''
};

export default Ripple;
