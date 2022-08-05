import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { auth, db } from '../../firebase'
import { Button, Avatar } from 'react-native-elements'
// import { AntDesign } from '@expo/vector-icons';
import { GiftedChat } from 'react-native-gifted-chat'

const Chat = ({ navigation }) => {
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    const unsubscribe = db.collection("chats").orderBy("createdAt", "desc").onSnapshot(snapshot =>
      setMessages(snapshot.docs.map(doc => ({
        _id: doc.data()._id,
        text: doc.data().text,
        createdAt: doc.data().createdAt.toDate(),
        user: doc.data().user
      })))
    )
    return unsubscribe;
  }, [])


  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    const {
      _id,
      text,
      createdAt,
      user,
    } = messages[0];
    db.collection('chats').add({
      _id,
      text,
      createdAt,
      user
    })
  }, [])

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: auth?.currentUser?.displayName,
      headerLeft: () => (
        <View>
          <Avatar
            rounded
            source={{
              uri: auth?.currentUser?.photoURL,
            }}
          />
        </View>

      ),
      headerRight: () => (
        <TouchableOpacity>
          <Button
            title="Logout"
            onPress={signOut}></Button>
        </TouchableOpacity>
      )
    });
  }, []);

  const signOut = () => {
    auth.signOut().then(() => {
      // Sign-out successful.
      navigation.replace('Login')
    }).catch((error) => {
      // An error happened.
    });
  }


  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={messages => onSend(messages)}
      textInputStyle={{ color: "#000" }}
      user={{
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
        avatar: auth?.currentUser?.photoURL,
      }}
    />
  )
}

export default Chat

const styles = StyleSheet.create({})