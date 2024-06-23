import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Text, TextInput, Button, Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../sotre/slices/authSlice';
import { useNavigation } from '@react-navigation/native';
import * as Device from 'expo-device';
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';


const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [provider, setProvider] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [showSnack, setSnackStatus] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const authStatus = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.user);


  const handleLogin = () => {
    dispatch(loginUser({ provider, username, password, deviceId }));
  };
  const toggleSnack = () => {
    setSnackStatus(false);
  };

  useEffect(() => {
    console.log(user)
    if (user.status === 200) {
      navigation.navigate('Home'); // Replace 'Home' with your target route name
    }else{
      setSnackStatus(true);
    }

    const fetchDeviceId = async () => {
      // Try to get the stored device ID 
      let id = await SecureStore.getItemAsync('deviceId');
      if (!id) {
        // If there is no stored ID, generate a new one
        id = `${Device.osName}-${Device.modelId}-${Math.random().toString(36).substr(2, 9)}`;
        // Save the generated ID securely
        await SecureStore.setItemAsync('deviceId', id);
      }
  
      const hasedId = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        id
      );
      const uniqueSixChars = hasedId.substr(0, 6);
      setDeviceId(uniqueSixChars);
    };
    fetchDeviceId();

  }, [authStatus, navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/loginbg.png')} style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <Text style={styles.overlayText} variant="titleLarge">Login</Text>
          <TextInput
            style={styles.input}
            label="Please input provider"
            value={provider}
            onChangeText={setProvider}
            keyboardType="Text"
            autoCapitalize="none"
            mode="outlined"
          />
          <TextInput
            style={styles.input}
            label="Please input username"
            value={username}
            onChangeText={setUsername}
            keyboardType="Text"
            autoCapitalize="none"
            mode="outlined"
          />
          <TextInput
            style={styles.input}
            label="Please input password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            mode="outlined"
          />
          <Button
            mode="contained"
            onPress={handleLogin}
       
          >
            Login
          </Button>
          <Text>Device Key: {deviceId}</Text>
        </View>
        <Snackbar
            visible={ showSnack }
            onDismiss={ toggleSnack }
            action={{
              label: 'Dismiss',
              onPress: () => {
                // Do side magic
              },
            }}
            duration={
              Snackbar.DURATION_LONG
            }
          >
            Hey there! I'm a Snackbar.
      </Snackbar>
      </ImageBackground>
    </View>
    
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    width: '80%', // Adjust width as needed
    alignItems: 'center',
  },
  overlayText: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    width: '100%',
  },
  button: {
    width: '100%',
    marginTop: 10,
  },
});

export default LoginScreen;