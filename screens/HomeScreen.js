import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeArea } from '../components/utils/Safe-area.component'

export default function HomeScreen() {
  return (
    <SafeArea>
      {/* <Image source={require("./assets/splash_screen.png")} /> */}
      <Text>HomeScreen</Text>
      <StatusBar style="auto" />
    </SafeArea>
  )
}