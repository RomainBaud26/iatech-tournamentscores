import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';


export const LIST_ITEM_HEIGHT = 54;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#f4f4f6",
    height: LIST_ITEM_HEIGHT
  },
  name: {
    fontSize: 16
  },
  pointsContainer: {
    borderRadius: 8,
    backgroundColor: "#44c282",
    padding: 8
  },
  points: {
    color: "white",
    fontWeight: "bold"
  }
});

export interface ListItem {
  name: string;
  points: string;
}

interface ListItemProps {
  item: ListItem;
  isLast: boolean;
}

export default ({ item, isLast }: ListItemProps) => {
  const bottomRadius = isLast ? 8 : 0;
  const dispatch = useDispatch();
  const changeItem = (textid, text, points) => {
    
    dispatch({ type: "CHANGEITEM", textid: textid, text: text, points: points });
  };

  const deleteItem = (textid) => {
    
    dispatch({ type: "DELETEITEM", textid: textid });
  }; 

  return (
    <View
      style={[
        styles.container,
        {
          borderBottomLeftRadius: bottomRadius,
          borderBottomRightRadius: bottomRadius
        }
      ]}
    >
      
      <View style={{flexDirection:"row", flex:1}}>
        <Text style={styles.name}>{item.name}</Text>

            <TouchableOpacity onPress={() => changeItem(item.id, "Romain", "0")} style={{marginLeft:10}}>
              <Ionicons name="hammer" size="15" color="grey" /> 
            </TouchableOpacity>
        
            <TouchableOpacity onPress={() => deleteItem(item.id)} style={{marginLeft:10}}>
              <Ionicons name="trash" size="15" color="grey" />
            </TouchableOpacity>
          </View>
      <View style={styles.pointsContainer}>
        <Text style={styles.points}>{item.points}</Text>
        
      </View>
    </View>
  );
};
