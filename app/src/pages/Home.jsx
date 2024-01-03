import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostsList from '../components/Posts/PostsList';
import PostDetail from '../components/Posts/PostDetail';

const Stack = createNativeStackNavigator();

const Home = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen 
                name='list' 
                component={PostsList}
            />
            <Stack.Screen 
                name='detail' 
                component={PostDetail} 
            />
        </Stack.Navigator>
    )
}

export default Home
