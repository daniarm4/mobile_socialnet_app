import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HeaderLeft = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Social</Text>
    </View>
  )
}

export default HeaderLeft

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginLeft: 15
  },
  title: {
    fontWeight: 'bold',
    fontSize: 26
  }
})