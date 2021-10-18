import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  StatusBar,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import RenderItem from './components/RenderItem';
import Search from './components/Search';
import {useSelector, useDispatch} from 'react-redux';
import {getFilms} from '../redux/actions/action_creator';

const TopMovieListScreen = ({navigation}) => {
  const [filteredListOfFilms, setFilteredListOfFilms] = useState([]);
  const [term, setTerm] = useState('');
  const [landspace, setIsLandspace] = useState(!isPortrait());
  
  function isPortrait() {
    const screen = Dimensions.get('screen');
    return screen.height >= screen.width;
  }
  Dimensions.addEventListener('change', () => {
    isPortrait() ? setIsLandspace(false) : setIsLandspace(true);
  });

  const {films, loader, page} = useSelector(state => state.filmReducer);
  const dispatch = useDispatch();
  const fetchFilms = () => dispatch(getFilms(films, page));

  useEffect(() => {
    films.length ? null : getList();
  }, []);

  useEffect(() => {
    setFilteredListOfFilms(
      films.filter(film => {
        return film.title.toLowerCase().includes(term.toLowerCase());
      }),
    );
  }, [term, films]);

  const getList = () => {
    page <= 500 ? fetchFilms() : null;
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <FlatList
        data={filteredListOfFilms}
        keyExtractor={item => item.id}
        key={landspace}
        numColumns={landspace ? 6 : 3}
        horizontal={false}
        onEndReached={term ? null : () => getList()}
        onEndReachedThreshold={0.05}
        style={{width: '99%'}}
        ListHeaderComponent={() => Search(term, setTerm)}
        ListFooterComponent={
          loader ? <ActivityIndicator size="small" color="white" /> : null
        }
        renderItem={({item}) => RenderItem(item, navigation)}
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
