import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native';
//import {WebView} from 'react-native-webview';
import HTML from 'react-native-render-html';
import {connect} from 'react-redux';
import axios from 'axios';

class Content extends Component {
  render() {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <ScrollView style={{flex: 1}}>
        <Text>{this.props.title}</Text>
        <HTML
          html={this.props.content}
          imagesWidth={Dimensions.get('window').width}
        />
      </ScrollView>
    );
  }
  componentDidMount() {
    axios
      .get(
        'https://staging.allfin.com/wordpress/wp-json/wp/v2/posts/' +
          this.props.id,
      )
      .then(response => {
        this.props.updateDetailsData(response.data);
      });
  }
}

const mapStateToProps = state => {
  return {
    title: state.getIn(['Content', 'title']),
    id: state.getIn(['Content', 'id']),
    content: state.getIn(['Content', 'content']),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateDetailsData(data) {
      const action = {
        type: 'UPDATE_DETAILS_DATA',
        title: data.title.rendered,
        content: data.content.rendered,
      };
      dispatch(action);
    },
    initListData(data) {
      const action = {
        type: 'INIT_LIST_DATA',
        data: data,
      };
      dispatch(action);
    },
  };
};
const styles = StyleSheet.create({
  HTMLView: {
    fontWeight: '300',
    color: '#FF3366',
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Content);
