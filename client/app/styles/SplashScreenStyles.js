import { StyleSheet } from 'react-native'
import colors from './colors'

export default StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50
  },
  easyText: {
    fontSize: 55,
    fontWeight: '400',
    color: colors.lightGray
  },
  QText: {
    fontSize: 55,
    fontWeight: '400',
    color: colors.red
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    marginBottom: 70,
    height: 50
  }
})
