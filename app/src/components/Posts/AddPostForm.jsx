import { Button, StyleSheet, Text, TextInput, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useAddPostMutation, useGetCategoriesQuery } from '../../store/api/postAPI';
import mime from 'mime';
import * as Yup from 'yup';
import { Formik } from 'formik';

const AddPostForm = () => {
    const [addPost, { isError: isAddPostError, error: addPostError }] = useAddPostMutation();

    const [selectedCategories, setSelectedCategories] = useState([]);

    const [images, setImages] = useState([]);

    const { isLoading: isGetCategoriesLoading, data: categories } = useGetCategoriesQuery();

    if (isAddPostError) {
        console.log(addPostError);
    };

    const initialValues = {
        title: '',
        text: ''
    }

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            base64: false
        });

        if (!result.canceled) {
            const imageData = result.assets[0];
            const fileName = imageData.uri.substring(imageData.uri.lastIndexOf('/') + 1, imageData.uri.length);
            setImages(images => [...images, { name: fileName, uri: imageData.uri, type: mime.getType(imageData.uri) }]);
        }
    };

    const createPost = async (values) => {
        const formData = new FormData();

        images && images.forEach(image => {
            formData.append('images', {
                name: image.name,
                uri: image.uri,
                type: image.type
            })
        });

        selectedCategories && selectedCategories.forEach(category => {
            formData.append('categories', category.id)
        });



        for (let key in values) {
            if (values[key]) {
                formData.append(key, values[key]);
            }
        };
        addPost(formData);
    };

    const selectCategory = (category, isSelected) => {
        if (!isSelected) {
            setSelectedCategories([...selectedCategories, category]);
        }
        else {
            setSelectedCategories(categories.filter(cat => cat.id !== category.id));
        }
    };

    const fields = [
        { name: 'title', placeholder: 'Post title' },
        { name: 'text', placeholder: 'Post text' }
    ];

    const validationSchema = Yup.object({
        title: Yup.string()
            .max(255),
        text: Yup.string()
    })

    return (
        <View style={styles.container}>
            <Text style={{
                fontSize: 24,
                fontWeight: '500',
                marginBottom: 10
            }}>Create new post</Text>
            <View>
                <Text style={{
                    fontSize: 24,
                    fontWeight: '500',
                    marginBottom: 10
                }}>Select categories</Text>
                <ScrollView
                    horizontal
                >
                    {isGetCategoriesLoading
                        ?
                        <Text>Loading...</Text>
                        :
                        categories.map(category => {
                            const isSelected = selectedCategories.some(cat => cat.id === category.id)

                            return (
                                <TouchableOpacity
                                    onPress={() => selectCategory(category, isSelected)}
                                    key={category.id}
                                    style={{
                                        backgroundColor: isSelected ? 'red' : '#1673FF',
                                        borderRadius: 15,
                                        borderColor: 'white',
                                        padding: 10
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: 'white'
                                        }}
                                    >
                                        {category.title}
                                    </Text>
                                </TouchableOpacity>

                            )
                        }
                        )
                    }
                </ScrollView>

            </View>

            <View>
                <Text style={{
                    fontSize: 24,
                    fontWeight: '500',
                    marginBottom: 10
                }}>Add images</Text>
                <ScrollView
                    horizontal
                    contentContainerStyle={{
                        gap: 5
                    }}
                >
                    {images.map(image => {
                        return (
                            <Image
                                key={image.name}
                                style={{
                                    height: 150,
                                    width: 150,
                                    borderWidth: 1,
                                    borderColor: '#A7A7A7',
                                    borderRadius: 20,
                                    marginBottom: 10
                                }}
                                source={{
                                    uri: image.uri
                                }}
                            />
                        )
                    })}
                </ScrollView>
            </View>
            <Button
                onPress={pickImage}
                title="Select Image"
            />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => createPost(values)}
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
                                            width: '100%',
                                            padding: 10,
                                            borderColor: touched[field.name] && errors[field.name] ? 'red' : '#ADAABB',
                                            fontSize: 14,
                                            marginBottom: 5,
                                            paddingLeft: 20
                                        }}
                                        onChangeText={handleChange(field.name)}
                                        onBlur={handleBlur(field.name)}
                                        value={values[field.name]}
                                        key={field.name}
                                    />
                                    {errors[field.name] && touched[field.name] &&
                                        <Text style={{ color: 'red', fontSize: 10 }}>{errors[field.name]}</Text>
                                    }
                                </View>
                            )
                        })}
                        <Button
                            onPress={handleSubmit}
                            title='Create post'
                            colorBg={'#7868C9'}
                            textColor={'#fff'}
                            width={'100%'}
                            margin={10}
                        />
                    </>
                )}
            </Formik>
        </View>
    )
}

export default AddPostForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10
    }
})
