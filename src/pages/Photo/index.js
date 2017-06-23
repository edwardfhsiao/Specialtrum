'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  TouchableOpacity,
  StatusBar,
  Navigator,
  View,
  Button,
  Text,
  StyleSheet,
  Image,
  ListView,
  Dimensions,
  TouchableHighlight,
  TouchableWithoutFeedback
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import ViewContainer from '../../components/ViewContainer/index';
import NotFound from '../../components/NotFound/index';
import R from 'ramda';
import oc from 'open-color-js';
import * as Animatable from 'react-native-animatable';
// import PhotoView from 'react-native-photo-view';
import PhotoView from 'react-native-transformable-image';
import BottomMenuNavigation, {
  Tab
} from '../../components/BottomMenuNavigation/index';
import {
  renderAppNavigator,
  AppNavigatorIconButton
} from '../../components/AppNavigator/appNavigatorHelper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

import { setIsShowAppNavigator } from '../../actions/index';
import { ANIMATABLE_SPEED } from '../../reducers/ConstValue';

const WINDOW = Dimensions.get('window');

// import GL from 'gl-react';
// const GL = require('gl-react');
// const { Surface } = require('gl-react-native'); // in React Native context

// const shaders = GL.Shaders.create({
//   helloGL: {
//     frag: `
// precision highp float;
// varying vec2 uv;
// uniform float blue;
// void main () {
//   gl_FragColor = vec4(uv.x, uv.y, blue, 1.0);
// }`
//   }
// });

// // create React components
// const HelloGL = GL.createComponent(({ blue }) => (
//   <GL.Node shader={shaders.helloGL} uniforms={{ blue }} />
// ));

import Example from './gl';

class Photo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFullImage: true,
      isLoading: true,
      pressStatus: false
    };
    this.data = this.props.navigation.state.params;
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    const leftComponent = (
      <AppNavigatorIconButton
        onPress={() => params.back()}
        name="chevron-left"
        iconCollection="Entypo"
      />
    );
    const centerComponent = <Text style={{ color: '#fff' }}>Specialtrum</Text>;
    const rightComponent = (
      <AppNavigatorIconButton
        onPress={() => params.go('Main')}
        name="chevron-right"
        iconCollection="Entypo"
      />
    );
    return {
      header: renderAppNavigator(
        { backgroundColor: oc.gray9 },
        leftComponent,
        centerComponent,
        rightComponent
      )
    };
  };

  componentWillUpdate(nextProps, nextState) {
    if (this.props.isShowAppNavigator != nextProps.isShowAppNavigator) {
      if (!this.isHandling) {
        this.handleToggleFullScreen(this.menu)(nextProps.isShowAppNavigator);
      }
    }
  }
  componentWillMount() {
    this.props.navigation.setParams({
      back: this.back.bind(this),
      go: this.go.bind(this)
    });
  }

  back() {
    this.props.navigation.goBack();
  }

  go(name) {
    this.props.navigation.navigate(name, { name: 'Brent' });
  }

  appNavigatorCallback() {
    console.log('ss');
  }

  componentDidMount() {
    this.toggleIsLoading(false);
    setTimeout(() => {
      this.data.callback && this.data.callback();
    }, 500);
  }

  handleToggleFullScreen(element) {
    this.isHandling = true;
    return isShow => {
      isShow
        ? element.fadeInUp(ANIMATABLE_SPEED).then(endState => {
            console.log(
              endState.finished ? 'bounce finished' : 'bounce cancelled'
            );
            this.isHandling = false;
          })
        : element.fadeOutDown(ANIMATABLE_SPEED).then(endState => {
            console.log(
              endState.finished ? 'bounce finished' : 'bounce cancelled'
            );
            this.isHandling = false;
          });
    };
  }

  leftButtom(ref) {
    console.log('leftButtom');
  }

  rightButtom() {
    console.log('rightButtom');
  }

  setIsShowAppNavigator(bool) {
    this.props.setIsShowAppNavigator(bool);
  }

  toggleIsLoading(isLoading) {
    this.setState({ isLoading });
  }

  render() {
    const { image } = this.data;
    const { isShowAppNavigator } = this.props;
    if (!R.isNil(image) && !R.isEmpty(image)) {
      const {
        data,
        uri,
        origURL,
        isVertical,
        width,
        height,
        fileSize,
        fileName,
        timestamp
      } = image;
      const { showFullImage, isLoading } = this.state;
      return (
        <View style={styles.body}>
          <Example/>
        </View>
      );
    } else {
      return <NotFound />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    backgroundColor: oc.gray8,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  spinnerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 10,
    backgroundColor: oc.gray3,
    padding: 10,
    borderRadius: 50
    // borderWidth: 50,
  },
  spinner: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 10
  },
  icon: {
    alignItems: 'center',
    backgroundColor: oc.gray2,
    justifyContent: 'center'
  },
  text: {
    flex: 1,
    fontSize: 20
  },
  linearGradient: {
    flex: 1
    // paddingLeft: 15,
    // paddingRight: 15,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent'
  }
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

Photo.propTypes = {
  setIsShowAppNavigator: React.PropTypes.func,
  isShowAppNavigator: React.PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
