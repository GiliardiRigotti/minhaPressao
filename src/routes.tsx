import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppProvider } from './context';
import { Login } from './screens/Login';
import { Home } from './screens/Home';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <AppProvider>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}>
                    {/* <Stack.Screen name="Login" component={Login} /> */}
                    <Stack.Screen name="Home" component={Home} />
                </Stack.Navigator>
            </AppProvider>
        </NavigationContainer>
    )
}