import { StyleSheet, View, Text, FlatList } from 'react-native';
import React, { useState } from 'react';
import Post from './Post';
import Button from '../Button/Button';
import { useGetPostsQuery } from '../../store/api/postAPI';


const PostsList = ({ navigation }) => {
    const [ page, setPage ] = useState(1);
    const { data, isFetching } = useGetPostsQuery(page);

    // const navigateToAddPostForm = () => {
    //     navigation.navigate('add');
    // };

    const Loading = () => {
        return (
            <View style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 28, fontWeight: '500' }} >Loading...</Text>
            </View>
        )
    }

    const loadMore = () => {
        if (!isFetching && data.next) {
            setPage(page + 1);
        }
    }

    return (
        <FlatList
            style={styles.container}
            data={data?.results ? data.results : []}
            renderItem={({ item }) => <Post key={item.id} postData={item} navigation={navigation} />}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={Loading}
        />
            // <Button 
            //     width={'70%'}
            //     colorBg={'#1673FF'}
            //     textColor={'white'}
            //     title={'Add post'}
            //     marginBottom={10}
            //     onPress={navigateToAddPostForm}
            // />
    )
}

export default PostsList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingTop: 10,
        display: 'flex',
    }
})