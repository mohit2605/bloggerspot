import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREEN,STACK} from '../const/NavigationConsts';
import Home from '../screens/Home';
import AuthorDetails from '../screens/AuthorDetails';
import {createDrawerNavigator} from '@react-navigation/drawer';
export const AuthContext = React.createContext();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App({navigation}) {
  const authContext = React.useMemo(() => ({}), []);

  function HomeStack() {
    return (
      <Stack.Navigator
        initialRouteName={SCREEN.HOME}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={SCREEN.HOME} component={Home} />
        <Stack.Screen name={SCREEN.DETAILS} component={AuthorDetails} />
      </Stack.Navigator>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name={STACK.HOMESTACK} component={HomeStack} />
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
