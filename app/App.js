import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/pages/Home';
import Profile from './src/pages/Profile';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartPage from './src/pages/StartPage';
import store from './src/store/store';
import { Provider } from 'react-redux';
import HeaderLeft from './src/components/Header/HeaderLeft';
import Search from './src/pages/Search';
import Icon from 'react-native-vector-icons/FontAwesome';
import PostDetail from './src/components/Posts/PostDetail';

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
					:
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
				}
			</NavigationContainer>
		</Provider>
	);
}
