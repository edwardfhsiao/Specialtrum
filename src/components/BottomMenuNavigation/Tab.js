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
  Platform,
  View
} from 'react-native';
import oc from 'open-color-js';

const useNativeDriver = Platform.OS === 'android';

const easeInOut = new Easing.bezier(0.4, 0.0, 0.2, 1);
const easeOut = new Easing.bezier(0, 0, 0.2, 1);

class Tab extends Component {
  constructor(props) {
    super(props);
    const { active, label } = props;
    this.state = {
      fixed: {
        iconY: active ? new Animated.Value(-2) : new Animated.Value(0),
        labelScale: active ? new Animated.Value(1) : new Animated.Value(0.857),
        labelY: active ? new Animated.Value(0) : new Animated.Value(2),
        iconOpacity: active ? new Animated.Value(1) : new Animated.Value(0.8)
      },
      shifting: {
        labelOpacity: active ? new Animated.Value(1) : new Animated.Value(0),
        labelScale: active ? new Animated.Value(1) : new Animated.Value(0.857),
        iconY: active && label != ''
          ? new Animated.Value(0)
          : new Animated.Value(8),
        iconOpacity: active ? new Animated.Value(1) : new Animated.Value(0.7)
      }
    };
    this.handleTabPress = this.handleTabPress.bind(this);
  }

  componentWillReceiveProps(nextProps: TabProps) {
    const { props } = this;

    const fixedMode = !props.shifting;
    const shiftingMode = props.shifting;
    const willBeActive = !props.active && nextProps.active;
    const willBeInactive = props.active && !nextProps.active;

    if (fixedMode && willBeActive) {
      this.animateFixedInactiveToActive();
    } else if (fixedMode && willBeInactive) {
      this.animateFixedActiveToInactive();
    } else if (shiftingMode && willBeActive) {
      this.animateShiftingInactiveToActive();
    } else if (shiftingMode && willBeInactive) {
      this.animateShiftingActiveToInactive();
    }
  }

  componentDidMount() {}

  handleTabPress() {
    this.setTabActive();
  }

  animateFixedInactiveToActive() {
    const duration = 266;
    const easing = easeInOut;

    Animated.parallel([
      Animated.timing(this.state.fixed.iconY, {
        toValue: -2,
        duration,
        easing,
        useNativeDriver
      }),
      Animated.timing(this.state.fixed.labelScale, {
        toValue: 1,
        duration,
        easing,
        useNativeDriver
      }),
      Animated.timing(this.state.fixed.labelY, {
        toValue: 0,
        duration,
        easing,
        useNativeDriver
      }),
      Animated.timing(this.state.fixed.iconOpacity, {
        toValue: 1,
        duration,
        easing,
        useNativeDriver
      })
    ]).start();
  }

  animateFixedActiveToInactive() {
    const duration = 266;
    const easing = easeInOut;

    Animated.parallel([
      Animated.timing(this.state.fixed.iconY, {
        toValue: 0,
        duration,
        easing,
        useNativeDriver
      }),
      Animated.timing(this.state.fixed.labelScale, {
        toValue: 0.857,
        duration,
        easing,
        useNativeDriver
      }),
      Animated.timing(this.state.fixed.labelY, {
        toValue: 2,
        duration,
        easing,
        useNativeDriver
      }),
      Animated.timing(this.state.fixed.iconOpacity, {
        toValue: 0.8,
        duration,
        easing,
        useNativeDriver
      })
    ]).start();
  }

