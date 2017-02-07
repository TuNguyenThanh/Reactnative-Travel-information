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

export default class Menu extends Component {
  constructor(props){
    super(props);

  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.content}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.userView}>
            <Image style={styles.userIcon}
              source={require('../../public/Images/icon_no_avatar.png')}
            />
            <Text style={styles.userText}>Đăng nhập</Text>
          </View>

          {/*Noi dung*/}
          <View style={styles.menuRow}>
            <View style={styles.menuSection}>
              <Text style={styles.menuSectionText}>NỘI DUNG</Text>
            </View>
            {/*Item - 1*/}
            <View style={[styles.menuItem, {marginTop:8}]}>
              <Image style={[styles.menuItemImageCustom, {marginLeft:3}]}
                source={require('../../public/Images/Starfish_icon.png')}
              />
              <Text style={styles.menuItemTextCustom}>Tin đã đánh dấu</Text>
            </View>
            {/*Item - 2*/}
            <View style={styles.menuItem}>
              <Image style={[styles.menuItemImageCustom, {marginLeft:3}]}
                source={require('../../public/Images/history_icon.png')}
              />
              <Text style={styles.menuItemTextCustom}>Đọc gần đây</Text>
            </View>
          </View>

          {/*Thiet lap*/}
          <View style={styles.menuRow}>
            <View style={styles.menuSection}>
              <Text style={styles.menuSectionText}>THIẾT LẬP</Text>
            </View>
            {/*Item - 1*/}
            <View style={[styles.menuItem, {marginTop:8}]}>
              <Image style={styles.menuItemImage}
                source={require('../../public/Images/location_icon.png')}
              />
              <Text style={styles.menuItemText}>Tin địa phương</Text>
            </View>
            {/*Item - 2*/}
            <View style={styles.menuItem}>
              <Image style={styles.menuItemImage}
                source={require('../../public/Images/notify_icon.png')}
              />
              <Text style={styles.menuItemText}>Thông báo tin nổi bậc</Text>
            </View>
            {/*Item - 3*/}
            <View style={styles.menuItem}>
              <Image style={styles.menuItemImage}
                source={require('../../public/Images/night_dark_theme_icon.png')}
              />
              <Text style={styles.menuItemText}>Chế độ ban đêm</Text>
            </View>
            {/*Item - 4*/}
            <View style={[styles.menuItem, {marginLeft:3, marginRight:3}]}>
              <Image style={styles.menuItemImageCustom}
                source={require('../../public/Images/Language.png')}
              />
              <Text style={styles.menuItemTextCustom}>Ngôn ngữ</Text>
            </View>
            {/*Item - 5*/}
            <View style={styles.menuItem}>
              <Image style={styles.menuItemImage}
                source={require('../../public/Images/advance_setting_icon.png')}
              />
              <Text style={styles.menuItemText}>Cài đặt nâng cao</Text>
            </View>
          </View>

          {/*San Pham*/}
          <View style={styles.menuRow}>
            <View style={styles.menuSection}>
              <Text style={styles.menuSectionText}>SẢN PHẨM</Text>
            </View>
            {/*Item - 1*/}
            <View style={[styles.menuItem, {marginTop:8}]}>
              <Image style={styles.menuItemImage}
                source={require('../../public/Images/aboutproduct_icon.png')}
              />
              <Text style={styles.menuItemText}>Phiên bản hiện tại</Text>
              <View style={{flex:1}}></View>
              <View >
                <Text style={styles.menuItemText}>1.0v</Text>
              </View>
            </View>
            {/*Item - 2*/}
            <View style={styles.menuItem}>
              <Image style={styles.menuItemImage}
                source={require('../../public/Images/Term_icon.png')}
              />
              <Text style={styles.menuItemText}>Điều khoản sử dụng</Text>
            </View>
            {/*Item - 3*/}
            <View style={styles.menuItem}>
              <Image style={styles.menuItemImage}
                source={require('../../public/Images/Ranking_icon.png')}
              />
              <Text style={styles.menuItemText}>Bình chọn cho Du Lịch</Text>
            </View>
            {/*Item - 4*/}
            <View style={[styles.menuItem, {marginLeft:3, marginRight:3}]}>
              <Image style={styles.menuItemImageCustom}
                source={require('../../public/Images/Email_icon.png')}
              />
              <Text style={styles.menuItemTextCustom}>Gửi email gớp ý</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
var colorText = 'white';
var colorTextSection = 'gray';
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#374b56',
    ...Platform.select({
      ios: {
        paddingTop:20,
      },
      android: {
        paddingTop:0,
      },
    }),
  },

  content:{
    flex:1,
    flexDirection:'column',
  },

  userView:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
    padding:10
  },

  userIcon:{
    width: height/10,
    height:height/10,
    tintColor: colorText,
  },

  userText:{
    color: colorText,
    fontSize: normalize(18),
    marginLeft:10
  },

  menuRow:{
    paddingLeft:10,
    paddingRight:10,
  },

  menuSection:{
    height:30,
    alignItems:'flex-start',
    justifyContent:'center',
    borderColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth
  },

  menuSectionText:{
    color: colorTextSection
  },

  menuItem:{
    height:40,
    alignItems:'center',
    flexDirection:'row'
  },

  menuItemImage:{
    width:30,
    height:30,
    marginRight:10,
    tintColor: colorText,
  },

  menuItemText:{
    color: colorText,
  },

  menuItemImageCustom:{
    width:24,
    height:24,
    marginRight:10,
    tintColor: colorText,
  },

  menuItemTextCustom:{
    color: colorText,
    marginLeft:3
  },

})
