import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import RenderRankings from './RenderRankings';

import { Ionicons } from '@expo/vector-icons';

const RenderCategories = () => {
  const dispatch = useDispatch();

  const changeCategory = (textid, text) => {
    dispatch({ type: "CHANGECAT", textid: textid, text: text });
  };  

  const deleteCategory = (textid) => {
    dispatch({ type: "DELETECAT", textid: textid });
  }; 

  const addCategory = (text) => {
    dispatch({ type: "ADDCAT", text: text });
  }; 



  //loading categories from state 
  const categories = useSelector(state => state.tournaments.categories);
  
  
  // creating a view loop for each categories
  const myloop = [];
  for (let i = 0; i < categories.length; i++) {
    myloop.push(

  
      <View key={categories[i].id}>
        
          <View style={{flexDirection:"row-reverse", flex:1}}>
            <Text style={styles.title}>{categories[i].category}</Text>
            
            <TouchableOpacity onPress={() => changeCategory(categories[i].id, "fakedata")} style={{marginTop:30, marginRight:10}}>
              <Ionicons name="hammer" size="20" color="grey" /> 
            </TouchableOpacity>
        
            <TouchableOpacity onPress={() => deleteCategory(categories[i].id)} style={{marginTop:30, marginRight:10}}>
              <Ionicons name="trash" size="20" color="grey" />
            </TouchableOpacity>
          </View>

          <RenderRankings category={categories[i].category} ></RenderRankings>
      </View>
      
    );
  }

  // returning the complete view 
  return(   
    <View>
        {myloop}

      
      <TouchableOpacity onPress={() => addCategory("categoryadded")}>
        <Text style={styles.title}> + Add category </Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f4f4f6",
      padding: 16
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      marginTop: 20
    },
    button: {
      flex: 1,
      backgroundColor: "#f4f4f6",
      padding: 16
    }
  });

  export default RenderCategories;