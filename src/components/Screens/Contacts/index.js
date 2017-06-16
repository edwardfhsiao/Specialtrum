'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navigator, Text, StyleSheet } from 'react-native'
import ViewContainer from '../../ViewContainer/index'

class ContactIndex extends Component {
  render() {
    return(
      <ViewContainer>
        <Text>
          ContactIndex
        </Text>
      </ViewContainer>
    );
  }
}

const styles = StyleSheet.create({

  navigatorStyles: {

  }

})

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactIndex);