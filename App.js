import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function App() {
  const clickHandler = () => {

  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity onPress={clickHandler}>
        <Text>clickToCheckEvent</Text>
      </TouchableOpacity>
    </View>
  )
}