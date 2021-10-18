import React, { useEffect, useState } from 'react';
import {
   View,
   StyleSheet,
   FlatList,
   StatusBar,
   ActivityIndicator,
   Dimensions,
   useWindowDimensions,
} from 'react-native';
import RenderItem from './components/RenderItem';
import Search from './components/Search';
import { useSelector, useDispatch } from 'react-redux';
import { getFilms } from '../redux/actions/action_creator';

const TopMovieListScreen = ({ navigation }) => {
   const [term, setTerm] = useState('');
   const [landspace, setIsLandspace] = useState(!isPortrait());
   function isPortrait() {
      const screen = Dimensions.get('screen');
      return screen.height >= screen.width;
   }
   Dimensions.addEventListener('change', () => {
      isPortrait() ? setIsLandspace(false) : setIsLandspace(true);
   });

   const { films, loader, page } = useSelector((state) => state.filmReducer);
   const dispatch = useDispatch();
   const fetchFilms = () => dispatch(getFilms(films, page));

   useEffect(() => {
      !films.length && getList();
   }, []);
   console.log(page);
   const filterFilms = films.filter((film) => {
      return film.title.toLowerCase().includes(term.toLowerCase());
   });

   const getList = () => {
      page <= 500 ? fetchFilms() : null;
   };
   return (
      <View style={styles.container}>
         <StatusBar barStyle={'light-content'} />
         <FlatList
            data={filterFilms}
            keyExtractor={(item) => item.id}
            key={landspace}
            numColumns={landspace ? 6 : 3}
            onEndReached={term ? null : () => getList()}
            onEndReachedThreshold={0.05}
            style={{ width: '99%' }}
            ListHeaderComponent={() => <Search term={term} setTerm={setTerm} />}
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
      alignItems: 'center',
   },
});
export default TopMovieListScreen;
