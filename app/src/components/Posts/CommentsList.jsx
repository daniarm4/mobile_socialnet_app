import { StyleSheet, Text, View, ScrollView, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import Comment from './Comment';
import { useAddCommentMutation } from '../../store/api/postAPI';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const Comments = ({ commentsData, totalComments, postId }) => {

    const [ addComment, { isError: isAddCommentError, error: addCommentError } ] = useAddCommentMutation();

    if (isAddCommentError) {
        console.log(addCommentError);
    };

    const createComment = () => {
        const formData = new FormData();

        formData.append('text', commentText);
        formData.append('post', postId);
        addComment(formData);
    }

    const groupedComments = commentsData.reduce((acc, comment) => {
        const parent = comment.parent ? comment.parent : 'rootComments';
        if (!acc[parent]) {
            acc[parent] = [];
        }
        acc[parent].push(comment);
        return acc;
    }, { rootComments: [] });

    const [ commentText, setCommentText ] = useState();

    return (
        <KeyboardAwareScrollView style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>Comments</Text>
                <Text style={styles.count}>{totalComments}</Text>
            </View>
            <View
                style={{
                    gap: 10,
                    marginBottom: 10
                }}
            >
                <TextInput
                    placeholder='New comment'
                    style={{
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 20,
                        paddingHorizontal: 15
                    }}
                    value={commentText}
                    onChange={(e) => setCommentText(e.nativeEvent.text)}
                />
                <Button
                    onPress={createComment}
                    title='Add'
                />
            </View>
            <ScrollView horizontal>
                <ScrollView>
                    {groupedComments.rootComments.map(comment => (
                        <Comment
                            key={comment.id}
                            comment={comment}
                            groupedComments={groupedComments}
                            postId={postId}
                        />
                    ))}
                </ScrollView>
            </ScrollView>
        </KeyboardAwareScrollView>
    )
};

export default Comments;

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    title: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    titleText: {
        fontWeight: '500',
        fontSize: 20
    },
    count: {
        fontWeight: '400',
        fontSize: 18
    }
})