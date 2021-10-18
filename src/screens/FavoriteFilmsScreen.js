import React, {useState, useEffect} from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import RenderItem from './components/RenderItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoriteFilmsScreen = ({navigation}) => {
  const [favoriteFilmList, setFavoriteFilmList] = useState([]);
  useEffect(() => {
    getListOfFavoriteFilm();
    const willFocusSudscription = navigation.addListener(
      'focus',
      getListOfFavoriteFilm,
    );
    return () => navigation.removeListener(willFocusSudscription);
  }, []);
  async function getListOfFavoriteFilm() {
    try {
      const favoriteList = await AsyncStorage.getItem('favoriteList');
      const parsedFavoriteList = favoriteList ? JSON.parse(favoriteList) : [];
      setFavoriteFilmList(parsedFavoriteList);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteFilmList}
        keyExtractor={item => item.id}
        horizontal={false}
        numColumns={3}
        renderItem={({item}) => RenderItem(item, navigation, (isFav = true))}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    alignContent: 'center',
  },
});
export default FavoriteFilmsScreen;
