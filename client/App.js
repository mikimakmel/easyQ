import React, { Component } from 'react'
import AppNavigtor from './app/navigation/Navigator'
import SplashScreen from './app/screens/SplashScreen'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = { isLoading: true }
  }

  async componentDidMount() {
    const data = await this.performTimeConsumingTask()

    if (data !== null) {
      this.setState({ isLoading: false })
    }
  }

  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result')
      }, 2000)
    )
  }

  render() {
    if (this.state.isLoading === true) {
      return <SplashScreen />
    }
    return <AppNavigtor />
  }
}
