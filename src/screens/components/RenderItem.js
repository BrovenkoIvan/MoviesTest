import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';

const img = 'https://image.tmdb.org/t/p/original/';
const RenderItem = ({ item, navigation }) => {
   return (
      <TouchableOpacity
         onPress={() => navigation.navigate('FilmInfo',item)}
      >
         <View style={styles.film}>
            <Image
               source={{ uri: img + item.poster_path }}
               style={styles.imageStyle}
            />
            <Text style={styles.filmTitle}>{item.title}</Text>
         </View>
      </TouchableOpacity>
   );
};
const styles = StyleSheet.create({
   film: {
      width: 120,
      margin: 3,
   },
   imageStyle: {
      width: '100%',
      height: 200,
      borderRadius: 10,
   },
   filmTitle: {
      color: 'white',
      textAlign: 'center',
      fontSize: 16,
      margin: 5,
   },
});
export default RenderItem;
