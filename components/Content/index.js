import React, {Component} from 'react';
import {Text, ScrollView, StyleSheet, Dimensions} from 'react-native';
//import {WebView} from 'react-native-webview';
import HTML from 'react-native-render-html';
import {connect} from 'react-redux';
import axios from 'axios';

const htmlContent =
  '<h1>This HTML snippet is now rendered with native components !</h1><h2>Enjoy a webview-free and blazing fast application</h2><img class=\"aligncenter\" src=\"https://www.allfin.com/u/cms/www/201811/13142949sf02.jpg\" alt=\"\" width=\"600\" height=\"408\" /><em style="textAlign: center;">Look at how happy this native cat is</em>';

class Content extends Component {
  render() {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <ScrollView style={styles.content}>
        <Text style={styles.title}>{this.props.title}</Text>
        <Text style={styles.time}>{this.props.date}</Text>
        <HTML
          html={this.props.content}
          ignoredStyles={['height', 'width']}
          imagesMaxWidth={Dimensions.get('window').width - 40}
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
    date: state.getIn(['Content', 'date']),
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
        date: data.date,
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
  time: {
    marginBottom: 5,
    color: 'gray',
  },
  content: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
  },
  HTMLView: {
    fontWeight: '300',
    color: '#FF3366',
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Content);
