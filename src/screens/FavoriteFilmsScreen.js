import React, { useState, useEffect } from 'react';
import {
   Text,
   View,
   FlatList,
   StyleSheet,
   useWindowDimensions,
} from 'react-native';
import RenderItem from './components/RenderItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoriteFilmsScreen = ({ navigation }) => {
   const [favoriteFilmList, setFavoriteFilmList] = useState([]);
   const { width } = useWindowDimensions();
   useEffect(() => {
      const willFocusSudscription = navigation.addListener(
         'focus',
         getListOfFavoriteFilm
      );
      return () => navigation.removeListener(willFocusSudscription);
   }, []);

   async function getListOfFavoriteFilm() {
      try {
         const favoriteList = await AsyncStorage.getItem('favoriteList');
         const parsedFavoriteList = favoriteList
            ? JSON.parse(favoriteList)
            : [];
         setFavoriteFilmList(parsedFavoriteList);
      } catch (e) {
         console.log(e);
      }
   }
   console.log(parseInt(width / 130));
   console.log('favorite film');
   return (
      <View style={styles.container}>
         <FlatList
            data={favoriteFilmList}
            keyExtractor={(item) => item.id}
            key={width}
            numColumns={parseInt(width / 130)}
            contentContainerStyle={styles.flatlistContentContainer}
            renderItem={({ item }) => (
               <RenderItem item={item} navigation={navigation} />
            )}
         />
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'black',
   },
   flatlistContentContainer: {
      marginHorizontal: 5,
      width: '100%',
   },
});
export default FavoriteFilmsScreen;
