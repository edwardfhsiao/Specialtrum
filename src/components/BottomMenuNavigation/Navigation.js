import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ActivityIndicator,
  LayoutAnimation,
  findNodeHandle,
  Navigator,
  StatusBar,
  StyleSheet,
  TabBarIOS,
  AlertIOS,
  Text,
  Animated,
  Dimensions,
  Easing,
  View
} from 'react-native';
import oc from 'open-color-js';
import R from 'ramda';
import Ripple from './Ripple';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: props.activeTab,
      backgroundColor: props.backgroundColor,
      pressRippleColor: 'transparent',
      rippleX: 0,
      rippleY: 0
    };
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  componentWillMount() {
    const { children } = this.props;
    const { activeTab } = this.state;
    const { barBackgroundColor } = children[activeTab].props;

    this.iconPositions = new Array(children.length).fill({ x: 0, y: 0 });

    if (children.length > 5) {
      if (__DEV__) {
        console.warn(
          "You shouldn't put more than 5 Tabs in the " +
            "BottomNavigation. Styling may break and it's against the specs " +
            'in the Material Design Guidelines.'
        );
      }
    }

    // Set Initial Bar backgroundColor, if Tab has any
    if (barBackgroundColor) {
      this.setState({
        backgroundColor: barBackgroundColor
      });
    }
  }
  componentDidMount() {
    // Measure all icons in order to display Ripples correctly
    setTimeout(() => this.measureIcons());
  }
  componentDidUpdate() {
    // `this.layoutWillChange` will be set to true right before state.activeTab
    // is updated. Then, and only then, we had a true layout change, and thus
    // we want to measure the icons.
    if (this.layoutWillChange) {
      setTimeout(() => this.measureIcons());
      this.layoutWillChange = false;
    }
  }
  handleTabChange({ tabIndex, barBackgroundColor }) {
    const { x, y } = this.iconPositions[tabIndex];

    // Directly save the active tab index, but not in the state.
    // This way we can block any componentUpdate when the activeTab prop is
    // set to a value which the BottomNavigation already has.
    // (see componentWillReceiveProps)
    this.nextActiveTab = tabIndex;

    // Delegation to next tick will cause smoother animations
    setTimeout(() => {
      // Call onTabChange Event Callback
      this.props.onTabChange(tabIndex, this.state.activeTab);

      // Prepare Ripple Background Animation
      this.setState({
        pressRippleColor: barBackgroundColor,
        rippleX: x + 12, // + 12 because icon has size 24
        rippleY: 28 // 56/2, vertical middle of component
      });

      // Show the PressRipple Animation
      this.ripple.run();

      // // If color changes, run RippleBackground Animation
      // if (this.state.backgroundColor !== barBackgroundColor) {
      //   this.refs.backgroundRipple.run(() => {
      //     // After that, set the new bar background color
      //     this.setState({ backgroundColor: barBackgroundColor });
      //   });
      // }
      this.setState({ activeTab: tabIndex });
    });
  }

  measureIcons() {
    const navHandle = findNodeHandle(this.navigation);

    this.props.children.forEach((child, tabIndex) => {
      // If Component was unmounted meanwhile, stop measuring
      if (this.refs[`tab_${tabIndex}`] == null) return;

      this.refs[`tab_${tabIndex}`]
        .getIconRef()
        .measureLayout(navHandle, (x, y) => {
          // Save current icon position
          this.iconPositions[tabIndex] = { x, y };
        });
    });
  }

  render() {
    const {
      size,
      avatarBackgroundColor,
      interval,
      borderColor,
      children
    } = this.props;
    const { activeTab, rippleX, rippleY } = this.state;
    console.log(rippleX);
    var shifting = this.props.shifting != null
      ? this.props.shifting
      : this.props.children.length > 3;
    return (
      <View style={styles.container} ref={ref => (this.navigation = ref)}>
        <Ripple
          ref={ref => (this.ripple = ref)}
          color={this.props.rippleColor}
          x={rippleX}
          y={rippleY}
        />
        {React.Children.map(children, (child, tabIndex) =>
          React.cloneElement(child, {
            shifting,
            active: tabIndex === activeTab,
            tabIndex: tabIndex,
            onTabPress: this.handleTabChange,
            ref: `tab_${tabIndex}`,

            // Pass setted props, or inherited props by parent component
            labelColor: child.props.labelColor || this.props.labelColor,
            activeLabelColor: child.props.activeLabelColor ||
              this.props.activeLabelColor,
            barBackgroundColor: child.props.barBackgroundColor ||
              this.props.backgroundColor
          })
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: oc.cyan9
  }
});

Navigation.propTypes = {
  children: React.PropTypes.array,
  style: React.PropTypes.object,
  activeTab: React.PropTypes.number,
  backgroundColor: React.PropTypes.string,
  pressRippleColor: React.PropTypes.string,
  rippleX: React.PropTypes.number,
  rippleY: React.PropTypes.number
};

Navigation.defaultProps = {
  style: {},
  activeTab: 0,
  labelColor: 'rgba(0, 0, 0, 0.54)',
  rippleColor: 'black',
  backgroundColor: 'white',
  onTabChange: () => {}
};

export default Navigation;
