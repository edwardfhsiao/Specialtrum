import React, { Component } from 'react'
import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  View
} from 'react-native';

class NewsItem extends Component {

  render() {
    const animatedCardStyles = {};
    const wrapperStyles = {
      backgroundColor: '#00AA00'
    }
    let { name } = this.props;
    return(
      <Animated.View style={wrapperStyles}>
        <View ref="wrapper" collapsable={false}>
          <Animated.View style={animatedCardStyles}>
            <View style={styles.row}>
              <Text style={styles.text}>
                {this.props.name}
              </Text>
            </View>
            <View style={styles.separator} />
          </Animated.View>
        </View>
      </Animated.View>
    );
  }

}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC'
  },
  text: {
    flex: 1,
    fontSize: 20
  }
})

NewsItem.propTypes = {
  name: React.PropTypes.string.isRequired,
}

export default NewsItem;
