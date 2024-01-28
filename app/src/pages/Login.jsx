import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoginForm from '../components/Login/LoginForm'

const Login = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Sign in</Text>
			<Text style={styles.description}>Sign in your account</Text>
			<LoginForm />
			<Text style={styles.link}>Forgot password?</Text>
		</View>
	)
}

export default Login

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	description: {
		color: '#ADAABB',
		alignSelf: 'center',
		fontWeight: '400'
	},
	title: {
		alignSelf: 'center',
		fontSize: 30,
		fontWeight: 'bold'
	},
	link: {
		alignSelf: 'center',
		color: 'blue'
	},
});