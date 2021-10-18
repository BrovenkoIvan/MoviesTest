import React from 'react'
import FilmInfoScreen from '../screens/FilmInfoScreen';
import FavoriteFilmsScreen from '../screens/FavoriteFilmsScreen';
import HeaderFilmInfoOptions from './options/HeaderFilmInfoOptions';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const FavoriteStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favorite"
        component={FavoriteFilmsScreen}
        options={{
          headerStyle: {backgroundColor: 'black'},
          headerTitleStyle: {color: '#fff'},
        }}
      />
      <Stack.Screen
        name="FilmInfo"
        component={FilmInfoScreen}
        options={HeaderFilmInfoOptions}
      />
    </Stack.Navigator>
  );
};

export default FavoriteStack