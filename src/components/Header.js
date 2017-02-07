import React, { Component, PropTypes} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
  TouchableOpacity
} from 'react-native';
var {height, width} = Dimensions.get('window');
var normalize = require('../helper/normalizeText.js');

class Header extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
		backgroundColor: PropTypes.string,
    leftImageTintColor: PropTypes.string,
    rightImageTintColor: PropTypes.string,
    titleColor: PropTypes.string,
    titleLeftText: PropTypes.string,
    onLeftButtonPress: PropTypes.func,
    onRightButtonPress: PropTypes.func,
	};

  static defaultProps = {
		backgroundColor: '#f5f3f4',
    leftImageTintColor: '#000000',
    rightImageTintColor: '#000000',
    titleColor: '#000000',
	};

  constructor(props){
    super(props);
		this.state = {
      ...this.props
    }
	}

  _renderLeftIcon() {
		if(this.state.leftButtonIcon){
			return (
        <TouchableOpacity onPress={this._onLeftButtonPressHandle.bind(this)} style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
          <Image style={[styles.leftButtonIcon, {tintColor: this.state.leftImageTintColor}]}
            resizeMode={'contain'}
            source={this.state.leftButtonIcon} />
          <Text style={[styles.leftButtonText, {color: this.state.leftImageTintColor}]}>{this.state.titleLeftText}</Text>
        </TouchableOpacity>
			);
		}
		return null;
	}

  _renderRightIcon() {
		if(this.state.rightButtonIcon){
			return (
        <TouchableOpacity onPress={this._onRightButtonPressHandle.bind(this)}>
  				<Image style={[styles.rightButtonIcon, {tintColor: this.state.rightImageTintColor}]}
            resizeMode={'contain'}
            source={this.state.rightButtonIcon} />
        </TouchableOpacity>
			);
		}
		return null;
	}

  _onLeftButtonPressHandle(event) {
		let onPress = this.state.onLeftButtonPress;
		typeof onPress === 'function' && onPress(event);
	}

  _onRightButtonPressHandle(event) {
		let onPress = this.state.onRightButtonPress;
		typeof onPress === 'function' && onPress(event);
	}

  render() {
    return (
      <View style={[styles.headerContainer, {backgroundColor: this.state.backgroundColor}]}>
        <View style={styles.headerLeft}>
          {this._renderLeftIcon()}
        </View>
        <View style={styles.headerTitle}>
          <Text style={[styles.titleText, {color: this.state.titleColor}]} numberOfLines={1}>
            {this.state.title}
          </Text>
        </View>
        <View style={styles.headerRight}>
          {this._renderRightIcon()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer:{
    flexDirection:'row',
    ...Platform.select({
      ios: {
        height: 64,
        paddingTop:20,
      },
      android: {
        height: 44,
      },
    }),
  },

  headerLeft:{
    flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: 90,
		paddingTop: 1,
		paddingLeft: 8
  },

  headerTitle:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerRight:{
    flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		width: 90,
		paddingTop: 1,
		paddingRight: 8
  },

  leftButtonIcon: {
		width: normalize(25),
    height:normalize(25),
	},

  leftButtonText:{
    fontSize: normalize(15)
  },

  rightButtonIcon:{
    width: normalize(25),
    height:normalize(25),
	},

  titleText:{
    fontSize:normalize(18),
    fontWeight:'bold',
  },

});

export default Header;
