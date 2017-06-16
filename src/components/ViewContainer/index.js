'use strict';
import React, { Component } from 'react';
import { StyleSheet, StatusBar, ScrollView, View } from 'react-native';

class ViewContainer extends Component {
  render() {
    return (
      <View style={[styles.viewContainer, this.props.style]}>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <ScrollView>
          {this.props.children}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  }
});

ViewContainer.propTypes = {
  style: React.PropTypes.object
};

ViewContainer.defaultProps = {
  style: {}
};

export default ViewContainer;
