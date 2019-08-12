import React, { Component } from 'react'
import {
  Text,
  View,
  FlatList,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage
} from 'react-native'
import { ListItem, Avatar, Rating } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import colors from '../styles/colors'
import styles from '../styles/SearchScreenStyles'
import { NavigationEvents } from 'react-navigation'
import { WaveIndicator } from 'react-native-indicators'

export default class SearchScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchQuery: '',
      adsList: [],
      searchResults: [],
      favoritesList: [],
      isLoading: true
    }
    this.updateSearch = this.updateSearch.bind(this)
    this.renderRow = this.renderRow.bind(this)
    this.renderAdText = this.renderAdText.bind(this)
    this.renderAvatar = this.renderAvatar.bind(this)
    this.renderTitleAndTags = this.renderTitleAndTags.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.initAdsList = this.initAdsList.bind(this)
    this.fetchAdsList = this.fetchAdsList.bind(this)
    this.checkIfIsInFavorites = this.checkIfIsInFavorites.bind(this)
    this.initFavoritesList = this.initFavoritesList.bind(this)
  }

  componentDidMount() {
    this.fetchAdsList()
  }

  initFavoritesList() {
    AsyncStorage.getItem('Businesses', (err, result) => {
      if (result !== null) {
        this.setState({
          favoritesList: JSON.parse(result),
          isEmpty: !(JSON.parse(result).length > 0)
        })
      }
    })
  }

  async fetchAdsList() {
    this.setState({ isLoading: true })
    const url = `https://easy-q.herokuapp.com/getAllBusinesses`
    const options = { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    const request = new Request(url, options)

    await fetch(request)
      .then(response => response.json())
      .then(async data => {
        const arr = data.slice(0, 6)
        AsyncStorage.setItem('Ads', JSON.stringify(arr))
      })
      .catch()

    await this.initAdsList()
    this.setState({ isLoading: false })
  }

  async initAdsList() {
    await AsyncStorage.getItem('Ads', (err, result) => {
      if (result !== null) {
        this.setState({ adsList: JSON.parse(result) })
      }
    })
  }

  updateSearch(searchQuery) {
    this.setState({ searchQuery })
    if (searchQuery !== '') {
      this.handleSearch(searchQuery)
    }
  }

  async handleSearch(searchQuery) {
    this.setState({ isLoading: true })

    const url = `https://easy-q.herokuapp.com/getBusinessByName/${searchQuery}`
    const options = { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    const request = new Request(url, options)

    await fetch(request)
      .then(response => response.json())
      .then(async data => this.setState({ searchResults: data }))
      .catch()

    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 500)
  }

  keyExtractor = (item, index) => index.toString()

  checkIfIsInFavorites(business) {
    for (let i = 0; i < this.state.favoritesList.length; i++) {
      if (this.state.favoritesList[i].ID === business.ID) {
        return true
      }
    }
    return false
  }

  renderRow({ item }) {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('BusinessPage', {
            businessData: item,
            isInUserFavorites: this.checkIfIsInFavorites(item),
            prevScreen: 'Search'
          })
        }
      >
        <ListItem
          leftAvatar={this.renderAvatar(item)}
          title={this.renderTitleAndTags(item)}
          subtitle={this.renderRating(item)}
          bottomDivider
          chevron
          checkmark={this.state.searchQuery === '' ? this.renderAdText : null}
        />
      </TouchableOpacity>
    )
  }

  renderTitleAndTags(item) {
    return (
      <View>
        <Text style={styles.titleText}>{item.Name}</Text>
        <Text style={styles.subtitleText}>
          {item.Tags[0] + ', ' + item.Tags[1] + ', ' + item.Tags[2]}
        </Text>
      </View>
    )
  }

  renderRating(item) {
    return (
      <View style={styles.ratingContainer}>
        <Rating imageSize={11} readonly startingValue={item.Ranking} />
        <Text style={styles.rankingText}>({item.RankingCount})</Text>
      </View>
    )
  }

  renderAvatar(item) {
    return <Avatar rounded size={60} source={{ uri: item.Pictures.Favorite }} />
  }

  renderAdText() {
    return (
      <View style={styles.adContainer}>
        <Text style={styles.adText}>Ad</Text>
      </View>
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.flexContainer}>
        <NavigationEvents onDidFocus={() => this.initFavoritesList()} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.flexContainer}>
            <View style={styles.header}>
              <View style={styles.searchContainer}>
                <Ionicons
                  name="ios-search"
                  size={24}
                  style={styles.searchIcon}
                  color={colors.gray04}
                />
                <TextInput
                  placeholder="I'm looking for..."
                  placeholderTextColor={colors.red}
                  underlineColorAndroid="transparent"
                  style={styles.textInputBox}
                  onChangeText={text => this.updateSearch(text)}
                  value={this.state.searchQuery}
                />
                {this.state.searchQuery !== '' ? (
                  <Ionicons
                    name="ios-close-circle"
                    onPress={() => this.updateSearch('')}
                    size={20}
                    style={styles.closeIcon}
                    color={colors.gray04}
                  />
                ) : null}
              </View>
            </View>
            {this.state.searchResults.length === 0 &&
            this.state.isLoading === false &&
            this.state.searchQuery !== '' ? (
              <View style={styles.noResultsContainer}>
                <Text style={styles.noResultsText}>No Results Were Found.</Text>
              </View>
            ) : null}
            {this.state.isLoading === true ? (
              <View style={styles.indicatorContainer}>
                <WaveIndicator color={colors.red} count={8} size={80} />
              </View>
            ) : (
              <FlatList
                data={this.state.searchQuery === '' ? this.state.adsList : this.state.searchResults}
                renderItem={this.renderRow}
                keyExtractor={this.keyExtractor}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    )
  }
}
