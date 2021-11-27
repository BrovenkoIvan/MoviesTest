import React, { useEffect, useState } from 'react';
import {
   View,
   StyleSheet,
   FlatList,
   StatusBar,
   ActivityIndicator,
   useWindowDimensions,
} from 'react-native';
import RenderItem from './components/RenderItem';
import Search from './components/Search';
import { useSelector, useDispatch } from 'react-redux';
import { getFilms } from '../redux/actions/action_creator';

const TopMovieListScreen = ({ navigation }) => {
   const [term, setTerm] = useState('');

   const { width } = useWindowDimensions();
   const { films, loader, page } = useSelector((state) => state.filmReducer);
   const dispatch = useDispatch();
   const fetchFilms = () => dispatch(getFilms(films, page));

   useEffect(() => {
      !films.length && getList();
   }, []);
   console.log('First page');

   const filterFilms = films.filter((film) => {
      return film.title.toLowerCase().includes(term.toLowerCase());
   });

   const getList = () => {
      term || (page <= 500 && fetchFilms());
   };

   return (
      <View style={styles.container}>
         <StatusBar barStyle={'light-content'} />
         <FlatList
            data={filterFilms}
            keyExtractor={(item) => item.id}
            key={width}
            numColumns={parseInt(width / 130)}
            onEndReached={() => getList()}
            onEndReachedThreshold={0.05}
            contentContainerStyle={styles.flatlistContentContainer}
            ListHeaderComponent={<Search term={term} setTerm={setTerm} />}
            ListFooterComponent={
               loader ? <ActivityIndicator size="small" color="white" /> : null
            }
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
      paddingHorizontal: 5,
      width: '100%',
   },
});
export default TopMovieListScreen;
