import { StyleSheet, Dimensions } from 'react-native'
import colors from './colors'

const screenWidth = Dimensions.get('window').width

export default StyleSheet.create({
  scrollView: {
    height: '100%'
  },
  flexContainer: {
    flex: 1
  },
  avatarContiner: {
    marginLeft: 15
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 35,
    color: colors.gray04,
    marginTop: 50,
    paddingLeft: 20
  },
  titleContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20
  },
  titleText: {
    color: colors.black,
    opacity: 0.85,
    fontSize: 17,
    fontWeight: '700'
  },
  serviceText: {
    color: colors.lightBlack,
    opacity: 0.85,
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 6
  },
  dateText: {
    color: '#afb8bb',
    fontSize: 14,
    fontWeight: '400'
  },
  dividerContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 5
  },
  divider: {
    height: 1.1,
    width: '100%',
    backgroundColor: colors.gray03,
    opacity: 0.25
  },
  eventContainer: {
    backgroundColor: 'white',
    height: 160,
    width: screenWidth
  },
  infoBoxContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 100,
    alignItems: 'center'
  },
  textLeftAlign: {
    marginLeft: 25
  },
  shadowBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fcfcfc',
    marginHorizontal: 20,
    marginVertical: 12,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4,
    shadowColor: 'grey',
    shadowOpacity: 0.3,
    elevation: 6
  },
  getDirectionsContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9'
  },
  getDirectionsText: {
    color: colors.blue,
    opacity: 0.9,
    fontSize: 13,
    fontWeight: '600'
  },
  getDirectionsButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  getDirectionsIcon: {
    marginRight: 5
  },
  emptyListContainer: {
    backgroundColor: colors.white,
    width: '100%',
    alignItems: 'center'
  },
  emptyListIcon: {
    width: 100,
    height: 100,
    marginTop: 50
  },
  emptyListTextContainer: {
    marginTop: 50,
    alignItems: 'center'
  },
  emptyListHeadingText: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.gray04,
    opacity: 0.8
  },
  emptyListText: {
    fontSize: 12,
    fontWeight: '300',
    color: colors.gray03,
    marginTop: 20,
    textAlign: 'center'
  }
})
