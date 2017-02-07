import { StyleSheet, Platform , Dimensions} from 'react-native';
var {height, width} = Dimensions.get('window');

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
		width: width/10,
    height:width/10,
	},

  rightButtonIcon:{
    width: width/10,
    height:width/10,
	},

  titleText:{
    fontSize:width/16,
    fontWeight:'bold',
  },

});

export default styles;