  animateShiftingInactiveToActive() {
    const easing = easeInOut;

    // HACK: See above "didOnceBecameActive"
    if (Platform.OS === 'android') {
      if (this.didOnceBecameActive) this.state.shifting.iconY.setValue(0);
      this.didOnceBecameActive = true;
    }

    Animated.parallel([
      this.props.label != ''
        ? Animated.timing(this.state.shifting.iconY, {
            toValue: 0,
            duration: 266,
            easing,
            useNativeDriver
          })
        : '',
      Animated.timing(this.state.shifting.iconOpacity, {
        toValue: 1,
        duration: 266,
        easing,
        useNativeDriver
      }),
      Animated.timing(this.state.shifting.labelOpacity, {
        toValue: 1,
        duration: 183,
        delay: 83,
        easing,
        useNativeDriver
      }),
      Animated.timing(this.state.shifting.labelScale, {
        toValue: 1,
        duration: 183,
        delay: 83,
        easing,
        useNativeDriver
      })
    ]).start();
  }

  animateShiftingActiveToInactive() {
    const easing = easeInOut;

    Animated.parallel([
      Animated.timing(this.state.shifting.iconY, {
        toValue: 8,
        duration: 266,
        easing,
        useNativeDriver
      }),
      Animated.timing(this.state.shifting.labelOpacity, {
        toValue: 0,
        duration: 83,
        easing,
        useNativeDriver
      }),
      Animated.timing(this.state.shifting.labelScale, {
        toValue: 0.857,
        duration: 83,
        easing,
        useNativeDriver
      }),
      Animated.timing(this.state.shifting.iconOpacity, {
        toValue: 0.8,
        duration: 266,
        easing,
        useNativeDriver
      })
    ]).start();
  }

  setTabActive() {
    // Setting the tab active is job of the BottomNavigation Component,
    // so call it's function to handle that.
    this.props.onTabPress({
      tabIndex: this.props.tabIndex,
      barBackgroundColor: this.props.barBackgroundColor,
      iconRef: this.tab
    });
  }

  getModeString() {
    if (this.props.shifting) return 'shifting';
    return 'fixed';
  }

  isFixed() {
    return !this.props.shifting;
  }

  getIconRef() {
    return this.tab;
  }

  renderIcon() {
    const mode = this.getModeString();
    const { active, icon, activeIcon } = this.props;

    return (
      <Animated.View
        style={[
          styles.icon,
          { transform: [{ translateY: this.state[mode].iconY }] },
          { opacity: this.state[mode].iconOpacity }
        ]}
      >
        <View ref={ref => (this.tab = ref)} collapsable={false}>
          {active && activeIcon ? activeIcon : icon}
        </View>
      </Animated.View>
    );
  }

  renderLabel() {
    const { active, labelColor, activeLabelColor, label } = this.props;

    return (
      <Animated.Text
        style={[
          { color: active && activeLabelColor ? activeLabelColor : labelColor },
          styles.label,
          this.isShifting() && { opacity: this.state.shifting.labelOpacity },
          this.isFixed() && {
            transform: [
              { scale: this.state.fixed.labelScale },
              { translateY: this.state.fixed.labelY }
            ]
          }
        ]}
        numberOfLines={1}
      >
        {label}
      </Animated.Text>
    );
  }

  isShifting() {
    return !!this.props.shifting;
  }

  render() {
    const { icon, label, active, barBackgroundColor } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.handleTabPress}>
        <View
          style={[
            styles.container,
            { backgroundColor: barBackgroundColor },
            this.isShifting() && active && styles.shiftingActiveContainer,
            { flex: label == '' ? 1 : 1.75 },
            this.isShifting() && !active && styles.shiftingInactiveContainer
          ]}
        >
          {this.renderIcon()}
          {this.renderLabel()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flex: 1,
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 10,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: 'transparent'
  },
  shiftingInactiveContainer: {
    maxWidth: 96,
    flex: 1
  },
  shiftingActiveContainer: {
    maxWidth: 168,
    flex: 1.75
  },
  icon: {
    width: 24,
    height: 24,
    backgroundColor: 'transparent'
  },
  label: {
    fontSize: 14,
    width: 168,
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent'
  }
});

Tab.propTypes = {
  label: React.PropTypes.string
};

Tab.defaultProps = {
  label: ''
};

export default Tab;
