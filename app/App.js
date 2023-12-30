import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/pages/Home';
import Settings from './src/pages/Settings';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartPage from './src/pages/StartPage';
import store from './src/store/store';
import { Provider } from 'react-redux';
import HeaderLeft from './src/components/Header/HeaderLeft';
import HeaderRight from './src/components/Header/HeaderRight';
import Search from './src/pages/Search';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


export default function App() {
  const isSigned = true;

  return (
    <Provider store={store}>
      <NavigationContainer>
        {isSigned ? 
          <Tab.Navigator 
            initialRouteName='Home'
            screenOptions={{
              headerShadowVisible: false,
              headerLeft: () => <HeaderLeft />,
              headerRight: () => <HeaderRight />
            }}
          >
                <Tab.Screen 
                  name='Home' 
                  component={Home} 
                  options={{ 
                    title: 'Home',
                    headerTitle: '',
                    tabBarIcon: ({focused, size}) => (
                      <Icon name='home' size={focused ? size : 20} />
                    )
                  }} 
                />
                <Tab.Screen 
                  name='Search' 
                  component={Search} 
                  options={{
                    title: 'Search',
                    headerTitle: '',
                    tabBarIcon: ({focused, size}) => (
                      <Icon name='search' size={focused ? size : 20} />
                    )
                  }}
                />
                <Tab.Screen 
                  name='Settings' 
                  component={Settings} 
                  options={{ 
                    title: 'Settings',
                    headerTitle: '',
                    tabBarIcon: ({focused, size}) => (
                      <Icon name='gear' size={focused ? size : 20} />
                    )
                  }} 
                  
                />  
          </Tab.Navigator>
        :
          <Stack.Navigator 
            initialRouteName='StartPage' 
            screenOptions={{
              headerShadowVisible: false
            }}
          >
              <Stack.Screen name='Register' component={Register} options={{title: ''}} />
              <Stack.Screen name='Login' component={Login} options={{ title: ''}} />
              <Stack.Screen name='StartPage' component={StartPage} options={{ title: ''}} />
          </Stack.Navigator>
        }
      </NavigationContainer>
    </Provider>
  );
}
