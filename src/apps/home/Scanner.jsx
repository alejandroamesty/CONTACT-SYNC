import { View, Text } from 'react-native'
import React from 'react'

const Scanner = () => {
  return (
    <View style={style.container}>
      <Text>Scanner</Text>
    </View>
  )
}

export default Scanner

const style = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#030B38',
  },
}