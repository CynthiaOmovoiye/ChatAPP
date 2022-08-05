import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Input } from 'react-native-elements'
import { auth } from '../../firebase';

const Register = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [imageURL, setimageURL] = useState('');
    const [password, setPassword] = useState('');

    const register = () => {

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                user.updateProfile({
                    displayName: name,
                    photoURL: imageURL ? imageURL : "https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-vector-avatar-icon-png-image_695765.jpg"
                }).then(() => {

                }).catch((error) => {
                    // An error occurred
                    // ...
                });
                navigation.popToTop()
            })
            .catch((error) => {
                var errorMessage = error.message;
                alert(errorMessage)
            });
    }
    return (
        <View style={styles.container}>
            <Input
                placeholder='Enter your name'
                label="Name"
                leftIcon={{ type: 'material', name: 'badge' }}
                value={name}
                onChangeText={text => setName(text)}
            />
            <Input
                placeholder='Enter your email'
                label="Email"
                leftIcon={{ type: 'material', name: 'email' }}
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <Input
                placeholder='Enter your password'
                label="Password"
                leftIcon={{ type: 'material', name: 'lock' }}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
            />
            <Input
                placeholder='Enter your image'
                label="Profile"
                leftIcon={{ type: 'material', name: 'face' }}
                value={imageURL}
                onChangeText={text => setimageURL(text)}
            />
            <TouchableOpacity style={styles.button}>
                <Button title="Register" style={styles.button} onPress={register}></Button>
            </TouchableOpacity>
        </View>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 10
    },
    button: {
        width: 200,
        marginTop: 10
    }
})