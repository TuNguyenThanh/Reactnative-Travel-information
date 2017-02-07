import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Navigator,
  StatusBar,
  NetInfo
} from 'react-native';
import Styles from '../style/Tab.css.js';
import Tabs   from './Tabs.js';
import Home   from './Home.js';
import Topic  from './Topic.js';
import Header from './Header.js';
import Menu   from './Menu.js';
import Detail from './Detail.js';
import DisConnect from './DisConnect.js';
import FullList from './FullList.js';
import SideMenu from'react-native-side-menu';
var {height, width} = Dimensions.get('window');

const arrTabSeting = [
  {
    title:'Trang chủ',
    backgroundColor:'#e3002e',
    isSelected: true,
  },
  {
    title:'Muôn màu',
    backgroundColor:'#f2b303',
    isSelected: false,
  },
  {
    title:'Điểm đến',
    backgroundColor:'#af0158',
    isSelected: false,
  },
  {
    title:'Ẩm thực',
    backgroundColor:'#7f3888',
    isSelected: false,
  },
  {
    title:'Mách bạn',
    backgroundColor:'#07a457',
    isSelected: false,
  },
  {
    title:'Thông tin du lịch',
    backgroundColor:'#009788',
    isSelected: false,
  }
];

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      isConnected: null,
    }
  }

  _toggleMenu() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  _updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  _renderScene(route, navigator){
    switch (route.name) {
      case "home":return (
        <SideMenu
          isOpen={this.state.isOpen}
          onChange={(isOpen) => this._updateMenuState(isOpen)}
          menu={<Menu navigator={navigator} />}
        >
          <Header
            title={'Du Lịch'}
            titleColor={'red'}
            backgroundColor={'white'}
            leftButtonIcon={require('../../public/Images/Menu.png')}
            leftImageTintColor={'red'}
            onLeftButtonPress={() => this._toggleMenu()}
          />
          <Tabs
            dataSource={arrTabSeting}>
            <Home
              seeAll={(id, topic) => {navigator.push({name:"fullList", passProps:{
                id: id,
                topic: topic,
              }})}}
              detail={(data) => {navigator.push({name:"detail", passProps:{
                data: data
              }})}}
            />
            <Topic
              id={1}
              detail={(data) => {navigator.push({name:"detail", passProps:{
                data: data
              }})}}
            />
            <Topic
              id={2}
              detail={(data) => {navigator.push({name:"detail", passProps:{
                data: data
              }})}}
            />
            <Topic
              id={3}
              detail={(data) => {navigator.push({name:"detail", passProps:{
                data: data
              }})}}
            />
            <Topic
              id={4}
              detail={(data) => {navigator.push({name:"detail", passProps:{
                data: data
              }})}}
            />
          </Tabs>
        </SideMenu>
      );break

      case "detail":return (
        <Detail
          back={()=>{navigator.pop()}}
          data={route.passProps.data}
          detailData={(data) => {navigator.push({name:"detail", passProps:{
            data: data
          }})}}
        />
      );break

      case "fullList":return (
        <FullList
          back={()=>{navigator.pop()}}
          id={route.passProps.id}
          topic={route.passProps.topic}
          detail={(data) => {navigator.push({name:"detail", passProps:{
            data: data
          }})}}
        />
      );break
      case "menu":return (
        <Menu />
      );break
    }
  }

  render() {
    return (
      <View style={{flex:1, backgroundColor:'#374b56'}}>
        <Navigator
          initialRoute={{name:"home"}}
          renderScene={(this._renderScene.bind(this))}
        />
      </View>
    );
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'change',
      this._handleConnectivityChange
    );
    NetInfo.isConnected.fetch().done(
      (isConnected) => { this.setState({isConnected}); }
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
        'change',
        this._handleConnectivityChange
    );
  }

  _handleConnectivityChange = (isConnected) => {
    this.setState({
      isConnected,
    });
  };
}
