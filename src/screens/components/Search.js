import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const Search = ({ term, setTerm }) => {
   return (
      <View style={styles.inputBackgroundStyle}>
         <TextInput
            style={styles.inputStyle}
            value={term}
            onChangeText={setTerm}
            placeholder="Search"
            placeholderTextColor="silver"
         />
      </View>
   );
};
const styles = StyleSheet.create({
   inputBackgroundStyle: {
      backgroundColor: 'rgb(35,35,35)',
      height: 35,
      borderRadius: 17,
      marginVertical: 5,
      marginHorizontal: 10,
      flexDirection: 'row',
      color: 'white',
      alignSelf: 'center',
   },
   inputStyle: {
      flex: 1,
      fontSize: 15,
      paddingLeft: 10,
      color: 'silver',
   },
});
export default Search;
