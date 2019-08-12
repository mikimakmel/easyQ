import React, { Component } from 'react'
import { Text, View } from 'react-native'
import colors from '../styles/colors'
import styles from '../styles/SplashScreenStyles'
import { DotIndicator } from 'react-native-indicators'

export default class App extends Component {
  render() {
    return (
      <View style={styles.splashContainer}>
        <Text style={styles.textContainer}>
          <Text style={styles.easyText}>easy</Text>
          <Text style={styles.QText}>Q</Text>
        </Text>
        <View style={styles.loaderContainer}>
          <DotIndicator color={colors.red} count={3} size={8} />
        </View>
      </View>
    )
  }
}
