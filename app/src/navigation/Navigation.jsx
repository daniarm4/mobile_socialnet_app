import { NavigationContainer } from '@react-navigation/native';
import { useCheckAuthQuery } from '../store/api/userAPI';
import { useSelector } from 'react-redux';
import AuthNavigator from './AuthNavigator';
import UnauthNavigator from './UnauthNavigator';
import { View, Text } from 'react-native';


const Navigation = () => {
    const { isLoading } = useCheckAuthQuery();
    const isAuth = useSelector(state => state.auth.isAuth);
    
    if (isLoading) {
        return (
            <View>
                <Text>
                    Loading...
                </Text>
            </View>
        )
    }

    return (
        <NavigationContainer>
            {isAuth
                ?
                <AuthNavigator />
                :
                <UnauthNavigator />
            }
        </NavigationContainer>)
}

export default Navigation;
