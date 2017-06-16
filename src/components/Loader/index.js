import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
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
  View
} from 'react-native';
import oc from 'open-color-js';
import LoaderItem from './LoaderItem';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      circles: []
    };
    this.counter = 1;
    this.setInterval = null;
    this.anim = new Animated.Value(1);
  }

  componentDidMount() {
    this.setCircleInterval();
  }

  setCircleInterval() {
    this.setInterval = setInterval(
      this.addCircle.bind(this),
      this.props.interval
    );
    this.addCircle();
  }

  addCircle() {
    this.setState({ circles: [...this.state.circles, this.counter] });
    this.counter++;
  }

  render() {
    const { size, avatarBackgroundColor, interval, borderColor } = this.props;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
      <Text style={{color: '#fff'}}>dddddd</Text>
        {this.state.circles.map(circle => (
          <LoaderItem key={circle} {...this.props} />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({});

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

Index.propTypes = {
  interval: React.PropTypes.number,
  size: React.PropTypes.number,
  pulseMaxSize: React.PropTypes.number,
  avatarBackgroundColor: React.PropTypes.string,
  pressInValue: React.PropTypes.number,
  pressDuration: React.PropTypes.number,
  borderColor: React.PropTypes.string,
  backgroundColor: React.PropTypes.string,
  getStyle: React.PropTypes.func,
};

Index.defaultProps = {
  interval: 2000,
  size: 100,
  pulseMaxSize: 250,
  avatarBackgroundColor: 'white',
  pressInValue: 0.8,
  pressDuration: 150,
  pressInEasing: Easing.in,
  pressOutEasing: Easing.in,
  borderColor: '#D8335B',
  backgroundColor: '#ED225B55',
  getStyle: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
