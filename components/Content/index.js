import React, {Component, Fragment} from 'react';
import {Text, ScrollView, StyleSheet, Dimensions, Slider} from 'react-native';
//import {WebView} from 'react-native-webview';
import HTML from 'react-native-render-html';
import {connect} from 'react-redux';
import axios from 'axios';
import {WebView} from 'react-native-webview';
import HTMLView from 'react-native-htmlview';

class Content extends Component {
  constructor(props) {
    super(props);
  }
  render() {
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
                fontSize: this.props.font,
              },
            }}
            // eslint-disable-next-line react-native/no-inline-styles
          />
        </ScrollView>
        <Slider
          step={1}
          maximumValue={100}
          onSlidingComplete={value => {
            this.props.updateFontSize(value);
            this.props.navigation.goBack();
            this.props.navigation.navigate('Details');
          }}
          value={this.props.font}
          // eslint-disable-next-line react-native/no-inline-styles
          style={
            this.props.extraData.value ? styles.sliderShow : styles.sliderHide
          }
        />
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
    font: state.getIn(['Content', 'font']),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateFontSize(data) {
      //      alert(data);
      const action = {
        type: 'UPDATE_FONT_SIZE',
        font: data,
      };
      dispatch(action);
    },
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
  p: {
    color: '#FF3366',
    //    fontSize: this.props.font,
  },
  a: {
    color: 'gray',
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Content);
