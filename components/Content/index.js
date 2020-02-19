import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import axios from 'axios';
class Content extends Component {
  render() {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text>{this.props.title}</Text>
          <Text>{this.props.content}</Text>
        </View>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Content);
