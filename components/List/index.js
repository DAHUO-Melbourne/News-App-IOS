import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import axios from 'axios';
import {Colors} from 'react-native/Libraries/NewAppScreen';
//import Constants from 'expo-constants';

function Item({id, title, navigation}) {
  return (
    <TouchableOpacity
      onPress={() => {
        axios
          .get('https://staging.allfin.com/wordpress/wp-json/wp/v2/posts/' + id)
          .then(response => {
            alert(response.data);
          });
        // eslint-disable-next-line no-undef
        navigation.navigate('Details');
      }}
      style={[
        styles.item,
        // eslint-disable-next-line react-native/no-inline-styles
      ]}>
      <Image style={styles.stretch} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
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
    alert(this.props.news);
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
          elevation={5}>
          <FlatList
            data={this.props.news}
            renderItem={({item}) => (
              <Item
                id={item.id}
                title={item.title.rendered}
                navigation={this.props.navigation}
              />
            )}
            keyExtractor={item => item.id}
          />
        </ScrollView>
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
    flex: 1,
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  stretch: {
    width: 50,
    height: 50,
    resizeMode: 'stretch',
  },
});

const mapStateToProps = state => {
  return {
    news: state.getIn(['List', 'news']),
  };
};

const mapDispatchToProps = dispatch => {
  return {
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
)(List);
