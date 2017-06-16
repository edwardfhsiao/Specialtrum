'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
	TouchableHighlight,
  TouchableOpacity,
  Navigator,
  View,
  Text,
  StyleSheet,
  ListView
} from 'react-native'
import ViewContainer from '../../ViewContainer/index'

import {
  fetchArticles
} from '../../../actions/index'

class Show extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  componentDidMount(){
    if (this.props.articleList.length <= 0){
      this.fetchArticles(1);
    }
  }

  _onPressButton() {
    this.props.navigator.push({
      component: Show,
      title: 'Bar That',
      passProps: { myProp: 'bar' }
    });
  }

  fetchArticles(page) {
    this.props.fetchArticles(page);
  }

  render() {
  	let article = {};
  	if (this.props.articleList.length){
  		article = this.props.articleList.filter(item => item.id ===this.props.id)[0]
  	}
    return(
      <ViewContainer>
      	 <TouchableHighlight onPress={() => this.props.navigator.pop()}>
          <Text>Back</Text>
        </TouchableHighlight>
      	<Text>
      		{article.title}dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
      	</Text>
      	      	 <TouchableHighlight onPress={() => this.props.navigator.pop()}>
          <Text>Back</Text>
        </TouchableHighlight>
      </ViewContainer>
    );
  }

}

const styles = StyleSheet.create({

  navigatorStyles: {

  }

})

function mapStateToProps(state) {
  let { articleList } = state;
  return { articleList };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchArticles: (page) => {
      dispatch(fetchArticles(page));
    }
  };
}

Show.propTypes = {
  fetchArticles: React.PropTypes.func.isRequired,
  articleList: React.PropTypes.array.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Show);