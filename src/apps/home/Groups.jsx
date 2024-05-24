import { View, Text } from 'react-native'
import React from 'react'

const Groups = () => {
  return (
    <View style={style.container}>
      <Text>Groups</Text>
    </View>
  )
}

export default Groups;

const style = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#030B38',
  },
}