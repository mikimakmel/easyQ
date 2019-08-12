import React from 'react'
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation'
import HomeScreen from '../screens/HomeScreen'
import ScheduleScreen from '../screens/ScheduleScreen'
import SearchScreen from '../screens/SearchScreen'
import BusinessPage from '../screens/BusinessPage'
import BookingScreen from '../screens/BookingScreen'
import colors from '../styles/colors'
import { AntDesign, EvilIcons, Feather } from '@expo/vector-icons'

const homeStackNavigation = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
      headerBackTitle: null
    }
  },
  BusinessPage: {
    screen: BusinessPage,
    navigationOptions: {
      headerTransparent: true,
      headerBackTitle: null,
      headerBackImage: (
        <Feather
          name="chevron-left"
          size={36}
          raised
          style={{ marginLeft: 2 }}
          color={colors.white}
        />
      ),
      tabBarHidden: true
    }
  },
  BookingScreen: {
    screen: BookingScreen,
    navigationOptions: {
      title: 'Pick Time & Date',
      headerTintColor: colors.red,
      headerBackTitle: null,
      headerBackImage: (
        <Feather
          name="chevron-left"
          size={32}
          raised
          style={{ marginLeft: 2 }}
          color={colors.red}
        />
      )
    }
  }
})

const searchStackNavigation = createStackNavigator({
  SearchScreen: {
    screen: SearchScreen,
    navigationOptions: {
      header: null,
      headerBackTitle: null
    }
  },
  BusinessPage: {
    screen: BusinessPage,
    navigationOptions: {
      headerTransparent: true,
      headerBackTitle: null,
      headerBackImage: (
        <Feather
          name="chevron-left"
          size={32}
          raised
          style={{ marginLeft: 2 }}
          color={colors.white}
        />
      )
    }
  }
})

searchStackNavigation.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  if (navigation.state.index > 0) {
    tabBarVisible = false
  }
  return {
    tabBarVisible
  }
}

const AppNavigator = createBottomTabNavigator(
  {
    Search: {
      screen: searchStackNavigation,
      navigationOptions: {
        tabBarLabel: 'SEARCH',
        tabBarIcon: ({ tintColor }) => (
          <EvilIcons name="search" size={40} color={tintColor} style={{ paddingTop: 5 }} />
        )
      }
    },
    Home: {
      screen: homeStackNavigation,
      navigationOptions: {
        tabBarLabel: 'HOME',
        tabBarIcon: ({ tintColor }) => (
          <AntDesign name="home" size={31} color={tintColor} style={{ paddingTop: 5 }} />
        )
      }
    },
    Schedule: {
      screen: ScheduleScreen,
      navigationOptions: {
        tabBarLabel: 'SCHEDULE',
        tabBarIcon: ({ tintColor }) => (
          <EvilIcons name="calendar" size={40} color={tintColor} style={{ paddingTop: 5 }} />
        )
      }
    }
  },
  {
    initialRouteName: 'Home',
    backBehavior: 'order',
    tabBarOptions: {
      activeTintColor: colors.red,
      inactiveTintColor: colors.lightBlack,
      style: {
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 0.5,
        shadowColor: 'grey',
        shadowOpacity: 0.5,
        elevation: 5,
        height: 58
      },
      labelStyle: {
        fontSize: 8,
        fontWeight: '600',
        paddingBottom: 5
      }
    },
    animationEnabled: true
  }
)

export default createAppContainer(AppNavigator)
