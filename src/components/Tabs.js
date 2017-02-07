import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ListView,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
  StatusBar
} from 'react-native';
var {height, width} = Dimensions.get('window');

export default class Tabs extends Component {
  constructor(props){
    super(props);
    this.state ={
      indexSelected: 0,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      data: this.props.dataSource,
      colorSelected: this.props.dataSource[0].backgroundColor,
      isScroll: false,
      page: 0,
    };
  }

  handleClick(rowData, rowID) {
    rowData.isSelected = !rowData.isSelected;
    var dataClone = this.state.data;

    let unSelected = dataClone[this.state.indexSelected];
    unSelected.isSelected = !unSelected.isSelected;

    dataClone[this.state.indexSelected] = unSelected;
    dataClone[rowData.id] = rowData;

    this.setState({
      data: dataClone,
      indexSelected: rowID,
      colorSelected: rowData.backgroundColor,
      page: rowID
    });

    if (Platform.OS === 'android'){
      this._scrollView.scrollTo({x: rowID * width , animated: true});
    }
  }

  _renderRow(rowData, rowID) {
    let color      = rowData.backgroundColor;
    let margin     = (rowData.isSelected == true)? 0  : 5 ;
    let itemHeight = (rowData.isSelected == true)? 50 : 40;
    let selected   = (rowData.isSelected == true)? 0  : 2 ;
    return (
      <TouchableWithoutFeedback onPress={this.handleClick.bind(this, rowData, rowID)}>
        <View style={[styles.item, {backgroundColor: color, height: itemHeight , marginTop: margin,
        borderBottomLeftRadius:selected,
        borderBottomRightRadius:selected,
        }]} >
          <Text style={styles.textTitle}>{rowData.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _children(children = this.props.children) {
    return React.Children.map(children, (child) => child);
  }

  _renderContent(){
    return this._children().map((child, idx) => {
      return (
        <View key={idx} style={{flex:1, width: width}}>
          {child}
        </View>
      )
    });
  }

  _renderScrollableContent() {
    return (
      <ScrollView style={{flex:1}}
        horizontal={true}
        pagingEnabled={true}
        scrollEnabled={false}
        alwaysBounceVertical={false}
        directionalLockEnabled
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        contentOffset={{ x: this.state.page * width, }}
        ref={(scrollView) => { this._scrollView = scrollView; }}
      >
        {this._renderContent()}
      </ScrollView>
    );
  }

  render() {
    return (
      <View style={{flex:1, backgroundColor:'white'}}>
        <StatusBar
          backgroundColor={this.state.colorSelected}
          barStyle="default"
          networkActivityIndicatorVisible={true}
        />
        <View style={[styles.container, {backgroundColor:this.state.colorSelected}]}>
          <View style={styles.viewBg}></View>
          <ListView
            style={styles.listView}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            dataSource={this.state.dataSource}
            renderRow={(rowDataTabs, sectionIDTabs, rowIDTabs) => this._renderRow(rowDataTabs, rowIDTabs)}
            bounces={false}
            enableEmptySections={true}
          />
        </View>
        <View style={{flex:1}}>
          {this._renderScrollableContent()}
        </View>
      </View>

    );
  }

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.data)
    });
  }
}

const styles = StyleSheet.create({
  container:{
    height:47,
  },

  viewBg:{
    backgroundColor:'white',
    height:10
  },

  listView:{
    flex:1,
    height:50,
    backgroundColor:'transparent',
    marginTop:-11
  },

  item:{
    justifyContent:'center',
    alignItems:'center',
    paddingLeft:10,
    paddingRight:10,
    borderTopLeftRadius:2,
    borderTopRightRadius:2
  },

  textTitle:{
    color: 'white',
  },

})
