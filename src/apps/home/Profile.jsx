import { View, Text } from 'react-native'
import React from 'react'

const Profile = () => {
  return (
    <View style={style.container}>
      <Text>Profile</Text>
    </View>
  )
}

export default Profile;

const style = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#030B38',
  },
}