import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react';
import CommentsList from './CommentsList';
import { useGetPostCommentsQuery, useGetPostQuery } from '../../store/api/postAPI';


const PostDetail = ({ route }) => {
    const { postId } = route.params;

    const { data: post, isLoading: postLoading } = useGetPostQuery(postId);
    const { data: commentsData, isLoading: commentsLoading } = useGetPostCommentsQuery(postId);

    if (postLoading || commentsLoading) {
        return <Text>Loading...</Text>
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.wrapper}>

                <View style={styles.postOwner}>
                    <View style={styles.ownerInfo}>
                        <Image
                            style={styles.ownerAvatar}
                            source={{
                                uri: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.601401618.1686480699&semt=ais'
                            }}
                        />
                        <View style={styles.aboutPost}>
                            <Text style={styles.ownerName}>{post.owner_username}</Text>
                            <Text style={styles.created}>{post.created_at}</Text>
                        </View>
                    </View>
                    <View style={styles.postSettings}>
                        <Image
                            style={{
                                width: 25,
                                height: 25
                            }}
                            source={{
                                uri: 'https://cdn-icons-png.flaticon.com/128/2311/2311524.png'
                            }}
                        />
                    </View>
                </View>

                <View style={styles.postContent}>
                    <Text style={styles.postText}>{post.text}</Text>
                    <ScrollView horizontal>
                        {post.images.map(({ image }) => (
                            <Image
                                style={styles.image}
                                source={{
                                    uri: image
                                }}
                            />
                        ))}
                    </ScrollView>
                </View>

                <View style={styles.postFooter}>
                    <View style={styles.likes}>
                        <Image
                            style={{
                                width: 25,
                                height: 25
                            }}
                            source={{
                                uri: post.is_liked ?
                                    'https://cdn-icons-png.flaticon.com/128/2077/2077502.png'
                                    :
                                    'https://cdn-icons-png.flaticon.com/128/1077/1077035.png'
                            }}
                        />
                        <Text style={styles.likesCount}>{post.total_likes}</Text>
                    </View>
                </View>

            </View>
            <CommentsList 
                commentsData={commentsData}
                postId={postId}
                totalComments={post.total_comments} 
            />
        </ScrollView>
    )
}

export default PostDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        paddingHorizontal: 15
    },
    wrapper: {
        width: '100%',
        maxHeight: '100%',
        display: 'flex',
        marginBottom: 20,
        gap: 5
    },
    postOwner: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    ownerInfo: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    ownerAvatar: {
        borderRadius: 50,
        width: 50,
        height: 50
    },
    aboutPost: {
        display: 'flex',
    },
    ownerName: {
        fontWeight: '500',
        fontSize: 18
    },
    created: {
        color: '#ADAABB',
        fontSize: 12,
        fontWeight: '300'
    },
    postSettings: {
        marginRight: 5
    },
    postContent: {
        display: 'flex',
        gap: 2
    },
    image: {
        marginRight: 5,
        height: 300,
        width: 300,
        borderRadius: 10
    },
    postText: {
        fontWeight: '300'
    },
    postFooter: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    likes: {
        display: 'flex',
        gap: 3,
        flexDirection: 'row',
        alignItems: 'center'
    },
    likesCount: {
        color: '#ADAABB'
    }
})