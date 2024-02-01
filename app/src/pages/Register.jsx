import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import RegisterForm from '../components/Register/RegisterForm';
import { Link } from '@react-navigation/native';

const Register = () => {
    return (
        <View style={styles.container}>
            <View style={styles.regInfo}>
                <Text style={styles.title}>Register account</Text>
                <Text style={styles.description}>Register a new account</Text>
            </View>
            <RegisterForm />
            <Text style={styles.registerDescription}>Already have an account? <Link style={{ color: 'blue' }} to={{ screen: 'Login' }}>Login</Link></Text>
        </View>
    )
}

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    registerDescription: {
        textAlign: 'center',
        width: 200,
        fontWeight: '400',
        color: '#ADAABB',
        marginTop: 10
    },
    regInfo: {
        display: 'flex',
        alignSelf: 'flex-start'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
    },
    description: {
        color: '#ADAABB',
    },
})
