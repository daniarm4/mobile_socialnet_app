import { StyleSheet, Text, TextInput, View } from 'react-native';
import * as Yup from 'yup';
import React from 'react';
import { Formik } from 'formik';
import Button from '../Button/Button';

const RegisterForm = () => {
    const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

    const validationSchema = Yup.object({   
        username: Yup.string()
            .required('Username is required'),
        email: Yup.string()
            .email('Enter valid email')
            .required('Email is required'),
        phone: Yup.string()
            .matches(phoneRegExp, 'Phone number is not valid')
            .required('Phone number is required')
            .min(12, 'Phone number is too short')
            .max(12, 'Phone number is too long'),
        password1: Yup.string()
            .required('Password is required')
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .max(16, 'Password is too long - should be 8 chars max.'),
        password2: Yup.string()
            .required('Retype password is required')
            .oneOf([Yup.ref('password1'), null], 'Password must match')
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .max(16, 'Password is too long - should be 8 chars max.')
    });

    const initialValues = { 
        username: '',
        email: '',
        phoneNumber: '',
        password1: '',
        password2: ''
    };

    const onSubmitForm = (values) => {
        console.log(values);
    };

    const fields = [
        {name: 'email', placeholder: 'Email', keyboardType: 'email-address'},
        {name: 'username', placeholder: 'Username'},
        {name: 'phone', placeholder: 'Phone'},
        {name: 'password1', placeholder: 'Password', secureTextEntry: true},
        {name: 'password2', placeholder: 'Retype password', secureTextEntry: true}
    ]

    return (
        <>
            <View style={styles.formWrapper}>
                <Formik 
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => onSubmitForm(values)}
                >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        {fields.map(field => {
                            return (
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        style={{
                                            borderWidth: 1,
                                            width: '100%',
                                            borderRadius: 50,
                                            padding: 10,
                                            borderColor: touched[field.name] && errors[field.name] ? 'red' : '#ADAABB',
                                            fontSize: 14,
                                            marginBottom: 5,
                                            paddingLeft: 20
                                        }}
                                        onChangeText={handleChange(field.name)}
                                        onBlur={handleBlur(field.name)}
                                        value={values[field.name]}    
                                        keyboardType={field.keyboardType}
                                        secureTextEntry={field.secureTextEntry}
                                        key={field.name}
                                    />
                                    {errors[field.name] && touched[field.name] &&
                                        <Text style={{color: 'red', fontSize: 10}}>{errors[field.name]}</Text>
                                    }
                                </View>
                            )
                        })}
                        <Button 
                            onPress={handleSubmit} 
                            title='Register'
                            colorBg={'#7868C9'}
                            textColor={'#fff'}     
                            width={'100%'}
                            margin={10}
                        />
                    </>
                )}
                </Formik>
            </View>
        </>
    )
}

export default RegisterForm;

const styles = StyleSheet.create({
    formWrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputWrapper: {
        display: 'flex',
        alignItems: 'center',
        margin: 5,
        width: '100%'
    },      
    input: {
        borderWidth: 1,
        width: 300,
        borderRadius: 50,
        padding: 10,
        borderColor: '#ADAABB',
        fontSize: 14,
        marginBottom: 5,
        paddingLeft: 20
    },
})