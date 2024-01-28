import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostsList from '../components/Posts/PostsList';
import PostDetail from '../components/Posts/PostDetail';
import AddPostForm from '../components/Posts/AddPostForm';

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
            <Stack.Screen 
                name='add'
                component={AddPostForm}
            />
        </Stack.Navigator>
    )
}

export default Home
