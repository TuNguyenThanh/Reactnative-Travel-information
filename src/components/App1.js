import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  Text,
  View,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
var {width, height} = Dimensions.get('window');

export default class App1 extends Component {
  render() {
    return (
      <View style={{flex:1, backgroundColor:'#F8F8F8', justifyContent:'center', alignItems:'center'}}>
        <View style={{width:width, height:100, backgroundColor:'green', flexDirection:'row'}}>
          <Image
            style={{height: 100, width: 100}}
            source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
          />
          <View style={{flex: 1,height: 100}}>
            <Text selectable={true} numberOfLines={100/17} style={{fontSize:15, marginTop:5, marginBottom:8, marginLeft:8, marginRight:8}}>
              A React component for displaying different types of images ,A React component for displaying different types of images, including network images, static resources, temporary local images, and images from local disk, such as the camera roll
              A React component for displaying different types of images ,A React component for displaying different types of images, including network images, static resources, temporary local images, and images from local disk, such as the camera roll
            </Text>
          </View>
        </View>
      </View>
    );
  }

  componentDidMount(){
    SplashScreen.hide();
  }
}
