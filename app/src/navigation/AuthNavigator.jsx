import React from 'react'
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import HeaderLeft from '../components/Header/HeaderLeft';
import Search from '../pages/Search';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const AuthNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShadowVisible: false,
                headerLeft: () => <HeaderLeft />
            }}
        >
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    title: 'Home',
                    headerTitle: '',
                    tabBarIcon: ({ focused, size }) => {
                        const opacity = focused ? 1 : 0.7;
                        return <Icon name='home' size={size} style={{ opacity: opacity }} />
                    }
                }}
            />
            <Tab.Screen
                name='Search'
                component={Search}
                options={{
                    title: 'Search',
                    headerTitle: '',
                    tabBarIcon: ({ focused, size }) => {
                        const opacity = focused ? 1 : 0.7;
                        return <Icon name='search' size={size} style={{ opacity: opacity }} />
                    }
                }}
            />
            <Tab.Screen
                name='Profile'
                component={Profile}
                options={{
                    title: 'Profile',
                    headerTitle: '',
                    tabBarIcon: ({ focused, size }) => {
                        const opacity = focused ? 1 : 0.7;
                        return <Icon name='user' size={size} style={{ opacity: opacity }} />
                    }
                }}
            />
        </Tab.Navigator>
    )
}

export default AuthNavigator