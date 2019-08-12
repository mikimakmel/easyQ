import React, { Component } from 'react'
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  Dimensions
} from 'react-native'
import { Button, Overlay } from 'react-native-elements'
import ImagesSwiper from 'react-native-image-swiper'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import AboutPage from '../Components/AboutPage'
import ServicesPage from '../Components/ServicesPage'
import colors from '../styles/colors'
import styles from '../styles/BusinessPageStyles'
import { NavigationEvents } from 'react-navigation'
import { Entypo } from '@expo/vector-icons'
import Menu, { MenuItem } from 'react-native-material-menu'

const screenWidth = Dimensions.get('window').width

export default class BusinessPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      businessData: this.props.navigation.getParam('businessData'),
      isInUserFavorites: this.props.navigation.getParam('isInUserFavorites'),
      overlayVisible: false,
      _menu: null
    }
    this.renderAskToJoinButton = this.renderAskToJoinButton.bind(this)
    this.renderJoinedOverlay = this.renderJoinedOverlay.bind(this)
    this.renderBusinessInfo = this.renderBusinessInfo.bind(this)
    this.setMenuRef = this.setMenuRef.bind(this)
    this.hideMenu = this.hideMenu.bind(this)
    this.showMenu = this.showMenu.bind(this)
    this.deleteFromFavorites = this.deleteFromFavorites.bind(this)
  }

  static navigationOptions = ({ navigation }) => {
    if (navigation.getParam('isInUserFavorites') === true) {
      return {
        headerRight: (
          <Entypo
            name="dots-three-vertical"
            size={26}
            style={styles.headerRightIcon}
            raised
            color={colors.white}
            onPress={navigation.getParam('showMenu')}
          />
        )
      }
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ showMenu: this.showMenu })
  }

  setMenuRef(ref) {
    this.setState({ _menu: ref })
  }
  hideMenu() {
    this.state._menu.hide()
  }
  showMenu() {
    this.state._menu.show()
  }

  addBusinessToFavorites() {
    AsyncStorage.getItem('Businesses').then(favs => {
      let arr = []
      if (JSON.parse(favs) !== null) arr = JSON.parse(favs)
      arr.push(this.state.businessData)
      return AsyncStorage.setItem('Businesses', JSON.stringify(arr))
    })
  }

  deleteFromFavorites() {
    AsyncStorage.getItem('Businesses', (err, result) => {
      if (result !== null) {
        let arr = []
        if (JSON.parse(result) !== null) arr = JSON.parse(result)
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].ID === this.state.businessData.ID) {
            arr.splice(i, 1)
          }
        }
        AsyncStorage.setItem('Businesses', JSON.stringify(arr))
      }
    })
  }

  handleDeletePress() {
    Alert.alert(
      'Are you sure?',
      `Remove this business from my list`,
      [
        {
          text: 'Yes',
          onPress: () => {
            this.hideMenu()
            this.deleteFromFavorites()
            this.props.navigation.navigate('HomeScreen')
          }
        },
        {
          text: 'Cancel',
          onPress: () => {
            this.hideMenu()
          }
        }
      ],
      { cancelable: false }
    )
  }

  renderAskToJoinButton() {
    return (
      <View style={styles.askToJoinContainer}>
        <View style={styles.askToJoinInsideContainer}>
          <Text style={styles.joinText}>Send a request to join</Text>
          <Button
            title="Join"
            type="outline"
            containerStyle={styles.joinButtonContainer}
            buttonStyle={styles.joinButton}
            titleStyle={styles.joinButtonTitle}
            onPress={() => {
              this.setState({ overlayVisible: true })
              this.addBusinessToFavorites()
            }}
          />
        </View>
      </View>
    )
  }

  renderJoinedOverlay() {
    return (
      <Overlay isVisible={this.state.overlayVisible} fullScreen>
        <View style={styles.overlayContainer}>
          <Text style={styles.overlayHeadingText}>Congratulation!</Text>
          <Text style={styles.overlayText}>
            {'You and ' + this.state.businessData.Name + ' are now connected.'}
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.setState({ overlayVisible: false })
              this.props.navigation.goBack()
              this.props.navigation.navigate('HomeScreen')
            }}
          >
            <Text style={styles.overlayButton}>See Services List</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
    )
  }

  renderBusinessInfo() {
    const { businessData } = this.state

    if (this.props.navigation.getParam('prevScreen') === 'Home') {
      return (
        <ScrollableTabView
          initialPage={0}
          locked
          tabBarUnderlineStyle={styles.tabBarUnderline}
          tabBarBackgroundColor={'#FEFDFF'}
          tabBarActiveTextColor={colors.red}
          tabBarInactiveTextColor={'grey'}
          tabBarTextStyle={styles.tabBarText}
        >
          <AboutPage
            tabLabel="About"
            isInUserFavorites={this.state.isInUserFavorites}
            businessData={businessData}
          />
          <ServicesPage
            tabLabel="Services"
            businessData={businessData}
            navigation={this.props.navigation}
          />
        </ScrollableTabView>
      )
    } else if (
      this.state.isInUserFavorites === true &&
      this.props.navigation.getParam('prevScreen') === 'Search'
    ) {
      return (
        <View style={styles.flexContainer}>
          <AboutPage
            tabLabel="About"
            isInUserFavorites={this.state.isInUserFavorites}
            businessData={businessData}
          />
        </View>
      )
    }

    return (
      <View style={styles.flexContainer}>
        <AboutPage
          tabLabel="About"
          isInUserFavorites={this.state.isInUserFavorites}
          businessData={businessData}
        />
        {this.renderAskToJoinButton()}
      </View>
    )
  }

  render() {
    const { businessData } = this.state

    return (
      <SafeAreaView style={styles.flexContainer}>
        <NavigationEvents
          onDidFocus={() =>
            this.setState({
              businessData: this.props.navigation.getParam('businessData'),
              isInUserFavorites: this.props.navigation.getParam('isInUserFavorites')
            })
          }
        />
        <View style={styles.topMenuContainer}>
          <Menu style={styles.topMenu} ref={this.setMenuRef} button={<View />}>
            <MenuItem
              onPress={() => {
                this.handleDeletePress()
              }}
              underlayColor={'red'}
              ellipsizeMode={'tail'}
              style={styles.topMenuItem}
            >
              Delete Business
            </MenuItem>
          </Menu>
        </View>
        <View style={styles.flexContainer}>
          <View style={styles.ImagesSwiperContainer}>
            <ImagesSwiper
              images={businessData.Pictures.Carousel}
              autoplay
              autoplayTimeout={5}
              showsPagination
              width={screenWidth}
              height={200}
            />
          </View>
          {this.renderBusinessInfo()}
          {this.renderJoinedOverlay()}
        </View>
      </SafeAreaView>
    )
  }
}
