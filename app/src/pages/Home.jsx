import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Post from '../components/Posts/Post'

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <Post />      
      <Post /> 
      <Post />  
      <Post />  
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingTop: 10
  }
})