import * as contentActionsCreators from './store/actionCreator';
import React, {Component, Fragment} from 'react';
import {Text, ScrollView, StyleSheet, Dimensions, Slider} from 'react-native';
import HTML from 'react-native-render-html';
import {connect} from 'react-redux';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';

class Content extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Fragment>
        <ScrollView style={styles.content}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.time}>{this.timeFormated(this.props.date)}</Text>
          {/* transfer the time string get from backend into correct format */}
          <SafeAreaView style={styles.safeView}>
            <HTML
              html={this.props.content}
              ignoredStyles={['height', 'width']}
              imagesMaxWidth={Dimensions.get('window').width - 40}
              tagsStyles={{
                p: {
                  fontSize: this.props.font,
                },
                img: {
                  marginTop: 20,
                  marginBottom: 20,
                },
              }}
            />
          </SafeAreaView>
        </ScrollView>
        <Slider
          step={1}
          maximumValue={100}
          onSlidingComplete={value => {
            this.props.updateFontSize(value); //put value into store.
            this.props.navigation.goBack();
            this.props.navigation.navigate('Details');
          }}
          value={this.props.font}
          style={
            this.props.extraData.value ? styles.sliderShow : styles.sliderHide
          }
        />
      </Fragment>
    );
  }

  timeFormated(dateString) {
    return dateString
      .replace('-', '年')
      .replace('-', '月')
      .replace('T', '日');
  }

  componentWillMount() {
    const data = {
      title: {
        rendered: 'loading',
      },
      content: {
        rendered: 'loading',
      },
      date: 'loading',
    };
    this.props.updateDetailsData(data);
  }

  componentDidMount() {
    axios
      .get(
        'https://staging.allfin.com/wordpress/wp-json/wp/v2/posts/' +
          this.props.id,
      )
      .then(response => {
        this.props.updateDetailsData(response.data); //read data by RESTful API by using id get from store
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
      dispatch(contentActionsCreators.updateFontSize(data)); //put value of slider into store, so that different details page could get the same fontsize
    },
    updateDetailsData(data) {
      dispatch(contentActionsCreators.updateDetailsDate(data));
    },
  };
};

const styles = StyleSheet.create({
  safeView: {
    paddingBottom: 50,
  },
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
    paddingBottom: 20,
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
