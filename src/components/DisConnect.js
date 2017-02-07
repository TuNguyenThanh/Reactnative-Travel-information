import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  Platform
} from 'react-native';
var {height, width} = Dimensions.get('window');
var normalize = require('../helper/normalizeText.js');

export default class DisConnect extends Component {
  constructor(props){
    super(props);

  }

  render(){
    return (
      <View style={styles.container}>
        <Image style={{width: 200, height:200}}
          source={require('../../public/Images/Disconnect.jpg')}
        />
        <Text>Vui lòng kết nối internet</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white'
  }

})
