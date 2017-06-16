import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppNavigator from '../../components/AppNavigator/index';
import { NavigationActions } from 'react-navigation';

import {
  Navigator,
  StatusBar,
  StyleSheet,
  TabBarIOS,
  AlertIOS,
  TouchableHighlight,
  Text,
  CameraRoll,
  View
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import oc from 'open-color-js';
import ImagePicker from 'react-native-image-picker';
import Loader from '../../components/Loader/index';
import Photo from '../../pages/Photo/index';

import Spinner from '../../components/Spinner/index';
const SIZE = 25;
class Index extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      index: 12,
      types: [
        'CircleFlip',
        'Bounce',
        'Wave',
        'WanderingCubes',
        'Pulse',
        'ChasingDots',
        'ThreeBounce',
        'Circle',
        '9CubeGrid',
        'WordPress',
        'FadingCircle',
        'FadingCircleAlt',
        'Arc',
        'ArcAlt'
      ],
      size: 100,
      color: '#FFFFFF',
      isLoading: false,
      isVisible: false,
      pressStatus: false
    };
    this.selectPhoto = this.selectPhoto.bind(this);
    this.callback = this.callback.bind(this);

    this.onHideUnderlay = this.onHideUnderlay.bind(this);
    this.onShowUnderlay = this.onShowUnderlay.bind(this);
  }

  componentDidMount() {
  //   CameraRoll.getPhotos({
  //   first: 35,
  //   groupTypes: 'SavedPhotos',
  //   assetType: 'Photos',
  // }).then(res => {
  //     debugger;
  //   });
  }

  onHideUnderlay() {
    this.setState({ pressStatus: false });
  }
  onShowUnderlay() {
    this.setState({ pressStatus: true });
  }
  setIsLoading(bool) {
    this.setState({ isLoading: bool });
  }
  callback() {
    this.setIsLoading(false);
  }
  selectPhoto() {
    this.setIsLoading(true);
    var options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
        this.setIsLoading(false);
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.props.goto('Photo', {
          callback: this.callback,
          image: response
        });
        // this.props.navigator.push({
        //   component: Photo,
        //   tintColor: oc.gray1,
        //   barTintColor: oc.gray9,
        //   title: 'Bar That',
        //   passProps: { image: response },
        //   callback: this.callback,
        //   navigationBarHidden: false,
        //   // onLeftButtonPress: () => this._handleNavigationRequest(),
        //   rightButtonTitle: 'Custom right',
        //   onRightButtonPress: () => {
        //     AlertIOS.alert(
        //       'Bar Button Action',
        //       'Recognized a tap on the bar button icon',
        //       [
        //         {
        //           text: 'OK',
        //           onPress: () => console.log('Tapped OK')
        //         }
        //       ]
        //     );
        //   }
        // });
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        // this.setState({
        //   avatarSource: source
        // });
      }
    });
  }

  render() {
    var type = this.state.types[this.state.index];
    const { isLoading, pressStatus } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
          hidden={true}
        />
        <View style={styles.body}>
          {/*<Loader borderColor={oc.blue5} />*/}
          <Spinner
            isVisible={isLoading}
            type={type}
            color={oc.red6}
            size={SIZE}
          />
          <TouchableHighlight
            style={isLoading ? { opacity: 0 } : { opacity: 1 }}
            onPress={this.selectPhoto}
            activeOpacity={10}
            underlayColor="transparent"
            onHideUnderlay={this.onHideUnderlay}
            onShowUnderlay={this.onShowUnderlay}
          >
            <EvilIcons
              name="plus"
              size={100}
              color={oc.gray2}
              style={pressStatus ? { opacity: 0.9 } : { opacity: 1 }}
            />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    backgroundColor: oc.gray9,
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
  text: {
    flex: 1,
    fontSize: 20
  }
});

function mapStateToProps(state) {
  let { articleList } = state;
  return { articleList };
}

function mapDispatchToProps(dispatch) {
  return {
    goto: (routeName, params = {}, action = {}) =>
      dispatch(NavigationActions.navigate({ routeName, params, action }))
  };
}

Index.propTypes = {
  fetchArticles: React.PropTypes.func,
  articleList: React.PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
