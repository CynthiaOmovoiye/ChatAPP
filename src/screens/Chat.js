import { StyleSheet, Text, View } from 'react-native'
import React,{useState, useCallback, useEffect } from 'react'
import { auth } from '../../firebase'
//import { AntDesign } from '@expo/vector-icons';
import { GiftedChat } from 'react-native-gifted-chat'

const Chat = ({ navigation }) => {
    const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])
    {/*
useLayoutEffect(() => {
        navigation.setOption({
            headerRight:()=>{
                <AntDesign name="logout" size={24} color="black" />
            }
        })
    },[])
    const signOut = () =>{
        auth.signOut().then(() => {
            // Sign-out successful.
            navigation.navigate('Login')
          }).catch((error) => {
            // An error happened.
          });
    }
    */}

    return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
    )
}

export default Chat

const styles = StyleSheet.create({})