import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import Button from '../Button/Button'


const EditProfile = () => {
    const initialValues = {
        username: ''
    }

    const validationSchema = Yup.object({
        username: Yup.string()
            .min(3)
            .max(155)
    })

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit profile</Text>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => console.log(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
                    <>
                        <TextInput
                            name={'username'}
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            style={{
                                borderColor: errors.username && touched.username ? 'red' : '#ADAABB',
                                width: '100%',
                                borderWidth: 1,
                                padding: 10,
                                paddingHorizontal: 15,
                                borderRadius: 25,
                                marginBottom: 10
                            }}
                            value={values.username}
                            placeholder='Username'
                        />
                        {errors.username && touched.username &&
                            <Text style={{ color: 'red', fontSize: 14, marginBottom: 10, alignSelf: 'center' }}>{errors.username}</Text>
                        }
                        <Button
                            onPress={handleSubmit}
                            title={'Submit'}
                            colorBg={'#1673FF'}
                            width={'100%'}
                            textColor={'white'}
                        />
                    </>
                )}
            </Formik>
        </View>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    title: {
        fontWeight: '500',
        fontSize: 24,
        alignSelf: 'flex-start',
        marginBottom: 10
    }
})