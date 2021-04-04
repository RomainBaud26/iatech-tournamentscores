import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Button, TextInput } from "react-native";
import { useSelector } from 'react-redux';
import RenderCategories from './RenderCategories';
//import EmailSender from 'react-native-smtp';

//EmailSender.config({
//  host: 'mail.8-second.com',
//  port: '465', 
//  username: 'contact@8-second.com',
 // password: 'xxxxxx',
//  isAuth: 'true',
 // tls: 'false' 
//});


const Accordion = props => {

  const dataEmail = useSelector(state => state.tournaments.Leafs)


  const onPressSendMail = (emailAsker, emailData) =>{
    //EmailSender.send(
    //{
    //   from: 'contact@8-second.com',
    //   to: {emailAsker},
    //   subject: 'The subject',
    //   body: {emailData},
    //   
    //  }
    //);
    console.log(emailAsker, emailData); 
  }


  const [text, setinputEmailData] = useState('');
  return (
    <View style={styles.container}>
        
        <ScrollView>
            <RenderCategories></RenderCategories>
        </ScrollView>
        
        <TextInput
            style={{height: 40, textAlign:'center', marginTop:15}}
            placeholder="Type your email"
            onChangeText={text => setinputEmailData(text)}
            defaultValue={text}
          />
        <Button
          style={styles.button}
          onPress={() => onPressSendMail(text, dataEmail)}
          title="Receive the data"
          color="#841584"
          accessibilityLabel="Receive the data by email"
        />
    
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

export default Accordion;