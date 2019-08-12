import { StyleSheet, Platform, StatusBar } from 'react-native'
import colors from './colors'

export default StyleSheet.create({
  flexContainer: {
    flex: 1
  },
  header: {
    height: Platform.OS === 'android' ? 100 + StatusBar.currentHeight : 100,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
    marginHorizontal: 24,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 7,
    shadowColor: colors.gray04,
    shadowOpacity: 0.3,
    elevation: 3,
    marginTop: Platform.OS === 'android' ? 30 : null,
    height: 45
  },
  searchIcon: {
    paddingLeft: 5
  },
  closeIcon: {
    marginTop: 1,
    opacity: 0.6
  },
  textInputBox: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: colors.red,
    opacity: 0.85,
    backgroundColor: 'white',
    paddingLeft: 20,
    marginTop: 2
  },
  titleText: {
    color: colors.black,
    opacity: 0.85,
    fontSize: 17,
    fontWeight: '600'
  },
  subtitleText: {
    color: '#afb8bb',
    fontSize: 14,
    fontWeight: '500'
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center'
  },
  rankingText: {
    color: 'grey',
    fontSize: 10,
    marginLeft: 4
  },
  adContainer: {
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 3,
    marginRight: 10
  },
  adText: {
    color: 'green',
    fontSize: 10,
    marginHorizontal: 3,
    marginVertical: 2
  },
  indicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  noResultsContainer: {
    flex: 1,
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noResultsText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.gray03,
    textAlign: 'center'
  }
})
