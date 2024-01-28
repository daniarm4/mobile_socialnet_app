import React from 'react'
import Register from '../pages/Register'
import Login from '../pages/Login'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartPage from '../pages/StartPage';

const Stack = createNativeStackNavigator();

const UnauthNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName='StartPage'
            screenOptions={{
                headerShadowVisible: false
            }}
        >
            <Stack.Screen name='Register' component={Register} options={{ title: '' }} />
            <Stack.Screen name='Login' component={Login} options={{ title: '' }} />
            <Stack.Screen name='StartPage' component={StartPage} options={{ title: '' }} />
        </Stack.Navigator>
    )
}

export default UnauthNavigator