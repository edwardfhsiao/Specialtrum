'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  TouchableOpacity,
  Navigator,
  View,
  Text,
  StyleSheet,
  Image,
  ListView
} from 'react-native';
import ViewContainer from '../../ViewContainer/index';
import NewsItem from '../../NewsItem/index';
import Show from './Show';
import R from 'ramda';
import ImagePicker from 'react-native-image-crop-picker';

import { fetchArticles } from '../../../actions/index';

class MessageIndex extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      image: {}
    };
  }

  componentWillMount() {
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
  }

  componentDidMount() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    })
      .then(image => {
        this.setState({ image: image });
      })
      .catch(err => {
      });
    console.log(this.props);
    if (this.props.articleList.length <= 0) {
      this.fetchArticles(1);
    }
  }

  _onPressButton(id) {
    this.props.navigator.push({
      component: Show,
      passProps: { id: id }
    });
  }

  renderRow(rowData) {
    return (
      <TouchableOpacity onPress={this._onPressButton.bind(this, rowData.id)}>
        <View>
          <NewsItem
            name={rowData.title}
            removable={this.props.connected}
            onRemove={() => this._remove(rowData.id)}
          />
        </View>
      </TouchableOpacity>
    );
  }

  fetchArticles(page) {
    this.props.fetchArticles(page);
  }

  render() {
    let { articleList } = this.props;
    let { image } = this.state;
    let listView;
    if (articleList.length) {
      listView = (
        <ListView
          dataSource={this.ds.cloneWithRows(articleList)}
          enableEmptySections={true}
          renderRow={this.renderRow.bind(this)}
        />
      );
    }
    let imageTag;
    if (!R.isEmpty(image)) {
      // const source = require(image.path);
      imageTag = <Image source={{uri: image.path}} style={{width: 300, height: 400}}/>;
    }

    return (
      <ViewContainer>
        {listView}
        {imageTag}
      </ViewContainer>
    );
  }
}

const styles = StyleSheet.create({
  navigatorStyles: {}
});

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

MessageIndex.propTypes = {
  fetchArticles: React.PropTypes.func.isRequired,
  articleList: React.PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageIndex);
