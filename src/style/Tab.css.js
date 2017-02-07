import { StyleSheet, Platform , Dimensions} from 'react-native';
var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center'
  },

  item:{
    backgroundColor:'yellow',
    marginLeft:0,
    justifyContent:'center',
    alignItems:'center',
    paddingLeft:10,
    paddingRight:10,
    borderTopLeftRadius:2,
    borderTopRightRadius:2
  }

})

export default styles;
