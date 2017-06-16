import React, { Component } from 'react';
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppNavigator from './index';

const renderAppNavigator = (AppNavigatorStyle, Left, Center, Right, props) => {
  return (
    <AppNavigator
      style={AppNavigatorStyle}
      Left={Left}
      Center={Center}
      Right={Right}
      {...props}
    />
  );
};

const ICON_COLLECTION_NAME = {
  MaterialIcons,
  EvilIcons,
  Entypo,
  FontAwesome
};

class AppNavigatorIconButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressStatus: false
    };
    this.onPress = this.onPress.bind(this);
    this.onHideUnderlay = this.onHideUnderlay.bind(this);
    this.onShowUnderlay = this.onShowUnderlay.bind(this);
  }
  onPress() {
    const { onPress } = this.props;
    onPress && onPress();
  }
  onHideUnderlay() {
    this.setState({ pressStatus: false });
  }
  onShowUnderlay() {
    this.setState({ pressStatus: true });
  }
  render() {
    const { onPress, style, size, name, iconCollection, color } = this.props;
    const { pressStatus } = this.state;
    const IconSet = ICON_COLLECTION_NAME[iconCollection];
    return (
      <TouchableHighlight
        onPress={this.onPress}
        activeOpacity={10}
        underlayColor="transparent"
        onHideUnderlay={this.onHideUnderlay}
        onShowUnderlay={this.onShowUnderlay}
      >
        <Entypo
          size={size}
          name={name}
          color={color}
          style={[style, { opacity: pressStatus ? 0.9 : 1 }]}
        />
      </TouchableHighlight>
    );
  }
}

AppNavigatorIconButton.propTypes = {
  style: React.PropTypes.object,
  size: React.PropTypes.number,
  name: React.PropTypes.string,
  iconCollection: React.PropTypes.string,
  color: React.PropTypes.string,
};

AppNavigatorIconButton.defaultProps = {
  style: {
    color: '#fff'
  },
  size: 24,
  name: 'chevron-left',
  iconCollection: 'Entypo',
  color: '#fff',
  onPress: () => {}
};

export { renderAppNavigator, AppNavigatorIconButton };
