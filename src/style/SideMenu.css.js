import { StyleSheet, Platform , Dimensions} from 'react-native';
var {height, width} = Dimensions.get('window');

const absoluteStretch = {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'blue'
  },

  overlay: {
    ...absoluteStretch,
    backgroundColor: 'red',
  },

})

export default styles;
