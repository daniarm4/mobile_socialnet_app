import { StyleSheet, View, TextInput, Text } from 'react-native';
import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Button from '../Button/Button';
import { useLoginMutation } from '../../store/api/userAPI';

const LoginForm = () => {
    const [ login, { isLoading } ] = useLoginMutation();

    const initialValues = {
        username: '',
        password: ''
    };

    const validationSchema = Yup.object({
        username: Yup.string()
            .required('Enter username')
            .min(3)
            .max(155),
        password: Yup.string()
            .required('Enter password')
            .min(4)
            .max(16)
    });

    const fields = [
        {name: 'username', placeholder: 'Username'},
        {name: 'password', placeholder: 'Password', secureTextEntry: true},
    ];

    const onSubmitForm = values => {
        login(values);
    };

    return (
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
                                <View style={styles.inputWrapper} key={field.name}>
                                    <TextInput
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        style={{
                                            borderWidth: 1,
                                            width: 300,
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
                            title='Sign in'
                            colorBg={'#7868C9'}
                            textColor={'#fff'}     
                            width={300}
                            margin={10}
                        />
                    </>
                )}
            </Formik>
        </View>
    )
}

export default LoginForm;

const styles = StyleSheet.create({
    formWrapper: {
        display: 'flex',
        alignItems: 'center'
    },
    inputWrapper: {
        display: 'flex',
        alignItems: 'center',
        margin: 5
    }, 
})