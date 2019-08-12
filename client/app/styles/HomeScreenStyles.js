import { StyleSheet } from 'react-native'
import colors from './colors'

export default StyleSheet.create({
  scrollView: {
    height: '100%'
  },
  flexContainer: {
    flex: 1
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 25,
    color: colors.gray04,
    marginTop: 50,
    paddingLeft: 20
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
    marginTop: 45,
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
  },
  FindServicesButton: {
    backgroundColor: colors.red,
    width: 200,
    height: 50,
    marginTop: 100,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowColor: colors.red,
    shadowOpacity: 0.3,
    elevation: 3,
    borderWidth: 0.2,
    borderColor: colors.lightBlack,
    borderRadius: 80,
    alignItems: 'center'
  },
  FindServicesButtonTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center'
  }
})
