import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREEN, STACK} from '../const/NavigationConsts';
import Home from '../screens/Home';
import AuthorDetails from '../screens/AuthorDetails';
import PostDetails from '../screens/PostDetails';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TopLikes from '../screens/LikeStack/TopLikes';
import TopComments from '../screens/CommentStack/TopComments';
export const AuthContext = React.createContext();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App({navigation}) {
  function HomeStack() {
    return (
      <Stack.Navigator
        initialRouteName={SCREEN.HOME}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={SCREEN.HOME} component={Home} />
        <Stack.Screen name={SCREEN.DETAILS} component={AuthorDetails} />
        <Stack.Screen name={SCREEN.POST_DETAILS} component={PostDetails} />
      </Stack.Navigator>
    );
  }

  function LikeStack() {
    return (
      <Stack.Navigator
        initialRouteName={SCREEN.TOP_LIKES}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={SCREEN.TOP_LIKES} component={TopLikes} />
      </Stack.Navigator>
    );
  }

  function CommentStack() {
    return (
      <Stack.Navigator
        initialRouteName={SCREEN.TOP_COMMENTS}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={SCREEN.TOP_COMMENTS} component={TopComments} />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator backBehavior={'none'}>
        <Drawer.Screen name={STACK.HOMESTACK} component={HomeStack} />
        <Drawer.Screen name={STACK.LIKED} component={LikeStack} />
        <Drawer.Screen name={STACK.COMMENTED} component={CommentStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
