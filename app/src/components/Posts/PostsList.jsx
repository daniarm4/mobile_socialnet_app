import { StyleSheet, ScrollView, View, Text } from 'react-native';
import React from 'react';
import Post from './Post';
import Button from '../Button/Button';
import { useGetPostsQuery } from '../../store/api/postAPI';


const PostsList = ({ navigation }) => {
    const { data: posts, isLoading, isSuccess } = useGetPostsQuery();

    const navigateToAddPostForm = () => {
        navigation.navigate('add');
    };

    if (isLoading) {
        return (
            <View style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 28, fontWeight: '500' }} >Loading...</Text>
            </View>
        )
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ display: 'flex', alignItems: 'center' }}>
            <Button 
                width={'70%'}
                colorBg={'#1673FF'}
                textColor={'white'}
                title={'Add post'}
                marginBottom={10}
                onPress={navigateToAddPostForm}
            />
            {posts.map(post => (
                <Post key={post.id} postData={post} navigation={navigation} />
            ))}    
        </ScrollView>
    )
}

export default PostsList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingTop: 10
    }
})