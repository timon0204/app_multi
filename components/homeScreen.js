import React from 'react';
import { StyleSheet, ScrollView, View, ImageBackground,TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Header from './header';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../sotre/slices/authSlice';



const HomeScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigation.navigate('Login');
    }
    return (
        <ImageBackground 
            source={require('../assets/mbg2.png')} 
            style={styles.background}
        >
            <Header title="Home" onLogout={handleLogout} />
            <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('playlist')}>
                <Card style={styles.card}>
                    <Card.Cover source={require('../assets/lsit.png')} />
                    <Card.Content>
                        <Text style={styles.title}>Abandoned Ship</Text>
                        <Text style={styles.description}>
                            The Abandoned Ship is a wrecked ship located on Route 108 in Hoenn, 
                            originally being a ship named the S.S. Cactus. The second part of the 
                            ship can only be accessed by using Dive and contains the Scanner.
                        </Text>
                    </Card.Content>
                </Card>
                </TouchableOpacity>
                <Card style={styles.card}>
                    <Card.Cover source={require('../assets/setting.png')} />
                    <Card.Content>
                        <Text style={styles.title}>Title variant</Text>
                        <Text style={styles.description}>
                            Subtitle variant. This is a card using title and subtitle with specified variants.
                        </Text>
                    </Card.Content>
                </Card>
                <Card style={styles.card}>
                    <Card.Cover source={{ uri: 'https://example.com/image3.jpg' }} />
                    <Card.Content>
                        <Text style={styles.title}>Another Title</Text>
                        <Text style={styles.description}>
                            Description for another card. This card contains some other content that is different.
                        </Text>
                    </Card.Content>
                </Card>
                <Card style={styles.card}>
                    <Card.Cover source={{ uri: 'https://example.com/image4.jpg' }} />
                    <Card.Content>
                        <Text style={styles.title}>Fourth Card</Text>
                        <Text style={styles.description}>
                            This is the fourth card with its own unique description and content.
                        </Text>
                    </Card.Content>
                </Card>
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover', // This will ensure the image covers the whole screen
    },
    container: {
        padding: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background to make text readable
    },
    card: {
        marginBottom: 16,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8,
    },
    description: {
        fontSize: 14,
        marginTop: 4,
    },
});

export default HomeScreen;
