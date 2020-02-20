import React, {Component, Fragment} from 'react';
import {Text, ScrollView, StyleSheet, Dimensions, Slider} from 'react-native';
//import {WebView} from 'react-native-webview';
import HTML from 'react-native-render-html';
import {connect} from 'react-redux';
import axios from 'axios';

class Content extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    alert(this.props.extraData.value);
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <Fragment>
        <ScrollView style={styles.content}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.time}>{this.props.date}</Text>
          <HTML
            html={this.props.content}
            ignoredStyles={['height', 'width']}
            imagesMaxWidth={Dimensions.get('window').width - 40}
            tagsStyles={{
              p: {
                fontStyle: 'italic',
                color: 'grey',
                fontSize: 20,
              },
            }}
            // eslint-disable-next-line react-native/no-inline-styles
          />
        </ScrollView>
      </Fragment>
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
    sliderBarDisplay: state.getIn(['Content', 'bar']),
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
  sliderShow: {
    position: 'relative',
    bottom: 300,
    backgroundColor: 'black',
    marginLeft: 20,
    marginRight: 20,
    opacity: 0.5,
    display: 'flex',
  },
  sliderHide: {
    position: 'relative',
    bottom: 300,
    backgroundColor: 'black',
    marginLeft: 20,
    marginRight: 20,
    opacity: 0.5,
    display: 'none',
  },
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
