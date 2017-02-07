import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ListView,
  Image,
  TouchableOpacity,
  NetInfo
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
var {height, width} = Dimensions.get('window');
var normalize = require('../helper/normalizeText.js');
import SplashScreen from 'react-native-splash-screen'

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2}),
    };
  }

  _renderRow(rowData, rowID){
    switch (rowData.name) {
      case 'Muôn màu':
        bgColor = '#f2b303';
        break;
      case 'Điểm đến':
        bgColor = '#af0158';
        break;
      case 'Ẩm thực':
        bgColor = '#7f3888';
        break;
      case 'Mách bạn':
        bgColor = '#07a457';
        break;
      default: bgColor = '#e3002e';
    }

    return(
      <View style={styles.row}>
        {/*Top*/}
        <View style={styles.contentTop}>
          {/*Left*/}
          <TouchableOpacity style={styles.contentTopLeft} onPress={this.props.detail.bind(this, rowData.news[0])}>
            {/*Image*/}
            <Image style={styles.contentTopLeftImage}
              source={{uri: rowData.news[0].image}}
            >
              <View style={[styles.topic, {backgroundColor: bgColor}]}>
                <Text style={styles.textTopic}>{rowData.name}</Text>
              </View>
            </Image>
            {/*Detail*/}
            <View style={styles.contentTopLeftDetailView}>
              <Text style={styles.contentTopLeftDetailTitle} numberOfLines={2}>{rowData.news[0].title}</Text>
              <Text style={styles.contentTopLeftDetail} numberOfLines={3}>{rowData.news[0].detailShort}</Text>
            </View>
          </TouchableOpacity>

          {/*Right*/}
          <View style={styles.contentTopRight}>
            {/*Image-1*/}
            <TouchableOpacity style={styles.contentTopRightItem} onPress={this.props.detail.bind(this, rowData.news[1])}>
              <Image style={{flex:2/3, borderRadius:1}}
                source={{uri: rowData.news[1].image}}
              >
                <View style={styles.viewBg}></View>
                <LinearGradient colors={['transparent', 'black']} >
                  <Text style={styles.contentTopRightItemTitle} numberOfLines={2}>{rowData.news[1].title}</Text>
                </LinearGradient>
              </Image>
              {/*Detail*/}
              <View style={{flex:1/3}}>
                <Text style={styles.contentTopRightItemDetail} numberOfLines={2}>{rowData.news[1].detailShort}</Text>
              </View>
            </TouchableOpacity>

            {/*Line*/}
            <View style={[styles.line, { marginBottom:8}]}></View>

            {/*Image-2*/}
            <TouchableOpacity style={styles.contentTopRightItem} onPress={this.props.detail.bind(this, rowData.news[2])}>
              <Image
                style={{flex:2/3, borderRadius:1}}
                source={{uri: rowData.news[2].image}}
              >
                <View style={styles.viewBg}></View>
                <LinearGradient colors={['transparent', 'black']} >
                  <Text style={styles.contentTopRightItemTitle} numberOfLines={2}>{rowData.news[2].title}</Text>
                </LinearGradient>
              </Image>
              {/*Detail*/}
              <View style={{flex:1/3}}>
                <Text style={styles.contentTopRightItemDetail} numberOfLines={2}>{rowData.news[2].detailShort}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/*Bottom*/}
        <View style={styles.contentBottom}>
          {/*Item-1*/}
          <TouchableOpacity style={[styles.contentBottomItem, {marginRight:4}]} onPress={this.props.detail.bind(this, rowData.news[3])}>
            {/*Image*/}
            <Image style={{flex:1.2/2, borderRadius:1}}
              source={{uri: rowData.news[3].image}}>
              <View style={styles.viewBg}></View>
              <LinearGradient colors={['transparent', 'black']} >
                <Text style={styles.contentBottomItemTitle} numberOfLines={2}>{rowData.news[3].title}</Text>
              </LinearGradient>
            </Image>
            {/*Detail*/}
            <View style={{flex:0.8/2}}>
              <Text style={styles.contentBottomItemDetail} numberOfLines={3}>{rowData.news[3].detailShort}</Text>
            </View>
          </TouchableOpacity>
          {/*Line*/}
          <View style={[styles.lineH, {marginBottom:4}]}></View>
          {/*Item-2*/}
          <TouchableOpacity style={[styles.contentBottomItem,{marginRight:4, marginLeft:4}]} onPress={this.props.detail.bind(this, rowData.news[4])}>
            {/*Image*/}
            <Image style={{flex:1.2/2, borderRadius:1}}
              source={{uri: rowData.news[4].image}}
            >
              <View style={styles.viewBg}></View>
              <LinearGradient colors={['transparent', 'black']} >
                <Text style={styles.contentBottomItemTitle} numberOfLines={2}>{rowData.news[4].title}</Text>
              </LinearGradient>
            </Image>
            {/*Detail*/}
            <View style={{flex:0.8/2}}>
              <Text style={styles.contentBottomItemDetail} numberOfLines={3}>{rowData.news[4].detailShort}</Text>
            </View>
          </TouchableOpacity>
          {/*Line*/}
          <View style={[styles.lineH, {marginBottom:4}]}></View>
          {/*Item-3*/}
          <TouchableOpacity style={[styles.contentBottomItem, {marginLeft:4}]} onPress={this.props.detail.bind(this, rowData.news[5])}>
            {/*Image*/}
            <Image style={{flex:1.2/2, borderRadius:1}}
              source={{uri: rowData.news[5].image}}
            >
              <View style={styles.viewBg}></View>
              <LinearGradient colors={['transparent', 'black']} >
                <Text style={styles.contentBottomItemTitle} numberOfLines={2}>{rowData.news[5].title}</Text>
              </LinearGradient>
            </Image>
            {/*Detial*/}
            <View style={{flex:0.8/2}}>
              <Text style={styles.contentBottomItemDetail} numberOfLines={3}>{rowData.news[5].detailShort}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/*See All*/}
        <View style={styles.seeAll}>
          <TouchableOpacity style={styles.buttonSeeAll}
          onPress={this.props.seeAll.bind(this, rowData.idTopic, rowData.name)}>
            <Text style={styles.buttonSeeAllText}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          enableEmptySections={true}
        />
      </View>
    );
  }


  componentDidMount(){


    fetch("http://pttkht.esy.es/dulich/home.php")
    .then((response) => response.json())
    .then((responseJson) => {
      //console.log(responseJson);
      SplashScreen.hide();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseJson)
      });

    })
    .catch((error)=> {
      console.error(error);
      //alert('Vui lòng kết nối internet!');
      SplashScreen.hide();
    });
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },

  listView:{
    flex:1
  },

  row:{
    flex:1,
    height:height*2/3,
    margin:8,
  },

  contentTop:{
    flex:2.8/4,
    flexDirection:'row'
  },

  contentTopLeft:{
    flex:1.8/3,
    borderColor:'gray',
    borderRightWidth: StyleSheet.hairlineWidth,
    paddingRight:4,
    marginBottom:4,
  },

  contentTopLeftImage:{
    flex:1.8/3,
    borderRadius:1,
  },

  topic:{
    width:100,
    height:40,
    backgroundColor:'orange',
    justifyContent:'center',
    alignItems:'center',
  },

  textTopic:{
    color:'white'
  },

  contentTopLeftDetailView:{
    flex:1.2/3
  },

  contentTopLeftDetailTitle:{
    fontSize:normalize(15),
    fontWeight:'bold',
    paddingTop:6,
    paddingBottom:4,
  },

  contentTopLeftDetail:{
    fontSize:normalize(12),
    paddingBottom:8,
  },

  contentTopRight:{
    flex:1.2/3,
    paddingLeft:4
  },

  contentTopRightItem:{
    flex:1
  },

  contentTopRightItemTitle:{
    fontWeight:'bold',
    fontSize:normalize(12),
    color:'white',
    margin:4,
    backgroundColor:'transparent'
  },

  contentTopRightItemDetail:{
    fontSize:normalize(12),
    paddingTop:4,
    paddingBottom:4
  },

  line:{
    height:1,
    borderColor:'gray',
    borderTopWidth:StyleSheet.hairlineWidth,
  },

  lineH:{
    width:1,
    borderColor:'gray',
    borderLeftWidth:StyleSheet.hairlineWidth,
  },

  contentBottom:{
    flex:1.2/4,
    flexDirection:'row',
    borderColor:'gray',
    borderTopWidth:StyleSheet.hairlineWidth,
    borderBottomWidth:StyleSheet.hairlineWidth,
    paddingTop:4
  },

  contentBottomItem:{
    flex:1
  },

  contentBottomItemTitle:{
    fontSize:normalize(12),
    fontWeight:'bold',
    color:'white',
    margin:4,
    backgroundColor:'transparent',

  },

  contentBottomItemDetail:{
    fontSize:normalize(11),
    marginTop:2,
    marginBottom:4
  },

  seeAll:{
    justifyContent:'flex-end',
    marginTop:4,
    flexDirection:'row'
  },

  buttonSeeAll:{
    alignItems:'flex-end',
    paddingLeft:10,
    paddingRight:10
  },

  buttonSeeAllText:{
    fontSize:normalize(12)
  },

  viewBg:{
    flex: 1,
    backgroundColor:'transparent'
  },

})
