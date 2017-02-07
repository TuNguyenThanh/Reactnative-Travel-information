import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  Platform,
  ListView,
  TouchableOpacity
} from 'react-native';
import HTML from 'react-native-fence-html';
import PhotoView from 'react-native-photo-view';
import Lightbox from 'react-native-lightbox';
import FitImage from 'react-native-fit-image';
import Header from './Header.js';
var {height, width} = Dimensions.get('window');
var normalize = require('../helper/normalizeText.js');

export default class DetailView extends Component {
  constructor(props){
    super(props);
    this.state = {
      html : '',
      dataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2}),
    };
    console.log(this.props.data);
  }

  _renderBox(url, passProps){
    return (
      <View style={{width:width, height: height}}>
        <ImageSizeExample source={{uri: url}} />
      </View>
    )
  }

  _renderRow(rowData, rowID){
    return(
      <TouchableOpacity style={styles.row} onPress={this.props.detailData.bind(this, rowData)}>
        <Image style={styles.rowImage}
          source={{uri: rowData.image}}/>
        <View style={styles.rowNews}>
          <Text style={styles.rowTitle}  numberOfLines={2}>{rowData.title}</Text>
          <Text style={styles.rowDetail} numberOfLines={4}>{rowData.detailShort}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const renderers = {
      img: (htmlAttribs, children, passProps) => {
        if (Platform.OS === 'android'){
          swipeToDismiss = true;
        }else{
          swipeToDismiss = false;
        }
        return (
          <Lightbox
            underlayColor="white"
            springConfig={{tension: 15, friction: 7}}
            renderContent={this._renderBox.bind(this, htmlAttribs.src, passProps)}
            navigator={this.props.navigator}
            swipeToDismiss={swipeToDismiss}>
            <FitImage
              style={passProps.htmlStyles.img}
              source={{uri: htmlAttribs.src}}
            />
          </Lightbox>
        );
      }
    }

    return (
      <View style={styles.container}>
        <Header
          title={''}
          titleColor={'red'}
          backgroundColor={'white'}
          leftButtonIcon={require('../../public/Images/Back.png')}
          leftImageTintColor={'red'}
          titleLeftText={'Trở về'}
          onLeftButtonPress={this.props.back.bind(this)}
        />
        <View style={{height:1, borderBottomWidth:StyleSheet.hairlineWidth, borderColor:'gray',}}></View>
        <ScrollView style={{flex:1, paddingLeft:8, paddingRight:8}}>
          <HTML html={this.state.html}
            htmlStyles={styles}
            renderers={renderers}
          />
          <View style={{flex:1, backgroundColor:'white'}}>
            <View style={{height:40, backgroundColor:'red', justifyContent:'center', alignItems:'center'}}>
              <Text style={{color:'white'}}>Liên hệ quảng cáo: 0903016975</Text>
            </View>
            <View style={{paddingTop:8}}>
              <Text>TIN LIÊN QUAN</Text>
            </View>
            <ListView style={[styles.listView]}
              initialListSize={3}
              enableEmptySections={true}
              dataSource={this.state.dataSource}
              renderRow={(rowData, sectionID, rowID) => this._renderRow(rowData, rowID)}
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  componentDidMount(){
    let html = '<h2>'+this.props.data.title+'</h2>';
    html += this.props.data.detail;

    this.setState({
      html : html,
    });

    fetch("http://pttkht.esy.es/dulich/relatedNews.php?idTopic=" + this.props.data.idTopic)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseJson)
      });
    })
    .catch((error)=> {
      console.error(error);
    });
  }
}

var ImageSizeExample = React.createClass({
  getInitialState: function() {
    return {
      width: 0,
      height: 0,
    };
  },
  componentWillMount: function() {
    Image.getSize(this.props.source.uri, (width, height) => {
      this.setState({width, height});
    });
  },
  render: function() {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <PhotoView style={{
          backgroundColor: 'white',
          width:width,
          height: ((this.state.height * width) / this.state.width)
        }}
          source={this.props.source}
          minimumZoomScale={1}
          maximumZoomScale={2}
          androidZoomTransitionDuration={2}
          androidScaleType="fitCenter"/>
      </View>
    );
  },
});

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  },

  listView:{
    flex:1,
  },

  row:{
    borderBottomWidth:StyleSheet.hairlineWidth,
    borderColor:'gray',
    flexDirection:'row',
    flex:1,
    height:height/5,
    paddingTop:8
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
    fontSize:normalize(12),
    paddingLeft:8,
    paddingRight:8
  },

  img:{
    flex:1,
  },

  h2:{
    marginTop:8,
    marginBottom:0
  },

  h3:{
    marginTop:8,
    marginBottom:8
  },

  span:{
    justifyContent:'center',
    textAlign:'center'
  },

  i:{
    color:'gray',
    fontSize:normalize(10),
    fontStyle:'italic',
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center',
    paddingTop:4,
    paddingBottom:4
  },

  p:{
    color:'black',
    fontSize:normalize(12),
    textAlign: 'justify'
  },

})
