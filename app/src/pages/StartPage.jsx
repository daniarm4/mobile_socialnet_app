import { StyleSheet, View, Image, Text } from 'react-native'
import React from 'react'
import Button from '../components/Button/Button';
import { Link } from '@react-navigation/native'

const StartPage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Image
                    style={styles.image}
                    source={{
                        uri: 'https://img.freepik.com/free-vector/flat-woman-taking-photos-with-smartphone_23-2148996137.jpg?size=626&ext=jpg&ga=GA1.1.601401618.1686480699&semt=ais'
                    }}
                />
                <Text
                    style={styles.title}
                >
                    Get Started
                </Text>
                <Text
                    style={styles.description}
                >
                    Some text somseom fasdf adf al dsflas d asdfklasd f alskdf asd laskd
                </Text>
                <Button
                    title='Google'
                    onPress={() => navigation.navigate('Login')}
                    width={'80%'}
                    margin={10}
                    borderWidth={1}
                    borderColor={'#BCBBC5'}
                    iconName={'google'}
                />
                <Button
                    title='Login'
                    onPress={() => navigation.navigate('Login')}
                    width={'80%'}
                    colorBg={'#7868C9'}
                    textColor={'#fff'}
                />
                <Text
                    style={styles.registerDescription}
                >
                    Don't have an account?
                    <Link to={{ screen: 'Register' }} style={styles.link}> Register</Link>
                </Text>
            </View>
        </View>
    )
}

export default StartPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    wrapper: {
        display: 'flex',
        width: '100%',
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '60%',
        marginBottom: 10,
    },
    link: {
        color: 'blue',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 32,
        margin: 5
    },
    description: {
        textAlign: 'center',
        width: 200,
        fontWeight: '400',
        color: '#ADAABB',
        marginBottom: 10
    },
    registerDescription: {
        textAlign: 'center',
        width: 200,
        fontWeight: '400',
        color: '#ADAABB',
        marginTop: 10
    }
});
