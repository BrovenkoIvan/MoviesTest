import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabBarOptions from './options/TabBarOptions';
import TopStack from './TopStack';
import FavoriteStack from './FavoriteStack';
const Tab = createBottomTabNavigator();

const RootComponent = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={TabBarOptions}>
        <Tab.Screen name="Top" component={TopStack} />
        <Tab.Screen name="Favorites" component={FavoriteStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootComponent;
