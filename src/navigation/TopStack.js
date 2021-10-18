import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TopMovieListScreen from '../screens/TopMoviesScreen';
import FilmInfoScreen from '../screens/FilmInfoScreen';
import HeaderFilmInfoOptions from './options/HeaderFilmInfoOptions';

const Stack = createNativeStackNavigator();
const TopStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TopMovies"
        component={TopMovieListScreen}
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

export default TopStack;
