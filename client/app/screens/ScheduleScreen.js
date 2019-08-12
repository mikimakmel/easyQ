import React, { Component } from 'react'
import {
  Text,
  Alert,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  AsyncStorage
} from 'react-native'
import { Divider, Avatar } from 'react-native-elements'
import styles from '../styles/ScheduleScreenStyles'
import { Popup } from 'react-native-map-link'
import colors from '../styles/colors'
import Swipeout from 'react-native-swipeout'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { NavigationEvents } from 'react-navigation'

export default class ScheduleScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEmpty: true,
      isPopupVisble: false,
      scheduleList: [],
      itemPressed: {}
    }
    this.renderRow = this.renderRow.bind(this)
    this.initScheduleList = this.initScheduleList.bind(this)
    this.renderEmptySchedule = this.renderEmptySchedule.bind(this)
    this.renderScheduleList = this.renderScheduleList.bind(this)
    this.handleDeletePress = this.handleDeletePress.bind(this)
    this.deleteFromSchedule = this.deleteFromSchedule.bind(this)
  }

  keyExtractor = (item, index) => index.toString()

  componentDidMount() {
    this.initScheduleList()
  }

  initScheduleList() {
    AsyncStorage.getItem('Schedule', (err, result) => {
      if (result !== null) {
        this.setState({
          scheduleList: JSON.parse(result),
          isEmpty: !(JSON.parse(result).length > 0)
        })
      }
    })
  }

  renderEmptySchedule() {
    return (
      <View style={styles.emptyListContainer}>
        <Image
          source={require('../../assets/emptyScheduleLogo.png')}
          style={styles.emptyListIcon}
        />
        <View style={styles.emptyListTextContainer}>
          <Text style={styles.emptyListHeadingText}>Your Schedule is Empty</Text>
          <Text style={styles.emptyListText}>Book your favorite services now!</Text>
        </View>
      </View>
    )
  }

  handleDeletePress(item) {
    Alert.alert(
      'Are you sure?',
      `Cancel this event and notify the business`,
      [
        {
          text: 'Yes',
          onPress: () => {
            this.deleteFromSchedule(item)
          }
        },
        { text: 'Cancel' }
      ],
      { cancelable: false }
    )
  }

  deleteFromSchedule(item) {
    AsyncStorage.getItem('Schedule', (err, result) => {
      if (result !== null) {
        let arr = []
        if (JSON.parse(result) !== null) arr = JSON.parse(result)
        for (let i = 0; i < arr.length; i++) {
          if (
            (arr[i].BusinessID === item.BusinessID) &
            (arr[i].ServiceName === item.ServiceName) &
            (arr[i].Date === item.Date) &
            (arr[i].Time === item.Time)
          ) {
            arr.splice(i, 1)
          }
        }
        AsyncStorage.setItem('Schedule', JSON.stringify(arr))
        this.setState({
          scheduleList: arr,
          isEmpty: !(arr.length > 0)
        })
      }
    })
  }

  renderRow({ item }) {
    const swipeoutBtns = [
      {
        text: 'Delete',
        type: 'delete',
        backgroundColor: 'red',
        underlayColor: colors.lightBlack,
        onPress: () => this.handleDeletePress(item)
      }
    ]

    return (
      <Swipeout right={swipeoutBtns} autoClose sensitivity={1000}>
        <View style={styles.eventContainer}>
          <View style={styles.shadowBox}>
            <View style={styles.infoBoxContainer}>
              <Avatar
                containerStyle={styles.avatarContiner}
                rounded
                size={60}
                source={{ uri: item.Avatar }}
              />
              <View style={styles.textLeftAlign}>
                <View>
                  <Text style={styles.titleText}>{item.BusinessName}</Text>
                </View>
                <View>
                  <Text style={styles.serviceText}>{item.ServiceName}</Text>
                </View>
                <View>
                  <Text style={styles.dateText}>{item.Date}</Text>
                </View>
                <View>
                  <Text style={styles.dateText}>{item.Time}</Text>
                </View>
              </View>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.getDirectionsContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ isPopupVisble: true, itemPressed: item })
                }}
                style={styles.getDirectionsButtonContainer}
              >
                <MaterialCommunityIcons
                  name="directions"
                  size={25}
                  color={colors.blue}
                  style={styles.getDirectionsIcon}
                />
                <Text style={styles.getDirectionsText}>Get Directions</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Swipeout>
    )
  }

  renderScheduleList() {
    const { scheduleList } = this.state
    return (
      <FlatList data={scheduleList} renderItem={this.renderRow} keyExtractor={this.keyExtractor} />
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.flexContainer}>
        <NavigationEvents onDidFocus={() => this.initScheduleList()} />
        <View style={styles.flexContainer}>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <Text style={styles.heading}>My Schedule</Text>
            {this.state.isEmpty === true ? this.renderEmptySchedule() : this.renderScheduleList()}
            <Popup
              isVisible={this.state.isPopupVisble}
              onCancelPressed={() => this.setState({ isPopupVisble: false })}
              onAppPressed={() => this.setState({ isPopupVisble: false })}
              onBackButtonPressed={() => this.setState({ isPopupVisble: false })}
              modalProps={{ animationIn: 'slideInUp' }}
              appsWhiteList={[]}
              options={{
                alwaysIncludeGoogle: true,
                latitude: 32.0904312,
                longitude: 34.8024365,
                title: this.state.itemPressed.Address,
                dialogTitle: 'Open With',
                cancelText: 'Cancel'
              }}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }
}
