// components/Header.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Header = ({ title, onLogout }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 60,
        backgroundColor: '#f0f0f0', // Example background color
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    logoutButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4,
        backgroundColor: '#cc0000', // Example button color
    },
    logoutButtonText: {
        fontSize: 16,
        color: 'white',
    },
});

export default Header;
