import React, { Component } from 'react'
import { Text, View, SafeAreaView, ScrollView, Image, FlatList, AsyncStorage } from 'react-native'
import MyServiceCard from '../Components/MyServiceCard'
import { Button } from 'react-native-elements'
import styles from '../styles/HomeScreenStyles'
import { NavigationEvents } from 'react-navigation'

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEmpty: true,
      favoritesList: []
    }
    this.renderEmptyScreen = this.renderEmptyScreen.bind(this)
    this.initFavoritesList = this.initFavoritesList.bind(this)
    this.renderFavoritesList = this.renderFavoritesList.bind(this)
  }

  componentWillMount() {
    // AsyncStorage.clear() /////////////////////////////////////////////////////////
    this.initFavoritesList()
  }

  initFavoritesList() {
    AsyncStorage.getItem('Businesses').then(favs => {
      if (favs !== null) {
        this.setState({
          favoritesList: JSON.parse(favs),
          isEmpty: !(JSON.parse(favs).length > 0)
        })
      }
    })
  }

  renderEmptyScreen() {
    return (
      <View style={styles.emptyListContainer}>
        <Image source={require('../../assets/emptyListLogo.png')} style={styles.emptyListIcon} />
        <View style={styles.emptyListTextContainer}>
          <Text style={styles.emptyListHeadingText}>Services List is Empty</Text>
          <Text style={styles.emptyListText}>Start looking for your favorite services now!</Text>
        </View>
        <Button
          title="Find Services"
          type="outline"
          buttonStyle={styles.FindServicesButton}
          titleStyle={styles.FindServicesButtonTitle}
          onPress={() => this.props.navigation.navigate('Search')}
        />
      </View>
    )
  }

  renderFavoritesList() {
    return (
      <FlatList
        data={this.state.favoritesList}
        keyExtractor={item => item.ID.toString()}
        renderItem={({ item }) => (
          <MyServiceCard businessData={item} navigation={this.props.navigation} />
        )}
      />
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.flexContainer}>
        <NavigationEvents
          onDidFocus={() => {
            this.initFavoritesList()
          }}
        />
        <View style={styles.flexContainer}>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <Text style={styles.heading}>My Services</Text>
            {this.state.isEmpty === true ? this.renderEmptyScreen() : this.renderFavoritesList()}
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }
}
