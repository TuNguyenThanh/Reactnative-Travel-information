import React, { Component } from 'react';
import {
  Text,
  View,
  Navigator
} from 'react-native';
import DetailView from './DetailView.js';

export default class Detail extends Component {
  renderScene(route, navigator) {
    var Component = route.component;
    return (
      <Component navigator={navigator} route={route} {...route.passProps}
        back={() => route.back()}
        data={route.data}
        detailData={(data) => route.detailData(data)}
      />
    );
  }

  render() {
    return (
      <Navigator
        ref="navigator"
        style={{flex:1}}
        renderScene={this.renderScene}
        initialRoute={{
          component: DetailView,
          data: this.props.data,
          back: this.props.back,
          detailData: this.props.detailData,
        }}
      />
    );
  }
}
