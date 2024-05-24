import { View, Text } from 'react-native'
import React from 'react'

const Home = () => {
  return (
    <View style={style.container}>
      <Text>Home</Text>
    </View>
  )
}

export default Home

const style = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#030B38',
  },
}