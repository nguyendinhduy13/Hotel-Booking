import React from 'react'
import "react-native-gesture-handler"
import { View } from "react-native"
import { StatusBar } from 'react-native'
import COLORS from './src/consts/colors'
import RootNavigation from './src/view/navigation/RootNavigation'
import { SignInContextProvider } from './src/contexts/authContext'
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
console.disableYellowBox = true;
export default function App() {
  return (
    <SignInContextProvider>
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
        <RootNavigation />
      </View>
    </SignInContextProvider>
  )
}