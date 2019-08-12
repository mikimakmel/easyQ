import React, { Component } from 'react'
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Alert,
  AsyncStorage,
  TouchableOpacity
} from 'react-native'
import { CalendarList } from 'react-native-calendars'
import { ListItem, Button, Overlay } from 'react-native-elements'
import colors from '../styles/colors'
import styles from '../styles/BookingScreenStyles'
import * as Calendar from 'expo-calendar'
import * as Permissions from 'expo-permissions'
import moment from 'moment'

export default class CalendarsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      businessData: this.props.navigation.getParam('businessData'),
      serviceData: this.props.navigation.getParam('serviceData'),
      currentBook: {},
      eventDetails: {},
      overlayVisible: false
    }
    this.onDayPress = this.onDayPress.bind(this)
    this.renderRow = this.renderRow.bind(this)
    this.saveToDeviceCalendar = this.saveToDeviceCalendar.bind(this)
    this._getCalendarPermissionAsync = this._getCalendarPermissionAsync.bind(this)
    this.handleBookButtonPressed = this.handleBookButtonPressed.bind(this)
    this.addToMySchedule = this.addToMySchedule.bind(this)
    this.renderOverlay = this.renderOverlay.bind(this)
  }

  componentDidMount() {
    this._getCalendarPermissionAsync()
  }

  componentWillMount() {
    const Tday = new Date().getDate().toString()
    let Tmonth = (new Date().getMonth() + 1).toString()
    const Tyear = new Date().getFullYear().toString()
    if (Tmonth.length < 2) {
      Tmonth = '0' + Tmonth
    }
    const TfullDate = Tyear + '-' + Tmonth.toString() + '-' + Tday.toString()
    this.setState({ selected: TfullDate, currentDay: TfullDate })
  }

  keyExtractor = (item, index) => index.toString()

  async _getCalendarPermissionAsync() {
    const { status } = await Permissions.askAsync(Permissions.CALENDAR)
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      })
    }
  }

  onDayPress(day) {
    this.setState({ selected: day.dateString })
  }

  async saveToDeviceCalendar() {
    const { businessData, serviceData, currentItem, selected } = this.state
    let endingTime = moment(`${selected} ${currentItem.Time}`).format('HH:mm')

    const duration = serviceData.Duration.split(' ')
    if (serviceData.Duration.includes('Hrs')) {
      endingTime = moment(`${selected} ${currentItem.Time}`)
        .add(duration[0], 'hours')
        .format('HH:mm')
    } else {
      endingTime = moment(`${selected} ${currentItem.Time}`)
        .add(duration[0], 'minutes')
        .format('HH:mm')
    }

    const startingTime = moment(`${selected} ${currentItem.Time}`)
      .subtract(3, 'hours')
      .format('HH:mm')
    endingTime = moment(`${selected} ${endingTime}`)
      .subtract(3, 'hours')
      .format('HH:mm')

    const details = {
      startDate: `${this.state.selected}T${startingTime}:00.000Z`,
      endDate: `${this.state.selected}T${endingTime}:00.000Z`,
      location: businessData.Location.Address,
      timeZone: 'GMT+3',
      title: `${serviceData.Name} at ${businessData.Name}`
    }

    try {
      await Calendar.createEventAsync(Calendar.DEFAULT, details)
    } catch (error) {
      console.log('Error', error)
    }
  }

  addToMySchedule(item) {
    const { businessData, serviceData } = this.state
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let endingTime = moment(`${this.state.selected} ${item.Time}`).format('HH:mm')

    const duration = serviceData.Duration.split(' ')
    if (serviceData.Duration.includes('Hrs')) {
      endingTime = moment(`${this.state.selected} ${item.Time}`)
        .add(duration[0], 'hours')
        .format('HH:mm')
    } else {
      endingTime = moment(`${this.state.selected} ${item.Time}`)
        .add(duration[0], 'minutes')
        .format('HH:mm')
    }

    const event = {
      BusinessID: businessData.ID,
      BusinessName: businessData.Name,
      ServiceName: serviceData.Name,
      Avatar: businessData.Pictures.Favorite,
      Date: `${days[new Date(this.state.selected).getDay()]} | ${new Date(
        this.state.selected
      ).getDate()}.${new Date(this.state.selected).getMonth() + 1}.${new Date(
        this.state.selected
      ).getFullYear()}`,
      Time: `${item.Time} - ${endingTime}`,
      Address: businessData.Location.Address
    }

    AsyncStorage.getItem('Schedule', (err, result) => {
      let arr = []
      if (JSON.parse(result) !== null) arr = JSON.parse(result)
      arr.push(event)
      return AsyncStorage.setItem('Schedule', JSON.stringify(arr))
    })

    this.setState({ currentItem: item, eventDetails: event })
  }

  handleBookButtonPressed(item) {
    Alert.alert(
      'Are you sure?',
      `Booking ${this.state.serviceData.Name} at ${item.Time}`,
      [
        {
          text: 'Yes',
          onPress: () => {
            this.addToMySchedule(item)
            this.setState({ overlayVisible: true })
          }
        },
        { text: 'Cancel' }
      ],
      { cancelable: false }
    )
  }

  renderOverlay() {
    return (
      <Overlay isVisible={this.state.overlayVisible} fullScreen>
        <View style={styles.overlayContainer}>
          <Text style={styles.overlayHeadingText}>Booking Information:</Text>
          <Text style={styles.overlayText}>{this.state.eventDetails.BusinessName}</Text>
          <Text style={styles.overlayText}>{this.state.eventDetails.ServiceName}</Text>
          <Text style={styles.overlayText}>{this.state.eventDetails.Date}</Text>
          <Text style={styles.overlayText}>{this.state.eventDetails.Time}</Text>
          <Text style={styles.overlayText}>{this.state.eventDetails.Address}</Text>
          <TouchableOpacity
            onPress={() => {
              this.setState({ overlayVisible: false })
              this.props.navigation.goBack()
              this.props.navigation.navigate('Schedule')
              this.saveToDeviceCalendar()
            }}
          >
            <Text style={styles.overlaySaveButton}>Save to My Device Calandar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({ overlayVisible: false })
              this.props.navigation.goBack()
              this.props.navigation.navigate('Schedule')
            }}
          >
            <Text style={styles.overlayDontSaveButton}>{"Don't Save"}</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
    )
  }

  renderRow({ item }) {
    return (
      <View>
        <ListItem
          title={item.Time}
          titleStyle={styles.ListTitle}
          subtitle={item.Hosting}
          subtitleStyle={styles.ListSubtitle}
          bottomDivider
          checkmark={
            <Button
              buttonStyle={styles.ButtonStyling}
              titleStyle={styles.ButtonTitleStyling}
              containerViewStyle={{ witdh: 70 }}
              type="outline"
              large
              title="Book"
              onPress={() => this.handleBookButtonPressed(item)}
            />
          }
        />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <CalendarList
          horizontal
          pagingEnabled
          style={styles.calendar}
          minDate={Date()}
          onDayPress={this.onDayPress}
          // onMonthChange={(month) => {console.log('month changed', month)}}
          markingType={'custom'}
          markedDates={{
            [this.state.selected]: {
              customStyles: {
                container: {
                  backgroundColor: colors.red
                },
                text: {
                  color: 'white'
                }
              }
            },
            '2019-07-19': {
              customStyles: {
                text: {
                  color: 'white'
                }
              }
            }
          }}
        />
        <Text style={styles.text}>{this.state.selected}</Text>
        <ScrollView>
          <FlatList
            data={this.state.serviceData.Availability}
            renderItem={this.renderRow}
            keyExtractor={this.keyExtractor}
          />
        </ScrollView>
        {this.renderOverlay()}
      </View>
    )
  }
}
