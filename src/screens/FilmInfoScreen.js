import React, { useEffect, useState, useRef } from 'react';
import {
   ScrollView,
   Text,
   View,
   Image,
   StyleSheet,
   Animated,
} from 'react-native';
import YouTube from 'react-native-youtube';
import { img, filmInfoUrl, videosUrl } from '../assets';
const spot = <Text style={{ fontSize: 22 }}> • </Text>;

const makeRequest = (url) => {
   return fetch(url).then((response) =>
      response
         .json()
         .then((result) => result)
         .catch((e) => console.log(e))
   );
};

const FilmInfoScreen = ({ route }) => {
   const [video, setVideo] = useState(null);
   const [filmInfo, setFilmInfo] = useState(null);
   const { params } = route;
   console.log(params);
   const genre = filmInfo?.genres.map((item) => item.name).join(', ');
   const time = filmInfo?.runtime;
   const released = new Date(params.release_date).getFullYear();
   const opacity = useRef(new Animated.Value(0)).current;

   useEffect(() => {
      getTrailer();
      getInfoAboutFilm();
   }, []);
   const getTrailer = async () => {
      makeRequest(videosUrl(params.id)).then((result) =>
         setVideo(result.results.find((item) => item.type === 'Trailer'))
      );
   };
   const getInfoAboutFilm = async () => {
      makeRequest(filmInfoUrl(params.id)).then((result) => setFilmInfo(result));
   };

   const onLoadImage = () => {
      Animated.timing(opacity, {
         toValue: 1,
         duration: 500,
         useNativeDriver: true,
      }).start();
   };
   return (
      <ScrollView style={{ backgroundColor: 'black' }}>
         <Animated.Image
            source={{ uri: img + params.poster_path }}
            style={[
               styles.poster,
               {
                  opacity: opacity,
                  transform: [
                     {
                        scale: opacity.interpolate({
                           inputRange: [0, 1],
                           outputRange: [0.1, 1],
                        }),
                     },
                  ],
               },
            ]}
            onLoad={onLoadImage}
         />
         <View style={styles.blockWrap}>
            <Text style={styles.filmTitle}>{params.title}</Text>
            <Text style={styles.subTitle}>
               {released} {spot} {time} min {spot} TMDB {params.vote_average}
            </Text>
         </View>
         <View style={styles.blockWrap}>
            <Text style={styles.blockTitle}>Genre</Text>
            <Text style={styles.blockSubtitle}>{genre}</Text>
         </View>
         <View style={styles.blockWrap}>
            <Text style={styles.blockTitle}>Overview</Text>
            <Text style={styles.blockSubtitle}>{params.overview}</Text>
         </View>
         <View>
            {video ? (
               <YouTube videoId={video.key} style={styles.video} />
            ) : null}
         </View>
      </ScrollView>
   );
};
const styles = StyleSheet.create({
   poster: {
      width: '100%',
      height: 550,
      backgroundColor: 'black',
   },
   blockWrap: {
      marginHorizontal: 15,
      marginTop: 35,
   },
   filmTitle: {
      color: 'white',
      fontSize: 25,
      fontWeight: 'bold',
   },
   subTitle: {
      color: 'grey',
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 5,
   },
   blockTitle: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
   },
   blockSubtitle: { color: 'grey', fontWeight: 'bold' },
   video: { alignSelf: 'stretch', height: 300, marginTop: 15 },
});
export default FilmInfoScreen;
