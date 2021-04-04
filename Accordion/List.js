import React, { useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity, View  } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { bInterpolate, bin, useTransition } from "react-native-redash";
import Item, { LIST_ITEM_HEIGHT, ListItem } from "./ListItem";
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';


const { not, interpolate } = Animated;

const List = props => {
  
  const dispatch = useDispatch();
  
  const changeRanking = (textid, text) => {   
    dispatch({ type: "CHANGERANK", textid: textid, text: text});
  };
  
  const deleteRanking = (textid) => {
    dispatch({ type: "DELETERANK", textid: textid});
  }; 

  const addItem= (text, ranking, cat, points) => {
    dispatch({ type: "ADDITEM", text: text, ranking: ranking, cat: cat, points: points });
  }; 

  
  //load Leafs 
  const liste = useSelector(state => state.tournaments.Leafs);

  // filter Leafs to associate each Leaf with its correct category and ranking
  const list = liste.filter(Data => Data.category === props.cat && Data.rankings === props.ranking);
  
  const [open, setOpen] = useState(false);
  const transition = useTransition(
    open,
    not(bin(open)),
    bin(open),
    400,
    Easing.inOut(Easing.ease)
  );
  const height = bInterpolate(
    transition,
    0,
    LIST_ITEM_HEIGHT * ( list.length + 1 ) // +1 so we can see the add entry
  );
  const bottomRadius = interpolate(transition, {
    inputRange: [0, 16 / 400],
    outputRange: [8, 0]
  });
  
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setOpen(prev => !prev)}>
        <Animated.View
          style={[
            styles.container,
            {
              borderBottomLeftRadius: bottomRadius,
              borderBottomRightRadius: bottomRadius
            }
          ]}
        >
          <View style={{flexDirection:"row", flex:1}}>
          <Text style={styles.title}>{props.ranking}</Text>
            
            <TouchableOpacity onPress={() => changeRanking(props.idrank, "fakedata")} style={{marginLeft:10}}>
              <Ionicons name="hammer" size="15" color="grey" /> 
            </TouchableOpacity>
        
            <TouchableOpacity onPress={() => deleteRanking(props.idrank)} style={{marginLeft:10}}>
              <Ionicons name="trash" size="15" color="grey" />
            </TouchableOpacity>
          </View>

          
          
        </Animated.View>
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.items, { height }]}>
        {list.map((item, key) => (
          
          <Item {...{ item, key }} isLast={key === list.length - 1} />
         
        ))}

        <TouchableOpacity onPress={() => addItem("Jessica", props.ranking, props.cat, "10 M")} style={{flexDirection:"row", backgroundColor:"white", paddingBottom:7, borderRadius:10}}>
        <Text style={{fontSize:16, padding:10, paddingTop:15, color:"grey"}}> + Add entry </Text>
        </TouchableOpacity>
      </Animated.View>
      
    </>


  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 16,
    fontWeight: "bold"
  },
  items: {
    overflow: "hidden"
  }
});

export default List; 