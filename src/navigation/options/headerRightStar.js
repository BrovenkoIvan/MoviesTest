import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeaderRightStar = ({ route, navigation }) => {
   const [isFav, setIsFav] = useState(false);
   const { params } = route;

   useEffect(() => {
      const willFocusSubscription = navigation.addListener(
         'focus',
         checkMouviForFavorites
      );
      return () => navigation.removeListener(willFocusSubscription);
   }, []);
   async function checkMouviForFavorites() {
      try {
         const favoriteList = await AsyncStorage.getItem('favoriteList');
         const parsedFavoriteList = favoriteList
            ? JSON.parse(favoriteList)
            : [];
         const isAdded = parsedFavoriteList.some(
            (item) => item.id === params.id
         );
         setIsFav(isAdded);
      } catch (e) {
         console.log(e);
      }
   }

   async function setMouviToStorage() {
      try {
         const favoriteList = await AsyncStorage.getItem('favoriteList');
         const parsedFavoriteList = favoriteList
            ? JSON.parse(favoriteList)
            : [];
         parsedFavoriteList.push(params);
         await AsyncStorage.setItem(
            'favoriteList',
            JSON.stringify(parsedFavoriteList)
         );
         setIsFav(true);
      } catch (e) {
         console.log(e);
      }
   }
   async function deleteMouviFromStorage() {
      try {
         const favoriteList = await AsyncStorage.getItem('favoriteList');
         const parsedFavoriteList = favoriteList
            ? JSON.parse(favoriteList)
            : [];
         const newList = parsedFavoriteList.filter(
            (item) => item.id !== params.id
         );
         await AsyncStorage.setItem('favoriteList', JSON.stringify(newList));
         setIsFav(false);
      } catch (e) {
         console.log(e);
      }
   }
   return (
      <TouchableOpacity
         onPress={() =>
            isFav ? deleteMouviFromStorage() : setMouviToStorage()
         }
      >
         <View style={{ marginBottom: 10, marginRight: 10 }}>
            {isFav ? (
               <Icon name="heart" size={30} color="white" />
            ) : (
               <Icon name="heart-outline" size={30} color="white" />
            )}
         </View>
      </TouchableOpacity>
   );
};

export default HeaderRightStar;
