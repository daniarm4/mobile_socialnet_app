import { StyleSheet, ScrollView, FlatList } from 'react-native'
import React from 'react'
import Post from './Post'

const PostsList = ({ navigation }) => {
    const postList = [
        {id: 1},
        {id: 2},
        {id: 3}
    ]

    return (
        <ScrollView style={styles.container}>
            <FlatList 
                data={postList}
                renderItem={({item}) => (
                    <Post key={item.id} postData={{postId: item.id}} navigation={navigation} />
                )}
            />
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