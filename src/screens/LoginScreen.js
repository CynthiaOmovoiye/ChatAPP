import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Button, Input} from 'react-native-elements';
import {auth} from '../../firebase';
//import AsyncStorage from '@react-native-community/async-storage';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signIn = () => {
    auth.signInWithEmailAndPassword(email, password).catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(function (user) {
      if (user) {
        navigation.navigate('Chat');
      } else {
        // User is signed out
        // ...
      }
    });
    return unsubscribe;
  });
  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter your email"
        label="Email"
        leftIcon={{type: 'material', name: 'email'}}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Input
        placeholder="Enter your password"
        label="Password"
        leftIcon={{type: 'material', name: 'lock'}}
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <Button title="signIn" style={styles.button} onPress={signIn}></Button>

      <Button
        title="register"
        style={styles.button}
        onPress={() => navigation.navigate('Register')}></Button>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
