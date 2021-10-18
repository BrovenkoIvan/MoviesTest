import React from "react";
import Icon from 'react-native-vector-icons/Ionicons';

const TabBarOptions = ({route}) => ({
    tabBarIcon: ({focused, color}) => {
      let iconName;
      if (route.name === 'Top') {
        iconName = focused ? 'list' : 'list-outline';
      } else if (route.name === 'Favorites') {
        iconName = focused ? 'heart' : 'heart-outline';
      }
      return <Icon name={iconName} size={35} color={color} />;
    },
    tabBarActiveTintColor: 'white',
    tabBarInactiveTintColor: 'gray',
    tabBarStyle: {backgroundColor: 'black'},
    tabBarLabel: () => null,
    headerShown: false,
  })

  export default TabBarOptions