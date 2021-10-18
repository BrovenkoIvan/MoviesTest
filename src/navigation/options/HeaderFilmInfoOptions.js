import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderRightStar from './HeaderRightStar';

const HeaderFilmInfoOptions = ({ route, navigation }) => {
   return {
      headerTitle: () => {
         return (
            <View style={{ width: 220 }}>
               <Text
                  style={{
                     color: '#fff',
                     fontWeight: 'bold',
                     fontSize: 16,
                  }}
               >
                  {route.params.title}
               </Text>
            </View>
         );
      },
      headerRight: () => (
         <HeaderRightStar route={route} navigation={navigation} />
      ),
      headerLeft: () => (
         <TouchableOpacity onPress={() => navigation.goBack()}>
            <View>
               <Icon name="chevron-back" size={30} color="white" />
            </View>
         </TouchableOpacity>
      ),
      headerStyle: { backgroundColor: 'black' },
      headerTitleStyle: { color: '#fff' },
   };
};
export default HeaderFilmInfoOptions;
