import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ListView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from 'react-native';
import Header from './Header.js';
var {height, width} = Dimensions.get('window');
var normalize = require('../helper/normalizeText.js');
if(((height/5 - (normalize(20)*2))/15) < 5){
  var numLine = ((height/5 - (normalize(20)*2))/15);
}else{
  var numLine = 5;
}
export default class FullList extends Component {
  constructor(props){
    super(props);
    this.state = {
      page:1,
      dataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2}),
      status: 'STATUS_NONE',
      refreshing: false,
    };
  }

  _renderRow(rowData, rowID){
    if (rowID % 2 === 0){
      return(
        <TouchableOpacity style={styles.row} onPress={this.props.detail.bind(this, rowData)}>
          <Image style={styles.rowImage}
            source={{uri: rowData.image}}
          />
          <View style={[styles.rowNews, {marginLeft:8}]}>
            <Text style={styles.rowTitle}  numberOfLines={2}>{rowData.title}</Text>
            <Text style={styles.rowDetail} numberOfLines={numLine}>{rowData.detailShort}</Text>
          </View>
        </TouchableOpacity>
      );
    }else{
      return(
        <TouchableOpacity style={styles.row} onPress={this.props.detail.bind(this, rowData)}>
          <View style={[styles.rowNews, {marginRight:8}]}>
            <Text style={styles.rowTitle} numberOfLines={2}>{rowData.title}</Text>
            <Text style={styles.rowDetail} numberOfLines={numLine}>{rowData.detailShort}</Text>
          </View>
          <Image style={styles.rowImage}
            source={{uri: rowData.image}}
          />
        </TouchableOpacity>
      );
    }
  }

  _renderListView(){
    if (Platform.OS === 'android'){
      return (
        <ListView style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionID, rowID) => this._renderRow(rowData, rowID)}
          removeClippedSubviews={true}
          onEndReached={this._onEndReached.bind(this)}
          onEndReachedThreshold ={10}
          enableEmptySections={true}
          initialListSize={5}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        />
      );
    }

    if (Platform.OS === 'ios'){
      return (
        <ListView style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionID, rowID) => this._renderRow(rowData, rowID)}
          removeClippedSubviews={true}
          renderHeader={this._renderHeader.bind(this)}
          onScroll={this._handleScroll.bind(this)}
          onResponderGrant={this._handleResponderGrant.bind(this)}
          onResponderRelease={this._handleResponderRelease.bind(this)}
          onEndReached={this._onEndReached.bind(this)}
          onEndReachedThreshold ={10}
          initialListSize={2}
        />
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          title={this.props.topic}
          titleColor={'red'}
          backgroundColor={'white'}
          leftButtonIcon={require('../../public/Images/Back.png')}
          leftImageTintColor={'red'}
          onLeftButtonPress={this.props.back.bind(this)}
        />
        <View style={{height:1, borderBottomWidth:StyleSheet.hairlineWidth, borderColor:'gray',}}></View>
        {this._renderListView()}
      </View>
    );
  }

  //load data - full to refresh
  _onRefresh() {
    this.setState({refreshing: true});
    fetch("http://pttkht.esy.es/dulich/getNewsTopic.php?idTopic="+ this.props.id +"&page=1")
    .then((response) => response.json())
    .then((responseJson) => {
      mang = responseJson;
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(mang),
        status:'STATUS_NONE',
        refreshing: false,
        page: 1,
      });
    })
    .catch((error)=> {
      console.error(error);
    });
  }


  //load data - load more
  _onEndReached(){
    fetch("http://pttkht.esy.es/dulich/getNewsTopic.php?idTopic="+ this.props.id +"&page=" + (this.state.page + 1))
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.length != 0){
        mang = mang.concat(responseJson);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(mang),
          page: this.state.page + 1
        });
      }
    })
    .catch((error)=> {
      console.error(error);
    });
  }

  _handleResponderGrant(event) {
    console.log('handleResponderGrant');
    var nativeEvent = event.nativeEvent;
    if (!nativeEvent.contentInset || this.state.status!=='STATUS_NONE') {
      return;
    }
    var y0 = nativeEvent.contentInset.top + nativeEvent.contentOffset.y;
    if (y0 < 0) {
      this.setState({status:'STATUS_REFRESH_IDLE'});
      return;
    }
  }

  //load data - full to refresh custom
  _load(){
    fetch("http://pttkht.esy.es/dulich/getNewsTopic.php?idTopic="+ this.props.id +"&page=1")
    .then((response) => response.json())
    .then((responseJson) => {
      mang = responseJson;
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(mang),
        status:'STATUS_NONE',
        page: 1,
      });
    })
    .catch((error)=> {
      console.error(error);
    });
  }

  _handleResponderRelease(event) {
    console.log('handleResponderRelease');
    var status = this.state.status;
    if (status === 'STATUS_REFRESH_IDLE') {
        this.setState({status:'STATUS_NONE'});
    } else if (status === 'STATUS_WILL_REFRESH') {
        this.setState({status:'STATUS_REFRESHING'});
        this._load();
    }
  }

  _handleScroll(event) {
    var nativeEvent = event.nativeEvent;
    var status = this.state.status;
    if (status==='STATUS_REFRESH_IDLE' || status==='STATUS_WILL_REFRESH') {
      var y = nativeEvent.contentInset.top + nativeEvent.contentOffset.y
      if (status!=='STATUS_WILL_REFRESH' && y<-50) {
        this.setState({status:'STATUS_WILL_REFRESH'});
      } else if (status==='STATUS_WILL_REFRESH' && y>=-50) {
        this.setState({status:'STATUS_REFRESH_IDLE'});
      }
      return;
    }
  }

  _renderHeader(){
    var status = this.state.status;
    if (status === 'STATUS_REFRESH_IDLE') {
      return (
        <View style={styles.viewRefresh}>
          <Text style={{color:'black'}}>
            Kéo xuống để cập nhật...
          </Text>
          <Image
            source={require('../../public/Images/pull_arrow.png')}
            resizeMode={'contain'}
            style={styles.imageRefresh}
          />
        </View>
      );
    }
    if (status === 'STATUS_WILL_REFRESH') {
      return (
        <View style={styles.viewRefresh}>
          <Text style={{color:'black'}}>
            Thả ra để cập nhật...
          </Text>
          <Image
            source={require('../../public/Images/pull_arrow.png')}
            resizeMode={'contain'}
            style={[styles.imageRefresh, styles.imageRotate]}
          />
        </View>
      );
    }
    if (status === 'STATUS_REFRESHING') {
      return (
        <View style={styles.viewRefresh}>
        <Text>
          Đang tải...
        </Text>
        <ActivityIndicator
          size='small'
          animating={true}/>
        </View>
      );
    }
    return null;
  }

  componentDidMount(){
    fetch("http://pttkht.esy.es/dulich/getNewsTopic.php?idTopic="+ this.props.id +"&page=" + this.state.page)
    .then((response) => response.json())
    .then((responseJson) => {
      //console.log(responseJson);
      mang = responseJson;
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(mang)
      });
    })
    .catch((error)=> {
      console.error(error);
    });
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  },

  listView:{
    flex:1,
    paddingTop:8,
  },

  row:{
    borderBottomWidth:StyleSheet.hairlineWidth,
    borderColor:'gray',
    flexDirection:'row',
    flex:1,
    height:height/5,
    marginBottom:8,
    marginLeft:8,
    marginRight:8
  },

  rowImage:{
    flex:2/5,
    borderRadius:1,
    marginBottom:8
  },

  rowNews:{
    flex:3/5,
  },

  rowTitle:{
    fontSize:normalize(15),
    fontWeight:'bold',
    paddingBottom:4,
    //height: normalize(20)*2
  },

  rowDetail:{
    fontSize:normalize(12),
    //backgroundColor:'red',
    //height: normalize(15)*5
  },

  viewRefresh:{
    height:50,
    justifyContent:'center',
    alignItems:'center'
  },

  imageRefresh:{
    width:40,
    height:36,
    tintColor:'red',
  },

  imageRotate: {
    transform:[{rotateX: '180deg'},],
  },

})
