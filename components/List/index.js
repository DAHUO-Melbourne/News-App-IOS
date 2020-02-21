import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import axios from 'axios';
import {Colors} from 'react-native/Libraries/NewAppScreen';

function Item({id, title, navigation, transferNewsID, src}) {
  if (src != null) {
    return (
      <TouchableOpacity
        onPress={() => {
          transferNewsID(id);
          navigation.navigate('Details');
        }}
        style={[styles.item]}>
        <Image style={styles.stretch} source={{uri: src}} />
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={() => {
          transferNewsID(id);
          navigation.navigate('Details');
        }}
        style={[styles.item]}>
        <Image style={styles.stretch} source={{uri: ''}} />
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

class List extends Component {
  componentDidMount() {
    axios
      .get(
        'https://staging.allfin.com/wordpress/wp-json/wp/v2/posts?page=1&per_page=5',
      )
      .then(response => {
        this.props.initListData(response.data);
      });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.props.news}
          renderItem={({item}) => (
            <Item
              id={item.id}
              title={item.title.rendered}
              src={item.type_img}
              navigation={this.props.navigation}
              transferNewsID={this.props.transferNewsID}
            />
          )}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  container: {
    marginTop: 20,
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  title: {
    flex: 1,
    fontSize: 20,
    marginRight: 20,
    flexWrap: 'wrap',
  },
  stretch: {
    width: 50,
    height: 50,
    resizeMode: 'stretch',
    marginRight: 20,
  },
});

const mapStateToProps = state => {
  return {
    news: state.getIn(['List', 'news']),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateDetailsData(data) {
      const action = {
        type: 'UPDATE_DETAILS_DATA',
        data: data,
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
    transferNewsID(id) {
      const action = {
        type: 'UPDATE_NEWS_ID',
        data: id,
      };
      dispatch(action);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);
