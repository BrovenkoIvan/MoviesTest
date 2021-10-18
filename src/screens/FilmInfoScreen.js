import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View, Image, StyleSheet} from 'react-native';
import YouTube from 'react-native-youtube';

const img = 'https://image.tmdb.org/t/p/original/';
const spot = <Text style={{fontSize: 22}}> • </Text>;

const FilmInfoScreen = ({route}) => {
  const [video, setVideo] = useState(null);
  const [filmInfo, setFilmInfo] = useState(null);
  const {params} = route;
  
  let genre, time;
  if (filmInfo) {
    genre = filmInfo.genres.map(item => item.name).join(', ');
    time = filmInfo.runtime;
  }
  const released = new Date(params.release_date).getFullYear();
  
  useEffect(() => {
    getTrailer();
    getInfoAboutFilm();
  }, []);

  const getTrailer = async () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=0bb3209701f49c7b6738282c26794276&language=en-US`,
    ).then(response => {
      response
        .json()
        .then(result =>
          setVideo(result.results.find(item => item.type === 'Trailer')),
        );
    });
  };
  const getInfoAboutFilm = async () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${params.id}?api_key=0bb3209701f49c7b6738282c26794276&language=en-US`,
    ).then(response => {
      response.json().then(result => setFilmInfo(result));
    });
  };
  return (
    <ScrollView style={{backgroundColor: 'black'}}>
      <Image source={{uri: img + params.poster_path}} style={styles.poster} />
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
        {video ? <YouTube videoId={video.key} style={styles.video} /> : null}
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
  blockSubtitle: {color: 'grey', fontWeight: 'bold'},
  video: {alignSelf: 'stretch', height: 300, marginTop: 15},
});
export default FilmInfoScreen;
