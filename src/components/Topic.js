import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ListView,
  Image,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
var {height, width} = Dimensions.get('window');
var normalize = require('../helper/normalizeText.js');

export default class Topic1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      page:1,
      dataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2}),
      mang: [],
      refreshing: false,
      status: 'STATUS_NONE',
    };
  }

  _renderRow(rowData, rowID){
    if(rowID == 0){
      return (
        <TouchableOpacity style={styles.header} onPress={this.props.detail.bind(this, rowData)}>
          {/*One-image*/}
          <Image style={styles.headerImage}
            source={{uri: rowData.image}}>
            <View style={styles.viewBg}></View>
            <LinearGradient colors={['transparent', 'black']}>
              <Text style={styles.headerTitle} numberOfLines={3}>{rowData.title}</Text>
            </LinearGradient>
          </Image>
        </TouchableOpacity>
      )
    }else{
      return(
        <TouchableOpacity style={styles.row} onPress={this.props.detail.bind(this, rowData)}>
          <Image style={styles.rowImage}
            source={{uri: rowData.image}}/>
          <View style={styles.rowNews}>
            <Text style={styles.rowTitle}  numberOfLines={2}>{rowData.title}</Text>
            <Text style={styles.rowDetail} numberOfLines={5}>{rowData.detailShort}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  }

  render() {
    if (Platform.OS === 'android'){
      return (
        <View style={styles.container}>
          <ListView style={styles.listView}
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={(rowData2, sectionID2, rowID2) => this._renderRow(rowData2, rowID2)}
            initialListSize={4}
            onEndReached={this._onEndReached.bind(this)}
            onEndReachedThreshold ={10}
            removeClippedSubviews={true}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
          />
        </View>
      );
    }

    if (Platform.OS === 'ios'){
      return (
        <View style={styles.container}>
          <ListView style={styles.listView}
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={(rowData2, sectionID2, rowID2) => this._renderRow(rowData2, rowID2)}
            initialListSize={4}
            onEndReached={this._onEndReached.bind(this)}
            onEndReachedThreshold ={10}
            removeClippedSubviews={true}
            renderHeader={this._renderHeader.bind(this)}
            onScroll={this._handleScroll.bind(this)}
            onResponderGrant={this._handleResponderGrant.bind(this)}
            onResponderRelease={this._handleResponderRelease.bind(this)}
          />
        </View>
      );
    }
  }

  //load data more
  _onEndReached(){
    fetch("http://pttkht.esy.es/dulich/getNewsTopic.php?idTopic="+ this.props.id +"&page=" + (this.state.page + 1))
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.length != 0){
        //mang = mang.concat(responseJson);
        let a = this.state.mang.concat(responseJson);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(a),
          page: this.state.page + 1,
          mang: a,
        });
      }
    })
    .catch((error)=> {
      console.error(error);
    });
  }

  //load date - full to refresh
  _onRefresh() {
    this.setState({refreshing: true});
    fetch("http://pttkht.esy.es/dulich/getNewsTopic.php?idTopic=" + this.props.id + "&page=1")
    .then((response) => response.json())
    .then((responseJson) => {
      //mang = responseJson;
      this.setState({
        mang: responseJson,
        dataSource: this.state.dataSource.cloneWithRows(responseJson),
        refreshing: false,
        page: 1
      });
    })
    .catch((error)=> {
      console.error(error);
    });
  }

  //load data - full to refresh custom
  _load(){
    fetch("http://pttkht.esy.es/dulich/getNewsTopic.php?idTopic="+ this.props.id +"&page=1")
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        mang: responseJson,
        dataSource: this.state.dataSource.cloneWithRows(responseJson),
        status:'STATUS_NONE',
        page: 1
      });
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
    fetch("http://pttkht.esy.es/dulich/getNewsTopic.php?idTopic=" + this.props.id + "&page="+ this.state.page)
    .then((response) => response.json())
    .then((responseJson) => {
      //mang = responseJson;
      this.setState({
        mang: responseJson,
        dataSource: this.state.dataSource.cloneWithRows(responseJson),
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
  },

  listView:{
    flex:1,
  },

  header:{
    flex:1,
    height:height/3,
    margin:8
  },

  headerImage:{
    flex:1.8/3,
    borderRadius:1
  },

  viewBg:{
    flex: 1,
    backgroundColor:'transparent'
  },

  headerTitle:{
    fontWeight:'bold',
    fontSize:normalize(18),
    color:'white',
    margin:8,
    backgroundColor:'transparent'
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
    flex:3/5
  },

  rowTitle:{
    fontWeight:'bold',
    fontSize:normalize(15),
    paddingLeft:8,
    paddingRight:8,
    paddingBottom:8,
  },

  rowDetail:{
    fontSize:normalize(11),
    paddingLeft:8,
    paddingRight:8,
    paddingBottom:8
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
