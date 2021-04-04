import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import List, { List as ListModel } from "./List";
import { useSelector, useDispatch } from 'react-redux';

const RenderRankings = props => {
    const dispatch = useDispatch();
    
    
    const addRanking = (text, cat) => {
      dispatch({ type: "ADDRANK", text: text, cat: cat });
    }; 
      

    const dataEmail = useSelector(state => state.tournaments.Leafs);
    

    //loading categories from state 
    const ranking = useSelector(state => state.tournaments.rankings);
    
    //filtering to category adressed passed in props 
    const rankings = ranking.filter(Rankings => Rankings.category === props.category);
    
    // creating a view loop for each categories
    const mylooprankings = [];
    for (let i = 0; i < rankings.length; i++) {
      const list: ListModel = {
        name: rankings[i].rankings,
        items: dataEmail.filter(Data => Data.rankings === rankings[i].rankings)
      };
      
      mylooprankings.push(
        <View key={rankings[i].id}>  
          
          <List ranking={rankings[i].rankings} cat={props.category} idrank={rankings[i].id} list={list}/>
        </View>
      );
    }

    return(
      <View>
        {mylooprankings}
         
        <TouchableOpacity onPress={() => addRanking("Rankingfake", props.category)} style={{flexDirection:"row", backgroundColor:"white", marginTop:15, paddingBottom:7, borderRadius:10}}>
        <Text style={{fontSize:16, fontWeight:"bold", padding:10, paddingTop:15, color:"grey"}}> + Add ranking </Text>
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
      
export default RenderRankings;